import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { CardValue, Layout } from '~/components';

export default function Home() {
  return (
    <Box h="full">
      <Layout>
        <SimpleGrid
          mt="30px"
          columns={{ base: 1, md: 2, lg: 3 }}
          w="full"
          spacingX="45px"
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <CardValue
              percentage={idx === 0 ? 1 * 20 : idx * 20}
              type={
                idx === 0 ? 'cash-in' : idx === 1 ? 'cash-out' : 'prevision'
              }
              value={1540 * idx + 1}
              key={idx}
            />
          ))}
        </SimpleGrid>
        <Flex
          bg="#FFFFFF"
          w="full"
          h="648px"
          mt="30px"
          borderRadius="6px"
          p="50px"
        >
          <Text>TODOS EXTRATOS</Text>
        </Flex>
      </Layout>
    </Box>
  );
}
