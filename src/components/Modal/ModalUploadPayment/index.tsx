import { Box, Button, Flex, Text, Center, Select, useToast } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef, useState, ChangeEvent } from "react";
import { Icon } from '@iconify/react';
import { registerPayment } from "~/services/hooks/usePayments";

interface RegisterPayment {
  file: File;
  transaction_type: string;
}

export const createPaymentFormSchema = yup.object().shape({
  transaction_type: yup.string().required(),
  file: yup.mixed().required()
});

export const ModalUploadPayment = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [fileSrc, setFileSrc] = useState<File | any>();
  const [uploadFile, setUploadFile] = useState<File | any>();
  const toast = useToast()

  const file = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, setValue, watch, getValues, trigger, formState: { errors, isSubmitting }, control } = useForm<RegisterPayment>({
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
      setValue("file", file);
      await trigger(["file"]);
    }
    file.current && (file.current.value = "");
  };

  const formData = new FormData();

  formData.append("transaction_type", fileSrc);
  formData.append("file", uploadFile);

  const handleSendPayment: SubmitHandler<RegisterPayment> = async (data) => {
    const formData = new FormData();

    formData.append("transaction_type", data.transaction_type);
    formData.append("file", data.file);
    console.log(data)
    setIsLoading(true)
    try {
      const response = await registerPayment(formData)
      setIsLoading(false)
      toast({
        title: response.message,
        status: "success",
        variant: "solid",
        isClosable: true,
      });
    } catch (err: any) {
      setIsLoading(false)
      toast({
        title: err.message,
        status: "error",
        variant: "solid",
        isClosable: true,
      });
    }
  }


  return (
    <Box as='form' onSubmit={handleSubmit(handleSendPayment)}>
      <Select  {...register("transaction_type")}>
        <option value='pix'>PIX</option>
        <option value='transfer'>TED</option>
        <option value='bill-payment'>BOLETO</option>
      </Select>
      <Center
        border="0.125rem"
        borderStyle="dashed"
        borderColor="#cbd3e0"
        onClick={openUpload}
        cursor="pointer"
        py="40px"
      >
        <Box >
          <Center>
            <Icon icon="fa6-solid:cloud-arrow-up" color="#cbd3e0" fontSize={50} />
          </Center >
          {uploadFile ? <Text color="#cbd3e0">1 arquivo carregado</Text> :

            <Text color="#cbd3e0">Procurar Arquivo para Carregar</Text>
          }
        </Box>

      </Center>
      <input
        {...register("file")}
        type="file"
        hidden 
        ref={file}
        onChange={(event) => handleUpload(event.target.files)}
      />
      <Flex>
        {errors.file && (
          <Text color="primary.600">{errors.file.message}</Text>
        )}
      </Flex>
      <Button type="submit" onClick={() => console.log(watch("file"))}>
        ENVIAR
      </Button>
    </Box >
  )
}