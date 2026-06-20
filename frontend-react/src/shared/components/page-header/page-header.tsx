'use client';

import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { type ReactNode } from 'react';

import styles from './page-header.module.css';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
}: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.text}>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        {breadcrumb && breadcrumb.length > 0 && (
          <Breadcrumb
            className={styles.breadcrumb}
            separator=">"
            items={breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;

              if (item.href && !isLast) {
                return {
                  title: <Link href={item.href}>{item.label}</Link>,
                };
              }

              return { title: item.label };
            })}
          />
        )}
      </div>

      {actions && (
        <div className={styles.actions} style={{ gap: 10 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
