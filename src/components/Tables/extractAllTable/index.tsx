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
  Box,
} from '@chakra-ui/react';
import { Loading } from '~/components';
import { StatementData } from '~/types/statements.types';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { truncate } from '~/utils/truncate';
// import { dateFnsFormatDate } from '~/utils/fotmat';

type tableProps = {
  items?: StatementData;
  isLoading: boolean;
};

export const ExtractAllTable = ({ items, isLoading }: tableProps) => {
  return isLoading ? (
    <Center h="500px" mt="30px">
      <Loading />
    </Center>
  ) : (
    <>
      <Flex align="center" w="full" bg="#F0F0F3" mt="5px">
        <Icon icon="fluent:payment-24-regular" width="16" />
        <Text paddingLeft="5px">Compras à vista</Text>
      </Flex>
      <Box h="500px" overflowY="scroll">
        <Table>
          <Thead>
            <Tr bg="#F0F0F3"></Tr>
          </Thead>
          <Tbody>
            {items &&
              items?.data?.map((item, key) => (
                <Tr
                  bg="#fff"
                  borderBottom="1px solid #CBD3E0"
                  borderColor="gray.100"
                  key={key}
                >
                  <Td
                    p="5px"
                    // width="1.75rem"
                    // height="1.75rem"
                  >
                    <Box
                      borderRadius="5px"
                      p="8px"
                      background={
                        item?.operation === 'cash-in'
                          ? '#27ae6033'
                          : '#ff313b33'
                      }
                    >
                      {item?.operation === 'cash-in' ? (
                        <Icon
                          icon="bi:arrow-90deg-up"
                          color="#27AE60"
                          width={16}
                        />
                      ) : (
                        <Icon
                          icon="bi:arrow-90deg-down"
                          color="#F03D3E"
                          width={16}
                        />
                      )}
                    </Box>
                  </Td>
                  <Td minW="300px">
                    {item?.operation === 'cash-out'
                      ? truncate(item?.metadata?.recipient?.name ?? '', 22)
                        ? truncate(item?.metadata?.recipient?.name ?? '', 22)
                        : truncate(
                            item?.metadata?.payload?.merchant?.name ?? '',
                            22
                          )
                      : truncate(item?.metadata?.sender?.name ?? '', 22)
                      ? truncate(item?.metadata?.sender?.name ?? '', 22)
                      : truncate(
                          item?.metadata?.payload?.merchant?.name ?? '',
                          22
                        )}
                  </Td>
                  <Td>{truncate(item?.description ?? '', 35)}</Td>
                  <Td>{moment(item?.completed_at).format('LLL')}</Td>
                  <Td
                    color={
                      item?.operation === 'cash-in' ? '#27AE60' : '#F03D3E'
                    }
                  >
                    {item?.operation === 'cash-in'
                      ? `R$${item?.amount}`
                      : `-  R$${item?.amount}`}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};
