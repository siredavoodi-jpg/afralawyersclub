import Link from "next/link";
import { Clock, Star, BookOpen } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Course } from "@/types";

const levelLabel: Record<Course["level"], string> = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

const accessLevelConfig: Record<
  Course["accessLevel"],
  { label: string; tone: "accent" | "secondary" | "neutral" }
> = {
  interested: { label: "برای علاقمندان", tone: "accent" },
  users: { label: "برای کاربران", tone: "secondary" },
  lawyers: { label: "برای وکلای عضو باشگاه", tone: "neutral" },
};

export function CourseCard({ course }: { course: Course }) {
  const accessInfo = accessLevelConfig[course.accessLevel];

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardBody className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <BookOpen size={24} aria-hidden />
          </span>
          <Badge tone={accessInfo.tone}>{accessInfo.label}</Badge>
        </div>

        <h3 className="text-lg font-bold text-neutral-900 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-neutral-600">مدرس: {course.instructor}</p>

        <div className="w-fit">
          <Badge tone="neutral">{levelLabel[course.level]}</Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span className="flex items-center gap-1">
            <Clock size={16} aria-hidden />
            {Math.round(course.duration / 60)} ساعت
          </span>
          {course.rating && (
            <span className="flex items-center gap-1">
              <Star size={16} className="fill-secondary-500 text-secondary-500" aria-hidden />
              {course.rating}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-end pt-2 border-t border-neutral-100">
          <Link
            href={`/courses/${course.id}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            مشاهده دوره ←
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}