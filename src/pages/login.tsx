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

const userAuth = {
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  username: process.env.NEXT_PUBLIC_USERNAME,
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  let ref = React.createRef<HTMLButtonElement>();
  const { signIn } = useAuthContext();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
    defaultValues: userAuth,
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
        <Box pt="60px" w="90%" as="form" onSubmit={handleSubmit(handleSignIn)}>
          <Box pb="60px">
            <Text
              color="#00102A"
              fontSize="18px"
              fontWeight="600"
              lineHeight="22px"
            >
              ACESSAR MINHA CONTA
            </Text>
          </Box>
          <Input
            label="CPF/CNPJ"
            labelColor="#7F8B9F"
            size="lg"
            bg="transparent"
            fontSize="18px"
            height="56px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="000.000.000-00"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('username')}
            error={formState?.errors?.username}
          />
          <Box my="10px">
            <Input
              label="Senha"
              labelColor="#7F8B9F"
              size="lg"
              bg="transparent"
              fontSize="18px"
              height="56px"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="*********"
              type="password"
              iconColor="#21C6DE"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('password')}
              error={formState?.errors?.password}
            />
          </Box>
          <Box pt="5px">
            <Text
              color="#7F8B9F"
              fontSize="14px"
              fontWeight="400"
              lineHeight="17px"
              textAlign="right"
            >
              <Link color="#2E4EFF">
                Esqueci minha senha.
              </Link>
            </Text>
          </Box>
          <Box pt="40px">
            <Text
              color="#7F8B9F"
              fontSize="14px"
              fontWeight="400"
              lineHeight="17px"
            >
              Clicando em Entrar, você concorda com nossa <Link color="#2E4EFF"
              >Política de Privacidade.</Link>
            </Text>
          </Box>
          <Box mt="18px">
            <Button
              ref={ref}
              isLoading={loading}
              bg="#CBD3E0"
              border="0"
              color="#070A0E"
              w="100%"
              type="submit"
              borderRadius="40px"
              _hover={{ background: "#2E4EFF", color: "#FFF" }}
            >
              ENTRAR
            </Button>
            <Box mt="18px">
            </Box>
            <Button
              bg="#FFF"
              border="1px"
              borderColor="#2E4EFF"
              color="#2E4EFF"
              w="100%"
              borderRadius="40px"
            >
              ABRIR CONTA
            </Button>
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
