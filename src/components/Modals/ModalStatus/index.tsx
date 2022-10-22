import React from 'react';
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

interface IModalStatus extends Omit<ModalProps, 'children'> {
  variant: 'success' | 'alert' | 'error';
  icon?: string;
  title?: string;
  description?: string;
  titleButton: string;
  handleClick?: () => void;
  route?: string;
}

export function ModalStatus({
  variant,
  icon,
  title,
  titleButton,
  description,
  isOpen,
  route,
  handleClick,
  onClose,
  ...rest
}: IModalStatus) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus
      motionPreset="slideInBottom"
      {...rest}
    >
      <ModalOverlay />
      <ModalContent color="#fff">
        <ModalHeader
          bg={
            variant === 'success'
              ? '#27AE60'
              : variant === 'error'
              ? '#F03D3E'
              : '#FFA928'
          }
          borderTopRadius="5px"
        >
          <Flex
            flexDir="column"
            borderTopRadius="5px"
            color="#fff"
            justify="center"
            align="center"
            h="170px"
          >
            <Icon
              icon={
                variant === 'success'
                  ? 'bi:check-circle'
                  : variant === 'error'
                  ? 'ant-design:close-circle-outlined'
                  : 'carbon:warning'
              }
              width={55}
            />
            <Text
              color="#FFFFFF"
              textAlign="center"
              fontFamily="Lato"
              fontStyle="normal"
              fontWeight="700"
              mt="5px"
              fontSize={!title && variant === 'alert' ? '20px' : '30px'}
              textTransform="uppercase"
            >
              {!title && variant === 'alert'
                ? 'QUER MESMO EXCLUIR DADOS DEFINITIVAMENTE?'
                : title}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody color="#000">
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Text
              mt="55px"
              textAlign="center"
              mb="50px"
              fontSize="18px"
              color="#7F8B9F"
            >
              {!title && variant === 'alert'
                ? 'Esta ação é irreversível'
                : description}
            </Text>
            {variant === 'alert' && !title && (
              <Button
                onClick={onClose}
                bg="#fff"
                color="#2E4EFF"
                border="1px"
                borderColor="#2E4EFF"
                w={{ base: 'full', md: '327px' }}
                fontSize="0.875rem"
                borderRadius="20px"
                h="35px"
                textTransform="uppercase"
                fontWeight="600"
                padding="8px 1.25rem"
                mb="10px"
              >
                não excluir dados
              </Button>
            )}
            {route ? (
              <Link href={variant === 'success' && route ? route : ''}>
                <Button
                  onClick={() => {
                    if (!handleClick) {
                      return;
                    }
                    handleClick();
                    onClose();
                  }}
                  w={{ base: 'full', md: '327px' }}
                  color="#fff"
                  bg="#2E4EFF"
                  borderRadius="40px"
                  mb="34px"
                  textTransform="uppercase"
                >
                  {titleButton}
                </Button>
              </Link>
            ) : (
              <Button
                onClick={() => {
                  if (!handleClick) {
                    onClose();
                    return;
                  }
                  handleClick();
                  onClose();
                }}
                w={{ base: 'full', md: '327px' }}
                color="#fff"
                bg="#2E4EFF"
                borderRadius="40px"
                mb="34px"
                textTransform="uppercase"
              >
                {titleButton}
              </Button>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
