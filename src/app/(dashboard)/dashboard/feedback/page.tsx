import { Button } from "@/components/ui/Button";

export default function FeedbackPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-neutral-900">ثبت نظر</h1>
      <form className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="feedback" className="text-sm font-medium text-neutral-700">نظر شما</label>
          <textarea
            id="feedback"
            rows={5}
            className="rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <Button type="submit" className="w-fit">ارسال نظر</Button>
      </form>
    </div>
  );
}
