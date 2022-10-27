import {
  Box,
  Flex,
  Button,
  TabPanel,
  Image,
  Text,
  Center,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BatchPaymentTable, Layout, Loading, Modal } from '~/components';
import { ModalStatus } from '~/components/Modals/ModalStatus';
import {
  DeleteScheduleTransactions,
  getValidateScheduleTransaction,
} from '~/services/hooks/usePaymentsSchedule';
import { IPaginationData } from '~/types/pagination';
import {
  IDataBillPayment,
  IDataPIX,
  IDataTed,
} from '~/types/scheduledTransactions';
import { registerPayment } from '~/services/hooks/usePaymentsSchedule';
import { GetStatementsDownloadVoucher } from '~/services/hooks/useStatements';
import JSZip from 'jszip';

interface RegisterPayment {
  file: File;
}

export const createPaymentFormSchema = yup.object().shape({
  file: yup.mixed().required('Arquivo Obrigátorio'),
});

export default function Payment() {
  const [zipLoad, setZipLoad] = useState(false);
  const [scheduleID, setScheduleID] = useState<number[]>([]);
  const [statementID, setStatementID] = useState<number[]>([]);
  const [type, setType] = useState('pix');
  const [items, setItems] = useState<IPaginationData<IDataPIX>>();
  const [billPayment, setBillPayment] =
    useState<IPaginationData<IDataBillPayment>>();
  const [transfer, setTransfer] = useState<IPaginationData<IDataTed>>();
  const [loading, setLoading] = useState(false);
  const [deletSchedule, setDeletSchedule] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, seIsSuccess] = useState(false);
  const [refreshItems, setRefreshItems] = useState(false);
  const [page, setPage] = useState(1);
  const [fileSrc, setFileSrc] = useState<File | any>();
  const [uploadFile, setUploadFile] = useState<File | any>();
  const toast = useToast();
  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload,
  } = useDisclosure();
  const {
    isOpen: isOpenError,
    onOpen: onPenError,
    onClose: onCloseError,
  } = useDisclosure();
  const {
    isOpen: isOpenDelet,
    onOpen: onPenDelet,
    onClose: onCloseDelet,
  } = useDisclosure();
  const {
    isOpen: isOpenSuccess,
    onOpen: onPenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();

  const file = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<RegisterPayment>({
    resolver: yupResolver(createPaymentFormSchema),
  });

  const openUpload = () => {
    file.current && file.current.click();
  };

  const handleUpload = async (files: FileList | null) => {
    if (files) {
      const objectURL: string = window.URL.createObjectURL(files[0]);
      let file = files[0];
      let type = files[0]?.type;
      setFileSrc({ preview: objectURL, file, type });
      setValue('file', file);
      await trigger(['file']);
    }
    file.current && (file.current.value = '');
  };

  const handleSendPayment: SubmitHandler<RegisterPayment> = async (data) => {
    const formData = new FormData();
    formData.append('transaction_type', type);
    formData.append('file', data.file);
    seIsSuccess(true);
    setLoading(true);
    try {
      const response = await registerPayment(formData);
      toast({
        title: 'Enviado com Sucesso!',
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });
      onCloseUpload();
      setTimeout(() => onPenSuccess(), 400);
      setIsError(false);
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(
        err?.response?.data?.errors?.file ||
          err?.response?.data?.errors?.map((item: any) => item) ||
          err?.response?.data?.message
      );
      onPenError();
      toast({
        title:
          err?.response?.data?.errors?.file ||
          err?.response?.data?.errors?.map((item: any) => item) ||
          err?.response?.data?.message,
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      getScheduleTransaction();
      setLoading(false);
      seIsSuccess(false);
    }
  };

  async function deletScheduleTrasanction(checkIDS: number[]) {
    if (!checkIDS.length) {
      return;
    }

    return await Promise.all(
      checkIDS.map((id: any) => DeleteScheduleTransactions(id))
    )
      .then(() => {
        setDeletSchedule(true);
        setLoading(true);
      })
      .finally(() => {
        setDeletSchedule(false);
        setLoading(false);
      });
  }
  async function getScheduleTransaction() {
    setLoading(true);
    try {
      const responsePix = await getValidateScheduleTransaction<IDataPIX>('pix');
      const responseBillPayment =
        await getValidateScheduleTransaction<IDataBillPayment>('bill-payment');
      const responseTransfer = await getValidateScheduleTransaction<IDataTed>(
        'transfer'
      );
      setTransfer(responseTransfer);
      setBillPayment(responseBillPayment);
      setItems(responsePix);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadVoucher(statementId: number[]) {
    setZipLoad(true);
    if (!statementId?.length) {
      return;
    }
    let zip = new JSZip();
    let files: {
      name: string;
      file: any;
    }[] = [];
    await Promise.all(
      statementId?.map((id: any, idx) => {
        if (id) {
          return GetStatementsDownloadVoucher(id).then((response) => {
            files.push({ name: `comprovante${id}.pdf`, file: response });
          });
        }
      })
    ).finally(() => {});

    files.map((statement, idx) => {
      zip.file(statement.name, statement.file);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const fileURL = window.URL.createObjectURL(content);
      let link = document.createElement('a');
      link.href = fileURL;
      link.download = `comprovantes.zip`;
      link.click();
    });
    zip = require('jszip')();
    setZipLoad(false);
  }

  useEffect(() => {
    getScheduleTransaction();
  }, [deletSchedule, isSuccess, refreshItems]);

  return (
    <Box h="full" overflowX="hidden">
      <Layout>
        <Flex mt="30px">
          <Box w="100%">
            <Box
              bg="#FFFFFF"
              mr="20px"
              borderRadius="10px"
              boxShadow="base"
              p="20px"
            >
              <Flex>
                <Box paddingLeft="70px" py="10px">
                  <Image
                    boxSize="150px"
                    objectFit="cover"
                    src="/assets/batchPayment.svg"
                    alt="Image"
                  />
                </Box>
                <Center paddingLeft="40px" py="10px" w="75%">
                  <Box>
                    <Text fontWeight="700" fontSize="1.5rem">
                      PAGAMENTO EM LOTE
                    </Text>
                    <Text fontWeight="400" fontSize="1rem">
                      Aqui você pode importar seus pagamentos de acordo com a
                      categoria selecionada e acompanhar todas as transações
                      realizadas em massa.
                    </Text>
                  </Box>
                </Center>
              </Flex>
            </Box>
            <Box>
              <Tabs
                variant="soft-rounded"
                defaultIndex={0}
                onChange={(idx) =>
                  setType(
                    idx === 0 ? 'pix' : idx === 1 ? 'transfer' : 'bill-payment'
                  )
                }
              >
                <Box
                  bg="#FFFFFF"
                  mr="20px"
                  borderRadius="10px"
                  boxShadow="base"
                  p="20px"
                  mt="30px"
                >
                  <Text fontWeight="700" fontSize="1.25rem">
                    EXTRATO DE PAGAMENTOS
                  </Text>
                  <Flex pt="50px" justify="space-between" w="full">
                    <TabList
                      bg="#F0F0F3"
                      w="min-content"
                      borderRadius="20px"
                      h="35px"
                    >
                      {['PIX', 'TED', 'BOLETO'].map((item, idx) => (
                        <Tab
                          key={idx}
                          px="30px"
                          _selected={{ color: '#fff', bg: '#2E4EFF' }}
                          color="#7F8B9F"
                          textTransform="uppercase"
                        >
                          {item}
                        </Tab>
                      ))}
                    </TabList>
                    <Flex>
                      <a
                        href={
                          type === 'pix'
                            ? '/templates/Planilha Padrao Chave Pix.xlsx'
                            : type === 'transfer'
                            ? '/templates/Planilha Padrao TED.xlsx'
                            : '/templates/Planilha Padrao Boletos.xlsx'
                        }
                        style={{ marginRight: 10 }}
                      >
                        <Button
                          bg="#fff"
                          color="#2E4EFF"
                          border="1px"
                          borderColor="#2E4EFF"
                          w="100%"
                          fontSize="0.875rem"
                          borderRadius="20px"
                          h="35px"
                          textTransform="uppercase"
                          fontWeight="600"
                          padding="8px 1.25rem"
                        >
                          <Icon
                            icon="bx:download"
                            width={20}
                            style={{ marginRight: 5 }}
                          />
                          BAIXAR TEMPLATE
                        </Button>
                      </a>
                      <Button
                        bg="#2E4EFF"
                        color="#fff"
                        w="100%"
                        fontSize="0.875rem"
                        borderRadius="20px"
                        h="35px"
                        textTransform="uppercase"
                        fontWeight="600"
                        padding="8px 1.25rem"
                        onClick={onOpenUpload}
                      >
                        <Icon
                          icon="clarity:import-line"
                          width={20}
                          style={{ marginRight: 5 }}
                        />
                        IMPORTAR DADOS
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
                <Box
                  mt="30px"
                  bg="#FFFFFF"
                  mr="20px"
                  borderRadius="10px"
                  boxShadow="base"
                  py="20px"
                >
                  <TabPanels>
                    <TabPanel>
                      <Flex w="full" justify="right" pb="20px">
                        {scheduleID?.length > 0 && (
                          <Button
                            bg="#2E4EFF"
                            color="#fff"
                            mr="20px"
                            fontSize="0.875rem"
                            borderRadius="20px"
                            h="38px"
                            w="155px"
                            textTransform="uppercase"
                            fontWeight="600"
                            padding="8px 1.25rem"
                            onClick={() => handleDownloadVoucher(statementID)}
                            isLoading={zipLoad}
                          >
                            <Icon
                              icon="bx:download"
                              width={20}
                              style={{ marginRight: 5 }}
                            />
                            Baixar
                          </Button>
                        )}
                        <Button
                          bg="#F03D3E"
                          color="#fff"
                          fontSize="0.875rem"
                          borderRadius="20px"
                          h="38px"
                          w="205px"
                          textTransform="uppercase"
                          fontWeight="600"
                          padding="8px 1.25rem"
                          onClick={onPenDelet}
                          isLoading={loading}
                        >
                          <Icon
                            icon="ep:delete"
                            width={17}
                            style={{ marginRight: 5 }}
                          />{' '}
                          {loading ? 'Excluindo' : 'Excluir'}
                        </Button>
                      </Flex>
                      <BatchPaymentTable
                        type="pix"
                        refreshItems={setRefreshItems}
                        loading={setLoading}
                        setState={setItems}
                        // refetch={refetch}
                        setPage={setPage}
                        isLoading={loading}
                        items={items}
                        getScheduleIDS={(ids) => {
                          setStatementID(ids.statements || []);
                          setScheduleID(ids.id);
                        }}
                      />
                    </TabPanel>
                    <TabPanel>
                      <Flex w="full" justify="right" pb="20px">
                        <Button
                          bg="#F03D3E"
                          color="#fff"
                          fontSize="0.875rem"
                          borderRadius="20px"
                          h="38px"
                          w="205px"
                          textTransform="uppercase"
                          fontWeight="600"
                          padding="8px 1.25rem"
                          onClick={onPenDelet}
                          isLoading={loading}
                        >
                          <Icon
                            icon="ep:delete"
                            width={17}
                            style={{ marginRight: 5 }}
                          />{' '}
                          {loading ? 'Excluindo' : 'Excluir'}
                        </Button>
                      </Flex>
                      <BatchPaymentTable
                        refreshItems={setRefreshItems}
                        type="transfer"
                        loading={setLoading}
                        setState={setTransfer}
                        // refetch={refetch}
                        setPage={setPage}
                        isLoading={loading}
                        dataTransfer={transfer}
                        getScheduleIDS={(ids) => {
                          setStatementID(ids.statements || []);
                          setScheduleID(ids.id);
                        }}
                      />
                    </TabPanel>
                    <TabPanel>
                      {/* <BatchPaymentTable
                        loading={setLoading}
                        setState={setBillPayment}
                        // refetch={refetch}
                        setPage={setPage}
                        isLoading={loading}
                        items={billPayment}
                        getScheduleIDS={(ids) => setScheduleID(ids)}
                      /> */}
                    </TabPanel>
                  </TabPanels>
                </Box>
              </Tabs>
            </Box>
          </Box>
        </Flex>
      </Layout>
      <ModalStatus
        variant="error"
        title="Error"
        titleButton="Ok, entendi"
        description={errorMessage}
        isOpen={isOpenError}
        onClose={onCloseError}
      />
      <ModalStatus
        variant="alert"
        handleClick={() => deletScheduleTrasanction(scheduleID)}
        titleButton="excluir"
        isOpen={isOpenDelet}
        onClose={onCloseDelet}
      />
      <ModalStatus
        closeOnOverlayClick={false}
        variant="success"
        title="pronto"
        route={`/payment/review/${type}`}
        description="Dados importados com sucesso!
          Prossiga para autorizar o pagamento em lote."
        titleButton="avançar"
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
      />
      <Modal
        isOpen={isOpenUpload}
        onClose={onCloseUpload}
        title="IMPORTAR DADOS"
        closeOnOverlayClick={false}
      >
        <>
          {isSuccess ? (
            <Flex h="300px" flexDir="column" justify="center" align="center">
              <Loading
                size="xl"
                thickness="7px"
                speed="0.88s"
                w="80px"
                h="80px"
                color="#21C6DE"
              />
              <Text
                my="35px"
                w="70%"
                mx="auto"
                color=" #7F8B9F"
                textAlign="center"
                fontFamily="Lato"
                fontStyle="normal"
                fontWeight="700"
                fontSize="20px"
              >
                Aguarde, estamos processando sua importação
              </Text>
            </Flex>
          ) : (
            <Box as="form" onSubmit={handleSubmit(handleSendPayment)}>
              <Text mb="20px">{type?.toLocaleUpperCase()}</Text>
              <Center
                border="0.125rem"
                borderStyle="dashed"
                borderColor={isError || errors.file ? 'red' : '#cbd3e0'}
                onClick={openUpload}
                cursor="pointer"
                py="40px"
              >
                <Box>
                  <Center>
                    <Icon
                      icon="fa6-solid:cloud-arrow-up"
                      color={isError || errors.file ? 'red' : '#cbd3e0'}
                      fontSize={50}
                    />
                  </Center>
                  {getValues('file') ? (
                    <Text color="#cbd3e0">{getValues('file')?.name}</Text>
                  ) : (
                    <Text color={isError || errors.file ? 'red' : '#cbd3e0'}>
                      Procurar Arquivo para Carregar
                    </Text>
                  )}
                </Box>
              </Center>
              <input
                {...register('file')}
                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                hidden
                ref={file}
                onChange={(event) => handleUpload(event.target.files)}
              />
              <Flex>
                {errors.file && (
                  <Text color="red" mt="5px">
                    {errors.file.message}
                  </Text>
                )}
              </Flex>
              <Button
                mt="25px"
                mb="30px"
                type="submit"
                w="full"
                color="#fff"
                bg="#2E4EFF"
                borderRadius="40px"
              >
                UPLOAD
              </Button>
            </Box>
          )}
        </>
      </Modal>
    </Box>
  );
}
