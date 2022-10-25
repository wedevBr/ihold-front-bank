import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Header } from '~/components';
import { MenuDropDwon } from '../Menu';

export function NavBar() {
  const { asPath, query } = useRouter();

  const routes = [
    {
      name: 'CONTA DIGITAL',
      path: '/home',
      icon: <Icon icon="akar-icons:home" color="#21C6DE" width={25} />,
    },
    {
      name: 'CARTÕES',
      path: '',
      icon: <Icon icon="lucide:credit-card" color="#21C6DE" width={27} />,
    },
    {
      name: 'CRIPTOATIVOS',
      path: '',
      icon: <Icon icon="bi:phone" color="#21C6DE" width={26} />,
    },
    {
      name: 'PAGAMENTOS',
      path: ['/payment', '/payment/review'],
      icon: <Icon icon="mdi:qrcode-scan" color="#21C6DE" width={25} />,
    },
    {
      name: 'EXTRATOS',
      path: '/home/all-statements',
      subMenu: [
        {
          name: 'Extrato',
          path: '/home/all-statements',
        },
        {
          name: 'Pix',
          path: '/home/pix',
        },
        {
          name: 'TED',
          path: '/home/ted',
        },
        {
          name: 'Boleto',
          path: '/home/ticket',
        },
        // {
        //   name: 'Cartões',
        //   path: '/home/cards',
        // },
      ],
      icon: <Icon icon="ion:wallet-outline" color="#21C6DE" width={26} />,
    },
    {
      name: 'API',
      path: 'https://staging.banking.wedev.software/api/documentation',
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
            const route = item.name === 'PAGAMENTOS' ? item.path[0] : item.path;
            return item.name === 'API' ? (
              <Center key={idx}>
                <a target="_blank" href={route as string} rel="noreferrer">
                  <Center
                    cursor="pointer"
                    mb="7px"
                    borderWidth=" 0px  0px 3.5px 0px"
                    borderColor={
                      item.path.includes(asPath) ? '#00102A' : '#FFFFFF'
                    }
                  >
                    <MenuDropDwon subMenus={item?.subMenu}>
                      <Flex>
                        {item.icon}
                        <Text
                          ml="10px"
                          color={!item.path ? '#ccc' : '#00102A'}
                          size="1rem"
                          fontWeight="700"
                        >
                          {item.name}
                        </Text>
                      </Flex>
                    </MenuDropDwon>
                  </Center>
                </a>
              </Center>
            ) : (
              <Link
                href={route as string}
                style={{ marginBottom: '10px', border: '1px solid #000' }}
                key={idx}
              >
                <Center
                  cursor="pointer"
                  mb="7px"
                  borderWidth=" 0px  0px 3.5px 0px"
                  borderColor={
                    item.path.includes(asPath) ? '#00102A' : '#FFFFFF'
                  }
                >
                  <MenuDropDwon subMenus={item?.subMenu}>
                    <Flex>
                      {item.icon}
                      <Text
                        ml="10px"
                        color={!item.path ? '#ccc' : '#00102A'}
                        size="1rem"
                        fontWeight="700"
                      >
                        {item.name}
                      </Text>
                    </Flex>
                  </MenuDropDwon>
                </Center>
              </Link>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
