import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireLawyerRole } from "@/lib/api-guard";
import { runAiService } from "@/lib/ai/core";

// POST /api/ai/petition
// headers: Authorization: Bearer {token}
// body: { petition_type, plaintiff_info, defendant_info, claim, evidence }
export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  const roleError = requireLawyerRole(auth.payload);
  if (roleError) return roleError;

  try {
    const { petition_type, plaintiff_info, defendant_info, claim, evidence } = await req.json();

    if (!petition_type || !claim) {
      return NextResponse.json({ error: "نوع دادخواست و خواسته الزامی است" }, { status: 400 });
    }

    const result = await runAiService({
      userId: auth.payload.userId,
      serviceType: "petition",
      input: { petition_type, plaintiff_info, defendant_info, claim, evidence },
    });

    return NextResponse.json({ petition: result.outputData });
  } catch (err) {
    return NextResponse.json({ error: "خطا در تولید دادخواست" }, { status: 500 });
  }
}
