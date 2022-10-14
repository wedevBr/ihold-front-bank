/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  ModalProps,
} from '@chakra-ui/react';
import { Input } from '~/components';
import { useForm } from 'react-hook-form';
import { IDataPIX } from '~/types/scheduledTransactions';
import { getLocalStorage } from '~/utils/localStorageFormat';
interface PropsModalEdit extends Omit<ModalProps, 'children'> {
  type?: 'pix' | 'transfer' | 'bill-payment';
  dataPix: IDataPIX;
}
interface Pix {
  key_type: string;
  key: string;
  amount: string;
  description: string;
  nif_number: string;
  email: string;
  scheduled_date: string;
}

export function ModalEditPayment({
  type = 'bill-payment',
  dataPix,
  isOpen,
  onClose,
}: PropsModalEdit) {
  const [edit, setEdit] = useState<IDataPIX>();
  console.log({ edit });

  const pix = {
    key_type: edit?.payload?.key_type,
    key: edit?.payload?.key,
    amount: edit?.payload?.amount || '',
    description: edit?.payload?.description || '',
    nif_number: edit?.payload?.nif_number || '',
    email: edit?.payload?.email || 'Allisson',
    scheduled_date: edit?.scheduled_date || '',
  };

  const { register, handleSubmit, formState, setValue } = useForm<Pix>({
    mode: 'onBlur',
  });
  async function handleEditData(data: any) {
    console.log(data);
  }
  useEffect(() => {
    const result = getLocalStorage('pix') as string;
    const pix = JSON.parse(result);
    setEdit(pix);
    if (edit) {
      setValue('amount', edit.payload.amount);
      setValue('email', edit.payload.email);
      setValue('scheduled_date', edit.scheduled_date);
    }
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderTop="10px solid #00102A" borderTopRadius="2px">
          EDITAR DADOS
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            minH="300px"
            w="full"
            as="form"
            onSubmit={handleSubmit(handleEditData)}
          >
            {
              type === 'pix' ? (
                <>
                  <Input
                    label="Valor"
                    labelColor="#7F8B9F"
                    width="40%"
                    size="sm"
                    bg="transparent"
                    fontSize="16px"
                    border="0px"
                    borderBottom="1px solid #7F8B9F"
                    borderRadius={0}
                    placeholder="R$0,00"
                    _focus={{
                      borderBottom: '1px solid #2E4EFF',
                    }}
                    {...register('amount')}
                    // error={false}
                  />
                  <Flex gap={5} py="5px">
                    <Box w="30%">
                      <Input
                        label="Tipo de chave"
                        labelColor="#7F8B9F"
                        size="sm"
                        bg="transparent"
                        fontSize="16px"
                        border="0px"
                        borderBottom="1px solid #7F8B9F"
                        borderRadius={0}
                        placeholder="E-mail"
                        _focus={{
                          borderBottom: '1px solid #2E4EFF',
                        }}
                        {...register('key_type')}
                        // error={formState?.errors?.username || any}
                      />
                    </Box>
                    <Input
                      label="Chave Pix"
                      labelColor="#7F8B9F"
                      width="100%"
                      size="sm"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="joaodaas@gmail.com"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('key')}
                      // error={formState?.errors?.username || any}
                    />
                  </Flex>
                  <SimpleGrid columns={2} gap={5} py="5px">
                    <Input
                      label="CPF/CNPJ"
                      labelColor="#7F8B9F"
                      width="90%"
                      size="sm"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="Lorem ipsum"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('nif_number')}
                      // error={formState?.errors?.username || any}
                    />
                    <Input
                      label="E-mail"
                      labelColor="#7F8B9F"
                      width="90%"
                      size="sm"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="mail@example.com"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('email')}
                      // error={formState?.errors?.username || any}
                    />
                    <Input
                      label="Agendamento"
                      labelColor="#7F8B9F"
                      width="90%"
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
                      {...register('scheduled_date')}
                      // error={formState?.errors?.username || any}
                    />
                    <Input
                      label="Descrição"
                      labelColor="#7F8B9F"
                      width="90%"
                      size="sm"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="Lorem ipsum"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('description')}
                      // error={formState?.errors?.username || any}
                    />
                  </SimpleGrid>
                </>
              ) : (
                <></>
              )
              //  (
              //   <>
              //     {type === 'transfer' ? (
              //       <>
              //         <Input
              //           label="Valor"
              //           labelColor="#7F8B9F"
              //           width="40%"
              //           size="sm"
              //           bg="transparent"
              //           fontSize="16px"
              //           border="0px"
              //           borderBottom="1px solid #7F8B9F"
              //           borderRadius={0}
              //           placeholder="R$0,00"
              //           _focus={{
              //             borderBottom: '1px solid #2E4EFF',
              //           }}
              //           {...register('value')}
              //           // error={formState?.errors?.username || any}
              //         />
              //         <Flex gap={5} py="5px">
              //           <Box w="30%">
              //             <Input
              //               label="Tipo de conta"
              //               labelColor="#7F8B9F"
              //               size="sm"
              //               bg="transparent"
              //               fontSize="16px"
              //               border="0px"
              //               borderBottom="1px solid #7F8B9F"
              //               borderRadius={0}
              //               placeholder="Conta corrente"
              //               _focus={{
              //                 borderBottom: '1px solid #2E4EFF',
              //               }}
              //               {...register('type')}
              //               // error={formState?.errors?.username || any}
              //             />
              //           </Box>
              //           <Input
              //             label="Nome"
              //             labelColor="#7F8B9F"
              //             width="100%"
              //             size="sm"
              //             bg="transparent"
              //             fontSize="16px"
              //             border="0px"
              //             borderBottom="1px solid #7F8B9F"
              //             borderRadius={0}
              //             placeholder="Lorem ipsum"
              //             _focus={{
              //               borderBottom: '1px solid #2E4EFF',
              //             }}
              //             {...register('value')}
              //             // error={formState?.errors?.username || any}
              //           />
              //         </Flex>
              //         <SimpleGrid columns={2} gap={5} py="5px">
              //           <Input
              //             label="Banco"
              //             labelColor="#7F8B9F"
              //             width="90%"
              //             size="sm"
              //             bg="transparent"
              //             fontSize="16px"
              //             border="0px"
              //             borderBottom="1px solid #7F8B9F"
              //             borderRadius={0}
              //             placeholder="341 - ITAU UNIBANCO S.A."
              //             _focus={{
              //               borderBottom: '1px solid #2E4EFF',
              //             }}
              //             {...register('value')}
              //             // error={formState?.errors?.username || any}
              //           />
              //           <Input
              //             label="CPF/CNPJ"
              //             labelColor="#7F8B9F"
              //             width="90%"
              //             size="sm"
              //             bg="transparent"
              //             fontSize="16px"
              //             border="0px"
              //             borderBottom="1px solid #7F8B9F"
              //             borderRadius={0}
              //             placeholder="0000000000000"
              //             _focus={{
              //               borderBottom: '1px solid #2E4EFF',
              //             }}
              //             {...register('value')}
              //             // error={formState?.errors?.username || any}
              //           />
              //           <Input
              //             label="Agência"
              //             labelColor="#7F8B9F"
              //             width="90%"
              //             size="sm"
              //             bg="transparent"
              //             fontSize="16px"
              //             border="0px"
              //             borderBottom="1px solid #7F8B9F"
              //             borderRadius={0}
              //             placeholder="000-0"
              //             _focus={{
              //               borderBottom: '1px solid #2E4EFF',
              //             }}
              //             {...register('value')}
              //             // error={formState?.errors?.username || any}
              //           />
              //           <Input
              //             label="Conta"
              //             labelColor="#7F8B9F"
              //             width="90%"
              //             size="sm"
              //             bg="transparent"
              //             fontSize="16px"
              //             border="0px"
              //             borderBottom="1px solid #7F8B9F"
              //             borderRadius={0}
              //             placeholder="000000-0"
              //             _focus={{
              //               borderBottom: '1px solid #2E4EFF',
              //             }}
              //             {...register('value')}
              //             // error={formState?.errors?.username || any}
              //           />
              //           <Input
              //             label="Agendamento"
              //             labelColor="#7F8B9F"
              //             width="90%"
              //             size="sm"
              //             bg="transparent"
              //             color="#7F8B9F"
              //             type="date"
              //             fontSize="16px"
              //             border="0px"
              //             borderBottom="1px solid #7F8B9F"
              //             borderRadius={0}
              //             placeholder="dd/mm/aaaa"
              //             _focus={{
              //               borderBottom: '1px solid #2E4EFF',
              //             }}
              //             {...register('value')}
              //             // error={formState?.errors?.username || any}
              //           />
              //           <Input
              //             label="Descrição"
              //             labelColor="#7F8B9F"
              //             width="90%"
              //             size="sm"
              //             bg="transparent"
              //             fontSize="16px"
              //             border="0px"
              //             borderBottom="1px solid #7F8B9F"
              //             borderRadius={0}
              //             placeholder="Lorem ipsum"
              //             _focus={{
              //               borderBottom: '1px solid #2E4EFF',
              //             }}
              //             {...register('value')}
              //             // error={formState?.errors?.username || any}
              //           />
              //         </SimpleGrid>
              //       </>
              //     ) : (
              //       <>
              //         {type === 'bill-payment' && (
              //           <>
              //             <Input
              //               label="Valor"
              //               labelColor="#7F8B9F"
              //               width="40%"
              //               size="sm"
              //               bg="transparent"
              //               fontSize="16px"
              //               border="0px"
              //               borderBottom="1px solid #7F8B9F"
              //               borderRadius={0}
              //               placeholder="R$0,00"
              //               _focus={{
              //                 borderBottom: '1px solid #2E4EFF',
              //               }}
              //               {...register('value')}
              //               // error={formState?.errors?.username || any}
              //             />
              //             <Box w="95%" py="5px">
              //               <Input
              //                 label="Linha digitável"
              //                 labelColor="#7F8B9F"
              //                 size="sm"
              //                 bg="transparent"
              //                 fontSize="16px"
              //                 border="0px"
              //                 borderBottom="1px solid #7F8B9F"
              //                 borderRadius={0}
              //                 placeholder="000000000000000000000000000000000000000000000000000000000000000000000000"
              //                 _focus={{
              //                   borderBottom: '1px solid #2E4EFF',
              //                 }}
              //                 {...register('type')}
              //                 // error={formState?.errors?.username || any}
              //               />
              //             </Box>
              //             <SimpleGrid columns={2} gap={5} py="5px">
              //               <Input
              //                 label="Agendamento"
              //                 labelColor="#7F8B9F"
              //                 width="90%"
              //                 size="sm"
              //                 bg="transparent"
              //                 color="#7F8B9F"
              //                 type="date"
              //                 fontSize="16px"
              //                 border="0px"
              //                 borderBottom="1px solid #7F8B9F"
              //                 borderRadius={0}
              //                 placeholder="dd/mm/aaaa"
              //                 _focus={{
              //                   borderBottom: '1px solid #2E4EFF',
              //                 }}
              //                 {...register('value')}
              //                 // error={formState?.errors?.username || any}
              //               />
              //               <Input
              //                 label="Pagamento"
              //                 labelColor="#7F8B9F"
              //                 width="90%"
              //                 size="sm"
              //                 bg="transparent"
              //                 color="#7F8B9F"
              //                 type="date"
              //                 fontSize="16px"
              //                 border="0px"
              //                 borderBottom="1px solid #7F8B9F"
              //                 borderRadius={0}
              //                 placeholder="dd/mm/aaaa"
              //                 _focus={{
              //                   borderBottom: '1px solid #2E4EFF',
              //                 }}
              //                 {...register('value')}
              //                 // error={formState?.errors?.username || any}
              //               />
              //               <Input
              //                 label="CPF/CNPJ"
              //                 labelColor="#7F8B9F"
              //                 width="90%"
              //                 size="sm"
              //                 bg="transparent"
              //                 fontSize="16px"
              //                 border="0px"
              //                 borderBottom="1px solid #7F8B9F"
              //                 borderRadius={0}
              //                 placeholder="0000000000000"
              //                 _focus={{
              //                   borderBottom: '1px solid #2E4EFF',
              //                 }}
              //                 {...register('value')}
              //                 // error={formState?.errors?.username || any}
              //               />
              //             </SimpleGrid>
              //           </>
              //         )}
              //       </>
              //     )}
              //   </>
              // )
            }

            <Flex gap={5} justify="flex-end" py="20px">
              <Box w="25%">
                <Button
                  bg="#FFF"
                  w="100%"
                  border="1px"
                  borderColor="#2E4EFF"
                  color="#2E4EFF"
                  borderRadius="40px"
                >
                  VOLTAR
                </Button>
              </Box>
              <Box w="25%">
                <Button
                  bg="#CBD3E0"
                  w="100%"
                  border="0"
                  color="#070A0E"
                  type="submit"
                  borderRadius="40px"
                  _hover={{ background: '#2E4EFF', color: '#FFF' }}
                >
                  SALVAR
                </Button>
              </Box>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
