import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  GridItem,
  HStack,
  Image,
  Link,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
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

// const onboardingSchema = yup.object().shape({
// document_typet: yup.string().required('Período inicial obrigatório'),
// birth: yup.string().required('Data de nascimento obrigatório'),
// social_name: yup.string().required('Nome completo obrigatório'),
// nif_number: yup.string().required('CPF obrigatório'),
// email: yup.string().email('Email inválido').required('email obrigatório'),
// mother_name: yup.string().required('Nome da mãe obrigatório'),
// number: yup.string().required('Numero  obrigatório'),
// address: yup.string().required('Endereço obrigatório'),
// });

export default function OnBoarding() {
  const [currentTab, setCurrentTab] = useState(0);
  const [permissionTab, setPermissionTab] = useState([0]);
  const [code, setCode] = useState('');
  const dateRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState, trigger, watch } = useForm({
    // resolver: yupResolver(onboardingSchema),
    mode: 'onBlur',
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
      title: 'SOCIEDADES',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'fluent-mdl2:people',
      step: 6,
    },
    {
      title: 'SENHA',
      subTitle: 'Lorem ipsum dolor sit amet',
      iconName: 'gg:lock',
      step: 7,
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
            if (currentTab === 3) {
              setCurrentTab(tab);
            }
            if (currentTab === 4) {
              setCurrentTab(tab);
            }
            if (currentTab === 5) {
              setCurrentTab(tab);
            }
            if (currentTab === 6) {
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
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/8</Text>
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
                      placeholder="Lorem ipsum"
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
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/8</Text>
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
                      {...register('zip_code')}
                      error={formState?.errors?.zip_code}
                    />
                  </GridItem>
                  <GridItem colSpan={2} />
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
                      {...register('address')}
                      error={formState?.errors?.address}
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
                      {...register('number')}
                      error={formState?.errors?.number}
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
                      {...register('neighborhood')}
                      error={formState?.errors?.neighborhood}
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
                      {...register('state')}
                      error={formState?.errors?.state}
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
                      {...register('city')}
                      error={formState?.errors?.city}
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
                          setPermissionTab((prev) => [...prev, 2]);
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
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/8</Text>
                <Text pt="10px" pb="30px" color="#7F8B9F">Agora, insira abaixo o código de 6 dígitos que enviamos para  jo*********va@gmail.com</Text>
                <Flex w="100%">
                  <HStack>
                    <PinInput
                      autoFocus
                      type="number"
                      errorBorderColor="red"
                      size="lg"
                      value={code}
                      onChange={(value) => setCode(value)}
                    >
                      {Array.from({ length: 6 }).map((_, key) => (
                        <PinInputField key={key} />
                      ))}
                    </PinInput>
                  </HStack>
                  <Box pl="20px">
                    <Text color="#7F8B9F">Insira o código do e-mail</Text>
                    <Text fontWeight={700} color="#2E4EFF">REENVIAR CÓDIGO</Text>
                  </Box>
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
                          setPermissionTab((prev) => [...prev, 3]);
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
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
                mb="50px"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/8</Text>
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
                      {...register('zip_code')}
                      error={formState?.errors?.zip_code}
                    />
                  </GridItem>
                  <GridItem colSpan={2} />
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
                      {...register('address')}
                      error={formState?.errors?.address}
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
                      {...register('number')}
                      error={formState?.errors?.number}
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
                      {...register('neighborhood')}
                      error={formState?.errors?.neighborhood}
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
                      {...register('complement')}
                      error={formState?.errors?.complement}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Input
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
                      {...register('country')}
                      error={formState?.errors?.country}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
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
                      {...register('state')}
                      error={formState?.errors?.state}
                    />
                  </GridItem>
                  <GridItem colSpan={2} />
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
                      {...register('address')}
                      error={formState?.errors?.address}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Input
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
                      {...register('address')}
                      error={formState?.errors?.address}
                    />
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
                      {...register('address')}
                      error={formState?.errors?.address}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
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
                      {...register('address')}
                      error={formState?.errors?.address}
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
                      {...register('address')}
                      error={formState?.errors?.address}
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
                          setPermissionTab((prev) => [...prev, 4]);
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
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/8</Text>
                <Text pt="10px" pb="30px" color="#7F8B9F">Queremos saber mais sobre o seu negócio. Nos informe alguns dados pra identificar a sua empresa</Text>
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
                      {...register('zip_code')}
                      error={formState?.errors?.zip_code}
                    />
                  </GridItem>
                  <GridItem colSpan={2} />
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
                      {...register('address')}
                      error={formState?.errors?.address}
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
                      {...register('number')}
                      error={formState?.errors?.number}
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
                      {...register('neighborhood')}
                      error={formState?.errors?.neighborhood}
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
                      {...register('state')}
                      error={formState?.errors?.state}
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
                      {...register('city')}
                      error={formState?.errors?.city}
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
                          setPermissionTab((prev) => [...prev, 5]);
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
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/8</Text>
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
                          setPermissionTab((prev) => [...prev, 6]);
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
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
                mb="30px"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/8</Text>
                <Text pt="10px" pb="30px" color="#7F8B9F">Agora, precisamos de alguns documentos para validação da sua empresa</Text>
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
                      {...register('zip_code')}
                      error={formState?.errors?.zip_code}
                    />
                  </GridItem>
                  <GridItem colSpan={2} />
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
                      {...register('address')}
                      error={formState?.errors?.address}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Input
                      label="Nome social"
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
                      {...register('number')}
                      error={formState?.errors?.number}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
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
                      placeholder="Lorem ipsum"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('complement')}
                      error={formState?.errors?.complement}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Input
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
                      {...register('country')}
                      error={formState?.errors?.country}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
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
                      {...register('state')}
                      error={formState?.errors?.state}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Input
                      label="Email"
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
                      {...register('address')}
                      error={formState?.errors?.address}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Input
                      label="Percentual na sociedade"
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
                      {...register('address')}
                      error={formState?.errors?.address}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Input
                      label="Renda presumida"
                      labelColor="#7F8B9F"
                      size="sm"
                      w="full"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="R$ 00000.00"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('address')}
                      error={formState?.errors?.address}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Flex gap={2} pt="20px">
                      <Checkbox size='lg' />
                      <Text color="#7F8B9F">Sou uma Pessoa Politicamente Exposta</Text>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2} />
                  <Box>
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
                  </Box>
                  <GridItem colSpan={2} />
                  <GridItem colSpan={2}>
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
                  </GridItem>
                  <GridItem colSpan={2}>
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
                <Text borderTop='1px' borderColor="#CBD3E0" mt="40px" py="25px">ENDEREÇO:</Text>
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
                      {...register('zip_code')}
                      error={formState?.errors?.zip_code}
                    />
                  </GridItem>
                  <GridItem colSpan={2} />
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
                      {...register('address')}
                      error={formState?.errors?.address}
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
                      {...register('number')}
                      error={formState?.errors?.number}
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
                      {...register('neighborhood')}
                      error={formState?.errors?.neighborhood}
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
                      {...register('state')}
                      error={formState?.errors?.state}
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
                      {...register('city')}
                      error={formState?.errors?.city}
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
                <Flex gap={5} justify="flex-end" pb="20px" pt="40px" >
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
                          setPermissionTab((prev) => [...prev, 7]);
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
                p="30px"
                bg="#FFFFFF"
                borderRadius="6px"
                borderTop="11px solid #00102A"
              >
                <Text fontSize="18px" fontWeight="600" >Passo {currentTab + 1}/8</Text>
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
                          setPermissionTab((prev) => [...prev, 7]);
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
