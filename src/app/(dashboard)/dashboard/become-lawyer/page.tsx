"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { RequireRole } from "@/components/auth/RequireRole";
import { getAuthToken } from "@/lib/auth-client";
import {
  BadgeCheck,
  Clock,
  XCircle,
  Scale,
  Sparkles,
  FileText,
  ShieldCheck,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

export default function BecomeLawyerPage() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [membershipType, setMembershipType] = useState<
    "bar_association" | "judiciary_center"
  >("bar_association");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [existingStatus, setExistingStatus] = useState<string | null>(null);

  useEffect(() => {
    async function checkStatus() {
      setLoading(true);
      try {
        const token = getAuthToken();
        const res = await fetch("/api/member/become-lawyer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.exists) {
            setExistingStatus(data.status);
          }
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    checkStatus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!licenseNumber || !licenseExpiry) {
      setError("لطفاً تمامی فیلدها را تکمیل کنید.");
      return;
    }

    setSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch("/api/member/become-lawyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ licenseNumber, membershipType, licenseExpiry }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "ثبت درخواست با خطا مواجه شد.");
        return;
      }
      setSuccess(data.message || "درخواست شما با موفقیت ثبت شد.");
      setExistingStatus("pending");
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <RequireRole allowedRoles={["member"]} redirectTo="/login">
      <div>
        {/* هدر */}
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Scale size={24} aria-hidden />
          </div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            درخواست وکیل شدن
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            با ارتقاء حساب خود به وکیل، به امکانات تخصصی وکلا دسترسی پیدا کنید
          </p>
        </div>

        {/* حالت بارگذاری */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-ink-soft">در حال بارگذاری...</p>
            </div>
          </div>
        ) : existingStatus === "verified" ? (
          /* ✅ کاربر وکیل تایید شده است */
          <div className="mt-8 max-w-lg">
            <Card hover={false}>
              <CardBody className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <BadgeCheck size={36} className="text-accent" />
                </div>
                <h2 className="text-xl font-extrabold text-ink">
                  شما وکیل تایید شده هستید
                </h2>
                <p className="text-sm text-ink-soft">
                  حساب شما به عنوان وکیل تایید شده است.
                </p>
                <Link href="/lawyer/dashboard" className="mt-2">
                  <Button size="lg">
                    رفتن به پنل وکیل
                    <ArrowLeft size={16} aria-hidden />
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        ) : existingStatus === "pending" ? (
          /* ⏳ در انتظار تایید */
          <div className="mt-8 max-w-lg">
            {success && (
              <div className="mb-4 rounded-btn border border-accent/30 bg-accent/10 p-3 text-sm text-accent-hover">
                {success}
              </div>
            )}
            <Card hover={false}>
              <CardBody className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <Clock size={36} className="text-secondary" />
                </div>
                <h2 className="text-xl font-extrabold text-ink">
                  درخواست شما در حال بررسی است
                </h2>
                <p className="text-sm leading-7 text-ink-soft">
                  درخواست وکیل شدن شما ثبت شده و در انتظار تایید مدیر است. پس از
                  تایید، به پنل وکیل دسترسی پیدا خواهید کرد.
                </p>
              </CardBody>
            </Card>
          </div>
        ) : (
          /* 📝 فرم درخواست */
          <>
            {existingStatus === "rejected" && (
              <div className="mt-4 flex max-w-lg items-center gap-2 rounded-btn border border-error/30 bg-error/10 p-3 text-sm text-error">
                <XCircle size={18} className="shrink-0" />
                <span>
                  درخواست قبلی شما رد شده است. می‌توانید مجدداً درخواست دهید.
                </span>
              </div>
            )}

            <div className="mt-8 max-w-lg">
              <Card hover={false}>
                <CardBody>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input
                      label="شماره پروانه وکالت"
                      name="licenseNumber"
                      placeholder="شماره پروانه خود را وارد کنید"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      required
                    />

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="membershipType"
                        className="text-sm font-medium text-ink-soft"
                      >
                        نوع عضویت
                      </label>
                      <select
                        id="membershipType"
                        value={membershipType}
                        onChange={(e) =>
                          setMembershipType(
                            e.target.value as
                              | "bar_association"
                              | "judiciary_center"
                          )
                        }
                        className="rounded-btn border border-line bg-surface px-4 py-2.5 text-sm text-ink transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="bar_association">
                          کانون وکلای دادگستری
                        </option>
                        <option value="judiciary_center">
                          مرکز وکلای قوه قضاییه
                        </option>
                      </select>
                    </div>

                    <Input
                      label="تاریخ اعتبار پروانه"
                      name="licenseExpiry"
                      type="date"
                      value={licenseExpiry}
                      onChange={(e) => setLicenseExpiry(e.target.value)}
                      required
                    />

                    {error && (
                      <div className="rounded-btn border border-error/30 bg-error/10 p-3 text-sm text-error">
                        {error}
                      </div>
                    )}

                    <Button type="submit" size="lg" disabled={submitting}>
                      {submitting ? "در حال ثبت..." : "ثبت درخواست وکیل شدن"}
                    </Button>
                  </form>
                </CardBody>
              </Card>

              {/* مزایای حساب وکیل */}
              <div className="mt-6 overflow-hidden rounded-card bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-secondary" aria-hidden />
                  <h3 className="text-sm font-bold text-ink">
                    مزایای حساب وکیل
                  </h3>
                </div>
                <ul className="mt-2 flex flex-col gap-2.5 text-sm text-ink-soft">
                  <li className="flex items-start gap-2">
                    <Briefcase
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>دسترسی به ابزارهای هوش مصنوعی تخصصی وکلا</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>مدیریت پرونده‌ها و موکلین</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>تحلیل پرونده با AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Scale
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>تنظیم قرارداد و دادخواست هوشمند</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </RequireRole>
  );
}