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
import { FormAuthentication, FormComercialData, FormCompanyAddress, FormDocuments, FormPassword, FormPersonalAddress, FormPersonalData, Input, Layout } from '~/components';
import { Icon } from '@iconify/react';
import { VerifyPassword } from '~/components/Verify/VerifyPassword';
import { useQuery } from 'react-query';
import { generateToken, generateTokenProps, infoPersonProps, personalData, postPersonalInfo } from '~/services/hooks/useCreateAccount';
import { getLocalStorage } from '~/utils/localStorageFormat';
import { AuthTwoFactors, GetAuthTwoFactors } from '~/services/hooks/useAuth';
import { parseCookies, setCookie } from 'nookies';




type ErrorMessage = {
  message?: any;
  error?: boolean;
};

export default function OnBoarding() {
  const [currentTab, setCurrentTab] = useState(0);
  const [permissionTab, setPermissionTab] = useState([0]);
  const [code, setCode] = useState('');
  const dateRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState, trigger, watch, setValue, getValues } = useForm({
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
          <TabPanels >
            <TabPanel >
              <FormPersonalData currentTab={currentTab} error={formState} register={register} setCurrentTab={setCurrentTab} setPermissionTab={setPermissionTab} />
            </TabPanel>
            <TabPanel >
              <FormPersonalAddress currentTab={currentTab} error={formState} register={register} setCurrentTab={setCurrentTab} setPermissionTab={setPermissionTab} />
            </TabPanel>
            <TabPanel >
            <FormAuthentication currentTab={currentTab} error={formState} register={register} setCurrentTab={setCurrentTab} setPermissionTab={setPermissionTab} />
            </TabPanel>
            <TabPanel >
              <FormComercialData currentTab={currentTab} error={formState} register={register} setCurrentTab={setCurrentTab} setPermissionTab={setPermissionTab} />
            </TabPanel>
            <TabPanel >
              <FormCompanyAddress currentTab={currentTab} error={formState} register={register} setCurrentTab={setCurrentTab} setPermissionTab={setPermissionTab} />
            </TabPanel>
            <TabPanel >
              <FormDocuments currentTab={currentTab} error={formState} register={register} setCurrentTab={setCurrentTab} setPermissionTab={setPermissionTab} />
            </TabPanel>
            <TabPanel >
              <FormPassword watch={watch} currentTab={currentTab} error={formState} register={register} setCurrentTab={setCurrentTab} setPermissionTab={setPermissionTab} />
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
      </Box >
    </Box >
  );
}
