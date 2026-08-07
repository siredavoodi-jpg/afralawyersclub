import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAuth, requireAdminRole } from "@/lib/api-guard";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const roleError = requireAdminRole(auth.payload);
  if (roleError) return roleError;

  const statusFilter = req.nextUrl.searchParams.get("status");
  const typeFilter = req.nextUrl.searchParams.get("type");

  const where: any = {};

  if (statusFilter && statusFilter !== "all") {
    where.status = statusFilter;
  }
  if (typeFilter === "site") {
    where.courseId = null;
  } else if (typeFilter === "course") {
    where.courseId = { not: null };
  }

  try {
    const [reviews, counts] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: [{ status: "asc" }, { createdAt: "desc" }],
        include: {
          user: { select: { id: true, name: true, phone: true, role: true } },
          reviewer: { select: { name: true } },
        },
        take: 100,
      }),
      prisma.review.groupBy({
        by: ["status"],
        _count: true,
      }),
    ]);

    const stats = {
      pending: counts.find((c) => c.status === "pending")?._count || 0,
      approved: counts.find((c) => c.status === "approved")?._count || 0,
      rejected: counts.find((c) => c.status === "rejected")?._count || 0,
    };

    return NextResponse.json({ reviews, stats });
  } catch (err: any) {
    console.error("Admin get reviews error:", err);
    return NextResponse.json(
      { error: "خطا در دریافت نظرات." },
      { status: 500 }
    );
  }
}