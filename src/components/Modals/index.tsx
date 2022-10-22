import {
  CloseButton,
  Flex,
  Text,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal as ChakraModal,
  ModalProps as ModalChakraModal,
} from '@chakra-ui/react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

interface ModalProps extends ModalChakraModal {
  title?: string;
  padding?: string;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

export function Modal({
  children,
  title,
  isOpen,
  refetch,
  onClose,
  padding,
  ...rest
}: ModalProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent
        maxW="max-content"
        minW="500px"
        bg="transparent"
        shadow="none"
      >
        <Flex justifyContent="flex-end">
          <CloseButton
            onClick={onClose}
            color="white"
            justifySelf="flex-end"
            _focus={{ borderColor: 'white' }}
          />
        </Flex>
        <ModalHeader
          borderTop="4px"
          borderColor="#00102A"
          bg="white"
          borderTopRadius="6px"
          padding={padding || ''}
        >
          <Text textAlign="left" fontSize="18px" lineHeight="21px">
            {title}
          </Text>
        </ModalHeader>
        <ModalBody bg="white" borderBottomRadius="6px" padding={padding || ''}>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
