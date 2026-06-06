// MVP 1 — no Firebase dependency.
// When integrating Firestore, restore the firebase-admin imports and
// replace `Date` with `Timestamp`, then re-add the orderConverter.

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

// Serializable shape for Client components.
export interface SerializedOrder {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string; // ISO 8601
}

export function serializeOrder(o: Order): SerializedOrder {
  return { ...o, createdAt: o.createdAt.toISOString() };
}
