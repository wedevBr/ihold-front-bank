import React, { useEffect, useRef, useState } from 'react';
import {
  Flex,
  SimpleGrid,
  Image,
  Text,
  Box,
  useToast,
  Button,
  Link,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '~/context/AuthContext';
import { SignInRequestData } from '~/types/auth';
import { Input } from '~/components';

const signInFormSchema = yup.object().shape({
  username: yup.string().required('Usuário Obrigatório'),
  password: yup.string().required('Senha Obrigatória'),
});

export default function OnBoarding() {
  const [loading, setLoading] = useState(false);
  let ref = React.createRef<HTMLButtonElement>();
  const { signIn } = useAuthContext();
  const { register, handleSubmit, formState } = useForm({
  });
  const toast = useToast();
  async function handleSignIn(data: SignInRequestData) {
    setLoading(true);
    await signIn(data)
      .catch((err) => {
        toast({
          title: err.message,
          status: 'error',
          variant: 'solid',
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    document.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        ref?.current?.click();
      }
    });
  }, [ref]);

  return (
    <SimpleGrid columns={[1, 1, 2]}>
      <Box minH="100vh" pt="30px" pl="165px">
        <Flex justifyContent="space-between" w="100%" align="center">
          <Image
            src="/assets/logo-preta.svg"
            alt="Logo_iHold"
            width="150px"
            objectFit="contain"
          />
        </Flex>
        <Box pt="60px" w="90%" as="form" >
          
        
          <Box mt="18px">
         
            <Box mt="18px"></Box>
            <Link href="/onboarding/type-1">
              <Button
                bg="#FFF"
                border="1px"
                borderColor="#2E4EFF"
                color="#2E4EFF"
                w="100%"
                borderRadius="40px"
              >
                Tipo 1
              </Button>
            </Link>
            <Box mt="18px"></Box>
            <Link href="/onboarding/type-2">
              <Button
                bg="#FFF"
                border="1px"
                borderColor="#2E4EFF"
                color="#2E4EFF"
                w="100%"
                borderRadius="40px"
              >
                Tipo 2
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Flex
        backgroundImage="/assets/banner-app.png"
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        backgroundPosition="right"
      />
    </SimpleGrid>
  );
}
