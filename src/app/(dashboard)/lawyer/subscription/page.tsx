"use client";

import {
  CreditCard,
  Calendar,
  Crown,
  Check,
  RefreshCw,
  Zap,
  Shield,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const planFeatures = [
  "تحلیل پرونده با AI",
  "تولید لوایح و دادخواست",
  "تحلیل قرارداد",
  "داشبورد کامل وکیل",
  "پشتیبانی اختصاصی",
];

export default function LawyerSubscriptionPage() {
  // محاسبه روزهای باقی‌مانده (نمونه)
  const daysRemaining = 22;
  const totalDays = 30;
  const progressPercent = Math.round((daysRemaining / totalDays) * 100);

  return (
    <div className="max-w-2xl">
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <CreditCard size={24} aria-hidden />
        </div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          اشتراک وکیل
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          وضعیت اشتراک و پلن فعلی شما
        </p>
      </div>

      {/* کارت پلن فعلی */}
      <Card hover={false} className="overflow-hidden">
        <div className="bg-gradient-to-l from-secondary to-secondary-hover p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <Crown size={24} aria-hidden />
              </span>
              <div>
                <p className="text-xs text-white/80">پلن فعلی شما</p>
                <h2 className="text-xl font-extrabold">Professional</h2>
              </div>
            </div>
            <Badge className="bg-white/20 text-white">
              <Zap size={12} aria-hidden />
              فعال
            </Badge>
          </div>
        </div>

        <CardBody className="pt-6">
          {/* نوار پیشرفت */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-medium text-ink">
                <Calendar size={15} className="text-secondary" aria-hidden />
                روزهای باقی‌مانده
              </span>
              <span className="font-en font-bold text-secondary">
                {daysRemaining.toLocaleString("fa-IR")} روز
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-base">
              <div
                className="h-full rounded-full bg-gradient-to-l from-secondary to-secondary-hover transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-ink-soft">
              تاریخ انقضا: ۱۴۰۴/۰۵/۲۰
            </p>
          </div>

          {/* ویژگی‌های پلن */}
          <div className="mb-6 border-t border-line pt-5">
            <h3 className="mb-3 text-sm font-bold text-ink">
              امکانات پلن Professional
            </h3>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {planFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check size={10} strokeWidth={3} aria-hidden />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* دکمه تمدید */}
          <Button variant="secondary" size="lg" className="w-full">
            <RefreshCw size={16} aria-hidden />
            تمدید اشتراک
          </Button>
        </CardBody>
      </Card>

      {/* مزایای تمدید */}
      <div className="mt-6 flex items-start gap-3 rounded-card border border-dashed border-line bg-base p-5">
        <Shield size={20} className="mt-0.5 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="text-sm font-bold text-ink">تمدید خودکار</p>
          <p className="mt-1 text-xs leading-5 text-ink-soft">
            برای جلوگیری از قطع دسترسی، می‌توانید تمدید خودکار را فعال کنید تا
            اشتراک شما به صورت خودکار تمدید شود.
          </p>
        </div>
      </div>
    </div>
  );
}