// app/page.tsx
import { db } from "@/lib/prisma";
import ProductPageClient from "./components/product-page-client";

export default async function ProductPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ProductPageClient products={products} />;
}
