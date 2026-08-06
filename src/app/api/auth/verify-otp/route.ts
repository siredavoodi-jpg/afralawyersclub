import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp, accountType, license_number, membership_type, license_expiry } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "شماره موبایل و کد تایید الزامی هستند" },
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

    // بررسی کد OTP
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

    // فعال کردن کاربر
    await prisma.user.update({
      where: { id: user.id },
      data: { status: "active" },
    });

    // ایجاد رکورد وکیل فقط بعد از تایید OTP
    if (accountType === "lawyer" && license_number && membership_type && license_expiry) {
      await prisma.lawyer.upsert({
        where: { userId: user.id },
        update: {
          licenseNumber: license_number,
          membershipType: membership_type as any,
          licenseExpiry: new Date(license_expiry),
          verificationStatus: "pending",
        },
        create: {
          userId: user.id,
          licenseNumber: license_number,
          membershipType: membership_type as any,
          licenseExpiry: new Date(license_expiry),
          verificationStatus: "pending",
        },
      });
    }

    // صدور توکن JWT
    const token = signAuthToken({
      userId: user.id,
      phone: user.phone,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role },
      token,
      message: "ثبت‌نام با موفقیت انجام شد",
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}