import { getProducts } from "@/lib/repositories/productRepository";
import { ProductCard } from "@/components/ProductCard";

export const metadata = { title: "สินค้าทั้งหมด" };

const CATEGORIES = [
  "ทั้งหมด",
  "สิ่งทอ",
  "ของแต่งบ้าน",
  "เครื่องดื่ม",
  "งานหัตถกรรม",
  "เครื่องแต่งกาย",
  "ครัว",
];

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { q, category } = await searchParams;
  const activeCategory = category && category !== "ทั้งหมด" ? category : undefined;

  const products = await getProducts({ search: q, category: activeCategory });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">สินค้าทั้งหมด</h1>
        <p className="mt-1 text-sm text-gray-500">
          {products.length} รายการ
          {q ? ` สำหรับ "${q}"` : ""}
        </p>
      </div>

      {/* Search + category filter */}
      <form method="GET" className="flex flex-col gap-4 sm:flex-row">
        <input
          name="q"
          type="search"
          defaultValue={q}
          placeholder="ค้นหาสินค้า..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive =
              cat === "ทั้งหมด" ? !activeCategory : cat === activeCategory;
            return (
              <button
                key={cat}
                name="category"
                value={cat === "ทั้งหมด" ? "" : cat}
                type="submit"
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-brand-400 hover:text-brand-600"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </form>

      {/* Product grid */}
      {products.length === 0 ? (
        <p className="py-20 text-center text-gray-500">ไม่พบสินค้าที่ค้นหา</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
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
    </div>
  );
}
