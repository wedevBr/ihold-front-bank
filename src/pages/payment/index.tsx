import {
  Box,
  Flex,
  Button,
  SimpleGrid,
  TabPanel,
  Image,
  Text,
  Center,
  Spacer,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import {
  BatchPaymentTable,
  CardValue,
  ContainerTransaction,
  Layout,
  Modal,
  ModalUploadPayment,
} from '~/components';
import { MenuDropDwon } from '~/components/Menu';
import {
  DeleteScheduleTransactions,
  useScheduleTransactions,
} from '~/services/hooks/usePaymentsSchedule';

export default function Payment() {
  const [scheduleID, setScheduleID] = useState<number[]>([]);
  const [type, setType] = useState('pix');
  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload,
  } = useDisclosure();
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading, isFetching } =
    useScheduleTransactions(page);

  async function deletScheduleTrasanction(checkIDS: number[]) {
    if (!checkIDS.length) {
      return;
    }
    return await Promise.all(
      checkIDS.map((id: any) => DeleteScheduleTransactions(id))
    ).finally(() => {
      refetch();
    });
  }

  return (
    <Box h="full">
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
                          onClick={() => deletScheduleTrasanction(scheduleID)}
                          isLoading={isFetching}
                        >
                          <Icon
                            icon="ep:delete"
                            width={17}
                            style={{ marginRight: 5 }}
                          />{' '}
                          {isFetching ? 'Excluindo' : 'Excluir'}
                        </Button>
                      </Flex>
                      <BatchPaymentTable
                        refetch={refetch}
                        setPage={setPage}
                        isLoading={isFetching}
                        items={data}
                        getScheduleIDS={(ids) => setScheduleID(ids)}
                      />
                    </TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                  </TabPanels>
                </Box>
              </Tabs>
            </Box>
          </Box>
        </Flex>
      </Layout>
      <Modal
        isOpen={isOpenUpload}
        onClose={onCloseUpload}
        title="IMPORTAR DADOS"
      >
        <ModalUploadPayment refetch={refetch} type={type} />
      </Modal>
    </Box>
  );
}
