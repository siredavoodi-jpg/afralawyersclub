import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "باشگاه وکلای افرا | هوش مصنوعی در خدمت جامعه وکالت",
  description: "داشبورد هوشمند، ابزارهای AI و دوره‌های تخصصی برای وکلا، کارآموزان و دانشجویان حقوق",
  keywords: ["هوش مصنوعی حقوقی", "آموزش وکالت", "داشبورد وکیل", "باشگاه وکلای افرا"],
  icons: {
    icon: [
      { url: "/icon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.png", sizes: "98x98", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}