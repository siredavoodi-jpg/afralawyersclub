const invoices = [
  { id: "inv1", title: "فاکتور اشتراک Professional - تیر ۱۴۰۴", amount: "۱,۹۹۰,۰۰۰ تومان" },
  { id: "inv2", title: "فاکتور اشتراک Professional - خرداد ۱۴۰۴", amount: "۱,۹۹۰,۰۰۰ تومان" },
];

export default function BillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">صورتحساب</h1>
      <div className="mt-8 flex flex-col divide-y divide-neutral-100 rounded-xl border border-neutral-100 bg-white">
        {invoices.map((inv) => (
          <div key={inv.id} className="flex items-center justify-between px-5 py-4">
            <p className="text-sm font-medium text-neutral-900">{inv.title}</p>
            <p className="text-sm text-secondary-600">{inv.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
