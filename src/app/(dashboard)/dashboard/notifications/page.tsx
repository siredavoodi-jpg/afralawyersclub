const notifications = [
  { id: "n1", title: "اشتراک شما تا ۵ روز دیگر منقضی می‌شود", time: "۲ ساعت پیش", unread: true },
  { id: "n2", title: "دوره جدید «تحلیل قرارداد» منتشر شد", time: "دیروز", unread: true },
  { id: "n3", title: "پیام شما با موفقیت ثبت شد", time: "۳ روز پیش", unread: false },
];

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">اعلان‌ها</h1>
      <div className="mt-8 flex flex-col divide-y divide-neutral-100 rounded-xl border border-neutral-100 bg-white">
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-center justify-between px-5 py-4 ${n.unread ? "bg-primary-50/40" : ""}`}>
            <p className="text-sm text-neutral-800">{n.title}</p>
            <span className="text-xs text-neutral-500">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
