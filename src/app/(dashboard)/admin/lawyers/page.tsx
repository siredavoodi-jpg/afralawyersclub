"use client";

import { useEffect, useState } from "react";
import {
  Users,
  BadgeCheck,
  Clock,
  XCircle,
  CheckCircle2,
  Phone,
  CreditCard,
  Calendar,
  Scale,
  InboxIcon,
  Loader2,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getAuthToken } from "@/lib/auth-client";
import { RequireRole } from "@/components/auth/RequireRole";

interface LawyerRow {
  id: string;
  licenseNumber: string;
  membershipType: "bar_association" | "judiciary_center";
  licenseExpiry: string;
  verificationStatus: "pending" | "verified" | "rejected";
  user: {
    id: string;
    name: string;
    phone: string;
    nationalId: string | null;
    role: string;
  };
}

const statusConfig: Record<
  string,
  { label: string; tone: "accent" | "secondary" | "neutral"; icon: any }
> = {
  pending: {
    label: "در انتظار بررسی",
    tone: "secondary",
    icon: Clock,
  },
  verified: {
    label: "تایید شده",
    tone: "accent",
    icon: BadgeCheck,
  },
  rejected: {
    label: "رد شده",
    tone: "neutral",
    icon: XCircle,
  },
};

const membershipLabel: Record<string, string> = {
  bar_association: "کانون وکلای دادگستری",
  judiciary_center: "مرکز وکلای قوه قضاییه",
};

export default function AdminLawyersPage() {
  const [lawyers, setLawyers] = useState<LawyerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");

  async function load() {
    setLoading(true);
    const token = getAuthToken();
    const res = await fetch("/api/admin/lawyers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setLawyers(data.lawyers ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function act(id: string, action: "approve" | "reject") {
    setActingId(id);
    const token = getAuthToken();
    await fetch(`/api/admin/lawyers/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    });
    setActingId(null);
    load();
  }

  const filtered = lawyers.filter(
    (l) => filter === "all" || l.verificationStatus === filter
  );

  const counts = {
    all: lawyers.length,
    pending: lawyers.filter((l) => l.verificationStatus === "pending").length,
    verified: lawyers.filter((l) => l.verificationStatus === "verified").length,
    rejected: lawyers.filter((l) => l.verificationStatus === "rejected").length,
  };

  const filters: { value: typeof filter; label: string; count: number }[] = [
    { value: "all", label: "همه", count: counts.all },
    { value: "pending", label: "در انتظار", count: counts.pending },
    { value: "verified", label: "تایید شده", count: counts.verified },
    { value: "rejected", label: "رد شده", count: counts.rejected },
  ];

  return (
    <RequireRole allowedRoles={["admin"]} redirectTo="/admin-login">
      <div>
        {/* هدر */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users size={24} aria-hidden />
          </div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            تایید هویت وکلا
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            بررسی و تایید مدارک وکلا
          </p>
        </div>

        {/* آمار */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={
                "rounded-card border p-4 text-right transition-all duration-300 " +
                (filter === f.value
                  ? "border-primary bg-primary/5 shadow-card"
                  : "border-line bg-surface hover:border-primary/40")
              }
            >
              <p className="font-en text-2xl font-extrabold text-ink">
                {f.count.toLocaleString("fa-IR")}
              </p>
              <p className="mt-1 text-xs text-ink-soft">{f.label}</p>
            </button>
          ))}
        </div>

        {/* لیست */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <Card hover={false}>
            <CardBody className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <InboxIcon size={32} className="text-primary" aria-hidden />
              </div>
              <h2 className="mt-4 text-lg font-bold text-ink">
                درخواستی ثبت نشده است
              </h2>
              <p className="mt-2 max-w-md text-sm text-ink-soft">
                {filter === "all"
                  ? "هنوز هیچ وکیلی درخواست تایید ثبت نکرده است."
                  : `درخواستی با وضعیت "${filters.find((f) => f.value === filter)?.label}" وجود ندارد.`}
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((l) => {
              const status = statusConfig[l.verificationStatus];
              const StatusIcon = status.icon;
              return (
                <Card key={l.id} hover={false}>
                  <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-ink">
                          {l.user.name}
                        </h3>
                        <Badge tone={status.tone}>
                          <StatusIcon size={12} aria-hidden />
                          {status.label}
                        </Badge>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-ink-soft sm:grid-cols-2">
                        <span className="flex items-center gap-2">
                          <Phone size={14} className="shrink-0 text-primary" aria-hidden />
                          <span dir="ltr">{l.user.phone}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <CreditCard size={14} className="shrink-0 text-primary" aria-hidden />
                          کد ملی:{" "}
                          <span dir="ltr">{l.user.nationalId ?? "—"}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <Scale size={14} className="shrink-0 text-primary" aria-hidden />
                          پروانه:{" "}
                          <span dir="ltr">{l.licenseNumber}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <Users size={14} className="shrink-0 text-primary" aria-hidden />
                          {membershipLabel[l.membershipType]}
                        </span>
                        <span className="flex items-center gap-2 sm:col-span-2">
                          <Calendar size={14} className="shrink-0 text-primary" aria-hidden />
                          تاریخ اعتبار:{" "}
                          {new Date(l.licenseExpiry).toLocaleDateString(
                            "fa-IR"
                          )}
                        </span>
                      </div>
                    </div>

                    {l.verificationStatus === "pending" && (
                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                        <Button
                          size="sm"
                          variant="primary"
                          disabled={actingId === l.id}
                          onClick={() => act(l.id, "approve")}
                        >
                          {actingId === l.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={14} aria-hidden />
                          )}
                          تایید
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          disabled={actingId === l.id}
                          onClick={() => act(l.id, "reject")}
                        >
                          رد
                        </Button>
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