import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Clock,
  Lock,
  PlayCircle,
} from "lucide-react";
import { course } from "@/lib/course";
import { ButtonLink } from "@/components/ui/Button";

const toFa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function ChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  const chapterId = Number(params.chapterId);
  const chapter = course.chapters.find((c) => c.id === chapterId);

  // اگر فصل وجود نداشت یا غیرفعال بود
  if (!chapter || !chapter.isActive) return notFound();

  const chapterIndex = course.chapters.findIndex((c) => c.id === chapterId);

  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* هدر فصل                                     */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-hero-gradient py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* دکمه بازگشت */}
          <Link
            href="/courses/ai-for-lawyers"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            <ArrowRight size={16} aria-hidden />
            بازگشت به صفحه دوره
          </Link>

          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-xl font-extrabold text-white shadow-card">
              {toFa(chapter.id)}
            </span>
            <div>
              <span className="text-xs font-bold text-secondary">
                فصل {toFa(chapterIndex + 1)} از {toFa(course.chapters.length)}
              </span>
              <h1 className="mt-1 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                {chapter.title}
              </h1>
            </div>
          </div>

          {chapter.description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
              {chapter.description}
            </p>
          )}

          {/* آمار فصل */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span className="flex items-center gap-1.5">
              <BookOpen size={16} className="text-primary" aria-hidden />
              {toFa(chapter.lessons.length)} درس
            </span>
            <span
              className={
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold " +
                (chapter.isFree
                  ? "bg-accent/10 text-accent-hover"
                  : "bg-secondary/10 text-secondary-hover")
              }
            >
              {chapter.isFree ? "رایگان برای همه" : "ویژه اعضای باشگاه"}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* لیست درس‌های فصل                           */}
      {/* ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-ink">درس‌های این فصل</h2>

        <div className="mt-6 flex flex-col gap-3">
          {chapter.lessons.map((lesson, i) => {
            const lessonHref = `/courses/ai-for-lawyers/chapter/${chapter.id}/lesson/${lesson.id}`;
            return (
              <Link
                key={lesson.id}
                href={lessonHref}
                className="group flex items-center gap-4 rounded-card border border-line bg-surface p-4 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <PlayCircle size={22} aria-hidden />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-ink transition-colors group-hover:text-primary sm:text-base">
                    درس {toFa(i + 1)}: {lesson.title}
                  </h3>
                  {typeof lesson.duration === "number" && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                      <Clock size={12} aria-hidden />
                      {toFa(lesson.duration)} دقیقه
                    </p>
                  )}
                </div>

                <ArrowLeft
                  size={18}
                  className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>

        {/* CTA عضویت برای فصل‌های قفل */}
        {!chapter.isFree && (
          <div className="mt-10 rounded-card bg-cta-gradient p-8 text-center shadow-card-hover">
            <Lock size={28} className="mx-auto text-white" aria-hidden />
            <h3 className="mt-3 text-lg font-extrabold text-white">
              این فصل ویژه اعضای باشگاه است
            </h3>
            <p className="mt-2 text-sm text-white/90">
              با عضویت رایگان، به تمام درس‌های این فصل و سایر فصل‌های ویژه
              دسترسی پیدا کنید.
            </p>
            <ButtonLink href="/register" variant="white" size="lg" className="mt-5">
              عضویت رایگان
            </ButtonLink>
          </div>
        )}
      </section>
    </>
  );
}