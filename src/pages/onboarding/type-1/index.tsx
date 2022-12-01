/* eslint-disable react-hooks/exhaustive-deps */
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
  Loading,
} from '~/components';
import { Icon } from '@iconify/react';
import { VerifyPassword } from '~/components/Verify/VerifyPassword';
import { useQuery } from 'react-query';
import {
  generateToken,
  generateTokenProps,
  personalData,
  postComercialInfo,
  postDocument,
  postPassword,
  postPersonalInfo,
} from '~/services/hooks/useCreateAccount';
import { getLocalStorage } from '~/utils/localStorageFormat';
import { AuthTwoFactors, GetAuthTwoFactors } from '~/services/hooks/useAuth';
import { parseCookies, setCookie } from 'nookies';
import {
  Address,
  Auth,
  Client,
  ComercialData,
  ComercialProps,
  CompanyAddress,
  Documents,
  Password,
} from '~/types/onBoarding';
import { empatyData } from '~/components/Forms/Onboarding/type_1/AddMember';
import { redirectTo } from '~/utils/redirectTo';

export interface ISchemaCredentials {
  PersonalData: Client;
  AddressPersonal: Address;
  // Authentication: Auth;
  ComercialData: ComercialData;
  CompanyAddress: CompanyAddress;
  Documents: Documents;
  Password: Password;
}

export interface PostSchema {
  PersonalData: Client;
  AddressPersonal: Address;
  // Authentication: Auth;
  ComercialData: ComercialProps;
  Documents: Documents;
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
    }),
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
    // business_type_id: yup.string().required('Tipo Obrigatório'),
    legal_nature_id: yup.string().required('Natureza Jurídica Obrigatória'),
    site: yup.string().required('Site Obrigatório'),
    cnae: yup.string().required('CNAE Obrigatório'),
    annual_billing: yup.string().required('Faturamento Anual Obrigatório'),
    hasMember: yup.array().of(
      yup.object().shape({
        register_name: yup.string().required('Nome Obrigatório'),
        nif_number: yup.string().required('CPF Obrigatório'),
        birth_date: yup.string().required('Data de Nascimento Obrigatório'),
        mother_name: yup.string().required('Nome Obrigatório'),
        email: yup.string().required('Email Obrigatório'),
        phone: yup.object().shape({
          number: yup.string().required('Telefone Obrigatório'),
        }),
        percentual: yup.string().required('Porcentagem Obrigatória'),
        member_type: yup.string().required('Tipo de Membro Obrigatório'),
        address: yup.object().shape({
          address_line_one: yup.string().required('Endereço Obrigatório'),
          building_number: yup.string().required('Número Obrigatório'),
          zip_code: yup.string().required('CEP Obrigatório'),
          neighborhood: yup.string().required('Bairro Obrigatório'),
          city: yup.string().required('Cidade Obrigatória'),
          state: yup.string().required('Estado Obrigatório'),
        }),
      })
    ),
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
    password: yup
      .string()
      .required('')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, ''),
  }),
});

export default function OnBoarding() {

  const [currentTab, setCurrentTab] = useState(0);
  const [permissionTab, setPermissionTab] = useState([0]);
  const [code, setCode] = useState('');
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(10);
  const [termsAndPolicy, setTermsAndPolicy] = useState(false);
  const [document, setDocument] = useState('');
  const [valueID, setValueID] = useState('NATIONAL_ID');
  const dateRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState,
    trigger,
    control,
    watch,
    setValue,
    getValues,
  } = useForm<ISchemaCredentials>({
    resolver: yupResolver(onboardingSchema),
    defaultValues: {
      ComercialData: {
        hasMember: [empatyData],
      },
    },
  });

  const steps = [
    {
      title: 'Dados Pessoais',
      subTitle: '',
      iconName: 'bx:user',
      step: 0,
    },
    {
      title: 'Endereço Pessoal',
      subTitle: '',
      iconName: 'akar-icons:location',
      step: 1,
    },
    // {
    //   title: 'Autenticação',
    //   subTitle: '',
    //   iconName: 'lucide:user-check',
    //   step: 2,
    // },
    {
      title: 'Dados Comerciais',
      subTitle: '',
      iconName: 'carbon:enterprise',
      step: 2,
    },
    {
      title: 'ENDEREÇO COMERCIAL',
      subTitle: '',
      iconName: 'bx:map',
      step: 3,
    },
    // {
    //   title: 'DOCUMENTAÇÃO',
    //   subTitle: '',
    //   iconName: 'ep:document',
    //   step: 5,
    // },
    {
      title: 'SENHA',
      subTitle: '',
      iconName: 'gg:lock',
      step: 4,
    },
  ];


  async function SendInfo(data: ISchemaCredentials) {
    const token = getLocalStorage('clientToken');
    const userIdentifier = getLocalStorage('userIdentifier');
    // const comercialInfo = getValues('ComercialData');
    // const comercialAddress = getValues('CompanyAddress');
    // const personalInfo = getValues('PersonalData');
    // const personalAddress = getValues('AddressPersonal');
    // const password = getValues('Password');
    // const documentInfo = getValues('Documents');
    // const hasMember = getValues('ComercialData.hasMember');
    setValue('ComercialData.business_type_id', 1)
    setValue('PersonalData.phone.number', '+55'.concat(getValues('PersonalData.phone.number')))
    setValue('Password.password.client_id', process.env.NEXT_PUBLIC_CLIENT_ID)
    setValue('Password.password.client_secret', process.env.NEXT_PUBLIC_CLIENT_SECRET)
    if (token && userIdentifier) {
      try {
        const responseComercialInfo = await postComercialInfo(
          data.ComercialData,
          token.replace(/["]/g, '')
        );
        try {
          const responsePersonalInfo = await postPersonalInfo(
            data.PersonalData,
            token.replace(/["]/g, '')
          );
          const formData = new FormData();
          formData.append('description', data.Documents.front_document.description);
          formData.append('document_type', valueID);
          formData.append('file', data.Documents.front_document.file[0]);
          formData.append('side', 'front');
          formData.append('file_name', 'Front Document');
          try {
            const responseFrontDocumentInfo = await postDocument(
              formData,
              token.replace(/["]/g, '')
            );
            try {
              const responsePersonalInfo = await postPassword(
                data.Password.password,
                token.replace(/["]/g, '')
              );
              redirectTo('/onboarding/underAnalysis');
            }
            catch (err: any) {
              console.log(err);
              redirectTo('/onboarding/expiredSession');
            }
          } catch (err: any) {
            console.log(err);
            redirectTo('/onboarding/expiredSession');
          }
        }
        catch (err: any) {
          console.log(err);
          redirectTo('/onboarding/expiredSession');
        }
      }
      catch (err: any) {
        console.log(err);
        redirectTo('/onboarding/expiredSession');
      }


      // const objectURL: string = window.URL.createObjectURL(
      //   data.Documents.front_document.file[0]
      // );
      // let file = data.Documents.front_document.file[0];

      // setValue('Documents.front_document.file', file);


      // try {
      //   const responseBackDocumentInfo = await postDocument({
      //     DocumentData: {
      //       description: documentInfo.back_documment.description,
      //       document_type: valueID,
      //       file: documentInfo.back_documment.file,
      //       side: 'back',
      //       file_name: 'Back Document'
      //     },
      //     token: token.replace(/["]/g, ''),
      //   });
      // }
      // catch (err: any) {
      //   console.log(err);
      // }
      // try {
      //   const responseSelfieInfo = await postDocument({
      //     DocumentData: {
      //       description: documentInfo.selfie.description,
      //       document_type: 'SELFIE',
      //       file: documentInfo.selfie.file,
      //       side: 'front',
      //       file_name: 'Selfie document'
      //     },
      //     token: token.replace(/["]/g, ''),
      //   });
      // }
      // catch (err: any) {
      //   console.log(err);
      // }


    }
  }
  useEffect(() => {
    setLoading(false);
    if (getLocalStorage('PersonalDataLocal')) {
      const PersonalDataLocal = JSON.parse(
        getLocalStorage('PersonalDataLocal') || ''
      );
      setValue('PersonalData', PersonalDataLocal);
    }
    if (getLocalStorage('AddressPersonalLocal')) {
      const AddressPersonalLocal = JSON.parse(
        getLocalStorage('AddressPersonalLocal') || ''
      );
      setValue('AddressPersonal', AddressPersonalLocal);
    }
    if (getLocalStorage('ComercialDatalLocal')) {
      const ComercialDatalLocal = JSON.parse(
        getLocalStorage('ComercialDatalLocal') || ''
      );
      if (ComercialDatalLocal) {
        setValue('ComercialData', ComercialDatalLocal);
      }
    }
    if (getLocalStorage('CompanyAddressLocal')) {
      const CompanyAddressLocal = JSON.parse(
        getLocalStorage('CompanyAddressLocal') || ''
      );
      if (CompanyAddressLocal) {
        setValue('CompanyAddress', CompanyAddressLocal);
      }
    }
  }, []);
  if (!getLocalStorage('clientToken') && !getLocalStorage('userIdentifier')) {
    redirectTo('/login');
    return {};
  }

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Loading />
        </Center>
      ) : (
        <Box bg="#F0F0F3" h="full" minH="100vh">
          <Box
            h="full"
            w="full"
            maxW="1200px"
            mx="auto"
            onSubmit={handleSubmit(SendInfo)}
          >
            <Flex
              justifyContent="space-between"
              w="full"
              align="center"
              py="30px"
            >
              <Image
                src="/assets/logo-preta.svg"
                alt="Logo_iHold"
                width="150px"
                objectFit="contain"
              />
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
                  // } else if (currentTab === 7) {
                  //   setCurrentTab(tab);
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
                    getValues={getValues}
                    setValue={setValue}
                    setValueID={setValueID}
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
                    getValues={getValues}
                    trigger={trigger}
                    setCurrentTab={setCurrentTab}
                    setPermissionTab={setPermissionTab}
                  />
                </TabPanel>
                {/* <TabPanel>
              <FormAuthentication
                currentTab={currentTab}
                error={formState}
                register={register}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel> */}
                <TabPanel>
                  <FormComercialData
                    control={control}
                    currentTab={currentTab}
                    error={formState}
                    register={register}
                    trigger={trigger}
                    getValues={getValues}
                    setCurrentTab={setCurrentTab}
                    watch={watch}
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
                    getValues={getValues}
                  />
                </TabPanel>
                {/* <TabPanel>
              <FormDocuments
                currentTab={currentTab}
                error={formState}
                register={register}
                setCurrentTab={setCurrentTab}
                setPermissionTab={setPermissionTab}
              />
            </TabPanel> */}
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
                    <Flex
                      pt="30px"
                      borderBottom="1px"
                      borderColor="#7F8B9F"
                      justify="space-between"
                    >
                      <Text color="#7F8B9F">Dados Pessoais</Text>
                      <Center cursor="pointer" onClick={() => setCurrentTab(0)}>
                        <Icon color="#21C6DE" icon="material-symbols:edit" />
                        <Text color="#21C6DE">Editar</Text>
                      </Center>
                    </Flex>
                    <Box pt="10px">
                      <SimpleGrid columns={2} gap={2}>
                        <Text>Nome: {watch('PersonalData.register_name')}</Text>
                        <Text>CPF: {watch('PersonalData.nif_number')}</Text>
                        <Text>
                          Data de Nascimento:{' '}
                          {moment(watch('PersonalData.birth_date'))
                            .locale('pt-br')
                            .format('L')}
                        </Text>
                        <Text>
                          Nome da Mãe: {watch('PersonalData.mother_name')}
                        </Text>
                        <Text>Email: {watch('PersonalData.email')}</Text>
                        <Text>
                          Telefone: {watch('PersonalData.phone.number')}
                        </Text>
                      </SimpleGrid>
                    </Box>
                    <Flex
                      pt="20px"
                      borderBottom="1px"
                      borderColor="#7F8B9F"
                      justify="space-between"
                    >
                      <Text color="#7F8B9F">Endereço Pessoal</Text>
                      <Center cursor="pointer" onClick={() => setCurrentTab(1)}>
                        <Icon color="#21C6DE" icon="material-symbols:edit" />
                        <Text color="#21C6DE">Editar</Text>
                      </Center>
                    </Flex>
                    <Box pt="10px">
                      <SimpleGrid columns={2} gap={2}>
                        <Text>CEP: {watch('AddressPersonal.zip_code')}</Text>
                        <Text>
                          Logradouro:{' '}
                          {watch('AddressPersonal.address_line_one')}
                        </Text>
                        <Text>
                          Bairro:{' '}
                          {moment(watch('AddressPersonal.neighborhood'))
                            .locale('pt-br')
                            .format('L')}
                        </Text>
                        <Text>
                          Número: {watch('AddressPersonal.building_number')}
                        </Text>
                        <Text>Estado: {watch('AddressPersonal.state')}</Text>
                        <Text>Cidade: {watch('AddressPersonal.city')}</Text>
                      </SimpleGrid>
                    </Box>
                    <Flex
                      pt="20px"
                      borderBottom="1px"
                      borderColor="#7F8B9F"
                      justify="space-between"
                    >
                      <Text color="#7F8B9F">Dados Comerciais</Text>
                      <Center cursor="pointer" onClick={() => setCurrentTab(3)}>
                        <Icon color="#21C6DE" icon="material-symbols:edit" />
                        <Text color="#21C6DE">Editar</Text>
                      </Center>
                    </Flex>
                    <Box pt="10px">
                      <SimpleGrid columns={2} gap={2}>
                        <Text>CNPJ: {watch('ComercialData.nif_number')}</Text>
                        <Text>
                          Razão Social: {watch('ComercialData.register_name')}
                        </Text>
                        <Text>
                          Nome Fantasia: {watch('ComercialData.social_name')}
                        </Text>
                        <Text>Email: {watch('ComercialData.email')}</Text>
                        <Text>
                          Telefone: {watch('ComercialData.phone_number')}
                        </Text>
                        <Text>Site: {watch('ComercialData.site')}</Text>
                        <Text>
                          Tipo de Empresa:{' '}
                          {watch('ComercialData.business_type_id')}
                        </Text>
                        <Text>
                          Porte da Empresa: {watch('ComercialData.size')}
                        </Text>
                        <Text>
                          Natureza Jurídica:{' '}
                          {watch('ComercialData.legal_nature_id')}
                        </Text>
                        <Text>
                          Faturamento Anual:{' '}
                          {watch('ComercialData.annual_billing')}
                        </Text>
                        <Text>
                          CNAE principal: {watch('ComercialData.cnae')}
                        </Text>
                      </SimpleGrid>
                    </Box>
                    <Flex
                      pt="20px"
                      borderBottom="1px"
                      borderColor="#7F8B9F"
                      justify="space-between"
                    >
                      <Text color="#7F8B9F">Endereço Comercial</Text>
                      <Center cursor="pointer" onClick={() => setCurrentTab(4)}>
                        <Icon color="#21C6DE" icon="material-symbols:edit" />
                        <Text color="#21C6DE">Editar</Text>
                      </Center>
                    </Flex>
                    <Box pt="10px">
                      <SimpleGrid columns={2} gap={2}>
                        <Text>CEP: {watch('CompanyAddress.zip_code')}</Text>
                        <Text>
                          Logradouro: {watch('CompanyAddress.address_line_one')}
                        </Text>
                        <Text>
                          Bairro:{' '}
                          {moment(watch('CompanyAddress.neighborhood'))
                            .locale('pt-br')
                            .format('L')}
                        </Text>
                        <Text>
                          Número: {watch('CompanyAddress.building_number')}
                        </Text>
                        <Text>Estado: {watch('CompanyAddress.state')}</Text>
                        <Text>Cidade: {watch('CompanyAddress.city')}</Text>
                      </SimpleGrid>
                    </Box>
                    <Flex gap={2} pt="20px">
                      <Checkbox
                        size="lg"
                        isChecked={termsAndPolicy}
                        onChange={(e) => setTermsAndPolicy(e.target.checked)}
                      />
                      <Text color="#7F8B9F">
                        Eu concordo com os{' '}
                        <Link color="#2E4EFF">Termos de Serviço</Link> e aceito
                        o{' '}
                        <Link color="#2E4EFF">Contrato de Credenciamento</Link>
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
                          onClick={() =>
                            currentTab !== 0 && setCurrentTab(currentTab - 1)
                          }
                        >
                          VOLTAR
                        </Button>
                      </Box>
                      <Box w="25%" as="form">
                        <Button
                          onClick={() => {
                            console.log(formState.errors);
                          }}
                          bg="#CBD3E0"
                          w="100%"
                          border="0"
                          color="#070A0E"
                          type="submit"
                          borderRadius="40px"
                          disabled={!termsAndPolicy}
                          _hover={{ background: '#2E4EFF', color: '#FFF' }}
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
      )}
    </>
  );
}
