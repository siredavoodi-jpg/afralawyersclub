import Link from "next/link";
import { FileText, Video, Sparkles, Gavel } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

const sections = [
  {
    href: "/library/articles",
    title: "مقالات",
    icon: FileText,
    desc: "مقالات تخصصی حقوقی و AI",
    color: "primary" as const,
  },
  {
    href: "/library/videos",
    title: "ویدئو",
    icon: Video,
    desc: "آموزش‌های ویدئویی کوتاه",
    color: "secondary" as const,
  },
  {
    href: "/library/prompts",
    title: "پرامپت‌ها",
    icon: Sparkles,
    desc: "بانک پرامپت آماده برای وکلا",
    color: "accent" as const,
  },
  {
    href: "/library/laws",
    title: "قوانین",
    icon: Gavel,
    desc: "جستجو در متن قوانین و آرا",
    color: "primary" as const,
  },
];

const colorStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

export default function LibraryPage() {
  return (
    <>
      <PageHeader
        badge="منابع آموزشی"
        title="کتابخانه"
        subtitle="منابع آموزشی و مرجع برای وکلا و دانشجویان حقوق"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border border-line bg-surface p-6 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover">
                <span
                  className={
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 " +
                    colorStyles[s.color]
                  }
                >
                  <s.icon size={24} aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-ink group-hover:text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs text-ink-soft">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}