"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/courses", label: "دوره‌ها" },
  { href: "/services", label: "خدمات AI" },
  { href: "/library", label: "کتابخانه" },
  { href: "/about", label: "درباره ما" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="باشگاه وکلای افرا - صفحه اصلی">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Scale size={18} aria-hidden />
          </span>
          <span className="font-fa text-lg font-bold text-primary-700">باشگاه وکلای افرا</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-medium text-neutral-700 transition-fast hover:text-primary-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">ورود</ButtonLink>
          <ButtonLink href="/register" variant="secondary" size="sm">ثبت‌نام رایگان</ButtonLink>
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
                <Link href={link.href} className="text-base font-medium text-neutral-700" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <ButtonLink href="/login" variant="ghost">ورود</ButtonLink>
            <ButtonLink href="/register" variant="secondary">ثبت‌نام رایگان</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
