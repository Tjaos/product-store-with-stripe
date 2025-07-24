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
    <div
      className="
        w-full
        min-h-[600px] md:min-h-[600px] 
        flex flex-col 
        bg-white rounded-2xl shadow-md 
        overflow-hidden hover:shadow-xl transition-all duration-300 
        border border-gray-200 p-4 sm:p-6
      "
    >
      {/* Nome do curso */}
      <div className="bg-indigo-600 text-white text-center py-3 rounded-t-xl">
        <h3 className="text-lg sm:text-xl font-semibold">{product.name}</h3>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 p-4 gap-4">
        {/* Descrição do curso */}
        <ScrollArea className="h-32 rounded-md border p-3 bg-gray-50 text-sm text-gray-700">
          {product.description ? (
            <p>{product.description}</p>
          ) : (
            <p className="italic text-gray-400">Sem descrição</p>
          )}
        </ScrollArea>

        {/* Botão ou aviso */}
        {isSubscribed ? (
          <Button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
            Começar Curso
          </Button>
        ) : (
          <span className="text-sm text-center text-indigo-700 font-medium">
            Curso disponível com a assinatura da plataforma.
          </span>
        )}

        {/* Comentários */}
        <div className="flex flex-col flex-1 mt-2 min-h-0">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Comentários
          </h4>

          {/* Container flex para ocupar espaço e scroll */}
          <div className="flex-1 min-h-0 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
            <CourseComments courseId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
