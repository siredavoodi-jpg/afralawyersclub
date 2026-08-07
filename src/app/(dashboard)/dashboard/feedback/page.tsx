"use client";

import { useState } from "react";
import { MessageSquare, Send, Star, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type FeedbackCategory = "suggestion" | "bug" | "question" | "other";

const categories: { value: FeedbackCategory; label: string; icon: any }[] = [
  { value: "suggestion", label: "پیشنهاد ویژگی", icon: Sparkles },
  { value: "bug", label: "گزارش مشکل", icon: MessageSquare },
  { value: "question", label: "سوال", icon: MessageSquare },
  { value: "other", label: "سایر", icon: MessageSquare },
];

export default function FeedbackPage() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<FeedbackCategory>("suggestion");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    // شبیه‌سازی ارسال
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="max-w-xl">
        <Card hover={false}>
          <CardBody className="flex flex-col items-center justify-center py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle size={36} className="text-accent" />
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-ink">
              نظر شما با موفقیت ثبت شد
            </h2>
            <p className="mt-2 max-w-md text-sm leading-7 text-ink-soft">
              از اینکه وقت گذاشتید و بازخورد خود را با ما در میان گذاشتید،
              سپاسگزاریم. نظرات شما به بهبود تجربه کاربری باشگاه افرا کمک
              می‌کند.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setMessage("");
                setRating(0);
              }}
              size="lg"
              variant="secondary"
              className="mt-6"
            >
              ثبت نظر جدید
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <MessageSquare size={24} aria-hidden />
        </div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          ثبت نظر
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          نظرات، پیشنهادات و انتقادات شما به ما کمک می‌کند خدمات بهتری ارائه
          دهیم
        </p>
      </div>

      <Card hover={false}>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* دسته‌بندی */}
            <div>
              <label className="mb-2 block text-sm font-medium text-ink-soft">
                نوع بازخورد
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const isActive = category === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCategory(c.value)}
                      className={
                        "flex flex-col items-center gap-1.5 rounded-btn border-2 px-3 py-3 text-xs font-medium transition-all duration-300 " +
                        (isActive
                          ? "border-primary bg-primary/5 text-primary shadow-card"
                          : "border-line bg-surface text-ink-soft hover:border-primary/40 hover:text-primary")
                      }
                    >
                      <Icon size={16} aria-hidden />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* امتیاز */}
            <div>
              <label className="mb-2 block text-sm font-medium text-ink-soft">
                چقدر از باشگاه افرا راضی هستید؟
              </label>
              <div className="flex items-center gap-1" dir="ltr">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform duration-200 hover:scale-110"
                    aria-label={`${n} ستاره`}
                  >
                    <Star
                      size={28}
                      className={
                        "transition-colors " +
                        (n <= (hoverRating || rating)
                          ? "fill-secondary text-secondary"
                          : "fill-transparent text-ink-soft/30")
                      }
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-3 text-sm font-bold text-ink">
                    {rating} از ۵
                  </span>
                )}
              </div>
            </div>

            {/* متن نظر */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="feedback"
                className="text-sm font-medium text-ink-soft"
              >
                نظر شما
              </label>
              <textarea
                id="feedback"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="نظر، پیشنهاد یا انتقاد خود را بنویسید..."
                className="rounded-btn border border-line bg-surface px-4 py-3 text-sm text-ink transition-all duration-300 placeholder:text-ink-soft/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-fit"
              size="lg"
              disabled={submitting || !message.trim()}
            >
              {submitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  در حال ارسال...
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden />
                  ارسال نظر
                </>
              )}
            </Button>
          </form>
        </CardBody>
      </Card>

      {/* اطلاعات تماس */}
      <div className="mt-6 rounded-card border border-dashed border-line bg-base p-5 text-sm text-ink-soft">
        <p className="leading-7">
          💡 اگر نیاز به پاسخ فوری دارید، می‌توانید از طریق{" "}
          <a
            href="/contact"
            className="font-bold text-primary hover:text-primary-dark"
          >
            فرم تماس با ما
          </a>{" "}
          با تیم پشتیبانی در ارتباط باشید.
        </p>
      </div>
    </div>
  );
}