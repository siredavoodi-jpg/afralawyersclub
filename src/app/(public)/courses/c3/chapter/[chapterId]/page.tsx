import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, BookOpen, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { electronicContractCourse, getECChapter } from "@/lib/courses/electronic-contract";

const toFa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function ECChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  const chapterId = Number(params.chapterId);
  const chapter = getECChapter(chapterId);

  if (!chapter || !chapter.isActive) return notFound();

  const totalDuration = chapter.lessons.reduce((sum, l) => {
    const match = l.readingTime.match(/\d+/);
    return sum + (match ? parseInt(match[0]) : 0);
  }, 0);

  return (
    <>
      <section className="bg-hero-gradient py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/courses/c3`}
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
                فصل {toFa(chapter.id)}
              </span>
              <h1 className="mt-1 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                {chapter.title}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {chapter.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span className="flex items-center gap-1.5">
              <BookOpen size={16} className="text-primary" aria-hidden />
              {toFa(chapter.lessons.length)} درس
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-primary" aria-hidden />
              {toFa(totalDuration)} دقیقه
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-ink">درس‌های این فصل</h2>

        <div className="mt-6 flex flex-col gap-3">
          {chapter.lessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={`/courses/c3/chapter/${chapter.id}/lesson/${lesson.id}`}
              className="group"
            >
              <div className="flex items-center gap-4 rounded-card border border-line bg-surface p-4 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  {toFa(i + 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-ink group-hover:text-primary sm:text-base">
                    {lesson.title}
                  </h3>
                  <p className="mt-1 truncate text-xs text-ink-soft">
                    {lesson.sections[0]?.heading}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {lesson.keywords?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-full bg-base px-2 py-0.5 text-[10px] text-ink-soft"
                      >
                        <Tag size={10} aria-hidden />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowLeft
                  size={18}
                  className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}