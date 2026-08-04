"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { setAuthSession } from "@/lib/auth-client";

export default function RegisterPage() {
  const [step, setStep] = useState<"info" | "otp">("info");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitInfo(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (!res.ok) throw new Error();
      setStep("otp");
    } catch {
      setError("ثبت‌نام با خطا مواجه شد. دوباره تلاش کنید.");
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
        {step === "info" ? "اطلاعات خود را وارد کنید" : "کد پیامک‌شده را وارد کنید"}
      </p>

      {step === "info" ? (
        <form onSubmit={submitInfo} className="mt-8 flex flex-col gap-5">
          <Input label="نام و نام خانوادگی" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
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
            {loading ? "در حال ثبت..." : "دریافت کد ورود"}
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