import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getTokenFromHeader, verifyAuthToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getTokenFromHeader(req.headers.get("authorization"));
  const payload = token ? verifyAuthToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: "احراز هویت نامعتبر است" }, { status: 401 });
  }

  const lawyer = await prisma.lawyer.findUnique({ where: { userId: payload.userId } });
  return NextResponse.json({ lawyer });
}

export async function POST(req: NextRequest) {
  const token = getTokenFromHeader(req.headers.get("authorization"));
  const payload = token ? verifyAuthToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: "احراز هویت نامعتبر است" }, { status: 401 });
  }

  try {
    const { license_number, membership_type, license_expiry } = await req.json();

    if (!license_number || !membership_type || !license_expiry) {
      return NextResponse.json({ error: "همه فیلدها الزامی هستند" }, { status: 400 });
    }

    if (membership_type !== "bar_association" && membership_type !== "judiciary_center") {
      return NextResponse.json({ error: "نوع عضویت نامعتبر است" }, { status: 400 });
    }

    const lawyer = await prisma.lawyer.upsert({
      where: { userId: payload.userId },
      update: {
        licenseNumber: license_number,
        membershipType: membership_type,
        licenseExpiry: new Date(license_expiry),
        verificationStatus: "pending",
      },
      create: {
        userId: payload.userId,
        licenseNumber: license_number,
        membershipType: membership_type,
        licenseExpiry: new Date(license_expiry),
        verificationStatus: "pending",
      },
    });

    return NextResponse.json({ lawyer, status: "pending" });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}