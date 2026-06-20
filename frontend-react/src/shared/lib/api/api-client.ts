import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { authToken } from '@/shared/lib/auth/auth-token';
import { env } from '@/shared/lib/env/env';

import { ApiError, type ApiValidationErrors } from './api-error';

type ApiErrorResponse = {
  title?: string;
  message?: string;
  errors?: ApiValidationErrors;
};

let instance: AxiosInstance | undefined;

function getInstance(): AxiosInstance {
  if (instance) {
    return instance;
  }

  instance = axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = authToken.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
}

function normalizeError(error: unknown): never {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    throw new ApiError('Erro inesperado ao comunicar com a API.', 0);
  }

  const axiosError: AxiosError<ApiErrorResponse> = error;
  const status = axiosError.response?.status ?? 0;
  const data = axiosError.response?.data;

  const message =
    data?.message ??
    data?.title ??
    axiosError.message ??
    'Erro ao comunicar com a API.';

  throw new ApiError(message, status, data?.errors);
}

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await getInstance().request<T>(config);

    return response.data;
  } catch (error) {
    normalizeError(error);
  }
}

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'GET', url }),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'POST', url, data }),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PUT', url, data }),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'DELETE', url }),
};
