import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | My App",
    default: "My App",
  },
  description: "Built with Next.js 16 and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="bg-(--color-background) text-(--color-foreground) antialiased">
        {children}
      </body>
    </html>
  );
}
