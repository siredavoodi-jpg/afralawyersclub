import Link from "next/link";
import {
  FileSearch,
  FileText,
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { aiToolCards } from "@/lib/sample-data";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="ویژه وکلای احراز شده"
        title="خدمات هوش مصنوعی"
        subtitle="ابزارهای حقوقی مبتنی بر AI برای تحلیل پرونده، تولید دادخواست، بررسی قرارداد و مشاوره هوشمند"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiToolCards.map((tool) => (
            <Link key={tool.id} href={tool.href} className="group">
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border border-line bg-surface p-6 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  {tool.id === "case-analysis" && <FileSearch size={24} aria-hidden />}
                  {tool.id === "petition" && <FileText size={24} aria-hidden />}
                  {tool.id === "contract" && <ShieldCheck size={24} aria-hidden />}
                  {tool.id === "chat" && <MessageCircle size={24} aria-hidden />}
                </span>
                <h3 className="mt-3 font-bold text-ink group-hover:text-primary">
                  {tool.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-ink-soft">
                  {tool.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  مشاهده
                  <ArrowLeft size={12} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA عضویت */}
        <div className="mt-10 rounded-card bg-cta-gradient p-8 text-center shadow-card-hover">
          <Lock size={28} className="mx-auto text-white" aria-hidden />
          <h2 className="mt-3 text-xl font-extrabold text-white">
            برای استفاده از این خدمات، عضو شوید
          </h2>
          <p className="mt-2 text-sm text-white/90">
            عضویت رایگان است. پس از احراز هویت وکالت، به تمام ابزارهای AI دسترسی پیدا کنید.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-flex items-center gap-2 rounded-btn bg-white px-6 py-3 text-sm font-bold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary-50"
          >
            عضویت رایگان
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}