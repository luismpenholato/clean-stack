import { LoginForm } from '@/features/auth/components/login-form';
import { createPageMetadata } from '@/shared/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Sign in',
  description: 'Access your account.',
});

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <LoginForm />
    </main>
  );
}
