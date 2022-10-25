import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Skeleton,
  Spinner,
  TabPanel,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
  CardTransaction,
  CardValue,
  ContainerTransaction,
  ExtractPixAndTedTable,
  Input,
  Layout,
  Modal,
  Select,
} from '~/components';
import {
  GetAllStatementsOperation,
  GetStatementsDownloadExtract,
  GetStatementsOperation,
  useCustomers,
} from '~/services/hooks/useStatements';
import { formatCalcValue } from '~/utils/formatValue';
import { routeTransactions } from '..';
import { createPagination } from '~/hooks/createPagination';

const dowloadSchema = yup.object().shape({
  date_start: yup.string().required('Período inicial obrigatório'),
  date_end: yup.string().required('Período final obrigatório'),
  type: yup.string(),
});

export default function Pix() {
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(25);
  const dates = [7, 15, 30, 60];
  const date = new Date();
  const formatPrevDate = (days: number) => {
    return moment(date).subtract(days, 'days').format('YYYY-MM-DD');
  };

  const { data: DataPix, isFetching } = useCustomers(
    currentPage,
    per_page,
    'pix',
    filterDate && formatPrevDate(+filterDate),
    filterDate && moment(date).format('YYYY-MM-DD')
  );

  const { pagination } = createPagination(
    5,
    DataPix?.meta?.last_page || 10,
    DataPix?.meta?.current_page || 0
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useQuery(
    [2],
    () => GetAllStatementsOperation(2),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
  const { data: dataCashIn, isLoading: isLoadingCahsIn } = useQuery(
    ['cash-in', 2],
    () => GetStatementsOperation('cash-in', 2),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
  const { data: dataCashOut, isLoading: isLoadingCashOut } = useQuery(
    ['cash-out', 2],
    () => GetStatementsOperation('cash-out', 2),
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
        data.date_end,
        'pix'
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

  // console.log(moment(moment('2022/10/24').add(7, 'days')).format('YYYY/MM/DD'));

  // console.log(moment('2022/10/24').subtract(4, 'days').format('YYYY/MM/DD'));

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
        <Text>Extrato: iHold Bank </Text>
        <Flex my="10px" w="380px" justify="space-between">
          <Button
            transition="all linear .55s"
            variant="unstyled"
            fontSize="14px"
            w="67px"
            h="26"
            borderRadius="52px"
            border="1px solid #CBD3E0"
            color={!filterDate ? '#fff' : ''}
            bg={!filterDate ? '#2E4EFF' : ''}
            onClick={() => setFilterDate('')}
          >
            Todos
          </Button>
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
              onClick={() => setFilterDate(day.toString())}
            >
              {day} dias
            </Button>
          ))}
        </Flex>
        <Box w="full" borderRadius="6px" h="620px">
          <Flex mb="30px">
            <Icon
              width="25px"
              cursor="pointer"
              color="#21C6DE"
              icon="akar-icons:eye"
            />
            <Text ml="5px">EXTRATO PIX</Text>
          </Flex>
          <ContainerTransaction
            tabName={['completo', 'entrada', 'Saída']}
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
            <TabPanel>
              <ExtractPixAndTedTable isLoading={isFetching} items={DataPix} />
            </TabPanel>
            <TabPanel>
              <ExtractPixAndTedTable
                isLoading={isLoadingCahsIn}
                items={dataCashIn}
              />
            </TabPanel>
            <TabPanel>
              <ExtractPixAndTedTable
                isLoading={isLoadingCashOut}
                items={dataCashOut}
              />
            </TabPanel>
          </ContainerTransaction>
        </Box>
        <Flex align="center" w="full" justify="center" mt="40px">
          <Box cursor={!!DataPix?.links.prev ? 'pointer' : 'not-allowed'}>
            <Icon
              icon="dashicons:arrow-left-alt2"
              color={!!DataPix?.links.prev ? '#7f8b9f' : '#ccc'}
              width="20"
              height="20"
              onClick={() => {
                if (DataPix?.links.prev) {
                  setCurrentPage((page) => page - 1);
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
                    color={currentPage === item ? '#FFFFFF' : '#CBD3E0'}
                    bg={currentPage === item ? '#2E4EFF' : ''}
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
          <Box cursor={!!DataPix?.links.next ? 'pointer' : 'not-allowed'}>
            <Icon
              icon="dashicons:arrow-right-alt2"
              color={!!DataPix?.links.next ? '#7f8b9f' : '#ccc'}
              width="20"
              height="20"
              style={{
                cursor: DataPix?.links.next ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                if (DataPix?.links.next) {
                  setCurrentPage((page) => page + 1);
                }
              }}
            />
          </Box>
        </Flex>
      </Box>
      <Box bg="#FFFFFF" p="50px" mt="30px" borderRadius="10px">
        <Text>MAIS ACESSADOS</Text>
        <Flex w="full" justify="space-between" h="full" pt="20px">
          {routeTransactions.map((item, idx) => (
            <CardTransaction
              key={idx}
              // path={item?.path || ''}
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
    </Layout>
  );
}
