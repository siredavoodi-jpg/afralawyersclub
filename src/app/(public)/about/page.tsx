import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";

const values = [
  {
    title: "تخصص",
    desc: "دانش عمیق حقوقی همراه با تسلط بر ابزارهای هوش مصنوعی.",
  },
  {
    title: "نوآوری",
    desc: "به‌کارگیری جدیدترین فناوری‌ها در خدمت جامعه حقوقی.",
  },
  {
    title: "اعتماد",
    desc: "شفافیت و امنیت داده در تمام خدمات ارائه‌شده.",
  },
  {
    title: "دسترسی‌پذیری",
    desc: "خدماتی در دسترس برای وکلا و دانشجویان حقوق در سراسر کشور.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="Legal Tech"
        title="درباره باشگاه وکلای افرا"
        subtitle="پلتفرم تخصصی Legal Tech برای آموزش هوش مصنوعی و ارائه خدمات حقوقی هوشمند به وکلا"
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-ink">مأموریت ما</h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          توانمندسازی وکلای ایرانی با ابزارهای هوش مصنوعی برای افزایش کارایی، دقت
          و کیفیت خدمات حقوقی.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-ink">ارزش‌های کلیدی</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <Card key={v.title}>
              <CardBody>
                <h3 className="font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{v.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}