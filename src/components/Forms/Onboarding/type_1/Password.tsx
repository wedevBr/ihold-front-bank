import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  GridItem,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { Input } from '~/components/input';
import { VerifyPassword } from '~/components/Verify/VerifyPassword';

interface IPasswordProps {
  // register: UseFormRegister<Address>;
  // error: FormState<Address>;
  register: any;
  watch: any;
  error: any;
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
}
export function FormPassword({
  error,
  register,
  watch,
  currentTab,
  setCurrentTab,
  setPermissionTab,
}: IPasswordProps) {
  return (
    <Box
      p="30px"
      bg="#FFFFFF"
      borderRadius="6px"
      borderTop="11px solid #00102A"
    >
      <Text fontSize="18px" fontWeight="600">
        Passo {currentTab + 1}/7
      </Text>
      <Text pt="10px" pb="30px" color="#7F8B9F">
        Agora que a gente já te conhece, só falta você cadastrar uma boa senha,
        pra garantir a segurança dos seus dados
      </Text>
      <Box w="40%">
        <Input
          label="Senha"
          labelColor="#7F8B9F"
          size="lg"
          bg="transparent"
          fontSize="18px"
          height="56px"
          border="0px"
          borderBottom="1px solid #7F8B9F"
          borderRadius={0}
          placeholder="*********"
          type="password"
          iconColor="#21C6DE"
          _focus={{
            borderBottom: '1px solid #2E4EFF',
          }}
          {...register('password')}
          error={error.errors.password}
        />
        <VerifyPassword verify={watch('password')} />
      </Box>
      <Flex gap={2} pt="20px">
        <Checkbox size="lg" />
        <Text color="#7F8B9F">
          Eu concordo com os <Link color="#2E4EFF">Termos de Serviço</Link> e
          aceito o <Link color="#2E4EFF">Contrato de Credenciamento</Link>
        </Text>
      </Flex>
      <Flex gap={5} justify="flex-end" pb="20px" pt="40px">
        <Box w="25%">
          <Button
            bg="#FFF"
            w="100%"
            border="1px"
            borderColor="#2E4EFF"
            color="#2E4EFF"
            borderRadius="40px"
            onClick={() => currentTab !== 0 && setCurrentTab(currentTab - 1)}
          >
            VOLTAR
          </Button>
        </Box>
        <Box w="25%">
          <Button
            bg="#CBD3E0"
            w="100%"
            border="0"
            color="#070A0E"
            type="submit"
            borderRadius="40px"
            _hover={{ background: '#2E4EFF', color: '#FFF' }}
            onClick={() => {
              setCurrentTab((current: any) => current + 1);
              setPermissionTab((prev: any) => [...prev, 7]);
            }}
          >
            SALVAR
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
