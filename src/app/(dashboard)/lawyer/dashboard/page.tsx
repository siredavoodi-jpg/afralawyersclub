import Link from "next/link";
import {
  FileSearch,
  FileText,
  ShieldCheck,
  CalendarClock,
  ArrowLeft,
  Briefcase,
  Sparkles,
  Scale,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { AiToolCard } from "@/components/ai/AiToolCard";
import { CourseCard } from "@/components/course/CourseCard";
import { aiToolCards, sampleCourses } from "@/lib/sample-data";

const quickStats = [
  {
    label: "پرونده‌های تحلیل‌شده این ماه",
    value: "۸",
    icon: FileSearch,
    accent: "primary" as const,
  },
  {
    label: "دادخواست‌های تولیدشده",
    value: "۵",
    icon: FileText,
    accent: "secondary" as const,
  },
  {
    label: "قراردادهای بررسی‌شده",
    value: "۳",
    icon: ShieldCheck,
    accent: "accent" as const,
  },
  {
    label: "روزهای باقی‌مانده اشتراک",
    value: "۲۲",
    icon: CalendarClock,
    accent: "primary" as const,
  },
];

const accentStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

const aiHighlights = [
  {
    href: "/lawyer/ai/case-analysis",
    icon: FileSearch,
    title: "تحلیل پرونده",
    desc: "آپلود پرونده و دریافت خلاصه و نکات کلیدی",
  },
  {
    href: "/lawyer/ai/contract",
    icon: ShieldCheck,
    title: "بررسی قرارداد",
    desc: "تشخیص ریسک‌ها و بندهای مهم",
  },
  {
    href: "/lawyer/ai/documents",
    icon: FileText,
    title: "تولید دادخواست",
    desc: "ساخت اسناد با فرمت استاندارد قضایی",
  },
];

export default function LawyerDashboardPage() {
  const lawyerCourses = sampleCourses.filter(
    (c) => c.accessLevel !== "trainees"
  );

  return (
    <div>
      {/* هدر */}
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            داشبورد وکیل
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            خلاصه فعالیت‌های حقوقی این ماه
          </p>
        </div>
        <Link
          href="/lawyer/cases"
          className="inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-dark"
        >
          <Briefcase size={16} aria-hidden />
          پرونده جدید
        </Link>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((s) => {
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
                <div className="min-w-0">
                  <p className="font-en text-2xl font-extrabold text-ink">
                    {s.value}
                  </p>
                  <p className="truncate text-xs text-ink-soft">{s.label}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* ابزارهای AI - میانبر */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink">
              ابزارهای AI حقوقی
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              دسترسی سریع به پرکاربردترین ابزارها
            </p>
          </div>
          <Link
            href="/lawyer/ai/tools"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
          >
            مشاهده همه
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {aiHighlights.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full">
                  <CardBody className="flex flex-col gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon size={22} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-bold text-ink group-hover:text-primary">
                        {tool.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-ink-soft">
                        {tool.desc}
                      </p>
                    </div>
                    <span className="mt-auto flex items-center gap-1 pt-2 text-xs font-medium text-primary">
                      شروع
                      <ArrowLeft
                        size={12}
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

        {/* گرید همه ابزارها */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiToolCards.map((tool) => (
            <AiToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* دوره‌های آموزشی */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink">دوره‌های آموزشی</h2>
            <p className="mt-1 text-sm text-ink-soft">
              به عنوان وکیل عضو باشگاه، به همه دوره‌های آموزشی دسترسی دارید
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
          >
            مشاهده همه
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lawyerCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>

      {/* پیام ارتقا به کارآموزان */}
      <div className="mt-10 overflow-hidden rounded-card bg-gradient-to-l from-secondary to-secondary-hover p-8 text-white shadow-card-hover">
        <Scale size={28} className="mb-3" aria-hidden />
        <h2 className="text-xl font-extrabold sm:text-2xl">
          به کارآموزان خود کمک کنید
        </h2>
        <p className="mt-2 text-sm text-white/90">
          با معرفی دوره‌های اختصاصی اختبار به کارآموزان خود، مسیر وکالت آنان را
          هموارتر کنید.
        </p>
      </div>
    </div>
  );
}