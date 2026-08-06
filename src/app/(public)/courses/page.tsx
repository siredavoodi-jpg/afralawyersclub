import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/course/CourseCard";
import { sampleCourses } from "@/lib/sample-data";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="دوره‌ها" subtitle="آموزش تخصصی هوش مصنوعی و مهارت‌های حقوقی برای وکلا و دانشجویان حقوق" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* دسته‌بندی‌ها */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/courses" className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white">
            همه دوره‌ها
          </Link>
          <Link href="/courses/interested" className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200">
            برای علاقمندان
          </Link>
          <Link href="/courses/users" className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200">
            برای کاربران
          </Link>
          <Link href="/courses/lawyers" className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200">
            برای وکلای عضو باشگاه
          </Link>
        </div>
{/* Grid دوره‌ها */}
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {sampleCourses.map((course) => (
    <CourseCard key={course.id} course={course} />
  ))}
</div>

{/* اطلاع‌رسانی دوره‌های کارآموزی */}
<div className="mt-8 rounded-lg bg-accent-50 p-4 text-center">
  <p className="text-sm text-accent-700">
    💡 دوره‌های اختصاصی کارآموزان فقط برای کارآموزان و وکلای عضو باشگاه قابل دسترسی است
  </p>
</div>
      </section>
    </>
  );
}