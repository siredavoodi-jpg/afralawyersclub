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
      {/* بخش ۱: Hero — گرادیان بنفش-نارنجی + لوگو بزرگ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-right">
              {/* لوگوی بزرگ افرا */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <Image
                  src="/images/logo.jpg"
                  alt="لوگو باشگاه وکلای افرا"
                  width={140}
                  height={140}
                  className="h-28 w-28 object-contain sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                  priority
                />
              </div>

              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold text-primary">
                <Sparkles size={14} aria-hidden />
                باشگاه وکلای افرا
              </span>

              <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl">
                <span className="block">داشبورد هوشمند، ابزارهای AI و دوره‌های تخصصی</span>
                <span className="mt-2 block bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                  برای وکلا، کارآموزان و دانشجویان حقوق
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft lg:mx-0">
                پلتفرم هوشمند مبتنی بر هوش مصنوعی برای تحول در کار روزمره وکالت و آموزش حقوقی
              </p>

              {/* دکمه‌ها */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-btn bg-primary px-6 py-3 text-sm font-bold text-white transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-primary-dark"
                >
                  عضویت رایگان
                  <ArrowLeft size={14} aria-hidden />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-btn border-2 border-secondary bg-white/70 px-6 py-3 text-sm font-bold text-primary transition-all duration-300 ease-out hover:bg-secondary-light"
                >
                  آشنایی با خدمات
                </Link>
              </div>

              {/* مزایای سریع */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-ink-soft lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <Brain size={15} className="text-primary" aria-hidden />
                  داشبورد هوشمند
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={15} className="text-secondary" aria-hidden />
                  ابزارهای AI
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-accent" aria-hidden />
                  دوره‌های آموزشی
                </span>
              </div>
            </div>

            {/* تصویر hero.jpg */}
            <div className="flex justify-center">
              <Image
                src="/images/hero.jpg"
                alt="اعضای باشگاه وکلای افرا در حال کار با هوش مصنوعی"
                width={600}
                height={400}
                className="h-60 w-full max-w-lg rounded-card object-cover shadow-card-hover lg:h-80"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۲: خدمات رایگان برای همه */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-base py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-ink">
              <BookOpen size={26} className="text-primary" aria-hidden />
              خدمات رایگان برای همه
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              بدون نیاز به عضویت، از این منابع استفاده کنید
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/courses" className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border border-line bg-surface p-6 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap size={22} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-ink group-hover:text-primary">
                  دوره‌های آموزشی
                </h3>
                <p className="mt-2 text-xs text-ink-soft">
                  آموزش هوش مصنوعی و مهارت‌های حقوقی
                </p>
              </div>
            </Link>

            <Link href="/library" className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border border-line bg-surface p-6 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <BookOpen size={22} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-ink group-hover:text-primary">
                  کتابخانه حقوقی
                </h3>
                <p className="mt-2 text-xs text-ink-soft">
                  مقالات، ویدئوها و منابع تخصصی
                </p>
              </div>
            </Link>

            <Link href="/library/prompts" className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border border-line bg-surface p-6 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Sparkles size={22} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-ink group-hover:text-primary">
                  بانک پرامپت
                </h3>
                <p className="mt-2 text-xs text-ink-soft">
                  پرامپت‌های آماده برای کار حقوقی
                </p>
              </div>
            </Link>

            <Link href="/library/articles" className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border border-line bg-surface p-6 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/15 text-primary-light transition-transform duration-300 group-hover:scale-110">
                  <FileText size={22} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-ink group-hover:text-primary">
                  مقالات تخصصی
                </h3>
                <p className="mt-2 text-xs text-ink-soft">
                  تحلیل و بررسی موضوعات حقوقی و AI
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۳: داشبورد هوشمند افرا — بنفش تیره + Glassmorphism */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-dashboard-gradient py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-secondary-light">
              <Lock size={12} aria-hidden />
              ویژه اعضای باشگاه
            </span>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              داشبورد هوشمند افرا
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-secondary-light/90">
              با عضویت در باشگاه، به ابزارها و خدمات ویژه‌ای دسترسی پیدا کنید که
              کار روزمره وکالت شما را متحول می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* تحلیل پرونده با AI */}
            <div className="min-h-[220px] rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-secondary-light">
                <FileSearch size={22} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                تحلیل پرونده با هوش مصنوعی
              </h3>
              <p className="mt-2 text-xs leading-5 text-secondary-light/80">
                پرونده خود را آپلود کنید و خلاصه، نکات کلیدی، قوانین مرتبط و
                پیشنهادات AI را دریافت کنید.
              </p>
            </div>

            {/* حافظه AI */}
            <div className="min-h-[220px] rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-secondary-light">
                <Brain size={22} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                حافظه هوشمند و سوابق موکلین
              </h3>
              <p className="mt-2 text-xs leading-5 text-secondary-light/80">
                اطلاعات موکلین و پرونده‌ها را ذخیره کنید تا AI در مراجعات بعدی
                بدون نیاز به تکرار، سوابق را به خاطر داشته باشد.
              </p>
            </div>

            {/* پشتیبانی سوپروایزر */}
            <div className="min-h-[220px] rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-secondary-light">
                <Headset size={22} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                پشتیبانی و مشاوره سوپروایزر
              </h3>
              <p className="mt-2 text-xs leading-5 text-secondary-light/80">
                در مورد پرونده‌های خود از سوپروایزر سایت مشاوره بگیرید و سوالات
                تخصصی خود را مطرح کنید.
              </p>
            </div>

            {/* مدیریت پرونده‌ها */}
            <div className="min-h-[220px] rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-secondary-light">
                <FolderOpen size={22} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                مدیریت پرونده‌ها و موکلین
              </h3>
              <p className="mt-2 text-xs leading-5 text-secondary-light/80">
                تمام پرونده‌ها و موکلین خود را در یک داشبورد مدیریت کنید و به
                تاریخچه کامل دسترسی داشته باشید.
              </p>
            </div>

            {/* داشبورد شخصی */}
            <div className="min-h-[220px] rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-secondary-light">
                <Users size={22} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                داشبورد شخصی‌سازی شده
              </h3>
              <p className="mt-2 text-xs leading-5 text-secondary-light/80">
                داشبورد اختصاصی با آمار فعالیت‌ها، دوره‌های ثبت‌نام شده و
                ابزارهای مورد علاقه شما.
              </p>
            </div>

            {/* عضویت رایگان */}
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border-2 border-dashed border-secondary/60 bg-white/5 p-6 text-center backdrop-blur-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-white">
                <Lock size={22} aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                برای دسترسی به این خدمات
              </h3>
              <p className="mt-2 text-xs text-secondary-light/80">
                عضویت رایگان است. همین حالا ثبت‌نام کنید.
              </p>
              <Link
                href="/register"
                className="mt-3 inline-flex items-center gap-2 rounded-btn bg-secondary px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-secondary-hover"
              >
                عضویت رایگان
                <ArrowLeft size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۴: همکار کارآموز — نارنجی تمام‌عرض */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-l from-secondary to-secondary-hover py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white">
                <Award size={14} aria-hidden />
                همکار کارآموز · وکلای پایه یک آینده
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                تا آزمون اختبار در کنار شما هستیم
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/90">
                دوره‌های اختصاصی آمادگی برای اختبار، راهنمایی گام به گام و
                پشتیبانی تخصصی تا رسیدن به پروانه وکالت. مسیر موفقیت شما،
                ماموریت ماست.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-btn bg-white px-5 py-2.5 text-xs font-bold text-secondary transition-all duration-300 hover:scale-[1.02] hover:bg-secondary-light"
                >
                  شروع مسیر موفقیت
                  <ArrowLeft size={14} aria-hidden />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-btn border-2 border-white/40 px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-white/10"
                >
                  مشاهده دوره‌های اختبار
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex min-h-[110px] items-center gap-3 rounded-card bg-white/10 p-4 backdrop-blur-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                  <Target size={22} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">دوره‌های اختصاصی اختبار</p>
                  <p className="mt-0.5 text-xs text-white/80">
                    محتوای تخصصی برای آمادگی کامل آزمون
                  </p>
                </div>
              </div>
              <div className="flex min-h-[110px] items-center gap-3 rounded-card bg-white/10 p-4 backdrop-blur-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                  <Users size={22} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">مشاوره و همراهی مستمر</p>
                  <p className="mt-0.5 text-xs text-white/80">
                    از شروع کارآموزی تا دریافت پروانه وکالت
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۵: دوره‌های آموزشی */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-center sm:text-right">
              <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-ink sm:justify-start">
                <GraduationCap size={26} className="text-accent" aria-hidden />
                دوره‌های آموزشی
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                آموزش‌های تخصصی برای وکلا و علاقمندان
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-btn bg-accent px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-accent-hover"
            >
              مشاهده همه دوره‌ها
              <ArrowLeft size={14} aria-hidden />
            </Link>
          </div>

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
              className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary-dark"
            >
              مشاهده همه {sampleCourses.length} دوره
              <ArrowLeft size={12} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۶: خدمات هوش مصنوعی */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-base py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-center sm:text-right">
              <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-ink sm:justify-start">
                <Bot size={26} className="text-primary" aria-hidden />
                خدمات هوش مصنوعی
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                ابزارهای حقوقی مبتنی بر AI برای وکلای احراز شده
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-dark"
            >
              مشاهده همه خدمات
              <ArrowLeft size={14} aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiToolCards.slice(0, 4).map((tool) => (
              <Link key={tool.id} href={tool.href} className="group">
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border border-line bg-surface p-6 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    {tool.id === "case-analysis" && <FileSearch size={22} aria-hidden />}
                    {tool.id === "petition" && <FileText size={22} aria-hidden />}
                    {tool.id === "contract" && <ShieldCheck size={22} aria-hidden />}
                    {tool.id === "chat" && <MessageCircle size={22} aria-hidden />}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-ink group-hover:text-primary">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink-soft line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary-dark"
            >
              مشاهده همه {aiToolCards.length} خدمت هوش مصنوعی
              <ArrowLeft size={12} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۷: آخرین مقالات + آمار */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-center sm:text-right">
              <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-ink sm:justify-start">
                <BookOpen size={26} className="text-secondary" aria-hidden />
                آخرین مقالات
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                جدیدترین مطالب آموزشی و تحلیلی
              </p>
            </div>
            <Link
              href="/library/articles"
              className="inline-flex items-center gap-2 rounded-btn border-2 border-primary bg-white px-5 py-2.5 text-xs font-bold text-primary transition-all duration-300 hover:bg-primary-50"
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
                className="group flex min-h-[220px] flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover"
              >
                <h3 className="text-base font-bold text-ink group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-ink-soft line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-xs text-ink-soft/50">
                    {new Date(article.publishedAt).toLocaleDateString("fa-IR")}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    ادامه مطلب
                    <ArrowLeft size={12} aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* ردیف آمار */}
          <div className="mt-10 grid grid-cols-2 gap-4 rounded-card bg-primary-50 p-8 sm:grid-cols-4">
            <div className="text-center">
              <p className="font-en text-3xl font-extrabold text-primary">
                {siteStats.usersCount}
              </p>
              <p className="mt-1 text-xs text-ink-soft">کاربر فعال</p>
            </div>
            <div className="text-center">
              <p className="font-en text-3xl font-extrabold text-accent">
                {siteStats.casesAnalyzed}
              </p>
              <p className="mt-1 text-xs text-ink-soft">پرونده تحلیل‌شده</p>
            </div>
            <div className="text-center">
              <p className="font-en text-3xl font-extrabold text-secondary">
                {siteStats.coursesCount}
              </p>
              <p className="mt-1 text-xs text-ink-soft">دوره آموزشی</p>
            </div>
            <div className="text-center">
              <p className="font-en text-3xl font-extrabold text-primary-light">
                {siteStats.satisfaction}
              </p>
              <p className="mt-1 text-xs text-ink-soft">رضایت کاربران</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* بخش ۸: نظرات کاربران + CTA نهایی */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-base py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-ink">نظرات کاربران</h2>
            <p className="mt-2 text-sm text-ink-soft">
              تجربه وکلا و دانشجویان حقوق از استفاده از افرا
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex min-h-[220px] flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < t.rating
                          ? "fill-secondary text-secondary"
                          : "text-line"
                      }
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs leading-5 text-ink-soft">
                  «{t.quote}»
                </p>
                <div className="mt-auto border-t border-line pt-3">
                  <p className="text-xs font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-soft">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA نهایی با گرادیان بنفش به نارنجی */}
          <div className="mt-12 rounded-card bg-cta-gradient p-10 text-center shadow-card-hover">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              همین حالا به باشگاه وکلای افرا بپیوندید
            </h2>
            <p className="mt-3 text-base text-white/90">
              عضویت رایگان است. به داشبورد هوشمند، ابزارهای AI و دوره‌های آموزشی
              دسترسی پیدا کنید.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-btn bg-white px-7 py-3 text-sm font-bold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary-50"
              >
                عضویت رایگان
                <ArrowLeft size={14} aria-hidden />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-btn border-2 border-white/60 px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10"
              >
                آشنایی با خدمات
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}