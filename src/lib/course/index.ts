import type { Course } from "./types";
import chapter01 from "./chapter-01";

export const course: Course = {
  id: "ai-for-lawyers",
  title: "هوش مصنوعی برای وکلا",
  description: "دوره جامع مقدماتی هوش مصنوعی، ویژه جامعه وکالت",
  chapters: [chapter01],
};

export function getChapter(id: number) {
  return course.chapters.find((c) => c.id === id);
}

export function getLesson(chapterId: number, lessonId: number) {
  const chapter = getChapter(chapterId);
  return chapter?.lessons.find((l) => l.id === lessonId);
}