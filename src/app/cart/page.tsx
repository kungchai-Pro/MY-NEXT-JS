"use client";
// "use client" is required because the entire cart page reads from CartContext
// and renders interactive quantity controls and remove buttons.

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { PriceTag } from "@/components/PriceTag";

export default function CartPage() {
  const { items, removeItem, clearItems, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 5.6M7 13H5.4M17 13l1.4 5.6M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
        <p className="text-lg font-medium text-gray-900">ตะกร้าว่างเปล่า</p>
        <p className="text-sm text-gray-500">เลือกสินค้าที่คุณชื่นชอบแล้วเพิ่มลงตะกร้า</p>
        <Link
          href="/products"
          className="mt-2 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          ดูสินค้าทั้งหมด
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          ตะกร้าสินค้า{" "}
          <span className="text-base font-normal text-gray-500">
            ({itemCount} รายการ)
          </span>
        </h1>
        <button
          onClick={clearItems}
          className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
        >
          ล้างตะกร้า
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Item list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100">
                <Image
                  src={item.image || "https://picsum.photos/seed/placeholder/96/96"}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <PriceTag
                  amount={item.price}
                  className="text-sm text-gray-500"
                />
                <p className="text-sm text-gray-500">จำนวน {item.qty} ชิ้น</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <PriceTag
                  amount={item.price * item.qty}
                  className="font-bold text-gray-900"
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  aria-label={`นำ ${item.name} ออก`}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  นำออก
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-900">สรุปคำสั่งซื้อ</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>ราคาสินค้า</span>
                <PriceTag amount={total} />
              </div>
              <div className="flex justify-between text-gray-600">
                <span>ค่าจัดส่ง</span>
                <span className="text-green-600 font-medium">ฟรี</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                <span>รวมทั้งหมด</span>
                <PriceTag amount={total} className="text-brand-700" />
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full rounded-xl bg-brand-600 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700 active:scale-[0.98] transition-all"
            >
              ดำเนินการสั่งซื้อ
            </Link>
            <Link
              href="/products"
              className="block text-center text-xs text-brand-600 hover:underline"
            >
              ← เลือกซื้อสินค้าต่อ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
