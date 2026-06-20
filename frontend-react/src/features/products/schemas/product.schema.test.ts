import { describe, expect, it } from 'vitest';

import { productSchema } from './product.schema';

describe('productSchema', () => {
  it('should validate a valid product', () => {
    const result = productSchema.safeParse({
      name: 'Test product',
      description: 'Description',
      price: 10,
      isActive: true,
    });

    expect(result.success).toBe(true);
  });

  it('should accept zero price', () => {
    const result = productSchema.safeParse({
      name: 'Test product',
      description: '',
      price: 0,
      isActive: true,
    });

    expect(result.success).toBe(true);
  });

  it('should reject product with invalid price', () => {
    const result = productSchema.safeParse({
      name: 'Test product',
      description: '',
      price: -1,
      isActive: true,
    });

    expect(result.success).toBe(false);
  });
});
