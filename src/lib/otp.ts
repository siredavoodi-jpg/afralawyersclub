/**
 * سرویس OTP — mrotp.ir
 * مستندات: https://mrotp.ir/USSD-OTP-help
 * Endpoint پایه: https://my.mrotp.ir/api/OTP/v1/
 */

const BASE_URL = "https://my.mrotp.ir/api/OTP/v1";
const API_KEY = process.env.MROTP_API_KEY;

export function generateOtpCode(): string {
  // فقط برای حالت توسعه (وقتی API_KEY نباشد)
  return String(Math.floor(10000 + Math.random() * 90000)); // ۵ رقم
}

/**
 * ارسال کد یکبارمصرف
 * از setRandomOTP استفاده می‌کند تا خود سرویس کد را تولید و ارسال کند.
 */
export async function sendOtpSms(
  phone: string,
  _code?: string // دیگر نیازی به کد از سمت ما نیست
): Promise<{ ok: boolean; otp?: string; ussd?: string; error?: string }> {
  if (!API_KEY) {
    const fallback = generateOtpCode();
    console.warn("[otp] MROTP_API_KEY تنظیم نشده — کد توسعه:", fallback);
    return { ok: true, otp: fallback };
  }

  // نرمال‌سازی شماره به فرمت 09xxxxxxxxx
  const mobile = phone.replace(/\D/g, "").replace(/^98/, "0");
  if (!/^09\d{9}$/.test(mobile)) {
    return { ok: false, error: "شماره موبایل معتبر نیست" };
  }

  try {
    const form = new FormData();
    form.append("apiKey", API_KEY);
    form.append("mobile", mobile);
    form.append("length", "5");
    form.append("validTime", "5"); // ۵ دقیقه
    form.append("type", "SMS"); // یا "USSD" برای هزینه کمتر

    const res = await fetch(`${BASE_URL}/setRandomOTP`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    // کدهای موفقیت mrotp معمولاً > 100 هستند
    if (data.code && Number(data.code) > 100) {
      return {
        ok: true,
        otp: String(data.OTP),
        ussd: data.USSD,
      };
    }

    return {
      ok: false,
      error: data.message || `خطای mrotp: ${data.code}`,
    };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * تأیید کد وارد شده توسط کاربر
 */
export async function verifyOtp(
  phone: string,
  otp: string
): Promise<{ ok: boolean; error?: string }> {
  if (!API_KEY) {
    // حالت توسعه: هر کدی را قبول می‌کنیم (یا فقط کد لاگ‌شده)
    return { ok: true };
  }

  const mobile = phone.replace(/\D/g, "").replace(/^98/, "0");

  try {
    const form = new FormData();
    form.append("apiKey", API_KEY);
    form.append("mobile", mobile);
    form.append("OTP", otp);

    const res = await fetch(`${BASE_URL}/verifyOTP`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.accept === "YES") {
      return { ok: true };
    }

    return {
      ok: false,
      error: data.message || "کد نامعتبر یا منقضی شده است",
    };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
