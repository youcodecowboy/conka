import { NextResponse } from "next/server";

const DEV_MOCK_COOKIE = "dev_mock_auth";

function isMockAuthEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.DEV_MOCK_AUTH === "true"
  );
}

/**
 * Dev-only: set or clear mock auth cookie so the portal can be used without Shopify OAuth.
 * POST: set cookie and return success.
 * DELETE: clear cookie.
 * Returns 403 when not in dev or DEV_MOCK_AUTH is not set.
 */
export async function POST() {
  if (!isMockAuthEnabled()) {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set(DEV_MOCK_COOKIE, "1", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24h
    path: "/",
  });
  return res;
}

export async function DELETE() {
  if (!isMockAuthEnabled()) {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.delete(DEV_MOCK_COOKIE);
  return res;
}
