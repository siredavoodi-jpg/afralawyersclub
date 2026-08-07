import { notFound } from "next/navigation";
import { Clock, Star, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { sampleCourses } from "@/lib/sample-data";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = sampleCourses.find((c) => c.id === params.id);
  if (!course) return notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* تصویر دوره */}
      <div className="mb-8 flex aspect-video items-center justify-center rounded-card bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-light text-primary-light">
        <span className="text-lg font-bold">تصویر دوره</span>
      </div>

      <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
        {course.title}
      </h1>
      <p className="mt-4 leading-relaxed text-ink-soft">{course.description}</p>

      {/* اطلاعات دوره */}
      <div className="mt-6 flex flex-wrap gap-6 text-sm text-ink-soft">
        <span className="flex items-center gap-1.5">
          <Clock size={16} className="text-primary" aria-hidden />
          {Math.round(course.duration / 60)} ساعت
        </span>
        {course.rating && (
          <span className="flex items-center gap-1.5">
            <Star size={16} className="fill-secondary text-secondary" aria-hidden />
            {course.rating}
          </span>
        )}
        {course.studentsCount && (
          <span className="flex items-center gap-1.5">
            <Users size={16} className="text-accent" aria-hidden />
            {course.studentsCount.toLocaleString("fa-IR")} دانشجو
          </span>
        )}
      </div>

      {/* قیمت و ثبت‌نام */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-card border border-line bg-surface p-6 shadow-card sm:flex-row">
        <span className="text-xl font-extrabold text-secondary">
          {course.isFree
            ? "رایگان"
            : `${course.price.toLocaleString("fa-IR")} تومان`}
        </span>
        <ButtonLink href="/register" variant="secondary">
          ثبت‌نام در دوره
        </ButtonLink>
      </div>
    </section>
  );
}