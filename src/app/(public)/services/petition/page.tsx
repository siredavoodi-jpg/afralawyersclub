import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export default function PetitionPage() {
  return (
    <>
      <PageHeader title="تولید دادخواست" subtitle="دادخواست خود را با فرمت استاندارد قضایی تولید کنید" />
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="petition_type" className="text-sm font-medium text-neutral-700">
              نوع دادخواست
            </label>
            <select
              id="petition_type"
              name="petition_type"
              className="rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <option>مطالبه وجه</option>
              <option>الزام به تنظیم سند رسمی</option>
              <option>فسخ قرارداد</option>
              <option>مطالبه خسارت</option>
            </select>
          </div>
          <Input label="اطلاعات خواهان" name="plaintiff_info" placeholder="نام، نام خانوادگی، کد ملی" />
          <Input label="اطلاعات خوانده" name="defendant_info" placeholder="نام، نام خانوادگی، کد ملی" />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="claim" className="text-sm font-medium text-neutral-700">خواسته</label>
            <textarea
              id="claim"
              name="claim"
              rows={3}
              className="rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <Input label="دلایل و مستندات" name="evidence" placeholder="فهرست مستندات، جدا شده با کاما" />
          <Button type="submit" variant="secondary" size="lg">
            تولید دادخواست
          </Button>
        </form>

        <Card>
          <CardBody className="flex flex-col gap-4">
            <h3 className="font-bold text-neutral-900">متن دادخواست</h3>
            <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-500">
              متن کامل دادخواست تولید‌شده، قابل ویرایش و دانلود، اینجا نمایش داده می‌شود.
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
