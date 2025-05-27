"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Product = {
  id: string;
  name: string;
  description: string | null;
  priceId: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const handleSubscribe = async () => {
    const response = await fetch("api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ priceId: product.priceId }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div
      key={product.id}
      className="w-full flex flex-col bg-slate-100 p-5 rounded shadow"
    >
      <h3 className="text-lg text-center font-semibold">{product.name}</h3>

      <ScrollArea className="rounded-lg text-start mt-4 p-2 border border-solid border-gray-800 h-48">
        <p className="text-left font-sans font-thin">
          <span className="font-bold">Descrição: </span>
          {product.description || "Sem descrição!"}
        </p>
      </ScrollArea>
      <Button onClick={handleSubscribe} className="mt-4">
        Assinar Curso
      </Button>
    </div>
  );
}
