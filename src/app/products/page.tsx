import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/prisma";
import ProductCard from "./components/product-card";

export default async function ProductPage() {
  const product = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-32 flex flex-col">
      <h1 className="text-3xl text-center font-bold pb-5 border-b-gray-800 border-b-2">
        PRODUTOS
      </h1>

      <ScrollArea className="w-full pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10">
          {product.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
