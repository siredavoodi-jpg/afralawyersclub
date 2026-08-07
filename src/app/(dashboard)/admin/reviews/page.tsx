"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  InboxIcon,
  Loader2,
  Filter,
  Eye,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getAuthToken } from "@/lib/auth-client";
import { RequireRole } from "@/components/auth/RequireRole";
import { StarRating } from "@/components/ui/StarRating";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  reviewedAt: string | null;
  courseId: string | null;
  user: { id: string; name: string; phone: string; role: string };
  reviewer: { name: string } | null;
}

type StatusFilter = "pending" | "approved" | "rejected" | "all";
type TypeFilter = "all" | "site" | "course";

const statusConfig = {
  pending: { label: "در انتظار", tone: "secondary" as const, icon: Clock },
  approved: { label: "تایید شده", tone: "accent" as const, icon: CheckCircle2 },
  rejected: { label: "رد شده", tone: "neutral" as const, icon: XCircle },
};

// نام فارسی دوره‌های استاتیک (با افزودن هر دوره جدید، یک خط اضافه کنید)
const courseTitles: Record<string, string> = {
  "ai-for-lawyers": "آموزش مقدمات هوش مصنوعی",
  c3: "نکات مهم در تخلفات قرارداد الکترونیک وکالت",
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  async function load() {
    setLoading(true);
    const token = getAuthToken();
    try {
      const res = await fetch(
        `/api/admin/reviews?status=${statusFilter}&type=${typeFilter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setReviews(data.reviews ?? []);
      setStats(data.stats ?? { pending: 0, approved: 0, rejected: 0 });
    } catch {}
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [statusFilter, typeFilter]);

  async function act(id: string, action: "approve" | "reject") {
    setActingId(id);
    const token = getAuthToken();
    await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    });
    setActingId(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("آیا از حذف این نظر مطمئن هستید؟")) return;
    setActingId(id);
    const token = getAuthToken();
    await fetch(`/api/admin/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setActingId(null);
    load();
  }

  return (
    <RequireRole allowedRoles={["admin"]} redirectTo="/admin-login">
      <div>
        {/* هدر */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquare size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            مدیریت نظرات
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            بررسی، تایید یا رد نظرات کاربران
          </p>
        </div>

        {/* آمار */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {(["pending", "approved", "rejected"] as const).map((s) => {
            const cfg = statusConfig[s];
            const Icon = cfg.icon;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={
                  "rounded-card border p-4 text-right transition-all duration-300 " +
                  (statusFilter === s
                    ? "border-primary bg-primary/5 shadow-card"
                    : "border-line bg-surface hover:border-primary/40")
                }
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-ink-soft" />
                  <p className="font-en text-2xl font-extrabold text-ink">
                    {stats[s].toLocaleString("fa-IR")}
                  </p>
                </div>
                <p className="mt-1 text-xs text-ink-soft">{cfg.label}</p>
              </button>
            );
          })}
        </div>

        {/* فیلتر نوع */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Filter size={16} className="text-ink-soft" />
          <span className="text-sm text-ink-soft">نوع نظر:</span>
          {(["all", "site", "course"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={
                "rounded-full border px-3 py-1 text-xs font-medium transition-all " +
                (typeFilter === t
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-surface text-ink-soft hover:border-primary/40")
              }
            >
              {t === "all" ? "همه" : t === "site" ? "سایت" : "دوره‌ها"}
            </button>
          ))}
        </div>

        {/* لیست */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          <Card hover={false}>
            <CardBody className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <InboxIcon size={32} className="text-primary" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-ink">نظری یافت نشد</h2>
              <p className="mt-2 max-w-md text-sm text-ink-soft">
                در حال حاضر نظری با این فیلتر وجود ندارد.
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((r) => {
              const cfg = statusConfig[r.status];
              const StatusIcon = cfg.icon;
              return (
                <Card key={r.id} hover={false}>
                  <CardBody className="flex flex-col gap-3">
                    {/* هدر نظر */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                          {r.user.name?.charAt(0) || "؟"}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-ink">
                            {r.user.name}
                          </p>
                          <p className="text-xs text-ink-soft" dir="ltr">
                            {r.user.phone} · {r.user.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge tone={cfg.tone}>
                          <StatusIcon size={12} />
                          {cfg.label}
                        </Badge>
                        <p className="text-xs text-ink-soft">
                          {new Date(r.createdAt).toLocaleDateString("fa-IR")}
                        </p>
                      </div>
                    </div>

                    {/* امتیاز و نوع */}
                    <div className="flex flex-wrap items-center gap-2">
                      <StarRating value={r.rating} readOnly size={14} />
                      <span className="text-xs text-ink-soft">
                        ({r.rating} از ۵)
                      </span>
                      {r.courseId ? (
                        <Badge tone="primary">
                          <Eye size={10} />
                          دوره: {courseTitles[r.courseId] || r.courseId}
                        </Badge>
                      ) : (
                        <Badge tone="neutral">نظر کلی سایت</Badge>
                      )}
                    </div>

                    {/* محتوا */}
                    {r.title && (
                      <p className="text-sm font-bold text-ink">{r.title}</p>
                    )}
                    <p className="rounded-btn bg-base p-3 text-sm leading-7 text-ink-soft">
                      {r.content}
                    </p>

                    {/* دکمه‌های عملیات */}
                    {r.status === "pending" ? (
                      <div className="flex flex-wrap gap-2 border-t border-line pt-3">
                        <Button
                          size="sm"
                          variant="primary"
                          disabled={actingId === r.id}
                          onClick={() => act(r.id, "approve")}
                        >
                          {actingId === r.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          تایید و انتشار
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          disabled={actingId === r.id}
                          onClick={() => act(r.id, "reject")}
                        >
                          <XCircle size={14} />
                          رد
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3">
                        {r.status === "rejected" && (
                          <Button
                            size="sm"
                            variant="primary"
                            disabled={actingId === r.id}
                            onClick={() => act(r.id, "approve")}
                          >
                            <CheckCircle2 size={14} />
                            تایید مجدد
                          </Button>
                        )}
                        {r.status === "approved" && (
                          <Button
                            size="sm"
                            variant="danger"
                            disabled={actingId === r.id}
                            onClick={() => act(r.id, "reject")}
                          >
                            <XCircle size={14} />
                            رد مجدد
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={actingId === r.id}
                          onClick={() => remove(r.id)}
                        >
                          حذف کامل
                        </Button>
                        {r.reviewer && (
                          <span className="mr-auto text-xs text-ink-soft">
                            بررسی توسط: {r.reviewer.name}
                          </span>
                        )}
                      </div>
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </RequireRole>
  );
}