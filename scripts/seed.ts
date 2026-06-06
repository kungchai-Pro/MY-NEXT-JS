/**
 * Seed script — inserts 6 sample Thai products into Firestore.
 * Usage: pnpm seed
 * Requires FIREBASE_ADMIN_BASE64 in .env.local (or environment).
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0]!;

  const encoded = process.env.FIREBASE_ADMIN_BASE64;
  if (!encoded) {
    console.error("❌  FIREBASE_ADMIN_BASE64 is not set in .env.local");
    process.exit(1);
  }

  const serviceAccount = JSON.parse(
    Buffer.from(encoded, "base64").toString("utf-8")
  ) as Parameters<typeof cert>[0];

  return initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore(getAdminApp());

interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  createdAt: Timestamp;
}

const products: SeedProduct[] = [
  {
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
    createdAt: Timestamp.now(),
  },
  {
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
    createdAt: Timestamp.now(),
  },
  {
    name: "ชาเขียวไทยออร์แกนิค",
    slug: "organic-thai-green-tea",
    description:
      "ชาเขียวออร์แกนิคจากไร่ชาบนดอยสูง จังหวัดเชียงราย ปลูกโดยไม่ใช้สารเคมี คัดเฉพาะยอดอ่อนคุณภาพสูง อุดมด้วยสารต้านอนุมูลอิสระ บรรจุ 100 กรัม",
    price: 350,
    images: [
      "https://picsum.photos/seed/green-tea/600/600",
    ],
    category: "เครื่องดื่ม",
    stock: 80,
    createdAt: Timestamp.now(),
  },
  {
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
    createdAt: Timestamp.now(),
  },
  {
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
    createdAt: Timestamp.now(),
  },
  {
    name: "ชามเสิร์ฟกะลามะพร้าว",
    slug: "coconut-shell-serving-bowl",
    description:
      "ชามเสิร์ฟทำจากกะลามะพร้าวธรรมชาติ ขัดเงาและเคลือบสารอาหารปลอดภัย ขนาดเส้นผ่าศูนย์กลาง 15 ซม. เหมาะสำหรับเสิร์ฟอาหาร ผลไม้ หรือใช้เป็นของตกแต่ง",
    price: 890,
    images: [
      "https://picsum.photos/seed/coconut-bowl/600/600",
    ],
    category: "ครัว",
    stock: 50,
    createdAt: Timestamp.now(),
  },
];

async function seed() {
  console.log(`🌱  Seeding ${products.length} products…\n`);

  for (const product of products) {
    // Upsert by slug so running the script twice is idempotent.
    const existing = await db
      .collection("products")
      .where("slug", "==", product.slug)
      .limit(1)
      .get();

    if (!existing.empty) {
      console.log(`   ⏭  Skipped  "${product.name}" (already exists)`);
      continue;
    }

    const ref = await db.collection("products").add(product);
    console.log(`   ✅  Created  "${product.name}"  →  ${ref.id}`);
  }

  console.log("\n🎉  Seed complete!");
  process.exit(0);
}

seed().catch((err: unknown) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
