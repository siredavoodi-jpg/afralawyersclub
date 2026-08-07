import Link from "next/link";
import { BookOpen, ArrowLeft, GraduationCap } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { Card, CardBody } from "@/components/ui/Card";
import { sampleCourses } from "@/lib/sample-data";

export default function MyCoursesPage() {
  // کاربر ثبت‌نام شده: دسترسی به دوره‌های علاقمندان + کاربران
  // (دوره‌های ویژه وکلا قابل دسترسی نیستند)
  const myCourses = sampleCourses.filter(
    (c) => c.accessLevel === "interested" || c.accessLevel === "users"
  );

  return (
    <div>
      {/* هدر */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen size={24} aria-hidden />
          </div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            دوره‌های من
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            همه دوره‌هایی که با سطح عضویت شما در دسترس هستند
          </p>
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 rounded-btn border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:border-primary/40 hover:text-primary"
        >
          مشاهده همه دوره‌ها
          <ArrowLeft size={14} aria-hidden />
        </Link>
      </div>

      {/* محتوا */}
      {myCourses.length === 0 ? (
        <Card hover={false} className="mt-8">
          <CardBody className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap size={32} className="text-primary" aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">
              هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              از میان دوره‌های آموزشی، دوره مورد نظر خود را انتخاب کرده و
              یادگیری را شروع کنید.
            </p>
            <Link
              href="/courses"
              className="mt-6 inline-flex items-center gap-2 rounded-btn bg-primary px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-dark"
            >
              مشاهده دوره‌ها
              <ArrowLeft size={14} aria-hidden />
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}

      {/* پیشنهاد ارتقا */}
      <div className="mt-10 overflow-hidden rounded-card bg-gradient-to-l from-primary to-primary-dark p-6 text-white sm:p-8">
        <h2 className="text-lg font-extrabold sm:text-xl">
          به امکانات بیشتری نیاز دارید؟
        </h2>
        <p className="mt-2 text-sm text-primary-100">
          با ارتقاء حساب خود به وکیل، به دوره‌های تخصصی و پیشرفته‌تری دسترسی
          پیدا می‌کنید.
        </p>
        <Link
          href="/dashboard/become-lawyer"
          className="mt-4 inline-flex items-center gap-2 rounded-btn bg-white px-5 py-2.5 text-sm font-bold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary-50"
        >
          درخواست وکیل شدن
          <ArrowLeft size={14} aria-hidden />
        </Link>
      </div>
    </div>
  );
}