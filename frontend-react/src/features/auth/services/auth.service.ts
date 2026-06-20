import { apiClient } from '@/shared/lib/api/api-client';

import type { LoginRequest, LoginResponse } from '../types/auth';

export async function login(input: LoginRequest): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>('/api/auth/login', input);
}
