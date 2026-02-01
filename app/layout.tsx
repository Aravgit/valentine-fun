import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AppStateProvider } from "@/components/providers/AppStateProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentine's Day Surprise",
  description: "A special Valentine's Day treasure hunt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
