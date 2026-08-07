"use client";

import { useState } from "react";
import {
  Bell,
  BellRing,
  CheckCheck,
  Sparkles,
  CreditCard,
  MessageSquare,
  InboxIcon,
  Check,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type NotificationType = "subscription" | "course" | "message" | "system";

interface Notification {
  id: string;
  title: string;
  description?: string;
  time: string;
  unread: boolean;
  type: NotificationType;
}

const typeConfig: Record<
  NotificationType,
  { icon: any; accent: "primary" | "secondary" | "accent" }
> = {
  subscription: { icon: CreditCard, accent: "secondary" },
  course: { icon: Sparkles, accent: "primary" },
  message: { icon: MessageSquare, accent: "accent" },
  system: { icon: Bell, accent: "primary" },
};

const accentStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "اشتراک شما تا ۵ روز دیگر منقضی می‌شود",
    description: "برای تمدید اشتراک و ادامه دسترسی به خدمات، اقدام کنید.",
    time: "۲ ساعت پیش",
    unread: true,
    type: "subscription",
  },
  {
    id: "n2",
    title: "دوره جدید «تحلیل قرارداد» منتشر شد",
    description: "با ثبت‌نام در این دوره، مهارت تحلیل قرارداد را بیاموزید.",
    time: "دیروز",
    unread: true,
    type: "course",
  },
  {
    id: "n3",
    title: "پیام شما با موفقیت ثبت شد",
    description: "تیم پشتیبانی در اسرع وقت به پیام شما پاسخ خواهد داد.",
    time: "۳ روز پیش",
    unread: false,
    type: "message",
  },
];

type Filter = "all" | "unread" | "read";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<Filter>("all");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return n.unread;
    if (filter === "read") return !n.unread;
    return true;
  });

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  const filters: { value: Filter; label: string; count?: number }[] = [
    { value: "all", label: "همه", count: notifications.length },
    { value: "unread", label: "خوانده‌نشده", count: unreadCount },
    { value: "read", label: "خوانده‌شده" },
  ];

  return (
    <div>
      {/* هدر */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <BellRing size={24} aria-hidden />
          </div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            اعلان‌ها
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            آخرین به‌روزرسانی‌ها و اطلاعیه‌های باشگاه افرا
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllAsRead}>
            <CheckCheck size={16} aria-hidden />
            علامت‌گذاری همه به عنوان خوانده‌شده
          </Button>
        )}
      </div>

      {/* فیلترها */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={
              "flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 " +
              (filter === f.value
                ? "border-primary bg-primary text-white shadow-card"
                : "border-line bg-surface text-ink-soft hover:border-primary/40 hover:text-primary")
            }
          >
            {f.label}
            {f.count !== undefined && (
              <span
                className={
                  "rounded-full px-2 py-0.5 text-xs font-bold " +
                  (filter === f.value ? "bg-white/20" : "bg-base")
                }
              >
                {f.count.toLocaleString("fa-IR")}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* لیست اعلان‌ها */}
      {filtered.length === 0 ? (
        <Card hover={false}>
          <CardBody className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <InboxIcon size={32} className="text-primary" aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">
              اعلانی برای نمایش وجود ندارد
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              {filter === "unread"
                ? "همه اعلان‌های شما خوانده شده‌اند. 🎉"
                : "اعلان‌های جدید در اینجا نمایش داده خواهند شد."}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((n) => {
            const config = typeConfig[n.type];
            const Icon = config.icon;
            return (
              <Card
                key={n.id}
                className={n.unread ? "border-primary/30 bg-primary-50/40" : ""}
              >
                <CardBody className="flex items-start gap-4 p-4 sm:p-5">
                  <span
                    className={
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl " +
                      accentStyles[config.accent]
                    }
                  >
                    <Icon size={20} aria-hidden />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={
                          "text-sm font-bold sm:text-base " +
                          (n.unread ? "text-ink" : "text-ink-soft")
                        }
                      >
                        {n.title}
                      </h3>
                      {n.unread && (
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-secondary" />
                          <Badge tone="secondary">جدید</Badge>
                        </span>
                      )}
                    </div>
                    {n.description && (
                      <p className="mt-1 text-xs leading-5 text-ink-soft sm:text-sm">
                        {n.description}
                      </p>
                    )}
                    <p className="mt-1.5 text-xs text-ink-soft/60">{n.time}</p>
                  </div>

                  {n.unread && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-btn border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition-all duration-300 hover:border-primary/40 hover:text-primary"
                      aria-label="علامت به عنوان خوانده‌شده"
                    >
                      <Check size={14} aria-hidden />
                      <span className="hidden sm:inline">خواندم</span>
                    </button>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}