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
} from '@chakra-ui/react';
import { Loading, Pagination } from '~/components';
import { StatementData } from '~/types/statements.types';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { truncate } from '~/utils/truncate';
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
// import { dateFnsFormatDate } from '~/utils/fotmat';

type tableProps = {
  type?: 'pix' | 'transfer' | 'bill-payment';
  dataBillPayment?: IPaginationData<IDataBillPayment>;
  dataTransfer?: IPaginationData<IDataTed>;
  items?: IPaginationData<IDataPIX>;
  isLoading?: boolean;
  loading: (state: boolean) => void;
  getScheduleIDS?: (ids: number[]) => void;
  page?: number;
  setPage: (numberPage: number) => void;
  setState: (item: any) => void;
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
  getScheduleIDS,
  loading,
  setPage,
  setState,
  refetch,
}: tableProps) => {
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState<checkBoxsSelected[]>([]);
  const check = useRef(null);

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

  useEffect(() => {
    const format = () => {
      const data_IDs: number[] = [];
      checked.length ? checked.map((item) => data_IDs.push(item.id)) : null;
      getScheduleIDS && getScheduleIDS(data_IDs);
    };
    format();
  }, [checked]);

  useEffect(() => {
    if (!items?.data?.length) {
      setAllChecked(false);
      setChecked([]);
      refetch && refetch();
    }
    setChecked([]);
  }, [items]);

  console.log({ checked });

  return isLoading ? (
    <Center h="500px" mt="30px">
      <Loading />
    </Center>
  ) : (
    <>
      <Box overflowX="auto" maxH="1400px">
        <Table>
          <Thead width="100%" color="#FFF">
            <Tr bg="#7F8B9F" fontSize="1rem" whiteSpace="nowrap">
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
                    totalCheck(items?.data || []);
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
              <Th color="#FFF">
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
                  overflow="hidden"
                  bg="#ffffff"
                  textAlign="center"
                  borderColor="gray.100"
                  whiteSpace="nowrap"
                  minWidth="40px"
                  maxWidth="40px"
                  width="300px"
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
                <Td minW="200px">
                  {type === 'pix'
                    ? phonesFormat(item?.payload.key)
                    : type === 'transfer'
                    ? item?.payload?.recipient?.name
                    : ''}
                </Td>
                <Td minW="200px">
                  {type === 'pix'
                    ? nifFormat(
                        item?.payload?.nif_number,
                        item?.payload?.nif_number.length === 11 ? 'cpf' : 'cnpj'
                      )
                    : type === 'transfer'
                    ? nifFormat(
                        item?.account?.nif_number,
                        item?.account?.nif_number.length > 11 ? 'cnpj' : 'cpf'
                      )
                    : ''}
                </Td>
                <Td>
                  {type === 'pix'
                    ? moment(item?.scheduled_date).format('DD/MMM, HH:mm')
                    : type === 'transfer'
                    ? moment(item?.scheduled_date).format('DD/MMM, HH:mm')
                    : ''}
                </Td>
                <Td maxW="255px" px="0px">
                  {type === 'pix'
                    ? item?.payload?.email
                    : type === 'transfer'
                    ? item?.payload?.recipient?.bank_name
                    : ''}
                </Td>
                <Td minW="180px">
                  {type === 'pix'
                    ? item.payload?.description
                    : type === 'transfer'
                    ? item?.payload?.recipient?.bank_code
                    : ''}
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
                    <Badge variant="solid" colorScheme="green">
                      {item.status.name}
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
                    <Box bg="#dde2eb" p="6px" borderRadius="50px">
                      <Icon icon="bx:download" width={20} />
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Menu>
                    <MenuButton>
                      <Icon icon="carbon:settings" width={20} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Pagamento</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Pagination
          setPage={setPage}
          loading={loading}
          setState={setState}
          next={items?.links?.next}
          prev={items?.links?.prev}
          total={items?.meta?.last_page}
          current={items?.meta?.current_page}
        />
      </Box>
    </>
  );
};
