import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function LicensePage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-neutral-900">اطلاعات پروانه</h1>
      <p className="mt-1 text-neutral-600">
        وضعیت: <Badge tone="secondary">در حال بررسی</Badge>
      </p>

      <form className="mt-8 flex flex-col gap-5">
        <Input label="شماره پروانه" name="license_number" required />
        <Input label="کانون وکلا" name="bar_association" required />
        <Input label="تصویر پروانه" name="license_image" type="file" accept="image/*" required />
        <Button type="submit" className="w-fit">ثبت پروانه</Button>
        <p className="text-xs text-neutral-500">پروانه شما پس از ارسال در حال بررسی قرار می‌گیرد.</p>
      </form>
    </div>
  );
}
