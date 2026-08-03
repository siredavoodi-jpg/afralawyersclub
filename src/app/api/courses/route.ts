import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET /api/courses?level=&is_free=&page=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") || undefined;
  const isFreeParam = searchParams.get("is_free");
  const page = Number(searchParams.get("page") || "1");
  const pageSize = 12;

  try {
    const where: any = { status: "published" };
    if (level) where.level = level;
    if (isFreeParam !== null) where.isFree = isFreeParam === "true";

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({ courses, total });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
