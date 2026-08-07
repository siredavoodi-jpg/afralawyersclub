import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import { course } from "@/lib/course";

const toFa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function LessonPage({
  params,
}: {
  params: { chapterId: string; lessonId: string };
}) {
  // پیدا کردن فصل و درس (با مقایسه امن برای id عددی یا رشته‌ای)
  const chapter = course.chapters.find(
    (c) => String(c.id) === String(params.chapterId)
  );
  if (!chapter || !chapter.isActive) return notFound();

  const lessonIndex = chapter.lessons.findIndex(
    (l) => String(l.id) === String(params.lessonId)
  );
  if (lessonIndex === -1) return notFound();

  const lesson = chapter.lessons[lessonIndex] as {
    id: number | string;
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number;
  };

  const prevLesson = lessonIndex > 0 ? chapter.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < chapter.lessons.length - 1
      ? chapter.lessons[lessonIndex + 1]
      : null;

  const chapterHref = `/courses/ai-for-lawyers/chapter/${chapter.id}`;
  const makeLessonHref = (lessonId: number | string) =>
    `/courses/ai-for-lawyers/chapter/${chapter.id}/lesson/${lessonId}`;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* ═══════════════════════════════════════════ */}
      {/* مسیر بازگشت (Breadcrumb)                    */}
      {/* ═══════════════════════════════════════════ */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        <Link
          href="/courses/ai-for-lawyers"
          className="transition-colors hover:text-primary"
        >
          دوره هوش مصنوعی
        </Link>
        <ChevronLeft size={14} aria-hidden />
        <Link
          href={chapterHref}
          className="transition-colors hover:text-primary"
        >
          فصل {toFa(chapter.id)}: {chapter.title}
        </Link>
        <ChevronLeft size={14} aria-hidden />
        <span className="font-medium text-ink">درس {toFa(lessonIndex + 1)}</span>
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/* هدر درس                                     */}
      {/* ═══════════════════════════════════════════ */}
      <div className="mb-8">
        <span className="text-xs font-bold text-secondary">
          درس {toFa(lessonIndex + 1)} از {toFa(chapter.lessons.length)} · فصل{" "}
          {toFa(chapter.id)}
        </span>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
          {lesson.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
          {typeof lesson.duration === "number" && (
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-primary" aria-hidden />
              {toFa(lesson.duration)} دقیقه
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-accent" aria-hidden />
            {chapter.title}
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ناحیه ویدیو                                 */}
      {/* ═══════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
        {lesson.videoUrl ? (
          <div className="aspect-video w-full">
            <video
              controls
              className="h-full w-full bg-black"
              src={lesson.videoUrl}
            >
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
          </div>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-light text-primary-light">
            <PlayCircle size={48} aria-hidden />
            <p className="text-sm font-bold">ویدیوی این درس به‌زودی بارگذاری می‌شود</p>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* محتوای متنی درس                             */}
      {/* ═══════════════════════════════════════════ */}
      {(lesson.content || lesson.description) && (
        <div className="mt-8 rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
          <h2 className="text-lg font-bold text-ink">خلاصه و نکات درس</h2>
          <div className="mt-4 whitespace-pre-line text-base leading-8 text-ink-soft">
            {lesson.content || lesson.description}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* ناوبری بین درس‌ها (قبلی / بعدی)            */}
      {/* ═══════════════════════════════════════════ */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prevLesson ? (
          <Link
            href={makeLessonHref(prevLesson.id)}
            className="group flex items-center gap-3 rounded-card border border-line bg-surface p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover"
          >
            <ArrowRight
              size={20}
              className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-xs text-ink-soft">درس قبلی</p>
              <p className="truncate text-sm font-bold text-ink group-hover:text-primary">
                {prevLesson.title}
              </p>
            </div>
          </Link>
        ) : (
          <Link
            href={chapterHref}
            className="group flex items-center gap-3 rounded-card border border-line bg-surface p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover"
          >
            <ArrowRight
              size={20}
              className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-xs text-ink-soft">بازگشت</p>
              <p className="truncate text-sm font-bold text-ink group-hover:text-primary">
                صفحه فصل {toFa(chapter.id)}
              </p>
            </div>
          </Link>
        )}

        {nextLesson ? (
          <Link
            href={makeLessonHref(nextLesson.id)}
            className="group flex items-center justify-end gap-3 rounded-card border border-line bg-surface p-5 text-left shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover"
          >
            <div className="min-w-0 text-left">
              <p className="text-xs text-ink-soft">درس بعدی</p>
              <p className="truncate text-sm font-bold text-ink group-hover:text-primary">
                {nextLesson.title}
              </p>
            </div>
            <ArrowLeft
              size={20}
              className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
              aria-hidden
            />
          </Link>
        ) : (
          <Link
            href={chapterHref}
            className="group flex items-center justify-end gap-3 rounded-card bg-accent/10 p-5 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent/20"
          >
            <div className="min-w-0 text-left">
              <p className="text-xs text-accent-hover">پایان فصل</p>
              <p className="flex items-center gap-1 truncate text-sm font-bold text-accent-hover">
                <CheckCircle2 size={14} aria-hidden />
                بازگشت به فصل {toFa(chapter.id)}
              </p>
            </div>
            <ArrowLeft
              size={20}
              className="shrink-0 text-accent-hover"
              aria-hidden
            />
          </Link>
        )}
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* لیست سریع درس‌های فصل                      */}
      {/* ═══════════════════════════════════════════ */}
      <div className="mt-10">
        <h3 className="text-base font-bold text-ink">درس‌های این فصل</h3>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {chapter.lessons.map((l, i) => {
            const isCurrent = String(l.id) === String(params.lessonId);
            return (
              <Link
                key={l.id}
                href={makeLessonHref(l.id)}
                className={
                  "flex items-center gap-3 rounded-btn border px-4 py-3 text-sm transition-all duration-300 ease-out " +
                  (isCurrent
                    ? "border-primary bg-primary/10 font-bold text-primary"
                    : "border-line bg-surface text-ink-soft hover:border-primary-200 hover:text-primary")
                }
              >
                <span
                  className={
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold " +
                    (isCurrent
                      ? "bg-primary text-white"
                      : "bg-base text-ink-soft")
                  }
                >
                  {toFa(i + 1)}
                </span>
                <span className="truncate">{l.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}