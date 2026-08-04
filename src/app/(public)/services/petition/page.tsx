"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { getAuthToken } from "@/lib/auth-client";

export default function PetitionPage() {
  const [petitionType, setPetitionType] = useState("مطالبه وجه");
  const [plaintiffInfo, setPlaintiffInfo] = useState("");
  const [defendantInfo, setDefendantInfo] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!petitionType || !claim) return;

    const token = getAuthToken();
    if (!token) {
      setError("برای استفاده از این خدمت، ابتدا وارد حساب کاربری خود شوید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ai/petition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          petition_type: petitionType,
          plaintiff_info: plaintiffInfo,
          defendant_info: defendantInfo,
          claim,
          evidence,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد. دوباره تلاش کنید.");
        return;
      }

      const text =
        typeof data.petition === "string" ? data.petition : data.petition?.result ?? JSON.stringify(data.petition);
      setResult(text);
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="تولید دادخواست" subtitle="دادخواست خود را با فرمت استاندارد قضایی تولید کنید" />
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="petition_type" className="text-sm font-medium text-neutral-700">
              نوع دادخواست
            </label>
            <select
              id="petition_type"
              name="petition_type"
              value={petitionType}
              onChange={(e) => setPetitionType(e.target.value)}
              className="rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <option>مطالبه وجه</option>
              <option>الزام به تنظیم سند رسمی</option>
              <option>فسخ قرارداد</option>
              <option>مطالبه خسارت</option>
            </select>
          </div>
          <Input
            label="اطلاعات خواهان"
            name="plaintiff_info"
            placeholder="نام، نام خانوادگی، کد ملی"
            value={plaintiffInfo}
            onChange={(e) => setPlaintiffInfo(e.target.value)}
          />
          <Input
            label="اطلاعات خوانده"
            name="defendant_info"
            placeholder="نام، نام خانوادگی، کد ملی"
            value={defendantInfo}
            onChange={(e) => setDefendantInfo(e.target.value)}
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="claim" className="text-sm font-medium text-neutral-700">خواسته</label>
            <textarea
              id="claim"
              name="claim"
              rows={3}
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              className="rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <Input
            label="دلایل و مستندات"
            name="evidence"
            placeholder="فهرست مستندات، جدا شده با کاما"
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" variant="secondary" size="lg" disabled={loading}>
            {loading ? "در حال تولید..." : "تولید دادخواست"}
          </Button>
        </form>

        <Card>
          <CardBody className="flex flex-col gap-4">
            <h3 className="font-bold text-neutral-900">متن دادخواست</h3>
            <div className="whitespace-pre-wrap rounded-lg bg-neutral-50 p-4 text-sm text-neutral-700">
              {result ?? "متن کامل دادخواست تولید‌شده، قابل ویرایش و دانلود، اینجا نمایش داده می‌شود."}
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}