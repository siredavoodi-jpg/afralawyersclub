import Link from "next/link";
import { Clock, Star } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Course } from "@/types";

const levelLabel: Record<Course["level"], string> = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

const accessLevelLabel: Record<Course["accessLevel"], string> = {
  interested: "برای علاقمندان",
  users: "برای کاربران",
  lawyers: "برای وکلای عضو باشگاه",
};

const accessLevelTone: Record<Course["accessLevel"], "accent" | "secondary" | "neutral"> = {
  interested: "accent",
  users: "secondary",
  lawyers: "neutral",
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50 text-primary-400">
        <span className="text-sm">تصویر دوره</span>
      </div>
      <CardBody className="flex flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge tone={accessLevelTone[course.accessLevel]}>
            {accessLevelLabel[course.accessLevel]}
          </Badge>
          <Badge tone="neutral">{levelLabel[course.level]}</Badge>
        </div>
        <h3 className="text-lg font-bold text-neutral-900">{course.title}</h3>
        <p className="text-sm text-neutral-600">مدرس: {course.instructor}</p>
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
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold text-secondary-600">
            {course.isFree ? "رایگان" : `${course.price.toLocaleString("fa-IR")} تومان`}
          </span>
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