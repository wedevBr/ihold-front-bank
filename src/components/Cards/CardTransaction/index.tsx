import React from 'react';
import { Text, Box, BoxProps } from '@chakra-ui/react';

import Link from 'next/link';

interface ICardTransaction extends BoxProps {
  icon: any;
  name: string;
  path?: string;
}

export function CardTransaction({
  name,
  icon,
  path,
  ...rest
}: ICardTransaction) {
  if (!path) {
    return (
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
        {...rest}
      >
        {icon}
        <Text mt="5px">{name}</Text>
      </Box>
    );
  }
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
        {...rest}
      >
        {icon}
        <Text mt="5px" fontSize="15px">
          {name}
        </Text>
      </Box>
    </Link>
  );
}
