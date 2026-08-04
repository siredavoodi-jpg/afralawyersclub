import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: "شماره موبایل و رمز عبور الزامی هستند" },
        { status: 400 }
      );
    }

    // پیدا کردن کاربر با شماره موبایل
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json(
        { error: "شماره موبایل یا رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    // بررسی اینکه کاربر ادمین باشد
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز. فقط مدیران می‌توانند از این مسیر وارد شوند" },
        { status: 403 }
      );
    }

    // بررسی وضعیت کاربر
    if (user.status !== "active") {
      return NextResponse.json(
        { error: "حساب کاربری شما غیرفعال است" },
        { status: 403 }
      );
    }

    // بررسی رمز عبور
    if (!user.password) {
      return NextResponse.json(
        { error: "برای این حساب رمز عبور تنظیم نشده است" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "شماره موبایل یا رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    // صدور توکن JWT
    const token = signAuthToken({
      userId: user.id,
      phone: user.phone,
      role: user.role,
    });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}