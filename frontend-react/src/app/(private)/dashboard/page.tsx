'use client';

import { Card, Col, Row, Statistic } from 'antd';

import { PageHeader } from '@/shared/components/page-header/page-header';

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="System overview." />

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Products" value={128} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Active" value={112} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Inactive" value={16} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
