"use client";

import { useEffect, useState } from "react";
import { Lock, Phone, BadgeCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getAuthUser, type AuthUser } from "@/lib/auth-client";

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export function ContactBox({ phone }: { phone: string | null }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  // مهمان
  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-primary-300 bg-primary-50 p-6 text-center">
        <Lock size={28} className="text-primary-600" aria-hidden />
        <p className="font-bold text-neutral-900">شماره تماس فقط برای اعضا</p>
        <p className="text-sm text-neutral-600">برای مشاهده شماره و ارتباط با فروشنده، وارد شوید یا ثبت‌نام کنید.</p>
        <div className="flex gap-2">
          <ButtonLink href="/login" variant="ghost" size="sm">ورود</ButtonLink>
          <ButtonLink href="/register" variant="secondary" size="sm">ثبت‌نام رایگان</ButtonLink>
        </div>
      </div>
    );
  }

  // عضو غیر وکیل
  if (user.role !== "lawyer") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-secondary-300 bg-secondary-50 p-6 text-center">
        <BadgeCheck size={28} className="text-secondary-500" aria-hidden />
        <p className="font-bold text-neutral-900">ویژه وکلای احراز هویت‌شده</p>
        <p className="text-sm text-neutral-600">تماس با فروشنده فقط برای وکلای تاییدشده باشگاه فعال است.</p>
        <ButtonLink href="/dashboard/become-lawyer" variant="secondary" size="sm">درخواست وکیل شدن</ButtonLink>
      </div>
    );
  }

  // وکیل تاییدشده
  return (
    <div className="rounded-xl border border-accent-200 bg-accent-50 p-6">
      <p className="mb-2 text-sm font-medium text-accent-700">شماره تماس فروشنده</p>
      <a
        href={`tel:${phone}`}
        className="flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-3 font-bold text-white hover:bg-accent-600"
      >
        <Phone size={18} aria-hidden />
        {phone ? toFa(phone) : "شماره‌ای ثبت نشده"}
      </a>
    </div>
  );
}