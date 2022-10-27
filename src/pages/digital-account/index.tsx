/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Skeleton,
  Table,
  TableContainer,
  TabPanel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
  CardTransaction,
  CardValue,
  ContainerTransaction,
  ExtractAllTable,
  Input,
  Layout,
  Loading,
  Modal,
  Select,
} from '~/components';
import {
  GetAllStatementsOperation,
  GetStatementsDownloadExtract,
  GetStatementsOperation,
  useTransactions,
} from '~/services/hooks/useStatements';
import { formatCalcValue } from '~/utils/formatValue';
import { createPagination } from '~/hooks/createPagination';
import { truncate } from '~/utils/truncate';
import { TabletTransaction } from '~/components/Tablet';

const dowloadSchema = yup.object().shape({
  date_start: yup.string().required('Período inicial obrigatório'),
  date_end: yup.string().required('Período final obrigatório'),
  type: yup.string(),
});

export const routeTransactions = [
  {
    id: 1,
    iconName: 'ic:baseline-pix',
    title: 'Pix',
    // path: '/home/pix',
  },

  {
    id: 2,
    iconName: 'akar-icons:arrow-repeat',
    title: 'Transferir',
    // path: '/home/ted',
  },
  {
    id: 3,
    iconName: 'iconoir:wallet',
    title: 'Depositar',
  },
  {
    id: 4,
    iconName: 'bi:qr-code-scan',
    title: 'Pagamento em Lote',
    // path: '/payment',
  },
  {
    id: 5,
    iconName: 'bi:credit-card-2-back',
    title: 'Solicitar cartão',
  },
  {
    id: 6,
    iconName: 'bi:question-circle',
    title: 'Dúvidas',
  },
];

export default function DigitalAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: IsOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();

  const [filterDate, setFilterDate] = useState('');
  const [filterStart, setFilterStart] = useState<any>();
  const [filterEnd, setFilterEnd] = useState<any>();
  const [type, setType] = useState('');
  const [activeType, setActiveType] = useState(true);
  const [activeFilter, setActiveFilter] = useState(true);
  const [typeOperation, setTypeOperation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(25);
  const dates = [7, 15, 30, 60];
  const date = new Date();
  const formatPrevDate = (days: number) => {
    return moment(date).subtract(days, 'days').format('YYYY-MM-DD');
  };

  const { data: DataPix, isFetching } = useTransactions(
    currentPage,
    per_page,
    type === 'Pix'
      ? 'pix'
      : type === 'Ted'
      ? 'transfer'
      : type === 'Boleto'
      ? 'bill-payment'
      : '',
    (filterDate && formatPrevDate(+filterDate)) || filterStart,
    (filterDate && moment(date).format('YYYY-MM-DD')) || filterEnd,
    typeOperation === 2 ? 'cash-out' : typeOperation === 1 ? 'cash-in' : ''
  );

  const { data, isLoading } = useQuery(
    [0],
    () => GetAllStatementsOperation(0),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  const outAmount = data?.summary?.cash_out?.amount || '';
  const InAmount = data?.summary?.cash_in?.amount || '';

  const handleCalcValue = (val: string) => parseInt(val?.replace(/[\D]+/g, ''));
  const result = handleCalcValue(InAmount) - handleCalcValue(outAmount);

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(dowloadSchema),
    mode: 'onBlur',
  });
  async function handleDowloadExtract(data: any) {
    console.log({ data });

    setLoading(true);
    const formatType =
      data.type === '1' ? 'PDF' : data.type === '2' ? 'CSV' : 'OFX';
    try {
      const response = await GetStatementsDownloadExtract(
        formatType,
        data.date_start,
        data.date_end
      );

      toast({
        title: 'Exportação com sucesso! ',
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });
      const fileURL = window.URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href = fileURL;
      link.download = `Extrato-${moment(data.date_start).format('L')}-${moment(
        data.date_end
      ).format('L')}.${formatType.toLocaleLowerCase()}`;
      link.click();

      onClose();
    } catch (error: any) {
      toast({
        title: 'Não encontramos extrato para data de início! ',
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <SimpleGrid
        mt="30px"
        columns={{ base: 1, md: 2, lg: 3 }}
        w="full"
        spacing="45px"
      >
        <Box bg="#FFFFFF" borderRadius="10px" h="197px" boxShadow="base">
          <Flex justify="center" h="full" w="full" align="center">
            <Text>Pagamento em Lote</Text>
          </Flex>
        </Box>
        <Box bg="#FFFFFF" borderRadius="10px" h="197px" boxShadow="base">
          <Flex justify="center" h="full" w="full" align="center">
            <Text>API</Text>
          </Flex>
        </Box>
        <Box bg="#FFFFFF" borderRadius="10px" h="197px" boxShadow="base">
          <Flex justify="center" h="full" w="full" align="center">
            <Text>Cripto</Text>
          </Flex>
        </Box>
      </SimpleGrid>
      <Box mt="30px">
        <Flex w="full" justify="space-between">
          <Box w="65%" h="" bg="#FFFFFF" borderRadius="10px" p="20px">
            <Text>REGISTRO DE EVENTOS </Text>
            <Flex my="10px" mb="25px" justify="space-between" w="full">
              <Flex w="300px" justify="space-between">
                {dates.map((day, key) => (
                  <Button
                    key={key}
                    transition="all linear .55s"
                    variant="unstyled"
                    w="67px"
                    h="26"
                    fontSize="14px"
                    borderRadius="52px"
                    border="1px solid #CBD3E0"
                    color={+filterDate === day ? '#fff' : ''}
                    bg={+filterDate === day ? '#2E4EFF' : ''}
                    onClick={() => {
                      setActiveFilter(!activeFilter);
                      if (+day !== +filterDate) {
                        setCurrentPage(1);
                        setFilterDate(day.toString());
                        return;
                      } else if (!activeFilter) {
                        setCurrentPage(1);
                        setFilterDate(day.toString());
                        return;
                      }
                      setFilterDate('');
                    }}
                  >
                    {day} dias
                  </Button>
                ))}
              </Flex>
            </Flex>
            <TabletTransaction
              CurrentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={DataPix}
              isFetching={isFetching}
            />
          </Box>
          <Flex w="35%" justify="right" flexDir="column" ml="10px">
            <Text px="20px" mb="10px">
              MAIS ACESSADOS
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              w="full"
              justifyContent="right"
              alignItems="flex-end"
              justifyItems="right"
              spacing="5px"
            >
              {routeTransactions.map((item, idx) => (
                <CardTransaction
                  mb="20px"
                  p="15px"
                  w="112px"
                  h="105px"
                  key={idx}
                  name={item.title}
                  icon={
                    <Icon icon={item.iconName} color="#21C6DE" width={25} />
                  }
                />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}
