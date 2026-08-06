import type { Metadata } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "باشگاه وکلای افرا | هوش مصنوعی در خدمت جامعه وکالت",
  description:
    "داشبورد هوشمند، ابزارهای AI و دوره‌های تخصصی برای وکلا، کارآموزان و دانشجویان حقوق",
  keywords: [
    "هوش مصنوعی حقوقی",
    "آموزش وکالت",
    "داشبورد وکیل",
    "باشگاه وکلای افرا",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${inter.variable}`}
    >
      <body className="bg-base font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}