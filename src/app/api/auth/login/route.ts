import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

// POST /api/auth/login
// body: { phone: string, password: string }
// ورود با موبایل و رمز عبور
export async function POST(req: NextRequest) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: "شماره موبایل و رمز عبور الزامی هستند" },
        { status: 400 }
      );
    }

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      return NextResponse.json(
        { error: "کاربری با این شماره موبایل یافت نشد" },
        { status: 404 }
      );
    }

    // بررسی وضعیت کاربر
    if (user.status !== "active") {
      return NextResponse.json(
        { error: "حساب کاربری شما غیرفعال است" },
        { status: 403 }
      );
    }

    // بررسی وجود رمز عبور (برای کاربران قدیمی)
    if (!user.password) {
      return NextResponse.json(
        {
          error: "PASSWORD_NOT_SET",
          message: "شما هنوز رمز عبور تعیین نکرده‌اید. لطفاً از طریق صفحه بازیابی رمز عبور اقدام کنید.",
        },
        { status: 400 }
      );
    }

    // بررسی صحت رمز عبور
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
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}