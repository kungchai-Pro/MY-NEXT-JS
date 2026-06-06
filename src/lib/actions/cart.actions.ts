// Client-side cart utilities — NOT server actions; no "use server" directive.
// CartProvider calls these helpers to sync React state with localStorage.
import type { CartItem } from "@/types/cart";

const CART_KEY = "shopnext_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function addToCart(item: CartItem): CartItem[] {
  const cart = getCart();
  const existing = cart.find((c) => c.productId === item.productId);

  const updated: CartItem[] = existing
    ? cart.map((c) =>
        c.productId === item.productId
          ? { ...c, qty: c.qty + item.qty }
          : c
      )
    : [...cart, item];

  localStorage.setItem(CART_KEY, JSON.stringify(updated));
  return updated;
}

export function removeFromCart(productId: string): CartItem[] {
  const updated = getCart().filter((c) => c.productId !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(updated));
  return updated;
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}
