"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { setAuthSession } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShowPasswordRecovery(false);

    if (!phone || !password) {
      setError("لطفاً شماره موبایل و رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // اگر کاربر رمز عبور نداشته باشد (کاربران قدیمی)
        if (data.error === "PASSWORD_NOT_SET") {
          setShowPasswordRecovery(true);
          setError(data.message);
          return;
        }
        setError(data.error || "ورود ناموفق بود.");
        return;
      }

      // ذخیره توکن و اطلاعات کاربر
      setAuthSession(data.token, data.user);

      // هدایت بر اساس نقش کاربر
      const role = data.user?.role;
      if (role === "admin") {
        window.location.href = "/admin/lawyers";
      } else if (role === "lawyer") {
        window.location.href = "/lawyer/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900">ورود به حساب کاربری</h1>
      <p className="mt-2 text-sm text-neutral-600">
        شماره موبایل و رمز عبور خود را وارد کنید
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <Input
          label="شماره موبایل"
          name="phone"
          type="tel"
          placeholder="09xxxxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Input
          label="رمز عبور"
          name="password"
          type="password"
          placeholder="رمز عبور خود را وارد کنید"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {showPasswordRecovery && (
          <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
            <p className="font-medium">برای تعیین رمز عبور جدید:</p>
            <ul className="mt-2 mr-4 list-disc space-y-1">
              <li>با پشتیبانی تماس بگیرید</li>
              <li>
                یا از این لینک استفاده کنید:{" "}
                <Link href="/forgot-password" className="text-primary-600 underline">
                  بازیابی رمز عبور
                </Link>
              </li>
            </ul>
          </div>
        )}

        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "در حال ورود..." : "ورود به حساب کاربری"}
        </Button>
      </form>

      <div className="mt-6 flex flex-col gap-2 text-center text-sm text-neutral-600">
        <Link href="/forgot-password" className="text-primary-600 hover:underline">
          رمز عبور خود را فراموش کرده‌اید؟
        </Link>
        <p>
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="font-medium text-primary-600">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </section>
  );
}