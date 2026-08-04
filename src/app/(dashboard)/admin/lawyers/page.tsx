"use client";

import { useEffect, useState } from "react";
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
  user: { id: string; name: string; phone: string; nationalId: string | null; role: string };
}

const statusLabel: Record<string, string> = {
  pending: "در انتظار بررسی",
  verified: "تایید شده",
  rejected: "رد شده",
};

const membershipLabel: Record<string, string> = {
  bar_association: "کانون وکلای دادگستری",
  judiciary_center: "مرکز وکلای قوه قضاییه",
};

export default function AdminLawyersPage() {
  const [lawyers, setLawyers] = useState<LawyerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const token = getAuthToken();
    const res = await fetch("/api/admin/lawyers", { headers: { Authorization: `Bearer ${token}` } });
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
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action }),
    });
    setActingId(null);
    load();
  }

  return (
    <RequireRole allowedRoles={["admin"]} redirectTo="/admin-login">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">تایید هویت وکلا</h1>
        <p className="mt-1 text-neutral-600">بررسی و تایید مدارک وکلا</p>

        <div className="mt-8 flex flex-col gap-4">
          {loading && <p className="text-sm text-neutral-500">در حال بارگذاری...</p>}
          {!loading && lawyers.length === 0 && <p className="text-sm text-neutral-500">درخواستی ثبت نشده است.</p>}
          {lawyers.map((l) => (
            <Card key={l.id}>
              <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-neutral-900">
                    {l.user.name} — {l.user.phone}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">کد ملی: {l.user.nationalId ?? "—"}</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    شماره پروانه: {l.licenseNumber} | {membershipLabel[l.membershipType]}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    تاریخ اعتبار: {new Date(l.licenseExpiry).toLocaleDateString("fa-IR")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={l.verificationStatus === "verified" ? "primary" : l.verificationStatus === "rejected" ? "accent" : "secondary"}>
                    {statusLabel[l.verificationStatus]}
                  </Badge>
                  {l.verificationStatus === "pending" && (
                    <>
                      <Button size="sm" disabled={actingId === l.id} onClick={() => act(l.id, "approve")}>
                        تایید
                      </Button>
                      <Button size="sm" variant="danger" disabled={actingId === l.id} onClick={() => act(l.id, "reject")}>
                        رد
                      </Button>
                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </RequireRole>
  );
}