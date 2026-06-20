import type { Metadata } from 'next';
import { type ReactNode } from 'react';

import { createPageMetadata } from '@/shared/lib/seo/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Dashboard',
  description: 'Visão geral do sistema.',
});

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return children;
}
