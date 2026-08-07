"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Upload,
  Sparkles,
  Loader2,
  FileText,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function LawyerContractPage() {
  const [fileName, setFileName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fileName) return;
    setAnalyzing(true);
    // فراخوانی POST /api/ai/contract-analysis
    await new Promise((r) => setTimeout(r, 1200));
    setAnalyzing(false);
    setHasResult(true);
  }

  return (
    <div>
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <ShieldCheck size={24} aria-hidden />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            تحلیل قرارداد
          </h1>
          <Badge tone="secondary">
            <Sparkles size={12} aria-hidden />
            مبتنی بر AI
          </Badge>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          فایل قرارداد را آپلود کنید تا بندهای مهم، ریسک‌ها و نکات حقوقی شناسایی
          شوند
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* فرم آپلود */}
        <Card hover={false}>
          <CardBody>
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-ink">
              <FileText size={18} className="text-secondary" aria-hidden />
              آپلود قرارداد
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contract_file"
                  className="text-sm font-medium text-ink-soft"
                >
                  فایل قرارداد
                </label>
                <label
                  htmlFor="contract_file"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-btn border-2 border-dashed border-line bg-base px-4 py-10 text-center transition-all duration-300 hover:border-secondary/50 hover:bg-secondary/5"
                >
                  <Upload size={28} className="text-secondary" aria-hidden />
                  <span className="text-sm font-medium text-ink">
                    {fileName || "فایل قرارداد را انتخاب کنید"}
                  </span>
                  <span className="text-xs text-ink-soft/60">
                    فرمت‌های مجاز: PDF، DOC، DOCX
                  </span>
                </label>
                <input
                  id="contract_file"
                  name="contract_file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  className="hidden"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={analyzing || !fileName}
              >
                {analyzing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                    در حال تحلیل…
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} aria-hidden />
                    تحلیل قرارداد
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
              <ShieldCheck size={18} className="text-accent" aria-hidden />
              نتیجه تحلیل
            </h3>

            {hasResult ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 rounded-btn border border-accent/30 bg-accent/10 p-3 text-sm text-accent-hover">
                  <CheckCircle size={16} className="shrink-0" aria-hidden />
                  تحلیل قرارداد با موفقیت انجام شد.
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-btn border border-dashed border-line bg-base p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <ShieldCheck size={26} aria-hidden />
                </span>
                <p className="text-sm leading-7 text-ink-soft">
                  خروجی تحلیل قرارداد اینجا نمایش داده می‌شود.
                </p>
                <div className="mt-2 w-full space-y-2 text-right">
                  <div className="flex items-start gap-2 rounded-btn bg-base p-3">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    <p className="text-xs leading-5 text-ink-soft">
                      شناسایی بندهای کلیدی و تعهدات طرفین
                    </p>
                  </div>
                  <div className="flex items-start gap-2 rounded-btn bg-base p-3">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
                    <p className="text-xs leading-5 text-ink-soft">
                      هشدار درباره ریسک‌ها و بندهای مبهم
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}