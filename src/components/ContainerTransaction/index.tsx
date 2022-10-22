import React, { ReactNode } from 'react';
import {
  Flex,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

interface IContainer {
  tabName: string[];
  children: ReactNode;
  header?: ReactNode;
}

export function ContainerTransaction({
  children,
  tabName,
  header,
}: IContainer) {
  return (
    <Box w="full">
      <Tabs variant="soft-rounded" defaultIndex={0}>
        <Flex align="center" justify="space-between">
          <TabList bg="#F0F0F3" w="min-content" borderRadius="20px" h="35px">
            {tabName &&
              tabName.map((item, idx) => (
                <Tab
                  key={idx}
                  px="30px"
                  _selected={{ color: '#fff', bg: '#2E4EFF' }}
                  color="#7F8B9F"
                  textTransform="uppercase"
                >
                  {item}
                </Tab>
              ))}
          </TabList>
          {header}
        </Flex>
        <TabPanels w="full">{children}</TabPanels>
      </Tabs>
    </Box>
  );
}
