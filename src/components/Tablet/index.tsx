import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import moment from 'moment';
import { Loading } from '../Loading';
import { Icon } from '@iconify/react';
import { createPagination } from '~/hooks/createPagination';
import { GetStatementsDownloadVoucher } from '~/services/hooks/useStatements';

interface ITabletTransactionProps {
  isFetching: boolean;
  data: any;
  setCurrentPage: (page: any) => void;
  CurrentPage: number;
}

export function TabletTransaction({
  data,
  isFetching,
  CurrentPage,
  setCurrentPage,
}: ITabletTransactionProps) {
  const { pagination } = createPagination(
    5,
    data?.meta?.last_page || 10,
    data?.meta?.current_page || 0
  );

  function handleDownloadVoucher(statementId: number) {
    // setModalErrorIsOpen(false);

    GetStatementsDownloadVoucher(statementId).then((response) => {
      const fileURL = window.URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href = fileURL;
      link.download = `comprovante.pdf`;
      link.click();
    });
  }
  console.log({ data });

  return (
    <Box>
      {isFetching ? (
        <Center h="500px">
          <Loading />
        </Center>
      ) : (
        <Box overflow="hidden">
          <TableContainer
            h="500px"
            w="full"
            pos="relative"
            // borderRadius="10px"
            overflowY="auto"
          >
            <Table variant="unstyled" size="sm">
              <Thead w="full">
                <Tr
                  // h="40px"
                  top={0}
                  zIndex={1000}
                  pos="sticky"
                  bg="#F0F0F3"
                >
                  <Th>DATA</Th>
                  <Th>TIPO</Th>
                  <Th>NOME</Th>
                  <Th>VALOR</Th>
                  {/* <Th>COMPROVANTE</Th> */}
                </Tr>
              </Thead>
              {data &&
                data.data?.map((item: any, key: any) => {
                  return (
                    <Tbody key={key} w="full" pos="relative">
                      <Tr
                        pos="sticky"
                        top={6}
                        bg="#FFFFFF"
                        transition="all linear .25s"
                      >
                        <Td>
                          <Text w="full">
                            {moment(new Date(item?.date))
                              .add(1, 'days')
                              .format('DD MMM')
                              .toUpperCase()}
                          </Text>
                        </Td>
                        <Td colSpan={5}>
                          <Box bg="#CBD3E0" w="full" h="1px" />
                        </Td>
                      </Tr>
                      {item.item?.map((transaction: any, idx: any) => (
                        <Tr key={idx}>
                          <Td maxW="20px" w="10px">
                            <></>
                          </Td>
                          <Td maxW="20px" w="10px">
                            <Box
                              borderRadius="5px"
                              p="8px"
                              background={
                                transaction?.operation === 'cash-in'
                                  ? '#27ae6033'
                                  : '#ff313b33'
                              }
                            >
                              {transaction?.operation === 'cash-in' ? (
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
                          <Td minW="200px" w="100px">
                            <Box>
                              <Text color="#070A0E" fontWeight={600}>
                                {transaction?.description?.includes(
                                  'TRANSFERÊNCIA ENVIADA'
                                )
                                  ? 'TRANSFERÊNCIA ENVIADA'
                                  : transaction?.description?.includes(
                                      'TRANSFERÊNCIA RECEBIDA'
                                    )
                                  ? 'TRANSFERÊNCIA RECEBIDA'
                                  : transaction?.description?.includes(
                                      'PIX RECEBIDO'
                                    )
                                  ? 'PIX RECEBIDO'
                                  : transaction?.description?.includes(
                                      'PIX ENVIADO'
                                    )
                                  ? 'PIX ENVIADO'
                                  : transaction?.description}
                              </Text>
                              <Text>
                                {transaction?.operation === 'cash-out'
                                  ? transaction?.metadata?.assignor
                                    ? transaction?.metadata?.assignor
                                    : transaction?.metadata?.recipient?.name
                                    ? transaction?.metadata?.recipient?.name
                                    : transaction?.metadata?.payload?.merchant
                                        ?.name
                                  : transaction?.metadata?.sender?.name
                                  ? transaction?.metadata?.sender?.name
                                  : transaction?.metadata?.payload?.merchant
                                  ? transaction?.metadata?.payload?.merchant
                                      ?.name
                                  : ''}
                              </Text>
                              <Text color="#7F8B9F">
                                {moment(transaction?.completed_at).format('LT')}
                              </Text>
                            </Box>
                          </Td>
                          <Td
                            color={
                              transaction?.operation === 'cash-in'
                                ? '#27AE60'
                                : '#F03D3E'
                            }
                          >
                            {transaction?.operation === 'cash-in'
                              ? `R$${transaction?.amount}`
                              : `-  R$${transaction?.amount}`}
                          </Td>
                          {/* <Td colSpan={5}>
                            <Flex align="center" justifyContent="left">
                              <Box
                                ml="35px"
                                bg="#dde2eb"
                                p="6px"
                                borderRadius="50px"
                                onClick={() =>
                                  handleDownloadVoucher(transaction?.id)
                                }
                              >
                                <Icon icon="bx:download" width={20} />
                              </Box>
                            </Flex>
                          </Td> */}
                        </Tr>
                      ))}
                    </Tbody>
                  );
                })}
            </Table>
          </TableContainer>
        </Box>
      )}
      <Flex align="center" w="full" justify="center" mt="40px">
        <Box cursor={!!data?.links?.prev ? 'pointer' : 'not-allowed'}>
          <Icon
            icon="dashicons:arrow-left-alt2"
            color={!!data?.links?.prev ? '#7f8b9f' : '#ccc'}
            width="20"
            height="20"
            onClick={() => {
              if (data?.links?.prev) {
                setCurrentPage((page: number) => page - 1);
              }
            }}
          />
        </Box>

        <Flex minW="250px" justify="center">
          {!isFetching
            ? pagination.map((item, key) => (
                <Button
                  // mx="3px"
                  borderRadius="6px"
                  w="38px"
                  h="38px"
                  key={key}
                  onClick={() => setCurrentPage(item)}
                  color={CurrentPage === item ? '#FFFFFF' : '#CBD3E0'}
                  bg={CurrentPage === item ? '#2E4EFF' : ''}
                >
                  {item}
                </Button>
              ))
            : Array.from({ length: 5 }).map((_, key) => (
                <Skeleton
                  w="38px"
                  h="38px"
                  key={key}
                  borderRadius="6px"
                  mx="3px"
                />
              ))}
        </Flex>
        <Box cursor={!!data?.links?.next ? 'pointer' : 'not-allowed'}>
          <Icon
            icon="dashicons:arrow-right-alt2"
            color={!!data?.links?.next ? '#7f8b9f' : '#ccc'}
            width="20"
            height="20"
            style={{
              cursor: data?.links?.next ? 'pointer' : 'not-allowed',
            }}
            onClick={() => {
              if (data?.links?.next) {
                setCurrentPage((page: number) => page + 1);
              }
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
