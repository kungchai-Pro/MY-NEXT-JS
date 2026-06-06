"use client";
// "use client" is required because the add-to-cart button reads CartContext.

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { PriceTag } from "@/components/PriceTag";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  image,
  category,
}: ProductCardProps) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({ productId: id, name, price, qty: 1, image });
  }

  return (
    <article className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link href={`/products/${slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={image || "https://picsum.photos/seed/placeholder/400/400"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="flex flex-col flex-1 gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-brand-600">
          {category}
        </span>
        <Link
          href={`/products/${slug}`}
          className="text-sm font-semibold text-gray-900 leading-snug hover:text-brand-600 transition-colors line-clamp-2"
        >
          {name}
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <PriceTag amount={price} className="text-base font-bold text-gray-900" />
          <button
            onClick={handleAddToCart}
            className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 active:scale-95 transition-all"
          >
            ใส่ตะกร้า
          </button>
        </div>
      </div>
    </article>
  );
}
