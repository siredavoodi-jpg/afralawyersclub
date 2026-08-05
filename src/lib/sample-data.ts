import type { AiToolCard, ArticleSummary, Course, Testimonial } from "@/types";

// داده‌های نمونه برای نمایش اسکلت سایت — بعداً با داده واقعی از Prisma/Supabase جایگزین شود.

export const sampleCourses: Course[] = [
  {
    id: "c1",
    title: "مبانی هوش مصنوعی برای وکلا",
    description: "آشنایی وکلا با مفاهیم پایه هوش مصنوعی و کاربردهای آن در حقوق",
    instructor: "دکتر سارا احمدی",
    duration: 240,
    level: "beginner",
    price: 0,
    isFree: true,
    accessLevel: "interested", // 🆕 دسترسی برای علاقمندان
    rating: 4.8,
    studentsCount: 1240,
  },
  {
    id: "c2",
    title: "تولید دادخواست با هوش مصنوعی",
    description: "یادگیری استفاده از ابزارهای AI برای تولید سریع و دقیق دادخواست",
    instructor: "دکتر امیر رضایی",
    duration: 180,
    level: "intermediate",
    price: 890000,
    isFree: false,
    accessLevel: "users", // 🆕 دسترسی برای کاربران
    rating: 4.6,
    studentsCount: 860,
  },
  {
    id: "c3",
    title: "تحلیل قرارداد با پرامپت‌نویسی حرفه‌ای",
    description: "طراحی پرامپت برای شناسایی ریسک‌های حقوقی در قراردادهای تجاری",
    instructor: "دکتر نگار حسینی",
    duration: 200,
    level: "advanced",
    price: 1290000,
    isFree: false,
    accessLevel: "lawyers", // 🆕 دسترسی برای وکلای عضو باشگاه
    rating: 4.9,
    studentsCount: 540,
  },
  {
    id: "c4",
    title: "جستجوی هوشمند قوانین",
    description: "ساخت گردش‌کار RAG برای جستجوی سریع در قوانین و آرای قضایی",
    instructor: "دکتر امیر رضایی",
    duration: 150,
    level: "intermediate",
    price: 690000,
    isFree: false,
    accessLevel: "lawyers", // 🆕 دسترسی برای وکلای عضو باشگاه
    rating: 4.5,
    studentsCount: 410,
  },
  {
    id: "c5",
    title: "مقدمات چت‌بات‌های حقوقی",
    description: "اصول ساخت و استفاده از چت‌بات‌های تخصصی حقوقی",
    instructor: "دکتر سارا احمدی",
    duration: 120,
    level: "beginner",
    price: 0,
    isFree: true,
    accessLevel: "interested", // 🆕 دسترسی برای علاقمندان
    rating: 4.7,
    studentsCount: 980,
  },
  {
    id: "c6",
    title: "اخلاق حرفه‌ای در استفاده از AI حقوقی",
    description: "چالش‌ها و ملاحظات اخلاقی استفاده از هوش مصنوعی در وکالت",
    instructor: "دکتر نگار حسینی",
    duration: 90,
    level: "beginner",
    price: 0,
    isFree: true,
    accessLevel: "users", // 🆕 دسترسی برای کاربران
    rating: 4.4,
    studentsCount: 720,
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
  coursesCount: "۴۰+",
  satisfaction: "۹۶٪",
};
