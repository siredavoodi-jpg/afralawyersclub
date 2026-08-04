"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { clearAuthSession } from "@/lib/auth-client";
import {
  LayoutDashboard,
  User,
  CreditCard,
  BookOpen,
  Download,
  Bell,
  MessageSquare,
  LogOut,
  BadgeCheck,
  Briefcase,
  Sparkles,
  FileStack,
  Receipt,
  Scale,
} from "lucide-react";

const memberLinks = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "پروفایل", icon: User },
  { href: "/dashboard/subscription", label: "اشتراک", icon: CreditCard },
  { href: "/dashboard/courses", label: "دوره‌های من", icon: BookOpen },
  { href: "/dashboard/downloads", label: "دانلودها", icon: Download },
  { href: "/dashboard/notifications", label: "اعلان‌ها", icon: Bell },
  { href: "/dashboard/feedback", label: "ثبت نظر", icon: MessageSquare },
];

const lawyerLinks = [
  { href: "/lawyer/dashboard", label: "داشبورد وکیل", icon: LayoutDashboard },
  { href: "/lawyer/license", label: "اطلاعات پروانه", icon: BadgeCheck },
  { href: "/lawyer/cases", label: "پرونده‌های اخیر", icon: Briefcase },
  { href: "/lawyer/ai/tools", label: "ابزارهای AI", icon: Sparkles },
  { href: "/lawyer/ai/documents", label: "اسناد", icon: FileStack },
  { href: "/lawyer/subscription", label: "اشتراک", icon: CreditCard },
  { href: "/lawyer/billing", label: "صورتحساب", icon: Receipt },
];

export function DashboardSidebar({ variant }: { variant: "member" | "lawyer" }) {
  const pathname = usePathname();
  const router = useRouter();
  const links = variant === "member" ? memberLinks : lawyerLinks;

  function handleLogout() {
    clearAuthSession();
    router.replace("/login");
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-l border-neutral-100 bg-white lg:flex">
      <Link href="/" className="flex items-center gap-2 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
          <Scale size={18} aria-hidden />
        </span>
        <span className="font-fa text-base font-bold text-primary-700">باشگاه وکلای افرا</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-fast",
                active
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <Icon size={18} aria-hidden />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mx-3 mb-5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-error hover:bg-red-50"
        aria-label="خروج از حساب کاربری"
      >
        <LogOut size={18} aria-hidden />
        خروج
      </button>
    </aside>
  );
}