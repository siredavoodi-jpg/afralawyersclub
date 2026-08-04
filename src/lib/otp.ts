/**
 * سرویس OTP — mrotp.ir
 * مستندات: https://mrotp.ir/USSD-OTP-help
 * با جریان فعلی auth (تولید کد سمت ما + ذخیره در otp_codes) سازگار است.
 */

const BASE_URL = "https://my.mrotp.ir/api/OTP/v1";
const API_KEY = process.env.MROTP_API_KEY;

export function generateOtpCode(): string {
  return String(Math.floor(10000 + Math.random() * 90000)); // ۵ رقم
}

function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("98") && cleaned.length === 12) return "0" + cleaned.slice(2);
  if (cleaned.startsWith("9") && cleaned.length === 10) return "0" + cleaned;
  return cleaned;
}

/**
 * ثبت و ارسال کد تولید‌شده توسط ما روی mrotp (تابع setOTP)
 */
export async function sendOtpSms(
  phone: string,
  code: string
): Promise<{ ok: boolean; error?: string }> {
  if (!API_KEY) {
    console.warn("[otp] MROTP_API_KEY تنظیم نشده — کد توسعه:", code);
    return { ok: true };
  }

  const mobile = normalizePhone(phone);
  if (!/^09\d{9}$/.test(mobile)) {
    return { ok: false, error: "شماره موبایل معتبر نیست" };
  }

  try {
    const form = new FormData();
    form.append("apiKey", API_KEY);
    form.append("mobile", mobile);
    form.append("OTP", code);
    form.append("validTime", "5"); // ۵ دقیقه
    form.append("type", "SMS"); // یا "USSD"

    const res = await fetch(`${BASE_URL}/setOTP`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    // موفقیت: code > 100
    if (data.code && Number(data.code) > 100) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data.message || `خطای mrotp: ${data.code ?? "unknown"}`,
    };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
