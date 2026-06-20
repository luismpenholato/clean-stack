import { AntdRegistry } from '@ant-design/nextjs-registry';
import { type ReactNode } from 'react';

import { AppProviders } from '@/shared/providers/app-providers';
import { buildThemeInitScript } from '@/shared/theme/init-script';
import { rootMetadata } from '@/shared/lib/seo/metadata';
import '@/shared/theme/styles/globals.css';

export const metadata = rootMetadata;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{ __html: buildThemeInitScript() }}
        />
        <AntdRegistry>
          <AppProviders>{children}</AppProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
