import React, { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  TableContainer,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import { Loading } from '../Loading';
import { Icon } from '@iconify/react';
import { createPagination } from '~/hooks/createPagination';
import { GetStatementsDownloadVoucher } from '~/services/hooks/useStatements';
import axios from 'axios';
import { transaction } from '~/services/hooks/usePaymentsSchedule';
import { phonesFormat } from '~/utils/phonesFormat';
import { nifFormat } from '~/utils/nifFormat';
import { formatCalcValue } from '~/utils/formatValue';
import { ModalEditPayment } from '../Modals/ModalEditPayment';
import {
  QueryObserverBaseResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

type id = { id: number[]; statements?: number[]; payments?: number[] };
interface ITabletTransactionProps {
  type: transaction;
  isFetching: boolean;
  data: any;
  dataTransfer?: any;
  edit?: boolean;
  getScheduleIDS?: (ids: id) => void;
  setCurrentPage: (page: any) => void;
  CurrentPage: number;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverBaseResult>;
}

interface checkBoxsSelected {
  id: number;
  statement?: number;
  payment?: number;
  value: boolean;
}

export function TabletPayments({
  edit,
  type,
  data,
  dataTransfer,
  isFetching,
  CurrentPage,
  setCurrentPage,
  getScheduleIDS,
  refetch,
}: ITabletTransactionProps) {
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState<checkBoxsSelected[]>([]);
  const [transaction, setTransaction] = useState<any>();
  const [uuid, setUuid] = useState(0);
  const { pagination } = createPagination(
    5,
    data?.meta?.last_page || 10,
    data?.meta?.current_page || 0
  );
  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();

  const {
    isOpen: isOpenEditPix,
    onOpen: onPenEditPix,
    onClose: onCloseEditPix,
  } = useDisclosure();

  const individualCheck = (
    id: number,
    state: boolean,
    statement?: number,
    payment?: number
  ) => {
    if (checked.find((user) => user.id === id)) {
      setChecked(checked.filter((user) => user.id !== id));
      return;
    }
    setChecked((users) =>
      users.concat({ id, value: state, statement, payment })
    );
  };

  const totalCheck = (all: any) => {
    let newData: any = [];
    all.map((itemData: any) => itemData.map((data: any) => newData.push(data)));
    console.log({ newData });

    console.log({ all });

    setChecked(
      newData?.map((item: any) => {
        return {
          id: +item?.id,
          value: true,
          statement: item?.statement,
          payment: item?.is_approved === false ? item?.id : null,
        };
      })
    );

    setAllChecked(!allChecked);
    if (data) {
      setChecked(
        newData?.map((item: any) => {
          return {
            id: +item?.id,
            value: true,
            statement: item?.statement,
            payment: item?.is_approved === false ? item?.id : null,
          };
        })
      );
      console.log({ checked });
    }
  };

  function handleDownloadVoucher(statementId: number) {
    GetStatementsDownloadVoucher(statementId).then((response) => {
      const fileURL = window.URL.createObjectURL(response);
      console.log({ response });

      let link = document.createElement('a');
      link.href = fileURL;
      link.download = `comprovante-${
        type === 'transfer'
          ? 'transferência'
          : type === 'bill-payment'
          ? 'Boleto'
          : 'Pix'
      }.pdf`;
      link.click();
    });
  }

  useEffect(() => {
    const format = () => {
      const data_IDs: number[] = [];
      const statement_IDs: any[] = [];
      const payments_ids: any[] = [];
      checked.length ? checked.map((item) => data_IDs.push(item?.id)) : null;
      checked.length
        ? checked.map((item) => statement_IDs.push(item?.statement))
        : null;
      checked.length
        ? checked.map((item) => payments_ids.push(item?.payment))
        : null;
      console.log('OIII', checked);

      getScheduleIDS &&
        getScheduleIDS({
          id: data_IDs,
          statements: statement_IDs,
          payments: payments_ids,
        });
    };
    format();
  }, [checked]);

  useEffect(() => {
    if (!data?.data?.length || dataTransfer?.data?.length) {
      setAllChecked(false);
      setChecked([]);
      refetch && refetch();
    }
    setChecked([]);
  }, [data, dataTransfer]);

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
                  <Th maxW="10px" w="10px" minW="10px">
                    <Checkbox
                      isChecked={allChecked}
                      onChange={() => {
                        if (allChecked) {
                          setAllChecked(!allChecked);
                          setChecked([]);
                          return;
                        }
                        let allData =
                          data?.data?.map((newData: any) => newData.item) ||
                          dataTransfer?.data ||
                          [];
                        totalCheck(allData);
                      }}
                    />
                  </Th>
                  <Th maxW="110px">AGENDAMENTO</Th>
                  {/* <Th>TIPO</Th> */}
                  <Th>
                    {' '}
                    {type === 'pix'
                      ? 'CHAVE'
                      : type === 'transfer'
                      ? 'TIPO DE CONTA'
                      : 'LINHA DIGITÁVEL'}
                  </Th>
                  <Th>
                    {type === 'pix'
                      ? 'VALOR'
                      : type === 'transfer'
                      ? 'VALOR'
                      : ''}
                  </Th>
                  <Th>
                    {type === 'pix'
                      ? 'EMAIL'
                      : type === 'transfer'
                      ? 'AGÊNCIA'
                      : ''}
                  </Th>
                  <Th>
                    {type === 'pix'
                      ? 'DESCRIÇÃO'
                      : type === 'transfer'
                      ? 'CONTA'
                      : ''}
                  </Th>
                  {type === 'transfer' && <Th>EMPRESA</Th>}
                  <Th>STATUS</Th>
                  <Th>COMPROVANTE</Th>
                  {edit && <Th>ACÕES</Th>}
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
                        zIndex={1000}
                      >
                        <Td>
                          <></>
                        </Td>
                        <Td maxW="20px" w="20px" whiteSpace="pre-wrap">
                          <Text maxW="80px" fontWeight="bold">
                            {moment(new Date(item?.date))
                              .add(1, 'days')
                              .format('DD MMM')
                              .toUpperCase()}
                          </Text>
                        </Td>
                        <Td colSpan={edit ? 9 : 8}>
                          <Box bg="#CBD3E0" w="full" h="1px" />
                        </Td>
                      </Tr>
                      {item.item?.map((transaction: any, idx: any) => {
                        // console.log({ transaction });

                        return (
                          <Tr key={idx}>
                            <Td maxW="10px">
                              <Checkbox
                                onChange={(e) => {
                                  console.log(
                                    transaction.id,
                                    e.target.checked,
                                    transaction?.status?.name === 'completed'
                                      ? transaction?.transaction?.id
                                      : 0
                                  );

                                  individualCheck(
                                    transaction.id,
                                    e.target.checked,
                                    transaction?.status?.name === 'completed'
                                      ? transaction?.transaction?.id
                                      : 0,
                                    transaction?.is_approved === false
                                      ? transaction?.id
                                      : null
                                  );
                                }}
                                isChecked={
                                  checked.find(
                                    (user) => user?.id === transaction?.id
                                  )?.value || false
                                }
                              />
                            </Td>
                            <Td>
                              <Box
                                w="31px"
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
                                    icon={
                                      transaction?.status.name === 'canceled'
                                        ? 'material-symbols:cancel-outline'
                                        : 'bi:arrow-90deg-down'
                                    }
                                    color="#F03D3E"
                                    width={16}
                                  />
                                )}
                              </Box>
                            </Td>
                            {/* <Td maxW="20px" w="10px">
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
                            </Td> */}
                            <Td maxW="170px" whiteSpace="pre-wrap">
                              <Box>
                                <Text
                                  color="#070A0E"
                                  fontWeight={600}
                                  textTransform="uppercase"
                                >
                                  {type === 'pix'
                                    ? transaction?.payload?.key_type
                                    : type === 'transfer'
                                    ? (transaction?.payload?.recipient
                                        ?.account_type === 'checking' &&
                                        'Corrente') ||
                                      (transaction?.payload?.recipient
                                        ?.account_type === 'savings' &&
                                        'Poupança')
                                    : transaction.account}
                                </Text>
                                <Text>
                                  {type === 'pix'
                                    ? transaction?.payload?.key_type ===
                                      'TELEFONE'
                                      ? phonesFormat(transaction?.payload.key)
                                      : transaction?.payload?.key_type === 'CPF'
                                      ? nifFormat(
                                          transaction?.payload?.key,
                                          'cpf'
                                        )
                                      : transaction?.payload?.key_type ===
                                        'CNPJ'
                                      ? nifFormat(
                                          transaction?.payload?.key,
                                          'cnpj'
                                        )
                                      : transaction?.payload.key
                                    : type === 'transfer'
                                    ? transaction?.payload?.recipient?.name
                                    : ''}
                                </Text>
                                <Text color="#7F8B9F">
                                  {moment(
                                    transaction?.completed_at ||
                                      transaction?.created_at
                                  ).format('LT')}
                                </Text>
                              </Box>
                            </Td>
                            <Td
                              maxW="200px"
                              whiteSpace="pre-wrap"
                              color={
                                transaction?.operation === 'cash-in'
                                  ? '#27AE60'
                                  : '#F03D3E'
                              }
                            >
                              {type === 'pix'
                                ? `R$ ${formatCalcValue(
                                    transaction?.payload?.amount
                                  )}`
                                : type === 'transfer'
                                ? formatCalcValue(transaction.payload?.amount)
                                : ''}
                            </Td>
                            <Td maxW="190px" whiteSpace="pre-wrap">
                              {type === 'pix' ? (
                                <Text>{transaction?.payload?.email}</Text>
                              ) : type === 'transfer' ? (
                                transaction?.payload?.recipient?.bank_code
                              ) : (
                                'Não Informado'
                              )}
                            </Td>
                            <Td maxW="170px" whiteSpace="pre-wrap">
                              {type === 'pix' ? (
                                <Text>{transaction?.payload?.description}</Text>
                              ) : type === 'transfer' ? (
                                transaction?.payload?.recipient?.account
                              ) : (
                                ''
                              )}
                            </Td>
                            <Td maxW="150px" whiteSpace="pre-wrap">
                              {type === 'pix' ? (
                                <Badge
                                  variant="solid"
                                  colorScheme={
                                    transaction?.status.name === 'pending'
                                      ? 'yellow'
                                      : transaction?.status.name ===
                                          'waiting' ||
                                        transaction?.status.name === 'canceled'
                                      ? 'red'
                                      : transaction?.status.name ===
                                        'processing'
                                      ? 'blue.200'
                                      : transaction?.status.name === 'completed'
                                      ? 'green'
                                      : ''
                                  }
                                >
                                  {transaction?.status?.name === 'pending' &&
                                    'Pendente'}
                                  {transaction?.status?.name === 'waiting' &&
                                    'Em espera'}
                                  {transaction?.status?.name === 'canceled' &&
                                    'Cancelado'}
                                  {transaction?.status?.name === 'completed' &&
                                    'Completo'}
                                  {transaction?.status?.name === 'processing' &&
                                    'Em processos'}
                                </Badge>
                              ) : type === 'transfer' ? (
                                transaction?.payload?.recipient?.bank_name
                              ) : (
                                ''
                              )}
                            </Td>
                            {type === 'transfer' && (
                              <Td minW="180px">
                                <Badge
                                  variant="solid"
                                  colorScheme={
                                    transaction?.status.name === 'pending'
                                      ? 'yellow'
                                      : transaction?.status.name ===
                                          'waiting' ||
                                        transaction?.status.name === 'canceled'
                                      ? 'red'
                                      : transaction?.status.name ===
                                        'processing'
                                      ? 'blue.200'
                                      : transaction?.status.name === 'completed'
                                      ? 'green'
                                      : ''
                                  }
                                >
                                  {transaction?.status?.name === 'pending' &&
                                    'Pendente'}
                                  {transaction?.status?.name === 'waiting' &&
                                    'Em espera'}
                                  {transaction?.status?.name === 'canceled' &&
                                    'Cancelado'}
                                  {transaction?.status?.name === 'completed' &&
                                    'Completo'}
                                  {transaction?.status?.name === 'processing' &&
                                    'Em processos'}
                                </Badge>
                              </Td>
                            )}
                            <Td minW="20px">
                              {(transaction?.status?.name === 'completed' && (
                                <Flex align="center" justifyContent="center">
                                  <Box
                                    bg="#dde2eb"
                                    p="6px"
                                    borderRadius="50px"
                                    onClick={() =>
                                      handleDownloadVoucher(
                                        transaction?.transaction?.id
                                      )
                                    }
                                  >
                                    <Icon icon="bx:download" width={20} />
                                  </Box>
                                </Flex>
                              )) || (
                                <Flex align="center" justifyContent="center">
                                  <Box
                                    // bg="#dde2eb"
                                    p="6px"
                                    borderRadius="50px"
                                    // onClick={() => handleDownloadVoucher(item?.id)}
                                  ></Box>
                                </Flex>
                              )}
                            </Td>
                            {!transaction?.is_approved && edit && (
                              <Td>
                                <Menu direction="rtl">
                                  <MenuButton>
                                    <Icon icon="carbon:settings" width={20} />
                                  </MenuButton>
                                  <MenuList>
                                    <MenuItem
                                      onClick={() => {
                                        setUuid(transaction.id);
                                        setTransaction(transaction);
                                        onPenEditPix();
                                      }}
                                    >
                                      <Icon
                                        icon="codicon:edit"
                                        color="#21C6DE"
                                        width={20}
                                      />{' '}
                                      <Text ml={2}>Editar</Text>
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              </Td>
                            )}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  );
                })}
            </Table>
          </TableContainer>
        </Box>
      )}
      <ModalEditPayment
        dataTransfer={transaction as any}
        dataPix={transaction as any}
        isOpen={isOpenEditPix}
        onClose={onCloseEditPix}
        type={type}
        // setLoading={loadingEdit && loadingEdit}
      />
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
