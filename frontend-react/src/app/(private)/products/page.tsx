import { ProductsPage } from '@/features/products/products.page';
import { createPageMetadata } from '@/shared/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Products',
  description: 'Manage your product catalog.',
});

export default function ProductsRoutePage() {
  return <ProductsPage />;
}
