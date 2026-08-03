import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateOtpCode, sendOtpSms } from "@/lib/otp";
import { signAuthToken } from "@/lib/auth";

// POST /api/auth/login
// body: { phone: string, otp?: string }
// اگر otp ارسال نشود: کد جدید تولید و پیامک می‌شود (مرحله ۱)
// اگر otp ارسال شود: کد بررسی و در صورت صحت، توکن JWT صادر می‌شود (مرحله ۲)
export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "phone الزامی است" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return NextResponse.json({ error: "کاربری با این شماره یافت نشد" }, { status: 404 });
    }

    // مرحله ۱: ارسال کد
    if (!otp) {
      const code = generateOtpCode();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      await prisma.otpCode.create({ data: { userId: user.id, phone, code, expiresAt } });

      const otpResult = await sendOtpSms(phone, code);
      if (!otpResult.ok) {
        return NextResponse.json({ error: "ارسال پیامک OTP ناموفق بود" }, { status: 502 });
      }
      return NextResponse.json({ message: "کد تایید ارسال شد" });
    }

    // مرحله ۲: بررسی کد
    const otpRecord = await prisma.otpCode.findFirst({
      where: { phone, code: otp, consumed: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: "کد وارد شده نامعتبر یا منقضی شده است" }, { status: 401 });
    }

    await prisma.otpCode.update({ where: { id: otpRecord.id }, data: { consumed: true } });

    const token = signAuthToken({ userId: user.id, phone: user.phone, role: user.role });

    return NextResponse.json({
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role },
      token,
    });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
