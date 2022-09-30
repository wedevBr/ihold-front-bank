import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { MdOutlineDashboard } from 'react-icons/md';
import {
  BsPeople,
  BsGraphUp,
  BsShieldCheck,
  BsCreditCard,
} from 'react-icons/bs';
import { RiSendPlane2Line } from 'react-icons/ri';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Header } from '~/components';
import { MenuDropDwon } from '../Menu';

export function NavBar() {
  const { asPath, query } = useRouter();

  const routes = [
    {
      name: 'HOME ',
      path: '/home',
      icon: <Icon icon="akar-icons:home" color="#21C6DE" width={25} />,
    },
    {
      name: 'CONTA DIGITAL',
      path: '',
      icon: <Icon icon="bi:phone" color="#21C6DE" width={26} />,
    },
    {
      name: 'CARTÕES',
      path: '',
      icon: <Icon icon="lucide:credit-card" color="#21C6DE" width={27} />,
    },
    {
      name: 'PAGAMENTOS',
      path: '/payment',
      icon: <Icon icon="mdi:qrcode-scan" color="#21C6DE" width={25} />,
    },
    {
      name: 'DEPOSITAR',
      path: '',
      icon: <Icon icon="ion:wallet-outline" color="#21C6DE" width={26} />,
    },
    {
      name: 'DUVIDAS',
      path: '/',
      icon: (
        <Icon
          icon="ant-design:question-circle-outlined"
          color="#21C6DE"
          width={25}
        />
      ),
    },
  ];

  return (
    <Box bg="#F0F0F3" w="full">
      <Header name="" />
      <Box bg="#FFFFFF" h="75px">
        <Flex
          w="full"
          justify="space-between"
          h="100%"
          maxW="1200px"
          mx="auto"
          px={{ base: '10px', md: '20px' }}
        >
          {routes.map((item, idx) => {
            return (
              <MenuDropDwon key={idx}>
                <Link href={item.path} style={{ marginBottom: '10px' }}>
                  <Center
                    cursor="pointer"
                    borderWidth=" 0px  0px 3.5px 0px"
                    borderColor={
                      item.path.includes(asPath) ? '#00102A' : '#FFFFFF'
                    }
                    mb="7px"
                  >
                    {item.icon}
                    <Text
                      ml="10px"
                      color={!item.path ? '#ccc' : '#00102A'}
                      size="1rem"
                      fontWeight="700"
                    >
                      {item.name}
                    </Text>
                  </Center>
                </Link>
              </MenuDropDwon>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
