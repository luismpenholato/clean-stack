'use client';

import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { App, Button, Input, Select, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { PageHeader } from '@/shared/components/page-header/page-header';
import { ResultError } from '@/shared/components/result-error/result-error';
import { formatCurrency } from '@/shared/lib/utils/format';

import { ProductTable } from './components/product-table';
import { useDeleteProduct } from './hooks/use-delete-product';
import { useProducts } from './hooks/use-products';
import styles from './products.page.module.css';

type StatusFilter = 'all' | 'active' | 'inactive';

export function ProductsPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const productsQuery = useProducts();
  const deleteProductMutation = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<number>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const products = productsQuery.data ?? [];

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        (product.description ?? '').toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && product.isActive) ||
        (statusFilter === 'inactive' && !product.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const metrics = useMemo(() => {
    const activeCount = products.filter((product) => product.isActive).length;
    const inactiveCount = products.length - activeCount;
    const averagePrice =
      products.length === 0
        ? 0
        : products.reduce((sum, product) => sum + product.price, 0) /
          products.length;

    return {
      total: products.length,
      activeCount,
      inactiveCount,
      averagePrice,
    };
  }, [products]);

  async function handleRefresh() {
    setIsRefreshing(true);

    try {
      await productsQuery.refetch();
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      setDeletingId(id);
      await deleteProductMutation.mutateAsync(id);
      message.success('Product deleted.');
    } catch {
      message.error('Could not delete the product.');
    } finally {
      setDeletingId(undefined);
    }
  }

  if (productsQuery.isError) {
    return <ResultError message="Could not load products." />;
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Products"
        subtitle="Manage your product catalog"
        breadcrumb={[
          { label: 'Home', href: '/products' },
          { label: 'Products' },
        ]}
        actions={
          <>
            <Tooltip title="Refresh list">
              <Button
                shape="circle"
                aria-label="Refresh list"
                icon={<ReloadOutlined spin={isRefreshing} style={{ fontSize: 16 }} />}
                onClick={handleRefresh}
              />
            </Tooltip>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => router.push('/products/new')}
            >
              New Product
            </Button>
          </>
        }
      />

      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Total Products</span>
            <span className={styles.metricValue}>{metrics.total}</span>
          </div>
          <div className={`${styles.metricIcon} ${styles.metricIconBlue}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Active</span>
            <span className={styles.metricValue}>{metrics.activeCount}</span>
          </div>
          <div className={`${styles.metricIcon} ${styles.metricIconGreen}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Inactive</span>
            <span className={styles.metricValue}>{metrics.inactiveCount}</span>
          </div>
          <div className={`${styles.metricIcon} ${styles.metricIconRed}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Average Price</span>
            <span className={styles.metricValue}>
              {formatCurrency(metrics.averagePrice)}
            </span>
          </div>
          <div className={`${styles.metricIcon} ${styles.metricIconYellow}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.filterBar}>
        <Input
          size="large"
          className={styles.searchGroup}
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <Select
          size="large"
          className={styles.statusFilter}
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />
      </div>

      <ProductTable
        products={filteredProducts}
        loading={productsQuery.isLoading}
        deletingId={deletingId}
        onDelete={handleDelete}
      />
    </div>
  );
}
