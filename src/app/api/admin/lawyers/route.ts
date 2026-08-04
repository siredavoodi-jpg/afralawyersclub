import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAuth, requireAdminRole } from "@/lib/api-guard";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const roleError = requireAdminRole(auth.payload);
  if (roleError) return roleError;

  const lawyers = await prisma.lawyer.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, name: true, phone: true, nationalId: true, role: true } } },
  });

  return NextResponse.json({ lawyers });
}