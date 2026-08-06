import Link from "next/link";
import { Heart, ArrowLeft, Sparkles, GraduationCap, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

const impacts = [
  {
    icon: GraduationCap,
    title: "توسعه دوره‌های آموزشی",
    desc: "حمایت شما به تولید محتوای آموزشی باکیفیت برای وکلا و دانشجویان حقوق کمک می‌کند.",
  },
  {
    icon: Sparkles,
    title: "گسترش ابزارهای AI",
    desc: "با حمایت مالی، ابزارهای هوش مصنوعی حقوقی را توسعه و بهبود می‌دهیم.",
  },
  {
    icon: Users,
    title: "دسترسی رایگان برای همه",
    desc: "کمک می‌کنید منابع آموزشی به صورت رایگان در دسترس جامعه حقوقی باقی بماند.",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        badge="حمایت از افرا"
        title="حمایت مالی"
        subtitle="با حمایت خود، به رشد و توسعه پلتفرم آموزش هوش مصنوعی برای جامعه حقوقی کمک کنید"
      />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {impacts.map((item) => (
            <div
              key={item.title}
              className="flex min-h-[220px] flex-col items-center justify-center rounded-card border border-line bg-surface p-6 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <item.icon size={24} aria-hidden />
              </span>
              <h3 className="mt-3 font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-ink-soft">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA حمایت */}
        <div className="mt-10 rounded-card bg-cta-gradient p-10 text-center shadow-card-hover">
          <Heart size={32} className="mx-auto text-white" aria-hidden />
          <h2 className="mt-3 text-2xl font-extrabold text-white">
            همین حالا از افرا حمایت کنید
          </h2>
          <p className="mt-2 text-sm text-white/90">
            هر مقدار حمایت شما، گامی به سوی آموزش بهتر و ابزارهای هوشمندتر برای
            جامعه حقوقی است.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-btn bg-white px-7 py-3 text-sm font-bold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary-50"
          >
            هماهنگی برای حمایت
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}