import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/course/CourseCard";
import { sampleCourses } from "@/lib/sample-data";

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="دوره‌ها" subtitle="آموزش تخصصی هوش مصنوعی برای وکلا و دانشجویان حقوق" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/courses" className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white">
            همه دوره‌ها
          </Link>
          <Link href="/courses/free" className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200">
            رایگان
          </Link>
          <Link href="/courses/paid" className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200">
            پولی
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* کارت برجسته دوره هوش مصنوعی برای وکلا */}
          <Link href="/courses/ai-for-lawyers" className="block sm:col-span-2 lg:col-span-3">
            <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-primary-200 bg-gradient-to-l from-primary-50 to-white p-6 transition-fast hover:border-primary-400 sm:flex-row">
              <Image
                src="/images/avatar.png"
                alt="آواتار باشگاه وکلای افرا"
                width={140}
                height={93}
                className="h-24 w-auto shrink-0"
              />
              <div className="flex-1 text-center sm:text-right">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">رایگان</span>
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">فصل اول منتشر شد</span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-neutral-900">هوش مصنوعی برای وکلا</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  دوره جامع مقدماتی هوش مصنوعی ویژه جامعه وکالت؛ فصل اول شامل ۵ درس رایگان، فصل‌های بعدی به‌زودی.
                </p>
              </div>
              <span className="flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-sm font-bold text-white">
                شروع دوره
                <ArrowLeft size={16} aria-hidden />
              </span>
            </div>
          </Link>

          {sampleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </>
  );
}