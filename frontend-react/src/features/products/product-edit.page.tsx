'use client';

import { App, Spin } from 'antd';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/shared/components/page-header/page-header';
import { ResultError } from '@/shared/components/result-error/result-error';

import {
  ProductForm,
  type ProductFormSubmitPayload,
} from './components/product-form';
import { useProduct } from './hooks/use-product';
import { useUpdateProduct } from './hooks/use-update-product';
import formStyles from './components/product-form.module.css';

type ProductEditPageProps = {
  id: string;
};

export function ProductEditPage({ id }: ProductEditPageProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const productQuery = useProduct(id);
  const updateProductMutation = useUpdateProduct();

  async function handleSubmit(payload: ProductFormSubmitPayload) {
    if (payload.type !== 'manual') {
      return;
    }

    try {
      await updateProductMutation.mutateAsync({
        id,
        data: {
          name: payload.values.name.trim(),
          description: payload.values.description || null,
          price: payload.values.price,
          isActive: payload.values.isActive,
        },
      });

      message.success('Product updated.');
      router.push('/products');
    } catch {
      message.error('Could not update the product.');
    }
  }

  if (productQuery.isLoading) {
    return (
      <div className={formStyles.formLoading}>
        <Spin />
      </div>
    );
  }

  if (productQuery.isError || !productQuery.data) {
    return <ResultError message="Could not load the product." />;
  }

  return (
    <>
      <PageHeader
        title="Edit product"
        breadcrumb={[
          { label: 'Home', href: '/products' },
          { label: 'Products', href: '/products' },
          { label: 'Edit' },
        ]}
      />

      <ProductForm
        mode="edit"
        initialValues={{
          name: productQuery.data.name,
          description: productQuery.data.description ?? '',
          price: productQuery.data.price,
          isActive: productQuery.data.isActive,
        }}
        submitting={updateProductMutation.isPending}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/products')}
      />
    </>
  );
}
