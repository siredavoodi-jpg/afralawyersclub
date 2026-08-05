export interface LessonSection {
  heading: string;
  paragraphs: string[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface ProsCons {
  pros: string[];
  cons: string[];
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface LessonSource {
  url: string;
  title: string;
  description: string;
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
  prosCons?: ProsCons;
  comparisonTable?: ComparisonTable;
  sources?: LessonSource[];
  lastUpdated?: string;
  informationCurrencyNote?: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  isActive: boolean;
  isFree: boolean;
  quizPassThreshold?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  finalExam?: QuizQuestion[];
}