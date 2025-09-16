// src/app/(protected)/layout.tsx
import React from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // run per request

/**
 * Protect all routes inside this (protected) group.
 * If cookie missing/invalid => redirect to /auth?redirectTo=<originalPath>
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Determine the current request path server-side
  // headers().get('x-invoke-path') may exist in some runtimes; fallback to 'x-next-url' or referer
  const h = headers();
  // Next sets 'x-invoke-path' or 'x-next-url' in some envs; we try to derive a safe pathname.
  const maybePath =
    h.get("x-invoke-path") || h.get("x-next-url") || h.get("referer") || "/";
  let pathname = "/";
  try {
    if (maybePath && maybePath.startsWith("/")) {
      pathname = maybePath;
    } else if (maybePath) {
      // try to parse a full URL
      const u = new URL(maybePath);
      pathname = u.pathname || "/";
    }
  } catch {
    pathname = "/";
  }

  // Server-side cookie read (works with HttpOnly cookies)
  const cookieVal = cookies().get("k_wiz_auth")?.value ?? "";
  const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "";
  console.log("cookieVal:", cookieVal);
  console.log("SITE_PASSWORD:", SITE_PASSWORD ? "<set>" : "<NOT SET>");
  console.log("pathname:", pathname);

  // If not authenticated -> redirect to /auth with redirectTo param
  if (!cookieVal || !SITE_PASSWORD || cookieVal !== SITE_PASSWORD) {
    // redirect back to the original path under protection
    redirect(`/auth?redirectTo=${encodeURIComponent(pathname)}`);
  }

  // Auth OK -> render children
  return <>{children}</>;
}
