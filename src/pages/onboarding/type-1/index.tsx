/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  documentBody,
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
    register_name: yup.string().required('Nome Obrigat??rio'),
    nif_number: yup.string().required('CPF Obrigat??rio'),
    birth_date: yup.string().required('Data de Nascimento Obrigat??rio'),
    mother_name: yup.string().required('Nome Obrigat??rio'),
    email: yup.string().required('Email Obrigat??rio'),
    phone: yup.object().shape({
      number: yup.string().required('Telefone Obrigat??rio'),
    }),
  }),
  AddressPersonal: yup.object().shape({
    address_line_one: yup.string().required('Endere??o Obrigat??rio'),
    building_number: yup.string().required('N??mero Obrigat??rio'),
    zip_code: yup.string().required('CEP Obrigat??rio'),
    neighborhood: yup.string().required('Bairro Obrigat??rio'),
    city: yup.string().required('Cidade Obrigat??ria'),
    state: yup.string().required('Estado Obrigat??rio'),
  }),
  ComercialData: yup.object().shape({
    nif_number: yup.string().required('CNPJ Obrigat??rio'),
    register_name: yup.string().required('Raz??o social Obrigat??ria'),
    social_name: yup.string().required('Nome Fantasia Obrigat??rio'),
    phone_number: yup.string().required('Telefone Obrigat??rio'),
    email: yup.string().required('Email Obrigat??rio'),
    size: yup.string().required('Porte da Empresa Obrigat??rio'),
    // business_type_id: yup.string().required('Tipo Obrigat??rio'),
    legal_nature_id: yup.string().required('Natureza Jur??dica Obrigat??ria'),
    site: yup.string().required('Site Obrigat??rio'),
    cnae: yup.string().required('CNAE Obrigat??rio'),
    annual_billing: yup.string().required('Faturamento Anual Obrigat??rio'),
    hasMember: yup.array().of(
      yup.object().shape({
        register_name: yup.string().required('Nome Obrigat??rio'),
        nif_number: yup.string().required('CPF Obrigat??rio'),
        birth_date: yup.string().required('Data de Nascimento Obrigat??rio'),
        mother_name: yup.string().required('Nome Obrigat??rio'),
        email: yup.string().required('Email Obrigat??rio'),
        phone: yup.object().shape({
          number: yup.string().required('Telefone Obrigat??rio'),
        }),
        percentual: yup.string().required('Porcentagem Obrigat??ria'),
        member_type: yup.string().required('Tipo de Membro Obrigat??rio'),
        address: yup.object().shape({
          address_line_one: yup.string().required('Endere??o Obrigat??rio'),
          building_number: yup.string().required('N??mero Obrigat??rio'),
          zip_code: yup.string().required('CEP Obrigat??rio'),
          neighborhood: yup.string().required('Bairro Obrigat??rio'),
          city: yup.string().required('Cidade Obrigat??ria'),
          state: yup.string().required('Estado Obrigat??rio'),
        }),
      })
    ),
  }),
  CompanyAddress: yup.object().shape({
    address_line_one: yup.string().required('Endere??o Obrigat??rio'),
    building_number: yup.string().required('N??mero Obrigat??rio'),
    zip_code: yup.number().required('CEP Obrigat??rio'),
    neighborhood: yup.string().required('Bairro Obrigat??rio'),
    city: yup.string().required('Cidade Obrigat??ria'),
    state: yup.string().required('Estado Obrigat??rio'),
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
  // const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(10);
  const [termsAndPolicy, setTermsAndPolicy] = useState(false);
  const [document, setDocument] = useState('');
  const [valueID, setValueID] = useState('NATIONAL_ID');
  const [valueIDSelected, setSelectedValueID] = React.useState('1');
  const dateRef = useRef<HTMLInputElement>(null);
  
  function getInitValues() {
    return valueIDSelected !== '1' ? [empatyData] : [];
  }
  const initialValues = useMemo(() => {
    if (valueIDSelected !== '1') {
      return [empatyData];
    }
    return [];
  }, [valueIDSelected]);

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
  });

  useEffect(() => {
    setValue('ComercialData.hasMember', initialValues);
  }, [valueIDSelected]);
  console.log({ initialValues });

  const steps = [
    {
      title: 'Dados Pessoais',
      subTitle: '',
      iconName: 'bx:user',
      step: 0,
    },
    {
      title: 'Endere??o Pessoal',
      subTitle: '',
      iconName: 'akar-icons:location',
      step: 1,
    },
    // {
    //   title: 'Autentica????o',
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
      title: 'ENDERE??O COMERCIAL',
      subTitle: '',
      iconName: 'bx:map',
      step: 3,
    },
    // {
    //   title: 'DOCUMENTA????O',
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
  const token = getLocalStorage('clientToken');

  async function uploadDocuments({
    description,
    document_type,
    file,
    file_name,
    side,
  }: documentBody) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('document_type', document_type);
    formData.append('file', file);
    formData.append('side', side);
    formData.append('file_name', file_name);
    if (!token) return;
    try {
      const responseFrontDocumentInfo = await postDocument(
        formData,
        token.replace(/["]/g, '')
      );
    } catch (error) {}
  }

  async function SendInfo(data: ISchemaCredentials) {
    console.log('Entrou');

    const userIdentifier = getLocalStorage('userIdentifier');

    setValue('PersonalData.document_type', 'CPF');
    setValue('PersonalData.member_type', 'OWNER');
    setValue(
      'ComercialData.legal_nature_id',
      Number(getValues('ComercialData.legal_nature_id'))
    );
    // setValue(
    //   'PersonalData.phone.number',
    //   '+55'.concat(getValues('PersonalData.phone.number'))
    // );
    setValue('Password.client_id', process.env.NEXT_PUBLIC_CLIENT_ID);
    setValue('Password.client_secret', process.env.NEXT_PUBLIC_CLIENT_SECRET);
    if (token && userIdentifier) {
      try {
        const responseComercialInfo = await postComercialInfo(
          {
            ...data.ComercialData,
            address: data.CompanyAddress,
          },
          token.replace(/["]/g, '')
        );
        try {
          const responsePersonalInfo = await postPersonalInfo(
            {
              ...data.PersonalData,
              pep: true,
              inform: true,
              address: data.AddressPersonal,
              //Add percentual input
              percentual: 50,
              //Add presumed_income input
              proxy_date: moment(data.PersonalData.proxy_date).format(
                'YYYY-MM-DD'
              ),
              presumed_income: 1,
              phone: {
                number: data.PersonalData.phone.number,
              },
            },
            token.replace(/["]/g, '')
          );

          try {
            uploadDocuments({
              description: data.Documents.selfie.description,
              document_type: 'SELFIE',
              file: data.Documents.selfie.file[0],
              file_name: 'Selfie Document',
              side: 'front',
            }).finally(() => {
              uploadDocuments({
                description: data.Documents.front_document.description,
                document_type: valueID,
                file: data.Documents.front_document.file[0],
                file_name: 'Front Document',
                side: 'front',
              }).finally(() => {
                uploadDocuments({
                  description: data.Documents.back_documment.description,
                  document_type: valueID,
                  file: data.Documents.back_documment.file[0],
                  file_name: 'Back Document',
                  side: 'back',
                });
              });
            });

            if (data.ComercialData.hasMember && valueIDSelected !== '1') {
              try {
                data.ComercialData.hasMember?.map(async (member) => {
                  const responseHasMemberInfo = await postPersonalInfo(
                    {
                      ...member,
                      address: data.AddressPersonal,
                      proxy_date: moment(data.PersonalData.proxy_date).format(
                        'YYYY-MM-DD'
                      ),
                    },
                    token.replace(/["]/g, '')
                  );
                });
              } catch (err: any) {
                console.log(err);
              }
            }
            try {
              const responsePersonalInfo = await postPassword(
                {
                  ...data.Password,
                  cell_phone: `+55${data.ComercialData.phone_number}`,
                  email: data.ComercialData.email,
                  name: data.ComercialData.register_name,
                  nif_number: +String(data.ComercialData.nif_number).replace(
                    /\D/g,
                    ''
                  ),
                  user_identifier: userIdentifier,
                  password: data.Password.password,
                  password_confirmation: data.Password.password,
                },
                token.replace(/["]/g, '')
              );
              redirectTo('/onboarding/underAnalysis');
            } catch (err: any) {
              console.log(err);
            }
          } catch (err: any) {
            console.log(err);
          }
        } catch (err: any) {
          console.log(err);
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  }
  useEffect(() => {
    // setLoading(false);
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
    if (getLocalStorage('DocumentsDataLocal')) {
      const DocumentsDataLocal = JSON.parse(
        getLocalStorage('DocumentsDataLocal') || ''
      );
      if (DocumentsDataLocal) {
        setValue('Documents', DocumentsDataLocal);
      }
    }
  }, []);
  // if (!getLocalStorage('clientToken') && !getLocalStorage('userIdentifier')) {
  //   // redirectTo('/login');
  //   return {};
  // }
  let loading = false;
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
                    setSelectedValueID={setSelectedValueID}
                    valueIDSelected={valueIDSelected}
                    setValues={setValue}
                    token={token ? token.replace(/["]/g, '') : ''}
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
                    setValues={setValue}
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
                        <Text>Nome: {getValues('PersonalData.register_name')}</Text>
                        <Text>CPF: {getValues('PersonalData.nif_number')}</Text>
                        <Text>
                          Data de Nascimento:{' '}
                          {moment(getValues('PersonalData.birth_date'))
                            .locale('pt-br')
                            .format('L')}
                        </Text>
                        <Text>
                          Nome da M??e: {getValues('PersonalData.mother_name')}
                        </Text>
                        <Text>Email: {getValues('PersonalData.email')}</Text>
                        <Text>
                          Telefone: {getValues('PersonalData.phone.number')}
                        </Text>
                      </SimpleGrid>
                    </Box>
                    <Flex
                      pt="20px"
                      borderBottom="1px"
                      borderColor="#7F8B9F"
                      justify="space-between"
                    >
                      <Text color="#7F8B9F">Endere??o Pessoal</Text>
                      <Center cursor="pointer" onClick={() => setCurrentTab(1)}>
                        <Icon color="#21C6DE" icon="material-symbols:edit" />
                        <Text color="#21C6DE">Editar</Text>
                      </Center>
                    </Flex>
                    <Box pt="10px">
                      <SimpleGrid columns={2} gap={2}>
                        <Text>CEP: {getValues('AddressPersonal.zip_code')}</Text>
                        <Text>
                          Logradouro:{' '}
                          {getValues('AddressPersonal.address_line_one')}
                        </Text>
                        <Text>
                          Bairro:{' '}
                          {moment(getValues('AddressPersonal.neighborhood'))
                            .locale('pt-br')
                            .format('L')}
                        </Text>
                        <Text>
                          N??mero: {getValues('AddressPersonal.building_number')}
                        </Text>
                        <Text>Estado: {getValues('AddressPersonal.state')}</Text>
                        <Text>Cidade: {getValues('AddressPersonal.city')}</Text>
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
                        <Text>CNPJ: {getValues('ComercialData.nif_number')}</Text>
                        <Text>
                          Raz??o Social: {getValues('ComercialData.register_name')}
                        </Text>
                        <Text>
                          Nome Fantasia: {getValues('ComercialData.social_name')}
                        </Text>
                        <Text>Email: {getValues('ComercialData.email')}</Text>
                        <Text>
                          Telefone: {getValues('ComercialData.phone_number')}
                        </Text>
                        <Text>Site: {getValues('ComercialData.site')}</Text>
                        <Text>
                          Tipo de Empresa:{' '}
                          {getValues('ComercialData.business_type_id')}
                        </Text>
                        <Text>
                          Porte da Empresa: {getValues('ComercialData.size')}
                        </Text>
                        <Text>
                          Natureza Jur??dica:{' '}
                          {getValues('ComercialData.legal_nature_id')}
                        </Text>
                        <Text>
                          Faturamento Anual:{' '}
                          {getValues('ComercialData.annual_billing')}
                        </Text>
                        <Text>
                          CNAE principal: {getValues('ComercialData.cnae')}
                        </Text>
                      </SimpleGrid>
                    </Box>
                    <Flex
                      pt="20px"
                      borderBottom="1px"
                      borderColor="#7F8B9F"
                      justify="space-between"
                    >
                      <Text color="#7F8B9F">Endere??o Comercial</Text>
                      <Center cursor="pointer" onClick={() => setCurrentTab(4)}>
                        <Icon color="#21C6DE" icon="material-symbols:edit" />
                        <Text color="#21C6DE">Editar</Text>
                      </Center>
                    </Flex>
                    <Box pt="10px">
                      <SimpleGrid columns={2} gap={2}>
                        <Text>CEP: {getValues('CompanyAddress.zip_code')}</Text>
                        <Text>
                          Logradouro: {getValues('CompanyAddress.address_line_one')}
                        </Text>
                        <Text>
                          Bairro:{' '}
                          {moment(getValues('CompanyAddress.neighborhood'))
                            .locale('pt-br')
                            .format('L')}
                        </Text>
                        <Text>
                          N??mero: {getValues('CompanyAddress.building_number')}
                        </Text>
                        <Text>Estado: {getValues('CompanyAddress.state')}</Text>
                        <Text>Cidade: {getValues('CompanyAddress.city')}</Text>
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
                        <Link color="#2E4EFF">Termos de Servi??o</Link> e aceito
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
