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
                  Tipo 1
                </Button>
              </Box>
              <Box mt="18px">
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
              </Box>
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
