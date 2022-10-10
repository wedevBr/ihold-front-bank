import {
  Box,
  Button,
  Flex,
  Text,
  Center,
  Select,
  useToast,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef, useState, ChangeEvent } from 'react';
import { Icon } from '@iconify/react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { registerPayment } from '~/services/hooks/usePaymentsSchedule';
import { error } from 'console';

interface IPropsModal {
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

interface RegisterPayment {
  file: File;
  transaction_type: string;
}

export const createPaymentFormSchema = yup.object().shape({
  transaction_type: yup.string().required(),
  file: yup.mixed().required(),
});

export const ModalUploadPayment = ({ refetch }: IPropsModal) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fileSrc, setFileSrc] = useState<File | any>();
  const [uploadFile, setUploadFile] = useState<File | any>();
  const toast = useToast();

  const file = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
    control,
  } = useForm<RegisterPayment>({
    resolver: yupResolver(createPaymentFormSchema),
  });

  const openUpload = () => {
    file.current && file.current.click();
  };

  const handleUpload = async (files: FileList | null) => {
    if (files) {
      const objectURL: string = window.URL.createObjectURL(files[0]);
      let file = files[0];
      let type = files[0]?.type;
      setFileSrc({ preview: objectURL, file, type });
      setValue('file', file);
      await trigger(['file']);
    }
    file.current && (file.current.value = '');
  };

  const formData = new FormData();

  formData.append('transaction_type', fileSrc);
  formData.append('file', uploadFile);

  const handleSendPayment: SubmitHandler<RegisterPayment> = async (data) => {
    const formData = new FormData();

    formData.append('transaction_type', data.transaction_type);
    formData.append('file', data.file);
    setIsLoading(true);
    try {
      const response = await registerPayment(formData);
      toast({
        title: 'Enviado com Sucesso!',
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });
      refetch && refetch();
      setIsError(false);
    } catch (err: any) {
      setIsError(true);
      toast({
        title: err.response.data.errors.file,
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(handleSendPayment)}>
      <Select {...register('transaction_type')}>
        <option value="pix">PIX</option>
        <option value="transfer">TED</option>
        <option value="bill-payment">BOLETO</option>
      </Select>
      <Center
        border="0.125rem"
        borderStyle="dashed"
        borderColor={isError ? 'red' : '#cbd3e0'}
        onClick={openUpload}
        cursor="pointer"
        py="40px"
      >
        <Box>
          <Center>
            <Icon
              icon="fa6-solid:cloud-arrow-up"
              color="#cbd3e0"
              fontSize={50}
            />
          </Center>
          {getValues('file') ? (
            <Text color="#cbd3e0">{getValues('file')?.name}</Text>
          ) : (
            <Text color="#cbd3e0">Procurar Arquivo para Carregar</Text>
          )}
        </Box>
      </Center>
      <input
        {...register('file')}
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        type="file"
        hidden
        ref={file}
        onChange={(event) => handleUpload(event.target.files)}
      />
      <Flex>
        {errors.file && <Text color="primary.600">{errors.file.message}</Text>}
      </Flex>
      <Button type="submit" isLoading={isLoading}>
        ENVIAR
      </Button>
    </Box>
  );
};
