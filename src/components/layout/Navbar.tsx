"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getAuthUser, type AuthUser } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/courses", label: "دوره‌ها" },
  { href: "/services", label: "خدمات AI" },
  { href: "/library", label: "کتابخانه" },
  { href: "/library/prompts", label: "بانک پرامپت", highlight: true },
  { href: "/about", label: "درباره ما" },
];

function dashboardHref(role: AuthUser["role"]) {
  if (role === "admin") return "/admin/lawyers";
  if (role === "lawyer") return "/lawyer/dashboard";
  return "/dashboard";
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="باشگاه وکلای افرا - صفحه اصلی">
          <Image
            src="/images/logo.jpg"
            alt="لوگوی باشگاه وکلای افرا"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
            priority
          />
          <span className="font-fa text-lg font-bold text-primary-700">باشگاه وکلای افرا</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  "flex items-center gap-1 text-sm font-medium transition-fast hover:text-primary-600 " +
                  (link.highlight ? "text-primary-600" : "text-neutral-700")
                }
              >
                {link.highlight && <Sparkles size={14} aria-hidden className="text-accent-500" />}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <ButtonLink href={dashboardHref(user.role)} variant="secondary" size="sm">
              داشبورد من
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href="/login" variant="ghost" size="sm">ورود</ButtonLink>
              <ButtonLink href="/register" variant="secondary" size="sm">ثبت‌نام رایگان</ButtonLink>
            </>
          )}
        </div>

        <button
          className="rounded-md p-2 text-neutral-700 lg:hidden"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-neutral-100 bg-white px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    "flex items-center gap-2 text-base font-medium " +
                    (link.highlight ? "text-primary-600" : "text-neutral-700")
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.highlight && <Sparkles size={14} aria-hidden className="text-accent-500" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <ButtonLink href={dashboardHref(user.role)} variant="secondary">داشبورد من</ButtonLink>
            ) : (
              <>
                <ButtonLink href="/login" variant="ghost">ورود</ButtonLink>
                <ButtonLink href="/register" variant="secondary">ثبت‌نام رایگان</ButtonLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}