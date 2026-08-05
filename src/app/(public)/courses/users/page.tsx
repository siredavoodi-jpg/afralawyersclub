import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/course/CourseCard";
import { sampleCourses } from "@/lib/sample-data";

export default function UsersCoursesPage() {
  const courses = sampleCourses.filter((c) => c.accessLevel === "users");
  
  return (
    <>
      <PageHeader title="دوره‌های برای کاربران" subtitle="دوره‌های ویژه کاربران ثبت‌نام شده در سایت" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </>
  );
}