// app/api/login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { password, redirectTo } = body as {
    password?: string;
    redirectTo?: string;
  };

  const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "";

  if (!password || password !== SITE_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Invalid password" },
      { status: 401 }
    );
  }

  // Set cookie (HttpOnly, Secure). Cookie value = SITE_PASSWORD (simple approach)
  const res = NextResponse.json({ ok: true, redirectTo: redirectTo || "/" });

  // Set cookie for 8 hours (28800 seconds). Adjust as needed.
  const maxAge = 60 * 60 * 8;
  res.cookies.set({
    name: "k_wiz_auth",
    value: SITE_PASSWORD,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return res;
}
