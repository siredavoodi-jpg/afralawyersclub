import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { phone, password, otp } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "شماره موبایل الزامی است" },
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

    // حالت ۱: ورود با OTP (برای تایید ثبت‌نام یا ورود بدون رمز)
    if (otp) {
      const otpRecord = await prisma.otpCode.findFirst({
        where: {
          phone,
          code: otp,
          consumed: false,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: "desc" },
      });

      if (!otpRecord) {
        return NextResponse.json(
          { error: "کد تایید نامعتبر یا منقضی شده است" },
          { status: 401 }
        );
      }

      // مصرف کردن OTP
      await prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { consumed: true },
      });

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
    }

    // حالت ۲: ورود با رمز عبور
    if (password) {
      // بررسی وجود رمز عبور
      if (!user.password && !user.passwordHash) {
        return NextResponse.json(
          {
            error: "شما هنوز رمز عبور تعیین نکرده‌اید. لطفاً از طریق صفحه بازیابی رمز عبور اقدام کنید.",
            code: "PASSWORD_NOT_SET",
          },
          { status: 400 }
        );
      }

      // بررسی رمز با password (bcrypt مستقیم)
      if (user.password) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return NextResponse.json(
            { error: "شماره موبایل یا رمز عبور اشتباه است" },
            { status: 401 }
          );
        }
      }
      // بررسی رمز با passwordHash
      else if (user.passwordHash) {
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
          return NextResponse.json(
            { error: "شماره موبایل یا رمز عبور اشتباه است" },
            { status: 401 }
          );
        }
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
    }

    // هیچکدام ارائه نشده
    return NextResponse.json(
      { error: "رمز عبور یا کد تایید الزامی است" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}