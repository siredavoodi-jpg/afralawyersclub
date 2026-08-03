import { Download, FileText } from "lucide-react";

const downloads = [
  { id: "d1", title: "جزوه دوره مبانی AI برای وکلا", date: "۱۴۰۴/۰۴/۱۰" },
  { id: "d2", title: "قالب دادخواست مطالبه وجه", date: "۱۴۰۴/۰۴/۰۲" },
];

export default function DownloadsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">دانلودها</h1>
      <div className="mt-8 flex flex-col divide-y divide-neutral-100 rounded-xl border border-neutral-100 bg-white">
        {downloads.map((d) => (
          <div key={d.id} className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-primary-600" aria-hidden />
              <div>
                <p className="text-sm font-medium text-neutral-900">{d.title}</p>
                <p className="text-xs text-neutral-500">{d.date}</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-sm font-medium text-primary-600" aria-label={`دانلود ${d.title}`}>
              <Download size={16} aria-hidden /> دانلود
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
