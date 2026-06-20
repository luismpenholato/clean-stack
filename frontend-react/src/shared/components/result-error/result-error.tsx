'use client';

import { Result } from 'antd';

type ResultErrorProps = {
  title?: string;
  message?: string;
};

export function ResultError({
  title = 'Error',
  message = 'Could not load data.',
}: ResultErrorProps) {
  return <Result status="error" title={title} subTitle={message} />;
}
