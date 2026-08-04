/**
 * هسته مشترک سرویس‌های هوش مصنوعی
 * اتصال واقعی به مدل از طریق Groq انجام می‌شود.
 */

import { prisma } from "@/lib/db/prisma";
import type { AiServiceType } from "@prisma/client";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
 * 1) یک رکورد AiRequest با status=pending ساخته می‌شود
 * 2) درخواست به مدل Groq ارسال می‌شود
 * 3) نتیجه و تعداد توکن مصرفی روی همان رکورد ذخیره می‌شود
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
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPTS[serviceType] },
        { role: "user", content: JSON.stringify(input) },
      ],
    });

    const outputText = completion.choices[0]?.message?.content ?? "";
    const tokensUsed = completion.usage?.total_tokens ?? 0;

    const output = { result: outputText };

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