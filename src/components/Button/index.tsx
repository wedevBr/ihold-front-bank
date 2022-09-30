import {
  Box,
  Button as ButtonChakra,
  ButtonProps as ButtonPropsChakra,
  Spinner,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps extends ButtonPropsChakra {
  loading?: boolean;
  children: string;
  border: string;
  bg: string;
  size: string;
  color: string;
  icon?: ReactNode;
  ref?: any;
}

export function Button({
  children,
  border,
  bg,
  size,
  color,
  icon,
  ref,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <ButtonChakra
      ref={ref}
      {...rest}
      bg={bg}
      border={border}
      borderRadius="40px"
      w={size}
      color={color}
      isLoading={loading}
    >
      <Box mr="0.5rem">{icon}</Box>
      {children}
    </ButtonChakra>
  );
}
