export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  isActive: boolean;
  createdAtUtc: string;
}

export interface ExternalProduct {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  category?: string | null;
  image?: string | null;
}

export interface ProductCreateRequest {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  isActive?: boolean;
  importFromExternalId?: number | null;
}

export interface ProductUpdateRequest extends ProductCreateRequest {
  id: number;
}
