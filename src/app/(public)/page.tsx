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
  Lock,
  Brain,
  FolderOpen,
  Headset,
  Award,
  Target,
  Bot,
} from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
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
      {/* بخش ۱: Hero — کرم ملایم به سفید + فونت سرمه‌ای/طلایی */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fef9e7]/70 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-right">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#c9a961]/15 px-3 py-1 text-xs font-bold text-[#8b7440]">
                <Sparkles size={14} aria-hidden />
                باشگاه وکلای افرا
              </span>
              <h1 className="text-2xl font-extrabold leading-tight text-[#0a1f3d] sm:text-3xl lg:text-4xl">
                <span className="block">داشبورد هوشمند، ابزارهای AI و دوره‌های تخصصی</span>
                <span className="mt-2 block text-[#c9a961]">برای وکلا، کارآموزان و دانشجویان حقوق</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#1e3a5f]/80 lg:mx-0">
                پلتفرم هوشمند مبتنی بر هوش مصنوعی برای تحول در کار روزمره وکالت و آموزش حقوقی
              </p>

              {/* دکمه‌ها: اصلی سرمه‌ای / ثانویه حاشیه طلایی */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0a1f3d] px-5 py-2.5 text-sm font-bold text-white transition-fast hover:bg-[#1e3a5f]"
                >
                  عضویت رایگان
                  <ArrowLeft size={14} aria-hidden />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-[#c9a961] bg-white/60 px-5 py-2.5 text-sm font-bold text-[#0a1f3d] transition-fast hover:bg-[#c9a961]/10"
                >
                  آشنایی با خدمات
                </Link>
              </div>

              {/* مزایای سریع */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-[#1e3a5f]/70 lg:justify-start">
                <span className="flex items-center gap-1">
                  <Brain size={14} className="text-[#c9a961]" aria-hidden />
                  داشبورد هوشمند
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={14} className="text-[#c9a961]" aria-hidden />
                  ابزارهای AI
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} className="text-[#c9a961]" aria-hidden />
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
                className="h-56 w-full max-w-lg rounded-2xl object-cover shadow-lg shadow-[#c9a961]/20 lg:h-72"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۲: خدمات رایگان — گرادیانت آبی ملایم به سفید */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#e8f0fe] to-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-[#1e3a5f]">
              <BookOpen size={24} className="text-[#0958d9]" aria-hidden />
              خدمات رایگان برای همه
            </h2>
            <p className="mt-2 text-sm text-[#1e3a5f]/70">
              بدون نیاز به عضویت، از این منابع استفاده کنید
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/courses" className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[#e8f0fe] bg-white p-6 text-center shadow-sm transition-fast hover:border-[#0958d9]/40 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#059669]">
                  <GraduationCap size={24} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-[#1e3a5f] group-hover:text-[#0958d9]">
                  دوره‌های آموزشی
                </h3>
                <p className="mt-2 text-xs text-[#1e3a5f]/60">
                  آموزش هوش مصنوعی و مهارت‌های حقوقی
                </p>
              </div>
            </Link>

            <Link href="/library" className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[#e8f0fe] bg-white p-6 text-center shadow-sm transition-fast hover:border-[#0958d9]/40 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0958d9]">
                  <BookOpen size={24} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-[#1e3a5f] group-hover:text-[#0958d9]">
                  کتابخانه حقوقی
                </h3>
                <p className="mt-2 text-xs text-[#1e3a5f]/60">
                  مقالات، ویدئوها و منابع تخصصی
                </p>
              </div>
            </Link>

            <Link href="/library/prompts" className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[#e8f0fe] bg-white p-6 text-center shadow-sm transition-fast hover:border-[#0958d9]/40 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-[#7c3aed]">
                  <Sparkles size={24} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-[#1e3a5f] group-hover:text-[#0958d9]">
                  بانک پرامپت
                </h3>
                <p className="mt-2 text-xs text-[#1e3a5f]/60">
                  پرامپت‌های آماده برای کار حقوقی
                </p>
              </div>
            </Link>

            <Link href="/library/articles" className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[#e8f0fe] bg-white p-6 text-center shadow-sm transition-fast hover:border-[#0958d9]/40 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fef9e7] text-[#c9a961]">
                  <FileText size={24} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-[#1e3a5f] group-hover:text-[#0958d9]">
                  مقالات تخصصی
                </h3>
                <p className="mt-2 text-xs text-[#1e3a5f]/60">
                  تحلیل و بررسی موضوعات حقوقی و AI
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۳: داشبورد هوشمند — آبی Qwen */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#0958d9] to-[#1e40af] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-[#fef3c7]">
              <Lock size={12} aria-hidden />
              ویژه اعضای باشگاه
            </span>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              داشبورد هوشمند افرا
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#fef3c7]/90">
              با عضویت در باشگاه، به ابزارها و خدمات ویژه‌ای دسترسی پیدا کنید که
              کار روزمره وکالت شما را متحول می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* تحلیل پرونده با AI */}
            <div className="min-h-[220px] rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[#fef3c7]">
                <FileSearch size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                تحلیل پرونده با هوش مصنوعی
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#fef3c7]/80">
                پرونده خود را آپلود کنید و خلاصه، نکات کلیدی، قوانین مرتبط و
                پیشنهادات AI را دریافت کنید.
              </p>
            </div>

            {/* حافظه AI - سوابق موکلین */}
            <div className="min-h-[220px] rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[#fef3c7]">
                <Brain size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                حافظه هوشمند و سوابق موکلین
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#fef3c7]/80">
                اطلاعات موکلین و پرونده‌ها را ذخیره کنید تا AI در مراجعات بعدی
                بدون نیاز به تکرار، سوابق را به خاطر داشته باشد.
              </p>
            </div>

            {/* پشتیبانی سوپروایزر */}
            <div className="min-h-[220px] rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[#fef3c7]">
                <Headset size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                پشتیبانی و مشاوره سوپروایزر
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#fef3c7]/80">
                در مورد پرونده‌های خود از سوپروایزر سایت مشاوره بگیرید و سوالات
                تخصصی خود را مطرح کنید.
              </p>
            </div>

            {/* مدیریت پرونده‌ها */}
            <div className="min-h-[220px] rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[#fef3c7]">
                <FolderOpen size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                مدیریت پرونده‌ها و موکلین
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#fef3c7]/80">
                تمام پرونده‌ها و موکلین خود را در یک داشبورد مدیریت کنید و به
                تاریخچه کامل دسترسی داشته باشید.
              </p>
            </div>

            {/* داشبورد شخصی */}
            <div className="min-h-[220px] rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[#fef3c7]">
                <Users size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                داشبورد شخصی‌سازی شده
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#fef3c7]/80">
                داشبورد اختصاصی با آمار فعالیت‌ها، دوره‌های ثبت‌نام شده و
                ابزارهای مورد علاقه شما.
              </p>
            </div>

            {/* عضویت رایگان */}
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#fef3c7]/50 bg-white/5 p-6 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a961] text-[#0a1f3d]">
                <Lock size={20} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                برای دسترسی به این خدمات
              </h3>
              <p className="mt-2 text-xs text-[#fef3c7]/80">
                عضویت رایگان است. همین حالا ثبت‌نام کنید.
              </p>
              <Link
                href="/register"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#c9a961] px-4 py-2 text-xs font-bold text-[#0a1f3d] transition-fast hover:bg-[#d4b876]"
              >
                عضویت رایگان
                <ArrowLeft size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۴: همکار کارآموز — نارنجی تمام‌عرض بدون حاشیه */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-l from-[#ea580c] to-[#f97316] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
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
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#ea580c] transition-fast hover:bg-orange-50"
                >
                  شروع مسیر موفقیت
                  <ArrowLeft size={14} aria-hidden />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-4 py-2 text-xs font-bold text-white transition-fast hover:bg-white/10"
                >
                  مشاهده دوره‌های اختبار
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex min-h-[110px] items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                  <Target size={20} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">دوره‌های اختصاصی اختبار</p>
                  <p className="mt-0.5 text-xs text-orange-50">
                    محتوای تخصصی برای آمادگی کامل آزمون
                  </p>
                </div>
              </div>
              <div className="flex min-h-[110px] items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
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
      {/* بخش ۵: دوره‌های آموزشی — لهجه سبز زمردی */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-center sm:text-right">
              <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-[#064e3b] sm:justify-start">
                <GraduationCap size={24} className="text-[#059669]" aria-hidden />
                دوره‌های آموزشی
              </h2>
              <p className="mt-1 text-sm text-[#064e3b]/60">
                آموزش‌های تخصصی برای وکلا و علاقمندان
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-[#059669] px-4 py-2 text-xs font-medium text-white transition-fast hover:bg-[#047857]"
            >
              مشاهده همه دوره‌ها
              <ArrowLeft size={14} aria-hidden />
            </Link>
          </div>

          {/* فقط ۳ دوره اول */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="min-h-[220px]">
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#059669] hover:text-[#047857]"
            >
              مشاهده همه {sampleCourses.length} دوره
              <ArrowLeft size={12} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۶: خدمات هوش مصنوعی — بنفش عمیق */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#7c3aed] to-[#6d28d9] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-center sm:text-right">
              <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-white sm:justify-start">
                <Bot size={24} className="text-[#fef3c7]" aria-hidden />
                خدمات هوش مصنوعی
              </h2>
              <p className="mt-1 text-sm text-purple-100">
                ابزارهای حقوقی مبتنی بر AI برای وکلای احراز شده
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c9a961] px-4 py-2 text-xs font-bold text-[#0a1f3d] transition-fast hover:bg-[#d4b876]"
            >
              مشاهده همه خدمات
              <ArrowLeft size={14} aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiToolCards.slice(0, 4).map((tool) => (
              <Link key={tool.id} href={tool.href} className="group">
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm transition-fast hover:bg-white/15">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[#fef3c7]">
                    {tool.id === "case-analysis" && <FileSearch size={20} aria-hidden />}
                    {tool.id === "petition" && <FileText size={20} aria-hidden />}
                    {tool.id === "contract" && <ShieldCheck size={20} aria-hidden />}
                    {tool.id === "chat" && <MessageCircle size={20} aria-hidden />}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-white group-hover:text-[#fef3c7]">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-xs text-purple-100 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#fef3c7] hover:text-white"
            >
              مشاهده همه {aiToolCards.length} خدمت هوش مصنوعی
              <ArrowLeft size={12} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۷: آخرین مقالات — کرم با فونت قهوه‌ای گرم */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#fef9e7] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-center sm:text-right">
              <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-[#78350f] sm:justify-start">
                <BookOpen size={24} className="text-[#c9a961]" aria-hidden />
                آخرین مقالات
              </h2>
              <p className="mt-1 text-sm text-[#78350f]/60">
                جدیدترین مطالب آموزشی و تحلیلی
              </p>
            </div>
            <Link
              href="/library/articles"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#c9a961] bg-white px-4 py-2 text-xs font-bold text-[#78350f] transition-fast hover:bg-[#c9a961]/10"
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
                className="group flex min-h-[220px] flex-col rounded-2xl border border-[#c9a961]/30 bg-white p-6 shadow-sm transition-fast hover:border-[#c9a961] hover:shadow-md"
              >
                <h3 className="text-base font-bold text-[#78350f] group-hover:text-[#c9a961]">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#78350f]/70 line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-xs text-[#78350f]/40">
                    {new Date(article.publishedAt).toLocaleDateString("fa-IR")}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#c9a961]">
                    ادامه مطلب
                    <ArrowLeft size={12} aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۸: آمار سایت — پس‌زمینه سرمه‌ای ملایم */}
      {/* ═══════════════════════════════════════════ */}
      <section className="border-y border-[#0a1f3d]/10 bg-[#0a1f3d]/5">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-[#0958d9]">
                {siteStats.usersCount}
              </p>
              <p className="mt-1 text-xs text-[#1e3a5f]/70">کاربر فعال</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-[#059669]">
                {siteStats.casesAnalyzed}
              </p>
              <p className="mt-1 text-xs text-[#1e3a5f]/70">پرونده تحلیل‌شده</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-[#7c3aed]">
                {siteStats.coursesCount}
              </p>
              <p className="mt-1 text-xs text-[#1e3a5f]/70">دوره آموزشی</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-[#ea580c]">
                {siteStats.satisfaction}
              </p>
              <p className="mt-1 text-xs text-[#1e3a5f]/70">رضایت کاربران</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۹: نظرات کاربران — سفید با کارت‌های خنثی */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-[#0a1f3d]">
              نظرات کاربران
            </h2>
            <p className="mt-2 text-sm text-[#1e3a5f]/60">
              تجربه وکلا و دانشجویان حقوق از استفاده از افرا
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex min-h-[220px] flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < t.rating
                          ? "fill-[#c9a961] text-[#c9a961]"
                          : "text-neutral-200"
                      }
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs leading-5 text-[#1e3a5f]/80">
                  «{t.quote}»
                </p>
                <div className="mt-auto border-t border-neutral-100 pt-3">
                  <p className="text-xs font-bold text-[#0a1f3d]">{t.name}</p>
                  <p className="text-xs text-[#1e3a5f]/50">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۱۰: CTA نهایی — سرمه‌ای تیره + دکمه طلایی */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-l from-[#0a1f3d] to-[#1e3a5f] py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            همین حالا به باشگاه وکلای افرا بپیوندید
          </h2>
          <p className="mt-3 text-base text-[#fef3c7]/90">
            عضویت رایگان است. به داشبورد هوشمند، ابزارهای AI و دوره‌های آموزشی
            دسترسی پیدا کنید.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c9a961] px-6 py-2.5 text-sm font-bold text-[#0a1f3d] transition-fast hover:bg-[#d4b876]"
            >
              عضویت رایگان
              <ArrowLeft size={14} aria-hidden />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#c9a961]/60 px-6 py-2.5 text-sm font-bold text-[#fef3c7] transition-fast hover:bg-white/5"
            >
              آشنایی با خدمات
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}