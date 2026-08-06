import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client"; // ✅ اضافه شدن import از prisma

export interface AuthTokenPayload {
  userId: string;
  phone: string;
  role: UserRole; // ✅ استفاده از UserRole به جای لیست دستی "guest" | "member" ...
}

const SECRET = process.env.JWT_SECRET as string;
const EXPIRES_IN_SECONDS = 30 * 24 * 60 * 60; // 30 روز بر حسب ثانیه

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN_SECONDS });
}