'use client';

import { Spin } from 'antd';

export default function Loading() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Spin />
    </div>
  );
}
