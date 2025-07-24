"use client";

import { useSession, signOut } from "next-auth/react";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
};

export default function ProductPageClient({
  products,
}: {
  products: Product[];
}) {
  const { data: session } = useSession();
  const isSubscribed = session?.user?.isSubscribed;

  const handleSubscribe: () => Promise<void> = async () => {
    const res = await fetch("/api/subscribe", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erro ao redirecionar para o checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-4 sm:px-6 md:px-10 pb-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Cabeçalho com título e botão de sair */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b pb-8 border-gray-300">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {isSubscribed
                ? "Acesse Seus Cursos"
                : "Obtenha acesso a todos os cursos com uma assinatura mensal"}
            </h1>
            <p className="text-gray-600 mt-2">
              {isSubscribed
                ? "Sua assinatura permite acesso total a todos os cursos."
                : "Assine a plataforma e libere o acesso a todos os cursos disponíveis."}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {!isSubscribed && (
              <button
                onClick={handleSubscribe}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-all"
              >
                Assinar Plataforma
              </button>
            )}

            <Button
              variant="secondary"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full py-4 text-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
            >
              Sair
            </Button>
          </div>
        </div>

        {/* Lista de cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Nenhum curso disponível no momento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
