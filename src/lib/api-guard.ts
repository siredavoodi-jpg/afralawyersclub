import { NextRequest, NextResponse } from "next/server";
import { getTokenFromHeader, verifyAuthToken, type AuthTokenPayload } from "@/lib/auth";

export function requireAuth(req: NextRequest): { payload: AuthTokenPayload } | { error: NextResponse } {
  const token = getTokenFromHeader(req.headers.get("authorization"));
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return { error: NextResponse.json({ error: "احراز هویت نامعتبر است" }, { status: 401 }) };
  }
  return { payload };
}

export function requireLawyerRole(payload: AuthTokenPayload): NextResponse | null {
  if (payload.role !== "lawyer" && payload.role !== "admin") {
    return NextResponse.json(
      { error: "این خدمت فقط برای وکلای احراز شده با اشتراک Professional در دسترس است" },
      { status: 403 }
    );
  }
  return null;
}

export function requireAdminRole(payload: AuthTokenPayload): NextResponse | null {
  if (payload.role !== "admin") {
    return NextResponse.json({ error: "این بخش فقط برای مدیران سیستم در دسترس است" }, { status: 403 });
  }
  return null;
}