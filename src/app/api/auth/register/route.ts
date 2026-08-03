import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateOtpCode, sendOtpSms } from "@/lib/otp";

// POST /api/auth/register
// body: { phone: string, name: string }
// در قدم اول کاربر را (اگر وجود ندارد) با نقش member می‌سازد و یک کد OTP ارسال می‌کند.
// تایید نهایی و صدور توکن در /api/auth/login انجام می‌شود.
export async function POST(req: NextRequest) {
  try {
    const { phone, name } = await req.json();

    if (!phone || !name) {
      return NextResponse.json({ error: "phone و name الزامی هستند" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { phone },
      update: { name },
      create: { phone, name, role: "member" },
    });

    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // ۵ دقیقه اعتبار

    await prisma.otpCode.create({
      data: { userId: user.id, phone, code, expiresAt },
    });

    const otpResult = await sendOtpSms(phone, code);
    if (!otpResult.ok) {
      return NextResponse.json({ error: "ارسال پیامک OTP ناموفق بود" }, { status: 502 });
    }

    return NextResponse.json({ user: { id: user.id, phone: user.name }, message: "کد تایید ارسال شد" });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
