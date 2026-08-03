export type UserRole = "guest" | "member" | "lawyer" | "admin";
export type SubscriptionPlan = "free" | "plus" | "professional";
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
  image?: string;
  rating?: number;
  studentsCount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  quote: string;
  rating: number;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image?: string;
  publishedAt: string;
}

export interface AiToolCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface CaseAnalysisResult {
  summary: string;
  key_points: string[];
  relevant_laws: string[];
  recommendations: string[];
  risks: string[];
}

export interface PetitionResult {
  text: string;
  format: string;
  downloadable: boolean;
}

export interface ContractAnalysisResult {
  key_clauses: { title: string; note: string }[];
  risks: { title: string; severity: "low" | "medium" | "high"; note: string }[];
  suggestions: { title: string; note: string }[];
  summary: string;
}
