import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export default function ContractAnalysisPage() {
  return (
    <>
      <PageHeader title="تحلیل قرارداد" subtitle="فایل قرارداد خود را آپلود کنید تا بندهای مهم و ریسک‌ها شناسایی شوند" />
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form className="flex flex-col gap-5">
          <Input label="فایل قرارداد (PDF یا Word)" name="contract_file" type="file" accept=".pdf,.doc,.docx" required />
          <Button type="submit" variant="secondary" size="lg">
            تحلیل قرارداد
          </Button>
        </form>

        <Card>
          <CardBody className="flex flex-col gap-4">
            <h3 className="font-bold text-neutral-900">نتیجه تحلیل</h3>
            <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-500">
              بندهای مهم، ریسک‌های حقوقی، پیشنهادات اصلاحی و خلاصه اجرایی قرارداد اینجا نمایش داده می‌شود.
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
