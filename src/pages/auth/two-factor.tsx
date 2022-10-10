/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  Flex,
  SimpleGrid,
  Image,
  Text,
  Box,
  PinInput,
  PinInputField,
  FormErrorMessage,
  FormControl,
  HStack,
  Center,
  Button,
} from '@chakra-ui/react';
import router from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { AuthTwoFactors, GetAuthTwoFactors } from '~/services/hooks/useAuth';
import { useAuthContext } from '~/context/AuthContext';

type ErrorMessage = {
  message?: any;
  error?: boolean;
};

export default function TwoFactor() {
  const { authTwoFactor } = useAuthContext();
  const [code, setCode] = useState('');
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [counter, setCounter] = useState(10);
  const [loading, setLoading] = useState(false);
  let ref = React.createRef<HTMLButtonElement>();

  useEffect(() => {
    document.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        ref?.current?.click();
      }
    });
  }, [ref]);

  async function handleAuthTwoFactors() {
    const authCode = {
      code,
    };
    try {
      if (code?.length === 6) {
        setLoading(true);
        const response = await AuthTwoFactors(authCode);
        if (response) {
          setCookie(undefined, '@two-factor', 'TRUE', {
            maxAge: 60 * 60 * 1, // 1 hour
            path: '/',
          });
          router.push('/home');
        }
      } else {
        setError({ message: 'Code less than 6 digits!', error: true });
      }
    } catch (error: any) {
      if ([401, 400, 500, 422].includes(error?.response?.status)) {
        setError({ message: error?.response?.data?.message, error: true });
      }
    } finally {
      setLoading(false);
    }
  }

  function ResendCodeAuthFactor() {
    GetAuthTwoFactors().then(() => {
      setCounter(10);
    });
  }

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  // const resetTimer = () => {
  //   if (!counter) {
  //     setCounter(10);
  //   }
  // };

  return (
    <SimpleGrid columns={[1, 1, 2]} minH="100vh">
      <Box>
        <Box maxH="100vh" overflowY="auto" pt="30px" pl="165px">
          <Flex justifyContent="space-between" w="100%" align="center">
            <Image
              src="/assets/logo-preta.svg"
              alt="Logo_iHold"
              width="150px"
              objectFit="contain"
            />
          </Flex>
        </Box>
        <Box pl="165px">
          <Box pt="60px" width="90%">
            <Text
              fontSize="18px"
              color="#00102A"
              fontWeight="600"
              lineHeight="22px"
            >
              AUTENTICAÇÃO EM DUAS ETAPAS
            </Text>
            <Text pt="60px" color="#7C7C7C" textAlign="center">
              INSIRA ABAIXO O CÓDIGO DE 6 DIGITOS QUE ENVIAMOS
            </Text>
            <Text pb="40px" color="#00102A" textAlign="center">
              {authTwoFactor}
            </Text>
            <FormControl isInvalid={!!error}>
              <Center w="100%">
                <HStack>
                  <PinInput
                    autoFocus
                    type="number"
                    errorBorderColor="red"
                    size="lg"
                    value={code}
                    onChange={(value) => setCode(value)}
                  >
                    {Array.from({ length: 6 }).map((_, key) => (
                      <PinInputField key={key} />
                    ))}
                  </PinInput>
                </HStack>
              </Center>
              {!!error?.error && (
                <FormErrorMessage>{error.message}</FormErrorMessage>
              )}
            </FormControl>
            <Text
              pt="10px"
              color="#7F8B9F"
              fontWeight=" 400"
              fontSize="14px"
              textAlign="center"
              lineHeight="17px"
            >
              Código enviado há{' '}
              {counter === 10 ? counter : `0${counter}` || '00'} segundos
            </Text>
            <Box pt="80px">
              <Button
                ref={ref}
                isLoading={loading}
                border="0"
                bg="#CBD3E0"
                color="#070A0E"
                w="100%"
                type="submit"
                borderRadius="40px"
                _hover={{ background: '#2E4EFF', color: '#FFF' }}
                onClick={handleAuthTwoFactors}
              >
                ENTRAR
              </Button>
              <Box width="100%" pt="30px">
                <Text
                  onClick={ResendCodeAuthFactor}
                  color="#2E4EFF"
                  fontSize="16px"
                  textAlign="center"
                  fontWeight="700"
                  lineHeight="22px"
                  cursor="pointer"
                >
                  REENVIAR CÓDIGO
                </Text>
              </Box>
            </Box>
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
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@iHoldBankAccess_token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
