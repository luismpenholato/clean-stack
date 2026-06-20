'use client';

import { useQuery } from '@tanstack/react-query';

import { getProduct } from '../services/product.service';

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
}
