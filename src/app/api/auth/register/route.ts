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
      return NextResponse.json({ error: "نام، شماره موبایل، کد ملی و رمز عبور الزامی هستند" }, { status: 400 });
    }

    // اعتبارسنجی رمز عبور قوی (سمت سرور)
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

    if (accountType === "lawyer") {
      if (!license_number || !membership_type || !license_expiry) {
        return NextResponse.json(
          { error: "برای ثبت‌نام وکلا، شماره پروانه، نوع عضویت و تاریخ اعتبار الزامی است" },
          { status: 400 }
        );
      }
      if (membership_type !== "bar_association" && membership_type !== "judiciary_center") {
        return NextResponse.json({ error: "نوع عضویت نامعتبر است" }, { status: 400 });
      }
    }

    const existingByNationalId = await prisma.user.findUnique({ where: { nationalId } });
    if (existingByNationalId && existingByNationalId.phone !== phone) {
      return NextResponse.json({ error: "این کد ملی قبلاً ثبت شده است" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { phone },
      update: { name, nationalId, password: hashedPassword },
      create: { phone, name, nationalId, password: hashedPassword, role: "member" },
    });

    if (accountType === "lawyer") {
      await prisma.lawyer.upsert({
        where: { userId: user.id },
        update: {
          licenseNumber: license_number,
          membershipType: membership_type,
          licenseExpiry: new Date(license_expiry),
          verificationStatus: "pending",
        },
        create: {
          userId: user.id,
          licenseNumber: license_number,
          membershipType: membership_type,
          licenseExpiry: new Date(license_expiry),
          verificationStatus: "pending",
        },
      });
    }

    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otpCode.create({
      data: { userId: user.id, phone, code, expiresAt },
    });

    const otpResult = await sendOtpSms(phone, code);
    if (!otpResult.ok) {
      return NextResponse.json({ error: "ارسال پیامک OTP ناموفق بود" }, { status: 502 });
    }

    return NextResponse.json({ user: { id: user.id, phone: user.phone }, message: "کد تایید ارسال شد" });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}