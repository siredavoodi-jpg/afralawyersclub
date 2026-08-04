"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Circle, Clock, Lock } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { getChapter } from "@/lib/course";
import { getProgress, chapterProgressPercent } from "@/lib/course/storage";
import { getAuthUser, type AuthUser } from "@/lib/auth-client";

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function ChapterPage() {
  const params = useParams();
  const chapterId = Number(params.chapterId);
  const chapter = getChapter(chapterId);

  const [user, setUser] = useState<AuthUser | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setUser(getAuthUser());
    setProgress(getProgress());
  }, []);

  if (!chapter || !chapter.isActive) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-900">این فصل هنوز منتشر نشده است</h1>
        <p className="mt-3 text-neutral-600">فصل‌های بعدی به‌زودی اضافه می‌شوند. منتظر پیام بروزرسانی باشید!</p>
        <div className="mt-6">
          <ButtonLink href="/courses/ai-for-lawyers" variant="secondary">بازگشت به دوره</ButtonLink>
        </div>
      </section>
    );
  }

  const doneCount = chapter.lessons.filter((l) => progress[String(l.id)]).length;
  const pct = chapterProgressPercent(doneCount, chapter.lessons.length);
  const needsAuth = !chapter.isFree && !user;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link href="/courses/ai-for-lawyers" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700">
        <ArrowRight size={16} aria-hidden />
        بازگشت به دوره
      </Link>

      <p className="text-sm text-primary-600">فصل {toFa(chapter.id)}</p>
      <h1 className="mt-1 text-2xl font-bold text-neutral-900">{chapter.title}</h1>
      <p className="mt-2 text-neutral-600">{chapter.description}</p>

      <div className="mt-6">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between text-sm text-neutral-600">
              <span>پیشرفت فصل</span>
              <span>{toFa(doneCount)} از {toFa(chapter.lessons.length)} درس — {toFa(pct)}٪</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-accent-500 transition-all" style={{ width: pct + "%" }} />
            </div>
          </CardBody>
        </Card>
      </div>

      {needsAuth ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-xl border border-dashed border-primary-300 bg-primary-50 p-8 text-center">
          <Lock size={32} className="text-primary-600" aria-hidden />
          <p className="font-bold text-neutral-900">این فصل مخصوص اعضای باشگاه است</p>
          <p className="text-sm text-neutral-600">برای دسترسی به این فصل و سایر خدمات، عضو شوید یا وارد شوید.</p>
          <div className="flex gap-3">
            <ButtonLink href="/register" variant="secondary">ثبت‌نام رایگان</ButtonLink>
            <ButtonLink href="/login" variant="ghost">ورود</ButtonLink>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {chapter.lessons.map((l, i) => {
            const done = !!progress[String(l.id)];
            return (
              <Link key={l.id} href={`/courses/ai-for-lawyers/chapter/${chapter.id}/lesson/${l.id}`} className="block transition-fast hover:-translate-y-0.5">
                <Card>
                  <CardBody className="flex items-center gap-4">
                    {done ? (
                      <CheckCircle2 size={22} className="shrink-0 text-accent-500" aria-hidden />
                    ) : (
                      <Circle size={22} className="shrink-0 text-neutral-300" aria-hidden />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {toFa(i + 1)}. {l.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                        <Clock size={13} aria-hidden />
                        {l.readingTime}
                        <span>•</span>
                        <span>{l.difficulty}</span>
                      </div>
                    </div>
                    <BookOpen size={18} className="shrink-0 text-primary-500" aria-hidden />
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}