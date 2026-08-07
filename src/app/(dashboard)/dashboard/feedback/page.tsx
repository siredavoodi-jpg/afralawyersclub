"use client";

import { useState } from "react";
import { MessageSquare, Star, Filter } from "lucide-react";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { Card, CardBody } from "@/components/ui/Card";

type FeedbackView = "site" | "course";

export default function FeedbackPage() {
  const [view, setView] = useState<FeedbackView>("site");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="mx-auto max-w-3xl">
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <MessageSquare size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          نظرات و امتیازها
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          تجربه خود از باشگاه افرا و دوره‌ها را با دیگران به اشتراک بگذارید
        </p>
      </div>

      {/* تب‌های نمایش */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setView("site")}
          className={
            "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 " +
            (view === "site"
              ? "border-primary bg-primary text-white shadow-card"
              : "border-line bg-surface text-ink-soft hover:border-primary/40")
          }
        >
          <Star size={14} />
          تجربه کلی از سایت
        </button>
        <button
          onClick={() => setView("course")}
          className={
            "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 " +
            (view === "course"
              ? "border-primary bg-primary text-white shadow-card"
              : "border-line bg-surface text-ink-soft hover:border-primary/40")
          }
        >
          <Filter size={14} />
          نظرات دوره‌ها
        </button>
      </div>

      {/* فرم ثبت نظر */}
      <div className="mb-8">
        <ReviewForm
          courseId={undefined}
          onSubmitted={() => setRefreshKey((k) => k + 1)}
        />
      </div>

      {/* لیست نظرات */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-ink">
          {view === "site" ? "نظرات کاربران درباره سایت" : "نظرات دوره‌ها"}
        </h2>
        <ReviewsList
          courseId={view === "site" ? "site" : undefined}
          refreshKey={refreshKey}
        />
      </div>
    </div>
  );
}