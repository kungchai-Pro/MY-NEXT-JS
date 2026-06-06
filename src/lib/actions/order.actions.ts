"use server";

import { createOrder } from "@/lib/repositories/orderRepository";
import type { CartItem } from "@/types/cart";

/**
 * Writes an order to Firestore via the Admin SDK and returns the new order ID.
 * Called from the checkout form (client component → server action).
 */
export async function placeOrder(
  userId: string,
  cartItems: CartItem[]
): Promise<string> {
  if (!userId) throw new Error("userId is required to place an order");
  if (cartItems.length === 0) throw new Error("Cart is empty");

  const orderId = await createOrder(userId, cartItems);
  return orderId;
}
