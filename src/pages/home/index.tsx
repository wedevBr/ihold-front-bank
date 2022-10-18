import { Box, Flex, SimpleGrid, Text, Image } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React from 'react';
import { useQuery } from 'react-query';
import { CardTransaction, ExtractHomeTable, Layout } from '~/components';
import { MenuDropDwon } from '~/components/Menu';
import { GetAllStatementsOperation } from '~/services/hooks/useStatements';
export const routeTransactions = [
  {
    id: 1,
    iconName: 'ic:baseline-pix',
    title: 'Pix',
    // path: '/home/pix',
  },

  {
    id: 2,
    iconName: 'akar-icons:arrow-repeat',
    title: 'Transferir',
    // path: '/home/ted',
  },
  {
    id: 3,
    iconName: 'iconoir:wallet',
    title: 'Depositar',
  },
  {
    id: 4,
    iconName: 'bi:qr-code-scan',
    title: 'Pagar',
    // path: '/payment',
  },
  {
    id: 5,
    iconName: 'bi:credit-card-2-back',
    title: 'Solicitar cartão',
  },
  {
    id: 6,
    iconName: 'bi:question-circle',
    title: 'Dúvidas',
  },
];

export default function Home() {
  const { data, isLoading } = useQuery(
    [0],
    () => GetAllStatementsOperation(0),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
  const { data: pixData, isLoading: pixLoading } = useQuery(
    [2],
    () => GetAllStatementsOperation(2),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
  return (
    <Box h="full">
      <Layout>
        <Flex mt="30px">
          <Box w="70%">
            <Box
              bg="#FFFFFF"
              h="300px"
              mr="20px"
              borderRadius="10px"
              boxShadow="base"
              p="20px"
            >
              <Flex mb="30px">
                <Icon
                  width="25px"
                  cursor="pointer"
                  color="#21C6DE"
                  icon="akar-icons:eye"
                />
                <Text ml="5px">MEU EXTRATO</Text>
              </Flex>
              <ExtractHomeTable isLoading={isLoading} items={data} />
            </Box>
            <Box
              bg="#FFFFFF"
              h="300px"
              mr="20px"
              my="20px"
              borderRadius="10px"
              boxShadow="base"
              p="20px"
            >
              <Flex mb="30px">
                <Icon
                  width="25px"
                  cursor="pointer"
                  color="#21C6DE"
                  icon="akar-icons:eye"
                />
                <Text ml="5px">PIX</Text>
              </Flex>
              <ExtractHomeTable isLoading={pixLoading} items={pixData} />
            </Box>
          </Box>
          <Box w="45%">
            <Box
              bg="#FFFFFF"
              h="300px"
              p="20px"
              borderRadius="10px"
              boxShadow="base"
            >
              <Text>MAIS ACESSADOS</Text>
              <SimpleGrid
                columns={{ base: 1, lg: 3 }}
                py="10px"
                spacing="20px"
                w="full"
              >
                {routeTransactions.map((item, idx) => (
                  <CardTransaction
                    key={idx}
                    path={''}
                    name={item.title}
                    icon={
                      <Icon icon={item.iconName} color="#21C6DE" width={25} />
                    }
                  />
                ))}
              </SimpleGrid>
            </Box>
            <SimpleGrid columns={2} gap={5} mt="20px">
              <Box
                bg="#FFFFFF"
                h="161px"
                p="20px"
                borderRadius="10px"
                boxShadow="base"
                w="full"
              >
                <Flex pt="10px">
                  <Image
                    src="/assets/bitcoin.svg"
                    alt="Bitcoin"
                    width="40px"
                    objectFit="contain"
                  />
                </Flex>
                <Text mt="40px" fontSize="20px" fontWeight="700">
                  138.944,03 BRL
                </Text>
              </Box>
              <Box
                bg="#FFFFFF"
                h="161px"
                p="20px"
                borderRadius="10px"
                boxShadow="base"
                w="full"
              >
                <Flex pt="10px">
                  <Image
                    src="/assets/etherium.svg"
                    alt="Bitcoin"
                    width="40px"
                    objectFit="contain"
                  />
                </Flex>
                <Text mt="40px" fontSize="20px" fontWeight="700">
                  138.944,03 BRL
                </Text>
              </Box>
            </SimpleGrid>
            <Box
              h="118px"
              mt="20px"
              borderRadius="10px"
              backgroundImage="url('/assets/background-cellphone.png')"
              backgroundSize="cover"
            >
              <Flex>
                <Box>
                  <Image
                    src="/assets/cellphone.png"
                    alt="cellphone"
                    width="150px"
                    objectFit="contain"
                  />
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Layout>
    </Box>
  );
}
