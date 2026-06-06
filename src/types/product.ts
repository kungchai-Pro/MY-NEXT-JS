// MVP 1 — no Firebase dependency.
// When integrating Firestore, restore the firebase-admin imports and
// replace `Date` with `Timestamp`, then re-add the productConverter.

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  createdAt: Date;
}

// Serializable shape for the Server → Client component boundary.
export interface SerializedProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  createdAt: string; // ISO 8601
}

export function serializeProduct(p: Product): SerializedProduct {
  return { ...p, createdAt: p.createdAt.toISOString() };
}
