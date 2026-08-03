import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export default function LawyerContractPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">تحلیل قرارداد</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <form className="flex flex-col gap-5">
          <Input label="فایل قرارداد" name="contract_file" type="file" accept=".pdf,.doc,.docx" required />
          <Button type="submit" variant="secondary" size="lg">تحلیل قرارداد</Button>
        </form>
        <Card>
          <CardBody className="flex flex-col gap-4">
            <h3 className="font-bold text-neutral-900">نتیجه تحلیل</h3>
            <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-500">
              خروجی POST /api/ai/contract-analysis اینجا نمایش داده می‌شود.
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
