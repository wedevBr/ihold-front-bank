import React from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { formatCalcValue } from '~/utils/formatValue';

interface ICardValue {
  type: 'cash-in' | 'cash-out' | 'prevision' | 'default';
  value?: string | number;
  percentage: number;
  result?: number
}

export function CardValue({
  type = 'default',
  value,
  percentage = 0,
  result = 0,
}: ICardValue) {
  function handleType({ type }: Omit<ICardValue, 'value' | 'percentage'>) {
    switch (type) {
      case 'cash-in':
        return {
          color: '#27AE60',
          name: 'Entradas',
          icon: 'bi:arrow-90deg-up',
        };
      case 'cash-out':
        return {
          color: '#F03D3E',
          name: 'Saídas',
          icon: 'bi:arrow-90deg-down',
        };
      case 'prevision':
        return {
          color: '#21C6DE',
          name: 'Previsão',
          icon: '',
        };

      default:
        return {
          color: '#ccc',
          name: 'Carregando',
          icon: '',
        };
    }
  }
  return (
    <Flex
      bg="#FFFFFF"
      w="358px"
      h="120px"
      borderRadius="10px"
      boxShadow="sm"
      align="center"
      p="20px"
    >
      <Box mr="20px">
        <CircularProgress
          value={percentage}
          color={handleType({ type }).color}
          size="88px"
          thickness="7px"
        >
          <CircularProgressLabel
            justifyContent="center"
            alignItems="center"
            w="full"
          >
            <Icon
              icon={handleType({ type }).icon}
              color={handleType({ type }).color}
              width={25}
              style={{ marginLeft: '31px' }}
            />
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box>
        <Text
          fontFamily="Lato"
          fontStyle="normal"
          fontWeight="700"
          fontSize="30px"
          color={handleType({ type }).color}
        >{value ? result < 0 ? `-R$ ${formatCalcValue(value.toString())}` : `R$ ${formatCalcValue(value.toString())}` : ""}

        </Text>
        <Text
          fontFamily="Lato"
          fontStyle="normal"
          fontWeight="400"
          color="#7F8B9F"
        >
          {handleType({ type }).name}
        </Text>
      </Box>
    </Flex>
  );
}
