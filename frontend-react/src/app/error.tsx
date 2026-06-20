'use client';

import { Button, Result } from 'antd';

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <Result
      status="error"
      title="Unexpected error"
      subTitle="An error occurred while loading this page."
      extra={
        <Button type="primary" onClick={reset}>
          Try again
        </Button>
      }
    />
  );
}
