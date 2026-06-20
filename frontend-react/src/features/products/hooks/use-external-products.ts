'use client';

import { useQuery } from '@tanstack/react-query';

import { listExternalProducts } from '../services/product.service';

export function useExternalProducts(enabled: boolean) {
  return useQuery({
    queryKey: ['products', 'external'],
    queryFn: listExternalProducts,
    enabled,
  });
}
