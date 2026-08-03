import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getTokenFromHeader, verifyAuthToken } from "@/lib/auth";

// POST /api/auth/verify-license
// headers: Authorization: Bearer {token}
// body: { license_number, bar_association, license_image (URL از Supabase Storage) }
export async function POST(req: NextRequest) {
  const token = getTokenFromHeader(req.headers.get("authorization"));
  const payload = token ? verifyAuthToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: "احراز هویت نامعتبر است" }, { status: 401 });
  }

  try {
    const { license_number, bar_association, license_image } = await req.json();

    if (!license_number || !bar_association || !license_image) {
      return NextResponse.json({ error: "همه فیلدها الزامی هستند" }, { status: 400 });
    }

    const lawyer = await prisma.lawyer.upsert({
      where: { userId: payload.userId },
      update: {
        licenseNumber: license_number,
        barAssociation: bar_association,
        licenseImage: license_image,
        verificationStatus: "pending",
      },
      create: {
        userId: payload.userId,
        licenseNumber: license_number,
        barAssociation: bar_association,
        licenseImage: license_image,
        verificationStatus: "pending",
      },
    });

    return NextResponse.json({ lawyer, status: "pending" });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
