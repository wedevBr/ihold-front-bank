import React from 'react';
import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { Input } from '~/components/input';
 export type FileProps = {
  path: string;
  lastModified: number;
  slice: () => void;
  stream: () => void;
  text: () => void;
  arrayBuffer: ArrayBuffer;
  name: string;
  size: number;
  type: string;
};
export interface Documents {
  balance:FileProps | string;
   billing:FileProps | string;
     dre:FileProps | string;

}interface IDocumentsProps {
  // register: UseFormRegister<Address>;
  // error: FormState<Address>;
  register: any;
  error: any
  currentTab: number;
  setCurrentTab: (number: any) => void;
  setPermissionTab: (number: any) => void;
}export function FormDocuments({
  error,
  register,
  currentTab,
  setCurrentTab,
  setPermissionTab,
}: IDocumentsProps) {
  return (
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
                    {...register('balance')}
                    error={error.errors.balance}
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
                    {...register('billing')}
                    error={error.errors.billing}
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
                    {...register('dre')}
                    error={error.errors.dre}
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
                        setCurrentTab((current:any) => current + 1);
                        setPermissionTab((prev:any) => [...prev, 6]);
                      }
                      }
                    >
                      SALVAR
                    </Button>
                  </Box>
                </Flex>
              </Box>
  );
}