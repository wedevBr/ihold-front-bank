import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  ModalProps,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Input } from '~/components/input';

interface IModalStatus extends Omit<ModalProps, 'children'> {
  handleClick?: () => void;
  handlePassword: (password: string) => void;
  loading?: boolean;
}

export function ModalAuth({
  isOpen,
  handleClick,
  onClose,
  handlePassword,
  loading,
}: IModalStatus) {
  const [password, setPassword] = useState('');
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent p="10px">
        <ModalHeader>
          <Icon icon="teenyicons:password-outline" color="#21C6DE" width={30} />
          <Text mt="10px">AUTORIZAR PAGAMENTO</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody color="#000">
          <Box>
            <Text mb="30px">
              Digite sua senha de acesso para confirmar a autorização do
              pagamento em lote
            </Text>
            <Input
              top="60%"
              name="Password"
              label=""
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
              value={password}
              onChange={(e) => {
                handlePassword(e.target.value);
                setPassword(e.target.value);
              }}
              // {...register('password')}
              // error={formState?.errors?.password}
            />
            <Button
              onClick={() => {
                if (!handleClick) {
                  return;
                }
                handleClick();
              }}
              isLoading={loading}
              mt="25px"
              mb="30px"
              w="full"
              color="#fff"
              bg="#2E4EFF"
              borderRadius="40px"
            >
              CONFIRMAR
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
