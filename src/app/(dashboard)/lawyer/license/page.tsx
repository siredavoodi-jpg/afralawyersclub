"use client";

import { useEffect, useState } from "react";
import {
  Scale,
  BadgeCheck,
  Clock,
  Calendar,
  ShieldCheck,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getAuthToken } from "@/lib/auth-client";

interface LicenseInfo {
  licenseNumber: string;
  membershipType: "bar_association" | "judiciary_center";
  licenseExpiry: string;
  verificationStatus: "pending" | "verified" | "rejected";
}

const membershipLabel: Record<string, string> = {
  bar_association: "کانون وکلای دادگستری",
  judiciary_center: "مرکز وکلای قوه قضاییه",
};

export default function LawyerLicensePage() {
  const [license, setLicense] = useState<LicenseInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const token = getAuthToken();
        const res = await fetch("/api/lawyer/license", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setLicense(data.license ?? null);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-ink-soft">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Scale size={24} aria-hidden />
        </div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          پروانه وکالت
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          اطلاعات و وضعیت پروانه وکالت شما
        </p>
      </div>

      {!license ? (
        <Card hover={false}>
          <CardBody className="flex flex-col items-center justify-center py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
              <Scale size={32} className="text-secondary" aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">
              اطلاعات پروانه ثبت نشده است
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              برای فعال‌سازی امکانات وکالت، اطلاعات پروانه خود را ثبت کنید.
            </p>
            <ButtonLink
              href="/dashboard/become-lawyer"
              variant="primary"
              className="mt-6"
            >
              ثبت اطلاعات پروانه
            </ButtonLink>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* وضعیت تایید */}
          {license.verificationStatus === "verified" && (
            <div className="mb-5 flex items-center gap-3 rounded-card border border-accent/30 bg-accent/10 p-4">
              <BadgeCheck size={22} className="shrink-0 text-accent" aria-hidden />
              <p className="text-sm font-medium text-accent-hover">
                پروانه شما تایید شده و حساب وکیل شما فعال است.
              </p>
            </div>
          )}
          {license.verificationStatus === "pending" && (
            <div className="mb-5 flex items-center gap-3 rounded-card border border-secondary/30 bg-secondary/10 p-4">
              <Clock size={22} className="shrink-0 text-secondary" aria-hidden />
              <p className="text-sm font-medium text-secondary-hover">
                پروانه شما در حال بررسی توسط مدیر است.
              </p>
            </div>
          )}
          {license.verificationStatus === "rejected" && (
            <div className="mb-5 flex items-center gap-3 rounded-card border border-error/30 bg-error/10 p-4">
              <Scale size={22} className="shrink-0 text-error" aria-hidden />
              <p className="text-sm font-medium text-error">
                پروانه شما رد شده است. لطفاً اطلاعات را بررسی و مجدداً ثبت کنید.
              </p>
            </div>
          )}

          {/* کارت اطلاعات پروانه */}
          <Card hover={false}>
            <CardBody className="pt-6">
              <div className="mb-6 flex items-center justify-between border-b border-line pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck size={22} aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-ink">
                      مشخصات پروانه
                    </h2>
                    <p className="text-xs text-ink-soft">
                      اطلاعات ثبت‌شده در سیستم
                    </p>
                  </div>
                </div>
                <Badge
                  tone={
                    license.verificationStatus === "verified"
                      ? "accent"
                      : license.verificationStatus === "pending"
                      ? "secondary"
                      : "neutral"
                  }
                >
                  {license.verificationStatus === "verified"
                    ? "تایید شده"
                    : license.verificationStatus === "pending"
                    ? "در حال بررسی"
                    : "رد شده"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-btn bg-base p-4">
                  <p className="text-xs text-ink-soft">شماره پروانه</p>
                  <p className="mt-1 font-en text-base font-bold text-ink" dir="ltr">
                    {license.licenseNumber}
                  </p>
                </div>
                <div className="rounded-btn bg-base p-4">
                  <p className="text-xs text-ink-soft">نوع عضویت</p>
                  <p className="mt-1 text-sm font-bold text-ink">
                    {membershipLabel[license.membershipType]}
                  </p>
                </div>
                <div className="rounded-btn bg-base p-4 sm:col-span-2">
                  <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                    <Calendar size={12} aria-hidden />
                    تاریخ اعتبار پروانه
                  </p>
                  <p className="mt-1 text-base font-bold text-ink">
                    {new Date(license.licenseExpiry).toLocaleDateString("fa-IR")}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                <Button variant="secondary" size="sm">
                  <RefreshCw size={14} aria-hidden />
                  به‌روزرسانی اطلاعات
                </Button>
                <ButtonLink href="/lawyer/subscription" variant="ghost" size="sm">
                  <CreditCard size={14} aria-hidden />
                  مدیریت اشتراک
                </ButtonLink>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}