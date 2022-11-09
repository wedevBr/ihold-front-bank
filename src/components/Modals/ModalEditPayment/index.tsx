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
  useToast,
} from '@chakra-ui/react';
import { Input } from '~/components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IDataPIX, IDataTed } from '~/types/scheduledTransactions';
import { getLocalStorage } from '~/utils/localStorageFormat';
import { formatMask } from '~/utils/formatMask';
import { nifFormat } from '~/utils/nifFormat';
import { formatCalcValue } from '~/utils/formatValue';
import { UpdateScheduleTransactions } from '~/services/hooks/usePaymentsSchedule';
import {
  QueryObserverBaseResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
interface PropsModalEdit extends Omit<ModalProps, 'children'> {
  type?: 'pix' | 'transfer' | 'bill-payment';
  dataPix: IDataPIX;
  dataTransfer: IDataTed;
  setLoading?: (loading: boolean) => void;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverBaseResult>;
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
const pixSchema = yup.object().shape({
  amount: yup.string().required('Valor Obrigatório'),
  email: yup.string(),
  scheduled_date: yup.string().required('Agendamento Obrigatório'),
  key_type: yup.string().required('Tipo de Chave Obrigatória'),
  key: yup.string().required('Chave Obrigatória'),
  description: yup.string(),
  nif_number: yup.string(),
});
const transferSchema = yup.object().shape({
  amount_transfer: yup.string().required('Valor Obrigatório'),
  account_type: yup.string(),
  scheduled_date_transfer: yup.string().required('Agendamento Obrigatório'),
  bank_name: yup.string().required('Tipo de Chave Obrigatória'),
  branch: yup.string().required('Chave Obrigatória'),
  name: yup.string().required('Chave Obrigatória'),
  bank_code: yup.string(),
  description: yup.string(),
  nif_number: yup.string(),
  account: yup.string(),
});

export function ModalEditPayment({
  type = 'bill-payment',
  dataPix,
  dataTransfer,
  isOpen,
  refetch,
  onClose,
  setLoading,
}: PropsModalEdit) {
  const [loadindEdit, setLoadingEdit] = useState(false);
  const toast = useToast();
  const typeSchema = type === 'pix' ? pixSchema : transferSchema;
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(typeSchema),
    mode: 'onBlur',
  });
  async function handleEditData(data: any) {
    const transfer = {
      // is_approved: dataTransfer?.is_approved,
      status_id: dataTransfer?.status?.id,
      ...dataTransfer,
      scheduled_date: data.scheduled_date_transfer,
      payload: {
        amount: String(data.amount_transfer).replace(',', '.'),
        // amount: data.amount_transfer,
        description: data.description,
        nif_number: data.nif_number,
        recipient: {
          account_type:
            data.account_type === 'Corrente' ? 'checking' : 'savings',
          bank_code: data.bank_code,
          branch: data.branch,
          bank_name: dataTransfer?.payload?.recipient?.bank_name,
          account: data.account,
          name: data.name,
        },
      },
    };

    function formatDobleFloatValue(value: string, fixed?: number) {
      let formatValue = +String(value).replace(/\D/g, '');
      return parseFloat(formatValue.toFixed(fixed || 2)) / 100;
    }

    const pix = {
      // is_approved: dataPix?.is_approved,
      status_id: dataPix?.status?.id,
      // ...dataPix,
      scheduled_date: data.scheduled_date,
      payload: {
        key_type: data.key_type,
        key: data.key,
        amount: String(formatDobleFloatValue(data.amount, 2)),
        description: data.description,
        nif_number: data.nif_number,
        email: data.email,
      },
    };

    setLoadingEdit(true);

    try {
      setLoading && setLoading(true);
      const result = await UpdateScheduleTransactions(
        type === 'pix' ? dataPix.id : dataTransfer.id,
        type === 'pix' ? pix : transfer
      );

      toast({
        title: 'Dados atualizados com sucesso! ',
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });

      refetch && refetch();
      onClose();
    } catch (error: any) {
      toast({
        title:
          error?.response?.data?.errors?.scheduled_date?.map(
            (item: any) => item
          ) || error?.response?.data?.message,
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
      console.log(error);
    } finally {
      refetch && refetch();
      setLoading && setLoading(false);
      setLoadingEdit(false);
    }
  }
  useEffect(() => {
    if (dataPix && type === 'pix') {
      setValue('amount', formatCalcValue(String(dataPix?.payload.amount)));
      setValue('email', dataPix?.payload.email || '');
      setValue('scheduled_date', dataPix?.scheduled_date);
      setValue('key_type', dataPix?.payload?.key_type);
      setValue('key', dataPix?.payload?.key);
      setValue('description', dataPix?.payload?.description || '');
      setValue('nif_number', dataPix?.payload?.nif_number || '');
    }
    if (dataTransfer && type === 'transfer') {
      const { scheduled_date, payload, account: accountItems } = dataTransfer;
      const { amount, recipient, description } = payload;
      const { nif_number } = accountItems;

      const { account_type, bank_code, branch, account, name, bank_name } =
        recipient;
      setValue('amount_transfer', formatCalcValue(String(amount)));
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
      setValue('description_transfer', description || '');
      setValue('nif_number_transfer', nif_number || '');
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
                    {...register('amount', {
                      onChange(event: React.ChangeEvent<HTMLInputElement>) {
                        const { value } = event.currentTarget;
                        event.currentTarget.value =
                          formatCalcValue(value) || '';
                      },
                    })}
                    error={formState?.errors?.amount}
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
                        error={formState?.errors?.key_type}
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
                      error={formState?.errors?.key}
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
                      error={formState?.errors?.nif_number}
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
                      error={formState?.errors?.email}
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
                      error={formState?.errors?.scheduled_date}
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
                      error={formState?.errors?.description}
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
                    {...register('amount_transfer', {
                      onChange(event: React.ChangeEvent<HTMLInputElement>) {
                        const { value } = event.currentTarget;
                        event.currentTarget.value =
                          formatCalcValue(value) || '';
                      },
                    })}
                    error={formState?.errors?.amount_transfer}
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
                        error={formState?.errors?.account_type}
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
                      error={formState?.errors?.name}
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
                      error={formState?.errors?.bank_name}
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
                      error={formState?.errors?.nif_number_transfer}
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
                      error={formState?.errors?.branch}
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
                      error={formState?.errors?.bank_code}
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
                      error={formState?.errors?.scheduled_date_transfer}
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
                      error={formState?.errors?.description_transfer}
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
                  isLoading={loadindEdit}
                  onClick={() => console.log(formState?.errors)}
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
