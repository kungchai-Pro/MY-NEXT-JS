"use client";
// "use client" is required to manage form state, read CartContext, and call
// the placeOrder server action from the browser.

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { placeOrder } from "@/lib/actions/order.actions";
import { PriceTag } from "@/components/PriceTag";

interface CheckoutFormProps {
  userId: string;
}

export function CheckoutForm({ userId }: CheckoutFormProps) {
  const router = useRouter();
  const { items, total, clearItems } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) {
      setError("ตะกร้าว่างเปล่า กรุณาเพิ่มสินค้าก่อน");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderId = await placeOrder(userId, items);
      clearItems();
      router.push(`/orders/${orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
      {/* Shipping details */}
      <div className="lg:col-span-2 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900">ข้อมูลการจัดส่ง</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              ชื่อ-นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="สมชาย ใจดี"
              className={inputCls}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="phone">
              เบอร์โทรศัพท์ <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08X-XXX-XXXX"
              className={inputCls}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="address">
            ที่อยู่จัดส่ง <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
            className={`${inputCls} resize-none`}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>

      {/* Order summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900">สรุปคำสั่งซื้อ</h2>

          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between text-gray-600">
                <span className="line-clamp-1 max-w-[60%]">
                  {item.name} ×{item.qty}
                </span>
                <PriceTag amount={item.price * item.qty} />
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 pt-3 space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>ค่าจัดส่ง</span>
              <span className="text-green-600 font-medium">ฟรี</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>รวม</span>
              <PriceTag amount={total} className="text-brand-700" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || items.length === 0}
            className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "กำลังดำเนินการ…" : "ยืนยันคำสั่งซื้อ"}
          </button>
        </div>
      </div>
    </form>
  );
}
