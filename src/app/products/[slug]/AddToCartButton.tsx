"use client";
// "use client" is required to access CartContext and manage quantity state.

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ productId, name, price, qty, image });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">จำนวน</span>
        <div className="flex items-center rounded-lg border border-gray-200">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="ลดจำนวน"
            className="flex h-9 w-9 items-center justify-center rounded-l-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors"
            disabled={qty <= 1}
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold text-gray-900">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(stock, q + 1))}
            aria-label="เพิ่มจำนวน"
            className="flex h-9 w-9 items-center justify-center rounded-r-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors"
            disabled={qty >= stock}
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-400">คงเหลือ {stock} ชิ้น</span>
      </div>

      <button
        onClick={handleAdd}
        disabled={stock === 0}
        className={`rounded-xl py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
          added
            ? "bg-green-600 hover:bg-green-700"
            : "bg-brand-600 hover:bg-brand-700"
        }`}
      >
        {stock === 0 ? "สินค้าหมด" : added ? "เพิ่มแล้ว ✓" : "ใส่ตะกร้า"}
      </button>
    </div>
  );
}
