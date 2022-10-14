import React from 'react';
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Input } from '~/components';
import { useForm } from 'react-hook-form';
interface PropsModalEdit {
  type?: 'pix' | 'transfer' | 'bill-payment' | string;
}
export function ModalEditPayment({ type = 'bill-payment' }: PropsModalEdit) {
  const { register, handleSubmit, formState } = useForm({
  });
  return (
    <Box minH="300px" minW="550px">
      {type === "pix" ?
        <>
          <Input
            label="Valor"
            labelColor="#7F8B9F"
            width="40%"
            size="sm"
            bg="transparent"
            fontSize="16px"
            border="0px"
            borderBottom="1px solid #7F8B9F"
            borderRadius={0}
            placeholder="R$0,00"
            _focus={{
              borderBottom: '1px solid #2E4EFF',
            }}
            {...register('value')}
          // error={formState?.errors?.username || any}
          />
          <Flex gap={5} py="5px">
            <Box w="30%"  >
              <Input
                label="Tipo de chave"
                labelColor="#7F8B9F"
                size="sm"
                bg="transparent"
                fontSize="16px"
                border="0px"
                borderBottom="1px solid #7F8B9F"
                borderRadius={0}
                placeholder="E-mail"
                _focus={{
                  borderBottom: '1px solid #2E4EFF',
                }}
                {...register('type')}
              // error={formState?.errors?.username || any}
              />
            </Box>
            <Input
              label="Chave Pix"
              labelColor="#7F8B9F"
              width="100%"
              size="sm"
              bg="transparent"
              fontSize="16px"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="joaodaas@gmail.com"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('value')}
            // error={formState?.errors?.username || any}
            />
          </Flex>
          <SimpleGrid columns={2} gap={5} py="5px">
            <Input
              label="CPF/CNPJ"
              labelColor="#7F8B9F"
              width="90%"
              size="sm"
              bg="transparent"
              fontSize="16px"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="Lorem ipsum"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('value')}
            // error={formState?.errors?.username || any}
            />
            <Input
              label="E-mail"
              labelColor="#7F8B9F"
              width="90%"
              size="sm"
              bg="transparent"
              fontSize="16px"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="mail@example.com"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('value')}
            // error={formState?.errors?.username || any}
            />
            <Input
              label="Agendamento"
              labelColor="#7F8B9F"
              width="90%"
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
              {...register('value')}
            // error={formState?.errors?.username || any}
            />
            <Input
              label="Descrição"
              labelColor="#7F8B9F"
              width="90%"
              size="sm"
              bg="transparent"
              fontSize="16px"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="Lorem ipsum"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('value')}
            // error={formState?.errors?.username || any}
            />
          </SimpleGrid>
        </>
        :
        <>
          {type === "transfer" ? <>
            <Input
              label="Valor"
              labelColor="#7F8B9F"
              width="40%"
              size="sm"
              bg="transparent"
              fontSize="16px"
              border="0px"
              borderBottom="1px solid #7F8B9F"
              borderRadius={0}
              placeholder="R$0,00"
              _focus={{
                borderBottom: '1px solid #2E4EFF',
              }}
              {...register('value')}
            // error={formState?.errors?.username || any}
            />
            <Flex gap={5} py="5px">
              <Box w="30%"  >
                <Input
                  label="Tipo de conta"
                  labelColor="#7F8B9F"
                  size="sm"
                  bg="transparent"
                  fontSize="16px"
                  border="0px"
                  borderBottom="1px solid #7F8B9F"
                  borderRadius={0}
                  placeholder="Conta corrente"
                  _focus={{
                    borderBottom: '1px solid #2E4EFF',
                  }}
                  {...register('type')}
                // error={formState?.errors?.username || any}
                />
              </Box>
              <Input
                label="Nome"
                labelColor="#7F8B9F"
                width="100%"
                size="sm"
                bg="transparent"
                fontSize="16px"
                border="0px"
                borderBottom="1px solid #7F8B9F"
                borderRadius={0}
                placeholder="Lorem ipsum"
                _focus={{
                  borderBottom: '1px solid #2E4EFF',
                }}
                {...register('value')}
              // error={formState?.errors?.username || any}
              />
            </Flex>
            <SimpleGrid columns={2} gap={5} py="5px">
              <Input
                label="Banco"
                labelColor="#7F8B9F"
                width="90%"
                size="sm"
                bg="transparent"
                fontSize="16px"
                border="0px"
                borderBottom="1px solid #7F8B9F"
                borderRadius={0}
                placeholder="341 - ITAU UNIBANCO S.A."
                _focus={{
                  borderBottom: '1px solid #2E4EFF',
                }}
                {...register('value')}
              // error={formState?.errors?.username || any}
              />
              <Input
                label="CPF/CNPJ"
                labelColor="#7F8B9F"
                width="90%"
                size="sm"
                bg="transparent"
                fontSize="16px"
                border="0px"
                borderBottom="1px solid #7F8B9F"
                borderRadius={0}
                placeholder="0000000000000"
                _focus={{
                  borderBottom: '1px solid #2E4EFF',
                }}
                {...register('value')}
              // error={formState?.errors?.username || any}
              />
              <Input
                label="Agência"
                labelColor="#7F8B9F"
                width="90%"
                size="sm"
                bg="transparent"
                fontSize="16px"
                border="0px"
                borderBottom="1px solid #7F8B9F"
                borderRadius={0}
                placeholder="000-0"
                _focus={{
                  borderBottom: '1px solid #2E4EFF',
                }}
                {...register('value')}
              // error={formState?.errors?.username || any}
              />
              <Input
                label="Conta"
                labelColor="#7F8B9F"
                width="90%"
                size="sm"
                bg="transparent"
                fontSize="16px"
                border="0px"
                borderBottom="1px solid #7F8B9F"
                borderRadius={0}
                placeholder="000000-0"
                _focus={{
                  borderBottom: '1px solid #2E4EFF',
                }}
                {...register('value')}
              // error={formState?.errors?.username || any}
              />
              <Input
                label="Agendamento"
                labelColor="#7F8B9F"
                width="90%"
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
                {...register('value')}
              // error={formState?.errors?.username || any}
              />
              <Input
                label="Descrição"
                labelColor="#7F8B9F"
                width="90%"
                size="sm"
                bg="transparent"
                fontSize="16px"
                border="0px"
                borderBottom="1px solid #7F8B9F"
                borderRadius={0}
                placeholder="Lorem ipsum"
                _focus={{
                  borderBottom: '1px solid #2E4EFF',
                }}
                {...register('value')}
              // error={formState?.errors?.username || any}
              />
            </SimpleGrid>
          </> :
            <>
              {type === "bill-payment" &&
                <>
                  <Input
                    label="Valor"
                    labelColor="#7F8B9F"
                    width="40%"
                    size="sm"
                    bg="transparent"
                    fontSize="16px"
                    border="0px"
                    borderBottom="1px solid #7F8B9F"
                    borderRadius={0}
                    placeholder="R$0,00"
                    _focus={{
                      borderBottom: '1px solid #2E4EFF',
                    }}
                    {...register('value')}
                  // error={formState?.errors?.username || any}
                  />
                    <Box w="95%" py="5px"  >
                      <Input
                        label="Linha digitável"
                        labelColor="#7F8B9F"
                        size="sm"
                        bg="transparent"
                        fontSize="16px"
                        border="0px"
                        borderBottom="1px solid #7F8B9F"
                        borderRadius={0}
                        placeholder="000000000000000000000000000000000000000000000000000000000000000000000000"
                        _focus={{
                          borderBottom: '1px solid #2E4EFF',
                        }}
                        {...register('type')}
                      // error={formState?.errors?.username || any}
                      />
                    </Box>
                  <SimpleGrid columns={2} gap={5} py="5px">
                  <Input
                      label="Agendamento"
                      labelColor="#7F8B9F"
                      width="90%"
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
                      {...register('value')}
                    // error={formState?.errors?.username || any}
                    />
                     <Input
                      label="Pagamento"
                      labelColor="#7F8B9F"
                      width="90%"
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
                      {...register('value')}
                    // error={formState?.errors?.username || any}
                    />
                    <Input
                      label="CPF/CNPJ"
                      labelColor="#7F8B9F"
                      width="90%"
                      size="sm"
                      bg="transparent"
                      fontSize="16px"
                      border="0px"
                      borderBottom="1px solid #7F8B9F"
                      borderRadius={0}
                      placeholder="0000000000000"
                      _focus={{
                        borderBottom: '1px solid #2E4EFF',
                      }}
                      {...register('value')}
                    // error={formState?.errors?.username || any}
                    />
                  </SimpleGrid>
                </>
              }
            </>
          }
        </>
      }

      <Flex gap={5} justify="flex-end" py="20px" >
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
          >
            SALVAR
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
