import { Badge } from "@/components/ui/Badge";

const cases = [
  { id: "cs1", title: "دعوی مطالبه وجه - شرکت الف", date: "۱۴۰۴/۰۴/۱۵", status: "تکمیل‌شده" },
  { id: "cs2", title: "تحلیل قرارداد اجاره تجاری", date: "۱۴۰۴/۰۴/۱۲", status: "در حال بررسی" },
  { id: "cs3", title: "دادخواست الزام به تنظیم سند", date: "۱۴۰۴/۰۴/۰۸", status: "تکمیل‌شده" },
];

export default function CasesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">پرونده‌های اخیر</h1>
      <div className="mt-8 overflow-x-auto rounded-xl border border-neutral-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              <th className="px-5 py-3 text-right font-medium">عنوان</th>
              <th className="px-5 py-3 text-right font-medium">تاریخ</th>
              <th className="px-5 py-3 text-right font-medium">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {cases.map((c) => (
              <tr key={c.id}>
                <td className="px-5 py-3 text-neutral-800">{c.title}</td>
                <td className="px-5 py-3 text-neutral-500">{c.date}</td>
                <td className="px-5 py-3">
                  <Badge tone={c.status === "تکمیل‌شده" ? "accent" : "secondary"}>{c.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
