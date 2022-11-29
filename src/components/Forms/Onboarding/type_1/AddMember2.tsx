import React, { useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  GridItem,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FormState, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { Input } from '~/components/input';
import { ISchemaCredentials } from '~/pages/onboarding/type-1';

interface IAddressProps {
  register: UseFormRegister<ISchemaCredentials>;
  error: FormState<ISchemaCredentials>;
}
export function AddMember2({
  error,
  register,
}: IAddressProps) {
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      pt="30px"
    >
      <Text fontSize="18px" fontWeight="600">
        Adicionar membro 2
      </Text>
      <SimpleGrid columns={4} gap={5} pt="40px">
        <GridItem colSpan={2}>
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
            placeholder=""
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('ComercialData.hasMember2.register_name')}
            error={error.errors?.ComercialData?.hasMember2?.register_name}
          />
        </GridItem>
        <GridItem colSpan={2}>
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
            {...register('ComercialData.hasMember2.nif_number')}
            error={error.errors?.ComercialData?.hasMember2?.nif_number}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            css={{
              '&::-webkit-calendar-picker-indicator': {
                background: ' url(/assets/calendar.png) center/80% no-repeat',
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
            {...register('ComercialData.hasMember2.birth_date')}
            error={error.errors?.ComercialData?.hasMember2?.birth_date}
          />
        </GridItem>
        <GridItem colSpan={2}>
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
            placeholder=""
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('ComercialData.hasMember2.mother_name')}
            error={error.errors?.ComercialData?.hasMember2?.mother_name}
          />
        </GridItem>
        <GridItem colSpan={2}>
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
            {...register('ComercialData.hasMember2.phone.number')}
            error={error.errors?.ComercialData?.hasMember2?.phone?.number}
          />
        </GridItem>
        <GridItem colSpan={2}>
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
            {...register('ComercialData.hasMember2.email')}
            error={error.errors?.ComercialData?.hasMember2?.email}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Text color="#7F8B9F" w="full" size="sm" pb="8px">
              Tipo de usuário
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
              {...register('ComercialData.hasMember2.member_type')}
            >
              <option value="OWNER">Dono</option>
              <option value="AGENT">Representante</option>
              <option value="PARTNER">Sócio</option>
            </Select>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            label="Percentual da empresa"
            labelColor="#7F8B9F"
            size="sm"
            w="full"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="100%"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('ComercialData.hasMember2.percentual')}
            error={error.errors?.ComercialData?.hasMember2?.percentual}
          />
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
            {...register('ComercialData.hasMember2.address.zip_code')}
            error={error.errors?.ComercialData?.hasMember2?.address?.zip_code}
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
            {...register('ComercialData.hasMember2.address.address_line_one')}
            error={error.errors?.ComercialData?.hasMember2?.address?.address_line_one}
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
            {...register('ComercialData.hasMember2.address.neighborhood')}
            error={error.errors?.ComercialData?.hasMember2?.address?.neighborhood}
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
            {...register('ComercialData.hasMember2.address.building_number')}
            error={error.errors?.ComercialData?.hasMember2?.address?.building_number}
          />
        </GridItem>
        <GridItem>
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
              {...register('ComercialData.hasMember2.address.state')}
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
            {...register('ComercialData.hasMember2.address.city')}
            error={error?.errors?.ComercialData?.hasMember2?.address?.city}
          />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
