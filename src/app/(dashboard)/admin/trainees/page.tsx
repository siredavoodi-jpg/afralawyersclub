import Link from "next/link";
import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { Card, CardBody } from "@/components/ui/Card";
import { Award } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-neutral-900">
            <Award size={24} className="text-secondary-600" aria-hidden />
            تایید کارآموزان
          </h1>
          <p className="mt-1 text-neutral-600">
            لیست همکاران کارآموز (وکلای پایه یک آینده) در انتظار تایید
          </p>
        </div>
        <Link
          href="/admin/lawyers"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          تایید وکلا
        </Link>
      </div>

      <div className="mt-8">
        {pendingTrainees.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
            <p className="text-neutral-500">هیچ کارآموزی در انتظار تایید نیست</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingTrainees.map((trainee) => (
              <Card key={trainee.id}>
                <CardBody className="flex flex-col gap-2">
                  <h3 className="font-bold text-neutral-900">{trainee.name}</h3>
                  <p className="text-sm text-neutral-600">
                    موبایل: <span dir="ltr">{trainee.phone}</span>
                  </p>
                  <p className="text-sm text-neutral-600">
                    کد ملی: <span dir="ltr">{trainee.nationalId}</span>
                  </p>
                  <p className="text-sm font-medium text-secondary-700">
                    شماره پروانه کارآموزی:{" "}
                    <span dir="ltr">{trainee.traineeLicenseNumber}</span>
                  </p>
                  <p className="text-xs text-neutral-400">
                    تاریخ ثبت‌نام:{" "}
                    {new Date(trainee.createdAt).toLocaleDateString("fa-IR")}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/api/admin/trainees/${trainee.id}?action=approve`}
                      className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-700"
                    >
                      تایید
                    </Link>
                    <Link
                      href={`/api/admin/trainees/${trainee.id}?action=reject`}
                      className="flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-center text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      رد
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}