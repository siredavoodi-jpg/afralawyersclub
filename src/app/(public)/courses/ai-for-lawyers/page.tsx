import Image from "next/image";
import Link from "next/link";
import { Lock, Sparkles, BookOpen, Clock } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { course } from "@/lib/course";

const upcomingChapters = [
  "آشنایی با ابزارها",
  "شروع کار",
  "پرامپت‌نویسی",
  "تکنیک‌های حرفه‌ای",
  "هوش مصنوعی برای وکلا",
  "امنیت و اخلاق",
  "کار عملی",
  "اشتباهات رایج",
  "کتابخانه پرامپت",
  "تمرین",
  "مسیر یادگیری",
];

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function CourseLandingPage() {
  const ch1 = course.chapters[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700">
              <Sparkles size={16} aria-hidden />
              دوره رایگان — فصل اول منتشر شد
            </span>
            <h1 className="text-3xl font-extrabold leading-tight text-neutral-900 sm:text-4xl">
              هوش مصنوعی برای <span className="text-primary-600">وکلا</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">
              {course.description}. بدون هیچ پیش‌زمینه فنی، فهم درستی از هوش مصنوعی و کاربرد آن در کار حقوقی پیدا کنید.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/courses/ai-for-lawyers/chapter/1" variant="secondary" size="lg">
                شروع فصل اول
              </ButtonLink>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/avatar.png"
              alt="آواتار باشگاه وکلای افرا"
              width={280}
              height={187}
              className="h-40 w-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* فصل‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900">فصل‌های دوره</h2>
        <p className="mt-2 text-sm text-neutral-600">
          فصل اول رایگان و در دسترس است؛ فصل‌های بعدی به‌زودی منتشر می‌شوند.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* فصل ۱ */}
          <Link href="/courses/ai-for-lawyers/chapter/1" className="block transition-fast hover:-translate-y-1">
            <Card>
              <CardBody className="flex h-full flex-col gap-3">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                    {toFa(1)}
                  </span>
                  <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
                    منتشر شده
                  </span>
                </div>
                <h3 className="font-bold text-neutral-900">{ch1.title}</h3>
                <p className="text-sm leading-6 text-neutral-600">{ch1.description}</p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-sm text-neutral-500">
                  <BookOpen size={15} aria-hidden />
                  {toFa(ch1.lessons.length)} درس
                  <span className="mx-1">•</span>
                  <Clock size={15} aria-hidden />
                  رایگان
                </div>
              </CardBody>
            </Card>
          </Link>

          {/* فصل‌های آینده */}
          {upcomingChapters.map((title, i) => (
            <div key={title} className="opacity-70">
              <Card>
                <CardBody className="flex h-full flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 font-bold text-neutral-500">
                      {toFa(i + 2)}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">
                      بزودی
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-500">{title}</h3>
                  <div className="mt-auto flex items-center gap-2 pt-2 text-sm text-neutral-400">
                    <Lock size={15} aria-hidden />
                    به‌زودی منتشر می‌شود
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}