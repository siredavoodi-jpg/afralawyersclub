/**
 * رابط سرویس OTP - mrotp.ir
 *
 * این فایل یک wrapper نازک روی API سرویس mrotp.ir است.
 * چون ساختار دقیق endpoint و پارامترهای mrotp.ir در این سند مشخص نشده،
 * توابع زیر را با مستندات رسمی حساب خودتان در mrotp.ir تطبیق دهید
 * (معمولاً این سرویس‌ها یک endpoint برای ارسال کد و یک endpoint/کد پیش‌فرض دارند).
 *
 * TODO: مقادیر MROTP_API_KEY / MROTP_BASE_URL / MROTP_SENDER_LINE را
 * در .env از پنل mrotp.ir بردارید و اینجا مطابق مستندات API آن‌ها
 * مسیر و بدنه‌ی درخواست را نهایی کنید.
 */

const BASE_URL = process.env.MROTP_BASE_URL || "https://api.mrotp.ir";
const API_KEY = process.env.MROTP_API_KEY;

export function generateOtpCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function sendOtpSms(phone: string, code: string): Promise<{ ok: boolean; error?: string }> {
  if (!API_KEY) {
    console.warn("[otp] MROTP_API_KEY تنظیم نشده — کد فقط در لاگ نمایش داده می‌شود:", code);
    return { ok: true };
  }

  try {
    // TODO: این بخش را مطابق مستندات دقیق API مربوط به اکانت mrotp.ir شما تنظیم کنید.
    const res = await fetch(`${BASE_URL}/v1/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        receptor: phone,
        code,
        sender: process.env.MROTP_SENDER_LINE,
      }),
    });

    if (!res.ok) {
      return { ok: false, error: `mrotp respond with status ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
