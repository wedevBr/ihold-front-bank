import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  GridItem,
  HStack,
  Image,
  Link,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Input, Layout } from '~/components';
import { Icon } from '@iconify/react';
import { VerifyPassword } from '~/components/Verify/VerifyPassword';
import { useQuery } from 'react-query';
import { generateToken, generateTokenProps, infoPersonProps, personalData, postPersonalInfo } from '~/services/hooks/useCreateAccount';
import { getLocalStorage } from '~/utils/localStorageFormat';
import { AuthTwoFactors, GetAuthTwoFactors } from '~/services/hooks/useAuth';
import { parseCookies, setCookie } from 'nookies';
import { Address, FormAddress } from '~/components/Forms/Onboarding/type_1/Address'


type onBoardingProps = {
  infoPersonProps: {
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

    address: {
      id: number,
      is_mailing_address: boolean,
      address_line_one: string,
      address_line_two: string,
      building_number: number,
      complement: string,
      zip_code: string,
      neighborhood: string,
      city: string,
      state: string,
      country: string
    },
    phone: {
      number: string
    }
  }

  infoCompanyProps: {
    nif_number: string,
    register_name: string,
    social_name: string,
    phone_number: string,
    email: string,
    size: 'MEI' | 'ME' | 'EPP' | 'SMALL' | 'MEDIUM' | 'LARGE',
    business_type_id: string,
    legal_nature_id: 0,
    site: string,
    cnae: string,
    joint_stock: 0,
    annual_billing: 0,
    address: {
      id: number,
      is_mailing_address: boolean,
      address_line_one: string,
      address_line_two: string,
      building_number: number,
      complement: string,
      zip_code: string,
      neighborhood: string,
      city: string,
      state: string,
      country: string
    }
  }
  passwordProps: {
    name: string,
    nif_number: string,
    cell_phone: string,
    email: string,
    password: string,
    password_confirmation: string,
    user_identifier: string,
    client_id: string,
    client_secret: string
  }
}


type ErrorMessage = {
  message?: any;
  error?: boolean;
};

export default function OnBoarding() {
  const [currentTab, setCurrentTab] = useState(0);
  const [permissionTab, setPermissionTab] = useState([0]);
  const [code, setCode] = useState('');
  const dateRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState, trigger, watch, setValue, getValues } = useForm<onBoardingProps>({
    // resolver: yupResolver(onboardingSchema),
    // mode: 'onBlur',
  });
  const token = getLocalStorage('clientToken')
  const steps = [
    {
      title: 'Dados Pessoais',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'bx:user',
      step: 0,
    },
    {
      title: 'Endereço Pessoal',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'akar-icons:location',
      step: 1,
    },
    {
      title: 'Autenticação',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'lucide:user-check',
      step: 2,
    },
    {
      title: 'Dados Comerciais',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'carbon:enterprise',
      step: 3,
    },
    {
      title: 'ENDEREÇO COMERCIAL',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'bx:map',
      step: 4,
    },
    {
      title: 'DOCUMENTAÇÃO',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'ep:document',
      step: 5,
    },
    {
      title: 'SENHA',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'gg:lock',
      step: 6,
    },
  ];
  // console.log(getLocalStorage('clientToken'))
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(10);

  async function handleAuthTwoFactors() {
    const authCode = {
      code,
    };
    try {
      if (code?.length === 6) {
        setLoading(true);
        const response = await AuthTwoFactors(authCode);
        if (response) {
          setCookie(undefined, '@two-factor', 'TRUE', {
            maxAge: 60 * 60 * 1, // 1 hour
            path: '/',
          });
        }
      } else {
        setError({ message: 'Code less than 6 digits!', error: true });
      }
    } catch (error: any) {
      if ([401, 400, 500, 422].includes(error?.response?.status)) {
        setError({ message: error?.response?.data?.message, error: true });
      }
    } finally {
      setLoading(false);
    }
  }


  function ResendCodeAuthFactor() {
    GetAuthTwoFactors().then(() => {
      setCounter(10);
    });
  }
  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  async function SendPersonalInfo() {
    setValue('infoPersonProps.document_type', 'CPF')
    setValue('infoPersonProps.member_type', 'OWNER')
    setValue('infoPersonProps.pep', true)
    setValue('infoPersonProps.inform', true)
    const personalData = getValues('infoPersonProps')
    if (personalData && token) {
      try {
        const response = await postPersonalInfo({ personalData: personalData, token: token.replace(/["]/g, '') })
      } catch (err: any) {
        console.log(err)
      }
    }
  };

  console.log(watch('infoCompanyProps.address.city'))
  return (
    <Box bg="#F0F0F3" h="full" minH="100vh">
      <Box h="full" w="full" maxW="1200px" mx="auto">
        <Flex justifyContent="space-between" w="full" align="center" py="30px">
          <Image
            src="/assets/logo-preta.svg"
            alt="Logo_iHold"
            width="150px"
            objectFit="contain"
          />
          <Text>INTERNET BANKING</Text>
        </Flex>
        <Tabs
          variant="unstyled"
          flexDir="row"
          display="flex"
          mt="30px"
          index={currentTab}
          onChange={async (tab) => {
            if (currentTab === 0) {
              setCurrentTab(tab);
            }
            else if (currentTab === 1) {
              setCurrentTab(tab);
            }
            else if (currentTab === 2) {
              setCurrentTab(tab);
            }
            else if (currentTab === 3) {
              setCurrentTab(tab);
            }
            else if (currentTab === 4) {
              setCurrentTab(tab);
            }
            else if (currentTab === 5) {
              setCurrentTab(tab);
            }
            else if (currentTab === 6) {
              setCurrentTab(tab);
            }
          }}
        >
          <TabList flexDir="column" w="350px" mt="20px">
            {steps.map((item, key) => (
              <Box key={key} w="full">
                <Tab p="0" w="full" isDisabled={!permissionTab.includes(key)} onClick={() => setCurrentTab(item.step)}>
                  <Flex align="center" justify="space-between" w="full">
                    <Box mr="5px">
                      <Text
                        textTransform="uppercase"
                        fontFamily="Lato"
                        fontStyle="normal"
                        fontWeight="700"
                        fontSize="16px"
                        textAlign="right"
                      >
                        {item.title}
                      </Text>
                      <Text mt="0">{item.subTitle}</Text>
                    </Box>
                    <Flex
                      h="45px"
                      w="45px"
                      transition="all linear .25s"
                      bg={
                        !permissionTab.includes(key)
                          ? '#ccc'
                          : currentTab === key
                            ? '#2E4EFF'
                            : '#21C6DE'
                      }
                      align="center"
                      justify="center"
                      p="10px"
                      borderRadius="50px"
                    >
                      <Icon icon={item.iconName} width={25} color="#fff" />
                    </Flex>
                  </Flex>
                </Tab>
                {steps.length - 1 !== key && (
                  <Flex w="full" justify="right">
                    <Flex w="45px" align="center" justify="center" h="35px">
                      <Box
                        my="3px"
                        h="35px"
                        w="2.5px"
                        bg={
                          !permissionTab.includes(key + 1)
                            ? 'transparent'
                            : '#21C6DE'
                        }
                      />
                    </Flex>
                  </Flex>
                )}
              </Box>
            ))}
          </TabList>
          <TabPanels py="0">
            <TabPanel py="0">
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
                      {...register('infoPersonProps.register_name')}
                      error={formState?.errors?.infoPersonProps?.register_name}
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
                      {...register('infoPersonProps.nif_number')}
                      error={formState?.errors?.infoPersonProps?.nif_number}
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
                      {...register('infoPersonProps.birth_date')}
                      error={formState?.errors?.infoPersonProps?.birth_date}
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
                      {...register('infoPersonProps.mother_name')}
                      error={formState?.errors?.infoPersonProps?.mother_name}
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
                      {...register('infoPersonProps.phone.number')}
                      error={formState?.errors?.infoPersonProps?.phone?.number}
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
                      {...register('infoPersonProps.email')}
                      error={formState?.errors?.infoPersonProps?.email}
                    />
                  </Box>
                </Flex>
                <Text>Documento de identificação:</Text>
                {/* <Flex w="full" justify="space-between" my="20px">
                  <RadioGroup defaultValue="1">
                    <Flex w="full">
                      <Flex
                        align="center"
                        boxShadow="md"
                        h="50px"
                        borderRadius="4px"
                        mr="10px"
                      >
                        <Radio value="1" p="20px">
                          RG
                        </Radio>
                      </Flex>
                      <Flex
                        align="center"
                        boxShadow="md"
                        h="50px"
                        borderRadius="4px"
                      >
                        <Radio value="2" p="20px">
                          CNH
                        </Radio>
                      </Flex>
                    </Flex>
                  </RadioGroup>
                </Flex> */}
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
                        setCurrentTab((current) => current + 1);
                        setPermissionTab((prev) => [...prev, 1]);

                      }}
                    >
                      SALVAR
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </TabPanel>
            <TabPanel py="0">
              <Box
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/7</Text>
                <Text pt="10px" pb="30px" color="#7F8B9F">Para começar, me fale um pouco mais sobre você</Text>
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
                      {...register('infoPersonProps.address.zip_code')}
                      error={formState?.errors?.infoPersonProps?.address?.zip_code}
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
                      {...register('infoPersonProps.address.address_line_one')}
                      error={formState?.errors?.infoPersonProps?.address?.address_line_one}
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
                      {...register('infoPersonProps.address.neighborhood')}
                      error={formState?.errors?.infoPersonProps?.address?.neighborhood}
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
                      {...register('infoPersonProps.address.building_number')}
                      error={formState?.errors?.infoPersonProps?.address?.building_number}
                    />
                  </GridItem>

                  {/* <GridItem colSpan={2}>
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
                      error={formState?.errors?.complement}
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
                      error={formState?.errors?.country}
                    />
                  </GridItem> */}
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
                      {...register('infoPersonProps.address.state')}
                      error={formState?.errors?.infoPersonProps?.address?.state}
                    />
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
                      placeholder="Lorem"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('infoPersonProps.address.city')}
                      error={formState?.errors?.infoPersonProps?.address?.city}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Input
                      name=""
                      label="Comprovante de residência"
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
                      borderRadius="40px"
                      _hover={{ background: '#2E4EFF', color: '#FFF' }}
                      onClick={async () => {
                        setCurrentTab((current) => current + 1);
                        setPermissionTab((prev) => [...prev, 2]);
                        SendPersonalInfo()
                      }}
                    >
                      SALVAR
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </TabPanel>
            <TabPanel py="0">
              <FormAddress currentTab={currentTab} error={formState} register={register} setCurrentTab={setCurrentTab} setPermissionTab={setPermissionTab} />
            </TabPanel>
            <TabPanel py="0">
              <Box
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
                mb="50px"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/7</Text>
                <Text pt="10px" pb="30px" color="#7F8B9F">Queremos saber mais sobre o seu negócio. Nos informe alguns dados pra identificar a sua empresa</Text>
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
                      {...register('infoCompanyProps.nif_number')}
                      error={formState?.errors?.infoCompanyProps?.nif_number}
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
                      {...register('infoCompanyProps.register_name')}
                      error={formState?.errors?.infoCompanyProps?.register_name}
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
                      {...register('infoCompanyProps.social_name')}
                      error={formState?.errors?.infoCompanyProps?.social_name}
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
                      {...register('infoCompanyProps.email')}
                      error={formState?.errors?.infoCompanyProps?.email}
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
                      {...register('infoCompanyProps.site')}
                      error={formState?.errors?.infoCompanyProps?.site}
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
                      {...register('infoCompanyProps.phone_number')}
                      error={formState?.errors?.infoCompanyProps?.phone_number}
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
                      {...register('infoCompanyProps.business_type_id')}
                      error={formState?.errors?.infoCompanyProps?.business_type_id}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Box>
                      <Text color="#7F8B9F" w="full" size="sm" pb="8px">Porte da empresa</Text>
                      <Select
                        size="sm"
                        w="full"
                        bg="transparent"
                        border="0px"
                        borderBottom="1px solid #7F8B9F"
                        defaultValue='MEI' {...register('infoCompanyProps.size')} >
                        <option value='MEI'>MEI</option>
                        <option value='ME'>ME</option>
                        <option value='EPP'>EPP</option>
                        <option value='SMALL'>SMALL</option>
                        <option value='MEDIUM'>MEDIUM</option>
                        <option value='LARGE'>LARGE</option>
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
                      {...register('infoCompanyProps.legal_nature_id')}
                      error={formState?.errors?.infoCompanyProps?.legal_nature_id}
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
                      {...register('infoCompanyProps.annual_billing')}
                      error={formState?.errors?.infoCompanyProps?.annual_billing}
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
                      {...register('infoCompanyProps.cnae')}
                      error={formState?.errors?.infoCompanyProps?.cnae}
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
                        setCurrentTab((current) => current + 1);
                        setPermissionTab((prev) => [...prev, 4]);

                      }}
                    >
                      SALVAR
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </TabPanel>
            <TabPanel py="0">
              <Box
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/7</Text>
                <Text pt="10px" pb="30px" color="#7F8B9F">Queremos saber mais sobre o seu negócio. Nos informe alguns dados pra identificar a sua empresa</Text>
                <SimpleGrid columns={4} gap={5}>
                  <GridItem colSpan={2} >
                    <Text color="#7F8B9F" w="full" size="sm" pb="8px">Endereço da empresa</Text>
                    <Checkbox defaultChecked textColor="#7F8B9F" {...register('infoCompanyProps.address.is_mailing_address')}>Também é meu endereço físico</Checkbox>
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
                      {...register('infoCompanyProps.address.zip_code')}
                      error={formState?.errors?.infoCompanyProps?.address?.zip_code}
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
                      {...register('infoCompanyProps.address.address_line_one')}
                      error={formState?.errors?.infoCompanyProps?.address?.address_line_one}
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
                      {...register('infoCompanyProps.address.building_number')}
                      error={formState?.errors?.infoCompanyProps?.address?.building_number}
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
                      {...register('infoCompanyProps.address.neighborhood')}
                      error={formState?.errors?.infoCompanyProps?.address?.neighborhood}
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
                      {...register('infoCompanyProps.address.complement')}
                      error={formState?.errors?.infoCompanyProps?.address?.complement}
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
                      {...register('infoCompanyProps.address.country')}
                      error={formState?.errors?.infoCompanyProps?.address?.country}
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
                      {...register('infoCompanyProps.address.state')}
                      error={formState?.errors?.infoCompanyProps?.address?.state}
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
                      {...register('infoCompanyProps.address.city')}
                      error={formState?.errors?.infoCompanyProps?.address?.city}
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
                        "::file-selector-button": {
                          display: "none",
                        },
                      }}
                    // {...register('key_type')}
                    // error={formState?.errors?.key_type}
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
                        setCurrentTab((current) => current + 1);
                        setPermissionTab((prev) => [...prev, 5]);
                      }}
                    >
                      SALVAR
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </TabPanel>
            {/*<TabPanel py="0">
              <Box
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/7</Text>
                <Text pt="10px" pb="30px" color="#7F8B9F">Agora, precisamos de alguns documentos para validação da sua empresa</Text>
                <SimpleGrid columns={4} gap={5}>
                  <GridItem colSpan={2}>
                    <Input
                      name=""
                      label="Balanço patrimonial"
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
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Input
                      name=""
                      label="Faturamento"
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
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Input
                      name=""
                      label="Demonstração do Resultado do Exercício (DRE)"
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
                        setCurrentTab((current) => current + 1);
                        setPermissionTab((prev) => [...prev, 6]);
                      }
                      }
                    >
                      SALVAR
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </TabPanel> */}
            {/* <TabPanel py="0">
              <Box
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/7</Text>
                <Text pt="10px" pb="30px" color="#7F8B9F">Agora que a gente já te conhece, só falta você cadastrar uma boa senha, pra garantir a segurança dos seus dados</Text>
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
                    error={formState?.errors?.password}
                  />
                  <VerifyPassword verify={watch('password')} />
                </Box>
                <Flex gap={2} pt="20px">
                  <Checkbox size='lg' />
                  <Text color="#7F8B9F">Eu concordo com os <Link color="#2E4EFF">Termos de Serviço</Link> e aceito o <Link color="#2E4EFF">Contrato de Credenciamento</Link></Text>
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
                        setCurrentTab((current) => current + 1);
                        setPermissionTab((prev) => [...prev, 3]);
                      }}
                    >
                      SALVAR
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </TabPanel> */}
            {/* <TabPanel py="0">
              <Box
                p="20px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text>{currentTab + 1}/8</Text>
              </Box>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Box >
    </Box >
  );
}
