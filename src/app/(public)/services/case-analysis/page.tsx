import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export default function CaseAnalysisPage() {
  return (
    <>
      <PageHeader title="تحلیل پرونده" subtitle="اطلاعات پرونده خود را وارد کنید تا هوش مصنوعی آن را تحلیل کند" />
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form className="flex flex-col gap-5">
          <Input label="عنوان پرونده" name="case_title" placeholder="مثلاً: دعوی مطالبه وجه" required />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="case_description" className="text-sm font-medium text-neutral-700">
              شرح واقعه
            </label>
            <textarea
              id="case_description"
              name="case_description"
              rows={6}
              placeholder="شرح کامل واقعه و مستندات موجود را بنویسید..."
              className="rounded-lg border border-neutral-300 px-4 py-2.5 text-base placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <Input label="اسناد پیوست" name="documents" type="file" multiple />
          <Button type="submit" variant="secondary" size="lg">
            تحلیل با AI
          </Button>
          <p className="text-xs text-neutral-500">
            این خدمت برای وکلای احراز شده با اشتراک Professional فعال است.
          </p>
        </form>

        <Card>
          <CardBody className="flex flex-col gap-4">
            <h3 className="font-bold text-neutral-900">نتیجه تحلیل</h3>
            <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-500">
              پس از ارسال فرم، خلاصه پرونده، نکات کلیدی، قوانین مرتبط، پیشنهادات اقدام و ریسک‌ها اینجا نمایش داده می‌شود.
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
