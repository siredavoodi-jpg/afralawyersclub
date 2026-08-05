import Link from "next/link";
import { ArrowRight, MapPin, Eye, Calendar } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { Gallery } from "@/components/market/Gallery";
import { ContactBox } from "@/components/market/ContactBox";
import { ListingCard } from "@/components/market/ListingCard";

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۳۴۵۶۷۸۹"[+d]);

export async function generateMetadata({ params }: { params: { id: string } }) {
  const listing = await prisma.marketListing.findUnique({ where: { id: params.id } });
  return { title: listing ? `${listing.title} | افرا مارکت` : "آگهی | افرا مارکت" };
}

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await prisma.marketListing.findUnique({
    where: { id: params.id },
    include: { images: true, category: true },
  });

  if (!listing || listing.status !== "published") {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-900">آگهی یافت نشد</h1>
        <p className="mt-3 text-neutral-600">این آگهی منتشر نشده یا حذف شده است.</p>
        <div className="mt-6">
          <Link href="/market" className="rounded-lg bg-primary-600 px-5 py-3 text-sm font-bold text-white">
            بازگشت به مارکت
          </Link>
        </div>
      </section>
    );
  }

  // افزایش شمارنده بازدید
  await prisma.marketListing.update({
    where: { id: listing.id },
    data: { views: { increment: 1 } },
  });

  const similar = await prisma.marketListing.findMany({
    where: { status: "published", categoryId: listing.categoryId, NOT: { id: listing.id } },
    include: { images: true, category: true },
    take: 4,
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/market" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700">
        <ArrowRight size={16} aria-hidden />
        بازگشت به مارکت
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ستون اصلی */}
        <div className="lg:col-span-2">
          <Gallery images={listing.images} title={listing.title} />

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-neutral-900">{listing.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1"><Eye size={15} aria-hidden /> {toFa(listing.views + 1)} بازدید</span>
              <span className="flex items-center gap-1"><Calendar size={15} aria-hidden /> {new Date(listing.createdAt).toLocaleDateString("fa-IR")}</span>
              {listing.city && <span className="flex items-center gap-1"><MapPin size={15} aria-hidden /> {listing.city}</span>}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-3 font-bold text-neutral-900">توضیحات</h2>
            <p className="whitespace-pre-line leading-8 text-neutral-700">{listing.description}</p>
          </div>
        </div>

        {/* ستون کناری */}
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <p className="text-sm text-neutral-500">قیمت</p>
            <p className="mt-1 text-2xl font-extrabold text-primary-600">
              {listing.price ? `${toFa(listing.price)} تومان` : "توافقی"}
            </p>
            {listing.negotiable && (
              <span className="mt-2 inline-block rounded-full bg-secondary-50 px-3 py-1 text-xs font-medium text-secondary-600">
                قابل مذاکره
              </span>
            )}
            <div className="mt-4 border-t border-neutral-100 pt-4 text-sm text-neutral-600">
              <p>دسته: <span className="font-medium text-neutral-900">{listing.category?.name}</span></p>
              {listing.condition && <p className="mt-1">وضعیت: <span className="font-medium text-neutral-900">{listing.condition}</span></p>}
            </div>
          </div>

          <ContactBox phone={listing.phone} />
        </div>
      </div>

      {/* آگهی‌های مشابه */}
      {similar.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-neutral-900">آگهی‌های مشابه</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}