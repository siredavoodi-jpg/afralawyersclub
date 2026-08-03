import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LawsPage() {
  return (
    <>
      <PageHeader title="جستجوی قوانین" subtitle="جستجوی هوشمند در متن قوانین و آرای قضایی" />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <form className="flex gap-3">
          <Input name="query" placeholder="مثلاً: ماده ۱۰ قانون مدنی" className="flex-1" />
          <Button type="submit">جستجو</Button>
        </form>
        <div className="mt-8 rounded-lg bg-neutral-50 p-6 text-sm text-neutral-500">
          نتایج جستجو در قوانین و آرای مرتبط، پس از اتصال به منبع داده، اینجا نمایش داده می‌شود.
        </div>
      </section>
    </>
  );
}
