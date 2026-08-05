import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken, getTokenFromHeader } from "@/lib/auth";

export async function GET(req: Request) {
  const header = req.headers.get("Authorization");
  const token = getTokenFromHeader(header);
  if (!token) return NextResponse.json({ error: "ورود لازم است" }, { status: 401 });

  const payload = verifyAuthToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "فقط ادمین" }, { status: 403 });
  }

  const listings = await prisma.marketListing.findMany({
    include: { images: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(listings);
}