import { cookies } from "next/headers";
import { CheckoutForm } from "./CheckoutForm";

export const metadata = { title: "ชำระเงิน" };

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  // guest_id is set by middleware on every request; always present at this point.
  const userId = cookieStore.get("guest_id")?.value ?? "anonymous";

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">ชำระเงิน</h1>
      <CheckoutForm userId={userId} />
    </div>
  );
}
