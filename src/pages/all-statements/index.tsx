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
    title: 'Pagar',
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

export default function AllStatements() {
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
        spacingX="45px"
      >
        <CardValue
          percentage={100}
          type={'cash-in'}
          value={data ? data?.summary?.cash_in?.amount : '-'}
        />
        <CardValue
          percentage={100}
          type={'cash-out'}
          value={data ? data?.summary?.cash_out?.amount : '-'}
        />
        <CardValue
          percentage={100}
          type={'prevision'}
          value={data ? formatCalcValue(result.toString()) : '-'}
          result={result}
        />
      </SimpleGrid>
      <Box bg="#FFFFFF" p="50px" mt="30px" borderRadius="10px">
        <Box w="full" borderRadius="6px" h="">
          <Text>Extrato: iHold Bank </Text>
          <Flex my="10px" mb="25px" justify="space-between" w="full">
            <Flex w="500px" justify="space-between">
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
              {['Pix', 'Ted', 'Boleto'].map((day, key) => (
                <Button
                  key={key}
                  transition="all linear .55s"
                  variant="unstyled"
                  w="67px"
                  h="26"
                  fontSize="14px"
                  borderRadius="52px"
                  border="1px solid #CBD3E0"
                  color={type === day ? '#fff' : ''}
                  bg={type === day ? '#2E4EFF' : ''}
                  onClick={() => {
                    setActiveType(!activeType);
                    if (day !== type) {
                      setCurrentPage(1);
                      setType(day);
                      return;
                    } else if (!activeType) {
                      setCurrentPage(1);
                      setType(day.toString());
                      return;
                    }
                    setType('');
                  }}
                >
                  {day}
                </Button>
              ))}
            </Flex>
            <Flex align="center" cursor="pointer" onClick={onOpenFilter}>
              <Icon icon="akar-icons:calendar" color="#21C6DE" width={20} />
              <Text ml="5px">Filtrar por data</Text>
            </Flex>
          </Flex>

          <ContainerTransaction
            onChange={(tab) => setTypeOperation(tab)}
            tabName={['completo', 'entrada', 'saída']}
            header={
              <Button
                bg="#2E4EFF"
                _hover={{ bg: '#435ffa' }}
                _active={{ bg: '#2444f6' }}
                color="#fff"
                w="121px"
                fontSize="0.875rem"
                borderRadius="20px"
                h="35px"
                textTransform="uppercase"
                fontWeight="600"
                padding="8px 1.25rem"
                onClick={onOpen}
              >
                <Flex align="center">
                  <Icon
                    icon="clarity:import-line"
                    width={20}
                    style={{ marginRight: 5 }}
                  />
                  <Text>EXPORTAR</Text>
                </Flex>
              </Button>
            }
          >
            <TabPanel px="0">
              <TabletTransaction
                CurrentPage={currentPage}
                setCurrentPage={setCurrentPage}
                data={DataPix}
                isFetching={isFetching}
              />
            </TabPanel>
            <TabPanel>
              <TabletTransaction
                CurrentPage={currentPage}
                setCurrentPage={setCurrentPage}
                data={DataPix}
                isFetching={isFetching}
              />
            </TabPanel>
            <TabPanel>
              <TabletTransaction
                CurrentPage={currentPage}
                setCurrentPage={setCurrentPage}
                data={DataPix}
                isFetching={isFetching}
              />
            </TabPanel>
          </ContainerTransaction>
        </Box>
      </Box>
      <Box bg="#FFFFFF" p="50px" mt="30px" borderRadius="10px">
        <Text>MAIS ACESSADOS</Text>
        <Flex w="full" justify="space-between" h="full" pt="20px">
          {routeTransactions.map((item, idx) => (
            <CardTransaction
              key={idx}
              name={item.title}
              icon={<Icon icon={item.iconName} color="#21C6DE" width={25} />}
            />
          ))}
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} title="EXPORTAR EXTRATOS">
        <Box as="form" onSubmit={handleSubmit(handleDowloadExtract)}>
          <Flex align="center" w="full" justify="space-between" mb="20px">
            <Input
              label="Período Inicial"
              labelColor="#7F8B9F"
              w="full"
              size="sm"
              bg="transparent"
              color="#7F8B9F"
              type="date"
              fontSize="16px"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="dd/mm/aaaa"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('date_start')}
              error={formState?.errors?.date_start}
            />
            <Input
              label="Período Final"
              labelColor="#7F8B9F"
              w="full"
              size="sm"
              bg="transparent"
              color="#7F8B9F"
              type="date"
              fontSize="16px"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="dd/mm/aaaa"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('date_end')}
              error={formState?.errors?.date_end}
            />
          </Flex>
          <Select
            mb="20px"
            label="Tipo"
            {...register('type')}
            error={formState?.errors?.type}
          >
            {['PDF', 'CSV', 'OFX'].map((item, key) => (
              <option value={+key + 1} key={key}>
                {item}
              </option>
            ))}
          </Select>
          <Button
            my="20px"
            bg="#2E4EFF"
            _hover={{ bg: '#435ffa' }}
            _active={{ bg: '#2444f6' }}
            color="#fff"
            w="full"
            fontSize="0.875rem"
            borderRadius="20px"
            h="35px"
            textTransform="uppercase"
            fontWeight="600"
            padding="8px 1.25rem"
            type="submit"
            isLoading={loading}
          >
            DOWLOAD
          </Button>
        </Box>
      </Modal>
      <Modal
        isOpen={IsOpenFilter}
        onClose={onCloseFilter}
        title="FILTRAR POR PERÍODO"
      >
        <Box as="form" onSubmit={handleSubmit(handleDowloadExtract)}>
          <Flex
            align="center"
            w="full"
            justify="space-between"
            mb="20px"
            minH="80px"
          >
            <Input
              label="Período Inicial"
              labelColor="#7F8B9F"
              name=""
              w="full"
              size="sm"
              bg="transparent"
              color="#7F8B9F"
              type="date"
              fontSize="16px"
              border="0px"
              value={filterStart}
              onChange={(e) => setFilterStart(e.target.value)}
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="dd/mm/aaaa"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              // {...register('date_start')}
              // error={formState?.errors?.date_start}
            />
            <Input
              name=""
              label="Período Final"
              labelColor="#7F8B9F"
              w="full"
              size="sm"
              bg="transparent"
              color="#7F8B9F"
              type="date"
              fontSize="16px"
              value={filterEnd}
              onChange={(e) => {
                setFilterEnd(e.target.value);
                if (filterStart) {
                  setTimeout(() => onCloseFilter(), 1000);
                }
              }}
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="dd/mm/aaaa"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              // {...register('date_end')}
              // error={formState?.errors?.date_end}
            />
          </Flex>
          <Flex
            mb="20px"
            color="#21C6DE"
            cursor="pointer"
            w="-webkit-max-content"
            align="center"
            onClick={() => {
              setFilterStart('');
              setFilterEnd('');
              onCloseFilter();
            }}
          >
            <Icon icon="fluent:delete-28-regular" width={20} color="#21C6DE" />
            <Text>Limpar Filtro</Text>
          </Flex>
        </Box>
      </Modal>
    </Layout>
  );
}
