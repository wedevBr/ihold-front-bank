import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react';
import { createPagination } from '~/hooks/createPagination';
import { api } from '~/services/api';

interface INavigation {
  current?: number;
  next?: string | null;
  prev?: string | null;
  setState: (item: any) => void;
  setAll: (item: any) => void;
  loading: (state: boolean) => void;
  total?: number;
}

export function Pagination({
  current = 1,
  next,
  prev,
  setState,
  setAll,
  loading,
  total = 1,
}: INavigation) {
  const { pagination } = createPagination(5, total, current);

  const { ['@iHoldAdminAccess_token']: access } = parseCookies();

  const formatURL = async (pageURL: string) => {
    const url = decodeURIComponent(pageURL);
    const newURL = url.replace(/http/g, 'https');
    const { data } = await axios({
      url: newURL,
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${access}`,
      },
    });
    return data;
  };

  const include = [
    'addresses',
    'phones',
    'bankAccount',
    'user',
    'status',
    'payload',
  ];
  async function handleClick(page: number) {
    loading(true);
    try {
      const { data } = await api.get('/accounts', {
        params: {
          'page[number]': page,
          'page[size]': 10,
          include: include?.toString(),
          sort: ['register_name'],
        },
      });
      setState(data);
      setAll(data.data);
      console.log({ data });
    } catch (error) {
      console.log();
    } finally {
      loading(false);
    }
  }

  async function handleNext() {
    loading(true);
    try {
      if (next) {
        const data = await formatURL(next);
        setState(data);
        setAll(data.data);
      }
    } catch (error) {
      console.log();
    } finally {
      loading(false);
    }
  }

  async function handlePrev() {
    loading(true);
    try {
      if (prev) {
        const data = await formatURL(prev);
        setState(data);
        setAll(data.data);
      }
    } catch (error) {
      console.log();
    } finally {
      loading(false);
    }
  }

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="60px"
    >
      <Flex
        w="309px"
        h="30px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box cursor={prev ? 'pointer' : 'not-allowed'}>
          <Icon
            icon="dashicons:arrow-left-alt2"
            color={prev ? '#7f8b9f' : '#ccc'}
            width="20"
            height="20"
            onClick={() => !!prev && handlePrev()}
          />
        </Box>
        {pagination.map((item) => (
          <Box
            key={item}
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="26px"
            h="26px"
            bg={current === item ? '#2E4EFF' : ' trasparent'}
            borderRadius="6px"
            onClick={() => handleClick(item)}
          >
            <Text
              fontSize="16px"
              color={current === item ? '#fff' : ' #CBD3E0'}
            >
              {item}
            </Text>
          </Box>
        ))}
        <Box cursor={next ? 'pointer' : 'not-allowed'}>
          <Icon
            icon="dashicons:arrow-right-alt2"
            color={next ? '#7f8b9f' : '#ccc'}
            width="20"
            height="20"
            onClick={() => !!next && handleNext()}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
