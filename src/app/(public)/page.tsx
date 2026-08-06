import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  FileSearch,
  FileText,
  ShieldCheck,
  MessageCircle,
  Users,
  Star,
  Sparkles,
  GraduationCap,
  Scale,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/course/CourseCard";
import { AiToolCard } from "@/components/ai/AiToolCard";
import {
  sampleCourses,
  testimonials,
  latestArticles,
  aiToolCards,
  siteStats,
} from "@/lib/sample-data";

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* بخش Hero */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-right">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700">
                <Sparkles size={16} aria-hidden />
                باشگاه وکلای افرا
              </span>
              <h1 className="text-3xl font-extrabold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                هوش مصنوعی در خدمت
                <span className="text-primary-600"> جامعه وکالت</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 mx-auto lg:mx-0">
                آموزش، ابزارهای هوشمند و منابع تخصصی برای وکلا، کارآموزان و
                دانشجویان حقوق. با افرا، آینده وکالت را بسازید.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-bold text-white transition-fast hover:bg-primary-700"
                >
                  مشاهده دوره‌ها
                  <ArrowLeft size={16} aria-hidden />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-200 bg-white px-6 py-3 text-sm font-bold text-primary-700 transition-fast hover:border-primary-400"
                >
                  عضویت رایگان
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/avatar.png"
                alt="باشگاه وکلای افرا"
                width={400}
                height={267}
                className="h-56 w-auto lg:h-72"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش آمار */}
      {/* ═══════════════════════════════════════════ */}
      <section className="border-y border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-primary-600">
                {siteStats.usersCount}
              </p>
              <p className="mt-1 text-sm text-neutral-500">کاربر فعال</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-primary-600">
                {siteStats.casesAnalyzed}
              </p>
              <p className="mt-1 text-sm text-neutral-500">پرونده تحلیل‌شده</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-primary-600">
                {siteStats.coursesCount}
              </p>
              <p className="mt-1 text-sm text-neutral-500">دوره آموزشی</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-primary-600">
                {siteStats.satisfaction}
              </p>
              <p className="mt-1 text-sm text-neutral-500">رضایت کاربران</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش دوره‌ها - فقط ۳ دوره */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-right">
            <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-neutral-900 sm:justify-start">
              <GraduationCap size={28} className="text-primary-600" aria-hidden />
              دوره‌های آموزشی
            </h2>
            <p className="mt-1 text-neutral-600">
              آموزش‌های تخصصی برای وکلا و علاقمندان
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-fast hover:bg-primary-700"
          >
            مشاهده همه دوره‌ها
            <ArrowLeft size={16} aria-hidden />
          </Link>
        </div>

        {/* فقط ۳ دوره اول نمایش داده شود */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCourses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* لینک مشاهده همه */}
        <div className="mt-8 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            مشاهده همه {sampleCourses.length} دوره
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ابزارهای AI */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-neutral-900">
              <Sparkles size={28} className="text-primary-600" aria-hidden />
              ابزارهای هوش مصنوعی
            </h2>
            <p className="mt-1 text-neutral-600">
              ابزارهای حقوقی مبتنی بر AI برای وکلای احراز شده
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aiToolCards.map((tool) => (
              <AiToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش چرا افرا؟ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            چرا باشگاه وکلای افرا؟
          </h2>
          <p className="mt-2 text-neutral-600">
            مزایای عضویت در بزرگ‌ترین جامعه وکلای مبتنی بر هوش مصنوعی
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <Scale size={32} aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-bold text-neutral-900">
              تخصص حقوقی
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              تمام ابزارها و دوره‌ها با همکاری وکلای باتجربه و متخصصان حقوقی
              طراحی شده‌اند.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
              <Sparkles size={32} aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-bold text-neutral-900">
              هوش مصنوعی پیشرفته
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              از جدیدترین فناوری‌های AI برای تحلیل پرونده، تولید دادخواست و
              بررسی قرارداد استفاده می‌کنیم.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-600">
              <Users size={32} aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-bold text-neutral-900">
              جامعه پویا
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              به شبکه‌ای از وکلا، کارآموزان و دانشجویان حقوق بپیوندید و تجربه‌های
              خود را به اشتراک بگذارید.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش نظرات کاربران */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-primary-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-neutral-900">
              نظرات کاربران
            </h2>
            <p className="mt-2 text-neutral-600">
              تجربه وکلا و دانشجویان حقوق از استفاده از افرا
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-100"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < t.rating
                          ? "fill-secondary-500 text-secondary-500"
                          : "text-neutral-200"
                      }
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-neutral-700">
                  «{t.quote}»
                </p>
                <div className="mt-4 border-t border-neutral-100 pt-4">
                  <p className="text-sm font-bold text-neutral-900">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش مقالات */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-right">
            <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-neutral-900 sm:justify-start">
              <BookOpen size={28} className="text-primary-600" aria-hidden />
              آخرین مقالات
            </h2>
            <p className="mt-1 text-neutral-600">
              جدیدترین مطالب آموزشی و تحلیلی
            </p>
          </div>
          <Link
            href="/library/articles"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-200 px-5 py-2.5 text-sm font-medium text-primary-700 transition-fast hover:border-primary-400"
          >
            مشاهده همه مقالات
            <ArrowLeft size={16} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <Link
              key={article.id}
              href={`/library/articles/${article.slug}`}
              className="group rounded-2xl border border-neutral-100 bg-white p-6 transition-fast hover:border-primary-200 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600 line-clamp-3">
                {article.summary}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  {new Date(article.publishedAt).toLocaleDateString("fa-IR")}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                  ادامه مطلب
                  <ArrowLeft size={14} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش CTA */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-l from-primary-600 to-primary-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            همین حالا به باشگاه وکلای افرا بپیوندید
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            عضویت رایگان است. به دوره‌ها، ابزارها و جامعه وکلا دسترسی پیدا
            کنید.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-bold text-primary-700 transition-fast hover:bg-primary-50"
            >
              عضویت رایگان
              <ArrowLeft size={16} aria-hidden />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white transition-fast hover:bg-white/10"
            >
              مشاهده دوره‌ها
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}