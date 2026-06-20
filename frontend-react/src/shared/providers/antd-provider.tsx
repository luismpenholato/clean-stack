'use client';

import enUS from 'antd/locale/en_US';
import { App, ConfigProvider } from 'antd';
import { type ReactNode } from 'react';

import { useTheme } from '@/shared/theme/context';
import { getAntdTheme } from '@/shared/theme/antd-config';

type AntdProviderProps = {
  children: ReactNode;
};

export function AntdProvider({ children }: AntdProviderProps) {
  const { isDark } = useTheme();

  return (
    <ConfigProvider locale={enUS} theme={getAntdTheme(isDark)}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
