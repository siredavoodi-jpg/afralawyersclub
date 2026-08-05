import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/course/CourseCard";
import { sampleCourses } from "@/lib/sample-data";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="دوره‌ها" subtitle="آموزش تخصصی هوش مصنوعی برای وکلا و دانشجویان حقوق" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* دسته‌بندی‌های جدید */}
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

        {/* Grid استاندارد - 4 ستون در دسکتاپ (هماهنگ با Library و Services) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* دوره ویژه - اندازه استاندارد */}
          <Link href="/courses/ai-for-lawyers" className="block">
            <div className="flex h-full flex-col rounded-2xl border-2 border-primary-200 bg-gradient-to-l from-primary-50 to-white p-6 transition-fast hover:border-primary-400">
              <div className="flex items-start justify-between mb-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <BookOpen size={24} aria-hidden />
                </span>
                <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
                  برای علاقمندان
                </span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mt-2">
                آموزش مقدمات هوش مصنوعی
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600 flex-1">
                دوره جامع مقدماتی هوش مصنوعی ویژه جامعه وکالت؛ فصل اول شامل ۵ درس، فصل‌های بعدی به‌زودی.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-bold text-white w-fit">
                شروع دوره
                <ArrowLeft size={16} aria-hidden />
              </span>
            </div>
          </Link>

          {/* سایر دوره‌ها */}
          {sampleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </>
  );
}