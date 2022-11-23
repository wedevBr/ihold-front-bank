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
import { FormState, UseFormRegister, FieldValues, UseFormTrigger } from 'react-hook-form';
import { Input } from '~/components/input';
import { ISchemaCredentials } from '~/pages/onboarding/type-1';

interface IComercialDataProps {
  register: UseFormRegister<ISchemaCredentials>;
  error: FormState<ISchemaCredentials>;
  trigger: UseFormTrigger<ISchemaCredentials>;
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
}
export function FormComercialData({
  error,
  register,
  currentTab,
  trigger,
  setCurrentTab,
  setPermissionTab,
}: IComercialDataProps) {
  return (
    <Box
      p="30px"
      bg="#FFFFFF"
      borderRadius="6px"
      borderTop="11px solid #00102A"
      mb="50px"
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
          <Input
            label="CNPJ"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="00000000000000/0000"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('ComercialData.nif_number')}
            error={error.errors?.ComercialData?.nif_number}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Razão social"
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
            {...register('ComercialData.register_name')}
            error={error.errors?.ComercialData?.register_name}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Nome fantasia"
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
            {...register('ComercialData.social_name')}
            error={error.errors?.ComercialData?.social_name}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="E-mail"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="mail@example.com"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('ComercialData.email')}
            error={error.errors?.ComercialData?.email}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Site"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="www.site.com.br"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('ComercialData.site')}
            error={error.errors?.ComercialData?.site}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="DDD + Telefone "
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
            {...register('ComercialData.phone_number')}
            error={error.errors?.ComercialData?.phone_number}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Tipo de empresa"
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
            {...register('ComercialData.business_type_id')}
            error={error.errors?.ComercialData?.business_type_id}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Text color="#7F8B9F" w="full" size="sm" pb="8px">
              Porte da empresa
            </Text>
            <Select
              size="sm"
              w="full"
              bg="transparent"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              defaultValue="MEI"
              {...register('ComercialData.size')}
            >
              <option value="MEI">MEI</option>
              <option value="ME">ME</option>
              <option value="EPP">EPP</option>
              <option value="SMALL">SMALL</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LARGE">LARGE</option>
            </Select>
          </Box>
          {/* <Input
                      label="Porte da empresa"
                      labelColor="#7F8B9F"
                      size="sm"
                      w="full"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="MEI"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('compan')}
                      error={formState?.errors?.address}
                    /> */}
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Natureza jurídica"
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
            {...register('ComercialData.legal_nature_id')}
            error={error.errors?.ComercialData?.legal_nature_id}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Faturamento anual"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="R$ 0000,00"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('ComercialData.annual_billing')}
            error={error.errors?.ComercialData?.annual_billing}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <Input
            label="CNAE principal"
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
            {...register('ComercialData.cnae')}
            error={error.errors?.ComercialData?.cnae}
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
              const validation = await trigger([
                'ComercialData.nif_number',
                'ComercialData.register_name',
                'ComercialData.social_name',
                'ComercialData.phone_number',
                'ComercialData.email',
                'ComercialData.size',
                'ComercialData.business_type_id',
                'ComercialData.legal_nature_id',
                'ComercialData.site',
                'ComercialData.cnae',
                'ComercialData.annual_billing'
              ]);
              console.log(validation);
              if (validation) {
                setCurrentTab((current: any) => current + 1);
                setPermissionTab((prev: any) => [...prev, 4]);
              }
            }}
          >
            SALVAR
          </Button>
        </Box>
      </Flex >
    </Box >
  );
}
