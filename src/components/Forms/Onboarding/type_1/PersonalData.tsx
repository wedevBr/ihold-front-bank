import React, { useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  GridItem,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import {
  FormState,
  UseFormRegister,
  FieldValues,
  UseFormTrigger,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';
import { Input } from '~/components/input';
import { ISchemaCredentials } from '~/pages/onboarding/type-1';
import { Client, documentType } from '~/types/onBoarding';
import { getLocalStorage, setLocalStorage } from '~/utils/localStorageFormat';

interface IClientProps {
  register: UseFormRegister<ISchemaCredentials>;
  trigger: UseFormTrigger<ISchemaCredentials>;
  error: FormState<ISchemaCredentials>;
  getValues: UseFormGetValues<ISchemaCredentials>;
  setValue: UseFormSetValue<ISchemaCredentials>;
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
  setValueID: (string: any) => void;
}
export function FormPersonalData({
  error,
  currentTab,
  register,
  trigger,
  setValue,
  setCurrentTab,
  getValues,
  setPermissionTab,
  setValueID
}: IClientProps) {
  const dateRef = useRef<HTMLInputElement>(null);
  return (
    <Box
      p="30px"
      bg="#FFFFFF"
      borderRadius="6px"
      borderTop="11px solid #00102A"
    >
      <Text fontSize="18px" fontWeight="600">
        Passo {currentTab + 1}/5
      </Text>
      <Text pt="10px" pb="30px" color="#7F8B9F">
        Para começar, me fale um pouco mais sobre você
      </Text>
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
            placeholder=""
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('PersonalData.register_name')}
            error={error.errors?.PersonalData?.register_name}
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
            {...register('PersonalData.nif_number')}
            error={error.errors?.PersonalData?.nif_number}
          />
        </Box>
      </Flex>
      <Flex w="full" justify="space-between" my="20px">
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
            {...register('PersonalData.birth_date')}
            error={error.errors?.PersonalData?.birth_date}
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
            placeholder=""
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('PersonalData.mother_name')}
            error={error.errors?.PersonalData?.mother_name}
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
                    // error={formState?.errors?.PersonalData??.key_type}
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
            {...register('PersonalData.phone.number')}
            error={error.errors?.PersonalData?.phone?.number}
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
            {...register('PersonalData.email')}
            error={error.errors?.PersonalData?.email}
          />
        </Box>
      </Flex>
      <Text>Documento de identificação:</Text>
      <Flex w="full" justify="space-between" my="20px">
        <RadioGroup onChange={setValueID} >
          <Flex w="full">
            <Flex
              align="center"
              boxShadow="md"
              h="50px"
              borderRadius="4px"
              mr="10px"
            >
              <Radio value="NATIONAL_ID" p="20px" >
                RG
              </Radio>
            </Flex>
            <Flex
              align="center"
              boxShadow="md"
              h="50px"
              borderRadius="4px"
            >
              <Radio value="NATIONAL_DRIVE_LICENSE" p="20px" >
                CNH
              </Radio>
            </Flex>
          </Flex>
        </RadioGroup>
      </Flex>
      <Flex w="full" justify="space-between" my="20px">
        <Box w="full" mr="20px">
          <Input
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
              '::file-selector-button': {
                display: 'none',
              },
            }}
            {...register('Documents.front_document.file')}
            error={error.errors?.Documents?.front_document?.file}
          />
        </Box>
        <Box w="full">
          <Input
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
              '::file-selector-button': {
                display: 'none',
              },
            }}
            {...register('Documents.back_documment.file')}
            error={error.errors?.Documents?.back_documment?.file}
          />
        </Box>
      </Flex>
      <Flex w="full" justify="space-between" my="20px">
        <Box w="full" mr="20px">
          <Input
            label="Selfie"
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
              '::file-selector-button': {
                display: 'none',
              },
            }}
            {...register('Documents.selfie.file')}
            error={error.errors?.Documents?.selfie?.file}
          />
        </Box>
        <Box w="full" />
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
              const validation = await trigger([
                'PersonalData.register_name',
                'PersonalData.nif_number',
                'PersonalData.birth_date',
                'PersonalData.mother_name',
                'PersonalData.email',
                'PersonalData.phone.number'
              ]);
              if (validation) {
                setLocalStorage('PersonalDataLocal', getValues('PersonalData'));
                setCurrentTab((current: any) => current + 1);
                setPermissionTab((prev: any) => [...prev, 1]);
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
