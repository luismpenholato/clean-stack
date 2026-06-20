type Env = {
  apiBaseUrl: string;
  appName: string;
};

const DEFAULT_DEV_API_BASE_URL = 'http://localhost:5000';

function getApiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (value) {
    return value;
  }

  if (process.env.NODE_ENV === 'development') {
    return DEFAULT_DEV_API_BASE_URL;
  }

  throw new Error(
    'Environment variable NEXT_PUBLIC_API_BASE_URL is required. Copy .env.example to .env.local and rebuild.',
  );
}

export const env: Env = {
  apiBaseUrl: getApiBaseUrl(),
  appName: process.env.NEXT_PUBLIC_APP_NAME?.trim() ?? 'CleanStack',
};
