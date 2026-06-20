'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProduct } from '../services/product.service';
import type { ProductUpdateRequest } from '../types/product';

type UpdateProductInput = {
  id: number | string;
  data: ProductUpdateRequest;
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductInput) => updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
    },
  });
}
