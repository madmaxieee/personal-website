import { type AppProps } from 'next/app';

import '../styles/globals.css';
import { api } from '../utils/api';

import { MantineProvider } from '@mantine/core';
import { Inter } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <main className={`${inter.variable} font-sans`}>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          withCSSVariables
          theme={{
            colorScheme: 'dark',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </main>
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
