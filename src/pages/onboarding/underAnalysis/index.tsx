import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';

export default function UnderAnalysis() {
  return (
    <Box bg="#F0F0F3" h="full" minH="100vh"  >
      <Box h="full" w="full" maxW="1200px" mx="auto" >
        <Flex justifyContent="space-between" w="full" align="center" py="30px">
          <Image
            src="/assets/logo-preta.svg"
            alt="Logo_iHold"
            width="150px"
            objectFit="contain"
          />
        </Flex>
        <Box
          mt="30px"
          p="30px"
          bg="#FFFFFF"
          borderRadius="6px"
          borderTop="11px solid #00102A"
          py="70px"
        >
          <Flex justify="space-around">
            <Center>
              <Box w="400px">
                <Text fontWeight="700" fontSize="30px">CADASTRO EM ANÁLISE</Text>
                <Text color="#7F8B9F" py="30px" fontWeight="600" fontSize="18px">Seu cadastro foi concluído. Agora, faremos uma análise das informações para realizar a ativação da sua conta. Fique atento ao seu e-mail que, em breve, enviaremos atualizações.</Text>
                <Button
                  bg="#FFF"
                  border="1px"
                  borderColor="#2E4EFF"
                  color="#2E4EFF"
                  w="100%"
                  borderRadius="40px"
                >
                  OK, ENTENDI
                </Button>
              </Box>
            </Center>
            <Center>
              <Image
                src="/assets/analysis.png"
                alt="Analysis"
                width="300px"
                objectFit="contain"
              />
            </Center>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}