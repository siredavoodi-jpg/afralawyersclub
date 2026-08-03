import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const prompts = [
  { id: "p1", title: "تحلیل ماده قانونی", category: "تحلیل حقوقی" },
  { id: "p2", title: "خلاصه‌سازی رأی دادگاه", category: "خلاصه‌سازی" },
  { id: "p3", title: "بررسی بند فسخ در قرارداد", category: "قرارداد" },
];

export default function PromptsPage() {
  return (
    <>
      <PageHeader title="بانک پرامپت" subtitle="پرامپت‌های آماده برای کارهای حقوقی روزمره" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((p) => (
            <Card key={p.id}>
              <CardBody className="flex flex-col gap-3">
                <Badge tone="accent">{p.category}</Badge>
                <h3 className="font-bold text-neutral-900">{p.title}</h3>
                <button className="mt-2 w-fit text-sm font-medium text-primary-600 hover:text-primary-700">
                  کپی پرامپت
                </button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
