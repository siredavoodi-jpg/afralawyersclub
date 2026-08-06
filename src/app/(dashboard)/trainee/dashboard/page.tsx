import { Card, CardBody } from "@/components/ui/Card";
import { CourseCard } from "@/components/course/CourseCard";
import { FileSearch, FileText, ShieldCheck, CalendarClock } from "lucide-react";
import { sampleCourses } from "@/lib/sample-data";

const quickStats = [
  { label: "دوره‌های تکمیل شده", value: "۲", icon: FileSearch },
  { label: "ساعات آموزش", value: "۱۲", icon: FileText },
  { label: "آزمون‌های داده شده", value: "۳", icon: ShieldCheck },
  { label: "روزهای باقی‌مانده کارآموزی", value: "۱۸۰", icon: CalendarClock },
];

export default function TraineeDashboardPage() {
  // کارآموزان به همه دوره‌ها دسترسی دارند (شامل دوره‌های کارآموزی)
  const traineeCourses = sampleCourses;

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">داشبورد کارآموز</h1>
      <p className="mt-1 text-neutral-600">خلاصه فعالیت‌های آموزشی شما</p>

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

      {/* دوره‌های آموزشی - شامل دوره‌های کارآموزی */}
      <h2 className="mt-10 text-xl font-bold text-neutral-900">دوره‌های آموزشی</h2>
      <p className="mt-1 text-sm text-neutral-600">
        به عنوان کارآموز، به همه دوره‌ها از جمله دوره‌های اختصاصی کارآموزی دسترسی دارید
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {traineeCourses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}