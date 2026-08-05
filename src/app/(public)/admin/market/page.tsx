"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { getAuthToken, getAuthUser } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function AdminMarketPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || user.role !== "admin") {
      setLoading(false);
      return;
    }
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const token = getAuthToken();
      const res = await fetch("/api/market/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: "published" | "rejected") {
    const token = getAuthToken();
    await fetch(`/api/market/listings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchListings();
  }

  const user = typeof window !== "undefined" ? getAuthUser() : null;
  if (user?.role !== "admin") {
    return <div className="p-10 text-center text-red-600">دسترسی فقط برای ادمین</div>;
  }

  if (loading) return <div className="p-10 text-center">در حال بارگذاری...</div>;

  const pending = listings.filter((l) => l.status === "pending");
  const published = listings.filter((l) => l.status === "published");
  const rejected = listings.filter((l) => l.status === "rejected");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900">پنل مدیریت مارکت</h1>
      <div className="mt-6 flex gap-4 text-sm">
        <span className="rounded bg-yellow-100 px-3 py-1 text-yellow-800">در انتظار: {toFa(pending.length)}</span>
        <span className="rounded bg-green-100 px-3 py-1 text-green-800">منتشرشده: {toFa(published.length)}</span>
        <span className="rounded bg-red-100 px-3 py-1 text-red-800">رد شده: {toFa(rejected.length)}</span>
      </div>

      <div className="mt-8 space-y-4">
        {listings.map((l) => (
          <div key={l.id} className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {l.images?.[0] ? (
                <Image src={l.images[0].url} alt={l.title} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-neutral-400">بدون عکس</div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900">{l.title}</h3>
                <span className={
                  "rounded px-2 py-0.5 text-xs " +
                  (l.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                   l.status === "published" ? "bg-green-100 text-green-800" :
                   "bg-red-100 text-red-800")
                }>
                  {l.status === "pending" ? "در انتظار" : l.status === "published" ? "منتشرشده" : "رد شده"}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{l.description}</p>
              <p className="mt-1 text-xs text-neutral-500">{l.category?.name} • {l.price ? `${toFa(l.price)} تومان` : "توافقی"}</p>
            </div>
            {l.status === "pending" && (
              <div className="flex flex-col gap-2">
                <Button onClick={() => updateStatus(l.id, "published")} size="sm" variant="secondary">
                  <CheckCircle size={14} /> تایید
                </Button>
                <Button onClick={() => updateStatus(l.id, "rejected")} size="sm" variant="ghost">
                  <XCircle size={14} /> رد
                </Button>
              </div>
            )}
          </div>
        ))}
        {listings.length === 0 && <p className="py-10 text-center text-neutral-500">هنوز آگهی ثبت نشده است</p>}
      </div>
    </div>
  );
}