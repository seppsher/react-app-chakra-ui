import '../index.css';

import React from 'react';

import type { Metadata } from 'next';

import { Providers } from './providers';
// import { LoaderProvider } from '@/components/Loader';
import { Toaster } from '../components/ui/toaster';
import { Provider } from '@/components/ui/provider';
import TranslationProvider from './translationProvider';
import Navigation from '@/components/Navigation';
import { LoaderProvider } from '@/components/Loader';

export const metadata: Metadata = {
  title: 'modern-web-stack',
  description: 'Web site created with Next.js.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body suppressHydrationWarning>
        <div id="root">
          <Providers>
            <Provider>
              <TranslationProvider lng="en">
                <LoaderProvider>
                  <Navigation />
                  {children}
                  <Toaster />
                </LoaderProvider>
              </TranslationProvider>
            </Provider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
