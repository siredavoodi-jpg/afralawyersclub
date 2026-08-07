"use client";

import { useState } from "react";
import {
  CreditCard,
  Check,
  Sparkles,
  Crown,
  Rocket,
  ArrowLeft,
  Shield,
  Zap,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type BillingCycle = "monthly" | "yearly";

const plans = [
  {
    name: "Free",
    nameFa: "رایگان",
    icon: Shield,
    monthlyPrice: "۰",
    yearlyPrice: "۰",
    accent: "neutral" as const,
    popular: false,
    features: [
      "دوره‌های رایگان",
      "کتابخانه محدود",
      "نسخه آزمایشی AI",
    ],
  },
  {
    name: "Plus",
    nameFa: "پلاس",
    icon: Rocket,
    monthlyPrice: "۲۹۹,۰۰۰",
    yearlyPrice: "۲,۹۹۰,۰۰۰",
    accent: "primary" as const,
    popular: true,
    features: [
      "دوره‌های کامل",
      "بانک پرامپت",
      "ابزارهای AI محدود",
      "پشتیبانی اولویت‌دار",
    ],
  },
  {
    name: "Professional",
    nameFa: "حرفه‌ای",
    icon: Crown,
    monthlyPrice: "۵۹۹,۰۰۰",
    yearlyPrice: "۵,۹۹۰,۰۰۰",
    accent: "secondary" as const,
    popular: false,
    features: [
      "تحلیل پرونده",
      "تولید لوایح",
      "تحلیل قرارداد",
      "داشبورد کامل",
      "پشتیبانی اختصاصی",
    ],
  },
];

const accentStyles = {
  neutral: {
    icon: "bg-base text-ink-soft",
    button: "ghost",
    border: "border-line",
  },
  primary: {
    icon: "bg-primary/10 text-primary",
    button: "primary",
    border: "border-primary",
  },
  secondary: {
    icon: "bg-secondary/10 text-secondary",
    button: "secondary",
    border: "border-secondary/50",
  },
};

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const currentPlan = "Free";

  return (
    <div>
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <CreditCard size={24} aria-hidden />
        </div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          اشتراک
        </h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
          پلن فعلی شما:
          <Badge tone="primary">رایگان</Badge>
        </p>
      </div>

      {/* سوییچ دوره پرداخت */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <span
          className={
            "text-sm font-medium transition-colors " +
            (billing === "monthly" ? "text-primary" : "text-ink-soft")
          }
        >
          ماهانه
        </span>
        <button
          onClick={() =>
            setBilling(billing === "monthly" ? "yearly" : "monthly")
          }
          className="relative h-7 w-14 rounded-full bg-primary/20 transition-colors duration-300"
          aria-label="تغییر دوره پرداخت"
        >
          <span
            className={
              "absolute top-1 h-5 w-5 rounded-full bg-primary shadow-card transition-all duration-300 " +
              (billing === "yearly" ? "right-1" : "right-8")
            }
          />
        </button>
        <span
          className={
            "text-sm font-medium transition-colors " +
            (billing === "yearly" ? "text-primary" : "text-ink-soft")
          }
        >
          سالانه
        </span>
        {billing === "yearly" && (
          <Badge tone="accent" className="mr-1">
            <Zap size={12} aria-hidden />
            ۱۷٪ تخفیف
          </Badge>
        )}
      </div>

      {/* کارت‌های پلن */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {plans.map((p) => {
          const Icon = p.icon;
          const styles = accentStyles[p.accent];
          const isCurrent = p.name === currentPlan;
          const price = billing === "monthly" ? p.monthlyPrice : p.yearlyPrice;

          return (
            <div key={p.name} className="relative">
              {/* Badge پلن محبوب */}
              {p.popular && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-l from-primary to-secondary px-4 py-1 text-xs font-bold text-white shadow-card">
                    <Sparkles size={12} aria-hidden />
                    محبوب‌ترین
                  </span>
                </div>
              )}

              <Card
                hover={!isCurrent}
                className={
                  "h-full " +
                  (p.popular
                    ? "border-2 border-primary shadow-card-hover"
                    : isCurrent
                    ? "border-2 border-accent bg-accent/5"
                    : styles.border)
                }
              >
                <CardBody className="flex h-full flex-col gap-4 pt-6">
                  {/* آیکون و نام پلن */}
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        "flex h-11 w-11 items-center justify-center rounded-xl " +
                        styles.icon
                      }
                    >
                      <Icon size={22} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold text-ink">
                        {p.nameFa}
                      </h3>
                      <p className="text-xs text-ink-soft" dir="ltr">
                        {p.name}
                      </p>
                    </div>
                  </div>

                  {/* قیمت */}
                  <div className="border-b border-line pb-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-en text-3xl font-extrabold text-ink">
                        {price}
                      </span>
                      <span className="text-sm text-ink-soft">
                        {price === "۰" ? "" : "تومان"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {price === "۰"
                        ? "برای همیشه رایگان"
                        : billing === "monthly"
                        ? "پرداخت ماهانه"
                        : "پرداخت سالانه"}
                    </p>
                  </div>

                  {/* ویژگی‌ها */}
                  <ul className="flex flex-1 flex-col gap-2.5">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-ink-soft"
                      >
                        <span
                          className={
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full " +
                            (p.accent === "neutral"
                              ? "bg-base text-ink-soft"
                              : p.accent === "primary"
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary/10 text-secondary")
                          }
                        >
                          <Check size={10} strokeWidth={3} aria-hidden />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* دکمه */}
                  {isCurrent ? (
                    <div className="mt-2 flex items-center justify-center gap-2 rounded-btn bg-accent/10 px-4 py-2.5 text-sm font-bold text-accent-hover">
                      <Check size={16} aria-hidden />
                      پلن فعلی شما
                    </div>
                  ) : (
                    <Button
                      variant={styles.button as any}
                      className="mt-2 w-full"
                    >
                      ارتقاء به {p.nameFa}
                      <ArrowLeft size={15} aria-hidden />
                    </Button>
                  )}
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>

      {/* مقایسه و راهنما */}
      <div className="mt-10 overflow-hidden rounded-card bg-gradient-to-l from-primary to-primary-dark p-6 text-white sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-extrabold sm:text-xl">
              نمی‌دانید کدام پلن مناسب شماست؟
            </h2>
            <p className="mt-2 text-sm text-primary-100">
              با تیم پشتیبانی تماس بگیرید تا بر اساس نیازهای شما، بهترین پلن را
              پیشنهاد دهیم.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-btn bg-white px-5 py-2.5 text-sm font-bold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary-50"
          >
            مشاوره رایگان
            <ArrowLeft size={14} aria-hidden />
          </a>
        </div>
      </div>

      {/* سوالات متداول کوتاه */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-line bg-surface p-5">
          <Shield size={20} className="text-primary" aria-hidden />
          <h3 className="mt-2 text-sm font-bold text-ink">لغو در هر زمان</h3>
          <p className="mt-1 text-xs leading-5 text-ink-soft">
            می‌توانید اشتراک خود را در هر زمان لغو کنید.
          </p>
        </div>
        <div className="rounded-card border border-line bg-surface p-5">
          <Zap size={20} className="text-secondary" aria-hidden />
          <h3 className="mt-2 text-sm font-bold text-ink">فعال‌سازی آنی</h3>
          <p className="mt-1 text-xs leading-5 text-ink-soft">
            پس از پرداخت، بلافاصله به امکانات دسترسی پیدا می‌کنید.
          </p>
        </div>
        <div className="rounded-card border border-line bg-surface p-5">
          <CreditCard size={20} className="text-accent" aria-hidden />
          <h3 className="mt-2 text-sm font-bold text-ink">پرداخت امن</h3>
          <p className="mt-1 text-xs leading-5 text-ink-soft">
            پرداخت از طریق درگاه‌های معتبر بانکی انجام می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}