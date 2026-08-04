const BASE_URL = "https://my.mrotp.ir/api/OTP/v1";
const API_KEY = process.env.MROTP_API_KEY;

export function generateOtpCode(): string {
  return String(Math.floor(10000 + Math.random() * 90000));
}

function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("98") && cleaned.length === 12) return "0" + cleaned.slice(2);
  if (cleaned.startsWith("9") && cleaned.length === 10) return "0" + cleaned;
  return cleaned;
}

export async function sendOtpSms(
  phone: string,
  code: string
): Promise<{ ok: boolean; error?: string }> {
  if (!API_KEY) {
    console.warn("[otp] MROTP_API_KEY missing — dev code:", code);
    return { ok: true };
  }

  const mobile = normalizePhone(phone);
  if (!/^09\d{9}$/.test(mobile)) {
    return { ok: false, error: "شماره موبایل معتبر نیست" };
  }

  try {
    const body = new URLSearchParams({
      apiKey: API_KEY,
      mobile,
      OTP: code,
      validTime: "5",
      type: "SMS",
    });

    const res = await fetch(`${BASE_URL}/setOTP`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const text = await res.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      return { ok: false, error: `پاسخ نامعتبر mrotp: ${text.slice(0, 200)}` };
    }

    console.log("[otp] mrotp:", data);

    if (data.code && Number(data.code) > 100) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data.message || `خطای mrotp code=${data.code ?? "?"}`,
    };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
