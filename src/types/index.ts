export type AccessLevel = "interested" | "users" | "trainees" | "lawyers";
export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // minutes
  level: CourseLevel;
  price: number;
  isFree: boolean;
  accessLevel: AccessLevel;
  image?: string;
  rating?: number;
  studentsCount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
}

export interface AiToolCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}