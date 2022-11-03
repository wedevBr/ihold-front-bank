import React from 'react';
import {
  Flex,
  Image,
  Text,
  Box,
  Button,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { GetPixPaymentInfo } from '~/services/hooks/usePayment';
import QRCode from 'react-qr-code';
import { formatCalcValue } from '~/utils/formatValue';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Loading } from '~/components';
import { nifFormat } from '~/utils/nifFormat';

export default function SharePixPayment() {
  const router = useRouter();
  const id = router.query.hash || "";

  const { data } = useQuery(
    [],
    () => GetPixPaymentInfo(id),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return (
    <Box
      h="full"
      bg="#F0F0F3"
      px={{ base: '10px', md: '20px' }}
      minH="100vh"
    >
      {!data ? (
        <Center h="100vh" >
          <Loading />
        </Center>
      ) :
        <>
          <Box mx="auto" pt="30px" w={{ base: '95%', md: '95%', lg: '100%', xl: '85%' }}>
            <Flex
              bg="#FFFFFF"
              boxShadow="base"
              mt="20px"
              borderRadius="6px"
              p="20px"
              align="center"
              justify="space-between"
              px="60px"
            >
              <Flex>
                <Image
                  src="/assets/logo-preta.svg"
                  alt="Logo_iHold"
                  width="150px"
                  objectFit="contain"
                />
                <Box pl="60px">
                  <Text color="#00102A" fontWeight={700} fontSize="26px" textAlign="left">Transfira R${formatCalcValue(data.data.decoded.payment.totalValue.toString())} para {data.data.decoded.holder.name}</Text>
                  <Text color="#00102A" fontWeight={400} textAlign="left">Abra o app em que vai fazer a transferência, escaneie a imagem ou cole o código do QR Code</Text>
                </Box>
              </Flex>
              <Image src="/assets/banner-pix.png" alt="banner" mr="20px" />
            </Flex>
          </Box>
          <SimpleGrid mt="30px" bg="#FFFFFF" boxShadow="base" borderRadius="6px" columns={2} mx="auto" w={{ base: '95%', md: '95%', lg: '100%', xl: '85%' }}>
            <Flex bg="#00102A" p="10px" borderRadius="6px 0px 0px 6px" >
              <Box mx="auto">
                <Text color="#FFFFFF" fontWeight={700} fontSize="22px" py="20px"> Use o QR Code do Pix para pagar</Text>
                <Box bg="#FFFFFF" p="1px" w="min-content" mx="auto">
                  <QRCode size={300} value={window.atob(data.data.qr_code)} />
                </Box>
                <Text color="#FFFFFF" fontWeight={700} fontSize="22px" py="20px" textAlign="center">R${formatCalcValue(data.data.decoded.payment.totalValue.toString())}</Text>
                <Box pb="20px">
                  <Button
                    bg="#2E4EFF"
                    border="1px"
                    borderColor="#2E4EFF"
                    color="#FFF"
                    w="100%"
                    borderRadius="40px"
                    _hover={{
                      bg: "#2641db",
                      borderColor: "#2641db"
                    }}
                    onClick={(() => navigator.clipboard.writeText(window.atob(data.data.qr_code)))}
                  >
                    COPIAR CÓDIGO DO QR CODE
                  </Button>
                </Box>
              </Box>
            </Flex>
            <Center>
              <Box minW="75%">
                <Text color="#00102A" fontWeight={700} fontSize="22px" py="30px" textAlign="center"> Use o QR Code do Pix para pagar</Text>
                <Flex justify="space-between" py="10px" >
                  <Text color="#7F8B9F" fontWeight={400}>Chave Pix</Text>
                  <Flex cursor="pointer" onClick={(() => navigator.clipboard.writeText(window.atob(data.data.qr_code)))}>
                    <Text color="#070A0E" fontWeight={700}>Chave Aleatória</Text>
                    <Box my="auto" pl="5px">
                      <Icon icon="ooui:copy-ltr" color="#21c6de" width="20" />
                    </Box>
                  </Flex>
                </Flex>
                <InfoText header="Nome" text={data.data.decoded.holder.name} />
                <InfoText header="CPF/CNPJ" text={nifFormat(data.data.decoded.holder.document.value, data.data.decoded.holder.document.type ) } />
                <InfoText header="Agência e Conta Corrente" text={data.data.decoded.holder.account.branch + " | " + data.data.decoded.holder.account.number} />
                <InfoText header="Instituição" text={data.data.decoded.bank.name} />
              </Box>
            </Center>
          </SimpleGrid>
        </>
      }
    </Box >
  );
}

type InfoTextProps = {
  header: string | number
  text: string | number
}

const InfoText = ({ header, text }: InfoTextProps) => {
  return (
    <Flex justify="space-between" py="10px" >
      <Text color="#7F8B9F" fontWeight={400}>{header}</Text>
      <Text color="#070A0E" fontWeight={400}>{text}</Text>
    </Flex>
  );
};