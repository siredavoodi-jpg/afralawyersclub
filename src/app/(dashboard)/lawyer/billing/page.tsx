"use client";

import { useState } from "react";
import {
  CreditCard,
  Download,
  Calendar,
  InboxIcon,
  Wallet,
  Receipt,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const invoices = [
  {
    id: "inv1",
    title: "فاکتور اشتراک Professional",
    period: "تیر ۱۴۰۴",
    amount: "۱,۹۹۰,۰۰۰",
    paid: true,
  },
  {
    id: "inv2",
    title: "فاکتور اشتراک Professional",
    period: "خرداد ۱۴۰۴",
    amount: "۱,۹۹۰,۰۰۰",
    paid: true,
  },
];

export default function BillingPage() {
  const totalPaid = invoices.length;

  return (
    <div>
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <CreditCard size={24} aria-hidden />
        </div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          صورتحساب
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          تاریخچه فاکتورها و پرداخت‌های شما
        </p>
      </div>

      {/* خلاصه وضعیت */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card hover={false}>
          <CardBody className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Wallet size={22} aria-hidden />
            </span>
            <div>
              <p className="font-en text-2xl font-extrabold text-ink">
                {invoices.length.toLocaleString("fa-IR")}
              </p>
              <p className="text-xs text-ink-soft">فاکتور صادرشده</p>
            </div>
          </CardBody>
        </Card>
        <Card hover={false}>
          <CardBody className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Receipt size={22} aria-hidden />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-ink">
                ۳,۹۸۰,۰۰۰ <span className="text-sm font-normal">تومان</span>
              </p>
              <p className="text-xs text-ink-soft">مجموع پرداختی</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* لیست فاکتورها */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">فاکتورهای اخیر</h2>
      </div>

      {invoices.length === 0 ? (
        <Card hover={false}>
          <CardBody className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
              <InboxIcon size={32} className="text-secondary" aria-hidden />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">
              هنوز فاکتوری صادر نشده است
            </h3>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              پس از خرید اشتراک، فاکتورهای شما در اینجا نمایش داده می‌شوند.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {invoices.map((inv) => (
            <Card key={inv.id} className="group">
              <CardBody className="flex items-center gap-4 p-4 sm:p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Receipt size={22} aria-hidden />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-ink group-hover:text-primary sm:text-base">
                    {inv.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} aria-hidden />
                      {inv.period}
                    </span>
                    {inv.paid && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent-hover">
                        پرداخت شده
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <p className="font-en text-sm font-bold text-ink sm:text-base">
                    {inv.amount}{" "}
                    <span className="text-xs font-normal text-ink-soft">
                      تومان
                    </span>
                  </p>
                  <button
                    className="inline-flex items-center gap-1.5 rounded-btn border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                    aria-label={`دانلود فاکتور ${inv.title}`}
                  >
                    <Download size={14} aria-hidden />
                    <span className="hidden sm:inline">دانلود</span>
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}