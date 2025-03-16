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
const publicRoutes = ["/login", "/signup", "/"];

// 2. Ignore static assets (images, Next.js chunks, fonts, favicon, etc.)
const ignoredPaths = [
  "/_next/static/", // Ignore Next.js built files
  "/_next/image", // Ignore optimized images
  "/favicon.ico", // Ignore favicon
  "/robots.txt", // Ignore robots.txt
  "/sitemap.xml", // Ignore sitemap
  "/Assets", // Ignore public folder assets
  "/favicon/", // Ignore public folder assets
  "/logos/", // Ignore public folder assets
];

// 3. Middleware function
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if the request is for an ignored static asset
  if (ignoredPaths.some((ignoredPath) => path.startsWith(ignoredPath))) {
    console.log("Ignoring static asset", path);
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  console.log("Pathname >>: ", path);
  console.log("The above Protected path is >>: ", isProtectedRoute);
  console.log("The above Public path is >>: ", isPublicRoute);

  // Decrypt session from cookies
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect if not authenticated
  if (isProtectedRoute && !session?.email) {
    console.log("Redirecting to login");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}
