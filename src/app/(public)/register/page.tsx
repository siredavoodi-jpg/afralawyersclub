"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { setAuthSession } from "@/lib/auth-client";

export default function RegisterPage() {
  const [step, setStep] = useState<"info" | "password" | "otp">("info");
  const [accountType, setAccountType] = useState<"member" | "lawyer">("member");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [membershipType, setMembershipType] = useState<"bar_association" | "judiciary_center">("bar_association");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function validateInfoAndProceed(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("برای ثبت‌نام باید قوانین و مقررات را بپذیرید.");
      return;
    }
    
    if (!/^\d{10}$/.test(nationalId)) {
      setError("کد ملی باید ۱۰ رقم باشد.");
      return;
    }
    
    if (accountType === "lawyer") {
      if (!licenseNumber || !membershipType || !licenseExpiry) {
        setError("لطفاً تمامی اطلاعات مربوط به پروانه وکالت را تکمیل کنید.");
        return;
      }
    }

    setStep("password");
  }

  async function submitAllInfo(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // اعتبارسنجی رمز عبور قوی
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
      if (!res.ok) throw new Error();

      setAuthSession(data.token, data.user);
      window.location.href = "/dashboard";
    } catch {
      setError("کد وارد شده صحیح نیست.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900">ثبت‌نام رایگان</h1>
      <p className="mt-2 text-sm text-neutral-600">
        {step === "info" ? "اطلاعات خود را وارد کنید" : 
         step === "password" ? "یک رمز عبور قوی انتخاب کنید" : 
         "کد پیامک‌شده را وارد کنید"}
      </p>

      {step === "info" ? (
        <form onSubmit={validateInfoAndProceed} className="mt-8 flex flex-col gap-5">
          <div className="flex rounded-lg border border-neutral-300 p-1">
            <button
              type="button"
              onClick={() => setAccountType("member")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-fast ${
                accountType === "member" ? "bg-primary-600 text-white" : "text-neutral-600"
              }`}
            >
              کاربر عادی
            </button>
            <button
              type="button"
              onClick={() => setAccountType("lawyer")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-fast ${
                accountType === "lawyer" ? "bg-primary-600 text-white" : "text-neutral-600"
              }`}
            >
              وکیل
            </button>
          </div>

          <Input label="نام و نام خانوادگی" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label="کد ملی"
            name="nationalId"
            inputMode="numeric"
            placeholder="۱۰ رقم"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            required
          />
          <Input
            label="شماره موبایل"
            name="phone"
            type="tel"
            placeholder="09xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {accountType === "lawyer" && (
            <>
              <Input
                label="شماره پروانه"
                name="license_number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="membership_type" className="text-sm font-medium text-neutral-700">
                  نوع عضویت
                </label>
                <select
                  id="membership_type"
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
                name="license_expiry"
                type="date"
                value={licenseExpiry}
                onChange={(e) => setLicenseExpiry(e.target.value)}
                required
              />
            </>
          )}

          <label className="flex items-start gap-2.5 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <span>
              با وارد کردن دکمه ثبت‌نام، تمامی{" "}
              <Link href="/terms" className="text-primary-600 underline">
                قوانین و مقررات
              </Link>{" "}
              را می‌پذیرم.
            </span>
          </label>

          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "در حال بررسی..." : "مرحله بعد (تعیین رمز عبور)"}
          </Button>
        </form>
      ) : step === "password" ? (
        <form onSubmit={submitAllInfo} className="mt-8 flex flex-col gap-5">
          <Input
            label="رمز عبور"
            name="password"
            type="password"
            placeholder="حداقل ۸ کاراکتر شامل عدد و حروف کوچک و بزرگ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="تکرار رمز عبور"
            name="confirmPassword"
            type="password"
            placeholder="تکرار رمز عبور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex gap-3">
            <Button type="button" variant="ghost" size="lg" onClick={() => setStep("info")}>
              بازگشت
            </Button>
            <Button type="submit" size="lg" disabled={loading} className="flex-1">
              {loading ? "در حال ثبت..." : "ثبت‌نام و دریافت کد تایید"}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="mt-8 flex flex-col gap-5">
          <Input
            label="کد تایید"
            name="otp"
            inputMode="numeric"
            placeholder="۶ رقم"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={error}
            required
          />
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "در حال بررسی..." : "تایید و ورود"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-neutral-600">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="font-medium text-primary-600">
          ورود
        </Link>
      </p>
    </section>
  );
}