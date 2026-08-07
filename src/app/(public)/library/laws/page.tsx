import { Search, Scale, BookOpen, Gavel } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const suggestions = [
  { icon: Scale, label: "قانون مدنی" },
  { icon: Gavel, label: "آرای قضایی" },
  { icon: BookOpen, label: "قانون تجارت" },
];

export default function LawsPage() {
  return (
    <>
      <PageHeader
        badge="کتابخانه حقوقی"
        title="جستجوی قوانین"
        subtitle="جستجوی هوشمند در متن قوانین و آرای قضایی"
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* فرم جستجو */}
        <form className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft/60"
              aria-hidden
            />
            <Input
              name="query"
              placeholder="مثلاً: ماده ۱۰ قانون مدنی"
              className="pr-10"
            />
          </div>
          <Button type="submit" size="lg">
            جستجو
          </Button>
        </form>

        {/* پیشنهادهای سریع */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-ink-soft">جستجوهای پرطرفدار:</span>
          {suggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              <s.icon size={13} aria-hidden />
              {s.label}
            </button>
          ))}
        </div>

        {/* ناحیه نتایج */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-line bg-base p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Scale size={26} aria-hidden />
          </span>
          <p className="text-sm leading-7 text-ink-soft">
            نتایج جستجو در قوانین و آرای مرتبط، پس از اتصال به منبع داده، اینجا
            نمایش داده می‌شود.
          </p>
        </div>
      </section>
    </>
  );
}