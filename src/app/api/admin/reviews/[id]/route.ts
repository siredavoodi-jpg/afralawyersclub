import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAuth, requireAdminRole } from "@/lib/api-guard";
import { ReviewStatus } from "@prisma/client";

// PATCH: تایید یا رد نظر
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const roleError = requireAdminRole(auth.payload);
  if (roleError) return roleError;

  try {
    const body = await req.json();
    const { action } = body; // "approve" | "reject"

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "عملیات نامعتبر." },
        { status: 400 }
      );
    }

    const review = await prisma.review.findUnique({
      where: { id: params.id },
    });
    if (!review) {
      return NextResponse.json(
        { error: "نظر یافت نشد." },
        { status: 404 }
      );
    }

    const updated = await prisma.review.update({
      where: { id: params.id },
      data: {
        status: action === "approve" ? ReviewStatus.approved : ReviewStatus.rejected,
        reviewedBy: auth.payload.userId,
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json({ review: updated });
  } catch (err: any) {
    console.error("Admin review action error:", err);
    return NextResponse.json(
      { error: "عملیات با خطا مواجه شد." },
      { status: 500 }
    );
  }
}

// DELETE: حذف کامل نظر
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const roleError = requireAdminRole(auth.payload);
  if (roleError) return roleError;

  try {
    await prisma.review.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "حذف نظر با خطا مواجه شد." },
      { status: 500 }
    );
  }
}