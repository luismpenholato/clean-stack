import { type ReactNode } from 'react';

import { AppLayout } from '@/shared/components/app-layout/app-layout';

type PrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
