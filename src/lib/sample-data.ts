import type { AiToolCard, ArticleSummary, Course, Testimonial } from "@/types";

// دوره‌های فعلی سایت (۴ دوره)
export const sampleCourses: Course[] = [
  {
    id: "ai-for-lawyers",
    title: "آموزش مقدمات هوش مصنوعی",
    description: "دوره جامع مقدماتی هوش مصنوعی ویژه جامعه وکالت؛ بدون نیاز به پیش‌زمینه فنی",
    instructor: "تیم آموزشی افرا",
    duration: 300,
    level: "beginner",
    price: 0,
    isFree: true,
    accessLevel: "interested",
    rating: 4.8,
    studentsCount: 1240,
  },
  {
    id: "c2",
    title: "آمادگی برای اختبار",
    description: "آموزش کامل نکات کلیدی و تکنیک‌های موفقیت در آزمون اختبار وکالت",
    instructor: "تیم آموزشی افرا",
    duration: 480,
    level: "intermediate",
    price: 0,
    isFree: true,
    accessLevel: "users",
    rating: 4.9,
    studentsCount: 860,
  },
  {
    id: "c3",
    title: "نکات مهم در تخلفات قرارداد الکترونیک وکالت و راه‌های اصلاح آن",
    description: "بررسی جامع تخلفات رایج در قراردادهای الکترونیک وکالت و ارائه راه‌حل‌های عملی",
    instructor: "تیم آموزشی افرا",
    duration: 360,
    level: "advanced",
    price: 0,
    isFree: true,
    accessLevel: "lawyers",
    rating: 4.7,
    studentsCount: 540,
  },
  {
    id: "c4",
    title: "آموزش کار با سامانه عدلیران",
    description: "آموزش گام به گام استفاده از سامانه عدلیران برای وکلا و کارآموزان",
    instructor: "تیم آموزشی افرا",
    duration: 240,
    level: "beginner",
    price: 0,
    isFree: true,
    accessLevel: "users",
    rating: 4.6,
    studentsCount: 980,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "وکیل پایه یک دادگستری",
    role: "کانون وکلای تهران",
    quote: "ابزار تحلیل قرارداد افرا زمان بررسی قراردادهای من رو به شدت کاهش داد.",
    rating: 5,
  },
  {
    id: "t2",
    name: "وکیل دادگستری",
    role: "کانون وکلای اصفهان",
    quote: "دوره‌های آموزشی افرا دید خیلی روشنی از کاربرد AI در حقوق بهم داد.",
    rating: 5,
  },
  {
    id: "t3",
    name: "دانشجوی حقوق",
    role: "دانشگاه تهران",
    quote: "بانک پرامپت افرا برای تمرین و یادگیری فوق‌العاده مفید بود.",
    rating: 4,
  },
];

export const latestArticles: ArticleSummary[] = [
  {
    id: "a1",
    title: "هوش مصنوعی و آینده وکالت در ایران",
    slug: "ai-future-of-law-iran",
    summary: "نگاهی به تحولات پیش‌رو در صنعت حقوقی با ورود ابزارهای هوش مصنوعی.",
    publishedAt: "2026-07-10",
  },
  {
    id: "a2",
    title: "چگونه از AI برای تحلیل پرونده استفاده کنیم؟",
    slug: "how-to-use-ai-for-case-analysis",
    summary: "راهنمای گام‌به‌گام استفاده مسئولانه از ابزارهای تحلیل پرونده.",
    publishedAt: "2026-06-28",
  },
  {
    id: "a3",
    title: "ریسک‌های حقوقی رایج در قراردادهای تجاری",
    slug: "common-legal-risks-in-commercial-contracts",
    summary: "بررسی بندهایی که بیشترین ریسک را برای طرفین قرارداد ایجاد می‌کنند.",
    publishedAt: "2026-06-15",
  },
];

export const aiToolCards: AiToolCard[] = [
  {
    id: "case-analysis",
    title: "تحلیل پرونده",
    description: "خلاصه، نکات کلیدی و قوانین مرتبط با پرونده خود را دریافت کنید.",
    href: "/services/case-analysis",
    icon: "FileSearch",
  },
  {
    id: "petition",
    title: "تولید دادخواست",
    description: "دادخواست خود را با فرمت استاندارد قضایی در چند دقیقه تولید کنید.",
    href: "/services/petition",
    icon: "FileText",
  },
  {
    id: "contract",
    title: "تحلیل قرارداد",
    description: "بندهای مهم، ریسک‌ها و پیشنهادات اصلاحی قرارداد را ببینید.",
    href: "/services/contract",
    icon: "ShieldCheck",
  },
  {
    id: "chat",
    title: "چت حقوقی",
    description: "سوالات حقوقی خود را از دستیار هوشمند افرا بپرسید.",
    href: "/services/chat",
    icon: "MessageCircle",
  },
];

export const siteStats = {
  usersCount: "۱۲,۴۰۰+",
  casesAnalyzed: "۳,۸۰۰+",
  coursesCount: "۴",
  satisfaction: "۹۶٪",
};