import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const plans = [
  { name: "Free", price: "رایگان", features: ["دوره‌های رایگان", "کتابخانه محدود", "نسخه آزمایشی AI"] },
  { name: "Plus", price: "ماهانه/سالانه", features: ["دوره‌های کامل", "بانک پرامپت", "ابزارهای AI محدود"] },
  { name: "Professional", price: "ماهانه/سالانه", features: ["تحلیل پرونده", "تولید لوایح", "تحلیل قرارداد", "داشبورد کامل"] },
];

export default function SubscriptionPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">اشتراک</h1>
      <p className="mt-1 text-neutral-600">پلن فعلی شما: <Badge tone="primary">Free</Badge></p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name}>
            <CardBody className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-neutral-900">{p.name}</h3>
              <p className="font-medium text-secondary-600">{p.price}</p>
              <ul className="flex flex-col gap-2 text-sm text-neutral-600">
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <Button variant={p.name === "Free" ? "ghost" : "secondary"} className="mt-2">
                {p.name === "Free" ? "پلن فعلی" : "ارتقاء"}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
