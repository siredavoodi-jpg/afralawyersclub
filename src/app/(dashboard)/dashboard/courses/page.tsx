import { CourseCard } from "@/components/course/CourseCard";
import { sampleCourses } from "@/lib/sample-data";

export default function MyCoursesPage() {
  // کاربر ثبت‌نام شده: دسترسی به دوره‌های علاقمندان + کاربران
  // (دوره‌های ویژه وکلا قابل دسترسی نیستند)
  const myCourses = sampleCourses.filter(
    (c) => c.accessLevel === "interested" || c.accessLevel === "users"
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">دوره‌های من</h1>
      <p className="mt-1 text-neutral-600">
        همه دوره‌هایی که با سطح عضویت شما در دسترس هستند
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {myCourses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}