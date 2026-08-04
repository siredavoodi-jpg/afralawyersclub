import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken } from "@/lib/auth";
import { verifyPassword } from "@/lib/passwords";

export async function POST(req: NextRequest) {
  try {
    const { phone, password } = await req.json();
    if (!phone || !password) {
      return NextResponse.json({ error: "شماره موبایل و رمز عبور الزامی است" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return NextResponse.json({ error: "کاربری با این شماره یافت نشد" }, { status: 404 });
    }

    if (!user.passwordHash) {
      return NextResponse.json({ error: "رمز عبور تنظیم نشده است", code: "no_password" }, { status: 409 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "شماره موبایل یا رمز عبور اشتباه است" }, { status: 401 });
    }

    const token = signAuthToken({ userId: user.id, phone: user.phone, role: user.role });
    return NextResponse.json({
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role },
      token,
    });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}