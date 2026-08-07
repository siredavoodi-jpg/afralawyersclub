"use client";

import { useState, useEffect } from "react";
import {
  Target,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  List,
  MessageCircle,
  Scale,
  Table2,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink,
  Search,
  X,
} from "lucide-react";
import type { Lesson } from "@/lib/course/types";
import {
  isLessonDone,
  markLessonDone,
  getNote,
  saveNote,
} from "@/lib/course/storage";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface LessonContentProps {
  lesson: Lesson;
  courseSlug?: string;
}

export function LessonContent({ lesson, courseSlug }: LessonContentProps) {
  const [completed, setCompleted] = useState(false);
  const [note, setNote] = useState("");
  const [showExercise, setShowExercise] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCompleted(isLessonDone(lesson.id));
    setNote(getNote(lesson.id));
  }, [lesson.id]);

  const handleMarkComplete = () => {
    markLessonDone(lesson.id);
    setCompleted(true);
  };

  const handleSaveNote = (value: string) => {
    setNote(value);
    saveNote(lesson.id, value);
  };

  // تابع هایلایت متن جستجو شده
  const highlightText = (text: string): React.ReactNode => {
    if (!searchTerm || !mounted) return text;
    try {
      const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "gi");
      const parts = text.split(regex);
      return parts.map((part, i) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={i} className="rounded bg-secondary/40 px-1 text-ink">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      );
    } catch {
      return text;
    }
  };

  return (
    <div className="space-y-6">
      {/* نوار جستجو */}
      <Card hover={false}>
        <CardBody className="p-4">
          <div className="flex items-center gap-3">
            <Search size={20} className="shrink-0 text-ink-soft" />
            <input
              type="text"
              placeholder="جستجو در این درس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-ink placeholder:text-ink-soft focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="rounded-full p-1 text-ink-soft hover:bg-base hover:text-ink"
                aria-label="پاک کردن جستجو"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* اهداف یادگیری */}
      {lesson.objectives.length > 0 && (
        <Card hover={false}>
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">اهداف یادگیری</h2>
            </div>
            <ul className="space-y-2">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-ink-soft">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="leading-relaxed">{highlightText(obj)}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      {/* بخش‌های درس */}
      {lesson.sections.map((section, i) => (
        <Card key={i} hover={false}>
          <CardBody className="p-6">
            <h2 className="mb-4 text-xl font-bold text-ink">
              {highlightText(section.heading)}
            </h2>
            <div className="space-y-4 text-ink-soft leading-relaxed">
              {section.paragraphs.map((para, j) => (
                <p key={j}>{highlightText(para)}</p>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}

      {/* مثال‌ها */}
      {lesson.examples && lesson.examples.length > 0 && (
        <Card hover={false} className="border-r-4 border-r-secondary">
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">مثال‌ها</h2>
            </div>
            <ul className="space-y-3">
              {lesson.examples.map((ex, i) => (
                <li key={i} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-xs font-bold text-secondary">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{highlightText(ex)}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      {/* نکات کلیدی */}
      {lesson.tips && lesson.tips.length > 0 && (
        <Card hover={false} className="border-r-4 border-r-accent">
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Bookmark size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">نکات کلیدی</h2>
            </div>
            <ul className="space-y-2">
              {lesson.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-ink-soft">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{highlightText(tip)}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      {/* اشتباهات رایج */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <Card hover={false} className="border-r-4 border-r-error">
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/10 text-error">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">اشتباهات رایج</h2>
            </div>
            <ul className="space-y-2">
              {lesson.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2 text-ink-soft">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-error" />
                  <span className="leading-relaxed">
                    {highlightText(mistake)}
                  </span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      {/* تمرین و پاسخ */}
      {lesson.exercise && lesson.exercise.length > 0 && (
        <Card hover={false}>
          <CardBody className="p-6">
            <button
              onClick={() => setShowExercise(!showExercise)}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <HelpCircle size={20} />
                </div>
                <h2 className="text-xl font-bold text-ink">تمرین</h2>
              </div>
              {showExercise ? (
                <ChevronUp size={20} className="text-ink-soft" />
              ) : (
                <ChevronDown size={20} className="text-ink-soft" />
              )}
            </button>
            {showExercise && (
              <div className="mt-4 space-y-4">
                <div className="space-y-3">
                  {lesson.exercise.map((ex, i) => (
                    <p key={i} className="text-ink-soft leading-relaxed">
                      {highlightText(ex)}
                    </p>
                  ))}
                </div>

                {lesson.answer && lesson.answer.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark"
                    >
                      {showAnswer ? (
                        <>
                          <ChevronUp size={16} />
                          مخفی کردن پاسخ
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          نمایش پاسخ نمونه
                        </>
                      )}
                    </button>
                    {showAnswer && (
                      <div className="mt-3 rounded-lg bg-primary/5 p-4">
                        {lesson.answer.map((ans, i) => (
                          <p
                            key={i}
                            className="text-sm text-ink-soft leading-relaxed"
                          >
                            {highlightText(ans)}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* خلاصه */}
      {lesson.summary && lesson.summary.length > 0 && (
        <Card
          hover={false}
          className="bg-gradient-to-br from-primary/5 to-secondary/5"
        >
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <List size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">خلاصه</h2>
            </div>
            <ul className="space-y-2">
              {lesson.summary.map((sum, i) => (
                <li key={i} className="flex items-start gap-2 text-ink-soft">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{highlightText(sum)}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      {/* کلمات کلیدی */}
      {lesson.keywords && lesson.keywords.length > 0 && (
        <Card hover={false}>
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <MessageCircle size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">کلمات کلیدی</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {lesson.keywords.map((kw, i) => (
                <Badge key={i} tone="secondary">
                  {highlightText(kw)}
                </Badge>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* واژه‌نامه */}
      {lesson.glossary && lesson.glossary.length > 0 && (
        <Card hover={false}>
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <BookOpen size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">واژه‌نامه</h2>
            </div>
            <div className="space-y-3">
              {lesson.glossary.map((item, i) => (
                <div
                  key={i}
                  className="border-b border-line pb-3 last:border-0 last:pb-0"
                >
                  <p className="mb-1 font-bold text-ink">
                    {highlightText(item.term)}
                  </p>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {highlightText(item.definition)}
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* مزایا و معایب */}
      {lesson.prosCons && (
        <Card hover={false}>
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Scale size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">مزایا و معایب</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-accent/5 p-4">
                <h3 className="mb-3 font-bold text-accent">مزایا</h3>
                <ul className="space-y-2">
                  {lesson.prosCons.pros.map((pro, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-ink-soft"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      <span>{highlightText(pro)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-error/5 p-4">
                <h3 className="mb-3 font-bold text-error">معایب</h3>
                <ul className="space-y-2">
                  {lesson.prosCons.cons.map((con, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-ink-soft"
                    >
                      <AlertTriangle
                        size={16}
                        className="mt-0.5 shrink-0 text-error"
                      />
                      <span>{highlightText(con)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* جدول مقایسه */}
      {lesson.comparisonTable && (
        <Card hover={false}>
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Table2 size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">
                {lesson.comparisonTable.title}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-primary bg-primary/5">
                    {lesson.comparisonTable.headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-right font-bold text-ink"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lesson.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className="border-b border-line">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-ink-soft">
                          {highlightText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      {/* منابع */}
      {lesson.sources && lesson.sources.length > 0 && (
        <Card hover={false}>
          <CardBody className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ExternalLink size={20} />
              </div>
              <h2 className="text-xl font-bold text-ink">منابع</h2>
            </div>
            <ul className="space-y-3">
              {lesson.sources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-line p-3 transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <p className="font-medium text-ink">{source.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {source.description}
                    </p>
                    <p className="mt-2 truncate text-xs text-primary" dir="ltr">
                      {source.url}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      {/* یادداشت‌های من */}
      <Card hover={false}>
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-ink">یادداشت‌های من</h2>
          </div>
          <textarea
            value={note}
            onChange={(e) => handleSaveNote(e.target.value)}
            placeholder="یادداشت‌های خود را اینجا بنویسید..."
            className="w-full rounded-btn border border-line bg-surface p-4 text-ink placeholder:text-ink-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            rows={5}
          />
          <p className="mt-2 text-xs text-ink-soft">
            یادداشت‌ها به صورت خودکار ذخیره می‌شوند
          </p>
        </CardBody>
      </Card>

      {/* علامت‌گذاری مطالعه */}
      <Card hover={false} className={completed ? "bg-accent/5" : ""}>
        <CardBody className="p-6">
          {completed ? (
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="font-bold text-ink">این درس را مطالعه کردید!</p>
                <p className="text-sm text-ink-soft">
                  می‌توانید به درس بعدی بروید یا این درس را مرور کنید
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-bold text-ink">
                  آیا این درس را مطالعه کردید؟
                </p>
                <p className="text-sm text-ink-soft">
                  با علامت‌گذاری، پیشرفت خود را ثبت کنید
                </p>
              </div>
              <Button onClick={handleMarkComplete} variant="primary" size="lg">
                <CheckCircle2 size={20} />
                علامت‌گذاری به عنوان مطالعه شده
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}