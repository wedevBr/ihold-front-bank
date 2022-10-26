/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Center,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import {
  BatchPaymentTable,
  Input,
  Layout,
  Modal,
  ModalEditPayment,
} from '~/components';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import {
  DeleteScheduleTransactions,
  GetScheduleAllTransactionDataApproved,
  getValidateScheduleTransaction,
} from '~/services/hooks/usePaymentsSchedule';
import { IDataPIX } from '~/types/scheduledTransactions';
import { IPaginationData } from '~/types/pagination';
import { ModalStatus } from '~/components/Modals/ModalStatus';
import { ModalAuth } from '~/components/Modals/ModalAuth';
import { setLocalStorage } from '~/utils/localStorageFormat';
import { useRouter } from 'next/router';

export default function ReviewPayment() {
  const [scheduleID, setScheduleID] = useState<number[]>([]);
  const [items, setItems] = useState<IPaginationData<IDataPIX>>();
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [deletSchedule, setDeletSchedule] = useState(false);
  const [edit, setEdit] = useState<IDataPIX>();
  const [password, setPassword] = useState('');
  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
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

  const { query } = useRouter();

  async function handleConfirmationPayment(secretPassword: string) {
    if (items && secretPassword) {
      setPaymentLoading(true);
      return await Promise.all(
        items?.data?.map(async (pix) => {
          return await GetScheduleAllTransactionDataApproved(
            pix.id,
            secretPassword
          )
            .then((_) => {
              onCloseAuth();
              onPenSuccess();
            })
            .finally(() => setPaymentLoading(false));
        })
      );
    }
  }

  async function getScheduleTransaction() {
    setLoading(true);
    try {
      const response = await getValidateScheduleTransaction<IDataPIX>(
        query.transaction as 'pix' | 'transfer' | 'bill-payment',
        70,
        'false'
      );
      setItems(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    getScheduleTransaction();
  }, [deletSchedule, loadingEdit, paymentLoading]);

  return (
    <Box h="full" w="full">
      <Layout>
        <Box
          bg="#FFFFFF"
          mr="20px"
          borderRadius="10px"
          boxShadow="base"
          p="20px"
          mt="30px"
        >
          <Flex w="full" justify="space-between" align="center">
            <Flex align="center">
              <Link href="/payment">
                <Icon
                  icon="akar-icons:chevron-left"
                  color="#21C6DE"
                  width={30}
                  style={{ cursor: 'pointer' }}
                />
              </Link>
              <Center height="50px" mx="5px">
                <Divider orientation="vertical" h="full" />
              </Center>
              <Text
                ml="20px"
                color="#00102A"
                textAlign="center"
                fontFamily="Lato"
                fontStyle="normal"
                fontWeight="700"
                fontSize="20px"
              >
                Revisão de dados
              </Text>
            </Flex>
            <Flex align="center">
              <Button
                bg="#2E4EFF"
                color="#fff"
                w="70%"
                mr="15px"
                fontSize="0.875rem"
                borderRadius="20px"
                h="35px"
                textTransform="uppercase"
                fontWeight="600"
                padding="8px 1.25rem"
                onClick={() => onOpenAuth()}
              >
                <Icon
                  icon="bx:check-shield"
                  width={20}
                  style={{ marginRight: 5 }}
                />
                EXECUTAR PAGAMENTO
              </Button>
              <Button
                bg="#F03D3E"
                color="#fff"
                fontSize="0.875rem"
                borderRadius="20px"
                h="35px"
                w="205px"
                textTransform="uppercase"
                fontWeight="600"
                padding="8px 1.25rem"
                onClick={onPenDelet}
              >
                <Icon icon="ep:delete" width={17} style={{ marginRight: 5 }} />
                Excluir
              </Button>
            </Flex>
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
          <BatchPaymentTable
            type={query.transaction as 'pix' | 'transfer' | 'bill-payment'}
            filterApproved="false"
            edit
            loadingEdit={setLoadingEdit}
            loading={setLoading}
            setState={setItems}
            setPage={setPage}
            isLoading={loading}
            items={items}
            dataTransfer={items}
            getScheduleIDS={(ids) => setScheduleID(ids)}
          />
        </Box>
      </Layout>
      <ModalStatus
        variant="success"
        title="PAGAMENTO AUTORIZADO"
        route="/home/all-statements"
        description="Seu pagamento em lote foi autorizado com sucesso! Acompanhe o status de pagamento pelo extrato."
        titleButton="Ver extrato"
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
      />
      <ModalStatus
        variant="alert"
        handleClick={() => deletScheduleTrasanction(scheduleID)}
        titleButton="excluir"
        isOpen={isOpenDelet}
        onClose={onCloseDelet}
      />
      <ModalAuth
        handlePassword={(pass) => setPassword(pass)}
        loading={paymentLoading}
        isOpen={isOpenAuth}
        onClose={onCloseAuth}
        handleClick={() => handleConfirmationPayment(password)}
      />
    </Box>
  );
}
