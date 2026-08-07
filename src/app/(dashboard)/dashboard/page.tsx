import Link from "next/link";
import {
  BookOpen,
  Download,
  Bell,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  FileText,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";

const stats = [
  { label: "دوره‌های ثبت‌نامی", value: "۳", icon: BookOpen, accent: "primary" as const },
  { label: "دانلودها", value: "۱۲", icon: Download, accent: "secondary" as const },
  { label: "اعلان‌های خوانده‌نشده", value: "۲", icon: Bell, accent: "accent" as const },
];

const accentStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

const quickActions = [
  {
    href: "/courses",
    icon: GraduationCap,
    label: "مشاهده دوره‌ها",
    desc: "دوره‌های آموزشی بیشتر",
    color: "primary",
  },
  {
    href: "/library/prompts",
    icon: Sparkles,
    label: "بانک پرامپت",
    desc: "پرامپت‌های تخصصی حقوقی",
    color: "secondary",
  },
  {
    href: "/library/articles",
    icon: FileText,
    label: "مقالات جدید",
    desc: "جدیدترین مطالب",
    color: "accent",
  },
];

export default function MemberDashboardPage() {
  return (
    <div>
      {/* هدر */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          داشبورد
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          خلاصه فعالیت‌های شما در باشگاه وکلای افرا
        </p>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardBody className="flex items-center gap-4">
                <span
                  className={
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl " +
                    accentStyles[s.accent]
                  }
                >
                  <Icon size={22} aria-hidden />
                </span>
                <div>
                  <p className="font-en text-2xl font-extrabold text-ink">
                    {s.value}
                  </p>
                  <p className="text-xs text-ink-soft">{s.label}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* اقدامات سریع */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-ink">اقدامات سریع</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.href} href={a.href} className="group">
                <Card className="h-full">
                  <CardBody className="flex items-start gap-3">
                    <span
                      className={
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 " +
                        accentStyles[a.color as keyof typeof accentStyles]
                      }
                    >
                      <Icon size={20} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-ink group-hover:text-primary">
                        {a.label}
                      </h3>
                      <p className="mt-0.5 text-xs text-ink-soft">{a.desc}</p>
                    </div>
                    <ArrowLeft
                      size={16}
                      className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                      aria-hidden
                    />
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* پیام خوش‌آمدگویی */}
      <div className="mt-10 overflow-hidden rounded-card bg-cta-gradient p-8 text-white shadow-card-hover">
        <Sparkles size={28} className="mb-3" aria-hidden />
        <h2 className="text-xl font-extrabold sm:text-2xl">
          به باشگاه وکلای افرا خوش آمدید!
        </h2>
        <p className="mt-2 text-sm text-white/90">
          با استفاده از ابزارهای AI و دوره‌های تخصصی، مهارت‌های حقوقی خود را ارتقا
          دهید.
        </p>
        <Link
          href="/services"
          className="mt-4 inline-flex items-center gap-2 rounded-btn bg-white px-5 py-2.5 text-sm font-bold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary-50"
        >
          مشاهده ابزارهای AI
          <ArrowLeft size={14} aria-hidden />
        </Link>
      </div>
    </div>
  );
}