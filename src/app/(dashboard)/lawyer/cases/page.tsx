"use client";

import { useState } from "react";
import {
  Briefcase,
  Calendar,
  Plus,
  InboxIcon,
  ChevronLeft,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

const cases = [
  {
    id: "cs1",
    title: "دعوی مطالبه وجه - شرکت الف",
    date: "۱۴۰۴/۰۴/۱۵",
    status: "تکمیل‌شده",
  },
  {
    id: "cs2",
    title: "تحلیل قرارداد اجاره تجاری",
    date: "۱۴۰۴/۰۴/۱۲",
    status: "در حال بررسی",
  },
  {
    id: "cs3",
    title: "دادخواست الزام به تنظیم سند",
    date: "۱۴۰۴/۰۴/۰۸",
    status: "تکمیل‌شده",
  },
];

function statusTone(status: string): "accent" | "secondary" {
  return status === "تکمیل‌شده" ? "accent" : "secondary";
}

export default function CasesPage() {
  return (
    <div>
      {/* هدر */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Briefcase size={24} aria-hidden />
          </div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            پرونده‌های اخیر
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            لیست پرونده‌ها و تحلیل‌های انجام‌شده
          </p>
        </div>
        <ButtonLink href="/lawyer/ai/case-analysis" variant="primary">
          <Plus size={16} aria-hidden />
          تحلیل پرونده جدید
        </ButtonLink>
      </div>

      {/* جدول پرونده‌ها */}
      {cases.length === 0 ? (
        <Card hover={false}>
          <CardBody className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <InboxIcon size={32} className="text-primary" aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">
              هنوز پرونده‌ای ثبت نشده است
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              با استفاده از ابزار تحلیل پرونده، اولین پرونده خود را ثبت کنید.
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* نسخه دسکتاپ: جدول */}
          <div className="hidden overflow-hidden rounded-card border border-line bg-surface shadow-card md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-line bg-base">
                <tr>
                  <th className="px-5 py-3.5 text-right text-xs font-bold uppercase tracking-wide text-ink-soft">
                    عنوان پرونده
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-bold uppercase tracking-wide text-ink-soft">
                    تاریخ
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-bold uppercase tracking-wide text-ink-soft">
                    وضعیت
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-ink-soft">
                    جزئیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {cases.map((c) => (
                  <tr
                    key={c.id}
                    className="transition-colors duration-200 hover:bg-primary/5"
                  >
                    <td className="px-5 py-4 font-medium text-ink">
                      {c.title}
                    </td>
                    <td className="px-5 py-4 text-ink-soft">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} aria-hidden />
                        {c.date}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                    </td>
                    <td className="px-5 py-4 text-left">
                      <button
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:text-primary-dark"
                        aria-label={`مشاهده جزئیات ${c.title}`}
                      >
                        مشاهده
                        <ChevronLeft size={13} aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* نسخه موبایل: کارت */}
          <div className="flex flex-col gap-3 md:hidden">
            {cases.map((c) => (
              <Card key={c.id}>
                <CardBody className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-bold text-ink">{c.title}</h3>
                    <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ink-soft">
                    <Calendar size={12} aria-hidden />
                    {c.date}
                  </div>
                  <button className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-bold text-primary">
                    مشاهده جزئیات
                    <ChevronLeft size={13} aria-hidden />
                  </button>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}