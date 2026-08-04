import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getTokenFromHeader, verifyAuthToken } from "@/lib/auth";
import { hashPassword, isPasswordStrong } from "@/lib/passwords";

export async function POST(req: NextRequest) {
  const token = getTokenFromHeader(req.headers.get("authorization"));
  const payload = token ? verifyAuthToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: "احراز هویت نامعتبر است" }, { status: 401 });
  }

  try {
    const { password } = await req.json();
    if (!password || !isPasswordStrong(password)) {
      return NextResponse.json(
        { error: "رمز عبور باید حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک انگلیسی و عدد باشد" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    await prisma.user.update({ where: { id: payload.userId }, data: { passwordHash } });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}