'use client';

import { type ReactNode } from 'react';

import { ThemeProvider } from '@/shared/theme/context';

import { AntdProvider } from './antd-provider';
import { QueryProvider } from './query-provider';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AntdProvider>
        <QueryProvider>{children}</QueryProvider>
      </AntdProvider>
    </ThemeProvider>
  );
}
