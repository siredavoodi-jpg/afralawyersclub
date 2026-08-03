import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";

const videos = [
  { id: "v1", title: "مقدمه‌ای بر AI برای وکلا" },
  { id: "v2", title: "چگونه پرامپت حقوقی بنویسیم" },
  { id: "v3", title: "معرفی ابزار تحلیل قرارداد" },
];

export default function VideosPage() {
  return (
    <>
      <PageHeader title="ویدئوها" subtitle="آموزش‌های ویدئویی کوتاه" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <Card key={v.id}>
              <div className="flex aspect-video items-center justify-center bg-neutral-900 text-white">
                ▶ پخش ویدئو
              </div>
              <div className="p-4">
                <h3 className="font-medium text-neutral-900">{v.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
