import { apiClient } from '@/shared/lib/api/api-client';

import type {
  ExternalProduct,
  Product,
  ProductCreateRequest,
  ProductUpdateRequest,
} from '../types/product';

const baseUrl = '/api/products';

export async function listProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>(baseUrl);
}

export async function listExternalProducts(): Promise<ExternalProduct[]> {
  return apiClient.get<ExternalProduct[]>(`${baseUrl}/external`);
}

export async function getProduct(id: number | string): Promise<Product> {
  return apiClient.get<Product>(`${baseUrl}/${id}`);
}

export async function createProduct(input: ProductCreateRequest): Promise<Product> {
  return apiClient.post<Product>(baseUrl, input);
}

export async function updateProduct(
  id: number | string,
  input: ProductUpdateRequest,
): Promise<Product> {
  return apiClient.put<Product>(`${baseUrl}/${id}`, input);
}

export async function deleteProduct(id: number | string): Promise<void> {
  return apiClient.delete<void>(`${baseUrl}/${id}`);
}
