import jwt from "jsonwebtoken";

export interface AuthTokenPayload {
  userId: string;
  phone: string;
  role: "guest" | "member" | "lawyer" | "admin";
}

const SECRET = process.env.JWT_SECRET as string;
const EXPIRES_IN_SECONDS = 30 * 24 * 60 * 60; // 30 روز بر حسب ثانیه

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN_SECONDS });
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
}

// استخراج توکن از هدر Authorization: Bearer {token}
export function getTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}