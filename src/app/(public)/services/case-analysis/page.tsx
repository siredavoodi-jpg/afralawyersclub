"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { getAuthToken } from "@/lib/auth-client";

export default function CaseAnalysisPage() {
  const [caseTitle, setCaseTitle] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!caseTitle || !caseDescription) return;

    const token = getAuthToken();
    if (!token) {
      setError("برای استفاده از این خدمت، ابتدا وارد حساب کاربری خود شوید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ai/case-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ case_title: caseTitle, case_description: caseDescription }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد. دوباره تلاش کنید.");
        return;
      }

      const text =
        typeof data.analysis === "string" ? data.analysis : data.analysis?.result ?? JSON.stringify(data.analysis);
      setResult(text);
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="تحلیل پرونده" subtitle="اطلاعات پرونده خود را وارد کنید تا هوش مصنوعی آن را تحلیل کند" />
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="عنوان پرونده"
            name="case_title"
            placeholder="مثلاً: دعوی مطالبه وجه"
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            required
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="case_description" className="text-sm font-medium text-neutral-700">
              شرح واقعه
            </label>
            <textarea
              id="case_description"
              name="case_description"
              rows={6}
              placeholder="شرح کامل واقعه و مستندات موجود را بنویسید..."
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
              className="rounded-lg border border-neutral-300 px-4 py-2.5 text-base placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" variant="secondary" size="lg" disabled={loading}>
            {loading ? "در حال تحلیل..." : "تحلیل با AI"}
          </Button>
          <p className="text-xs text-neutral-500">
            این خدمت برای وکلای احراز شده با اشتراک Professional فعال است.
          </p>
        </form>

        <Card>
          <CardBody className="flex flex-col gap-4">
            <h3 className="font-bold text-neutral-900">نتیجه تحلیل</h3>
            <div className="whitespace-pre-wrap rounded-lg bg-neutral-50 p-4 text-sm text-neutral-700">
              {result ??
                "پس از ارسال فرم، خلاصه پرونده، نکات کلیدی، قوانین مرتبط، پیشنهادات اقدام و ریسک‌ها اینجا نمایش داده می‌شود."}
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}