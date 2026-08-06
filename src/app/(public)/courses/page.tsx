import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/course/CourseCard";
import { sampleCourses } from "@/lib/sample-data";

const categories = [
  { href: "/courses", label: "همه دوره‌ها", active: true },
  { href: "/courses/interested", label: "برای علاقمندان", active: false },
  { href: "/courses/users", label: "برای کاربران", active: false },
  { href: "/courses/lawyers", label: "برای وکلای عضو باشگاه", active: false },
];

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        badge="آموزش تخصصی"
        title="دوره‌ها"
        subtitle="آموزش تخصصی هوش مصنوعی و مهارت‌های حقوقی برای وکلا و دانشجویان حقوق"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* دسته‌بندی‌ها */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-out " +
                (cat.active
                  ? "bg-primary text-white shadow-card"
                  : "bg-surface text-ink-soft border border-line hover:border-primary-200 hover:text-primary")
              }
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Grid دوره‌ها */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* اطلاع‌رسانی دوره‌های کارآموزی */}
        <div className="mt-8 flex items-center justify-center gap-2 rounded-card bg-accent/10 p-4 text-center">
          <GraduationCap size={18} className="shrink-0 text-accent" aria-hidden />
          <p className="text-sm text-accent-hover">
            دوره‌های اختصاصی کارآموزان فقط برای کارآموزان و وکلای عضو باشگاه قابل دسترسی است
          </p>
        </div>
      </section>
    </>
  );
}