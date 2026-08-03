import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireLawyerRole } from "@/lib/api-guard";
import { runAiService } from "@/lib/ai/core";

// POST /api/ai/case-analysis
// headers: Authorization: Bearer {token}
// body: { case_title, case_description, documents? }
export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  const roleError = requireLawyerRole(auth.payload);
  if (roleError) return roleError;

  try {
    const { case_title, case_description, documents } = await req.json();

    if (!case_title || !case_description) {
      return NextResponse.json({ error: "عنوان و شرح پرونده الزامی است" }, { status: 400 });
    }

    const result = await runAiService({
      userId: auth.payload.userId,
      serviceType: "case_analysis",
      input: { case_title, case_description, documents },
    });

    return NextResponse.json({ analysis: result.outputData });
  } catch (err) {
    return NextResponse.json({ error: "خطا در تحلیل پرونده" }, { status: 500 });
  }
}
