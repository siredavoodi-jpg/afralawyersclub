import { Card, CardBody } from "@/components/ui/Card";
import { BookOpen, Download, Bell } from "lucide-react";

const stats = [
  { label: "دوره‌های ثبت‌نامی", value: "۳", icon: BookOpen },
  { label: "دانلودها", value: "۱۲", icon: Download },
  { label: "اعلان‌های خوانده‌نشده", value: "۲", icon: Bell },
];

export default function MemberDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">داشبورد</h1>
      <p className="mt-1 text-neutral-600">خلاصه فعالیت‌های شما</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardBody className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <s.icon size={22} aria-hidden />
              </span>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
                <p className="text-sm text-neutral-500">{s.label}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
