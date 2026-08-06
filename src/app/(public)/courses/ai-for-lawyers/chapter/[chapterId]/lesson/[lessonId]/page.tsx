"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2, Lock, Search, StickyNote } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getChapter, getLesson } from "@/lib/course";
import { isLessonDone, markLessonDone, getNote, saveNote } from "@/lib/course/storage";
import { getAuthUser, type AuthUser } from "@/lib/auth-client";

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const ICONS: Record<string, string> = {
  brain: "🧠", layers: "🗂", sparkles: "✦", "book-text":  "📖",
  "graduation-cap": "🎓", cpu: "⚙", search: "🔎", scale: "⚖",
  list: "📋", flag: "🏁",
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, term }: { text: string; term: string }) {
  const t = term.trim();
  if (!t) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(t)})`, "g"));
  return (
    <>
      {parts.map((p, i) =>
        p === t ? (
          <mark key={i} className="rounded bg-secondary-200 px-0.5 text-neutral-900">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function LessonPage() {
  const params = useParams();
  const chapterId = Number(params.chapterId);
  const lessonId = Number(params.lessonId);
  const chapter = getChapter(chapterId);
  const lesson = getLesson(chapterId, lessonId);

  const [user, setUser] = useState<AuthUser | null>(null);
  const [done, setDone] = useState(false);
  const [term, setTerm] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setUser(getAuthUser());
    if (lesson) {
      setDone(isLessonDone(lesson.id));
      setNote(getNote(lesson.id));
    }
  }, [lesson]);

  if (!chapter || !lesson) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-900">درس یافت نشد</h1>
        <div className="mt-6">
          <ButtonLink href="/courses/ai-for-lawyers" variant="secondary">بازگشت به دوره</ButtonLink>
        </div>
      </section>
    );
  }

  const needsAuth = !chapter.isFree && !user;
  const idx = chapter.lessons.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? chapter.lessons[idx - 1] : null;
  const next = idx < chapter.lessons.length - 1 ? chapter.lessons[idx + 1] : null;

  function handleDone() {
    if (!lesson) return;
    markLessonDone(lesson.id);
    setDone(true);
  }

  function handleSaveNote() {
    if (!lesson) return;
    saveNote(lesson.id, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  if (needsAuth) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <Lock size={40} className="mx-auto text-primary-600" aria-hidden />
        <h1 className="mt-4 text-2xl font-bold text-neutral-900">این درس مخصوص اعضای باشگاه است</h1>
        <p className="mt-3 text-neutral-600">برای دسترسی به این درس و سایر خدمات، عضو شوید یا وارد شوید.</p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/register" variant="secondary">ثبت‌نام رایگان</ButtonLink>
          <ButtonLink href="/login" variant="ghost">ورود</ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href={`/courses/ai-for-lawyers/chapter/${chapter.id}`} className="mb-6 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700">
        <ArrowRight size={16} aria-hidden />
        فصل {toFa(chapter.id)} — {chapter.title}
      </Link>

      {/* جستجو در درس */}
      <div className="relative mb-6">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="جستجو در این درس…"
          className="w-full rounded-full border border-neutral-300 bg-white py-2.5 pl-4 pr-11 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
        <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden />
      </div>

      <p className="text-sm text-primary-600">درس {toFa(idx + 1)} از {toFa(chapter.lessons.length)}</p>
      <h1 className="mt-1 text-2xl font-bold text-neutral-900">
        <span className="ml-2">{ICONS[lesson.icon] || "📄"}</span>
        {lesson.title}
      </h1>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600">⏱ {lesson.readingTime}</span>
        <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600">سطح: {lesson.difficulty}</span>
      </div>
      {lesson.informationCurrencyNote && (
        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs leading-6 text-neutral-600">
          🔄 {lesson.informationCurrencyNote}
        </div>
      )}
      {lesson.objectives && lesson.objectives.length > 0 && (
        <div className="mt-6 rounded-lg border-r-4 border-primary-500 bg-primary-50 p-5">
          <h3 className="font-bold text-neutral-900">در پایان این درس می‌توانید:</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {lesson.objectives.map((o, i) => (
              <li key={i} className="text-sm leading-7 text-neutral-700">◆ <Highlight text={o} term={term} /></li>
            ))}
          </ul>
        </div>
      )}

      {lesson.sections && lesson.sections.map((s, i) => (
        <div key={i} className="mt-8">
          <h2 className="border-b border-neutral-200 pb-2 text-lg font-bold text-neutral-900">
            <Highlight text={s.heading} term={term} />
          </h2>
          {s.paragraphs.map((p, j) => (
            <p key={j} className="mt-3 leading-8 text-neutral-700">
              <Highlight text={p} term={term} />
            </p>
          ))}
        </div>
      ))}

      {lesson.examples && lesson.examples.length > 0 && (
        <div className="mt-8 rounded-lg border-r-4 border-secondary-500 bg-secondary-50 p-5">
          <h3 className="font-bold text-neutral-900">✦ مثال‌ها</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {lesson.examples.map((e, i) => (
              <li key={i} className="text-sm leading-7 text-neutral-700">— <Highlight text={e} term={term} /></li>
            ))}
          </ul>
        </div>
      )}

      {lesson.tips && lesson.tips.length > 0 && (
        <div className="mt-4 rounded-lg border-r-4 border-accent-500 bg-accent-50 p-5">
          <h3 className="font-bold text-neutral-900">✓ نکات کاربردی</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {lesson.tips.map((t, i) => (
              <li key={i} className="text-sm leading-7 text-neutral-700">— <Highlight text={t} term={term} /></li>
            ))}
          </ul>
        </div>
      )}

      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <div className="mt-4 rounded-lg border-r-4 border-error bg-red-50 p-5">
          <h3 className="font-bold text-neutral-900">⚠ اشتباهات رایج</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {lesson.commonMistakes.map((m, i) => (
              <li key={i} className="text-sm leading-7 text-neutral-700">— <Highlight text={m} term={term} /></li>
            ))}
          </ul>
        </div>
      )}

      {lesson.prosCons && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border-r-4 border-accent-500 bg-accent-50 p-5">
            <h3 className="font-bold text-neutral-900">مزایا</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {lesson.prosCons.pros.map((p, i) => (
                <li key={i} className="text-sm leading-7 text-neutral-700">{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border-r-4 border-error bg-red-50 p-5">
            <h3 className="font-bold text-neutral-900">معایب</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {lesson.prosCons.cons.map((c, i) => (
                <li key={i} className="text-sm leading-7 text-neutral-700">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {lesson.comparisonTable && (
        <div className="mt-8 overflow-hidden rounded-lg border border-neutral-200">
          <h3 className="border-b border-neutral-200 bg-primary-50 p-4 font-bold text-primary-800">{lesson.comparisonTable.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  {lesson.comparisonTable.headers.map((h, i) => (
                    <th key={i} className="border border-neutral-200 bg-neutral-50 px-3 py-2 text-right font-bold text-neutral-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lesson.comparisonTable.rows.map((r, ri) => (
                  <tr key={ri}>
                    {r.map((c, ci) => (
                      <td key={ci} className="border border-neutral-200 px-3 py-2 text-neutral-700">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {lesson.exercise && lesson.exercise.length > 0 && (
        <div className="mt-8 rounded-lg bg-neutral-900 p-6 text-white">
          <h3 className="font-bold text-secondary-300">✎ تمرین این درس</h3>
          {lesson.exercise.map((e, i) => (
            <p key={i} className="mt-3 text-sm leading-7 text-neutral-200"><Highlight text={e} term={term} /></p>
          ))}
          <Button onClick={() => setShowAnswer((v) => !v)} variant="secondary" size="sm">
            {showAnswer ? "پنهان کردن پاسخ" : "نمایش پاسخ پیشنهادی"}
          </Button>
          {showAnswer && lesson.answer && (
            <div className="mt-4 border-t border-dashed border-neutral-600 pt-4">
              {lesson.answer.map((a, i) => (
                <p key={i} className="text-sm leading-7 text-neutral-300"><Highlight text={a} term={term} /></p>
              ))}
            </div>
          )}
        </div>
      )}

      {lesson.summary && lesson.summary.length > 0 && (
        <div className="mt-8 rounded-lg border-2 border-primary-300 bg-primary-50 p-5">
          <h3 className="font-bold text-primary-800">خلاصه درس</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {lesson.summary.map((s, i) => (
              <li key={i} className="text-sm leading-7 text-neutral-700">› <Highlight text={s} term={term} /></li>
            ))}
          </ul>
        </div>
      )}

      {lesson.sources && lesson.sources.length > 0 && (
        <div className="mt-8 rounded-lg border border-neutral-200 bg-neutral-50 p-5">
          <h3 className="font-bold text-neutral-900">📚 منابع و مطالعه بیشتر</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {lesson.sources.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  {s.title}
                </a>
                <p className="mt-0.5 text-xs leading-6 text-neutral-500">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.keywords && lesson.keywords.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {lesson.keywords.map((k) => (
            <span key={k} className="rounded-full border border-primary-300 px-3 py-1 text-xs text-primary-700">#{k}</span>
          ))}
        </div>
      )}

      {/* یادداشت */}
      <div className="mt-10">
        <Card>
          <CardBody>
            <h3 className="flex items-center gap-2 font-bold text-neutral-900">
              <StickyNote size={18} className="text-secondary-500" aria-hidden />
              یادداشت من
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="یادداشت خود را درباره این درس بنویسید…"
              className="mt-3 w-full rounded-lg border border-neutral-300 p-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <div className="mt-3 flex items-center gap-3">
              <Button onClick={handleSaveNote} variant="secondary" size="sm">ذخیره یادداشت</Button>
              {saved && <span className="text-sm text-accent-600">ذخیره شد ✓</span>}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* علامت خوانده‌شدن + ناوبری */}
      <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button onClick={handleDone} variant={done ? "primary" : "ghost"} size="sm" disabled={done}>
          <CheckCircle2 size={16} aria-hidden />
          {done ? "این درس مطالعه شد ✓" : "علامت به عنوان خوانده‌شده"}
        </Button>
        <div className="flex gap-3">
          {prev && (
            <Link href={`/courses/ai-for-lawyers/chapter/${chapter.id}/lesson/${prev.id}`} className="text-sm text-neutral-600 hover:text-primary-600">
              → درس قبلی
            </Link>
          )}
          {next && (
            <Link href={`/courses/ai-for-lawyers/chapter/${chapter.id}/lesson/${next.id}`} className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
              درس بعدی <ArrowLeft size={14} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}