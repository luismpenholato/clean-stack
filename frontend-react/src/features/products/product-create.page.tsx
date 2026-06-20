'use client';

import { App } from 'antd';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/shared/components/page-header/page-header';

import {
  ProductForm,
  type ProductFormSubmitPayload,
} from './components/product-form';
import { useCreateProduct } from './hooks/use-create-product';

export function ProductCreatePage() {
  const router = useRouter();
  const { message } = App.useApp();
  const createProductMutation = useCreateProduct();

  async function handleSubmit(payload: ProductFormSubmitPayload) {
    try {
      if (payload.type === 'import') {
        await createProductMutation.mutateAsync({
          importFromExternalId: payload.importFromExternalId,
          isActive: payload.isActive,
        });
      } else {
        await createProductMutation.mutateAsync({
          name: payload.values.name.trim(),
          description: payload.values.description || null,
          price: payload.values.price,
          isActive: payload.values.isActive,
        });
      }

      message.success('Product created.');
      router.push('/products');
    } catch {
      message.error('Could not create the product.');
    }
  }

  return (
    <>
      <PageHeader
        title="New product"
        breadcrumb={[
          { label: 'Home', href: '/products' },
          { label: 'Products', href: '/products' },
          { label: 'New' },
        ]}
      />

      <ProductForm
        mode="create"
        submitting={createProductMutation.isPending}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/products')}
      />
    </>
  );
}
