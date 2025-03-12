import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@utils/02-stateless-session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/search-results",
  "/admin",
  "/booking",
  "/profile",
  "/payment",
  "/receipt",
];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookieStore = await cookies(); // ✅ Await cookies()
  const cookie = cookieStore.get("session")?.value; // ✅ Now safe to use .get()
  const session = await decrypt(cookie);

  // 4. Redirect if not authenticated
  if (isProtectedRoute && !session?.email) {
    console.log("Redirecting to login");
    console.log("isprotectedRoute", isProtectedRoute); // NOTE: Delete after use
    console.log("session contents", session); // NOTE: Delete after use
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}
