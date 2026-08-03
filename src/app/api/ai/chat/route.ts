import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-guard";
import { runAiService } from "@/lib/ai/core";

// POST /api/ai/chat
// headers: Authorization: Bearer {token}
// body: { question: string }
// توجه: طبق ماتریس دسترسی، نسخه محدود این خدمت برای Guest/Member هم آزاد است؛
// در صورت نیاز به محدودسازی نرخ درخواست برای کاربران غیر وکیل، اینجا اضافه کنید.
export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  try {
    const { question } = await req.json();
    if (!question) {
      return NextResponse.json({ error: "سوال الزامی است" }, { status: 400 });
    }

    const result = await runAiService({
      userId: auth.payload.userId,
      serviceType: "chat",
      input: { question },
    });

    return NextResponse.json({ answer: result.outputData });
  } catch (err) {
    return NextResponse.json({ error: "خطا در پاسخ‌گویی چت" }, { status: 500 });
  }
}
