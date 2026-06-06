import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Assigns a persistent guest_id cookie so server components can identify
// anonymous users across orders without requiring authentication.
export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  if (!request.cookies.get("guest_id")) {
    response.cookies.set("guest_id", crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
