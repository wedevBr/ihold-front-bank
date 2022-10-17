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
import { IDataPIX, IDataTed } from '~/types/scheduledTransactions';
import { getLocalStorage } from '~/utils/localStorageFormat';
interface PropsModalEdit extends Omit<ModalProps, 'children'> {
  type?: 'pix' | 'transfer' | 'bill-payment';
  dataPix: IDataPIX;
  dataTransfer: IDataTed;
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
  dataTransfer,
  isOpen,
  onClose,
}: PropsModalEdit) {
  console.log({ dataTransfer });

  const { register, handleSubmit, formState, setValue } = useForm({
    mode: 'onBlur',
  });
  async function handleEditData(data: any) {
    console.log(data);
  }
  useEffect(() => {
    if (dataPix && type === 'pix') {
      setValue('amount', dataPix?.payload.amount);
      setValue('email', dataPix?.payload.email);
      setValue('scheduled_date', dataPix?.scheduled_date);
      setValue('key_type', dataPix?.payload?.key_type);
      setValue('key', dataPix?.scheduled_date);
      setValue('description', dataPix?.payload?.description);
      setValue('nif_number', dataPix?.payload?.nif_number);
    }
    if (dataTransfer && type === 'transfer') {
      const { scheduled_date, payload, account: accountItems } = dataTransfer;
      const { amount, recipient, description } = payload;
      const { nif_number } = accountItems;

      const { account_type, bank_code, branch, account, name, bank_name } =
        recipient;
      setValue('amount_transfer', amount);
      setValue(
        'account_type',
        account_type === 'checking' ? 'Corrente' : 'Poupança'
      );
      setValue('account', account);
      setValue('bank_code', bank_code);
      setValue('scheduled_date_transfer', scheduled_date);
      setValue('bank_name', bank_name);
      setValue('branch', branch);
      setValue('name', name);
      setValue('description_transfer', description);
      setValue('nif_number_transfer', nif_number);
    }
  }, [dataPix, dataTransfer]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay bg="#00000223" />
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
              ) : type === 'transfer' ? (
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
                    {...register('amount_transfer')}
                    // error={formState?.errors?.username || any}
                  />
                  <Flex gap={5} py="5px">
                    <Box w="30%">
                      <Input
                        label="Tipo de conta"
                        labelColor="#7F8B9F"
                        size="sm"
                        bg="transparent"
                        fontSize="16px"
                        border="0px"
                        borderBottom="1px solid #7F8B9F"
                        borderRadius={0}
                        placeholder="Conta corrente"
                        _focus={{
                          borderBottom: '1px solid #2E4EFF',
                        }}
                        {...register('account_type')}
                        // error={formState?.errors?.username || any}
                      />
                    </Box>
                    <Input
                      label="Nome"
                      labelColor="#7F8B9F"
                      width="100%"
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
                      {...register('name')}
                      // error={formState?.errors?.username || any}
                    />
                  </Flex>
                  <SimpleGrid columns={2} gap={5} py="5px">
                    <Input
                      label="Banco"
                      labelColor="#7F8B9F"
                      width="90%"
                      size="sm"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="341 - ITAU UNIBANCO S.A."
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('bank_name')}
                      // error={formState?.errors?.username || any}
                    />
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
                      placeholder="0000000000000"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('nif_number_transfer')}
                      // error={formState?.errors?.username || any}
                    />
                    <Input
                      label="Agência"
                      labelColor="#7F8B9F"
                      width="90%"
                      size="sm"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="000-0"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('branch')}
                      // error={formState?.errors?.username || any}
                    />
                    <Input
                      label="Conta"
                      labelColor="#7F8B9F"
                      width="90%"
                      size="sm"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="000000-0"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('bank_code')}
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
                      {...register('scheduled_date_transfer')}
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
                      {...register('description_transfer')}
                      // error={formState?.errors?.username || any}
                    />
                  </SimpleGrid>
                </>
              ) : null
              //  (
              //   <>
              //     {type === 'transfer' ? (
              //
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
