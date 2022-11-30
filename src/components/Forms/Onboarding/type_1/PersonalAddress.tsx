import React from 'react';
import {
  Box,
  Button,
  Flex,
  GridItem,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FormState, UseFormGetValues, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { Input } from '~/components/input';
import { ISchemaCredentials } from '~/pages/onboarding/type-1';
import { setLocalStorage } from '~/utils/localStorageFormat';

interface IAddressProps {
  register: UseFormRegister<ISchemaCredentials>;
  trigger: UseFormTrigger<ISchemaCredentials>;
  getValues: UseFormGetValues<ISchemaCredentials>;
  error: FormState<ISchemaCredentials>;
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
}
export function FormPersonalAddress({
  error,
  register,
  currentTab,
  setCurrentTab,
  getValues,
  trigger,
  setPermissionTab,
}: IAddressProps) {
  return (
    <Box
      p="30px"
      bg="#FFFFFF
"
      borderRadius="6px"
      borderTop="11px solid #00102A"
    >
      <Text fontSize="18px" fontWeight="600">
        Passo {currentTab + 1}/5
      </Text>
      <Text pt="10px" pb="30px" color="#7F8B9F">
        Para começar, me fale um pouco mais sobre você
      </Text>
      <SimpleGrid columns={4} gap={5}>
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
            {...register('AddressPersonal.zip_code')}
            error={error.errors?.AddressPersonal?.zip_code}
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
            {...register('AddressPersonal.address_line_one')}
            error={error.errors?.AddressPersonal?.address_line_one}
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
            {...register('AddressPersonal.neighborhood')}
            error={error.errors?.AddressPersonal?.neighborhood}
          />
        </GridItem>
        <GridItem colSpan={2}>
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
            {...register('AddressPersonal.building_number')}
            error={error.errors?.AddressPersonal?.building_number}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Box>
            <Text color="#7F8B9F" w="full" size="sm" pb="8px">
              Estado
            </Text>
            <Select
              size="sm"
              w="full"
              bg="transparent"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('AddressPersonal.state')}
            >
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceara</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </Select>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
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
            placeholder=""
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('AddressPersonal.city')}
            error={error?.errors?.AddressPersonal?.city}
          />
        </GridItem>
        {/* <GridItem colSpan={2}>
          <Input
            label="Comprovante de residência"
            labelColor="#7F8B9F"
            name=""
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
          // {...register('key_type')}
          // error={error?.errors?.key_type}
          />
        </GridItem> */}
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
            borderRadius="40px"
            _hover={{
              background: '#2E4EFF',
              color: '#FFF',
            }}
            onClick={async () => {
              const validation = await trigger([
                'AddressPersonal.address_line_one',
                'AddressPersonal.building_number',
                'AddressPersonal.zip_code',
                'AddressPersonal.neighborhood',
                'AddressPersonal.city',
                'AddressPersonal.state',
              ]);
              console.log(validation);
              if (validation) {
                setLocalStorage('AddressPersonalLocal', getValues('AddressPersonal'));
                setCurrentTab((current: any) => current + 1);
                setPermissionTab((prev: any) => [...prev, 2]);
              }
            }}
          >
            SALVAR
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
