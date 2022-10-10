import { Box, Flex, Button, SimpleGrid, TabPanel, Image, Text, Center, Spacer, useDisclosure } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React from 'react';
import { BatchPaymentTable, CardValue, ContainerTransaction, Layout, Modal, ModalUploadPayment } from '~/components';
import { MenuDropDwon } from '~/components/Menu';

export default function Payment() {
  const { isOpen:isOpenUpload, onOpen:onOpenUpload, onClose:onCloseUpload } = useDisclosure()
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
              <Flex >
                <Box paddingLeft="70px" py="10px">
                  <Image
                    boxSize='150px'
                    objectFit='cover'
                    src='/assets/batchPayment.svg'
                    alt='Image'
                  />
                </Box>
                <Center paddingLeft="40px" py="10px" w="75%">
                  <Box>
                    <Text fontWeight="700" fontSize="1.5rem">
                      PAGAMENTO EM LOTE
                    </Text>
                    <Text fontWeight="400" fontSize="1rem" >
                      Aqui você pode importar seus pagamentos de acordo com a categoria selecionada e acompanhar todas as transações realizadas em massa.
                    </Text>
                  </Box>
                </Center>
              </Flex>
            </Box>
            <Box
              bg="#FFFFFF"
              mr="20px"
              borderRadius="10px"
              boxShadow="base"
              p="20px"
              mt="30px"
            >
              <Box>
                <Box w="100%" >
                  <Text fontWeight="700" fontSize="1.25rem">
                    EXTRATO DE PAGAMENTOS
                  </Text>
                  <Flex pt="50px" justify="space-between" w="95%">
                    <Box>
                      <ContainerTransaction tabName={['PIX', 'TED', 'BOLETO']}>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                      </ContainerTransaction>
                    </Box>
                    <Flex>
                      <Button
                        bg="#2E4EFF"
                        color="#fff"
                        w="100%"
                        fontSize="0.875rem"
                        borderRadius="20px" h="35px"
                        textTransform="uppercase"
                        fontWeight="600"
                        padding="8px 1.25rem"
                        onClick={onOpenUpload}
                      >
                        IMPORTAR DADOS
                      </Button>
                      <Button
                        bg="#fff"
                        color="#2E4EFF"
                        border="1px"
                        borderColor="#2E4EFF"
                        w="100%"
                        fontSize="0.875rem"
                        borderRadius="20px" h="35px"
                        textTransform="uppercase"
                        fontWeight="600"
                        padding="8px 1.25rem"
                      >
                        BAIXAR TEMPLATE
                      </Button>
                    </Flex>
                  </Flex>
                </Box>

              </Box>
            </Box>
          </Box>
        </Flex>
      </Layout>
      <Modal isOpen={isOpenUpload} onClose={onCloseUpload} title="IMPORTAR DADOS" ><ModalUploadPayment /></Modal>
    </Box>
  );
}
