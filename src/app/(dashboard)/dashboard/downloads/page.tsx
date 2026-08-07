import {
  Download,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileImage,
  InboxIcon,
  Calendar,
  Search,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const downloads = [
  {
    id: "d1",
    title: "جزوه دوره مبانی AI برای وکلا",
    date: "۱۴۰۴/۰۴/۱۰",
    size: "۲.۴ MB",
    type: "pdf",
    icon: FileText,
    accent: "primary" as const,
  },
  {
    id: "d2",
    title: "قالب دادخواست مطالبه وجه",
    date: "۱۴۰۴/۰۴/۰۲",
    size: "۱۸۰ KB",
    type: "docx",
    icon: FileSpreadsheet,
    accent: "secondary" as const,
  },
];

const accentStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

export default function DownloadsPage() {
  return (
    <div>
      {/* هدر */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Download size={24} aria-hidden />
        </div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          دانلودها
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          جزوات، قالب‌ها و منابع دانلود شده شما
        </p>
      </div>

      {/* جستجو */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={18}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft/60"
          aria-hidden
        />
        <Input
          name="search"
          placeholder="جستجو در دانلودها…"
          className="pr-10"
        />
      </div>

      {/* محتوا */}
      {downloads.length === 0 ? (
        <Card hover={false} className="mt-4">
          <CardBody className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <InboxIcon size={32} className="text-primary" aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">
              هنوز فایلی دانلود نکرده‌اید
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              با شرکت در دوره‌ها و استفاده از خدمات AI، فایل‌های دانلودی شما
              اینجا نمایش داده می‌شوند.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {downloads.map((d) => {
            const Icon = d.icon;
            return (
              <Card key={d.id} className="group">
                <CardBody className="flex items-center gap-4 p-4 sm:p-5">
                  <span
                    className={
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 " +
                      accentStyles[d.accent]
                    }
                  >
                    <Icon size={22} aria-hidden />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-ink group-hover:text-primary sm:text-base">
                      {d.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} aria-hidden />
                        {d.date}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-ink-soft/30" />
                      <span>{d.size}</span>
                      <span className="h-1 w-1 rounded-full bg-ink-soft/30" />
                      <span className="uppercase">{d.type}</span>
                    </div>
                  </div>

                  <button
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-btn border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-bold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-primary hover:text-white"
                    aria-label={`دانلود ${d.title}`}
                  >
                    <Download size={15} aria-hidden />
                    <span className="hidden sm:inline">دانلود</span>
                  </button>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}