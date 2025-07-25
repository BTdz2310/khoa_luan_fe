/* eslint-disable react/no-unknown-property */
import '../styles/globals.scss';
import '../styles/tailwind.css';

import { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import ErrorBoundary from '@components/ErrorBoundary';
import DialogProvider from '@components/Providers/DialogProvider';
import AppLayout from '@layout/AppLayout';

import nextI18nConfig from '../next-i18next.config';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const RobotoFont = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-waterfall',
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content={'index,follow'} />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#476055' />
        <meta name='title' content='Learniverse' />
        <meta name='description' content='Learniverse' />
        <link rel='shortcut icon' href='/static/favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no'
        />
      </Head>

      <style jsx global>{`
        :root {
          --fontRoboto: ${RobotoFont.style.fontFamily};
        }
      `}</style>

      <ErrorBoundary>
        <DialogProvider>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </DialogProvider>
      </ErrorBoundary>
    </>
  );
}

// @ts-ignore
export default appWithTranslation(MyApp, nextI18nConfig);
