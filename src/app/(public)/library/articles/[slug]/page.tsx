import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import { latestArticles } from "@/lib/sample-data";

export default function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // پیدا کردن مقاله بر اساس slug
  const found = latestArticles.find((a) => a.slug === params.slug);
  if (!found) return notFound();

  // تایپ امن با فیلدهای اختیاری
  const article = found as {
    id: string;
    title: string;
    slug: string;
    summary: string;
    publishedAt: string;
    content?: string;
    image?: string;
  };

  // مقالات مرتبط (حداکثر ۳ مقاله دیگر)
  const related = latestArticles
    .filter((a) => a.slug !== params.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* مسیر بازگشت */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        <Link
          href="/library"
          className="transition-colors hover:text-primary"
        >
          کتابخانه
        </Link>
        <ChevronLeft size={14} aria-hidden />
        <Link
          href="/library/articles"
          className="transition-colors hover:text-primary"
        >
          مقالات
        </Link>
        <ChevronLeft size={14} aria-hidden />
        <span className="font-medium text-ink">مقاله</span>
      </nav>

      {/* هدر مقاله */}
      <header className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <BookOpen size={13} aria-hidden />
          مقاله تخصصی
        </span>
        <h1 className="mt-4 text-2xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-primary" aria-hidden />
            {new Date(article.publishedAt).toLocaleDateString("fa-IR")}
          </span>
        </div>
      </header>

      {/* تصویر شاخص */}
      <div className="mb-8 flex aspect-video items-center justify-center overflow-hidden rounded-card bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-light shadow-card">
        <span className="text-sm font-bold text-primary-light">
          تصویر مقاله
        </span>
      </div>

      {/* خلاصه مقاله */}
      <div className="mb-6 rounded-card border-r-4 border-primary bg-primary/5 p-5">
        <p className="text-base leading-8 text-ink">{article.summary}</p>
      </div>

      {/* محتوای مقاله */}
      <div className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="whitespace-pre-line text-base leading-8 text-ink-soft">
          {article.content ||
            "محتوای کامل این مقاله به‌زودی منتشر می‌شود. در حال حاضر می‌توانید خلاصه مقاله را در بالای صفحه مطالعه کنید."}
        </div>
      </div>

      {/* دکمه بازگشت */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/library/articles"
          className="inline-flex items-center gap-2 rounded-btn border border-line bg-surface px-6 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:border-primary/40 hover:text-primary"
        >
          <ArrowRight size={16} aria-hidden />
          بازگشت به همه مقالات
        </Link>
      </div>

      {/* مقالات مرتبط */}
      {related.length > 0 && (
        <div className="mt-14 border-t border-line pt-10">
          <h2 className="text-xl font-bold text-ink">مقالات مرتبط</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/library/articles/${r.slug}`}
                className="group flex flex-col rounded-card border border-line bg-surface p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
              >
                <h3 className="line-clamp-2 text-sm font-bold text-ink transition-colors group-hover:text-primary">
                  {r.title}
                </h3>
                <span className="mt-auto flex items-center gap-1 pt-3 text-xs font-medium text-primary">
                  ادامه مطلب
                  <ArrowLeft
                    size={12}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}