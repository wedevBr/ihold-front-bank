import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useAuthContext } from '~/context/AuthContext';
import { useEffect, useState } from 'react';
import { GetUserAvatar } from '~/services/hooks/useAuth';
import { Icon } from '@iconify/react';
import {
  GetAuthenticatedUserData,
  GetUserAccountBalanceData,
} from '~/services/hooks/useAccount';
import { AccountUser } from '~/types/accounts.types';
import { Input } from '../input';
import { useQuery } from 'react-query';
import { formatCalcValue } from '~/utils/formatValue';
import { nifFormat } from '~/utils/nifFormat';

interface HeaderProps {
  name: string;
  avatar?: string;
}

interface IAmount {
  amount: number;
  currency: string;
}

export function Header({ name, avatar }: HeaderProps) {
  const { signOut } = useAuthContext();
  const [toggle, setToggle] = useState(false);

  const { data: dataBalance, isLoading: IsloadingBalance } = useQuery(
    'balance-user',
    GetUserAccountBalanceData,
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
  const { data, isLoading } = useQuery(
    'account-user',
    GetAuthenticatedUserData,
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
  console.log({ dataBalance });

  return (
    <Box w="100%" h="90px" bg="#00102A" display="flex" alignItems="center">
      <Box
        w="100%"
        h="4.5rem"
        display="flex"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
        px={{ base: '10px', md: '20px' }}
      >
        <Image
          src="/assets/logo-branca.svg"
          width={120}
          height={150}
          alt="logo"
        />
        <Box
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="right"
          gap="0.80rem"
          color="#fff"
        >
          <Box>
            <Flex align="center">
              <Icon
                width="25px"
                cursor="pointer"
                color="#21C6DE"
                onClick={() => setToggle(!toggle)}
                icon="akar-icons:eye"
              />
              <Text ml="10px" userSelect="none">
                Saldo em conta
              </Text>
            </Flex>
            <Text mt="5px" userSelect="none">{`R$ ${
              toggle
                ? dataBalance?.data
                  ? formatCalcValue(
                      String(dataBalance?.data?.amount + 0) || '0'
                    )
                  : formatCalcValue('000')
                : '***********'
            }`}</Text>
          </Box>
          <Center height="50px">
            <Divider color="#7F8B9F" orientation="vertical" />
          </Center>
          <Flex
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyItems="center"
            color="#fff"
            fontSize="14px"
          >
            {isLoading ? (
              <SkeletonCircle size="10" height="50px" w="50px" />
            ) : (
              <Avatar
                name={data?.data?.register_name}
                src={data?.data.avatar?.file_detail?.url}
                size="md"
              />
            )}
            <Box ml="10px">
              {isLoading ? (
                // <Skeleton height="15px" w="150px" />
                <SkeletonText noOfLines={2} height="15px" w="150px" />
              ) : (
                <Text>{`Olá, ${data?.data?.register_name}`}</Text>
              )}
              <Text>
                {nifFormat(
                  (data?.data?.nif_number as string) ?? '',
                  data?.data?.nif_number.length === 11 ? 'cpf' : 'cnpj'
                )}
              </Text>
            </Box>
          </Flex>

          <Center height="50px">
            <Divider mx="1rem" color="#7F8B9F" orientation="vertical" />
          </Center>
          <Flex onClick={signOut} align="center" cursor="pointer">
            <Text
              color="#fff"
              fontSize="0.875rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="0.80rem"
              mr="10px"
            >
              Sair
            </Text>
            <Box>
              <Icon icon="ic:baseline-logout" color="#21C6DE" width={24} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
