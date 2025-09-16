// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/auth",
  "/api/login",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/_static", // any other static dirs you use
];

function isPublic(req: NextRequest) {
  const url = req.nextUrl.pathname;
  // allow assets and next internals
  if (
    url.startsWith("/_next") ||
    url.startsWith("/static") ||
    url.startsWith("/api")
  )
    return true;
  // explicit public paths
  return PUBLIC_PATHS.some((p) => url === p || url.startsWith(p));
}

export function middleware(req: NextRequest) {
  // If public resource, allow
  if (isPublic(req)) return NextResponse.next();

  // Read cookie
  const cookie = req.cookies.get("k_wiz_auth")?.value ?? "";

  // Basic check: cookie must equal the site password (stored server-side)
  // Note: in production you may want to use a hash or JWT
  const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "";

  if (cookie && SITE_PASSWORD && cookie === SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to /auth and keep original url as "redirectTo"
  const loginUrl = new URL("/auth", req.url);
  loginUrl.searchParams.set(
    "redirectTo",
    req.nextUrl.pathname + (req.nextUrl.search ?? "")
  );
  return NextResponse.redirect(loginUrl);
}

// Apply middleware to all routes (or customize matcher)
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // run for non-api/_next routes
};
