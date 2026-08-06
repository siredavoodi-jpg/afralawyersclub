"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, Sparkles, ArrowLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { setAuthSession } from "@/lib/auth-client";

type Step = "info" | "password" | "otp";
type AccountType = "member" | "trainee" | "lawyer";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // اطلاعات پایه
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("member");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // اطلاعات کارآموز
  const [traineeLicenseNumber, setTraineeLicenseNumber] = useState("");

  // اطلاعات وکیل
  const [licenseNumber, setLicenseNumber] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");

  // رمز عبور
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP
  const [otp, setOtp] = useState("");

  function validateInfo(): boolean {
    if (!name.trim()) {
      setError("نام و نام خانوادگی الزامی است.");
      return false;
    }
    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل معتبر وارد کنید (مثال: 09123456789).");
      return false;
    }
    if (!/^\d{10}$/.test(nationalId)) {
      setError("کد ملی باید ۱۰ رقم باشد.");
      return false;
    }
    if (accountType === "trainee" && !traineeLicenseNumber.trim()) {
      setError("شماره پروانه کارآموزی الزامی است.");
      return false;
    }
    if (accountType === "lawyer") {
      if (!licenseNumber.trim()) {
        setError("شماره پروانه وکالت الزامی است.");
        return false;
      }
      if (!membershipType) {
        setError("نوع عضویت را انتخاب کنید.");
        return false;
      }
      if (!licenseExpiry) {
        setError("تاریخ انقضای پروانه الزامی است.");
        return false;
      }
    }
    if (!acceptedTerms) {
      setError("پذیرش قوانین و مقررات الزامی است.");
      return false;
    }
    return true;
  }

  function submitInfo(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validateInfo()) return;
    setStep("password");
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("رمز عبور باید شامل حداقل یک عدد باشد.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("رمز عبور باید شامل حداقل یک حرف کوچک انگلیسی باشد.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد.");
      return;
    }
    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          nationalId,
          password,
          acceptedTerms,
          accountType,
          ...(accountType === "trainee" && {
            trainee_license_number: traineeLicenseNumber,
          }),
          ...(accountType === "lawyer" && {
            license_number: licenseNumber,
            membership_type: membershipType,
            license_expiry: licenseExpiry,
          }),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "ثبت‌نام با خطا مواجه شد.");
        return;
      }
      setStep("otp");
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "کد وارد شده صحیح نیست.");
        return;
      }
      setAuthSession(data.token, data.user);
      window.location.href = "/dashboard";
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <Scale size={28} aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-neutral-900">
          عضویت در باشگاه وکلای افرا
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          به جامعه هوشمند وکالت بپیوندید
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {step === "info" && (
        <form onSubmit={submitInfo} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              شما کیستید؟
            </label>
            <div className="mt-2 space-y-2">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-fast ${
                  accountType === "member"
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200 bg-white hover:border-primary-200"
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="member"
                  checked={accountType === "member"}
                  onChange={(e) => setAccountType(e.target.value as AccountType)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <p className="font-bold text-neutral-900">علاقمند / دانشجوی حقوق</p>
                  <p className="text-xs text-neutral-500">
                    دسترسی به دوره‌ها و خدمات عمومی
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-fast ${
                  accountType === "trainee"
                    ? "border-secondary-500 bg-secondary-50"
                    : "border-neutral-200 bg-white hover:border-secondary-200"
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="trainee"
                  checked={accountType === "trainee"}
                  onChange={(e) => setAccountType(e.target.value as AccountType)}
                  className="text-secondary-600 focus:ring-secondary-500"
                />
                <div className="flex-1">
                  <p className="flex items-center gap-2 font-bold text-neutral-900">
                    <Award size={16} className="text-secondary-600" aria-hidden />
                    همکار کارآموز
                  </p>
                  <p className="text-xs text-neutral-500">
                    وکلای پایه یک آینده · تا آزمون اختبار در کنار شما هستیم
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-fast ${
                  accountType === "lawyer"
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200 bg-white hover:border-primary-200"
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="lawyer"
                  checked={accountType === "lawyer"}
                  onChange={(e) => setAccountType(e.target.value as AccountType)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <p className="font-bold text-neutral-900">وکیل دادگستری</p>
                  <p className="text-xs text-neutral-500">
                    دسترسی کامل به ابزارها و خدمات حرفه‌ای
                  </p>
                </div>
              </label>
            </div>
          </div>

          <Input
            label="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: علی محمدی"
          />

          <Input
            label="شماره موبایل"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09123456789"
            dir="ltr"
          />

          <Input
            label="کد ملی"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="۱۰ رقم"
            dir="ltr"
          />

          {accountType === "trainee" && (
            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-secondary-700">
                <Sparkles size={16} aria-hidden />
                اطلاعات کارآموزی
              </p>
              <Input
                label="شماره پروانه کارآموزی"
                value={traineeLicenseNumber}
                onChange={(e) => setTraineeLicenseNumber(e.target.value)}
                placeholder="مثال: 12345"
                dir="ltr"
              />
              <p className="mt-2 text-xs text-neutral-500">
                ⚠️ حساب شما پس از بررسی و تایید توسط ادمین فعال خواهد شد.
              </p>
            </div>
          )}

          {accountType === "lawyer" && (
            <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 space-y-4">
              <p className="flex items-center gap-2 text-sm font-bold text-primary-700">
                <Scale size={16} aria-hidden />
                اطلاعات وکالت
              </p>
              <Input
                label="شماره پروانه وکالت"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="مثال: 12345"
                dir="ltr"
              />
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  نوع عضویت
                </label>
                <select
                  value={membershipType}
                  onChange={(e) => setMembershipType(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  <option value="">انتخاب کنید...</option>
                  <option value="bar_association">کانون وکلای دادگستری</option>
                  <option value="judiciary_center">مرکز وکلای قوه قضاییه</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  تاریخ انقضای پروانه
                </label>
                <input
                  type="date"
                  value={licenseExpiry}
                  onChange={(e) => setLicenseExpiry(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <p className="text-xs text-neutral-500">
                ⚠️ حساب شما پس از بررسی و تایید توسط ادمین فعال خواهد شد.
              </p>
            </div>
          )}

          <label className="flex items-start gap-2 text-sm text-neutral-600">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 text-primary-600 focus:ring-primary-500"
            />
            <span>
              <Link href="/terms" className="text-primary-600 hover:underline">
                قوانین و مقررات
              </Link>{" "}
              باشگاه وکلای افرا را می‌پذیرم.
            </span>
          </label>

          <Button type="submit" variant="primary" className="w-full">
            ادامه
            <ArrowLeft size={16} aria-hidden />
          </Button>
        </form>
      )}

      {step === "password" && (
        <form onSubmit={submitPassword} className="mt-8 space-y-5">
          <Input
            label="رمز عبور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="حداقل ۸ کاراکتر شامل حرف بزرگ، کوچک و عدد"
            dir="ltr"
          />
          <Input
            label="تکرار رمز عبور"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="رمز عبور را دوباره وارد کنید"
            dir="ltr"
          />
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "در حال ارسال..." : "ثبت‌نام و دریافت کد تایید"}
          </Button>
          <button
            type="button"
            onClick={() => setStep("info")}
            className="w-full text-center text-sm text-neutral-500 hover:text-neutral-700"
          >
            بازگشت به مرحله قبل
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={verifyOtp} className="mt-8 space-y-5">
          <div className="rounded-lg bg-accent-50 p-4 text-center text-sm text-accent-700">
            کد تایید به شماره <strong dir="ltr">{phone}</strong> ارسال شد.
          </div>
          <Input
            label="کد تایید"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="کد ۵ رقمی"
            dir="ltr"
          />
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "در حال تایید..." : "تایید کد و ورود"}
          </Button>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-neutral-600">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
          وارد شوید
        </Link>
      </p>
    </div>
  );
}