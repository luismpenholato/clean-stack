import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().max(120, 'Name must be at most 120 characters.'),
  description: z.string().optional(),
  price: z.number().min(0, 'Enter a valid price.'),
  isActive: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
