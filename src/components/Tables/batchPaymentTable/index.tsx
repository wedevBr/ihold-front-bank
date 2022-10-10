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
// import { dateFnsFormatDate } from '~/utils/fotmat';

type tableProps = {
  items?: any;
  isLoading?: boolean;

};

interface checkBoxsSelected {
  id: number;
  value: boolean;
}
export const BatchPaymentTable = ({ items, isLoading }: tableProps) => {
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

  return isLoading ? (
    <Center h="500px" mt="30px">
      <Loading />
    </Center>
  ) : (
    <>

      <Box overflowX="auto">
        <Table>
          <Thead width="100%" color="#FFF"  >
            <Tr bg="#7F8B9F" fontSize="1rem" whiteSpace="nowrap">
              <Th > <Checkbox
                onChange={() => {
                  if (allChecked) {
                    setAllChecked(!allChecked);
                    setChecked([]);
                    return;
                  }
                  totalCheck(items || []);
                }}
              /></Th>
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
              items?.map((item: any, index: number) => (<>
                <Td
                  overflow="hidden"
                  bg="#ffffff"
                  textAlign="center"
                  borderColor="gray.100"
                  fontSize="14px"
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
                <Td>CHAVE PIX</Td>
                <Td>CPF/CNPJ</Td>
                <Td>AGENDAMENTO</Td>
                <Td>EMAIL</Td>
                <Td>DESCRIÇÃO</Td>
                <Td>VALOR</Td>
                <Td>STATUS</Td>
                <Td>COMPROVANTE</Td>
                <Td>AÇÕES</Td>
              </>
              ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};
