import { notFound } from "next/navigation";
import { Clock, Star, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { sampleCourses } from "@/lib/sample-data";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = sampleCourses.find((c) => c.id === params.id);
  if (!course) return notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 text-primary-400">
        تصویر دوره
      </div>
      <h1 className="text-3xl font-bold text-neutral-900">{course.title}</h1>
      <p className="mt-4 leading-relaxed text-neutral-600">{course.description}</p>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-neutral-600">
        <span className="flex items-center gap-1.5">
          <Clock size={16} aria-hidden /> {Math.round(course.duration / 60)} ساعت
        </span>
        {course.rating && (
          <span className="flex items-center gap-1.5">
            <Star size={16} className="fill-secondary-500 text-secondary-500" aria-hidden /> {course.rating}
          </span>
        )}
        {course.studentsCount && (
          <span className="flex items-center gap-1.5">
            <Users size={16} aria-hidden /> {course.studentsCount.toLocaleString("fa-IR")} دانشجو
          </span>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-xl border border-neutral-100 p-6">
        <span className="text-xl font-bold text-secondary-600">
          {course.isFree ? "رایگان" : `${course.price.toLocaleString("fa-IR")} تومان`}
        </span>
        <ButtonLink href="/register" variant="secondary">
          ثبت‌نام در دوره
        </ButtonLink>
      </div>
    </section>
  );
}
