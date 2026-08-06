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
  Award,
  Target,
  Bot,
  Wand2,
  FileCheck,
  ScaleIcon,
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
      {/* بخش Hero - با تصویر hero.jpg (آبی تیره‌تر) */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-800 via-blue-700 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-right">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                <Sparkles size={14} aria-hidden />
                باشگاه وکلای افرا
              </span>
              <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                <span className="block">داشبورد هوشمند، ابزارهای AI و دوره‌های تخصصی</span>
                <span className="block mt-2 text-blue-100">برای وکلا، کارآموزان و دانشجویان حقوق</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 mx-auto lg:mx-0">
                پلتفرم هوشمند مبتنی بر هوش مصنوعی برای تحول در کار روزمره وکالت و آموزش حقوقی
              </p>

              {/* دکمه‌ها */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-blue-700 transition-fast hover:bg-blue-50"
                >
                  عضویت رایگان
                  <ArrowLeft size={14} aria-hidden />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 bg-transparent px-5 py-2.5 text-sm font-bold text-white transition-fast hover:bg-white/10"
                >
                  آشنایی با خدمات
                </Link>
              </div>

              {/* مزایای سریع */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-blue-100 lg:justify-start">
                <span className="flex items-center gap-1">
                  <Brain size={14} className="text-yellow-300" aria-hidden />
                  داشبورد هوشمند
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={14} className="text-purple-300" aria-hidden />
                  ابزارهای AI
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} className="text-green-300" aria-hidden />
                  دوره‌های آموزشی
                </span>
              </div>
            </div>

            {/* تصویر hero.jpg */}
            <div className="flex justify-center">
              <Image
                src="/images/hero.jpg"
                alt="باشگاه وکلای افرا"
                width={600}
                height={400}
                className="h-56 w-full max-w-lg rounded-2xl object-cover shadow-lg lg:h-72"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۱: خدمات رایگان برای همه (سفید) */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-neutral-900">
            <BookOpen size={24} className="text-blue-600" aria-hidden />
            خدمات رایگان برای همه
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            بدون نیاز به عضویت، از این منابع استفاده کنید
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/courses" className="group">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-fast hover:border-green-300 hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <GraduationCap size={24} aria-hidden />
              </span>
              <h3 className="mt-3 font-bold text-neutral-900 group-hover:text-green-600">
                دوره‌های آموزشی
              </h3>
              <p className="mt-2 text-xs text-neutral-600">
                آموزش هوش مصنوعی و مهارت‌های حقوقی
              </p>
            </div>
          </Link>

          <Link href="/library" className="group">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-fast hover:border-blue-300 hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BookOpen size={24} aria-hidden />
              </span>
              <h3 className="mt-3 font-bold text-neutral-900 group-hover:text-blue-600">
                کتابخانه حقوقی
              </h3>
              <p className="mt-2 text-xs text-neutral-600">
                مقالات، ویدئوها و منابع تخصصی
              </p>
            </div>
          </Link>

          <Link href="/library/prompts" className="group">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-fast hover:border-purple-300 hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Sparkles size={24} aria-hidden />
              </span>
              <h3 className="mt-3 font-bold text-neutral-900 group-hover:text-purple-600">
                بانک پرامپت
              </h3>
              <p className="mt-2 text-xs text-neutral-600">
                پرامپت‌های آماده برای کار حقوقی
              </p>
            </div>
          </Link>

          <Link href="/library/articles" className="group">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-fast hover:border-yellow-400 hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <FileText size={24} aria-hidden />
              </span>
              <h3 className="mt-3 font-bold text-neutral-900 group-hover:text-yellow-600">
                مقالات تخصصی
              </h3>
              <p className="mt-2 text-xs text-neutral-600">
                تحلیل و بررسی موضوعات حقوقی و AI
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۲: داشبورد هوشمند افرا (آبی کاربنی) */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-700 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-100">
              <Lock size={12} aria-hidden />
              ویژه اعضای باشگاه
            </span>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              داشبورد هوشمند افرا
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-sm text-slate-200">
              با عضویت در باشگاه، به ابزارها و خدمات ویژه‌ای دسترسی پیدا کنید که
              کار روزمره وکالت شما را متحول می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* تحلیل پرونده با AI */}
            <div className="rounded-2xl border border-slate-600 bg-slate-800/50 p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                <FileSearch size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                تحلیل پرونده با هوش مصنوعی
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                پرونده خود را آپلود کنید و خلاصه، نکات کلیدی، قوانین مرتبط و
                پیشنهادات AI را دریافت کنید.
              </p>
            </div>

            {/* حافظه AI - سوابق موکلین */}
            <div className="rounded-2xl border border-slate-600 bg-slate-800/50 p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                <Brain size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                حافظه هوشمند و سوابق موکلین
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                اطلاعات موکلین و پرونده‌ها را ذخیره کنید تا AI در مراجعات بعدی
                بدون نیاز به تکرار، سوابق را به خاطر داشته باشد.
              </p>
            </div>

            {/* پشتیبانی سوپروایزر */}
            <div className="rounded-2xl border border-slate-600 bg-slate-800/50 p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-300">
                <Headset size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                پشتیبانی و مشاوره سوپروایزر
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                در مورد پرونده‌های خود از سوپروایزر سایت مشاوره بگیرید و سوالات
                تخصصی خود را مطرح کنید.
              </p>
            </div>

            {/* مدیریت پرونده‌ها */}
            <div className="rounded-2xl border border-slate-600 bg-slate-800/50 p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20 text-green-300">
                <FolderOpen size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                مدیریت پرونده‌ها و موکلین
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                تمام پرونده‌ها و موکلین خود را در یک داشبورد مدیریت کنید و به
                تاریخچه کامل دسترسی داشته باشید.
              </p>
            </div>

            {/* داشبورد شخصی */}
            <div className="rounded-2xl border border-slate-600 bg-slate-800/50 p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-300">
                <Users size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                داشبورد شخصی‌سازی شده
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                داشبورد اختصاصی با آمار فعالیت‌ها، دوره‌های ثبت‌نام شده و
                ابزارهای مورد علاقه شما.
              </p>
            </div>

            {/* عضویت رایگان */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400/50 bg-blue-900/30 p-5 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
                <Lock size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                برای دسترسی به این خدمات
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                عضویت رایگان است. همین حالا ثبت‌نام کنید.
              </p>
              <Link
                href="/register"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-xs font-bold text-white transition-fast hover:bg-blue-600"
              >
                عضویت رایگان
                <ArrowLeft size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بنر ویژه همکار کارآموز (نارنجی) */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-l from-orange-500 to-orange-600">
          <div className="grid grid-cols-1 items-center gap-6 p-6 lg:grid-cols-2 lg:p-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                <Award size={14} aria-hidden />
                همکار کارآموز · وکلای پایه یک آینده
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                تا آزمون اختبار در کنار شما هستیم
              </h3>
              <p className="mt-2 text-sm leading-6 text-orange-50">
                دوره‌های اختصاصی آمادگی برای اختبار، راهنمایی گام به گام و
                پشتیبانی تخصصی تا رسیدن به پروانه وکالت. مسیر موفقیت شما،
                ماموریت ماست.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-orange-600 transition-fast hover:bg-orange-50"
                >
                  شروع مسیر موفقیت
                  <ArrowLeft size={14} aria-hidden />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-4 py-2 text-xs font-bold text-white transition-fast hover:bg-white/10"
                >
                  مشاهده دوره‌های اختبار
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                  <Target size={20} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">دوره‌های اختصاصی اختبار</p>
                  <p className="mt-0.5 text-xs text-orange-50">
                    محتوای تخصصی برای آمادگی کامل آزمون
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                  <Users size={20} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">مشاوره و همراهی مستمر</p>
                  <p className="mt-0.5 text-xs text-orange-50">
                    از شروع کارآموزی تا دریافت پروانه وکالت
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۳: دوره‌های آموزشی (سبز) */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="text-center sm:text-right">
            <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-neutral-900 sm:justify-start">
              <GraduationCap size={24} className="text-green-600" aria-hidden />
              دوره‌های آموزشی
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              آموزش‌های تخصصی برای وکلا و علاقمندان
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-xs font-medium text-white transition-fast hover:bg-green-700"
          >
            مشاهده همه دوره‌ها
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>

        {/* فقط ۳ دوره اول */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCourses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs font-medium text-green-600 hover:text-green-700"
          >
            مشاهده همه {sampleCourses.length} دوره
            <ArrowLeft size={12} aria-hidden />
          </Link>
        </div>
      </section>

    {/* ═══════════════════════════════════════════ */}
{/* بخش ۴: خدمات هوش مصنوعی - بخش جدید (بنفش) */}
{/* ═══════════════════════════════════════════ */}
<section className="bg-gradient-to-b from-purple-50 to-white py-12">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="text-center sm:text-right">
        <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-neutral-900 sm:justify-start">
          <Bot size={24} className="text-purple-600" aria-hidden />
          خدمات هوش مصنوعی
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          ابزارهای حقوقی مبتنی بر AI برای وکلای احراز شده
        </p>
      </div>
      <Link
        href="/services"
        className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-xs font-medium text-white transition-fast hover:bg-purple-700"
      >
        مشاهده همه خدمات
        <ArrowLeft size={14} aria-hidden />
      </Link>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* فقط ۴ خدمت اول */}
      {aiToolCards.slice(0, 4).map((tool) => (
        <Link key={tool.id} href={tool.href} className="group">
          <div className="flex flex-col items-center rounded-2xl border border-purple-100 bg-white p-5 text-center transition-fast hover:border-purple-300 hover:shadow-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              {tool.id === 'case-analysis' && <FileSearch size={20} aria-hidden />}
              {tool.id === 'petition' && <FileText size={20} aria-hidden />}
              {tool.id === 'contract' && <ShieldCheck size={20} aria-hidden />}
              {tool.id === 'chat' && <MessageCircle size={20} aria-hidden />}
            </span>
            <h3 className="mt-2 text-sm font-bold text-neutral-900 group-hover:text-purple-600">
              {tool.title}
            </h3>
            <p className="mt-1 text-xs text-neutral-600 line-clamp-2">
              {tool.description}
            </p>
          </div>
        </Link>
      ))}
    </div>

    <div className="mt-6 text-center">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-xs font-medium text-purple-600 hover:text-purple-700"
      >
        مشاهده همه {aiToolCards.length} خدمت هوش مصنوعی
        <ArrowLeft size={12} aria-hidden />
      </Link>
    </div>
  </div>
</section>      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۵: آخرین مقالات (زرد طلایی) */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="text-center sm:text-right">
            <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-neutral-900 sm:justify-start">
              <BookOpen size={24} className="text-yellow-600" aria-hidden />
              آخرین مقالات
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              جدیدترین مطالب آموزشی و تحلیلی
            </p>
          </div>
          <Link
            href="/library/articles"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-yellow-300 px-4 py-2 text-xs font-medium text-yellow-700 transition-fast hover:border-yellow-500"
          >
            مشاهده همه مقالات
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <Link
              key={article.id}
              href={`/library/articles/${article.slug}`}
              className="group rounded-2xl border border-neutral-100 bg-white p-5 transition-fast hover:border-yellow-300 hover:shadow-md"
            >
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-yellow-600">
                {article.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-neutral-600 line-clamp-3">
                {article.summary}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  {new Date(article.publishedAt).toLocaleDateString("fa-IR")}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600">
                  ادامه مطلب
                  <ArrowLeft size={12} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۶: آمار سایت */}
      {/* ═══════════════════════════════════════════ */}
      <section className="border-y border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-blue-600">
                {siteStats.usersCount}
              </p>
              <p className="mt-1 text-xs text-neutral-500">کاربر فعال</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-green-600">
                {siteStats.casesAnalyzed}
              </p>
              <p className="mt-1 text-xs text-neutral-500">پرونده تحلیل‌شده</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-purple-600">
                {siteStats.coursesCount}
              </p>
              <p className="mt-1 text-xs text-neutral-500">دوره آموزشی</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-orange-600">
                {siteStats.satisfaction}
              </p>
              <p className="mt-1 text-xs text-neutral-500">رضایت کاربران</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۷: نظرات کاربران */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-neutral-900">
              نظرات کاربران
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              تجربه وکلا و دانشجویان حقوق از استفاده از افرا
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl bg-white p-5 shadow-sm border border-neutral-100"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < t.rating
                          ? "fill-orange-500 text-orange-500"
                          : "text-neutral-200"
                      }
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs leading-5 text-neutral-700">
                  «{t.quote}»
                </p>
                <div className="mt-3 border-t border-neutral-100 pt-3">
                  <p className="text-xs font-bold text-neutral-900">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۸: CTA (قرمز آجری) */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-l from-red-700 to-red-800 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            همین حالا به باشگاه وکلای افرا بپیوندید
          </h2>
          <p className="mt-3 text-base text-red-100">
            عضویت رایگان است. به داشبورد هوشمند، ابزارهای AI و دوره‌های آموزشی
            دسترسی پیدا کنید.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-red-700 transition-fast hover:bg-red-50"
            >
              عضویت رایگان
              <ArrowLeft size={14} aria-hidden />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-2.5 text-sm font-bold text-white transition-fast hover:bg-white/10"
            >
              آشنایی با خدمات
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}