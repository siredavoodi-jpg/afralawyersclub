import { FileText, Download } from "lucide-react";

const documents = [
  { id: "doc1", title: "دادخواست مطالبه وجه - نسخه نهایی", date: "۱۴۰۴/۰۴/۱۵" },
  { id: "doc2", title: "گزارش تحلیل قرارداد اجاره", date: "۱۴۰۴/۰۴/۱۰" },
];

export default function LawyerDocumentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">اسناد</h1>
      <div className="mt-8 flex flex-col divide-y divide-neutral-100 rounded-xl border border-neutral-100 bg-white">
        {documents.map((d) => (
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
