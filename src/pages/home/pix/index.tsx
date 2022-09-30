import { Box, Flex, SimpleGrid, TabPanel, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  CardTransaction,
  CardValue,
  ContainerTransaction,
  ExtractTable,
  Layout,
} from '~/components';
import { MenuDropDwon } from '~/components/Menu';
import { GetAllStatementsOperation } from '~/services/hooks/useStatements';
import { IPixAndTEDStatementsData } from '~/types/statements.types';
import { routeTransactions } from '..';

export default function Home() {
  const { data, isLoading } = useQuery('pix', GetAllStatementsOperation, {
    staleTime: 1000 * 60, // 1 minute
  });

  console.log(data);

  return (
    <Layout>
      <SimpleGrid
        mt="30px"
        columns={{ base: 1, md: 2, lg: 3 }}
        w="full"
        spacingX="45px"
      >
        {Array.from({ length: 3 }).map((_, idx) => (
          <CardValue
            percentage={idx === 0 ? 1 * 20 : idx * 20}
            type={idx === 0 ? 'cash-in' : idx === 1 ? 'cash-out' : 'prevision'}
            value={1540 * idx + 1}
            key={idx}
          />
        ))}
      </SimpleGrid>
      <Box bg="#FFFFFF" p="50px" mt="30px">
        <Box w="full" borderRadius="6px" h="720px">
          <Flex mb="30px">
            <Icon
              width="25px"
              cursor="pointer"
              color="#21C6DE"
              icon="akar-icons:eye"
            />
            <Text ml="5px">TODOS EXTRATOS</Text>
          </Flex>
          <ContainerTransaction tabName={['todos', 'entrada', 'Saída']}>
            <TabPanel>
              <ExtractTable isLoading={isLoading} items={data} />
            </TabPanel>
            <TabPanel>
              <p>Dados de Pix entrada</p>
            </TabPanel>
            <TabPanel>
              <p>Dados de Pix saida</p>
            </TabPanel>
          </ContainerTransaction>
        </Box>
        <Text>MAIS ACESSADOS</Text>
        <Flex w="full" justify="space-between" h="full" pb="50px">
          {routeTransactions.map((item, idx) => (
            <CardTransaction
              key={idx}
              path={item?.path || ''}
              name={item.title}
              icon={<Icon icon={item.iconName} color="#21C6DE" width={25} />}
            />
          ))}
        </Flex>
      </Box>
    </Layout>
  );
}
