import Image from "next/image";
import Link from "next/link";

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export function ListingCard({ listing }: { listing: any }) {
  const img = listing.images?.[0]?.url;
  return (
    <Link href={`/market/listing/${listing.id}`} className="block">
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition-fast hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-video bg-neutral-100">
          {img ? (
            <Image src={img} alt={listing.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">بدون تصویر</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="line-clamp-1 font-bold text-neutral-900">{listing.title}</h3>
          <p className="mt-1 text-sm font-bold text-primary-600">
            {listing.price ? `${toFa(listing.price)} تومان` : "توافقی"}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
            <span>{listing.category?.name}</span>
            <span>{listing.city || ""}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}