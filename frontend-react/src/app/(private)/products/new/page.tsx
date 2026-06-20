import { ProductCreatePage } from '@/features/products/product-create.page';
import { createPageMetadata } from '@/shared/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'New product',
  description: 'Create a new product in the catalog.',
});

export default function NewProductRoutePage() {
  return <ProductCreatePage />;
}
