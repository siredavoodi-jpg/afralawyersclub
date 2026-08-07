import Link from "next/link";
import {
  FileSearch,
  FileText,
  ShieldCheck,
  Gavel,
  BookMarked,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const tools = [
  {
    href: "/lawyer/ai/case-analysis",
    title: "تحلیل پرونده",
    desc: "خلاصه، نکات کلیدی و قوانین مرتبط",
    icon: FileSearch,
    accent: "primary" as const,
  },
  {
    href: "/services/petition",
    title: "تولید دادخواست",
    desc: "تولید متن دادخواست با فرمت استاندارد",
    icon: FileText,
    accent: "secondary" as const,
  },
  {
    href: "/lawyer/ai/contract",
    title: "تحلیل قرارداد",
    desc: "شناسایی بندهای مهم و ریسک‌ها",
    icon: ShieldCheck,
    accent: "accent" as const,
  },
  {
    href: "/library/laws",
    title: "جستجوی قوانین",
    desc: "جستجوی هوشمند در متن قوانین",
    icon: Gavel,
    accent: "primary" as const,
  },
  {
    href: "/lawyer/ai/documents",
    title: "بانک آرا",
    desc: "دسترسی به آرای قضایی مرتبط",
    icon: BookMarked,
    accent: "secondary" as const,
  },
];

const accentStyles = {
  primary: {
    icon: "bg-primary/10 text-primary",
    text: "text-primary",
  },
  secondary: {
    icon: "bg-secondary/10 text-secondary",
    text: "text-secondary-hover",
  },
  accent: {
    icon: "bg-accent/10 text-accent",
    text: "text-accent-hover",
  },
};

export default function LawyerAiToolsPage() {
  return (
    <div>
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles size={24} aria-hidden />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            ابزارهای AI
          </h1>
          <Badge tone="primary">
            <Sparkles size={12} aria-hidden />
            هوش مصنوعی حقوقی
          </Badge>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          مجموعه‌ای از ابزارهای هوشمند برای تسریع کارهای حقوقی شما
        </p>
      </div>

      {/* گرید ابزارها */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => {
          const Icon = t.icon;
          const styles = accentStyles[t.accent];
          return (
            <Link key={t.href} href={t.href} className="group">
              <Card className="h-full">
                <CardBody className="flex h-full flex-col gap-3">
                  <span
                    className={
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 " +
                      styles.icon
                    }
                  >
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="font-bold text-ink group-hover:text-primary">
                    {t.title}
                  </h3>
                  <p className="text-sm leading-6 text-ink-soft">{t.desc}</p>
                  <span
                    className={
                      "mt-auto flex w-fit items-center gap-1 pt-2 text-sm font-medium " +
                      styles.text
                    }
                  >
                    استفاده
                    <ArrowLeft
                      size={14}
                      className="transition-transform duration-300 group-hover:-translate-x-1"
                      aria-hidden
                    />
                  </span>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* راهنما */}
      <div className="mt-10 overflow-hidden rounded-card bg-dashboard-gradient p-6 text-white sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold sm:text-xl">
              <Sparkles size={20} aria-hidden />
              نکته حرفه‌ای
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-primary-100">
              برای دریافت بهترین نتیجه از ابزارهای AI، اطلاعات پرونده و قراردادها
              را با جزئیات کامل وارد کنید. هرچه ورودی دقیق‌تر باشد، خروجی
              هوشمندتر خواهد بود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}