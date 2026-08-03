import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { latestArticles } from "@/lib/sample-data";

export default function ArticlesPage() {
  return (
    <>
      <PageHeader title="مقالات" subtitle="جدیدترین مقالات حقوقی و هوش مصنوعی" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((a) => (
            <Card key={a.id}>
              <div className="flex aspect-video items-center justify-center bg-neutral-100 text-neutral-400">
                تصویر مقاله
              </div>
              <CardBody className="flex flex-col gap-2">
                <p className="text-xs text-neutral-500">{a.publishedAt}</p>
                <h3 className="font-bold text-neutral-900">{a.title}</h3>
                <p className="line-clamp-2 text-sm text-neutral-600">{a.summary}</p>
                <Link href={`/library/articles/${a.slug}`} className="mt-2 text-sm font-medium text-primary-600">
                  ادامه مطلب ←
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
