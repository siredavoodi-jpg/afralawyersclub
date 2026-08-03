import Link from "next/link";
import { FileText, Video, Sparkles, Gavel } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";

const sections = [
  { href: "/library/articles", title: "مقالات", icon: FileText, desc: "مقالات تخصصی حقوقی و AI" },
  { href: "/library/videos", title: "ویدئو", icon: Video, desc: "آموزش‌های ویدئویی کوتاه" },
  { href: "/library/prompts", title: "پرامپت‌ها", icon: Sparkles, desc: "بانک پرامپت آماده برای وکلا" },
  { href: "/library/laws", title: "قوانین", icon: Gavel, desc: "جستجو در متن قوانین و آرا" },
];

export default function LibraryPage() {
  return (
    <>
      <PageHeader title="کتابخانه" subtitle="منابع آموزشی و مرجع برای وکلا و دانشجویان حقوق" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <Link key={s.href} href={s.href}>
              <Card>
                <CardBody className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <s.icon size={24} aria-hidden />
                  </span>
                  <h3 className="font-bold text-neutral-900">{s.title}</h3>
                  <p className="text-sm text-neutral-600">{s.desc}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
