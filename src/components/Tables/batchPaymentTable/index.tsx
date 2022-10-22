/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
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
  Checkbox,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  TableContainer,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Loading, ModalEditPayment, Pagination } from '~/components';
import { Icon } from '@iconify/react';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  IDataBillPayment,
  IDataPIX,
  IDataTed,
  IPayloadPix,
} from '~/types/scheduledTransactions';
import { formatCalcValue } from '~/utils/formatValue';
import { phonesFormat } from '~/utils/phonesFormat';
import { nifFormat } from '~/utils/nifFormat';
import { IPaginationData } from '~/types/pagination';
import {
  QueryObserverBaseResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { getLocalStorage, setLocalStorage } from '~/utils/localStorageFormat';
import { ModalAuth } from '~/components/Modals/ModalAuth';
import { GetScheduleAllTransactionDataApproved } from '~/services/hooks/usePaymentsSchedule';
import { ModalStatus } from '~/components/Modals/ModalStatus';
import { GetStatementsDownloadVoucher } from '~/services/hooks/useStatements';
// import { dateFnsFormatDate } from '~/utils/fotmat';

type tableProps = {
  type?: 'pix' | 'transfer' | 'bill-payment';
  filterApproved?: 'true' | 'false';
  edit?: boolean;
  dataBillPayment?: IPaginationData<IDataBillPayment>;
  dataTransfer?: IPaginationData<IDataTed>;
  items?: IPaginationData<IDataPIX>;
  isLoading?: boolean;
  loading: (state: boolean) => void;
  loadingEdit?: (state: boolean) => void;
  getScheduleIDS?: (ids: number[]) => void;
  page?: number;
  setPage: (numberPage: number) => void;
  setState: (item: any) => void;
  refreshItems?: (state: boolean) => void;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverBaseResult>;
};

interface checkBoxsSelected {
  id: number;
  value: boolean;
}
export const BatchPaymentTable = ({
  type,
  items,
  dataBillPayment,
  dataTransfer,
  isLoading,
  edit,
  filterApproved,
  getScheduleIDS,
  refreshItems,
  loading,
  loadingEdit,
  setPage,
  setState,
  refetch,
}: tableProps) => {
  const [allChecked, setAllChecked] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [checked, setChecked] = useState<checkBoxsSelected[]>([]);
  const [password, setPassword] = useState('');
  const [uuid, setUuid] = useState(0);
  const [transaction, setTransaction] = useState<IDataPIX | IDataTed>();

  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();

  const {
    isOpen: isOpenSuccess,
    onOpen: onPenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();

  const {
    isOpen: isOpenEditPix,
    onOpen: onPenEditPix,
    onClose: onCloseEditPix,
  } = useDisclosure();
  const toast = useToast();

  const individualCheck = (id: number, state: boolean) => {
    if (checked.find((user) => user.id === id)) {
      setChecked(checked.filter((user) => user.id !== id));
      return;
    }
    setChecked((users) => users.concat({ id, value: state }));
  };

  const totalCheck = (all: any) => {
    setChecked(
      all?.map((item: any) => {
        return {
          id: item.id,
          value: true,
        };
      })
    );
    setAllChecked(!allChecked);
    if (items) {
      setChecked(
        items?.data?.map((item: any) => {
          return {
            id: item.id,
            value: true,
          };
        })
      );
    }
  };

  async function handleConfirmationPayment(secretPassword: string) {
    if (uuid && secretPassword) {
      loading(true);
      setPaymentLoading(true);
      refreshItems && refreshItems(true);
      try {
        const response = await GetScheduleAllTransactionDataApproved(
          uuid,
          secretPassword
        );
        if (!response) {
          toast({
            title: 'Senha inválida!',
            status: 'error',
            variant: 'solid',
            isClosable: true,
          });
          onCloseAuth();
          return;
        }
        onCloseAuth();
        onPenSuccess();
      } catch (error) {
      } finally {
        setPaymentLoading(false);
        setUuid(0);
        refreshItems && refreshItems(false);
        loading(false);
      }
    }
  }

  function handleDownloadVoucher(statementId: number) {
    // setModalErrorIsOpen(false);

    GetStatementsDownloadVoucher(statementId).then((response) => {
      console.log(response, 'comprovante.pdf');

      // fileDownload(response, 'comprovante.pdf');
    });
  }

  useEffect(() => {
    const format = () => {
      const data_IDs: number[] = [];
      checked.length ? checked.map((item) => data_IDs.push(item.id)) : null;
      getScheduleIDS && getScheduleIDS(data_IDs);
    };
    format();
  }, [checked]);

  useEffect(() => {
    if (!items?.data?.length || dataTransfer?.data?.length) {
      setAllChecked(false);
      setChecked([]);
      refetch && refetch();
    }
    setChecked([]);
  }, [items, dataTransfer]);

  return isLoading ? (
    <Center h="500px" mt="30px">
      <Loading />
    </Center>
  ) : (
    <>
      <Box overflowX="scroll">
        <Table>
          <Thead color="#FFF">
            <Tr bg="#7F8B9F" fontSize="1rem">
              <Th>
                {' '}
                <Checkbox
                  isChecked={allChecked}
                  onChange={() => {
                    if (allChecked) {
                      setAllChecked(!allChecked);
                      setChecked([]);
                      return;
                    }
                    totalCheck(items?.data || dataTransfer?.data || []);
                  }}
                />
              </Th>
              <Th color="#FFF">
                {' '}
                {type === 'pix'
                  ? 'TIPO DE CHAVE'
                  : type === 'transfer'
                  ? 'TIPO DE CONTA'
                  : 'LINHA DIGITÁVEL'}
              </Th>
              <Th color="#FFF" maxW="100px">
                {type === 'pix'
                  ? 'CHAVE PIX'
                  : type === 'transfer'
                  ? 'NOME'
                  : 'AGENDAMENTO'}
              </Th>
              <Th color="#FFF">
                {type === 'pix'
                  ? 'CPF/CNPJ'
                  : type === 'transfer'
                  ? 'CPF/CNPJ'
                  : 'PAGAMENTO'}
              </Th>
              <Th color="#FFF">
                {type === 'pix'
                  ? 'AGENDAMENTO'
                  : type === 'transfer'
                  ? 'AGENDAMENTO'
                  : 'VALOR'}
              </Th>
              <Th color="#FFF">
                {type === 'pix'
                  ? 'EMAIL'
                  : type === 'transfer'
                  ? 'EMPRESA'
                  : 'STATUS'}
              </Th>
              <Th color="#FFF">
                {type === 'pix'
                  ? 'DESCRIÇÃO'
                  : type === 'transfer'
                  ? 'AGÊNCIA'
                  : 'STATUS'}
              </Th>
              {type === 'pix' || type === 'transfer' ? (
                <Th color="#FFF">
                  {type === 'pix'
                    ? 'VALOR'
                    : type === 'transfer'
                    ? 'CONTA'
                    : 'STATUS'}
                </Th>
              ) : (
                <></>
              )}
              <Th color="#FFF">
                {type === 'pix'
                  ? 'STATUS'
                  : type === 'transfer'
                  ? 'VALOR'
                  : 'BOLETO'}
              </Th>
              {type === 'transfer' && (
                <Th color="#FFF">
                  {type === 'transfer' ? 'STATUS' : 'BOLETO'}
                </Th>
              )}
              <Th color="#FFF">COMPROVANTE</Th>
              <Th color="#FFF">AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(type === 'pix'
              ? items?.data
              : type === 'transfer'
              ? dataTransfer?.data
              : dataBillPayment?.data || []
            )?.map((item, index) => (
              <Tr key={index} fontSize="15px">
                <Td
                  // overflow="hidden"
                  bg="#ffffff"
                  textAlign="center"
                  borderColor="gray.100"
                  // whiteSpace="nowrap"
                  // minWidth="40px"
                  // maxWidth="40px"
                  // width="300px"
                >
                  <Checkbox
                    onChange={(e) => {
                      individualCheck(item.id, e.target.checked);
                    }}
                    isChecked={
                      checked.find((user) => user.id === item.id)?.value ||
                      false
                    }
                  />
                </Td>
                <Td>
                  {type === 'pix'
                    ? item?.payload?.key_type
                    : type === 'transfer'
                    ? (item?.payload?.recipient?.account_type === 'checking' &&
                        'Corrente') ||
                      (item?.payload?.recipient?.account_type === 'savings' &&
                        'Poupança')
                    : item.account}
                </Td>
                <Td minW="200px" w="100px">
                  {type === 'pix'
                    ? item?.payload?.key_type === 'TELEFONE'
                      ? phonesFormat(item?.payload.key)
                      : item?.payload?.key_type === 'CPF'
                      ? nifFormat(
                          item?.payload?.key,
                          item?.payload?.key.length === 11 ? 'cpf' : 'cnpj'
                        )
                      : item?.payload.key
                    : type === 'transfer'
                    ? item?.payload?.recipient?.name
                    : ''}
                </Td>
                <Td minW="200px">
                  {type === 'pix'
                    ? (item?.payload?.nif_number &&
                        nifFormat(
                          item?.payload?.nif_number,
                          item?.payload?.nif_number?.length === 11
                            ? 'cpf'
                            : 'cnpj'
                        )) ||
                      ''
                    : type === 'transfer'
                    ? (item?.account?.nif_number &&
                        nifFormat(
                          item?.account?.nif_number,
                          item?.account?.nif_number.length > 11 ? 'cnpj' : 'cpf'
                        )) ||
                      ''
                    : ''}
                </Td>
                <Td>
                  {type === 'pix'
                    ? moment(item?.scheduled_date).locale('pt-br').format('L')
                    : type === 'transfer'
                    ? moment(item?.scheduled_date).locale('pt-br').format('L')
                    : ''}
                </Td>
                <Td px="0px">
                  {type === 'pix' ? (
                    <Text>{item?.payload?.email}</Text>
                  ) : type === 'transfer' ? (
                    item?.payload?.recipient?.bank_name
                  ) : (
                    ''
                  )}
                </Td>
                <Td>
                  {type === 'pix' ? (
                    <Text>{item.payload?.description}</Text>
                  ) : type === 'transfer' ? (
                    item?.payload?.recipient?.bank_code
                  ) : (
                    ''
                  )}
                </Td>
                <Td minW="180px">
                  {type === 'pix'
                    ? `R$ ${formatCalcValue(item.payload?.amount)}`
                    : type === 'transfer'
                    ? item?.payload?.recipient?.account
                    : ''}
                </Td>

                <Td>
                  {type === 'pix' ? (
                    <Badge
                      variant="solid"
                      colorScheme={
                        item?.status.name === 'pending'
                          ? 'yellow'
                          : item?.status.name === 'waiting' ||
                            item?.status.name === 'canceled'
                          ? 'red'
                          : item?.status.name === 'processing'
                          ? 'blue.200'
                          : item?.status.name === 'completed'
                          ? 'green'
                          : ''
                      }
                    >
                      {item?.status?.name === 'pending' && 'Pendente'}
                      {item?.status?.name === 'waiting' && 'Em espera'}
                      {item?.status?.name === 'canceled' && 'Cancelado'}
                      {item?.status?.name === 'completed' && 'Completo'}
                      {item?.status?.name === 'processing' && 'Em processos'}
                    </Badge>
                  ) : type === 'transfer' ? (
                    formatCalcValue(item.payload?.amount)
                  ) : (
                    ''
                  )}
                </Td>
                {type === 'transfer' && (
                  <Td minW="180px">
                    <Badge
                      variant="solid"
                      colorScheme={
                        item?.status.name === 'pending' ? 'yellow' : 'green'
                      }
                    >
                      {item?.status.name}
                    </Badge>
                  </Td>
                )}
                <Td minW="20px">
                  <Flex align="center" justifyContent="center">
                    <Box
                      bg="#dde2eb"
                      p="6px"
                      borderRadius="50px"
                      onClick={() => handleDownloadVoucher(item.id)}
                    >
                      <Icon icon="bx:download" width={20} />
                    </Box>
                  </Flex>
                </Td>
                {!item.is_approved && (
                  <Td>
                    <Menu direction="rtl">
                      <MenuButton>
                        <Icon icon="carbon:settings" width={20} />
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            setUuid(item.id);
                            onOpenAuth();
                          }}
                        >
                          <Icon
                            icon="bx:check-shield"
                            color="#21C6DE"
                            width={20}
                          />{' '}
                          <Text ml={2}>Pagemento</Text>
                        </MenuItem>
                        {edit && (
                          <MenuItem
                            onClick={() => {
                              setUuid(item.id);
                              setTransaction(item);
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
                        )}
                        <ModalEditPayment
                          dataTransfer={transaction as IDataTed}
                          dataPix={transaction as IDataPIX}
                          isOpen={isOpenEditPix}
                          onClose={onCloseEditPix}
                          type={type}
                          setLoading={loadingEdit && loadingEdit}
                        />
                      </MenuList>
                    </Menu>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>

        <ModalAuth
          handlePassword={(pass) => setPassword(pass)}
          loading={paymentLoading}
          isOpen={isOpenAuth}
          onClose={onCloseAuth}
          handleClick={() => handleConfirmationPayment(password)}
        />

        <ModalStatus
          variant="success"
          title="PAGAMENTO AUTORIZADO"
          route="/home/all-statements"
          description="Seu pagamento em lote foi autorizado com sucesso! Acompanhe o status de pagamento pelo extrato."
          titleButton="Ver extrato"
          isOpen={isOpenSuccess}
          onClose={onCloseSuccess}
        />
      </Box>
      <Flex justify="right" w="full">
        <Text mr="5" mt="5" fontSize="17px">
          Total de transações:{' '}
          {items?.data?.length ||
            dataBillPayment?.data?.length ||
            dataTransfer?.data?.length ||
            0}
        </Text>
      </Flex>
      <Pagination
        filterApproved={filterApproved}
        setPage={setPage}
        loading={loading}
        setState={setState}
        next={items?.links?.next}
        prev={items?.links?.prev}
        total={items?.meta?.last_page}
        current={items?.meta?.current_page}
      />
    </>
  );
};
