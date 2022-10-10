/* eslint-disable react-hooks/exhaustive-deps */
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
  Checkbox,
} from '@chakra-ui/react';
import { Loading } from '~/components';
import { StatementData } from '~/types/statements.types';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { truncate } from '~/utils/truncate';
import { IDataPIX } from '~/types/scheduledTransactions';
import { formatCalcValue } from '~/utils/formatValue';
import { phonesFormat } from '~/utils/phonesFormat';
import { nifFormat } from '~/utils/nifFormat';
// import { dateFnsFormatDate } from '~/utils/fotmat';

type tableProps = {
  items?: IDataPIX[];
  isLoading?: boolean;
  getScheduleIDS?: (ids: number[]) => void;
};

interface checkBoxsSelected {
  id: number;
  value: boolean;
}
export const BatchPaymentTable = ({
  items,
  isLoading,
  getScheduleIDS,
}: tableProps) => {
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState<checkBoxsSelected[]>([]);

  const individualCheck = (id: number, state: boolean) => {
    if (checked.find((user) => user.id === id)) {
      setChecked(checked.filter((user) => user.id !== id));
      return;
    }
    setChecked((users) => users.concat({ id, value: state }));
  };

  const totalCheck = (all: any) => {
    setChecked(
      all.map((item: any) => {
        return {
          id: item.id,
          value: true,
        };
      })
    );
    setAllChecked(!allChecked);
    if (items) {
      setChecked(
        items?.map((item: any) => {
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
    if (!items?.length) {
      setAllChecked(false);
      setChecked([]);
    }
  }, [items]);

  return isLoading ? (
    <Center h="500px" mt="30px">
      <Loading />
    </Center>
  ) : (
    <>
      <Box overflowX="auto">
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
                    totalCheck(items || []);
                  }}
                />
              </Th>
              <Th color="#FFF"> TIPO DE CHAVE</Th>
              <Th color="#FFF">CHAVE PIX</Th>
              <Th color="#FFF">CPF/CNPJ</Th>
              <Th color="#FFF">AGENDAMENTO</Th>
              <Th color="#FFF">EMAIL</Th>
              <Th color="#FFF">DESCRIÇÃO</Th>
              <Th color="#FFF">VALOR</Th>
              <Th color="#FFF">STATUS</Th>
              <Th color="#FFF">COMPROVANTE</Th>
              <Th color="#FFF">AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items &&
              items?.map((item, index) => (
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
                  <Td>{item?.payload?.key_type}</Td>
                  <Td minW="200px">{phonesFormat(item?.payload.key)}</Td>
                  <Td minW="200px">
                    {nifFormat(item.payload?.nif_number, 'cpf')}
                  </Td>
                  <Td>
                    {moment(item?.scheduled_date).format('DD/MMM, HH:mm')}
                  </Td>
                  <Td>{item?.payload?.email}</Td>
                  <Td minW="180px">{item.payload?.description}</Td>
                  <Td minW="180px">{`R$ ${formatCalcValue(
                    item.payload?.amount
                  )}`}</Td>
                  <Td>{item.status.name}</Td>
                  <Td>Botão de Dowloand</Td>
                  <Td>Botão de pagamento</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};
