import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-neutral-900">پروفایل</h1>
      <form className="mt-8 flex flex-col gap-5">
        <Input label="نام و نام خانوادگی" name="name" />
        <Input label="شماره موبایل" name="phone" disabled />
        <Input label="ایمیل" name="email" type="email" />
        <Button type="submit" className="w-fit">ذخیره تغییرات</Button>
      </form>
    </div>
  );
}
