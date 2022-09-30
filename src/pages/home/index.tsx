import { Box, Flex, SimpleGrid, TabPanel, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React from 'react';
import {
  CardValue,
  ContainerTransaction,
  ExtractTable,
  Layout,
} from '~/components';
import { MenuDropDwon } from '~/components/Menu';

export default function Home() {
  return (
    <Box h="full">
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
              type={
                idx === 0 ? 'cash-in' : idx === 1 ? 'cash-out' : 'prevision'
              }
              value={1540 * idx + 1}
              key={idx}
            />
          ))}
        </SimpleGrid>
        <Box bg="#FFFFFF" w="full" mt="30px" borderRadius="6px" p="50px">
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
              <ExtractTable isLoading={false} />
            </TabPanel>
            <TabPanel>
              <p>Dados de Pix HOME</p>
            </TabPanel>
            <TabPanel>
              <p>Dados de Pix saida</p>
            </TabPanel>
          </ContainerTransaction>
        </Box>
      </Layout>
    </Box>
  );
}
