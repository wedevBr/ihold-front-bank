import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Center,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { BatchPaymentTable, Input, Layout, Modal } from '~/components';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import {
  DeleteScheduleTransactions,
  useScheduleTransactions,
} from '~/services/hooks/usePaymentsSchedule';

export default function ReviewPayment() {
  const [scheduleID, setScheduleID] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading, isFetching } =
    useScheduleTransactions(page);
  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload,
  } = useDisclosure();

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
                onClick={() => onOpenUpload()}
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
                onClick={() => deletScheduleTrasanction(scheduleID)}
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
            refetch={refetch}
            setPage={setPage}
            isLoading={isFetching}
            items={data}
            getScheduleIDS={(ids) => setScheduleID(ids)}
          />
        </Box>
      </Layout>
      <Modal isOpen={isOpenUpload} onClose={onCloseUpload}>
        <Box>
          <Text>AUTORIZAR PAGAMENTO</Text>
          <Text>
            Digite sua senha de acesso para confirmar a autorização do pagamento
            em lote
          </Text>
          <Input
            top="60%"
            name="Password"
            label=""
            labelColor="#7F8B9F"
            size="lg"
            bg="transparent"
            fontSize="18px"
            height="56px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="*********"
            type="password"
            iconColor="#21C6DE"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            // {...register('password')}
            // error={formState?.errors?.password}
          />
          <Button
            mt="25px"
            mb="30px"
            w="full"
            color="#fff"
            bg="#2E4EFF"
            borderRadius="40px"
          >
            CONFIRMAR
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
