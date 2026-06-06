import { type NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/repositories/orderRepository";

// Stub POST handler for incoming payment webhook events.
// Wire up real signature verification and event handling before going live.
export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;

  // Verify webhook signature to ensure the request comes from the payment provider.
  const signature = request.headers.get("x-webhook-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: Replace with HMAC comparison against the payment provider's algorithm.
  if (signature !== secret) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("event" in body) ||
    !("orderId" in body)
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { event, orderId } = body as { event: string; orderId: string };

  if (event === "payment.success") {
    await updateOrderStatus(orderId, "paid");
  } else if (event === "payment.failed") {
    // Keep order in pending; notify ops or trigger retry flow.
  }

  return NextResponse.json({ received: true });
}
