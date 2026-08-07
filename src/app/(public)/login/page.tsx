"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Phone, ArrowLeft, LogIn } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { setAuthSession } from "@/lib/auth-client";

export default function LoginPage() {
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
        if (data.error === "PASSWORD_NOT_SET") {
          setShowPasswordRecovery(true);
          setError(data.message);
          return;
        }
        setError(data.error || "ورود ناموفق بود.");
        return;
      }

      setAuthSession(data.token, data.user);

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
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      {/* هدر */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <LogIn size={28} className="text-primary" />
        </div>
        <h1 className="text-2xl font-extrabold text-ink">ورود به حساب کاربری</h1>
        <p className="mt-2 text-sm text-ink-soft">
          شماره موبایل و رمز عبور خود را وارد کنید
        </p>
      </div>

      <Card hover={false}>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                placeholder="09xxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                label="رمز عبور"
                name="password"
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
            </div>

            {error && (
              <div className="rounded-btn border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {showPasswordRecovery && (
              <div className="rounded-btn border border-secondary/30 bg-secondary/10 p-4 text-sm text-secondary-hover">
                <p className="font-bold">برای تعیین رمز عبور جدید:</p>
                <ul className="mt-2 mr-4 list-disc space-y-1">
                  <li>با پشتیبانی تماس بگیرید</li>
                  <li>
                    یا از این لینک استفاده کنید:{" "}
                    <Link
                      href="/forgot-password"
                      className="font-bold text-secondary underline hover:text-secondary-hover"
                    >
                      بازیابی رمز عبور
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <Button type="submit" size="lg" disabled={loading} className="w-full">
              {loading ? "در حال ورود..." : "ورود به حساب کاربری"}
            </Button>
          </form>

          <div className="mt-6 flex flex-col gap-2 border-t border-line pt-6 text-center text-sm text-ink-soft">
            <Link
              href="/forgot-password"
              className="text-primary transition-colors hover:text-primary-dark"
            >
              رمز عبور خود را فراموش کرده‌اید؟
            </Link>
            <p>
              حساب کاربری ندارید؟{" "}
              <Link
                href="/register"
                className="font-bold text-primary hover:text-primary-dark"
              >
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}