import { ProductEditPage } from '@/features/products/product-edit.page';
import { createPageMetadata } from '@/shared/lib/seo/metadata';

type EditProductRoutePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: EditProductRoutePageProps) {
  const { id } = await params;

  return createPageMetadata({
    title: `Edit product #${id}`,
    description: 'Edit product information.',
  });
}

export default async function EditProductRoutePage({
  params,
}: EditProductRoutePageProps) {
  const { id } = await params;

  return <ProductEditPage id={id} />;
}
