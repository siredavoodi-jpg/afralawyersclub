import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const userId = params.id;

    if (!userId) {
      return NextResponse.json({ error: "شناسه کاربر الزامی است" }, { status: 400 });
    }

    // تایید کارآموز
    if (action === "approve") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          role: "trainee",
          status: "active",
          traineeVerifiedAt: new Date(),
        },
      });

      return NextResponse.redirect(new URL("/admin/trainees?approved=1", req.url));
    }

    // رد کارآموز
    if (action === "reject") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          status: "suspended",
        },
      });

      return NextResponse.redirect(new URL("/admin/trainees?rejected=1", req.url));
    }

    return NextResponse.json({ error: "عملیات نامعتبر" }, { status: 400 });
  } catch (err) {
    console.error("Admin trainee action error:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}