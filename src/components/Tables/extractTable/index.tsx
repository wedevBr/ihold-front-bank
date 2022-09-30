import { Fragment, ReactNode, useEffect, useState } from 'react';
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Center,
  Flex,
} from '@chakra-ui/react';
import { Loading } from '~/components';
import { StatementData } from '~/types/statements.types';
import { Icon } from '@iconify/react';
import { dateFnsFormatDate } from '~/utils/fotmat';

type tableProps = {
  items?: StatementData;
  isLoading: boolean;
};

export const ExtractTable = ({ items, isLoading }: tableProps) => {
  const tipo = "cash-in"

  return isLoading ? (
    <Center h="full" mt="30px" >
      <Loading />
    </Center>
  ) : (
    <>
      <Table w="100%" overflowX="hidden" mt="30px" h="30px" overflowY="scroll" >
        <Thead>
          <Tr bg="#F0F0F3">
            <Th colSpan={6} fontWeight="600"
              fontSize="14px"
              color="primary.600"
            > <Flex>
                <Icon icon="fluent:payment-24-regular" width="16" />
                <Text paddingLeft="5px">
                  Compras à vista
                </Text>
              </Flex>
            </Th>

          </Tr>
        </Thead>
        <Tbody overflowX="hidden">
          {items && items.data.map((item, key) => (
            <Tr
              bg="#fff"
              borderBottom="1px solid #CBD3E0"
              overflowX="hidden"
              borderColor="gray.100"
              key={key}
            >
              <Td background={item.operation === "cash-in" ? '#27ae6033' : '#ff313b33'}  
              w="min" width="1.75rem" height="1.75rem">
                {item.operation === "cash-in" ?
                  <Icon
                    icon='bi:arrow-90deg-up'
                    color='#27AE60'
                    width={16}
                  /> : <Icon
                    icon='bi:arrow-90deg-down'
                    color='#F03D3E'
                    width={16}
                  />}
              </Td>
              <Td >
                {item.operation === "cash-out"
                  ? item.metadata?.recipient?.name
                  : item.metadata?.sender?.name}
              </Td>
              <Td >
                {item?.description}
              </Td>
              <Td >
                {dateFnsFormatDate(item.completed_at)}
              </Td>
              <Td color={item.operation === "cash-in" ? '#27AE60' : '#F03D3E'}>

                {item.operation === "cash-in" ?
                  `R$${item.amount}`
                  : `-  R$${item.amount}`
                }

              </Td>
            </Tr>

          )
          )
          }
        </Tbody>


      </Table>
    </>
  );
};