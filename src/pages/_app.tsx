import '~/styles/fonts';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { QueryClientProvider } from 'react-query';
import { AuthProvider } from '~/context/AuthContext';
import { theme } from '~/styles/theme';
import { authPageProps } from '~/utils/authPageProps';
import { queryClient } from '~/services/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <NextNprogress
            color="#21C6DE"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow
          />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
MyApp.getInitialProps = authPageProps;

export default MyApp;
