import { PageHeader } from "@/components/layout/PageHeader";
import { AiToolCard } from "@/components/ai/AiToolCard";
import { aiToolCards } from "@/lib/sample-data";

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="خدمات هوش مصنوعی" subtitle="ابزارهای حقوقی مبتنی بر AI برای وکلای احراز شده" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aiToolCards.map((tool) => (
            <AiToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
