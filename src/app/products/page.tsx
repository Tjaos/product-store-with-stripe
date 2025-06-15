import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/prisma";
import ProductCard from "./components/product-card";

export default async function ProductPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-6 md:px-10 pb-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-6 border-gray-300">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Acesse Todos os Cursos
            </h1>
            <p className="text-gray-600 mt-2">
              Assine a plataforma e libere o acesso a todos os cursos
              disponíveis.
            </p>
          </div>

          <form action="/api/subscribe" method="POST">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-all"
            >
              Assinar Plataforma
            </button>
          </form>
        </div>

        {/* Lista de cursos */}
        <ScrollArea className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                Nenhum curso disponível no momento.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
