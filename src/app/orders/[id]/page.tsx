import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getOrderById } from "@/lib/repositories/orderRepository";
import { PriceTag } from "@/components/PriceTag";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `คำสั่งซื้อ #${id.slice(0, 8)}` };
}

const STATUS_STEPS = ["pending", "paid", "shipped", "delivered"] as const;
const STATUS_LABEL: Record<string, string> = {
  pending: "รอดำเนินการ",
  paid: "ชำระเงินแล้ว",
  shipped: "กำลังจัดส่ง",
  delivered: "ส่งสำเร็จ",
};

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const currentStep = STATUS_STEPS.indexOf(order.status);
  const createdAt = order.createdAt;

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <Link
          href="/orders"
          className="text-sm text-brand-600 hover:underline"
        >
          ← กลับไปคำสั่งซื้อทั้งหมด
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          คำสั่งซื้อ
        </h1>
        <p className="mt-1 font-mono text-sm text-gray-400">#{order.id}</p>
        <p className="mt-1 text-sm text-gray-500">
          สั่งเมื่อ{" "}
          {createdAt.toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Status stepper */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">สถานะคำสั่งซื้อ</h2>
        <ol className="flex items-center">
          {STATUS_STEPS.map((step, i) => {
            const done = i <= currentStep;
            const isLast = i === STATUS_STEPS.length - 1;
            return (
              <li key={step} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`h-7 w-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      done
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium ${done ? "text-brand-700" : "text-gray-400"}`}>
                    {STATUS_LABEL[step]}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={`mb-4 h-0.5 flex-1 mx-1 transition-colors ${
                      i < currentStep ? "bg-brand-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Items */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <h2 className="border-b border-gray-100 px-5 py-4 text-sm font-semibold text-gray-700">
          รายการสินค้า
        </h2>
        <ul className="divide-y divide-gray-100">
          {order.items.map((item) => (
            <li key={item.productId} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">
                  <PriceTag amount={item.price} /> × {item.qty}
                </p>
              </div>
              <PriceTag
                amount={item.price * item.qty}
                className="text-sm font-semibold text-gray-900"
              />
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-100 px-5 py-4 flex justify-between">
          <span className="font-semibold text-gray-900">รวมทั้งหมด</span>
          <PriceTag
            amount={order.total}
            className="text-lg font-extrabold text-brand-700"
          />
        </div>
      </div>
    </div>
  );
}
