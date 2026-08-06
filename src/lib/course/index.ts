import type { Course } from "./types";
import chapter01 from "./chapter-01";
import chapter02 from "./chapter-02";

export const course: Course = {
  id: "ai-for-lawyers",
  title: "آموزش مقدمات هوش مصنوعی",
  description: "دوره جامع مقدماتی هوش مصنوعی ویژه جامعه وکالت؛ بدون نیاز به پیش‌زمینه فنی",
  chapters: [chapter01, chapter02],
};

export function getChapter(id: number) {
  return course.chapters.find((c) => c.id === id);
}

export function getLesson(chapterId: number, lessonId: number) {
  const chapter = getChapter(chapterId);
  return chapter?.lessons.find((l) => l.id === lessonId);
}