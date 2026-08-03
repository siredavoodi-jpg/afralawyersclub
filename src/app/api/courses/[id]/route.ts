import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET /api/courses/{id}
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
      include: { lessons: { orderBy: { order: "asc" } } },
    });

    if (!course) {
      return NextResponse.json({ error: "دوره یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ course, lessons: course.lessons });
  } catch (err) {
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
