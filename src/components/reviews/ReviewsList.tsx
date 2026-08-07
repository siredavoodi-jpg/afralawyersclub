"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string;
  status: string;
  createdAt: string;
  user: { id: string; name: string };
}

interface ReviewsListProps {
  courseId?: string;
  refreshKey?: number;
}

export function ReviewsList({ courseId, refreshKey = 0 }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const url = courseId
          ? `/api/reviews?courseId=${courseId}`
          : `/api/reviews`;
        const res = await fetch(url);
        const data = await res.json();
        setReviews(data.reviews ?? []);
        setAverage(data.average ?? 0);
        setCount(data.count ?? 0);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId, refreshKey]);

  return (
    <div className="flex flex-col gap-4">
      {/* میانگین امتیاز */}
      {count > 0 && (
        <Card hover={false} className="bg-gradient-to-l from-primary/5 to-secondary/5">
          <CardBody className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white">
              <Star size={26} className="fill-white" />
            </div>
            <div>
              <p className="font-en text-2xl font-extrabold text-ink">
                {average.toFixed(1)}
                <span className="text-sm font-normal text-ink-soft"> از ۵</span>
              </p>
              <p className="text-xs text-ink-soft">
                بر اساس {count.toLocaleString("fa-IR")} نظر تایید شده
              </p>
            </div>
            <StarRating value={Math.round(average)} readOnly size={18} className="mr-auto" />
          </CardBody>
        </Card>
      )}

      {/* لیست نظرات */}
      {loading ? (
        <p className="py-8 text-center text-sm text-ink-soft">
          در حال بارگذاری نظرات...
        </p>
      ) : reviews.length === 0 ? (
        <Card hover={false}>
          <CardBody className="flex flex-col items-center gap-3 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <MessageSquare size={26} className="text-primary" />
            </div>
            <p className="text-sm text-ink-soft">
              هنوز نظری ثبت نشده است. اولین نفر باشید!
            </p>
          </CardBody>
        </Card>
      ) : (
        reviews.map((r) => (
          <Card key={r.id} hover={false}>
            <CardBody className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                    {r.user.name?.charAt(0) || "؟"}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{r.user.name}</p>
                    <p className="text-xs text-ink-soft">
                      {new Date(r.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                </div>
                <StarRating value={r.rating} readOnly size={16} />
              </div>
              {r.title && (
                <p className="text-sm font-bold text-ink">{r.title}</p>
              )}
              <p className="text-sm leading-7 text-ink-soft">{r.content}</p>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
}