"use client";

import { useState } from "react";
import {
  UserCircle,
  Save,
  Camera,
  Lock,
  Shield,
  CheckCircle,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // شبیه‌سازی ذخیره
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl">
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserCircle size={24} aria-hidden />
        </div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          پروفایل من
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          اطلاعات حساب کاربری خود را مدیریت کنید
        </p>
      </div>

      {/* کارت آواتار و وضعیت */}
      <Card hover={false} className="mb-6 overflow-hidden">
        <div className="h-24 bg-gradient-to-l from-primary via-primary-light to-secondary" />
        <CardBody className="relative pt-0">
          <div className="-mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative">
                <span className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-surface bg-primary text-3xl font-extrabold text-white shadow-card">
                  ک
                </span>
                <button
                  className="absolute bottom-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white shadow-card transition-transform duration-300 hover:scale-110"
                  aria-label="تغییر عکس پروفایل"
                >
                  <Camera size={14} aria-hidden />
                </button>
              </div>
              <div className="pb-1 text-center sm:text-right">
                <h2 className="text-lg font-extrabold text-ink">کاربر افرا</h2>
                <Badge tone="primary" className="mt-1">
                  عضو باشگاه
                </Badge>
              </div>
            </div>
            <ButtonLink
              href="/forgot-password"
              variant="ghost"
              size="sm"
              className="mb-1"
            >
              <Lock size={14} aria-hidden />
              تغییر رمز عبور
            </ButtonLink>
          </div>
        </CardBody>
      </Card>

      {/* فرم اطلاعات شخصی */}
      <Card hover={false}>
        <CardBody>
          <div className="mb-5 flex items-center gap-2">
            <Shield size={18} className="text-primary" aria-hidden />
            <h3 className="text-base font-bold text-ink">اطلاعات شخصی</h3>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <UserCircle
                size={18}
                className="absolute top-[42px] right-3 text-ink-soft/60"
                aria-hidden
              />
              <Input
                label="نام و نام خانوادگی"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام کامل خود را وارد کنید"
                className="pr-10"
              />
            </div>

            <div className="relative">
              <Phone
                size={18}
                className="absolute top-[42px] right-3 text-ink-soft/60"
                aria-hidden
              />
              <Input
                label="شماره موبایل"
                name="phone"
                disabled
                placeholder="09xxxxxxxxx"
                className="pr-10 opacity-70"
              />
              <p className="mt-1.5 text-xs text-ink-soft/60">
                شماره موبایل قابل تغییر نیست و به عنوان نام کاربری استفاده
                می‌شود.
              </p>
            </div>

            <div className="relative">
              <Mail
                size={18}
                className="absolute top-[42px] right-3 text-ink-soft/60"
                aria-hidden
              />
              <Input
                label="ایمیل"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                dir="ltr"
                className="pr-10 text-left"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" size="lg" disabled={saving}>
                {saving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save size={16} aria-hidden />
                    ذخیره تغییرات
                  </>
                )}
              </Button>

              {saved && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                  <CheckCircle size={16} aria-hidden />
                  تغییرات ذخیره شد
                </span>
              )}
            </div>
          </form>
        </CardBody>
      </Card>

      {/* کارت عضویت */}
      <Card hover={false} className="mt-6">
        <CardBody className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <CreditCard size={22} aria-hidden />
            </span>
            <div>
              <h3 className="text-sm font-bold text-ink">وضعیت عضویت</h3>
              <p className="mt-0.5 text-xs text-ink-soft">
                عضویت رایگان · بدون محدودیت زمانی
              </p>
            </div>
          </div>
          <ButtonLink href="/dashboard/subscription" variant="secondary" size="sm">
            مدیریت اشتراک
          </ButtonLink>
        </CardBody>
      </Card>
    </div>
  );
}