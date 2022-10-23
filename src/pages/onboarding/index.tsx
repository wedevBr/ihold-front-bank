import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Radio,
  RadioGroup,
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

interface IOnBoarding {
  document_type: 'CPF' | 'CNPJ';
  nif_number: string;
  register_name: string;
  social_name: string;
  birth_date: string;
  mother_name: string;
  email: string;
  member_type: 'OWNER' | 'AGENT' | 'PARTNER';
  member_qualification: string;
  proxy_date: string;
  percentual: number;
  presumed_income: number;
  pep: boolean;
  inform: boolean;
  address: {
    id: any;
    is_mailing_address: boolean;
    address_line_one: string;
    address_line_two: string;
    building_number: any;
    complement: string;
    zip_code: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
  phone: {
    number: string;
  };
}

const onboardingSchema = yup.object().shape({
  // document_typet: yup.string().required('Período inicial obrigatório'),
  birth: yup.string().required('Data de nascimento obrigatório'),
  social_name: yup.string().required('Nome completo obrigatório'),
  nif_number: yup.string().required('CPF obrigatório'),
  email: yup.string().email('Email inválido').required('email obrigatório'),
  mother_name: yup.string().required('Nome da mãe obrigatório'),
  number: yup.string().required('Numero  obrigatório'),
  address: yup.string().required('Endereço obrigatório'),
});

export default function OnBoarding() {
  const [currentTab, setCurrentTab] = useState(0);
  const [permissionTab, setPermissionTab] = useState([0]);
  const dateRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState, trigger } = useForm({
    resolver: yupResolver(onboardingSchema),
    mode: 'onBlur',
  });
  const steps = [
    {
      title: 'Dados Pessoais',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'bx:user',
    },
    {
      title: 'Endereço PESSOAL',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'akar-icons:location',
    },
    {
      title: 'Autenticação',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'lucide:user-check',
    },
    {
      title: 'Dados Comerciais',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'carbon:enterprise',
    },
    {
      title: 'Dados Comerciais',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'carbon:enterprise',
    },
    {
      title: 'Dados Comerciais',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'carbon:enterprise',
    },
    {
      title: 'Dados Comerciais',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'carbon:enterprise',
    },
    {
      title: 'Dados Comerciais',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'carbon:enterprise',
    },
  ];
  let dataPersonal = false;
  let data = [0];
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
            const result = await trigger([
              'social_name',
              'nif_number',
              'mother_name',
              'birth',
              'email',
            ]);
            const tab2 = await trigger(['number']);
            const tab3 = await trigger(['address']);
            if (result && currentTab === 0) {
              setCurrentTab(tab);
            }
            if (tab2 && currentTab === 1) {
              setCurrentTab(tab);
            }
            if (tab3 && currentTab === 2) {
              setCurrentTab(tab);
            }
          }}
        >
          <TabList flexDir="column" w="350px" mt="20px">
            {steps.map((item, key) => (
              <Box key={key} w="full">
                <Tab p="0" w="full" isDisabled={!permissionTab.includes(key)}>
                  <Flex align="center" justify="space-between" w="full">
                    <Box mr="5px">
                      <Text>{item.title}</Text>
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
                <Text>{currentTab + 1}/8</Text>
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
                      placeholder="E-mail"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('social_name')}
                      error={formState?.errors?.social_name}
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
                      {...register('nif_number')}
                      error={formState?.errors?.nif_number}
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
                      {...register('birth')}
                      error={formState?.errors?.birth}
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
                      placeholder="Maria"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('mother_name')}
                      error={formState?.errors?.mother_name}
                    />
                  </Box>
                </Flex>
                <Flex w="full" justify="space-between" my="20px">
                  <Box w="full">
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
                  </Box>
                  <Box w="full" mx="20px">
                    <Input
                      name=""
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
                      // {...register('key_type')}
                      // error={formState?.errors?.key_type}
                    />
                  </Box>
                  <Box w="full">
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
                      {...register('email')}
                      error={formState?.errors?.email}
                    />
                  </Box>
                </Flex>
                <Text>Documento de identificação:</Text>
                <Flex w="full" justify="space-between" my="20px">
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
                </Flex>
                <Flex w="full" justify="space-between" my="40px">
                  <Box w="full" mr="20px">
                    <Input
                      name=""
                      label="Frente"
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
                        console.log(formState.errors);

                        const result = await trigger([
                          'social_name',
                          'nif_number',
                          'mother_name',
                          'birth',
                          'email',
                        ]);
                        if (result) {
                          setCurrentTab((current) => current + 1);
                          setPermissionTab((prev) => [...prev, 1]);
                        }
                        console.log({ result });
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
                p="20px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text>{currentTab + 1}/8</Text>
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
                  placeholder="E-mail"
                  _focus={{
                    borderBottom: '1px solid #2E4EFF',
                  }}
                  {...register('number')}
                  error={formState?.errors?.number}
                />
                <Flex gap={5} justify="flex-end" py="20px">
                  <Box w="25%">
                    <Button
                      bg="#FFF"
                      w="100%"
                      border="1px"
                      borderColor="#2E4EFF"
                      color="#2E4EFF"
                      borderRadius="40px"
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
                        console.log(formState.errors);
                        const tab2 = await trigger(['number']);
                        if (tab2) {
                          setCurrentTab((current) => current + 1);
                          setPermissionTab((prev) => [...prev, 2]);
                        }
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
                p="20px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text>{currentTab + 1}/8</Text>
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
                  placeholder="E-mail"
                  _focus={{
                    borderBottom: '1px solid #2E4EFF',
                  }}
                  {...register('address')}
                  error={formState?.errors?.address}
                />
                <Flex gap={5} justify="flex-end" py="20px">
                  <Box w="25%">
                    <Button
                      bg="#FFF"
                      w="100%"
                      border="1px"
                      borderColor="#2E4EFF"
                      color="#2E4EFF"
                      borderRadius="40px"
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
                        console.log(formState.errors);
                        const tab2 = await trigger(['address']);
                        if (tab2) {
                          // setCurrentTab((current) => current + 1);
                          // setPermissionTab((prev) => [...prev, 3]);
                        }
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
                p="20px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text>{currentTab + 1}/8</Text>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
