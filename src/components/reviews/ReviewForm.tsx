"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
import { getAuthToken } from "@/lib/auth-client";

interface ReviewFormProps {
  courseId?: string;
  onSubmitted?: () => void;
}

export function ReviewForm({ courseId, onSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (rating === 0) {
      setError("لطفاً ابتدا امتیاز ستاره‌ای خود را ثبت کنید.");
      return;
    }
    if (!content.trim()) {
      setError("متن نظر الزامی است.");
      return;
    }

    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          title: title.trim() || null,
          content: content.trim(),
          courseId: courseId || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "ثبت نظر با خطا مواجه شد.");
        return;
      }
      setSuccess(true);
      setRating(0);
      setTitle("");
      setContent("");
      onSubmitted?.();
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card hover={false} className="bg-accent/5">
        <CardBody className="flex flex-col items-center gap-3 py-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 size={30} className="text-accent" />
          </div>
          <h3 className="text-base font-bold text-ink">نظر شما ثبت شد!</h3>
          <p className="max-w-md text-sm text-ink-soft">
            نظر شما پس از بررسی و تایید توسط مدیر، برای سایر کاربران نمایش داده
            خواهد شد.
          </p>
          <Button variant="ghost" size="sm" onClick={() => setSuccess(false)}>
            ثبت نظر جدید
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card hover={false}>
      <CardBody>
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquare size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-ink">ثبت نظر و امتیاز</h3>
            <p className="text-xs text-ink-soft">
              {courseId
                ? "تجربه خود از این دوره را به اشتراک بگذارید"
                : "تجربه کلی خود از باشگاه افرا را به اشتراک بگذارید"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* امتیاز ستاره‌ای */}
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-soft">
              امتیاز شما
            </label>
            <div className="flex items-center gap-3">
              <StarRating value={rating} onChange={setRating} size={28} />
              {rating > 0 && (
                <span className="text-sm font-bold text-secondary">
                  {rating} از ۵
                </span>
              )}
            </div>
          </div>

          {/* عنوان (اختیاری) */}
          <Input
            label="عنوان نظر (اختیاری)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: تجربه عالی از دوره"
          />

          {/* متن نظر */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink-soft">متن نظر</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="تجربه خود را بنویسید..."
              className="rounded-btn border border-line bg-surface px-4 py-3 text-sm text-ink transition-all duration-300 placeholder:text-ink-soft/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && (
            <div className="rounded-btn border border-error/30 bg-error/10 p-3 text-sm text-error">
              {error}
            </div>
          )}

          <Button type="submit" size="lg" disabled={loading} className="w-fit">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                در حال ارسال...
              </>
            ) : (
              <>
                <Send size={16} />
                ارسال نظر برای تایید
              </>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}