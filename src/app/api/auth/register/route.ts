import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateOtpCode, sendOtpSms } from "@/lib/otp";

export async function POST(req: NextRequest) {
  try {
    const {
      phone,
      name,
      nationalId,
      acceptedTerms,
      accountType,
      license_number,
      membership_type,
      license_expiry,
    } = await req.json();

    if (!phone || !name || !nationalId) {
      return NextResponse.json({ error: "نام، شماره موبایل و کد ملی الزامی هستند" }, { status: 400 });
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

    const user = await prisma.user.upsert({
      where: { phone },
      update: { name, nationalId },
      create: { phone, name, nationalId, role: "member" },
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
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}