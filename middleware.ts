// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// The middleware function
export default withAuth(
  function middleware() {
    // Optional: Add custom logic here (e.g. check user role via token.role)
    return NextResponse.next();
  },
  {
    callbacks: {
      // Only allow access if a valid token (session) exists
      authorized: ({ token }) => !!token,
    },
    pages: {
      // Redirect unauthorized users to this path
      signIn: "/login",
    },
  },
);

// Match only these routes for protection
export const config = {
  matcher: [
    "/profile/:path*",
    "/booking/:path*",
    "/admin/:path*",
    "/payment/:path*",
    "/receipt/:path*",
  ],
};
