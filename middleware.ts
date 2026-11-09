import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge middleware only checks presence of the session cookie.
// Actual validity (expiry, user, tenant) is enforced in server actions via D1 lookup.
export function middleware(request: NextRequest) {
  const session = request.cookies.get("escalate-session");
  if (!session?.value && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
