import Link from "next/link";
import { Search, Plus, Store } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { ListingCard } from "@/components/market/ListingCard";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "افرا مارکت | بازارچه تخصصی وکلا" };

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default async function MarketHomePage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const q = searchParams.q?.trim() || "";
  const categorySlug = searchParams.category || "";

  const categories = await prisma.marketCategory.findMany({
    where: { parentId: null },
    include: { _count: { select: { listings: true } } },
    orderBy: { name: "asc" },
  });

  const listings = await prisma.marketListing.findMany({
    where: {
      status: "published",
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      ...(q ? { OR: [{ title: { contains: q } }, { description: { contains: q } }] } : {}),
    },
    include: { images: true, category: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return (
    <>
      {/* Hero + جستجو */}
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700">
            <Store size={16} aria-hidden />
            بازارچه تخصصی وکلای ایران
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
            افرا <span className="text-primary-600">مارکت</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-neutral-600">
            خرید و فروش کتاب، تجهیزات دفتر، اجاره و انتقال دفتر وکالت — فقط بین وکلای احراز هویت‌شده
          </p>

          <form action="/market" method="GET" className="mx-auto mt-8 flex max-w-xl gap-2">
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            <div className="relative flex-1">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="جستجو در آگهی‌ها…"
                className="w-full rounded-full border border-neutral-300 bg-white py-3 pl-4 pr-11 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <Search size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden />
            </div>
            <button type="submit" className="rounded-full bg-primary-600 px-6 py-3 text-sm font-bold text-white hover:bg-primary-700">
              جستجو
            </button>
          </form>

          <div className="mt-6">
            <ButtonLink href="/market/post" variant="secondary" size="lg">
              <Plus size={17} aria-hidden />
              ثبت آگهی (ویژه وکلا)
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* دسته‌بندی‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-neutral-900">دسته‌بندی‌ها</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/market"
            className={
              "rounded-full border px-4 py-2 text-sm font-medium " +
              (!categorySlug ? "border-primary-600 bg-primary-600 text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300")
            }
          >
            همه
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/market?category=${c.slug}${q ? `&q=${q}` : ""}`}
              className={
                "rounded-full border px-4 py-2 text-sm font-medium " +
                (categorySlug === c.slug ? "border-primary-600 bg-primary-600 text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300")
              }
            >
              {c.icon} {c.name}
              <span className="mr-1 text-xs opacity-70">({toFa(c._count.listings)})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* آگهی‌ها */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900">
            {q ? `نتایج جستجو برای «${q}»` : "جدیدترین آگهی‌ها"}
          </h2>
          <span className="text-sm text-neutral-500">{toFa(listings.length)} آگهی</span>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-neutral-600">هنوز آگهی‌ای ثبت نشده است.</p>
            <p className="mt-2 text-sm text-neutral-500">اولین نفری باشید که آگهی ثبت می‌کند!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}