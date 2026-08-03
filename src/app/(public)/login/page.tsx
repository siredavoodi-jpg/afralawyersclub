"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // این درخواست کد OTP را از طریق /api/auth/register یا یک endpoint اختصاصی ارسال OTP صادر می‌کند
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) throw new Error();
      setStep("otp");
    } catch {
      setError("ارسال کد با خطا مواجه شد. دوباره تلاش کنید.");
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
      if (!res.ok) throw new Error();
      window.location.href = "/dashboard";
    } catch {
      setError("کد وارد شده صحیح نیست.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900">ورود به حساب کاربری</h1>
      <p className="mt-2 text-sm text-neutral-600">
        {step === "phone" ? "شماره موبایل خود را وارد کنید" : "کد پیامک‌شده را وارد کنید"}
      </p>

      {step === "phone" ? (
        <form onSubmit={requestOtp} className="mt-8 flex flex-col gap-5">
          <Input
            label="شماره موبایل"
            name="phone"
            type="tel"
            placeholder="09xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={error}
            required
          />
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "در حال ارسال..." : "دریافت کد ورود"}
          </Button>
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
            {loading ? "در حال بررسی..." : "ورود"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-neutral-600">
        حساب کاربری ندارید؟{" "}
        <Link href="/register" className="font-medium text-primary-600">
          ثبت‌نام کنید
        </Link>
      </p>
    </section>
  );
}
