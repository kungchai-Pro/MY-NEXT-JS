import "server-only";
// MVP 1 — in-memory store instead of Firestore.
// Orders are ephemeral (reset on server restart). That's acceptable for local dev.
// Swap this file with the Firebase implementation when credentials are ready.

import type { Order, OrderItem, OrderStatus } from "@/types/order";
import type { CartItem } from "@/types/cart";

// Module-level Map persists across requests in a single Node.js process (dev server).
const store = new Map<string, Order>();

export async function createOrder(
  userId: string,
  cartItems: CartItem[]
): Promise<string> {
  const id = crypto.randomUUID();

  const items: OrderItem[] = cartItems.map((c) => ({
    productId: c.productId,
    name: c.name,
    price: c.price,
    qty: c.qty,
  }));

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  store.set(id, {
    id,
    userId,
    items,
    total,
    status: "pending",
    createdAt: new Date(),
  });

  return id;
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  return [...store.values()]
    .filter((o) => o.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getOrderById(id: string): Promise<Order | null> {
  return store.get(id) ?? null;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<void> {
  const order = store.get(id);
  if (order) store.set(id, { ...order, status });
}
