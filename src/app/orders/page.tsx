import { cookies } from "next/headers";
import Link from "next/link";
import { getOrdersByUser } from "@/lib/repositories/orderRepository";
import { PriceTag } from "@/components/PriceTag";

export const metadata = { title: "คำสั่งซื้อของฉัน" };

const STATUS_LABEL: Record<string, string> = {
  pending: "รอดำเนินการ",
  paid: "ชำระเงินแล้ว",
  shipped: "กำลังจัดส่ง",
  delivered: "ส่งสำเร็จ",
};

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  paid: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("guest_id")?.value ?? "anonymous";

  const orders = await getOrdersByUser(userId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">คำสั่งซื้อของฉัน</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="text-gray-500">ยังไม่มีคำสั่งซื้อ</p>
          <Link
            href="/products"
            className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            เริ่มช้อปปิ้ง
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const statusKey = order.status;
            const colorCls =
              STATUS_COLOR[statusKey] ??
              "bg-gray-50 text-gray-700 border-gray-200";
            const statusLabel = STATUS_LABEL[statusKey] ?? statusKey;
            const createdAt = order.createdAt;

            return (
              <li key={order.id}>
                <Link
                  href={`/orders/${order.id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-mono"># {order.id}</p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} รายการ ·{" "}
                      {createdAt.toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${colorCls}`}
                    >
                      {statusLabel}
                    </span>
                    <PriceTag
                      amount={order.total}
                      className="font-bold text-gray-900"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
