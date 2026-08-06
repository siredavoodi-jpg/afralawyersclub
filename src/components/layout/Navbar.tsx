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
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* لوگو بزرگ‌تر طبق دستور طراحی */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="باشگاه وکلای افرا - صفحه اصلی"
        >
          <Image
            src="/images/logo.jpg"
            alt="لوگوی باشگاه وکلای افرا"
            width={56}
            height={56}
            className="h-14 w-14 rounded-xl object-contain"
            priority
          />
          <span className="text-lg font-extrabold text-primary">
            باشگاه وکلای افرا
          </span>
        </Link>

        {/* منوی دسکتاپ */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  "group relative flex items-center gap-1 text-sm font-medium transition-all duration-300 ease-out " +
                  "after:absolute after:-bottom-1.5 after:right-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-l after:from-primary after:to-secondary after:transition-all after:duration-300 hover:after:w-full " +
                  (link.highlight
                    ? "text-primary"
                    : "text-ink-soft hover:text-primary")
                }
              >
                {link.highlight && (
                  <Sparkles size={14} aria-hidden className="text-secondary" />
                )}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* دکمه‌های دسکتاپ */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <ButtonLink
              href={dashboardHref(user.role)}
              variant="secondary"
              size="sm"
            >
              داشبورد من
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href="/login" variant="ghost" size="sm">
                ورود
              </ButtonLink>
              <ButtonLink href="/register" variant="secondary" size="sm">
                ثبت‌نام رایگان
              </ButtonLink>
            </>
          )}
        </div>

        {/* دکمه منوی موبایل */}
        <button
          className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-primary-50 hover:text-primary lg:hidden"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* منوی موبایل */}
      {open && (
        <div className="border-t border-line bg-white px-4 py-4 shadow-lg lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    "flex items-center gap-2 text-base font-medium transition-colors " +
                    (link.highlight
                      ? "text-primary"
                      : "text-ink-soft hover:text-primary")
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.highlight && (
                    <Sparkles
                      size={14}
                      aria-hidden
                      className="text-secondary"
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <ButtonLink
                href={dashboardHref(user.role)}
                variant="secondary"
              >
                داشبورد من
              </ButtonLink>
            ) : (
              <>
                <ButtonLink href="/login" variant="ghost">
                  ورود
                </ButtonLink>
                <ButtonLink href="/register" variant="secondary">
                  ثبت‌نام رایگان
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}