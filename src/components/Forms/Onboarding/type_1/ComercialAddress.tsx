import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { Input } from '~/components/input';

interface ICompanyAddressProps {
  // register: UseFormRegister<Address>;
  // error: FormState<Address>;
  register: any;
  error: any;
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
}
export function FormCompanyAddress({
  error,
  register,
  currentTab,
  setCurrentTab,
  setPermissionTab,
}: ICompanyAddressProps) {
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
        Queremos saber mais sobre o seu negócio. Nos informe alguns dados pra
        identificar a sua empresa
      </Text>
      <SimpleGrid columns={4} gap={5}>
        <GridItem colSpan={2}>
          <Text color="#7F8B9F" w="full" size="sm" pb="8px">
            Endereço da empresa
          </Text>
          <Checkbox
            defaultChecked
            textColor="#7F8B9F"
            {...register('is_mailing_address')}
          >
            Também é meu endereço físico
          </Checkbox>
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="CEP"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
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
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Avenida"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('address_line_one')}
            error={error.errors.address_line_one}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            label="Número"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="0000"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('building_number')}
            error={error.errors.building_number}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Bairro"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Bairro"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('neighborhood')}
            error={error.errors.neighborhood}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Complemento"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Complemento"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('complement')}
            error={error.errors.complement}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            label="País"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Lorem"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('country')}
            error={error.errors.country}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            label="Estado"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Lorem"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('state')}
            error={error.errors.state}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Cidade"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="Lorem"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('city')}
            error={error.errors.city}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            name=""
            label="Comprovante de endereço da sede"
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
              '::file-selector-button': {
                display: 'none',
              },
            }}
            {...register('proof_of_residency')}
            error={error.errors.proof_of_residency}
          />
        </GridItem>
      </SimpleGrid>
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
            onClick={async () => {
              setCurrentTab((current: any) => current + 1);
              setPermissionTab((prev: any) => [...prev, 5]);
            }}
          >
            SALVAR
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
