import { Box, Button, Flex, Radio, Image, RadioGroup, Text, useDisclosure, Center, Select, useToast } from "@chakra-ui/react"
import { Modal } from ".."
import router from "next/router";
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
  const [transaction_type, setTransaction_type] = useState("")
  const toast = useToast()

  const file = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, setValue, watch, getValues, trigger, formState: { errors, isSubmitting }, control } = useForm<RegisterPayment>({
    resolver: yupResolver(createPaymentFormSchema),
  });
 
  const openUpload = () => {
    file.current && file.current.click();
  };

  function handleInputFileChange(e: ChangeEvent<File | any>) {
    setUploadFile(e.target.files[0]);
  }

  const formData = new FormData();

  formData.append("transaction_type", transaction_type);
  formData.append("file", uploadFile);

  const handleSendPayment: SubmitHandler<RegisterPayment> = async (data) => {
   
    const formData = new FormData();

    formData.append("transaction_type", transaction_type);
    formData.append("file", uploadFile);
    setIsLoading(true)
    try {
      const response = await registerPayment(data)
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
        {uploadFile ? "1 arquivo carregado" :
          <Box >
            <Center>
              <Icon icon="fa6-solid:cloud-arrow-up" color="#cbd3e0" fontSize={50} />
            </Center >
            <Text color="#cbd3e0">Procurar Arquivo para Carregar</Text>
          </Box>
        }
      </Center>
      <input
        type="file"
        hidden
        required
        name="file"
        ref={file}
        onChange={handleInputFileChange}
      />
      <Flex>
        {errors.file && (
          <Text color="primary.600">{errors.file.message}</Text>
        )}
      </Flex>
      <Button type="submit" onClick={() => console.log(watch("transaction_type"))}>
        ENVIAR
      </Button>
    </Box >
  )
}