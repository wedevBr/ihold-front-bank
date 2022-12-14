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
  Center,
} from '@chakra-ui/react';
import { generateToken } from '~/services/hooks/useCreateAccount';
import router from 'next/router';
import { setLocalStorage } from '~/utils/localStorageFormat';
import { Loading } from '~/components';

export default function OnBoarding() {
  const [loading, setLoading] = useState(false);
  const { v4: uuidv4 } = require('uuid');

  async function getToken(type: number) {
    setLoading(true);
    try {
      const data = await generateToken({
        device_id: uuidv4().toString(),
        fcm_token: 'string',
      });
      setLocalStorage('clientToken', data.data.access_token);
      setLocalStorage('userIdentifier', data.data.user_identifier);
    } catch (err: any) {
      console.log(err);
    } finally {
      {
        type === 1 ? (
          router.push({ pathname: '/onboarding/type-1' })
        ) : (
          <>
            {type === 2
              ? router.push({ pathname: '/onboarding/type-2' })
              : router.push({ pathname: '/' })}
          </>
        );
      }
    }
  }

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
        {loading ? (
          <Center h="500px" mt="30px">
            <Loading />
          </Center>
        ) : (
          <Box pt="60px" w="90%">
            <Box mt="18px">
              <Box pb="20px">
                <Text
                  color="#00102A"
                  fontSize="18px"
                  fontWeight="600"
                  lineHeight="22px"
                >
                  ABRIR CONTA
                </Text>
              </Box>
              <Flex pt="40px">
                <Text
                  color="#7F8B9F"
                  fontWeight="400"
                  lineHeight="20px"
                >
                  Antes de come??ar, confira alguns requisitos essenciais para abrir sua conta para
                  Pessoa Jur??dica IHold
                </Text>
                
              </Flex>
              <Box mt="18px">
                <Button
                  bg="#FFF"
                  border="1px"
                  borderColor="#2E4EFF"
                  color="#2E4EFF"
                  w="100%"
                  borderRadius="40px"
                  onClick={() => getToken(1)}
                  isLoading={loading}
                >
                  MEI, EI e EIRELI
                </Button>
              </Box>
              <Box pt="40px">
                <Text
                  color="#7F8B9F"
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="17px"
                >
                  Clicando em Entrar, voc?? concorda com nossa{' '}
                  <Link color="#2E4EFF">Pol??tica de Privacidade.</Link>
                </Text>
              </Box>
              {/* <Box mt="18px">
                <Button
                  bg="#FFF"
                  border="1px"
                  borderColor="#2E4EFF"
                  color="#2E4EFF"
                  w="100%"
                  borderRadius="40px"
                  onClick={() => getToken(2)}
                >
                  Tipo 2
                </Button>
              </Box> */}
            </Box>
          </Box>
        )}
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
