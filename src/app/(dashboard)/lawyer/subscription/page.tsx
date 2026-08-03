import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function LawyerSubscriptionPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-neutral-900">اشتراک</h1>
      <Card className="mt-8">
        <CardBody className="flex flex-col gap-3">
          <p className="text-sm text-neutral-600">
            پلن فعلی: <Badge tone="accent">Professional</Badge>
          </p>
          <p className="text-sm text-neutral-600">تاریخ انقضا: ۱۴۰۴/۰۵/۲۰</p>
          <Button variant="secondary" className="w-fit">تمدید اشتراک</Button>
        </CardBody>
      </Card>
    </div>
  );
}
