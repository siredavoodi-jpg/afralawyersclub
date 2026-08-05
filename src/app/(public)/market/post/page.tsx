import Link from "next/link";
import { Lock, BadgeCheck, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { ButtonLink } from "@/components/ui/Button";
import PostWizard from "@/components/market/PostWizard";

// چون این صفحه "use client" را در PostWizard دارد، خود صفحه می‌تواند server-side باشد
// اما باید وضعیت کاربر را client-side چک کنیم (برای سازگاری با auth-client)
// ساده‌ترین راه: همیشه PostWizard را نمایش می‌دهیم و آن درون خودش gating می‌کند

import { GateForLawyers } from "./Gate";

export default async function PostListingPage() {
  const categories = await prisma.marketCategory.findMany({
    where: { parentId: null },
    orderBy: { name: "asc" },
  });

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/market" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700">
        <ArrowRight size={16} aria-hidden />
        بازگشت به مارکت
      </Link>

      <GateForLawyers categories={categories} />
    </section>
  );
}