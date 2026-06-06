import Link from "next/link";
import { getProducts } from "@/lib/repositories/productRepository";
import { ProductCard } from "@/components/ProductCard";

export const metadata = { title: "หน้าแรก" };

export default async function HomePage() {
  // Show up to 8 featured products on the homepage.
  const products = await getProducts();
  const featured = products.slice(0, 8);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-2xl bg-brand-600 px-8 py-16 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          ของดีจากไทย
        </h1>
        <p className="mt-4 text-lg text-brand-100">
          สินค้าคุณภาพพรีเมียม คัดสรรมาเพื่อคุณ
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-brand-700 shadow hover:shadow-md active:scale-95 transition-all"
        >
          ดูสินค้าทั้งหมด →
        </Link>
      </section>

      {/* Featured products grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">สินค้าแนะนำ</h2>
          <Link
            href="/products"
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            ดูทั้งหมด →
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            ยังไม่มีสินค้า — รัน{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">
              pnpm seed
            </code>{" "}
            เพื่อเพิ่มสินค้าตัวอย่าง
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                image={p.images[0] ?? ""}
                category={p.category}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
