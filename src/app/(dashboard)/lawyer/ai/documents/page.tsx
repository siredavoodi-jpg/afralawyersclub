"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  InboxIcon,
  Search,
  FilePlus,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ButtonLink } from "@/components/ui/Button";

const documents = [
  {
    id: "doc1",
    title: "دادخواست مطالبه وجه - نسخه نهایی",
    date: "۱۴۰۴/۰۴/۱۵",
    type: "دادخواست",
  },
  {
    id: "doc2",
    title: "گزارش تحلیل قرارداد اجاره",
    date: "۱۴۰۴/۰۴/۱۰",
    type: "گزارش",
  },
];

export default function LawyerDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {/* هدر */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <FileText size={24} aria-hidden />
          </div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            اسناد تولیدشده
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            دادخواست‌ها، لوایح و گزارش‌های تولیدشده با AI
          </p>
        </div>
        <ButtonLink href="/lawyer/ai/case-analysis" variant="secondary">
          <FilePlus size={16} aria-hidden />
          ایجاد سند جدید
        </ButtonLink>
      </div>

      {/* جستجو */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={18}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft/60"
          aria-hidden
        />
        <Input
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجو در اسناد…"
          className="pr-10"
        />
      </div>

      {/* لیست اسناد */}
      {documents.length === 0 ? (
        <Card hover={false}>
          <CardBody className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
              <InboxIcon size={32} className="text-accent" aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">
              هنوز سندی تولید نکرده‌اید
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              با استفاده از ابزارهای AI، دادخواست و لایحه تولید کنید تا در اینجا
              ذخیره شوند.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {documents.map((d) => (
            <Card key={d.id} className="group">
              <CardBody className="flex items-center gap-4 p-4 sm:p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <FileText size={22} aria-hidden />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-ink group-hover:text-primary sm:text-base">
                    {d.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} aria-hidden />
                      {d.date}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink-soft/30" />
                    <span className="rounded-full bg-base px-2 py-0.5">
                      {d.type}
                    </span>
                  </div>
                </div>

                <button
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-btn border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-bold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary hover:text-white"
                  aria-label={`دانلود ${d.title}`}
                >
                  <Download size={15} aria-hidden />
                  <span className="hidden sm:inline">دانلود</span>
                </button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}