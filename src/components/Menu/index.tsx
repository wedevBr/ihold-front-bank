import {
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export interface ISubMenus {
  name: string;
  path: string;
}

interface IMenu {
  children: ReactNode;
  subMenus?: ISubMenus[];
}

export function MenuDropDwon({ children, subMenus }: IMenu) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        // variant="ghost"
        mx={1}
        py={[1, 2, 2]}
        px={4}
        // borderRadius={5}
        // _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
        aria-label="Courses"
        fontWeight="normal"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        {children}
      </MenuButton>
      {subMenus && (
        <MenuList
          boxShadow="xl"
          minW="300px"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          borderWidth=" 0px  0px 3.5px 0px"
          borderColor="#00102A"
          borderRadius={0}
        >
          {subMenus &&
            subMenus?.map((item, key) => (
              <Link href={item.path} key={key}>
                <MenuItem color="#21C6DE">{item.name}</MenuItem>
              </Link>
            ))}
        </MenuList>
      )}
    </Menu>
  );
}
