export interface LessonSection {
  heading: string;
  paragraphs: string[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface Lesson {
  id: number;
  chapter: number;
  title: string;
  icon: string;
  readingTime: string;
  difficulty: string;
  isFinal?: boolean;
  objectives: string[];
  sections: LessonSection[];
  examples?: string[];
  tips?: string[];
  commonMistakes?: string[];
  exercise?: string[];
  answer?: string[];
  summary?: string[];
  keywords?: string[];
  glossary?: GlossaryItem[];
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number; // index of correct option (0-based)
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  isActive: boolean;
  isFree: boolean; // true for chapter 1, false for 2-12
}

export interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  finalExam?: QuizQuestion[];
}

export interface CourseProgress {
  lessonId: number;
  completed: boolean;
  completedAt?: Date;
}

export interface QuizResult {
  chapterId?: number; // null for final exam
  score: number; // 0-100
  passed: boolean;
  answers: Record<number, number>; // questionIndex -> selectedOptionIndex
  completedAt: Date;
}

export interface LessonNote {
  lessonId: number;
  content: string;
  updatedAt: Date;
}