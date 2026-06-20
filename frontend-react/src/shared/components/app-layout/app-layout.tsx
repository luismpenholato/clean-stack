'use client';

import { Drawer, Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';

import { useTheme } from '@/shared/theme/context';

import styles from './app-layout.module.css';

type AppLayoutProps = {
  children: ReactNode;
};

function SunIcon() {
  return (
    <svg
      className={styles.themeIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className={styles.themeIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout className={`app-main-layout ${styles.layout}`}>
      <Layout.Header className={styles.header}>
        <button
          type="button"
          className={styles.menuTrigger}
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <span className={styles.hamburger} />
        </button>

        <Link href="/products" className={styles.title}>
          Boilerplate
        </Link>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.themeToggle}
            aria-label="Toggle theme"
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </Layout.Header>

      <Layout.Content className={styles.content}>
        <div className={styles.container}>{children}</div>
      </Layout.Content>

      <Drawer
        title="Menu"
        placement="left"
        size={280}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        rootClassName="app-drawer"
      >
        <div className={styles.drawerSectionTitle}>Navigation</div>
        <Menu
          className={`drawer-menu ${styles.drawerMenu}`}
          mode="inline"
          selectedKeys={[pathname.startsWith('/products') ? '/products' : pathname]}
          items={[
            {
              key: '/products',
              label: 'Products',
              onClick: () => {
                router.push('/products');
                setDrawerOpen(false);
              },
            },
          ]}
        />
      </Drawer>
    </Layout>
  );
}
