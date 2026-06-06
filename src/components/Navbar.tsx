"use client";
// "use client" is required because the cart icon displays a live badge count
// from CartContext and the cart button triggers the drawer open action.

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function Navbar() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-16 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-brand-700 hover:text-brand-800 transition-colors"
        >
          ShopNext
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-brand-700 transition-colors">
            หน้าแรก
          </Link>
          <Link href="/products" className="hover:text-brand-700 transition-colors">
            สินค้าทั้งหมด
          </Link>
          <Link href="/orders" className="hover:text-brand-700 transition-colors">
            คำสั่งซื้อ
          </Link>
        </nav>

        {/* Cart button */}
        <button
          onClick={openCart}
          aria-label={`เปิดตะกร้าสินค้า (${itemCount} รายการ)`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 5.6M7 13H5.4M17 13l1.4 5.6M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
            />
          </svg>
          {itemCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
            >
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
