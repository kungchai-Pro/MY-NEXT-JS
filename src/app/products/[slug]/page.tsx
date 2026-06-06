import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/repositories/productRepository";
import { PriceTag } from "@/components/PriceTag";
import { AddToCartButton } from "./AddToCartButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "ไม่พบสินค้า" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const mainImage = product.images[0] ?? "https://picsum.photos/seed/placeholder/600/600";

  return (
    <div className="space-y-6">
      <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-brand-600 transition-colors">หน้าแรก</Link></li>
          <li aria-hidden="true">›</li>
          <li><Link href="/products" className="hover:text-brand-600 transition-colors">สินค้า</Link></li>
          <li aria-hidden="true">›</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200"
                >
                  <Image
                    src={img}
                    alt={`${product.name} รูปที่ ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              {product.category}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <PriceTag
            amount={product.price}
            className="text-3xl font-extrabold text-brand-700"
          />

          <p className="text-sm leading-relaxed text-gray-600">
            {product.description}
          </p>

          <AddToCartButton
            productId={product.id}
            name={product.name}
            price={product.price}
            image={mainImage}
            stock={product.stock}
          />

          <div className="rounded-xl bg-gray-50 p-4 text-xs text-gray-500 space-y-1">
            <p>✓ จัดส่งทั่วประเทศ</p>
            <p>✓ ชำระเงินปลายทางได้</p>
            <p>✓ คืนสินค้าภายใน 7 วัน</p>
          </div>
        </div>
      </div>
    </div>
  );
}
