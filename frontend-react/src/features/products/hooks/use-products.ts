'use client';

import { useQuery } from '@tanstack/react-query';

import { listProducts } from '../services/product.service';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });
}
