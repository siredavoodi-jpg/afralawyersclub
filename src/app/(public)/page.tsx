import Link from "next/link";
import { GraduationCap, Sparkles, Users, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { CourseCard } from "@/components/course/CourseCard";
import { AiToolCard } from "@/components/ai/AiToolCard";
import {
  sampleCourses,
  testimonials,
  latestArticles,
  aiToolCards,
  siteStats,
} from "@/lib/sample-data";

const whyAfra = [
  {
    icon: GraduationCap,
    title: "آموزش تخصصی AI برای وکلا",
    desc: "دوره‌های کاربردی برای یادگیری هوش مصنوعی، مخصوص جامعه حقوقی.",
  },
  {
    icon: Sparkles,
    title: "ابزارهای حقوقی مبتنی بر AI",
    desc: "تحلیل پرونده، تولید دادخواست و تحلیل قرارداد در چند دقیقه.",
  },
  {
    icon: Users,
    title: "جامعه تخصصی وکلا",
    desc: "انجمنی برای تبادل تجربه و یادگیری از هم‌کاران حرفه‌ای.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="animate-fade-up">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700">
              <Sparkles size={16} aria-hidden /> نسل جدید خدمات حقوقی
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              آینده وکالت با <span className="text-primary-600">هوش مصنوعی</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
              آموزش AI، تحلیل پرونده، تولید دادخواست — همه در یک پلتفرم.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/register" variant="secondary" size="lg">
                شروع رایگان
              </ButtonLink>
              <ButtonLink href="/courses" variant="primary" size="lg">
                مشاهده دوره‌ها
              </ButtonLink>
            </div>
          </div>
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-accent-50 lg:aspect-auto lg:h-96">
            <span className="text-neutral-400">تصویر آواتار وکیل (جایگزین شود)</span>
          </div>
        </div>
      </section>

      {/* چرا افرا */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-neutral-900">چرا افرا؟</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {whyAfra.map((item) => (
            <Card key={item.title}>
              <CardBody className="flex flex-col items-center gap-3 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <item.icon size={24} aria-hidden />
                </span>
                <h3 className="font-bold text-neutral-900">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* خدمات AI */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-neutral-900">خدمات AI</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aiToolCards.map((tool) => (
              <AiToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* دوره‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-neutral-900">دوره‌ها</h2>
          <Link href="/courses" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            مشاهده همه ←
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* آمار */}
      <section className="bg-primary-700 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { label: "کاربران", value: siteStats.usersCount },
            { label: "پرونده‌های تحلیل شده", value: siteStats.casesAnalyzed },
            { label: "دوره‌ها", value: siteStats.coursesCount },
            { label: "رضایت کاربران", value: siteStats.satisfaction },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-primary-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* نظرات کاربران */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-neutral-900">نظرات وکلا</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <CardBody className="flex flex-col gap-3">
                <div className="flex gap-0.5 text-secondary-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-secondary-500" aria-hidden />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-neutral-700">«{t.quote}»</p>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* دعوت به عضویت */}
      <section className="bg-primary-600">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">همین حالا به جمع وکلای هوشمند بپیوندید</h2>
          <div className="mt-8">
            <ButtonLink href="/register" variant="secondary" size="lg">
              ثبت‌نام رایگان
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* آخرین مقالات */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-neutral-900">آخرین مقالات</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {latestArticles.map((a) => (
            <Card key={a.id}>
              <div className="flex aspect-video items-center justify-center bg-neutral-100 text-neutral-400">
                تصویر مقاله
              </div>
              <CardBody className="flex flex-col gap-2">
                <p className="text-xs text-neutral-500">{a.publishedAt}</p>
                <h3 className="font-bold text-neutral-900">{a.title}</h3>
                <p className="line-clamp-2 text-sm text-neutral-600">{a.summary}</p>
                <Link
                  href={`/library/articles/${a.slug}`}
                  className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  ادامه مطلب ←
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
