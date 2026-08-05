import { createClient } from "@supabase/supabase-js";

/**
 * دو راه برای کار با Supabase در این پروژه وجود دارد:
 * ۱) Prisma (پیش‌فرض) → schema.prisma + DATABASE_URL از Supabase Postgres
 * ۲) این کلاینت Supabase JS → برای Storage (آپلود تصویر پروانه/قرارداد)
 *    و برای query‌های سریع بدون نیاز به مهاجرت Prisma.
 *
 * توصیه: از Prisma برای مدل‌های اصلی (User, Course, Subscription, ...)
 * و از این کلاینت فقط برای Storage و Realtime استفاده کنید.
 */

// کلاینت سمت مرورگر (با anon key - محدود به RLS)
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// کلاینت سمت سرور (با service role - فقط در API routes استفاده شود، هرگز در کلاینت)
export function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export const STORAGE_BUCKETS = {
  licenseImages: "license-images",
  contractFiles: "contract-files",
  courseImages: "course-images",
} as const;
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);