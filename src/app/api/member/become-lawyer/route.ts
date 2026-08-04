import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAuth } from "@/lib/api-guard";

// GET: بررسی وضعیت فعلی درخواست وکیل شدن
export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  try {
    const lawyer = await prisma.lawyer.findUnique({
      where: { userId: auth.payload.userId },
    });

    if (!lawyer) {
      return NextResponse.json({ exists: false });
    }

    return NextResponse.json({
      exists: true,
      status: lawyer.verificationStatus,
    });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}

// POST: ثبت درخواست وکیل شدن
export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  try {
    const { licenseNumber, membershipType, licenseExpiry } = await req.json();

    if (!licenseNumber || !membershipType || !licenseExpiry) {
      return NextResponse.json(
        { error: "شماره پروانه، نوع عضویت و تاریخ اعتبار الزامی هستند" },
        { status: 400 }
      );
    }

    if (membershipType !== "bar_association" && membershipType !== "judiciary_center") {
      return NextResponse.json({ error: "نوع عضویت نامعتبر است" }, { status: 400 });
    }

    // بررسی وجود رکورد قبلی
    const existing = await prisma.lawyer.findUnique({
      where: { userId: auth.payload.userId },
    });

    if (existing) {
      if (existing.verificationStatus === "verified") {
        return NextResponse.json(
          { error: "شما از قبل به عنوان وکیل تایید شده‌اید" },
          { status: 409 }
        );
      }
      if (existing.verificationStatus === "pending") {
        return NextResponse.json(
          { error: "درخواست شما در حال بررسی است، لطفاً صبر کنید" },
          { status: 409 }
        );
      }
      // اگر رد شده بود، اجازه ثبت مجدد
      await prisma.lawyer.update({
        where: { userId: auth.payload.userId },
        data: {
          licenseNumber,
          membershipType,
          licenseExpiry: new Date(licenseExpiry),
          verificationStatus: "pending",
          verifiedAt: null,
        },
      });
      return NextResponse.json({ success: true, message: "درخواست شما مجدداً ثبت شد" });
    }

    // ساخت رکورد جدید با وضعیت در انتظار
    await prisma.lawyer.create({
      data: {
        userId: auth.payload.userId,
        licenseNumber,
        membershipType,
        licenseExpiry: new Date(licenseExpiry),
        verificationStatus: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "درخواست شما ثبت شد و در انتظار بررسی مدیر است",
    });
  } catch (err) {
    console.error("Become lawyer error:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}