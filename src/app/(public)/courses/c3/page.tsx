import { CourseReviews } from "@/components/reviews/CourseReviews";
import Link from "next/link";
import {
  Scale,
  Users,
  BookOpen,
  Clock,
  Sparkles,
  ArrowLeft,
  Shield,
  FileText,
  Lock,
  GraduationCap,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { electronicContractCourse } from "@/lib/courses/electronic-contract";

const toFa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function C3CoursePage() {
  const course = electronicContractCourse;
  const chapter = course.chapters[0];
  const totalDuration = chapter.lessons.reduce((sum, l) => {
    const match = l.readingTime.match(/\d+/);
    return sum + (match ? parseInt(match[0]) : 0);
  }, 0);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary-hover">
                <Shield size={16} aria-hidden />
                ویژه وکلای عضو باشگاه
              </span>
              <Badge tone="primary">دوره تخصصی</Badge>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 text-lg font-medium text-primary">
              و راه‌های اصلاح آن
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              {course.description}
            </p>

            {/* مدرس */}
            <div className="mt-6 flex items-center gap-3 rounded-card bg-surface p-4 shadow-card">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xl font-extrabold text-white">
                م‌ا
              </div>
              <div>
                <p className="text-xs text-ink-soft">مدرس دوره</p>
                <p className="text-base font-bold text-ink">
                  همکار وکیل، آقای محمد اشرافی زاوه
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <BookOpen size={16} className="text-primary" aria-hidden />
                {toFa(chapter.lessons.length)} درس
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-primary" aria-hidden />
                {toFa(totalDuration)} دقیقه
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={16} className="text-primary" aria-hidden />
                سطح پیشرفته
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink
                href={`/courses/c3/chapter/1`}
                variant="primary"
                size="lg"
              >
                شروع دوره
                <ArrowLeft size={16} aria-hidden />
              </ButtonLink>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex h-56 w-56 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary p-8 shadow-card-hover">
              <Scale size={96} className="text-white" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* درباره دوره */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-ink">درباره این دوره</h2>
        <p className="mt-3 max-w-3xl leading-8 text-ink-soft">
          قرارداد الکترونیک وکالت، یکی از مهم‌ترین اسناد حرفه‌ای وکیل است که
          کوچک‌ترین اشتباه در تنظیم آن می‌تواند منجر به تخلفات انتظامی، دعاوی
          مالی و ضرر به موکل شود. این دوره به شما کمک می‌کند تا تمام بندهای
          مهم قرارداد را با دیدی انتقادی بررسی کنید و نکاتی را که در قرارداد
          پیش‌فرض نادیده گرفته شده‌اند، اصلاح نمایید.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardBody className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText size={22} aria-hidden />
              </span>
              <div>
                <h3 className="font-bold text-ink">۸ نکته حیاتی</h3>
                <p className="mt-1 text-xs leading-5 text-ink-soft">
                  در شرایط قرارداد که اغلب وکلا از آن غافل‌اند
                </p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Sparkles size={22} aria-hidden />
              </span>
              <div>
                <h3 className="font-bold text-ink">اصلاح بندهای مشکل‌ساز</h3>
                <p className="mt-1 text-xs leading-5 text-ink-soft">
                  بندهای ۱۸، ۲۵، ۲۷ و ۲۸ با متن دقیق پیشنهادی
                </p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Shield size={22} aria-hidden />
              </span>
              <div>
                <h3 className="font-bold text-ink">پیشگیری از چالش</h3>
                <p className="mt-1 text-xs leading-5 text-ink-soft">
                  جلوگیری از شکایات انتظامی و دعاوی مالی با موکل
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* درباره مدرس */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card hover={false} className="overflow-hidden">
          <div className="bg-gradient-to-l from-primary to-primary-dark p-6 text-white sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
              <GraduationCap size={24} aria-hidden />
              درباره مدرس دوره
            </h2>
          </div>
          <CardBody className="p-6 sm:p-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl font-extrabold text-white shadow-card">
                م‌ا
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-extrabold text-ink">
                  همکار وکیل، آقای محمد اشرافی زاوه
                </h3>
                <p className="mt-3 leading-8 text-ink-soft">
                  ایشان با سال‌ها تجربه در حوزه وکالت و تسلط بر جزئیات قرارداد
                  الکترونیک وکالت، این دوره را با رویکردی کاربردی و مبتنی بر
                  تجارب واقعی تهیه کرده‌اند. در این دوره، نکاتی مطرح می‌شود که
                  حاصل برخورد با چالش‌های واقعی در تنظیم قراردادها و مواجهه با
                  دعاوی انتظامی و حقوقی است.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* فصل‌ها و درس‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-ink">فصل‌های دوره</h2>
        <p className="mt-2 text-sm text-ink-soft">{chapter.description}</p>

        <div className="mt-6 flex flex-col gap-4">
          {chapter.lessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={`/courses/c3/chapter/1/lesson/${lesson.id}`}
              className="group"
            >
              <Card className="overflow-hidden">
                <CardBody className="flex items-center gap-4 p-5 sm:p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-extrabold text-white transition-transform duration-300 group-hover:scale-110">
                    {toFa(i + 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-ink group-hover:text-primary sm:text-lg">
                      {lesson.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-xs text-ink-soft sm:text-sm">
                      {lesson.sections[0]?.paragraphs[0] || lesson.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                      <span className="flex items-center gap-1">
                        <Clock size={12} aria-hidden />
                        {lesson.readingTime}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {lesson.keywords?.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            tone="primary"
                            className="px-2 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowLeft
                    size={20}
                    className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                    aria-hidden
                  />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <CourseReviews courseId="c3" />
    </>
  );
}