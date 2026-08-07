import Image from "next/image";
import Link from "next/link";
import { Lock, BookOpen, Users } from "lucide-react";
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
  "جعبه‌ابزار پرامپت",
  "تمرین",
  "مسیر یادگیری",
];

const toFa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function CourseLandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-hover">
              <Users size={16} aria-hidden />
              برای علاقمندان · فصل اول رایگان + فصل دوم ویژه اعضای باشگاه
            </span>
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              آموزش مقدماتی{" "}
              <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                هوش مصنوعی
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              {course.description}. بدون هیچ پیش‌زمینه فنی، قدم به قدم از صفر تا
              استفاده از هوش مصنوعی در کار حقوقی پیش بروید.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink
                href="/courses/ai-for-lawyers/chapter/1"
                variant="secondary"
                size="lg"
              >
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

      {/* فصل‌های دوره */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-ink">فصل‌های دوره</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_CHAPTER_TITLES.map((fallbackTitle, i) => {
            const ch = course.chapters.find((c) => c.id === i + 1);
            if (ch && ch.isActive) {
              return (
                <Link
                  key={i}
                  href={`/courses/ai-for-lawyers/chapter/${ch.id}`}
                  className="group block"
                >
                  <Card className="h-full">
                    <CardBody className="flex h-full flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white transition-transform duration-300 group-hover:scale-110">
                          {toFa(i + 1)}
                        </span>
                        <span
                          className={
                            "rounded-full px-3 py-1 text-xs font-medium " +
                            (ch.isFree
                              ? "bg-accent/10 text-accent-hover"
                              : "bg-secondary/10 text-secondary-hover")
                          }
                        >
                          {ch.isFree ? "برای علاقمندان" : "ویژه اعضا"}
                        </span>
                      </div>
                      <h3 className="font-bold text-ink group-hover:text-primary">
                        {ch.title}
                      </h3>
                      <p className="text-sm leading-6 text-ink-soft">
                        {ch.description}
                      </p>
                      <div className="mt-auto flex items-center gap-2 pt-2 text-sm text-ink-soft">
                        <BookOpen size={15} aria-hidden />
                        {toFa(ch.lessons.length)} درس
                        {!ch.isFree && (
                          <>
                            <span className="mx-1">•</span>
                            <Lock size={14} aria-hidden />
                            عضویت لازم است
                          </>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              );
            }
            return (
              <div key={i} className="opacity-70">
                <Card hover={false} className="h-full">
                  <CardBody className="flex h-full flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-line font-bold text-ink-soft">
                        {toFa(i + 1)}
                      </span>
                      <span className="rounded-full bg-base px-3 py-1 text-xs font-medium text-ink-soft">
                        بزودی
                      </span>
                    </div>
                    <h3 className="font-bold text-ink-soft">{fallbackTitle}</h3>
                    <div className="mt-auto flex items-center gap-2 pt-2 text-sm text-ink-soft/70">
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