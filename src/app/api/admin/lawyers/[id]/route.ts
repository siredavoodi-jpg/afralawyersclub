import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAuth, requireAdminRole } from "@/lib/api-guard";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const roleError = requireAdminRole(auth.payload);
  if (roleError) return roleError;

  try {
    const { action } = await req.json();

    const lawyer = await prisma.lawyer.findUnique({ where: { id: params.id } });
    if (!lawyer) {
      return NextResponse.json({ error: "پروانه یافت نشد" }, { status: 404 });
    }

    if (action === "approve") {
      await prisma.$transaction([
        prisma.lawyer.update({
          where: { id: params.id },
          data: { verificationStatus: "verified", verifiedAt: new Date() },
        }),
        prisma.user.update({
          where: { id: lawyer.userId },
          data: { role: "lawyer" },
        }),
      ]);
    } else if (action === "reject") {
      await prisma.lawyer.update({
        where: { id: params.id },
        data: { verificationStatus: "rejected" },
      });
    } else {
      return NextResponse.json({ error: "عملیات نامعتبر" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}