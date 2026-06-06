"use client";
// "use client" is required because this reads CartContext and manages open/close
// UI state that responds to user interactions.

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { PriceTag } from "@/components/PriceTag";

export function CartDrawer() {
  const { items, removeItem, total, isOpen, closeCart, itemCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <aside
        aria-label="ตะกร้าสินค้า"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            ตะกร้าสินค้า{" "}
            <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
              {itemCount}
            </span>
          </h2>
          <button
            onClick={closeCart}
            aria-label="ปิดตะกร้า"
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h11" />
              </svg>
              <p className="text-sm text-gray-500">ตะกร้าว่างเปล่า</p>
              <button onClick={closeCart} className="text-sm font-medium text-brand-600 hover:underline">
                เลือกซื้อสินค้า →
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                      src={item.image || "https://picsum.photos/seed/placeholder/64/64"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-500">จำนวน {item.qty} ชิ้น</p>
                    <PriceTag amount={item.price * item.qty} className="text-sm font-semibold text-brand-700" />
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    aria-label={`นำ ${item.name} ออกจากตะกร้า`}
                    className="self-start p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">รวมทั้งหมด</span>
              <PriceTag amount={total} className="text-lg font-bold text-gray-900" />
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-xl bg-brand-600 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700 active:scale-[0.98] transition-all"
            >
              ดำเนินการสั่งซื้อ
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ดูตะกร้าสินค้า
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
