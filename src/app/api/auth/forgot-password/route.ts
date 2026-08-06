import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateOtpCode, sendOtpSms } from "@/lib/otp";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const RESET_SECRET = process.env.JWT_RESET_SECRET || process.env.JWT_SECRET || "reset-secret-key";
const RESET_EXPIRY = "15m";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, otp, tempToken, newPassword } = body;

    // مرحله ۱: فقط موبایل ارسال شده → ارسال پیامک
    if (phone && !otp && !tempToken) {
      // جستجوی کاربر با موبایل
      let user = await prisma.user.findUnique({ where: { phone } });

      if (!user) {
        // برای امنیت، وانمود می‌کنیم ارسال شد
        return NextResponse.json({
          success: true,
          message: "اگر شماره موبایل شما ثبت شده باشد، کد تایید ارسال خواهد شد",
        });
      }

      if (user.status !== "active") {
        return NextResponse.json(
          { error: "حساب کاربری شما غیرفعال است" },
          { status: 403 }
        );
      }

      // غیرفعال کردن کدهای قدیمی
      await prisma.otpCode.updateMany({
        where: { phone, consumed: false },
        data: { consumed: true },
      });

      const code = generateOtpCode();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await prisma.otpCode.create({
        data: { userId: user.id, phone, code, expiresAt },
      });

      const otpResult = await sendOtpSms(phone, code);

      if (!otpResult.ok) {
        return NextResponse.json({ error: "ارسال پیامک ناموفق بود" }, { status: 502 });
      }

      return NextResponse.json({
        success: true,
        message: "کد تایید ارسال شد",
      });
    }

    // مرحله ۲: موبایل + OTP → تایید کد و صدور توکن موقت
    if (phone && otp && !tempToken) {
      const user = await prisma.user.findUnique({ where: { phone } });
      if (!user) {
        return NextResponse.json({ error: "کد وارد شده نامعتبر است" }, { status: 401 });
      }

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
        return NextResponse.json({ error: "کد نامعتبر یا منقضی شده است" }, { status: 401 });
      }

      await prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { consumed: true },
      });

      // صدور توکن موقت برای تنظیم رمز جدید
      const token = jwt.sign(
        { userId: user.id, phone: user.phone, purpose: "password_reset" },
        RESET_SECRET,
        { expiresIn: RESET_EXPIRY }
      );

      return NextResponse.json({
        success: true,
        tempToken: token,
        message: "کد تایید شد. رمز عبور جدید را وارد کنید",
      });
    }

    // مرحله ۳: tempToken + رمز جدید → ذخیره رمز
    if (tempToken && newPassword) {
      // بررسی رمز عبور قوی
      if (newPassword.length < 8) {
        return NextResponse.json({ error: "رمز عبور باید حداقل ۸ کاراکتر باشد" }, { status: 400 });
      }
      if (!/[0-9]/.test(newPassword)) {
        return NextResponse.json({ error: "رمز عبور باید شامل حداقل یک عدد باشد" }, { status: 400 });
      }
      if (!/[a-z]/.test(newPassword)) {
        return NextResponse.json({ error: "رمز عبور باید شامل حداقل یک حرف کوچک انگلیسی باشد" }, { status: 400 });
      }
      if (!/[A-Z]/.test(newPassword)) {
        return NextResponse.json({ error: "رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد" }, { status: 400 });
      }

      // تایید توکن موقت
      let payload: any;
      try {
        payload = jwt.verify(tempToken, RESET_SECRET);
      } catch {
        return NextResponse.json(
          { error: "لینک بازیابی منقضی شده است. لطفاً دوباره درخواست دهید" },
          { status: 401 }
        );
      }

      if (payload.purpose !== "password_reset") {
        return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 401 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: payload.userId },
        data: { password: hashedPassword },
      });

      return NextResponse.json({
        success: true,
        message: "رمز عبور با موفقیت تغییر کرد. حالا می‌توانید وارد شوید",
      });
    }

    return NextResponse.json({ error: "درخواست نامعتبر" }, { status: 400 });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}