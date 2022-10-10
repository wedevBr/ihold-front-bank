import { Box, Flex, SimpleGrid, TabPanel, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React from 'react';
import { useQuery } from 'react-query';
import {
  CardTransaction,
  CardValue,
  ContainerTransaction,
  ExtractAllTable,
  Layout,
} from '~/components';
import { GetAllStatementsOperation, GetStatementsOperation } from '~/services/hooks/useStatements';
import { formatCalcValue } from '~/utils/formatValue';
import { routeTransactions } from '..';

export default function AllStatements() {

  const { data, isLoading } = useQuery([0], () => GetAllStatementsOperation(0), {
    staleTime: 1000 * 60, // 1 minute
  });
  // const { data: dataCashIn, isLoading: isLoadingCahsIn } = useQuery(['cash-in', 0], () => GetStatementsOperation('cash-in', 0), {
  //   staleTime: 1000 * 120, // 1 minute
  // });
  const { data: dataCashOut, isLoading: isLoadingCashOut } = useQuery(['cash-out', 0], () => GetStatementsOperation('cash-out', 0), {
    staleTime: 1000 * 60, // 1 minute
  });

  const outAmount = data?.summary?.cash_out?.amount || "";
  const InAmount = data?.summary?.cash_in?.amount || "";


  const handleCalcValue = (val: string) => parseInt(val?.replace(/[\D]+/g, ""));
  const result = handleCalcValue(InAmount) - handleCalcValue(outAmount);

  return (
    <Layout>
      <SimpleGrid
        mt="30px"
        columns={{ base: 1, md: 2, lg: 3 }}
        w="full"
        spacingX="45px"
      >
        <CardValue
          percentage={100}
          type={'cash-in'}
          value={data ? data?.summary?.cash_in?.amount : '-'}
        />
        <CardValue
          percentage={100}
          type={'cash-out'}
          value={data ? data?.summary?.cash_out?.amount : '-'}
        />
        <CardValue
          percentage={100}
          type={'prevision'}
          value={data ? formatCalcValue(result.toString()) : '-'}
          result={result}
        />
      </SimpleGrid>
      <Box bg="#FFFFFF" p="50px" mt="30px" borderRadius="10px">
        <Box w="full" borderRadius="6px" h="620px">
          <Flex mb="30px">
            <Icon
              width="25px"
              cursor="pointer"
              color="#21C6DE"
              icon="akar-icons:eye"
            />
            <Text ml="5px">TODOS OS EXTRATOS</Text>
          </Flex>
          <ContainerTransaction tabName={['todos']}>
            <TabPanel>
              <ExtractAllTable isLoading={isLoading} items={data} />
            </TabPanel>
            {/* <TabPanel>
              <ExtractAllTable isLoading={isLoadingCahsIn} items={dataCashIn} />
            </TabPanel>
            <TabPanel>
              <ExtractAllTable isLoading={isLoadingCashOut} items={dataCashOut} />
            </TabPanel> */}
          </ContainerTransaction>
        </Box>
      </Box>
      <Box bg="#FFFFFF" p="50px" mt="30px" borderRadius="10px">
        <Text>MAIS ACESSADOS</Text>
        <Flex w="full" justify="space-between" h="full" pt="20px">
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