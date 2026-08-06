import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateOtpCode, sendOtpSms } from "@/lib/otp";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const {
      phone,
      name,
      nationalId,
      password,
      acceptedTerms,
      accountType,
      license_number,
      membership_type,
      license_expiry,
    } = await req.json();

    if (!phone || !name || !nationalId || !password) {
      return NextResponse.json(
        { error: "نام، شماره موبایل، کد ملی و رمز عبور الزامی هستند" },
        { status: 400 }
      );
    }

    // اعتبارسنجی رمز عبور
    if (password.length < 8) {
      return NextResponse.json({ error: "رمز عبور باید حداقل ۸ کاراکتر باشد" }, { status: 400 });
    }
    if (!/[0-9]/.test(password)) {
      return NextResponse.json({ error: "رمز عبور باید شامل حداقل یک عدد باشد" }, { status: 400 });
    }
    if (!/[a-z]/.test(password)) {
      return NextResponse.json({ error: "رمز عبور باید شامل حداقل یک حرف کوچک انگلیسی باشد" }, { status: 400 });
    }
    if (!/[A-Z]/.test(password)) {
      return NextResponse.json({ error: "رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد" }, { status: 400 });
    }

    if (!acceptedTerms) {
      return NextResponse.json({ error: "پذیرش قوانین و مقررات الزامی است" }, { status: 400 });
    }

    if (!/^\d{10}$/.test(nationalId)) {
      return NextResponse.json({ error: "کد ملی باید ۱۰ رقم باشد" }, { status: 400 });
    }

    // بررسی تکراری بودن کد ملی
    const existingByNationalId = await prisma.user.findUnique({
      where: { nationalId },
    });

    if (existingByNationalId && existingByNationalId.phone !== phone) {
      return NextResponse.json(
        { error: "این کد ملی قبلاً با شماره موبایل دیگری ثبت شده است" },
        { status: 409 }
      );
    }

    // بررسی تکراری بودن موبایل
    const existingByPhone = await prisma.user.findUnique({ where: { phone } });

    if (existingByPhone && existingByPhone.nationalId && existingByPhone.nationalId !== nationalId) {
      return NextResponse.json(
        { error: "این شماره موبایل قبلاً با کد ملی دیگری ثبت شده است" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ایجاد کاربر با status = "inactive" (تا تایید OTP)
    const user = await prisma.user.upsert({
      where: { phone },
      update: {
        name,
        nationalId,
        password: hashedPassword,
        status: "inactive", // ⚠️ غیرفعال تا تایید OTP
      },
      create: {
        phone,
        name,
        nationalId,
        password: hashedPassword,
        role: "member",
        status: "inactive", // ⚠️ غیرفعال تا تایید OTP
      },
    });

    // ❌ رکورد وکیل اینجا ایجاد نمی‌شود!
    // فقط بعد از تایید OTP در verify-otp ایجاد می‌شود

    // غیرفعال کردن کدهای OTP قدیمی
    await prisma.otpCode.updateMany({
      where: { phone, consumed: false },
      data: { consumed: true },
    });

    // ایجاد و ارسال کد تایید
    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otpCode.create({
      data: { userId: user.id, phone, code, expiresAt },
    });

    const otpResult = await sendOtpSms(phone, code);

    if (!otpResult.ok) {
      return NextResponse.json(
        { error: "ارسال پیامک OTP ناموفق بود. لطفاً دوباره تلاش کنید" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      user: { id: user.id, phone: user.phone },
      message: "کد تایید ارسال شد",
    });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}