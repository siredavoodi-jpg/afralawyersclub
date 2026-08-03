import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <>
      <PageHeader title="تماس با ما" subtitle="سوالات و پیشنهادات خود را با ما در میان بگذارید" />
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <form className="flex flex-col gap-5">
          <Input label="نام و نام خانوادگی" name="name" required />
          <Input label="ایمیل یا شماره موبایل" name="contact" required />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-neutral-700">پیام</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              required
            />
          </div>
          <Button type="submit" size="lg">ارسال پیام</Button>
        </form>
      </section>
    </>
  );
}
