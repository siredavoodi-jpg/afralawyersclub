import Link from "next/link";
import {
  FileSearch,
  FileText,
  ShieldCheck,
  CalendarClock,
  Award,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Target,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { CourseCard } from "@/components/course/CourseCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { sampleCourses } from "@/lib/sample-data";

const quickStats = [
  {
    label: "دوره‌های تکمیل شده",
    value: "۲",
    icon: FileSearch,
    accent: "primary" as const,
  },
  {
    label: "ساعات آموزش",
    value: "۱۲",
    icon: FileText,
    accent: "secondary" as const,
  },
  {
    label: "آزمون‌های داده شده",
    value: "۳",
    icon: ShieldCheck,
    accent: "accent" as const,
  },
  {
    label: "روزهای باقی‌مانده کارآموزی",
    value: "۱۸۰",
    icon: CalendarClock,
    accent: "primary" as const,
  },
];

const accentStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

export default function TraineeDashboardPage() {
  // کارآموزان به همه دوره‌ها دسترسی دارند (شامل دوره‌های کارآموزی)
  const traineeCourses = sampleCourses;

  return (
    <div>
      {/* هدر با بنر کارآموز */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <Award size={24} aria-hidden />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
              داشبورد کارآموز
            </h1>
            <Badge tone="secondary">
              <Award size={12} aria-hidden />
              همکار کارآموز
            </Badge>
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            خلاصه فعالیت‌های آموزشی شما
          </p>
        </div>
      </div>

      {/* بنر ویژه کارآموزی */}
      <div className="mb-8 overflow-hidden rounded-card bg-gradient-to-l from-secondary to-secondary-hover p-6 text-white shadow-card-hover sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Target size={20} aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wide">
                مسیر وکالت
              </span>
            </div>
            <h2 className="text-lg font-extrabold sm:text-xl">
              تا آزمون اختبار در کنار شما هستیم
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/90">
              با دوره‌های اختصاصی کارآموزی، مسیر خود را به وکالت پایه یک هموار
              کنید.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex shrink-0 items-center gap-2 rounded-btn bg-white px-5 py-2.5 text-sm font-bold text-secondary transition-all duration-300 hover:scale-[1.02] hover:bg-secondary-light"
          >
            مشاهده دوره‌های اختبار
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>
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

      {/* دوره‌های آموزشی */}
      <div className="mt-10">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-ink">دوره‌های آموزشی</h2>
            <p className="mt-1 text-sm text-ink-soft">
              به عنوان کارآموز، به همه دوره‌ها از جمله دوره‌های اختصاصی
              کارآموزی دسترسی دارید
            </p>
          </div>
          <ButtonLink href="/courses" variant="secondary" size="sm">
            مشاهده همه دوره‌ها
            <ArrowLeft size={14} aria-hidden />
          </ButtonLink>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {traineeCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>

      {/* اقدامات سریع */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-ink">اقدامات سریع</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link href="/courses" className="group">
            <Card className="h-full">
              <CardBody className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-ink group-hover:text-primary">
                    ادامه یادگیری
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    دوره‌های اختصاصی اختبار
                  </p>
                </div>
                <ArrowLeft
                  size={16}
                  className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                  aria-hidden
                />
              </CardBody>
            </Card>
          </Link>

          <Link href="/library/prompts" className="group">
            <Card className="h-full">
              <CardBody className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Sparkles size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-ink group-hover:text-primary">
                    بانک پرامپت
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    پرامپت‌های آماده حقوقی
                  </p>
                </div>
                <ArrowLeft
                  size={16}
                  className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                  aria-hidden
                />
              </CardBody>
            </Card>
          </Link>

          <Link href="/library/articles" className="group">
            <Card className="h-full">
              <CardBody className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <FileText size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-ink group-hover:text-primary">
                    مقالات حقوقی
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    جدیدترین تحلیل‌ها
                  </p>
                </div>
                <ArrowLeft
                  size={16}
                  className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                  aria-hidden
                />
              </CardBody>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}