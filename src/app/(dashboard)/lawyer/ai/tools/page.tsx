import Link from "next/link";
import { FileSearch, FileText, ShieldCheck, Gavel, BookMarked } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";

const tools = [
  { href: "/lawyer/ai/case-analysis", title: "تحلیل پرونده", desc: "خلاصه، نکات کلیدی و قوانین مرتبط", icon: FileSearch },
  { href: "/services/petition", title: "تولید دادخواست", desc: "تولید متن دادخواست با فرمت استاندارد", icon: FileText },
  { href: "/lawyer/ai/contract", title: "تحلیل قرارداد", desc: "شناسایی بندهای مهم و ریسک‌ها", icon: ShieldCheck },
  { href: "/library/laws", title: "جستجوی قوانین", desc: "جستجوی هوشمند در متن قوانین", icon: Gavel },
  { href: "/lawyer/ai/documents", title: "بانک آرا", desc: "دسترسی به آرای قضایی مرتبط", icon: BookMarked },
];

export default function LawyerAiToolsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">ابزارهای AI</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card>
              <CardBody className="flex flex-col gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <t.icon size={22} aria-hidden />
                </span>
                <h3 className="font-bold text-neutral-900">{t.title}</h3>
                <p className="text-sm text-neutral-600">{t.desc}</p>
                <span className="mt-2 w-fit text-sm font-medium text-secondary-600">استفاده →</span>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
