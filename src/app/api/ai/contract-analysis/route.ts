import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireLawyerRole } from "@/lib/api-guard";
import { runAiService } from "@/lib/ai/core";

// POST /api/ai/contract-analysis
// headers: Authorization: Bearer {token}
// body: multipart/form-data { contract_file }
// توجه: در این اسکلت، فایل باید ابتدا در Supabase Storage آپلود و URL آن اینجا پاس داده شود.
export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  const roleError = requireLawyerRole(auth.payload);
  if (roleError) return roleError;

  try {
    const formData = await req.formData();
    const contractFileUrl = formData.get("contract_file_url");

    if (!contractFileUrl) {
      return NextResponse.json({ error: "فایل قرارداد الزامی است" }, { status: 400 });
    }

    const result = await runAiService({
      userId: auth.payload.userId,
      serviceType: "contract",
      input: { contract_file_url: contractFileUrl },
    });

    return NextResponse.json({ analysis: result.outputData });
  } catch (err) {
    return NextResponse.json({ error: "خطا در تحلیل قرارداد" }, { status: 500 });
  }
}
