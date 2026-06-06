import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShopNext — ร้านค้าออนไลน์",
    template: "%s | ShopNext",
  },
  description: "ของดีจากไทย ส่งตรงถึงบ้านคุณ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
