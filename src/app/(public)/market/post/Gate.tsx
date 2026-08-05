"use client";

import { useEffect, useState } from "react";
import { Lock, BadgeCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getAuthUser } from "@/lib/auth-client";
import PostWizard from "@/components/market/PostWizard";

export function GateForLawyers({ categories }: { categories: any[] }) {
  const [status, setStatus] = useState<"loading" | "guest" | "member" | "lawyer">("loading");

  useEffect(() => {
    const u = getAuthUser();
    if (!u) setStatus("guest");
    else if (u.role === "lawyer") setStatus("lawyer");
    else setStatus("member");
  }, []);

  if (status === "loading") {
    return <div className="py-16 text-center text-neutral-500">در حال بررسی...</div>;
  }

  if (status === "guest") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-primary-300 bg-primary-50 p-8 text-center">
        <Lock size={36} className="text-primary-600" aria-hidden />
        <h2 className="text-xl font-bold text-neutral-900">ثبت آگهی فقط برای اعضا</h2>
        <p className="text-sm text-neutral-600">برای ثبت آگهی، ابتدا وارد حساب کاربری خود شوید یا ثبت‌نام کنید.</p>
        <div className="flex gap-3">
          <ButtonLink href="/login" variant="ghost">ورود</ButtonLink>
          <ButtonLink href="/register" variant="secondary">ثبت‌نام رایگان</ButtonLink>
        </div>
      </div>
    );
  }

  if (status === "member") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-secondary-300 bg-secondary-50 p-8 text-center">
        <BadgeCheck size={36} className="text-secondary-500" aria-hidden />
        <h2 className="text-xl font-bold text-neutral-900">فقط وکلای احراز هویت‌شده</h2>
        <p className="max-w-md text-sm text-neutral-600">
          برای حفظ کیفیت و امنیت بازارچه، امکان ثبت آگهی و مشاهده اطلاعات تماس فقط برای وکلای تاییدشده فعال است.
        </p>
        <ButtonLink href="/dashboard/become-lawyer" variant="secondary">درخواست وکیل شدن</ButtonLink>
      </div>
    );
  }

  return <PostWizard categories={categories} />;
}