"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { KeyRound, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"phone" | "otp" | "newPassword" | "done">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // مرحله ۱: ارسال کد به موبایل
  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(phone)) {
      setError("شماره موبایل باید ۱۰ رقم باشد.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد.");
        return;
      }
      setMessage(data.message || "کد تایید ارسال شد.");
      setStep("otp");
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  // مرحله ۲: تایید کد OTP
  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!/^\d{5,6}$/.test(otp)) {
      setError("کد تایید باید ۵ یا ۶ رقم باشد.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "کد نامعتبر است.");
        return;
      }
      setTempToken(data.tempToken);
      setMessage("");
      setStep("newPassword");
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  // مرحله ۳: تنظیم رمز جدید
  async function submitNewPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setError("رمز عبور باید شامل حداقل یک عدد باشد.");
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      setError("رمز عبور باید شامل حداقل یک حرف کوچک انگلیسی باشد.");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setError("رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempToken, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد.");
        return;
      }
      setStep("done");
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
          <KeyRound size={28} className="text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">بازیابی رمز عبور</h1>
        <p className="mt-2 text-sm text-neutral-600">
          {step === "phone" && "شماره موبایل خود را وارد کنید تا کد تایید ارسال شود"}
          {step === "otp" && "کد پیامک‌شده را وارد کنید"}
          {step === "newPassword" && "رمز عبور جدید خود را تعیین کنید"}
          {step === "done" && "رمز عبور شما با موفقیت تغییر کرد"}
        </p>
      </div>

      <Card>
        <CardBody>
          {step === "phone" && (
            <form onSubmit={sendOtp} className="flex flex-col gap-5">
              <Input
                label="شماره موبایل"
                name="phone"
                type="tel"
                inputMode="numeric"
                placeholder="09xxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "در حال ارسال..." : "ارسال کد تایید"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verifyOtp} className="flex flex-col gap-5">
              {message && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  {message}
                </div>
              )}
              <Input
                label="کد تایید"
                name="otp"
                inputMode="numeric"
                placeholder="کد ۵ یا ۶ رقمی"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "در حال بررسی..." : "تایید کد"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setError("");
                }}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                تغییر شماره موبایل
              </button>
            </form>
          )}

           {step === "newPassword" && (
            <form onSubmit={submitNewPassword} className="flex flex-col gap-5">
              <Input
                label="رمز عبور جدید"
                name="newPassword"
                type="password"
                placeholder="حداقل ۸ کاراکتر شامل عدد و حروف کوچک و بزرگ"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                label="تکرار رمز عبور جدید"
                name="confirmPassword"
                type="password"
                placeholder="رمز عبور را دوباره وارد کنید"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "در حال ذخیره..." : "ذخیره رمز عبور جدید"}
              </Button>
            </form>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <CheckCircle size={56} className="text-green-500" />
              <h2 className="text-lg font-bold text-neutral-900">رمز عبور تغییر کرد</h2>
              <p className="text-sm text-neutral-600">
                حالا می‌توانید با رمز عبور جدید وارد حساب کاربری خود شوید.
              </p>
              <Link href="/login" className="w-full">
                <Button size="lg" className="w-full">
                  رفتن به صفحه ورود
                </Button>
              </Link>
            </div>
          )}
        </CardBody>
      </Card>

      <p className="mt-6 text-center text-sm text-neutral-600">
        رمز عبور خود را به خاطر آوردید؟{" "}
        <Link href="/login" className="font-medium text-primary-600">
          بازگشت به ورود
        </Link>
      </p>
    </section>
  );
}