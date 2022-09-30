import {
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface IMenu {
  children: ReactNode;
}

export function MenuDropDwon({ children }: IMenu) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        // variant="ghost"
        mx={1}
        py={[1, 2, 2]}
        px={4}
        borderRadius={5}
        // _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
        aria-label="Courses"
        fontWeight="normal"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        {children}
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
}
