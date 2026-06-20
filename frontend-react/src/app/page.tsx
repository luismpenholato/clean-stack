import { redirect } from 'next/navigation';

import { createPageMetadata } from '@/shared/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Products',
  description: 'Manage your product catalog.',
});

export default function HomePage() {
  redirect('/products');
}
