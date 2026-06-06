import "server-only";
// MVP 1 — static mock data instead of Firestore.
// Swap this file with the Firebase implementation when credentials are ready.

import type { Product } from "@/types/product";

export interface ProductFilters {
  category?: string;
  search?: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "ผ้าไหมไทย — ลายดอกไม้",
    slug: "thai-silk-scarf-floral",
    description:
      "ผ้าไหมแท้จากจังหวัดสุรินทร์ ทอมือด้วยภูมิปัญญาท้องถิ่น ลายดอกไม้สีสดใส เนื้อนุ่มลื่น เหมาะสำหรับเป็นของขวัญพิเศษหรือใช้งานประจำวัน",
    price: 1500,
    images: [
      "https://picsum.photos/seed/silk-scarf/600/600",
      "https://picsum.photos/seed/silk-scarf-2/600/600",
    ],
    category: "สิ่งทอ",
    stock: 25,
    createdAt: new Date("2026-06-01"),
  },
  {
    id: "prod-002",
    name: "แจกันเซรามิคลายไทย",
    slug: "thai-ceramic-vase",
    description:
      "แจกันเซรามิคทาสีมือ ลวดลายไทยประยุกต์ เคลือบด้วยเทคนิคพิเศษ ให้ผิวเงาสวยงามทนทาน สูง 30 ซม. เหมาะสำหรับตกแต่งบ้านและออฟฟิศ",
    price: 2800,
    images: [
      "https://picsum.photos/seed/ceramic-vase/600/600",
      "https://picsum.photos/seed/ceramic-vase-2/600/600",
    ],
    category: "ของแต่งบ้าน",
    stock: 12,
    createdAt: new Date("2026-06-01"),
  },
  {
    id: "prod-003",
    name: "ชาเขียวไทยออร์แกนิค",
    slug: "organic-thai-green-tea",
    description:
      "ชาเขียวออร์แกนิคจากไร่ชาบนดอยสูง จังหวัดเชียงราย ปลูกโดยไม่ใช้สารเคมี คัดเฉพาะยอดอ่อนคุณภาพสูง อุดมด้วยสารต้านอนุมูลอิสระ บรรจุ 100 กรัม",
    price: 350,
    images: ["https://picsum.photos/seed/green-tea/600/600"],
    category: "เครื่องดื่ม",
    stock: 80,
    createdAt: new Date("2026-06-01"),
  },
  {
    id: "prod-004",
    name: "ช้างแกะสลักไม้สักทอง",
    slug: "teak-elephant-carving",
    description:
      "ช้างแกะสลักจากไม้สักทองแท้ ฝีมือช่างท้องถิ่นเชียงใหม่ ผ่านการขัดและเคลือบน้ำมันธรรมชาติ ขนาด 15×20 ซม. เหมาะเป็นของฝากและของสะสม",
    price: 4500,
    images: [
      "https://picsum.photos/seed/elephant-carving/600/600",
      "https://picsum.photos/seed/elephant-carving-2/600/600",
    ],
    category: "งานหัตถกรรม",
    stock: 8,
    createdAt: new Date("2026-06-01"),
  },
  {
    id: "prod-005",
    name: "เสื้อไหมไทยสไตล์โมเดิร์น",
    slug: "modern-thai-silk-shirt",
    description:
      "เสื้อไหมไทยตัดเย็บสไตล์คอนเทมโพรารี ผสมผสานลวดลายไทยดั้งเดิมกับดีไซน์ทันสมัย เนื้อผ้านุ่มระบายอากาศได้ดี มีให้เลือกทั้ง S, M, L, XL",
    price: 3200,
    images: [
      "https://picsum.photos/seed/silk-shirt/600/600",
      "https://picsum.photos/seed/silk-shirt-2/600/600",
    ],
    category: "เครื่องแต่งกาย",
    stock: 30,
    createdAt: new Date("2026-06-01"),
  },
  {
    id: "prod-006",
    name: "ชามเสิร์ฟกะลามะพร้าว",
    slug: "coconut-shell-serving-bowl",
    description:
      "ชามเสิร์ฟทำจากกะลามะพร้าวธรรมชาติ ขัดเงาและเคลือบสารอาหารปลอดภัย ขนาดเส้นผ่าศูนย์กลาง 15 ซม. เหมาะสำหรับเสิร์ฟอาหาร ผลไม้ หรือใช้เป็นของตกแต่ง",
    price: 890,
    images: ["https://picsum.photos/seed/coconut-bowl/600/600"],
    category: "ครัว",
    stock: 50,
    createdAt: new Date("2026-06-01"),
  },
];

export async function getProducts(
  filters?: ProductFilters
): Promise<Product[]> {
  let products = [...MOCK_PRODUCTS];

  if (filters?.category) {
    products = products.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
}
