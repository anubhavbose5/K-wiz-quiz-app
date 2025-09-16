// src/lib/requireAuth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function requireAuthOrRedirect(allowPublic = ["/auth"]) {
  const pathname =
    typeof window === "undefined" ? undefined : window.location?.pathname;

  // Server-side cookie read (works with HttpOnly)
  const cookie = cookies().get("k_wiz_auth")?.value ?? "";
  const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "";

  // allow if cookie matches
  if (cookie && SITE_PASSWORD && cookie === SITE_PASSWORD) return;

  // allow explicitly public paths
  // Note: this helper will be called from server layout, so use next/headers for real path
  // We will pass the path check from layout; this helper only redirects.
  redirect(`/auth`);
}
