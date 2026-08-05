import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken, getTokenFromHeader } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const header = req.headers.get("Authorization");
  const token = getTokenFromHeader(header);
  if (!token) return NextResponse.json({ error: "ورود لازم است" }, { status: 401 });

  const payload = verifyAuthToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "فقط ادمین" }, { status: 403 });
  }

  const body = await req.json();
  const { status } = body; // "published" | "rejected"

  if (!["published", "rejected"].includes(status)) {
    return NextResponse.json({ error: "وضعیت نامعتبر" }, { status: 400 });
  }

  await prisma.marketListing.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ ok: true });
}