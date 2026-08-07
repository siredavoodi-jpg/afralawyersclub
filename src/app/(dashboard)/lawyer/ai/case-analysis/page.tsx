"use client";

import { useState } from "react";
import {
  FileSearch,
  Upload,
  Sparkles,
  Loader2,
  FileText,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function LawyerCaseAnalysisPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !description) return;
    setAnalyzing(true);
    // فراخوانی POST /api/ai/case-analysis
    await new Promise((r) => setTimeout(r, 1200));
    setAnalyzing(false);
    setHasResult(true);
  }

  return (
    <div>
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileSearch size={24} aria-hidden />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            تحلیل پرونده
          </h1>
          <Badge tone="primary">
            <Sparkles size={12} aria-hidden />
            مبتنی بر AI
          </Badge>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          پرونده خود را شرح دهید تا هوش مصنوعی خلاصه، نکات کلیدی و قوانین مرتبط
          را استخراج کند
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* فرم ورودی */}
        <Card hover={false}>
          <CardBody>
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-ink">
              <FileText size={18} className="text-primary" aria-hidden />
              اطلاعات پرونده
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="عنوان پرونده"
                name="case_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: پرونده مطالبه وجه"
                required
              />

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="case_description"
                  className="text-sm font-medium text-ink-soft"
                >
                  شرح واقعه
                </label>
                <textarea
                  id="case_description"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="جزئیات پرونده، وقایع و ادعاهای طرفین را شرح دهید…"
                  className="rounded-btn border border-line bg-surface px-4 py-3 text-sm text-ink transition-all duration-300 placeholder:text-ink-soft/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="documents"
                  className="text-sm font-medium text-ink-soft"
                >
                  اسناد پیوست
                </label>
                <label
                  htmlFor="documents"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-btn border-2 border-dashed border-line bg-base px-4 py-6 text-center transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                >
                  <Upload size={22} className="text-primary" aria-hidden />
                  <span className="text-sm text-ink-soft">
                    فایل‌ها را اینجا رها کنید یا کلیک کنید
                  </span>
                  <span className="text-xs text-ink-soft/60">
                    PDF، DOC، DOCX یا تصاویر
                  </span>
                </label>
                <input
                  id="documents"
                  name="documents"
                  type="file"
                  multiple
                  className="hidden"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                    در حال تحلیل…
                  </>
                ) : (
                  <>
                    <Sparkles size={16} aria-hidden />
                    تحلیل با AI
                  </>
                )}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* نتیجه تحلیل */}
        <Card hover={false}>
          <CardBody className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 font-bold text-ink">
              <FileSearch size={18} className="text-secondary" aria-hidden />
              نتیجه تحلیل
            </h3>

            {hasResult ? (
              <div className="rounded-btn border border-accent/30 bg-accent/10 p-4 text-sm leading-7 text-ink-soft">
                تحلیل پرونده با موفقیت انجام شد. نتایج کامل اینجا نمایش داده
                می‌شود.
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-btn border border-dashed border-line bg-base p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileSearch size={26} aria-hidden />
                </span>
                <p className="text-sm leading-7 text-ink-soft">
                  خروجی تحلیل پرونده اینجا نمایش داده می‌شود.
                </p>
                <div className="mt-2 flex items-start gap-2 rounded-btn bg-primary/5 p-3 text-right">
                  <Info size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <p className="text-xs leading-5 text-ink-soft">
                    نتیجه شامل خلاصه پرونده، نکات کلیدی، قوانین مرتبط و پیشنهادات
                    هوش مصنوعی خواهد بود.
                  </p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}