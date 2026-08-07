"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewsList } from "@/components/reviews/ReviewsList";

interface CourseReviewsProps {
  courseId: string;
}

export function CourseReviews({ courseId }: CourseReviewsProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <Star size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-ink">نظرات این دوره</h2>
          <p className="text-sm text-ink-soft">
            تجربه خود از این دوره را با دیگران به اشتراک بگذارید
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* فرم ثبت نظر برای این دوره */}
        <ReviewForm
          courseId={courseId}
          onSubmitted={() => setRefreshKey((k) => k + 1)}
        />

        {/* لیست نظرات این دوره */}
        <div>
          <ReviewsList courseId={courseId} refreshKey={refreshKey} />
        </div>
      </div>
    </section>
  );
}