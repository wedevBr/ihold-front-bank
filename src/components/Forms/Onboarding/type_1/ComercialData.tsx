import React, { useEffect, useRef, useState } from 'react';
import { Control, useFieldArray, UseFormSetValue } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  GridItem,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import {
  FormState,
  UseFormRegister,
  UseFormTrigger,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';
import { Input } from '~/components/input';
import { ISchemaCredentials } from '~/pages/onboarding/type-1';
import {
  GetLegalNature,
} from '~/services/hooks/useCreateAccount';
import { useQuery } from 'react-query';
import { setLocalStorage } from '~/utils/localStorageFormat';
import { AddMember } from '~/components';
import { api } from '~/services/api';

interface legalNatureProps {
  id: number;
  code: string;
  name: string;
  full_name: string;
}

interface IComercialDataProps {
  control: Control<ISchemaCredentials, any>;
  register: UseFormRegister<ISchemaCredentials>;
  error: FormState<ISchemaCredentials>;
  trigger: UseFormTrigger<ISchemaCredentials>;
  watch: UseFormWatch<ISchemaCredentials>;
  getValues: UseFormGetValues<ISchemaCredentials>;
  setValues: UseFormSetValue<ISchemaCredentials>;
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
  setSelectedValueID: (id: string) => void;
  valueIDSelected: string;
  token: string
  // setIncomeCnpjData: (searchCnpj: searchCNPJ) => void
}
export function FormComercialData({
  control,
  error,
  register,
  currentTab,
  watch,
  trigger,
  getValues,
  setCurrentTab,
  setPermissionTab,
  setSelectedValueID,
  setValues,
  valueIDSelected,
  token,
}: IComercialDataProps) {
  const dateRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState('1');
  const [searchCnpj, setSearchCnpj] = useState(false);
  const [loading, setLoading] = useState(true)
  const { data: legalNature } = useQuery('legal-nature', GetLegalNature, {
    staleTime: 1000 * 60, // 1 minute
  });
  const { fields, append, remove } = useFieldArray({
    name: 'ComercialData.hasMember',
    control,
  });


  async function search() {
    if (searchCnpj === true) {
      setLoading(true)
      try {
        const { data } = await api.get(
          `/data_query/${getValues('ComercialData.nif_number')}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setValues('ComercialData.register_name', data?.nome?.conteudo?.nome)
        setValues('ComercialData.social_name', data?.nome?.conteudo?.nome_fantasia)
        setValues('ComercialData.email', data?.emails?.conteudo[0]?.email)
        setValues('ComercialData.phone_number', data?.pesquisa_telefones?.conteudo?.outros[0]?.ddd.concat(data?.pesquisa_telefones?.conteudo?.outros[0]?.telefone))
        setValues('ComercialData.birth_date', data?.nome?.conteudo?.data_nascimento)
        setValues('ComercialData.cnae', data?.nome?.conteudo?.cnae_primaria.concat(' - ' + data?.nome?.conteudo?.descricao_cnae_primaria))
        setValues('CompanyAddress.address_line_one', data?.pesquisa_enderecos?.conteudo[0]?.logradouro + ' ' + data?.pesquisa_enderecos?.conteudo[0]?.endereco)
        setValues('CompanyAddress.zip_code', data?.pesquisa_enderecos?.conteudo[0]?.cep)
        setValues('CompanyAddress.neighborhood', data?.pesquisa_enderecos?.conteudo[0]?.bairro)
        setValues('CompanyAddress.building_number', data?.pesquisa_enderecos?.conteudo[0]?.numero)
        setValues('CompanyAddress.state', data?.pesquisa_enderecos?.conteudo[0]?.uf)
        setValues('CompanyAddress.city', data?.pesquisa_enderecos?.conteudo[0]?.cidade)
      } catch (error) {
      }
      setSearchCnpj(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    search()
  })

  return (
    <Box
      p="30px"
      bg="#FFFFFF"
      borderRadius="6px"
      borderTop="11px solid #00102A"
      mb="50px"
    >
      <Text fontSize="18px" fontWeight="600">
        Passo {currentTab + 1}/5
      </Text>
      <Text pt="10px" pb="30px" color="#7F8B9F">
        Queremos saber mais sobre o seu neg??cio. Nos informe alguns dados pra
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
            type="cnpj"
            fontSize="16px"
            border="0px"
            setSearchCnpj={setSearchCnpj}
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            isLoading={loading}
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
            label="Raz??o social"
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
            placeholder=""
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
          <Box w="full" mr="20px">
            <Input
              css={{
                '&::-webkit-calendar-picker-indicator': {
                  background: ' url(/assets/calendar.png) center/80% no-repeat',
                },
              }}
              cursor="pointer"
              // ref={dateRef}
              onClick={() => dateRef.current?.showPicker()}
              label="Data de funda????o"
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
              {...register('ComercialData.birth_date')}
              error={error.errors?.PersonalData?.birth_date}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Text color="#7F8B9F" w="full" size="sm" pb="8px">
              Natureza Jur??dica
            </Text>
            <Select
              size="sm"
              w="full"
              bg="transparent"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              defaultValue="1"
              {...register('ComercialData.business_type_id', {
                onChange: (e) => {
                  setSelectedValueID(e.target.value);
                  setSelected(e.target.value);
                },
              })}
            >
              <option value="1">MEI</option>
              <option value="2">EIRELI</option>
              <option value="3">EI</option>
            </Select>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Text color="#7F8B9F" w="full" size="sm" pb="8px">
              Tamanho da empreza
            </Text>
            <Select
              size="sm"
              w="full"
              bg="transparent"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              defaultValue="1"
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
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Text color="#7F8B9F" w="full" size="sm" pb="8px">
              Tipo de Empresa
            </Text>
            <Select
              size="sm"
              w="full"
              bg="transparent"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              defaultValue="MEI"
              {...register('ComercialData.legal_nature_id')}
            >
              {legalNature &&
                legalNature.data.map((item: legalNatureProps, key: number) => (
                  <option value={item.id} key={key}>
                    {item.full_name}
                  </option>
                ))}
            </Select>
          </Box>
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
            placeholder=""
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('ComercialData.cnae')}
            error={error.errors?.ComercialData?.cnae}
          />
        </GridItem>
      </SimpleGrid>
      {selected !== '1' && (
        <AddMember
          error={error}
          register={register}
          control={control}
          trigger={trigger}
        />
      )}
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
                'ComercialData.legal_nature_id',
                'ComercialData.site',
                'ComercialData.cnae',
                'ComercialData.annual_billing',
                'ComercialData.hasMember',
              ]);
              console.log(validation);
              if (validation) {
                setLocalStorage(
                  'ComercialDatalLocal',
                  getValues('ComercialData')
                );
                setLocalStorage('CompanyAddressLocal', getValues('CompanyAddress'));
                setCurrentTab((current: any) => current + 1);
                setPermissionTab((prev: any) => [...prev, 3]);
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
