import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  GridItem,
  HStack,
  PinInput,
  PinInputField,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { Input } from '~/components/input';

interface IAddressProps {
  // register: UseFormRegister<Address>;
  // error: FormState<Address>;
  register: any;
  error: any;
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
}
export function FormAuthentication({
  error,
  register,
  currentTab,
  setCurrentTab,
  setPermissionTab,
}: IAddressProps) {
  const [code, setCode] = useState('');

  return (
    <Box
      p="30px"
      bg="#FFFFFF
"
      borderRadius="6px"
      borderTop="11px solid #00102A
"
    >
      <Text fontSize="18px" fontWeight="600">
        Passo {currentTab + 1}/7
      </Text>
      <Text
        pt="10px"
        pb="30px"
        color="#7F8B9F
"
      >
        Para começar, me fale um pouco mais sobre você
      </Text>
      <FormControl isInvalid={!!error}>
        <Center w="100%">
          <HStack>
            <PinInput
              autoFocus
              type="number"
              errorBorderColor="red"
              size="lg"
              value={code}
              onChange={(value) => setCode(value)}
            >
              {Array.from({ length: 6 }).map((_, key) => (
                <PinInputField key={key} />
              ))}
            </PinInput>
          </HStack>
        </Center>
        {!!error?.error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
      <Flex gap={5} justify="flex-end" pb="20px" pt="40px">
        <Box w="25%">
          <Button
            bg="#FFF"
            w="100%"
            border="1px"
            borderColor="#2E4EFF
"
            color="#2E4EFF
"
            borderRadius="40px"
            onClick={() => currentTab !== 0 && setCurrentTab(currentTab - 1)}
          >
            VOLTAR
          </Button>
        </Box>
        <Box w="25%">
          <Button
            bg="#CBD3E0
"
            w="100%"
            border="0"
            color="#070A0E
"
            borderRadius="40px"
            _hover={{
              background: '#2E4EFF',
              color: '#FFF',
            }}
            onClick={async () => {
              setCurrentTab((current: any) => current + 1);
              setPermissionTab((prev: any) => [...prev, 3]);
            }}
          >
            SALVAR
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
