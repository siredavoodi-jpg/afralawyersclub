import Link from "next/link";
import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import {
  Award,
  Users,
  Phone,
  CreditCard,
  Calendar,
  InboxIcon,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function AdminTraineesPage() {
  const pendingTrainees = await prisma.user.findMany({
    where: {
      role: UserRole.trainee,
      status: UserStatus.inactive,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      nationalId: true,
      traineeLicenseNumber: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* هدر */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <Award size={24} aria-hidden />
          </div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            تایید کارآموزان
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            لیست همکاران کارآموز (وکلای پایه یک آینده) در انتظار تایید
          </p>
        </div>
        <Link
          href="/admin/lawyers"
          className="inline-flex w-fit items-center gap-2 rounded-btn border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:border-primary/40 hover:text-primary"
        >
          <Users size={16} aria-hidden />
          تایید وکلا
          <ArrowLeft size={14} aria-hidden />
        </Link>
      </div>

      {/* آمار */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Card hover={false}>
          <CardBody className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Users size={20} aria-hidden />
            </span>
            <div>
              <p className="font-en text-2xl font-extrabold text-ink">
                {pendingTrainees.length.toLocaleString("fa-IR")}
              </p>
              <p className="text-xs text-ink-soft">در انتظار تایید</p>
            </div>
          </CardBody>
        </Card>
        <Card hover={false}>
          <CardBody className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Award size={20} aria-hidden />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-ink">
                وکلای پایه یک
              </p>
              <p className="text-xs text-ink-soft">آینده</p>
            </div>
          </CardBody>
        </Card>
        <Card hover={false} className="sm:col-span-1 col-span-2">
          <CardBody className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <CheckCircle2 size={20} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">بررسی سریع</p>
              <p className="text-xs text-ink-soft">تایید یا رد در یک کلیک</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* لیست کارآموزان */}
      {pendingTrainees.length === 0 ? (
        <Card hover={false}>
          <CardBody className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
              <InboxIcon size={32} className="text-secondary" aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">
              هیچ کارآموزی در انتظار تایید نیست
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              در حال حاضر درخواستی برای تایید کارآموزی ثبت نشده است.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pendingTrainees.map((trainee) => (
            <Card key={trainee.id} hover={false}>
              <CardBody className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-bold text-ink">
                    {trainee.name}
                  </h3>
                  <Badge tone="secondary">در انتظار</Badge>
                </div>

                <div className="flex flex-col gap-2 text-sm text-ink-soft">
                  <span className="flex items-center gap-2">
                    <Phone size={14} className="shrink-0 text-secondary" aria-hidden />
                    <span dir="ltr">{trainee.phone}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <CreditCard size={14} className="shrink-0 text-secondary" aria-hidden />
                    کد ملی: <span dir="ltr">{trainee.nationalId}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Award size={14} className="shrink-0 text-secondary" aria-hidden />
                    پروانه:{" "}
                    <span dir="ltr" className="font-bold">
                      {trainee.traineeLicenseNumber}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="shrink-0 text-secondary" aria-hidden />
                    ثبت‌نام:{" "}
                    {new Date(trainee.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
                  <Link
                    href={`/api/admin/trainees/${trainee.id}?action=approve`}
                    className="flex items-center justify-center gap-1.5 rounded-btn bg-accent px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-accent-hover"
                  >
                    <CheckCircle2 size={14} aria-hidden />
                    تایید
                  </Link>
                  <Link
                    href={`/api/admin/trainees/${trainee.id}?action=reject`}
                    className="flex items-center justify-center gap-1.5 rounded-btn border border-error/40 bg-error/5 px-4 py-2 text-sm font-bold text-error transition-all duration-300 hover:bg-error hover:text-white"
                  >
                    <XCircle size={14} aria-hidden />
                    رد
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}