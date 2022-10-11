/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react';
import {
  InfiniteQueryObserverBaseResult,
  QueryObserverBaseResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from 'react-query';
import { createPagination } from '~/hooks/createPagination';
import { api } from '~/services/api';
import {
  getValidateScheduleTransaction,
  useScheduleTransactions,
} from '~/services/hooks/usePaymentsSchedule';

interface INavigation {
  current?: number;
  next?: string | null;
  prev?: string | null;
  last?: number;
  setPage?: (numberPage: number) => void;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverBaseResult>;
  total?: number;
}

export function Pagination({
  current = 1,
  next,
  last = 10,
  prev,
  total = 1,
  setPage,
  refetch,
}: INavigation) {
  const { pagination } = createPagination(5, total, current);

  function handleClick(page: number) {
    console.log('Page');
    setPage && setPage(page);
    refetch && refetch();
  }

  function handleNext() {
    if (next) {
      setPage && setPage(current + 1 >= last ? last : current + 1);
      refetch && refetch();
    }
  }

  function handlePrev() {
    if (prev) {
      setPage && setPage(current - 1 <= 1 ? 1 : current - 1);
      refetch && refetch();
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
