# باشگاه وکلای افرا (Afra Lawyers Club)

اسکلت کامل پلتفرم — فرانت‌اند و بک‌اند در یک پروژه Next.js 14 (App Router).
مطابق `MASTER_PROMPT.md` ساخته شده: صفحات، Design System، دیتابیس و API endpointها.

## معماری

این پروژه فرانت‌اند و بک‌اند را در **یک** ریپازیتوری Next.js نگه می‌دارد:

- **فرانت‌اند** → `src/app/(public)` و `src/app/(dashboard)` (صفحات React/Server Components)
- **بک‌اند** → `src/app/api/**` (API Routes — همان چیزی که در بخش ۹ Master Prompt به عنوان API Specification آمده)
- **دیتابیس** → `prisma/schema.prisma` روی Supabase Postgres

این ساختار دقیقاً با پیشنهاد خود سند (Next.js API Routes + Vercel + Supabase) هم‌خوان است، و چون شما همین حالا یک ریپوی گیت‌هاب متصل به Vercel دارید، فقط کافیست کل این پوشه را push کنید — نیازی به پروژه/سرویس جدا برای بک‌اند نیست.

## ساختار پوشه‌ها

```
src/
  app/
    (public)/        صفحات عمومی: صفحه اصلی، دوره‌ها، خدمات، کتابخانه، ورود/ثبت‌نام و ...
    (dashboard)/     پنل عضو (/dashboard) و داشبورد وکیل (/lawyer)
    api/             تمام endpointهای بک‌اند
  components/        ui, layout, course, ai, dashboard
  lib/                prisma, supabase, auth (jwt), otp (mrotp.ir), ai/core, sample-data
  types/              تایپ‌های مشترک
prisma/schema.prisma  اسکیمای کامل دیتابیس
```

## مراحل راه‌اندازی

### ۱) نصب و اجرای محلی

```bash
npm install
cp .env.example .env
# مقادیر .env را طبق راهنمای زیر پر کنید
npm run db:generate
npm run db:push
npm run dev
```

### ۲) اتصال دیتابیس به Supabase

1. در پروژه Supabase خودتان: **Project Settings → Database → Connection string** را باز کنید.
2. مقدار `DATABASE_URL` و `DIRECT_URL` را در `.env` بگذارید (فرمت در `.env.example` آمده).
3. `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` را از **Project Settings → API** بردارید.
4. `SUPABASE_SERVICE_ROLE_KEY` را هم از همان صفحه (فقط سمت سرور استفاده می‌شود، هرگز در کلاینت).
5. اجرا کنید: `npm run db:push` تا جدول‌های `prisma/schema.prisma` روی Supabase ساخته شوند.
6. برای آپلود فایل (تصویر پروانه وکالت، فایل قرارداد)، در Supabase Storage سه Bucket بسازید:
   `license-images`, `contract-files`, `course-images` (نام‌ها در `src/lib/db/supabase.ts` تعریف شده‌اند).

> چرا هم Prisma هم Supabase JS؟ Prisma برای مدل‌های اصلی (کاربر، دوره، اشتراک، ...) و Supabase JS فقط برای Storage/Realtime. می‌توانید کاملاً روی Prisma بمانید و Supabase JS را فقط برای Storage نگه دارید.

### ۳) اتصال OTP — mrotp.ir

فایل `src/lib/otp.ts` یک wrapper آماده ارسال کد دارد، اما چون ساختار دقیق endpoint حساب شما در mrotp.ir در این سند نبود:

1. `MROTP_API_KEY`, `MROTP_BASE_URL`, `MROTP_SENDER_LINE` را از پنل mrotp.ir در `.env` بگذارید.
2. مسیر و بدنه‌ی درخواست داخل `sendOtpSms()` را طبق مستندات API دقیق حساب خودتان تنظیم کنید (جای دقیق آن با کامنت `TODO` مشخص شده).

جریان فعلی OTP:
- `POST /api/auth/register` → کاربر می‌سازد و کد اول را می‌فرستد
- `POST /api/auth/login` بدون `otp` → کد جدید می‌فرستد
- `POST /api/auth/login` با `otp` → کد را چک و JWT صادر می‌کند

### ۴) اتصال هوش مصنوعی

طبق تصمیم شما، معماری این بخش (بخش ۷ Master Prompt) در `src/lib/ai/core.ts` پیاده شده — پرامپت‌های سیستمی، ثبت لاگ هر درخواست در جدول `ai_requests` (برای Analytics/Cost tracking) و ساختار ورودی/خروجی هر endpoint. تنها بخشی که باقی مانده، صدا زدن مدل واقعی است؛ محل دقیق آن با یک بلوک کامنت `TODO` در همان فایل مشخص شده (نمونه‌ی آماده برای OpenAI هم به صورت کامنت گذاشته شده).

### ۵) Deploy روی Vercel + دامنه afralawyersclub.ir

1. این پوشه را به همان ریپوی گیت‌هابی که به Vercel متصل است push کنید.
2. در Vercel Dashboard → پروژه → **Settings → Environment Variables**: تمام مقادیر `.env` را اضافه کنید (برای Production و Preview).
3. Vercel به‌صورت خودکار Next.js را تشخیص و build می‌کند؛ Build Command و Output نیازی به تغییر ندارد.
4. در **Settings → Domains** دامنه `afralawyersclub.ir` را اضافه کنید و رکوردهای DNS پیشنهادی Vercel (معمولاً یک رکورد `A` یا `CNAME`) را در پنل دامنه خودتان تنظیم کنید.
5. بعد از اولین deploy موفق: `npm run db:push` را یک‌بار به صورت لوکال (با همان `DATABASE_URL` پروداکشن) اجرا کنید تا جدول‌ها روی Supabase پروداکشن ساخته شوند.

## نکات امنیتی پیاده‌شده (بخش ۱۴)

- JWT برای نشست کاربر (`src/lib/auth.ts`)
- OTP برای ورود (بدون پسورد)
- RBAC ساده: بررسی نقش (`lawyer`/`admin`) روی endpointهای AI حقوقی (`src/lib/api-guard.ts`) طبق ماتریس دسترسی بخش ۶.۱
- `SUPABASE_SERVICE_ROLE_KEY` فقط در کد سمت سرور استفاده می‌شود

## آنچه هنوز باید تکمیل شود

- اتصال واقعی مدل AI در `src/lib/ai/core.ts` (طبق تصمیم شما — کد را خودتان اضافه می‌کنید)
- تکمیل دقیق endpoint سرویس mrotp.ir در `src/lib/otp.ts`
- درگاه پرداخت برای بخش اشتراک/فاکتور (بخش ۶ Task List، فاز ۶)
- Middleware کامل RBAC برای محافظت از صفحات داشبورد در سمت سرور (فعلاً فقط API routeها محافظت شده‌اند)
