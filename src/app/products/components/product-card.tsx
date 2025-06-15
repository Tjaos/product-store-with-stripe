"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="w-full flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Nome do curso */}
      <div className="bg-indigo-600 text-white text-center py-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </div>

      {/* Conteúdo principal */}
      <div className="p-4 flex flex-col flex-1">
        {/* Descrição do curso */}
        <ScrollArea className="h-32 rounded-md border p-2 bg-gray-50 mb-4 text-sm text-gray-700">
          {product.description ? (
            <p>{product.description}</p>
          ) : (
            <p className="italic text-gray-400">Sem descrição</p>
          )}
        </ScrollArea>

        {/* Aviso de acesso por assinatura */}
        <span className="text-sm text-center text-indigo-700 font-medium mt-auto">
          Curso disponível com a assinatura da plataforma.
        </span>
      </div>
    </div>
  );
}
