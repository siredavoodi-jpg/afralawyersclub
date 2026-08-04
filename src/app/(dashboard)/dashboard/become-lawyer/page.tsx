"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { RequireRole } from "@/components/auth/RequireRole";
import { getAuthToken } from "@/lib/auth-client";
import { BadgeCheck, Clock, XCircle } from "lucide-react";

export default function BecomeLawyerPage() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [membershipType, setMembershipType] = useState<"bar_association" | "judiciary_center">("bar_association");
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
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
        <h1 className="text-2xl font-bold text-neutral-900">درخواست وکیل شدن</h1>
        <p className="mt-1 text-neutral-600">
          با ارتقاء حساب خود به وکیل، به امکانات تخصصی وکلا دسترسی پیدا کنید
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-neutral-500">در حال بارگذاری...</p>
          </div>
        ) : existingStatus === "verified" ? (
          <div className="mt-8 max-w-lg">
            <Card>
              <CardBody className="flex flex-col items-center gap-4 py-12 text-center">
                <BadgeCheck size={48} className="text-primary-600" />
                <h2 className="text-xl font-bold text-neutral-900">شما وکیل تایید شده هستید</h2>
                <p className="text-neutral-600">حساب شما به عنوان وکیل تایید شده است.</p>
                <Link href="/lawyer/dashboard">
                  <Button>رفتن به پنل وکیل</Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        ) : existingStatus === "pending" ? (
          <div className="mt-8 max-w-lg">
            {success && (
              <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
              </div>
            )}
            <Card>
              <CardBody className="flex flex-col items-center gap-4 py-12 text-center">
                <Clock size={48} className="text-amber-500" />
                <h2 className="text-xl font-bold text-neutral-900">درخواست شما در حال بررسی است</h2>
                <p className="text-neutral-600">
                  درخواست وکیل شدن شما ثبت شده و در انتظار تایید مدیر است. پس از تایید، به پنل وکیل دسترسی پیدا خواهید کرد.
                </p>
              </CardBody>
            </Card>
          </div>
        ) : (
          <>
            {existingStatus === "rejected" && (
              <div className="mt-4 flex max-w-lg items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <XCircle size={18} />
                <span>درخواست قبلی شما رد شده است. می‌توانید مجدداً درخواست دهید.</span>
              </div>
            )}

            <div className="mt-8 max-w-lg">
              <Card>
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
                      <label htmlFor="membershipType" className="text-sm font-medium text-neutral-700">
                        نوع عضویت
                      </label>
                      <select
                        id="membershipType"
                        value={membershipType}
                        onChange={(e) => setMembershipType(e.target.value as "bar_association" | "judiciary_center")}
                        className="rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      >
                        <option value="bar_association">کانون وکلای دادگستری</option>
                        <option value="judiciary_center">مرکز وکلای قوه قضاییه</option>
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
                      <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <Button type="submit" size="lg" disabled={submitting}>
                      {submitting ? "در حال ثبت..." : "ثبت درخواست وکیل شدن"}
                    </Button>
                  </form>
                </CardBody>
              </Card>

              <div className="mt-6 rounded-lg bg-primary-50 p-4">
                <h3 className="text-sm font-bold text-primary-800">مزایای حساب وکیل:</h3>
                <ul className="mt-2 flex flex-col gap-1 text-sm text-primary-700">
                  <li>• دسترسی به ابزارهای هوش مصنوعی تخصصی وکلا</li>
                  <li>• مدیریت پرونده‌ها</li>
                  <li>• تحلیل پرونده با AI</li>
                  <li>• تنظیم قرارداد و دادخواست هوشمند</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </RequireRole>
  );
}