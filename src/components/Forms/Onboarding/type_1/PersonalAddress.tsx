import React from 'react';
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
export interface Address {
  id: number;
  is_mailing_address: boolean;
  address_line_one: string;
  address_line_two: string;
  building_number: number;
  complement: string;
  zip_code: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  key_type: FileProps | string;
}
interface IAddressProps {
  // register: UseFormRegister<Address>;
  // error: FormState<Address>;
  register: any;
  error: any;
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
}
export function FormPersonalAddress({
  error,
  register,
  currentTab,
  setCurrentTab,
  setPermissionTab,
}: IAddressProps) {
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
      <SimpleGrid columns={4} gap={5}>
        <GridItem colSpan={2}>
          <Input
            label="CEP"
            labelColor="#7F8B9F
"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F
"
            borderRadius={0}
            placeholder="00000-000"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('zip_code')}
            error={error.errors.zip_code}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Logradouro"
            labelColor="#7F8B9F
"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F
"
            borderRadius={0}
            placeholder="Avenida"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('address_line_one')}
            error={error.errors.address_line_one}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Bairro"
            labelColor="#7F8B9F
"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F
"
            borderRadius={0}
            placeholder="Bairro"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('neighborhood')}
            error={error.errors?.neighborhood}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Número"
            labelColor="#7F8B9F
"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F
"
            borderRadius={0}
            placeholder="0000"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('building_number')}
            error={error.errors?.building_number}
          />
        </GridItem>
                
        <GridItem colSpan={1}>
          <Input
            label="Estado"
            labelColor="#7F8B9F
"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F
"
            borderRadius={0}
            placeholder="Lorem"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('state')}
            error={error.errors?.state}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            label="Cidade"
            labelColor="#7F8B9F
"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F
"
            borderRadius={0}
            placeholder="Lorem"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('infoCompanyProps.address.city')}
            // error={error?.errors?.infoCompanyProps?.address?.city}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Comprovante de residência"
            labelColor="#7F8B9F
"
            size="sm"
            w="full"
            type="file"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F
"
            borderRadius={0}
            placeholder="Nenhum documento adicionado"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            sx={{
              '::file-selector-button': {
                display: 'none',
              },
            }}
            {...register('key_type')}
            error={error?.errors?.key_type}
          />
        </GridItem>
      </SimpleGrid>
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
              setPermissionTab((prev: any) => [...prev, 2]);
            }}
          >
            SALVAR
          </Button>
        </Box>
              
      </Flex>
          
    </Box>
  );
}
