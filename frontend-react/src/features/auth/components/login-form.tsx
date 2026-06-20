'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { authToken } from '@/shared/lib/auth/auth-token';

import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { login } from '../services/auth.service';

export function LoginForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const response = await login(values);

      authToken.set(response.accessToken);
      router.push('/dashboard');
    } catch {
      setError('root', {
        message: 'Invalid email or password.',
      });
    }
  }

  return (
    <Card style={{ width: 420 }}>
      <Typography.Title level={3}>Sign in</Typography.Title>

      {errors.root?.message && (
        <Alert
          type="error"
          message={errors.root.message}
          style={{ marginBottom: 16 }}
        />
      )}

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : undefined}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : undefined}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={isSubmitting}>
          Sign in
        </Button>
      </Form>
    </Card>
  );
}
