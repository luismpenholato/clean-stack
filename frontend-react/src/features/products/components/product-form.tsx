'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  App,
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  productSchema,
  type ProductFormValues,
} from '../schemas/product.schema';
import { useExternalProducts } from '../hooks/use-external-products';
import { formatCurrency } from '@/shared/lib/utils/format';

import styles from './product-form.module.css';

type ProductFormProps = {
  mode: 'create' | 'edit';
  initialValues?: ProductFormValues;
  submitting?: boolean;
  onSubmit: (payload: ProductFormSubmitPayload) => Promise<void> | void;
  onCancel: () => void;
};

export type ProductFormSubmitPayload =
  | {
      type: 'manual';
      values: ProductFormValues;
    }
  | {
      type: 'import';
      importFromExternalId: number;
      isActive: boolean;
    };

export function ProductForm({
  mode,
  initialValues,
  submitting,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const { message } = App.useApp();
  const [importFromExternal, setImportFromExternal] = useState(false);
  const [selectedExternalId, setSelectedExternalId] = useState<number | null>(
    null,
  );

  const externalProductsQuery = useExternalProducts(
    mode === 'create' && importFromExternal,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues ?? {
      name: '',
      description: '',
      price: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const fieldsDisabled = mode === 'create' && importFromExternal;

  function handleImportToggle(checked: boolean) {
    setImportFromExternal(checked);
    setSelectedExternalId(null);
  }

  async function handleFormSubmit(values: ProductFormValues) {
    if (mode === 'edit') {
      const result = productSchema.safeParse(values);

      if (!result.success) {
        message.warning('Fill in the required fields.');
        return;
      }

      if (!values.name.trim()) {
        message.warning('Enter the product name.');
        return;
      }

      await onSubmit({ type: 'manual', values: result.data });
      return;
    }

    if (importFromExternal && selectedExternalId != null) {
      await onSubmit({
        type: 'import',
        importFromExternalId: selectedExternalId,
        isActive: values.isActive,
      });
      return;
    }

    if (!values.name.trim() || values.price < 0) {
      message.warning('Enter the product name.');
      return;
    }

    await onSubmit({ type: 'manual', values });
  }

  return (
    <section className={styles.formContent}>
      <Form
        layout="vertical"
        className={styles.productForm}
        onFinish={handleSubmit(handleFormSubmit)}
      >
        {mode === 'create' && (
          <Form.Item>
            <Checkbox
              checked={importFromExternal}
              onChange={(event) => handleImportToggle(event.target.checked)}
            >
              Import from external API (Fake Store)
            </Checkbox>
          </Form.Item>
        )}

        {mode === 'create' && importFromExternal && (
          <Form.Item label="External API product" required>
            <Select
              size="large"
              showSearch
              allowClear
              placeholder="Select a product..."
              loading={externalProductsQuery.isLoading}
              value={selectedExternalId ?? undefined}
              onChange={(value) => setSelectedExternalId(value ?? null)}
              options={(externalProductsQuery.data ?? []).map((product) => ({
                value: product.id,
                label: `${product.title} — ${formatCurrency(product.price)}`,
              }))}
            />
          </Form.Item>
        )}

        {mode === 'create' && importFromExternal && (
          <Divider plain>Additional options</Divider>
        )}

        <div className={styles.formRow}>
          <Form.Item
            className={styles.flex2}
            label="Name"
            required={!fieldsDisabled}
            validateStatus={errors.name ? 'error' : undefined}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Product name"
                  disabled={fieldsDisabled}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            className={styles.flex1}
            label="Price ($)"
            required={!fieldsDisabled}
            validateStatus={errors.price ? 'error' : undefined}
            help={errors.price?.message}
          >
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  precision={2}
                  decimalSeparator="."
                  prefix="$"
                  placeholder="0.00"
                  disabled={fieldsDisabled}
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? 0)}
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          validateStatus={errors.description ? 'error' : undefined}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={3}
                placeholder="Product description (optional)"
                disabled={fieldsDisabled}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
              >
                Active product
              </Checkbox>
            )}
          />
        </Form.Item>

        <div className={styles.formActions}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Save
          </Button>
        </div>
      </Form>
    </section>
  );
}
