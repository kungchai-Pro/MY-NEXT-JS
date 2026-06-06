import type { Metadata } from "next";

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">My App</h1>
      <p className="text-(--color-muted)">พร้อมแล้ว 🚀</p>
    </main>
  );
}
