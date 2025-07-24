// app/page.tsx
import { db } from "@/lib/prisma";
import ProductPageClient from "./components/product-page-client";

export default async function ProductPage() {
  // Busca os produtos do banco ordenados por data de criação (mais novos primeiro)
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Renderiza o componente client com os produtos
  return <ProductPageClient products={products} />;
}
