import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/course/CourseCard";
import { sampleCourses } from "@/lib/sample-data";

export default function LawyersCoursesPage() {
  const courses = sampleCourses.filter((c) => c.accessLevel === "lawyers");

  return (
    <>
      <PageHeader
        badge="برای وکلای عضو"
        title="دوره‌های ویژه وکلای عضو باشگاه"
        subtitle="دوره‌های تخصصی و پیشرفته مخصوص وکلای عضو باشگاه افرا"
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </>
  );
}