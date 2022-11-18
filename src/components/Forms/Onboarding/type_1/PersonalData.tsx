import React, { useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { Input } from '~/components/input';
export type FileProps = {
  path: string;
  lastModified: number;
  slice: () => void;
  stream: () => void;
  text: () => void;
  arrayBuffer: ArrayBuffer;
  name: string;
  size: number;
  type: string;
};
export interface Client {
  document_type: string,
  nif_number: string,
  register_name: string,
  social_name: string,
  birth_date: Date,
  mother_name: string,
  email: string,
  member_type: string,
  member_qualification: string,
  proxy_date: Date,
  percentual: number,
  presumed_income: number,
  pep: true,
  inform: true,
  phone: {
    number: string
  }
}interface IClientProps {
  // register: UseFormRegister<Address>;
  // error: FormState<Address>;
  register: any;
  error: any
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
}export function FormPersonalData({
  error,
  register,
  currentTab,
  setCurrentTab,
  setPermissionTab,
}: IClientProps) {
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      p="30px"
      bg="#FFFFFF"
      borderRadius="6px"
      borderTop="11px solid #00102A"
    >
      <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/7</Text>
      <Text pt="10px" pb="30px" color="#7F8B9F">Para começar, me fale um pouco mais sobre você</Text>

      <Flex w="full" justify="space-between">
        <Box w="full" mr="20px">
          <Input
            label="Nome Completo"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Lorem ipsum"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('register_name')}
            error={error.errors.register_name}
          />
        </Box>
        <Box w="full">
          <Input
            label="CPF"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="000.000.000-00"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('nif_number')}
            error={error.errors.nif_number}
          />
        </Box>
      </Flex>
      <Flex w="full" justify="space-between" my="20px">
        <Box w="full" mr="20px">
          <Input
            css={{
              '&::-webkit-calendar-picker-indicator': {
                background:
                  ' url(/assets/calendar.png) center/80% no-repeat',
              },
            }}
            cursor="pointer"
            // ref={dateRef}
            onClick={() => dateRef.current?.showPicker()}
            label="Data de nascimento"
            labelColor="#7F8B9F"
            size="sm"
            bg="transparent"
            color="#7F8B9F"
            type="date"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="dd/mm/aaaa"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('birth_date')}
            error={error.errors.birth_date}
          />
        </Box>
        <Box w="full">
          <Input
            label="Nome da mãe"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Lorem ipsum"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('mother_name')}
            error={error.errors.mother_name}
          />
        </Box>
      </Flex>
      <Flex w="full" justify="space-between" my="20px">
        {/* <Box w="full">
                    <Input
                      name=""
                      label="DDI"
                      labelColor="#7F8B9F"
                      size="sm"
                      w="full"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="00"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                    // {...register('key_type')}
                    // error={formState?.errors?.key_type}
                    />
                  </Box> */}
        <Box w="full" mr="20px">
          <Input
            label="DDD + Telefone"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="(00) 0000-0000"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('phone.number')}
            error={error.errors.phone?.number}
          />
        </Box>
        <Box w="full" >
          <Input
            label="Email"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            type="email"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="email@example.com"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('email')}
            error={error.errors.email}
          />
        </Box>
      </Flex>
      <Text>Documento de identificação:</Text>
      <Flex w="full" justify="space-between" my="20px">
        <Box w="full" mr="20px">
          <Input
            name=""
            label="Frente"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            type="file"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Nenhum documento adicionado"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            sx={{
              "::file-selector-button": {
                display: "none",
              },
            }}
          // {...register('key_type')}
          // error={formState?.errors?.key_type}
          />
        </Box>
        <Box w="full">
          <Input
            name=""
            label="Verso"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            type="file"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            sx={{
              "::file-selector-button": {
                display: "none",
              },
            }}
          // {...register('key_type')}
          // error={formState?.errors?.key_type}
          />
        </Box>
      </Flex>
      <Flex gap={5} justify="flex-end" py="20px">
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
            onClick={async () => {
              setCurrentTab((current: any) => current + 1);
              setPermissionTab((prev: any) => [...prev, 1]);

            }}
          >
            SALVAR
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}