import React, { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  colorLabel?: string;
  widthDefault?: any;
  error?: FieldError;
  disabled?: boolean;
  children: ReactNode;
  labelFontSize?: string;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    name,
    label,
    colorLabel,
    widthDefault,
    error,
    disabled,
    labelFontSize,
    children,
    ...rest
  },
  ref
) => {
  return (
    <FormControl isInvalid={!!error} w={widthDefault || 'full'}>
      {!!label && (
        <FormLabel
          fontWeight="bold"
          htmlFor={name}
          color={colorLabel || '#000'}
          fontSize={labelFontSize}
          mr="0"
        >
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        id={name}
        name={name}
        size="lg"
        fontSize="14px"
        iconColor="primary"
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {children}
      </ChakraSelect>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
