"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Download,
  Bell,
  UserCircle,
  CreditCard,
  MessageSquare,
  LogOut,
  FileSearch,
  FileText,
  ShieldCheck,
  FileStack,
  Briefcase,
  Scale,
  Sparkles,
  Users,
  UserCheck,
  Settings,
  Menu,
  X,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getAuthUser, clearAuthSession, type AuthUser } from "@/lib/auth-client";

type SidebarVariant = "member" | "lawyer" | "admin";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  badge?: string;
}

const memberLinks: NavItem[] = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "دوره‌های من", icon: BookOpen },
  { href: "/dashboard/downloads", label: "دانلودها", icon: Download },
  { href: "/dashboard/notifications", label: "اعلان‌ها", icon: Bell, badge: "۲" },
  { href: "/dashboard/subscription", label: "اشتراک", icon: CreditCard },
  { href: "/dashboard/feedback", label: "بازخورد", icon: MessageSquare },
  { href: "/dashboard/profile", label: "پروفایل", icon: UserCircle },
];

const lawyerLinks: NavItem[] = [
  { href: "/lawyer/dashboard", label: "داشبورد وکیل", icon: LayoutDashboard },
  {
    href: "/lawyer/cases",
    label: "پرونده‌ها و موکلین",
    icon: Briefcase,
  },
  {
    href: "/lawyer/ai/tools",
    label: "ابزارهای AI",
    icon: Sparkles,
  },
  {
    href: "/lawyer/ai/case-analysis",
    label: "تحلیل پرونده",
    icon: FileSearch,
  },
  {
    href: "/lawyer/ai/contract",
    label: "تحلیل قرارداد",
    icon: ShieldCheck,
  },
  {
    href: "/lawyer/ai/documents",
    label: "تولید اسناد",
    icon: FileText,
  },
  {
    href: "/lawyer/billing",
    label: "صورت‌حساب",
    icon: CreditCard,
  },
  {
    href: "/lawyer/license",
    label: "پروانه وکالت",
    icon: Scale,
  },
  {
    href: "/lawyer/subscription",
    label: "اشتراک",
    icon: CreditCard,
  },
];

const adminLinks: NavItem[] = [
  { href: "/admin/lawyers", label: "مدیریت وکلا", icon: Users },
  { href: "/admin/trainees", label: "مدیریت کارآموزان", icon: UserCheck },
  { href: "/admin/reviews", label: "مدیریت نظرات", icon: MessageSquare }, // 🆕 این خط را اضافه کنید
  { href: "/lawyer/dashboard", label: "نمای وکیل", icon: LayoutDashboard },
  { href: "/dashboard", label: "نمای کاربر", icon: UserCircle },
];
const linkMap: Record<SidebarVariant, NavItem[]> = {
  member: memberLinks,
  lawyer: lawyerLinks,
  admin: adminLinks,
};

const variantLabels: Record<SidebarVariant, string> = {
  member: "پنل کاربری",
  lawyer: "پنل وکیل",
  admin: "پنل مدیریت",
};

export function DashboardSidebar({ variant }: { variant: SidebarVariant }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  // بستن drawer با تغییر مسیر
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = linkMap[variant];

  function handleLogout() {
    clearAuthSession();
    window.location.href = "/login";
  }

  const sidebarContent = (
    <aside className="flex h-full w-72 flex-col bg-dashboard-gradient text-white">
      {/* هدر سایدبار */}
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="لوگوی افرا"
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl object-contain ring-2 ring-white/20"
          />
          <div>
            <p className="text-sm font-extrabold leading-tight">
              باشگاه وکلای افرا
            </p>
            <p className="text-[11px] text-primary-100/80">
              {variantLabels[variant]}
            </p>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="بستن منو"
        >
          <X size={20} />
        </button>
      </div>

      {/* منوی اصلی */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" &&
                link.href !== "/lawyer/dashboard" &&
                pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "group flex items-center justify-between gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-white text-primary shadow-card"
                      : "text-primary-100 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} aria-hidden />
                    {link.label}
                  </span>
                  {link.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold",
                        isActive
                          ? "bg-secondary text-white"
                          : "bg-secondary/30 text-white"
                      )}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* کارت کاربر + خروج */}
      <div className="border-t border-white/10 p-4">
        {user && (
          <div className="mb-3 flex items-center gap-3 rounded-btn bg-white/5 p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
              {user.name?.charAt(0) || "؟"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">
                {user.name}
              </p>
              <p className="truncate text-xs text-primary-100/70" dir="ltr">
                {user.phone}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-btn px-3 py-2.5 text-sm font-medium text-primary-100 transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          <LogOut size={16} aria-hidden />
          خروج از حساب
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* دکمه همبرگر برای موبایل */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-btn bg-primary text-white shadow-card-hover lg:hidden"
        aria-label="باز کردن منو"
      >
        <Menu size={20} />
      </button>

      {/* Drawer موبایل */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 lg:hidden">
            {sidebarContent}
          </div>
        </>
      )}

      {/* سایدبار دسکتاپ */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </div>
    </>
  );
}