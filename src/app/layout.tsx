import type { Metadata } from "next";
import { Vazirmatn, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-vazirmatn",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "باشگاه وکلای افرا | آموزش AI و خدمات حقوقی هوشمند",
  description:
    "پلتفرم تخصصی آموزش هوش مصنوعی به وکلا و ارائه خدمات حقوقی مبتنی بر AI",
  keywords: ["وکالت", "هوش مصنوعی", "حقوق", "AI", "دادخواست", "تحلیل پرونده"],
  metadataBase: new URL("https://afralawyersclub.ir"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
