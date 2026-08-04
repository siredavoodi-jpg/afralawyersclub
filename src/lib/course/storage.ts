const PROGRESS_KEY = "afra-course-progress";
const NOTES_KEY = "afra-course-notes";

export function getProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function isLessonDone(lessonId: number): boolean {
  return !!getProgress()[String(lessonId)];
}

export function markLessonDone(lessonId: number) {
  const p = getProgress();
  p[String(lessonId)] = true;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {}
}

export function getNotes(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getNote(lessonId: number): string {
  return getNotes()[String(lessonId)] || "";
}

export function saveNote(lessonId: number, content: string) {
  const n = getNotes();
  n[String(lessonId)] = content;
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(n));
  } catch {}
}

export function chapterProgressPercent(doneCount: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((doneCount / total) * 100);
}