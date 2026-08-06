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
  Lock,
  Brain,
  FolderOpen,
  Headset,
  Database,
} from "lucide-react";
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
                داشبورد هوشمند، ابزارهای AI و دوره‌های تخصصی برای وکلا،
                کارآموزان و دانشجویان حقوق.
              </p>

              {/* دکمه‌های جدید */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-bold text-white transition-fast hover:bg-primary-700"
                >
                  عضویت رایگان
                  <ArrowLeft size={16} aria-hidden />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-200 bg-white px-6 py-3 text-sm font-bold text-primary-700 transition-fast hover:border-primary-400"
                >
                  آشنایی با خدمات
                </Link>
              </div>

              {/* مزایای سریع */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500 lg:justify-start">
                <span className="flex items-center gap-1">
                  <Brain size={14} className="text-primary-500" aria-hidden />
                  داشبورد هوشمند
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={14} className="text-primary-500" aria-hidden />
                  ابزارهای AI
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} className="text-primary-500" aria-hidden />
                  دوره‌های آموزشی
                </span>
              </div>
            </div>

            {/* تصویر فعلی سایت - بدون تغییر */}
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
      {/* بخش خدمات رایگان برای همه */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-neutral-900">
            <BookOpen size={28} className="text-primary-600" aria-hidden />
            خدمات رایگان برای همه
          </h2>
          <p className="mt-2 text-neutral-600">
            بدون نیاز به عضویت، از این منابع استفاده کنید
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/courses" className="group">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-8 text-center transition-fast hover:border-primary-200 hover:shadow-md">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <GraduationCap size={28} aria-hidden />
              </span>
              <h3 className="mt-4 font-bold text-neutral-900 group-hover:text-primary-600">
                دوره‌های آموزشی
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                آموزش هوش مصنوعی و مهارت‌های حقوقی
              </p>
            </div>
          </Link>

          <Link href="/library" className="group">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-8 text-center transition-fast hover:border-primary-200 hover:shadow-md">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                <BookOpen size={28} aria-hidden />
              </span>
              <h3 className="mt-4 font-bold text-neutral-900 group-hover:text-primary-600">
                کتابخانه حقوقی
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                مقالات، ویدئوها و منابع تخصصی
              </p>
            </div>
          </Link>

          <Link href="/library/prompts" className="group">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-8 text-center transition-fast hover:border-primary-200 hover:shadow-md">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
                <Sparkles size={28} aria-hidden />
              </span>
              <h3 className="mt-4 font-bold text-neutral-900 group-hover:text-primary-600">
                بانک پرامپت
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                پرامپت‌های آماده برای کار حقوقی
              </p>
            </div>
          </Link>

          <Link href="/library/articles" className="group">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-8 text-center transition-fast hover:border-primary-200 hover:shadow-md">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                <FileText size={28} aria-hidden />
              </span>
              <h3 className="mt-4 font-bold text-neutral-900 group-hover:text-primary-600">
                مقالات تخصصی
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                تحلیل و بررسی موضوعات حقوقی و AI
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش خدمات ویژه داشبورد (فقط اعضا) */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
              <Lock size={14} aria-hidden />
              ویژه اعضای باشگاه
            </span>
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              داشبورد هوشمند افرا
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-neutral-600">
              با عضویت در باشگاه، به ابزارها و خدمات ویژه‌ای دسترسی پیدا کنید که
              کار روزمره وکالت شما را متحول می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* تحلیل پرونده با AI */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <FileSearch size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                تحلیل پرونده با هوش مصنوعی
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                پرونده خود را آپلود کنید و خلاصه، نکات کلیدی، قوانین مرتبط و
                پیشنهادات AI را دریافت کنید.
              </p>
            </div>

            {/* حافظه AI - سوابق موکلین */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                <Brain size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                حافظه هوشمند و سوابق موکلین
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                اطلاعات موکلین و پرونده‌ها را ذخیره کنید تا AI در مراجعات بعدی
                بدون نیاز به تکرار، سوابق را به خاطر داشته باشد.
              </p>
            </div>

            {/* پشتیبانی سوپروایزر */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
                <Headset size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                پشتیبانی و مشاوره سوپروایزر
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                در مورد پرونده‌های خود از سوپروایزر سایت مشاوره بگیرید و سوالات
                تخصصی خود را مطرح کنید.
              </p>
            </div>

            {/* مدیریت پرونده‌ها */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <FolderOpen size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                مدیریت پرونده‌ها و موکلین
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                تمام پرونده‌ها و موکلین خود را در یک داشبورد مدیریت کنید و به
                تاریخچه کامل دسترسی داشته باشید.
              </p>
            </div>

            {/* داشبورد شخصی */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                <Users size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                داشبورد شخصی‌سازی شده
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                داشبورد اختصاصی با آمار فعالیت‌ها، دوره‌های ثبت‌نام شده و
                ابزارهای مورد علاقه شما.
              </p>
            </div>

            {/* عضویت رایگان */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/50 p-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Lock size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                برای دسترسی به این خدمات
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                عضویت رایگان است. همین حالا ثبت‌نام کنید.
              </p>
              <Link
                href="/register"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-bold text-white transition-fast hover:bg-primary-700"
              >
                عضویت رایگان
                <ArrowLeft size={16} aria-hidden />
              </Link>
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

        {/* فقط ۳ دوره اول */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCourses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

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
      {/* بخش نظرات کاربران */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-neutral-50 py-16">
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
            عضویت رایگان است. به داشبورد هوشمند، ابزارهای AI و دوره‌های آموزشی
            دسترسی پیدا کنید.
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
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white transition-fast hover:bg-white/10"
            >
              آشنایی با خدمات
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}