import { Card, CardBody } from "@/components/ui/Card";
import { AiToolCard } from "@/components/ai/AiToolCard";
import { CourseCard } from "@/components/course/CourseCard";
import { FileSearch, FileText, ShieldCheck, CalendarClock } from "lucide-react";
import { aiToolCards, sampleCourses } from "@/lib/sample-data";

const quickStats = [
  { label: "پرونده‌های تحلیل‌شده این ماه", value: "۸", icon: FileSearch },
  { label: "دادخواست‌های تولیدشده", value: "۵", icon: FileText },
  { label: "قراردادهای بررسی‌شده", value: "۳", icon: ShieldCheck },
  { label: "روزهای باقی‌مانده اشتراک", value: "۲۲", icon: CalendarClock },
];

export default function LawyerDashboardPage() {
  // وکلا به همه دوره‌ها دسترسی دارند
  const allCourses = sampleCourses;

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">داشبورد وکیل</h1>
      <p className="mt-1 text-neutral-600">خلاصه فعالیت‌های حقوقی این ماه</p>

      {/* آمار سریع */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((s) => (
          <Card key={s.label}>
            <CardBody className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <s.icon size={22} aria-hidden />
              </span>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
                <p className="text-xs text-neutral-500">{s.label}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* ابزارهای AI */}
      <h2 className="mt-10 text-xl font-bold text-neutral-900">ابزارهای AI</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {aiToolCards.map((tool) => (
          <AiToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* بخش جدید: دوره‌های آموزشی */}
      <h2 className="mt-10 text-xl font-bold text-neutral-900">دوره‌های آموزشی</h2>
      <p className="mt-1 text-sm text-neutral-600">
        به عنوان وکیل عضو باشگاه، به همه دوره‌های آموزشی دسترسی دارید
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allCourses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}