import Link from "next/link";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function MyListingsPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <Link href="/market" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-600">
        <ArrowRight size={16} />
        بازگشت به مارکت
      </Link>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-accent-200 bg-accent-50 p-10">
        <CheckCircle size={56} className="text-accent-500" aria-hidden />
        <h1 className="text-2xl font-bold text-neutral-900">آگهی شما با موفقیت ثبت شد</h1>
        <p className="flex items-center gap-2 text-neutral-600">
          <Clock size={16} />
          آگهی شما در صف بررسی است و معمولاً ظرف ۲۴ ساعت منتشر می‌شود.
        </p>
        <div className="mt-4 flex gap-3">
          <ButtonLink href="/market/post" variant="secondary">ثبت آگهی دیگر</ButtonLink>
          <ButtonLink href="/market" variant="ghost">بازگشت به مارکت</ButtonLink>
        </div>
      </div>
    </section>
  );
}