import Image from "next/image";
import Link from "next/link";
import { Lock, Sparkles, BookOpen } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { course } from "@/lib/course";

const ALL_CHAPTER_TITLES = [
  "آشنایی با هوش مصنوعی",
  "آشنایی با ابزارهای هوش مصنوعی",
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
  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700">
              <Sparkles size={16} aria-hidden />
              فصل اول رایگان + فصل دوم ویژه اعضا منتشر شد
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
            <Image src="/images/avatar.png" alt="آواتار باشگاه وکلای افرا" width={280} height={187} className="h-40 w-auto" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900">فصل‌های دوره</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_CHAPTER_TITLES.map((fallbackTitle, i) => {
            const ch = course.chapters.find((c) => c.id === i + 1);
            if (ch && ch.isActive) {
              return (
                <Link key={i} href={`/courses/ai-for-lawyers/chapter/${ch.id}`} className="block transition-fast hover:-translate-y-1">
                  <Card>
                    <CardBody className="flex h-full flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-bold text-white">{toFa(i + 1)}</span>
                        <span className={"rounded-full px-3 py-1 text-xs font-medium " + (ch.isFree ? "bg-accent-50 text-accent-700" : "bg-secondary-50 text-secondary-700")}>
                          {ch.isFree ? "رایگان" : "ویژه اعضا"}
                        </span>
                      </div>
                      <h3 className="font-bold text-neutral-900">{ch.title}</h3>
                      <p className="text-sm leading-6 text-neutral-600">{ch.description}</p>
                      <div className="mt-auto flex items-center gap-2 pt-2 text-sm text-neutral-500">
                        <BookOpen size={15} aria-hidden />
                        {toFa(ch.lessons.length)} درس
                        {!ch.isFree && (<><span className="mx-1">•</span><Lock size={14} aria-hidden />عضویت لازم است</>)}
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              );
            }
            return (
              <div key={i} className="opacity-70">
                <Card>
                  <CardBody className="flex h-full flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 font-bold text-neutral-500">{toFa(i + 1)}</span>
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">بزودی</span>
                    </div>
                    <h3 className="font-bold text-neutral-500">{fallbackTitle}</h3>
                    <div className="mt-auto flex items-center gap-2 pt-2 text-sm text-neutral-400">
                      <Lock size={15} aria-hidden />
                      به‌زودی منتشر می‌شود
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}