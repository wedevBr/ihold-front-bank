import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface TextAreaProps extends ChakraTextareaProps {
  name: string;
  iconColor?: string;
  labelColor?: string;
  bgHover?: string;
  bgFocus?: string;
  bgPlaceholder?: string;
  label?: string;
  error?: FieldError;
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLInputElement,
  TextAreaProps
> = ({
  name,
  as,
  iconColor,
  labelColor,
  bgHover,
  bgFocus,
  bgPlaceholder,
  label,
  error = null,
  ...rest
}) => {
  return (
    <Box pos="relative">
      <FormControl isInvalid={!!error}>
        {!!label && (
          <FormLabel htmlFor={name} color={labelColor}>
            {label}
          </FormLabel>
        )}
        <ChakraTextarea
          borderBottom="1px solid #7F8B9F"
          borderTop="1px solid #7F8B9F"
          borderRight="1px solid #7F8B9F"
          borderLeft="1px solid #7F8B9F"
          name={name}
          id={name}
          fontSize="14px"
          variant="filled"
          _hover={{
            bg: bgHover,
          }}
          _focus={{
            bg: bgFocus,
          }}
          _placeholder={{
            color: bgPlaceholder,
          }}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage mb="10px">{error.message}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};

export const Textarea = forwardRef(TextareaBase);
