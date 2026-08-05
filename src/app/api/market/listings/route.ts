import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken, getTokenFromHeader } from "@/lib/auth";

export async function POST(req: Request) {
  const header = req.headers.get("Authorization");
  const token = getTokenFromHeader(header);
  if (!token) return NextResponse.json({ error: "ورود لازم است" }, { status: 401 });

  const payload = verifyAuthToken(token);
  if (!payload) return NextResponse.json({ error: "توکن نامعتبر" }, { status: 401 });
  if (payload.role !== "lawyer") {
    return NextResponse.json(
      { error: "فقط وکلای تاییدشده می‌توانند آگهی ثبت کنند" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { title, description, price, negotiable, condition, province, city, phone, categoryId, images } = body;

  if (!title || !description || !categoryId) {
    return NextResponse.json({ error: "فیلدهای اجباری را پر کنید" }, { status: 400 });
  }

  const category = await prisma.marketCategory.findUnique({ where: { id: categoryId } });
  if (!category) return NextResponse.json({ error: "دسته نامعتبر" }, { status: 400 });

  const listing = await prisma.marketListing.create({
    data: {
      title,
      description,
      price: price ? Number(price) : null,
      negotiable: !!negotiable,
      condition: condition || null,
      province: province || null,
      city: city || null,
      phone: phone || null,
      status: "pending",
      categoryId,
      sellerId: payload.userId,
      images: {
        create: (images || []).map((url: string, i: number) => ({ url, sortOrder: i })),
      },
    },
  });

  return NextResponse.json({ id: listing.id });
}