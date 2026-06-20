export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  isActive: boolean;
  createdAtUtc: string;
};

export type ExternalProduct = {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  category?: string | null;
  image?: string | null;
};

export type ProductCreateRequest = {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  isActive?: boolean;
  importFromExternalId?: number | null;
};

export type ProductUpdateRequest = {
  name: string;
  description?: string | null;
  price: number;
  isActive: boolean;
};
