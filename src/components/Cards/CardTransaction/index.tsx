import React, { ReactElement } from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { formatCalcValue } from '~/utils/formatValue';
import Link from 'next/link';

interface ICardTransaction {
  icon: any;
  name: string;
  path: string;
}

export function CardTransaction({ name, icon, path }: ICardTransaction) {
  return (
    <Link href={path || ''}>
      <Box
        transition="all linear .25s"
        color="#00102A"
        _hover={{ mt: '-3px', bg: '#2E4EFF', color: '#fff' }}
        cursor="pointer"
        bg="#FFFFFF"
        w="120px"
        h="106px"
        borderRadius="10px"
        boxShadow="base"
        p="20px"
      >
        {icon}
        <Text mt="5px">{name}</Text>
      </Box>
    </Link>
  );
}
