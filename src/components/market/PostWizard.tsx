"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Upload, Check, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { getAuthToken, getAuthUser } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";

interface Category { id: string; name: string; slug: string; icon: string | null; }

const PROVINCES = [
  "تهران","البرز","اصفهان","فارس","خراسان رضوی","آذربایجان شرقی","آذربایجان غربی",
  "گیلان","مازندران","قم","کرمان","یزد","هرمزگان","سیستان و بلوچستان","خوزستان",
  "کرمانشاه","گلستان","مرکزی","قزوین","کردستان","لرستان","همدان","اردبیل","بوشهر",
  "سمنان","زنجان","ایلام","چهارمحال و بختیاری","کهگیلویه و بویراحمد","خراسان جنوبی","خراسان شمالی",
];

const CONDITIONS = ["نو", "در حد نو", "کارکرده", "نیازمند تعمیر"];

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function PostWizard({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // step 1
  const [categoryId, setCategoryId] = useState("");
  // step 2
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  // step 3
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [condition, setCondition] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const u = getAuthUser();
    if (u?.phone) setPhone(u.phone);
  }, []);

  async function uploadImages(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/market/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("آپلود تصویر ناموفق بود");
        const data = await res.json();
        newUrls.push(data.url);
      }
      setImages((prev) => [...prev, ...newUrls].slice(0, 8));
    } catch (e: any) {
      setError(e.message || "خطا در آپلود");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  }

  function canNext(): boolean {
    if (step === 1) return !!categoryId;
    if (step === 2) return true; // تصویر اختیاری
    if (step === 3) return !!title && !!description && !!phone;
    return true;
  }

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const token = getAuthToken();
      if (!token) throw new Error("لطفاً وارد شوید");

      const res = await fetch("/api/market/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title, description, price, negotiable, condition, province, city, phone, categoryId, images,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا در ثبت آگهی");
      router.push("/market/my-listings");
    } catch (e: any) {
      setError(e.message || "خطا در ثبت");
    } finally {
      setBusy(false);
    }
  }

  const selectedCat = categories.find((c) => c.id === categoryId);

  return (
    <div className="mx-auto max-w-2xl">
      {/* نوار پیشرفت */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1">
            <div className={
              "h-2 rounded-full " +
              (s <= step ? "bg-primary-600" : "bg-neutral-200")
            } />
            <p className={"mt-2 text-center text-xs " + (s === step ? "font-bold text-primary-700" : "text-neutral-500")}>
              {s === 1 ? "دسته" : s === 2 ? "تصویر" : s === 3 ? "جزئیات" : "بررسی"}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* مرحله ۱: دسته */}
      {step === 1 && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-neutral-900">دسته‌بندی آگهی را انتخاب کنید</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryId(c.id)}
                className={
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-fast " +
                  (categoryId === c.id
                    ? "border-primary-600 bg-primary-50"
                    : "border-neutral-200 bg-white hover:border-primary-300")
                }
              >
                <span className="text-2xl">{c.icon || "📦"}</span>
                <span className="text-sm font-medium text-neutral-800">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* مرحله ۲: تصویر */}
      {step === 2 && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-neutral-900">تصاویر آگهی</h2>
          <p className="mb-5 text-sm text-neutral-600">حداکثر ۸ تصویر (اختیاری اما توصیه‌شده)</p>

          <label className={
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 hover:border-primary-400 " +
            (uploading ? "pointer-events-none opacity-50" : "")
          }>
            {uploading ? (
              <Loader2 size={32} className="animate-spin text-primary-500" />
            ) : (
              <>
                <Upload size={32} className="text-neutral-400" />
                <span className="mt-2 text-sm font-medium text-neutral-600">کلیک کنید یا تصاویر را اینجا رها کنید</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => uploadImages(e.target.files)}
            />
          </label>

          {images.length > 0 && (
            <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {images.map((url, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={url} alt="" fill className="object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    aria-label="حذف"
                  >
                    <Trash2 size={14} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 right-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">اصلی</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* مرحله ۳: جزئیات */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-neutral-900">جزئیات آگهی</h2>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">عنوان آگهی *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              placeholder="مثال: کتاب حقوق مدنی دکتر کاتوزیان"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">توضیحات *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="وضعیت، ویژگی‌ها، تاریخ خرید و..."
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">قیمت (تومان)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="اختیاری"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="h-4 w-4 rounded" />
                قابل مذاکره
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">وضعیت کالا</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <option value="">انتخاب کنید</option>
              {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">استان</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                <option value="">انتخاب کنید</option>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">شهر</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="مثال: تهران"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">شماره تماس *</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              inputMode="tel"
              placeholder="09xxxxxxxxx"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>
      )}

      {/* مرحله ۴: بررسی */}
      {step === 4 && (
        <div>
          <h2 className="mb-5 text-xl font-bold text-neutral-900">بررسی و انتشار</h2>
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            {images.length > 0 && (
              <div className="relative aspect-video bg-neutral-100">
                <Image src={images[0]} alt={title} fill className="object-cover" />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
              <p className="mt-1 text-sm font-bold text-primary-600">
                {price ? `${toFa(price)} تومان` : "توافقی"}
                {negotiable && <span className="mr-2 text-xs text-neutral-500">(قابل مذاکره)</span>}
              </p>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-neutral-600">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-100 pt-4 text-xs text-neutral-600">
                <span className="rounded bg-neutral-100 px-2 py-1">{selectedCat?.icon} {selectedCat?.name}</span>
                {condition && <span className="rounded bg-neutral-100 px-2 py-1">{condition}</span>}
                {province && <span className="rounded bg-neutral-100 px-2 py-1">{province} - {city}</span>}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-accent-50 p-4 text-sm text-accent-800">
            💡 آگهی شما پس از بررسی توسط تیم افرا، معمولاً ظرف ۲۴ ساعت منتشر می‌شود.
          </div>
        </div>
      )}

      {/* دکمه‌ها */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <Button onClick={() => setStep(step - 1)} variant="ghost">
            <ArrowRight size={16} />
            مرحله قبل
          </Button>
        ) : <span />}

        {step < 4 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
            مرحله بعد
            <ArrowLeft size={16} />
          </Button>
        ) : (
          <Button onClick={submit} disabled={busy} variant="secondary">
            {busy ? <><Loader2 size={16} className="animate-spin" /> در حال ارسال...</> : <><Check size={16} /> ارسال برای بررسی</>}
          </Button>
        )}
      </div>
    </div>
  );
}