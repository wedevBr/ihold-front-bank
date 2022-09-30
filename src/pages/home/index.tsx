import { Box, Flex, SimpleGrid, TabPanel, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React from 'react';
import {
  CardTransaction,
  CardValue,
  ContainerTransaction,
  ExtractTable,
  Layout,
} from '~/components';
import { MenuDropDwon } from '~/components/Menu';
export const routeTransactions = [
  {
    id: 1,
    iconName: 'ic:baseline-pix',
    title: 'Pix',
    path: '/home/pix',
  },

  {
    id: 2,
    iconName: 'akar-icons:arrow-repeat',
    title: 'Transferir',
    path: '/home/ted',
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
    path: '/payment',
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
  return (
    <Box h="full">
      <Layout>
        <Flex mt="30px">
          <Box
            bg="#FFFFFF"
            w="70%"
            h="350px"
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
              <Text ml="5px">TODOS EXTRATOS</Text>
            </Flex>
          </Box>
          <Box
            bg="#FFFFFF"
            w="45%"
            h="350px"
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
                  path={item?.path || ''}
                  name={item.title}
                  icon={
                    <Icon icon={item.iconName} color="#21C6DE" width={25} />
                  }
                />
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Layout>
    </Box>
  );
}
