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
import {
  FormAuthentication,
  FormComercialData,
  FormCompanyAddress,
  FormDocuments,
  FormPassword,
  FormPersonalAddress,
  FormPersonalData,
  Input,
  Layout,
} from '~/components';
import { Icon } from '@iconify/react';
import { VerifyPassword } from '~/components/Verify/VerifyPassword';
import { useQuery } from 'react-query';
import {
  generateToken,
  generateTokenProps,
  personalData,
  postComercialInfo,
  postPersonalInfo,
} from '~/services/hooks/useCreateAccount';
import { getLocalStorage } from '~/utils/localStorageFormat';
import { AuthTwoFactors, GetAuthTwoFactors } from '~/services/hooks/useAuth';
import { parseCookies, setCookie } from 'nookies';
import { Address, Auth, Client, ComercialData, ComercialProps, CompanyAddress, Documents, Password } from '~/types/onBoarding';

export interface ISchemaCredentials {
  PersonalData: Client;
  AddressPersonal: Address;
  // Authentication: Auth;
  ComercialData: ComercialData;
  CompanyAddress: CompanyAddress;
  // Documents: Documents;
  Password: Password;
}

type ErrorMessage = {
  message?: any;
  error?: boolean;
};

const onboardingSchema = yup.object().shape({
  PersonalData: yup.object().shape({
    register_name: yup.string().required('Nome Obrigatório'),
    nif_number: yup.string().required('CPF Obrigatório'),
    birth_date: yup.string().required('Data de Nascimento Obrigatório'),
    mother_name: yup.string().required('Nome Obrigatório'),
    email: yup.string().required('Email Obrigatório'),
    phone: yup.object().shape({
      number: yup.string().required('Telefone Obrigatório'),
    })
  }),
  AddressPersonal: yup.object().shape({
    address_line_one: yup.string().required('Endereço Obrigatório'),
    building_number: yup.string().required('Número Obrigatório'),
    zip_code: yup.string().required('CEP Obrigatório'),
    neighborhood: yup.string().required('Bairro Obrigatório'),
    city: yup.string().required('Cidade Obrigatória'),
    state: yup.string().required('Estado Obrigatório'),
  }),
  ComercialData: yup.object().shape({
    nif_number: yup.string().required('CNPJ Obrigatório'),
    register_name: yup.string().required('Razão social Obrigatória'),
    social_name: yup.string().required('Nome Fantasia Obrigatório'),
    phone_number: yup.string().required('Telefone Obrigatório'),
    email: yup.string().required('Email Obrigatório'),
    size: yup.string().required('Porte da Empresa Obrigatório'),
    business_type_id: yup.string().required('Tipo Obrigatório'),
    legal_nature_id: yup.string().required('Natureza Jurídica Obrigatória'),
    site: yup.string().required('Site Obrigatório'),
    cnae: yup.string().required('CNAE Obrigatório'),
    annual_billing: yup.string().required('Faturamento Anual Obrigatório'),
  }),
  CompanyAddress: yup.object().shape({
    address_line_one: yup.string().required('Endereço Obrigatório'),
    building_number: yup.string().required('Número Obrigatório'),
    zip_code: yup.number().required('CEP Obrigatório'),
    neighborhood: yup.string().required('Bairro Obrigatório'),
    city: yup.string().required('Cidade Obrigatória'),
    state: yup.string().required('Estado Obrigatório'),
  }),
  Password: yup.object().shape({
    password: yup.string().required('').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      ""
    ),
  })
})

export default function OnBoarding() {
  const [currentTab, setCurrentTab] = useState(0);
  const [permissionTab, setPermissionTab] = useState([0]);
  const [code, setCode] = useState('');
  const dateRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState,
    trigger,
    watch,
    setValue,
    getValues,
  } = useForm<ISchemaCredentials>({
    resolver: yupResolver(onboardingSchema),
    // mode: 'onBlur',
  });
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
  const [termsAndPolicy, setTermsAndPolicy] = useState(false)
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

  async function SendInfo() {
    console.log("AQUI")
    const token = getLocalStorage('clientToken');
    const comercialInfo = getValues('ComercialData');
    const comercialAddress = getValues('CompanyAddress')
    try {
      if (token) {
        const response = await postComercialInfo({
          comercialData: {
            social_name: comercialInfo.social_name,
            annual_billing: comercialInfo.annual_billing,
            // business_type_id: comercialInfo.business_type_id,
            cnae: comercialInfo.cnae,
            email: comercialInfo.email,
            joint_stock: comercialInfo.joint_stock,
            legal_nature_id: comercialInfo.legal_nature_id,
            nif_number: comercialInfo.nif_number,
            phone_number: comercialInfo.phone_number,
            register_name: comercialInfo.register_name,
            site: comercialInfo.site,
            // size: comercialInfo.size,
            address: comercialAddress
          },
          token: token.replace(/["]/g, ''),
        });
        console.log(response)
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  // console.log(watch('register_name'));
  const result = async () => {
    return await trigger('PersonalData.register_name');
  };
  console.log(currentTab);

  return (
    <Box bg="#F0F0F3" h="full" minH="100vh" >
      <Box h="full" w="full" maxW="1200px" mx="auto" >
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
            const result = getValues('PersonalData.register_name');
            if (currentTab === 0 && result === '') {
              setCurrentTab(tab);
            } else if (currentTab === 1 && result === '') {
              setCurrentTab(tab);
            } else if (currentTab === 2) {
              setCurrentTab(tab);
            } else if (currentTab === 3) {
              setCurrentTab(tab);
            } else if (currentTab === 4) {
              setCurrentTab(tab);
            } else if (currentTab === 5) {
              setCurrentTab(tab);
            } else if (currentTab === 6) {
              setCurrentTab(tab);
            } else if (currentTab === 7) {
              setCurrentTab(tab);
            }
          }}
        >
          <TabList flexDir="column" w="350px" mt="20px">
            {steps.map((item, key) => (
              <Box key={key} w="full">
                <Tab
                  p="0"
                  w="full"
                  isDisabled={!permissionTab.includes(key)}
                  onClick={() => setCurrentTab(item.step)}
                >
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
          <TabPanels>
            <TabPanel>
              <FormPersonalData
                currentTab={currentTab}
                error={formState}
                register={register}
                trigger={trigger}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel>
            <TabPanel>
              <FormPersonalAddress
                currentTab={currentTab}
                error={formState}
                register={register}
                trigger={trigger}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel>
            <TabPanel>
              <FormAuthentication
                currentTab={currentTab}
                error={formState}
                register={register}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel>
            <TabPanel>
              <FormComercialData
                currentTab={currentTab}
                error={formState}
                register={register}
                trigger={trigger}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel>
            <TabPanel>
              <FormCompanyAddress
                currentTab={currentTab}
                error={formState}
                register={register}
                trigger={trigger}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel>
            <TabPanel>
              <FormDocuments
                currentTab={currentTab}
                error={formState}
                register={register}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel>
            <TabPanel>
              <FormPassword
                watch={watch}
                currentTab={currentTab}
                error={formState}
                register={register}
                trigger={trigger}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel>
            <TabPanel>
              <Box
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600">
                  Revisar Dados
                </Text>
                <Flex pt="30px" borderBottom="1px" borderColor="#7F8B9F" justify="space-between">
                  <Text color="#7F8B9F">
                    Dados Pessoais
                  </Text>
                  <Center cursor="pointer" onClick={() => setCurrentTab(0)}>
                    <Icon color="#21C6DE" icon="material-symbols:edit" />
                    <Text color="#21C6DE">
                      Editar
                    </Text>
                  </Center>
                </Flex>
                <Box pt="10px" >
                  <SimpleGrid columns={2} gap={2}>
                    <Text>Nome: {watch('PersonalData.register_name')}</Text>
                    <Text>CPF: {watch('PersonalData.nif_number')}</Text>
                    <Text>Data de Nascimento: {moment(watch('PersonalData.birth_date')).locale('pt-br').format('L')}</Text>
                    <Text>Nome da Mãe: {watch('PersonalData.mother_name')}</Text>
                    <Text>Email: {watch('PersonalData.email')}</Text>
                    <Text>Telefone: {watch('PersonalData.phone.number')}</Text>
                  </SimpleGrid>
                </Box>
                <Flex pt="20px" borderBottom="1px" borderColor="#7F8B9F" justify="space-between">
                  <Text color="#7F8B9F">
                    Endereço Pessoal
                  </Text>
                  <Center cursor="pointer" onClick={() => setCurrentTab(0)}>
                    <Icon color="#21C6DE" icon="material-symbols:edit" />
                    <Text color="#21C6DE">
                      Editar
                    </Text>
                  </Center>
                </Flex>
                <Box pt="10px" >
                  <SimpleGrid columns={2} gap={2}>
                    <Text>CEP: {watch('AddressPersonal.zip_code')}</Text>
                    <Text>Logradouro: {watch('AddressPersonal.address_line_one')}</Text>
                    <Text>Bairro: {moment(watch('AddressPersonal.neighborhood')).locale('pt-br').format('L')}</Text>
                    <Text>Número: {watch('AddressPersonal.building_number')}</Text>
                    <Text>Estado: {watch('AddressPersonal.state')}</Text>
                    <Text>Cidade: {watch('AddressPersonal.city')}</Text>
                  </SimpleGrid>
                </Box>
                <Flex pt="20px" borderBottom="1px" borderColor="#7F8B9F" justify="space-between">
                  <Text color="#7F8B9F">
                    Dados Comerciais
                  </Text>
                  <Center cursor="pointer" onClick={() => setCurrentTab(0)}>
                    <Icon color="#21C6DE" icon="material-symbols:edit" />
                    <Text color="#21C6DE">
                      Editar
                    </Text>
                  </Center>
                </Flex>
                <Box pt="10px" >
                  <SimpleGrid columns={2} gap={2}>
                    <Text>CNPJ: {watch('ComercialData.nif_number')}</Text>
                    <Text>Razão Social: {watch('ComercialData.register_name')}</Text>
                    <Text>Nome Fantasia: {watch('ComercialData.social_name')}</Text>
                    <Text>Email: {watch('ComercialData.email')}</Text>
                    <Text>Telefone: {watch('ComercialData.phone_number')}</Text>
                    <Text>Site: {watch('ComercialData.site')}</Text>
                    <Text>Tipo de Empresa: {watch('ComercialData.business_type_id')}</Text>
                    <Text>Porte da Empresa: {watch('ComercialData.size')}</Text>
                    <Text>Natureza Jurídica: {watch('ComercialData.legal_nature_id')}</Text>
                    <Text>Faturamento Anual: {watch('ComercialData.annual_billing')}</Text>
                    <Text>CNAE principal: {watch('ComercialData.cnae')}</Text>
                  </SimpleGrid>
                </Box>
                <Flex pt="20px" borderBottom="1px" borderColor="#7F8B9F" justify="space-between">
                  <Text color="#7F8B9F">
                    Endereço Comercial
                  </Text>
                  <Center cursor="pointer" onClick={() => setCurrentTab(0)}>
                    <Icon color="#21C6DE" icon="material-symbols:edit" />
                    <Text color="#21C6DE">
                      Editar
                    </Text>
                  </Center>
                </Flex>
                <Box pt="10px" >
                  <SimpleGrid columns={2} gap={2}>
                    <Text>CEP: {watch('CompanyAddress.zip_code')}</Text>
                    <Text>Logradouro: {watch('CompanyAddress.address_line_one')}</Text>
                    <Text>Bairro: {moment(watch('CompanyAddress.neighborhood')).locale('pt-br').format('L')}</Text>
                    <Text>Número: {watch('CompanyAddress.building_number')}</Text>
                    <Text>Estado: {watch('CompanyAddress.state')}</Text>
                    <Text>Cidade: {watch('CompanyAddress.city')}</Text>
                  </SimpleGrid>
                </Box>
                <Flex gap={2} pt="20px">
                  <Checkbox size="lg" isChecked={termsAndPolicy} onChange={(e) => setTermsAndPolicy(e.target.checked)} />
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
                  <Box w="25%" as="form" onSubmit={handleSubmit(SendInfo)}>
                    <Button
                      bg="#CBD3E0"
                      w="100%"
                      border="0"
                      color="#070A0E"
                      type="submit"
                      borderRadius="40px"
                      disabled={!termsAndPolicy}
                      _hover={{ background: '#2E4EFF', color: '#FFF' }}
                    // onClick={() =>  console.log(watch('AddressPersonal'))}
                    // onClick={async () => {
                    //   const validation = await trigger([
                    //     'Password.password',
                    //   ]);
                    //   console.log(validation);
                    //   if (validation) {
                    //     setCurrentTab((current: any) => current + 1);
                    //     setPermissionTab((prev: any) => [...prev, 7]);
                    //   }
                    // }}
                    >
                      ENVIAR
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </TabPanel>

            {/* <TabPanel py="0">
              
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
      </Box>
    </Box>
  );
}
