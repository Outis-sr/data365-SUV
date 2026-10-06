import type { Metadata, Viewport } from "next";
import { Geist, Inter_Tight } from "next/font/google";
import "./globals.css";
import "./showcase.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "data365 SUV — suv yetkazib berish biznesini boshqarish tizimi",
  description:
    "Buyurtma, mijoz, ombor, yetkazib berish va to‘lovlar — barchasi bitta tizimda.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${geist.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
