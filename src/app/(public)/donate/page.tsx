import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const amounts = ["۱۰۰,۰۰۰", "۲۵۰,۰۰۰", "۵۰۰,۰۰۰", "۱,۰۰۰,۰۰۰"];

export default function DonatePage() {
  return (
    <>
      <PageHeader title="حمایت مالی" subtitle="با حمایت شما، دسترسی به آموزش AI برای وکلا گسترش می‌یابد" />
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <CardBody className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {amounts.map((a) => (
                <button
                  key={a}
                  className="rounded-lg border border-neutral-200 py-3 text-sm font-medium text-neutral-700 hover:border-primary-500 hover:text-primary-600"
                >
                  {a} تومان
                </button>
              ))}
            </div>
            <Button variant="secondary" size="lg">پرداخت حمایت</Button>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
