"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseComments from "@/app/components/CourseComments";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const { data: session } = useSession();
  const isSubscribed = session?.user?.isSubscribed;

  return (
    <div className="w-full min-h-[520px] flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 p-5">
      {/* Nome do curso */}
      <div className="bg-indigo-600 text-white text-center py-4 rounded-t-xl">
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </div>

      {/* Conteúdo principal */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
        {/* Descrição do curso com scroll interno */}
        <ScrollArea className="h-32 rounded-md border p-2 bg-gray-50 text-sm text-gray-700">
          {product.description ? (
            <p>{product.description}</p>
          ) : (
            <p className="italic text-gray-400">Sem descrição</p>
          )}
        </ScrollArea>

        {/* Botão ou aviso conforme assinatura */}
        {isSubscribed ? (
          <Button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Começar Curso
          </Button>
        ) : (
          <span className="text-sm text-center text-indigo-700 font-medium">
            Curso disponível com a assinatura da plataforma.
          </span>
        )}

        {/* Seção de comentários com altura fixa e scroll */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            Comentários
          </h4>
          <div className="h-64 overflow-y-auto bg-gray-50 border border-gray-200 rounded p-2">
            <CourseComments courseId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
