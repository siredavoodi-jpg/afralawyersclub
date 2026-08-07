"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound, CheckCircle, Phone, ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

type Step = "phone" | "otp" | "newPassword" | "done";

const steps: { key: Step; label: string }[] = [
  { key: "phone", label: "شماره موبایل" },
  { key: "otp", label: "کد تایید" },
  { key: "newPassword", label: "رمز جدید" },
  { key: "done", label: "پایان" },
];

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const currentStepIndex = steps.findIndex((s) => s.key === step);

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
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      {/* هدر */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <KeyRound size={28} className="text-primary" />
        </div>
        <h1 className="text-2xl font-extrabold text-ink">بازیابی رمز عبور</h1>
        <p className="mt-2 text-sm text-ink-soft">
          {step === "phone" && "شماره موبایل خود را وارد کنید تا کد تایید ارسال شود"}
          {step === "otp" && "کد پیامک‌شده را وارد کنید"}
          {step === "newPassword" && "رمز عبور جدید خود را تعیین کنید"}
          {step === "done" && "رمز عبور شما با موفقیت تغییر کرد"}
        </p>
      </div>

      {/* Progress Bar */}
      {step !== "done" && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {steps.slice(0, 3).map((s, i) => (
              <div key={s.key} className="flex flex-1 items-center">
                <div
                  className={
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 " +
                    (i < currentStepIndex
                      ? "bg-accent text-white"
                      : i === currentStepIndex
                      ? "bg-primary text-white"
                      : "bg-line text-ink-soft")
                  }
                >
                  {i < currentStepIndex ? (
                    <CheckCircle size={16} aria-hidden />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 2 && (
                  <div
                    className={
                      "mx-1 h-0.5 flex-1 rounded-full transition-all duration-300 " +
                      (i < currentStepIndex ? "bg-accent" : "bg-line")
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-ink-soft">
            <span>شماره موبایل</span>
            <span>کد تایید</span>
            <span>رمز جدید</span>
          </div>
        </div>
      )}

      <Card hover={false}>
        <CardBody>
          {step === "phone" && (
            <form onSubmit={sendOtp} className="flex flex-col gap-5">
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft/60"
                  aria-hidden
                />
                <Input
                  label="شماره موبایل"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="09xxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
              {error && (
                <p className="rounded-btn border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "در حال ارسال..." : "ارسال کد تایید"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verifyOtp} className="flex flex-col gap-5">
              {message && (
                <div className="rounded-btn border border-accent/30 bg-accent/10 p-3 text-sm text-accent-hover">
                  {message}
                </div>
              )}
              <div className="relative">
                <ShieldCheck
                  size={18}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft/60"
                  aria-hidden
                />
                <Input
                  label="کد تایید"
                  name="otp"
                  inputMode="numeric"
                  placeholder="کد ۵ یا ۶ رقمی"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
              {error && (
                <p className="rounded-btn border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "در حال بررسی..." : "تایید کد"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setError("");
                }}
                className="text-sm text-ink-soft transition-colors hover:text-primary"
              >
                تغییر شماره موبایل
              </button>
            </form>
          )}

          {step === "newPassword" && (
            <form onSubmit={submitNewPassword} className="flex flex-col gap-5">
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft/60"
                  aria-hidden
                />
                <Input
                  label="رمز عبور جدید"
                  name="newPassword"
                  type="password"
                  placeholder="حداقل ۸ کاراکتر شامل عدد و حروف کوچک و بزرگ"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft/60"
                  aria-hidden
                />
                <Input
                  label="تکرار رمز عبور جدید"
                  name="confirmPassword"
                  type="password"
                  placeholder="رمز عبور را دوباره وارد کنید"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
              {error && (
                <p className="rounded-btn border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "در حال ذخیره..." : "ذخیره رمز عبور جدید"}
              </Button>
            </form>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle size={48} className="text-accent" />
              </div>
              <h2 className="text-xl font-extrabold text-ink">
                رمز عبور تغییر کرد
              </h2>
              <p className="text-sm text-ink-soft">
                حالا می‌توانید با رمز عبور جدید وارد حساب کاربری خود شوید.
              </p>
              <Link href="/login" className="mt-2 w-full">
                <Button size="lg" className="w-full">
                  رفتن به صفحه ورود
                  <ArrowLeft size={16} aria-hidden />
                </Button>
              </Link>
            </div>
          )}
        </CardBody>
      </Card>

      <p className="mt-6 text-center text-sm text-ink-soft">
        رمز عبور خود را به خاطر آوردید؟{" "}
        <Link
          href="/login"
          className="font-bold text-primary transition-colors hover:text-primary-dark"
        >
          بازگشت به ورود
        </Link>
      </p>
    </section>
  );
}