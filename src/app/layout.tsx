import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tagylym - Онлайн образовательная платформа",
  description: "Tagylym - бесплатная онлайн образовательная платформа для изучения робототехники и программирования. FTC, FIRST CODING и другие курсы.",
  keywords: ["образование", "робототехника", "программирование", "FTC", "FIRST", "онлайн курсы", "Tagylym"],
  authors: [{ name: "Tagylym Team" }],
  openGraph: {
    title: "Tagylym - Онлайн образовательная платформа",
    description: "Бесплатная онлайн образовательная платформа для изучения робототехники и программирования",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
