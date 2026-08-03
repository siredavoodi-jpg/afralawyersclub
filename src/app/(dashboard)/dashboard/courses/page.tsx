import { CourseCard } from "@/components/course/CourseCard";
import { sampleCourses } from "@/lib/sample-data";

export default function MyCoursesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">دوره‌های من</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleCourses.slice(0, 3).map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}
