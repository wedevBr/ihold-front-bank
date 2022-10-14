import {
  Box,
  Button,
  Flex,
  Text,
  Center,
  Select,
  useToast,
  useDisclosure,
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
import { Loading } from '~/components/Loading';
import Link from 'next/link';
import { ModalStatus } from '../ModalStatus';

interface IPropsModal {
  type?: 'pix' | 'transfer' | 'bill-payment' | string;
  setLoading: (state: boolean) => void;
  onClose?: () => void;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

interface RegisterPayment {
  file: File;
}

export const createPaymentFormSchema = yup.object().shape({
  file: yup.mixed().required('Arquivo Obrigátorio'),
});

export const ModalUploadPayment = ({
  refetch,
  onClose,
  type = 'pix',
  setLoading,
}: IPropsModal) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, seIsSuccess] = useState(false);
  const [fileSrc, setFileSrc] = useState<File | any>();
  const [uploadFile, setUploadFile] = useState<File | any>();
  const toast = useToast();
  const {
    isOpen: isOpenDelet,
    onOpen: onPenDelet,
    onClose: onCloseDelet,
  } = useDisclosure();

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

    formData.append('transaction_type', type);
    formData.append('file', data.file);
    setIsLoading(true);
    refetch && refetch();
    setLoading(true);
    try {
      const response = await registerPayment(formData);
      toast({
        title: 'Enviado com Sucesso!',
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });
      onPenDelet();
      refetch && refetch();
      setIsError(false);
      seIsSuccess(true);
      onClose && onClose();
    } catch (err: any) {
      setIsError(true);
      toast({
        title:
          err?.response?.data?.errors?.file ||
          err?.response?.data?.errors?.map((item: any) => item) ||
          err?.response?.data?.message,
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <>
      {!isLoading && !isSuccess ? (
        <Box as="form" onSubmit={handleSubmit(handleSendPayment)}>
          <Text mb="20px">{type?.toLocaleUpperCase()}</Text>
          <Center
            border="0.125rem"
            borderStyle="dashed"
            borderColor={isError || errors.file ? 'red' : '#cbd3e0'}
            onClick={openUpload}
            cursor="pointer"
            py="40px"
          >
            <Box>
              <Center>
                <Icon
                  icon="fa6-solid:cloud-arrow-up"
                  color={isError || errors.file ? 'red' : '#cbd3e0'}
                  fontSize={50}
                />
              </Center>
              {getValues('file') ? (
                <Text color="#cbd3e0">{getValues('file')?.name}</Text>
              ) : (
                <Text color={isError || errors.file ? 'red' : '#cbd3e0'}>
                  Procurar Arquivo para Carregar
                </Text>
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
            {errors.file && (
              <Text color="red" mt="5px">
                {errors.file.message}
              </Text>
            )}
          </Flex>
          <Button
            mt="25px"
            mb="30px"
            type="submit"
            isLoading={isLoading}
            w="full"
            color="#fff"
            bg="#2E4EFF"
            borderRadius="40px"
          >
            UPLOAD
          </Button>
        </Box>
      ) : isSuccess ? (
        <ModalStatus
          variant="success"
          title="pronto"
          description="Dados importados com sucesso!
          Prossiga para autorizar o pagamento em lote."
          titleButton="avançar"
          isOpen={isOpenDelet}
          onClose={onCloseDelet}
        />
      ) : (
        <Flex h="300px" flexDir="column" justify="center" align="center">
          <Loading
            size="xl"
            thickness="7px"
            speed="0.88s"
            w="80px"
            h="80px"
            color="#21C6DE"
          />
          <Text
            my="35px"
            w="70%"
            mx="auto"
            color=" #7F8B9F"
            textAlign="center"
            fontFamily="Lato"
            fontStyle="normal"
            fontWeight="700"
            fontSize="20px"
          >
            Aguarde, estamos processando sua importação
          </Text>
        </Flex>
      )}
    </>
  );
};
