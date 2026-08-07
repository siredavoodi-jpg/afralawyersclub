"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, Sparkles, ArrowLeft, Award, User, Phone, CreditCard, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
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

  const stepIndex = step === "info" ? 1 : step === "password" ? 2 : 3;

  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:px-6">
      {/* هدر */}
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-card">
          <Scale size={28} aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">
          عضویت در باشگاه وکلای افرا
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          به جامعه هوشمند وکالت بپیوندید
        </p>
      </div>

      {/* Progress Bar */}
      <div className="my-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-1 items-center">
              <div
                className={
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 " +
                  (n < stepIndex
                    ? "bg-accent text-white"
                    : n === stepIndex
                    ? "bg-primary text-white"
                    : "bg-line text-ink-soft")
                }
              >
                {n}
              </div>
              {n < 3 && (
                <div
                  className={
                    "mx-1 h-0.5 flex-1 rounded-full transition-all duration-300 " +
                    (n < stepIndex ? "bg-accent" : "bg-line")
                  }
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-ink-soft">
          <span>اطلاعات</span>
          <span>رمز عبور</span>
          <span>تایید</span>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-btn border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ═══════════ مرحله ۱: اطلاعات ═══════════ */}
      {step === "info" && (
        <Card hover={false} className="mt-4">
          <CardBody>
            <form onSubmit={submitInfo} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  شما کیستید؟
                </label>
                <div className="space-y-2">
                  <label
                    className={
                      "flex cursor-pointer items-center gap-3 rounded-btn border-2 p-4 transition-all duration-300 " +
                      (accountType === "member"
                        ? "border-primary bg-primary/5 shadow-card"
                        : "border-line bg-surface hover:border-primary/40")
                    }
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="member"
                      checked={accountType === "member"}
                      onChange={(e) =>
                        setAccountType(e.target.value as AccountType)
                      }
                      className="text-primary focus:ring-primary"
                    />
                    <User size={20} className="text-primary" aria-hidden />
                    <div>
                      <p className="font-bold text-ink">
                        علاقمند / دانشجوی حقوق
                      </p>
                      <p className="text-xs text-ink-soft">
                        دسترسی به دوره‌ها و خدمات عمومی
                      </p>
                    </div>
                  </label>

                  <label
                    className={
                      "flex cursor-pointer items-center gap-3 rounded-btn border-2 p-4 transition-all duration-300 " +
                      (accountType === "trainee"
                        ? "border-secondary bg-secondary/5 shadow-card"
                        : "border-line bg-surface hover:border-secondary/40")
                    }
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="trainee"
                      checked={accountType === "trainee"}
                      onChange={(e) =>
                        setAccountType(e.target.value as AccountType)
                      }
                      className="text-secondary focus:ring-secondary"
                    />
                    <Award size={20} className="text-secondary" aria-hidden />
                    <div className="flex-1">
                      <p className="flex items-center gap-2 font-bold text-ink">
                        همکار کارآموز
                      </p>
                      <p className="text-xs text-ink-soft">
                        وکلای پایه یک آینده · تا آزمون اختبار در کنار شما هستیم
                      </p>
                    </div>
                  </label>

                  <label
                    className={
                      "flex cursor-pointer items-center gap-3 rounded-btn border-2 p-4 transition-all duration-300 " +
                      (accountType === "lawyer"
                        ? "border-primary bg-primary/5 shadow-card"
                        : "border-line bg-surface hover:border-primary/40")
                    }
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="lawyer"
                      checked={accountType === "lawyer"}
                      onChange={(e) =>
                        setAccountType(e.target.value as AccountType)
                      }
                      className="text-primary focus:ring-primary"
                    />
                    <UserCheck
                      size={20}
                      className="text-primary"
                      aria-hidden
                    />
                    <div>
                      <p className="font-bold text-ink">وکیل دادگستری</p>
                      <p className="text-xs text-ink-soft">
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
                <div className="rounded-btn border-2 border-secondary/30 bg-secondary/5 p-4">
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-secondary-hover">
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
                  <p className="mt-2 text-xs text-ink-soft">
                    ⚠️ حساب شما پس از بررسی و تایید توسط ادمین فعال خواهد شد.
                  </p>
                </div>
              )}

              {accountType === "lawyer" && (
                <div className="rounded-btn border-2 border-primary/30 bg-primary/5 p-4 space-y-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-primary">
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
                      onChange={(e) => setMembershipType(e.target.value)}
                      className="rounded-btn border border-line bg-surface px-4 py-2.5 text-sm text-ink transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
                    >
                      <option value="">انتخاب کنید...</option>
                      <option value="bar_association">
                        کانون وکلای دادگستری
                      </option>
                      <option value="judiciary_center">
                        مرکز وکلای قوه قضاییه
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="licenseExpiry"
                      className="text-sm font-medium text-ink-soft"
                    >
                      تاریخ انقضای پروانه
                    </label>
                    <input
                      id="licenseExpiry"
                      type="date"
                      value={licenseExpiry}
                      onChange={(e) => setLicenseExpiry(e.target.value)}
                      className="rounded-btn border border-line bg-surface px-4 py-2.5 text-sm text-ink transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                  <p className="text-xs text-ink-soft">
                    ⚠️ حساب شما پس از بررسی و تایید توسط ادمین فعال خواهد شد.
                  </p>
                </div>
              )}

              <label className="flex cursor-pointer items-start gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-line text-primary focus:ring-primary"
                />
                <span>
                  <Link
                    href="/terms"
                    className="font-medium text-primary hover:text-primary-dark hover:underline"
                  >
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
          </CardBody>
        </Card>
      )}

      {/* ═══════════ مرحله ۲: رمز عبور ═══════════ */}
      {step === "password" && (
        <Card hover={false} className="mt-4">
          <CardBody>
            <form onSubmit={submitPassword} className="space-y-5">
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
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "در حال ارسال..." : "ثبت‌نام و دریافت کد تایید"}
              </Button>
              <button
                type="button"
                onClick={() => setStep("info")}
                className="w-full text-center text-sm text-ink-soft transition-colors hover:text-primary"
              >
                بازگشت به مرحله قبل
              </button>
            </form>
          </CardBody>
        </Card>
      )}

      {/* ═══════════ مرحله ۳: OTP ═══════════ */}
      {step === "otp" && (
        <Card hover={false} className="mt-4">
          <CardBody>
            <form onSubmit={verifyOtp} className="space-y-5">
              <div className="rounded-btn border border-accent/30 bg-accent/10 p-4 text-center text-sm text-accent-hover">
                کد تایید به شماره{" "}
                <strong dir="ltr" className="font-en">
                  {phone}
                </strong>{" "}
                ارسال شد.
              </div>
              <Input
                label="کد تایید"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="کد ۵ رقمی"
                dir="ltr"
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "در حال تایید..." : "تایید کد و ورود"}
              </Button>
            </form>
          </CardBody>
        </Card>
      )}

      <p className="mt-6 text-center text-sm text-ink-soft">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link
          href="/login"
          className="font-bold text-primary transition-colors hover:text-primary-dark"
        >
          وارد شوید
        </Link>
      </p>
    </div>
  );
}