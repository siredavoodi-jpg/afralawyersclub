/**
 * هسته مشترک سرویس‌های هوش مصنوعی (بخش ۷.۱ در MASTER_PROMPT.md)
 *
 * طبق تصمیم پروژه: طراحی/معماری این لایه اینجا پیاده شده،
 * و اتصال واقعی به مدل (کلید API، انتخاب provider) توسط شما تکمیل می‌شود.
 * محل دقیق که باید کد را جایگزین کنید با «TODO» مشخص شده.
 */

import { prisma } from "@/lib/db/prisma";
import type { AiServiceType } from "@prisma/client";

export const SYSTEM_PROMPTS: Record<AiServiceType, string> = {
  case_analysis: `You are an expert legal AI assistant specializing in Iranian law.
Analyze the following case and provide:
1. A concise summary
2. Key legal issues
3. Relevant laws and articles
4. Recommended actions
5. Potential risks

Respond in Persian (Farsi) with professional legal terminology.`,

  petition: `You are a legal document generator specializing in Iranian court petitions.
Generate a formal petition based on the provided information.
Follow the standard format of Iranian judicial petitions.
Use professional legal language in Persian.`,

  contract: `You are an expert legal AI assistant specializing in Iranian contract law.
Analyze the uploaded contract and provide:
1. Key clauses
2. Legal risks
3. Suggested revisions
4. An executive summary

Respond in Persian (Farsi) with professional legal terminology.`,

  chat: `You are a helpful legal assistant specializing in Iranian law.
Answer the user's question clearly, cite relevant laws/articles when applicable,
and suggest further reading. Respond in Persian (Farsi).`,
};

interface RunAiServiceParams {
  userId: string;
  serviceType: AiServiceType;
  input: Record<string, unknown>;
}

/**
 * تابع واحد اجرای هر سرویس AI:
 * ۱) یک رکورد AiRequest با status=pending می‌سازد (برای Logging/Analytics — بخش ۷.۱)
 * ۲) TODO: مدل را صدا می‌زند (OpenAI/Azure OpenAI/...)
 * ۳) نتیجه و تعداد توکن مصرفی را روی همان رکورد ثبت می‌کند
 */
export async function runAiService({ userId, serviceType, input }: RunAiServiceParams) {
  const request = await prisma.aiRequest.create({
    data: {
      userId,
      serviceType,
      inputData: input as any,
      status: "processing",
    },
  });

  try {
    // ------------------------------------------------------------------
    // TODO: اتصال واقعی به مدل را اینجا اضافه کنید. مثال با OpenAI SDK:
    //
    //   import OpenAI from "openai";
    //   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    //   const completion = await openai.chat.completions.create({
    //     model: process.env.OPENAI_MODEL || "gpt-4o",
    //     messages: [
    //       { role: "system", content: SYSTEM_PROMPTS[serviceType] },
    //       { role: "user", content: JSON.stringify(input) },
    //     ],
    //   });
    //   const output = completion.choices[0].message.content;
    //   const tokensUsed = completion.usage?.total_tokens ?? 0;
    // ------------------------------------------------------------------

    const output = { note: "خروجی نمونه — TODO: جایگزین با پاسخ واقعی مدل", input };
    const tokensUsed = 0;

    const updated = await prisma.aiRequest.update({
      where: { id: request.id },
      data: {
        outputData: output as any,
        tokensUsed,
        status: "completed",
      },
    });

    return updated;
  } catch (err) {
    await prisma.aiRequest.update({
      where: { id: request.id },
      data: { status: "failed" },
    });
    throw err;
  }
}
