import { Fragment, ReactNode, useState } from 'react';
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
import { Icon } from '@iconify/react';
import { Loading } from '~/components';
import { IPixAndTEDStatementsData } from '~/types/statements.types';

type tableProps = {
  items?: IPixAndTEDStatementsData;
  isLoading: boolean;
};

export const ExtractTable = ({ items, isLoading }: tableProps) => {
  const [allStatementsCashOutData, setAllStatementsCashOutData] = useState<
    IPixAndTEDStatementsData[]
  >([]);

  return isLoading ? (
    <Center h="full" mt="30px" >
      <Loading />
    </Center>
  ) : (
    <Table w="100%" overflowX="hidden" mt="30px" h="30px" overflowY="scroll">
      <Thead>
        <Tr bg="#F0F0F3">
          <Th colSpan={5} fontWeight="600"
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
        <Tr
          bg="#fff"
          borderBottom="1px solid #CBD3E0"
          overflowX="hidden"
          borderColor="gray.100"
        >
          <Td w="5%">
            a
          </Td>
          <Td w="25%">
            a
          </Td>
          <Td w="25%">
            a
          </Td>
          <Td w="15%">
            a
          </Td>
          <Td w="15%">
            a
          </Td>
        </Tr>
        <Tr
          bg="#fff"
          borderBottom="1px solid #CBD3E0"
          overflowX="hidden"
          borderColor="gray.100"
        >
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
        </Tr>
        <Tr
          bg="#fff"
          borderBottom="1px solid #CBD3E0"
          overflowX="hidden"
          borderColor="gray.100"
        >
           <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
        </Tr>
        <Tr
          bg="#fff"
          borderBottom="1px solid #CBD3E0"
          overflowX="hidden"
          borderColor="gray.100"
        >
            <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
          <Td>
            a
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};