import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAuth } from "@/lib/api-guard";
import { ReviewStatus } from "@prisma/client";

// POST: ایجاد نظر جدید (فقط کاربران لاگین شده)
export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  try {
    const body = await req.json();
    const { rating, title, content, courseId } = body;

    // اعتبارسنجی
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "امتیاز باید بین ۱ تا ۵ باشد." },
        { status: 400 }
      );
    }
    if (!content || content.trim().length < 5) {
      return NextResponse.json(
        { error: "متن نظر باید حداقل ۵ کاراکتر باشد." },
        { status: 400 }
      );
    }

 
    // جلوگیری از ثبت نظر تکراری برای یک دوره توسط یک کاربر
    if (courseId) {
      const existing = await prisma.review.findFirst({
        where: {
          userId: auth.payload.userId,
          courseId,
        },
      });
      if (existing) {
        return NextResponse.json(
          { error: "شما قبلاً برای این دوره نظر ثبت کرده‌اید." },
          { status: 409 }
        );
      }
    }

    const review = await prisma.review.create({
      data: {
        userId: auth.payload.userId,
        courseId: courseId || null,
        rating,
        title: title?.trim() || null,
        content: content.trim(),
        status: ReviewStatus.pending,
      },
    });

    return NextResponse.json(
      { review, message: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود." },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Create review error:", err);
    return NextResponse.json(
      { error: "ثبت نظر با خطا مواجه شد." },
      { status: 500 }
    );
  }
}

// GET: دریافت نظرات تاییدشده (عمومی)
export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("courseId");

  try {
    const where: any = { status: ReviewStatus.approved };
    if (courseId === "site") {
      where.courseId = null; // نظرات کلی سایت
    } else if (courseId) {
      where.courseId = courseId;
    } else {
      where.courseId = null; // پیش‌فرض: نظرات کلی سایت
    }

    const [reviews, stats] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          rating: true,
          title: true,
          content: true,
          createdAt: true,
          user: { select: { id: true, name: true } },
        },
        take: 50,
      }),
      prisma.review.aggregate({
        where,
        _avg: { rating: true },
        _count: true,
      }),
    ]);

    return NextResponse.json({
      reviews,
      average: stats._avg.rating ?? 0,
      count: stats._count,
    });
  } catch (err: any) {
    console.error("Get reviews error:", err);
    return NextResponse.json(
      { error: "دریافت نظرات با خطا مواجه شد." },
      { status: 500 }
    );
  }
}