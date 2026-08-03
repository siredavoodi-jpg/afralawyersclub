import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export default function LawyerCaseAnalysisPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">تحلیل پرونده</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <form className="flex flex-col gap-5">
          <Input label="عنوان پرونده" name="case_title" required />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="case_description" className="text-sm font-medium text-neutral-700">شرح واقعه</label>
            <textarea
              id="case_description"
              rows={6}
              className="rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <Input label="اسناد پیوست" name="documents" type="file" multiple />
          <Button type="submit" variant="secondary" size="lg">تحلیل با AI</Button>
        </form>
        <Card>
          <CardBody className="flex flex-col gap-4">
            <h3 className="font-bold text-neutral-900">نتیجه تحلیل</h3>
            <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-500">
              خروجی POST /api/ai/case-analysis اینجا نمایش داده می‌شود.
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
