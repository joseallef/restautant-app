/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../src/theme/GlobalStyle';
import theme from '../src/theme';
import { WebSiteProvider } from '../src/wrappers/context';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Restaurante</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;1,400;1,700&family=Inconsolata&display=swap" rel="stylesheet" />
      </Head>
      <WebSiteProvider>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </WebSiteProvider>
    </>
  );
}
export default MyApp;
