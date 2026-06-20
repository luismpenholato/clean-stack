'use client';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Empty, Popconfirm, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';

import {
  formatCurrency,
  getAvatarColor,
  getInitial,
  truncate,
} from '@/shared/lib/utils/format';

import type { Product } from '../types/product';
import styles from './product-table.module.css';

type ProductTableProps = {
  products: Product[];
  loading?: boolean;
  deletingId?: number;
  onDelete: (id: number) => void;
};

export function ProductTable({
  products,
  loading,
  deletingId,
  onDelete,
}: ProductTableProps) {
  const router = useRouter();

  const columns: ColumnsType<Product> = [
    {
      title: 'Product',
      key: 'product',
      render: (_, product) => (
        <div className={styles.productInfo}>
          <Avatar
            shape="square"
            size={40}
            style={{ backgroundColor: getAvatarColor(product.name) }}
          >
            {getInitial(product.name)}
          </Avatar>
          <div className={styles.productNameGroup}>
            <span className={styles.productName}>{truncate(product.name, 35)}</span>
            <span className={styles.productId}>#{product.id}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value: number) => (
        <span className={styles.priceValue}>{formatCurrency(value)}</span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'],
      render: (value?: string | null) => (
        <Tooltip title={value || 'No description'}>
          <span className={styles.descriptionText}>
            {value ? truncate(value, 50) : '—'}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) =>
        isActive ? (
          <Tag color="success" className={styles.statusTag}>
            Active
          </Tag>
        ) : (
          <Tag color="error" className={styles.statusTag}>
            Inactive
          </Tag>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      width: 128,
      render: (_, product) => (
        <div className="table-row-actions">
          <Tooltip title="Edit">
            <Button
              type="text"
              shape="circle"
              aria-label="Edit product"
              icon={<EditOutlined style={{ fontSize: 18 }} />}
              onClick={() => router.push(`/products/${product.id}/edit`)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(product.id)}
          >
            <Tooltip title="Delete">
              <Button
                type="text"
                shape="circle"
                danger
                loading={deletingId === product.id}
                icon={<DeleteOutlined style={{ fontSize: 18 }} />}
                aria-label="Delete product"
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.tableCard}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={false}
        locale={{
          emptyText: <Empty description="No products found" />,
        }}
      />
    </div>
  );
}
