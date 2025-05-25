"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = async () => {
    const response = await fetch("api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ product, quantity }),
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
      <p className="text-xl text-center font-bold text-green-800">
        Preço: R${(product.price / 100).toFixed(2)}
      </p>

      <ScrollArea className="rounded-lg text-start mt-4 p-2 border border-solid border-gray-800 h-48">
        <p className="text-left font-sans font-thin">
          <span className="font-bold">Descrição: </span>
          {product.description || "Sem descrição!"}
        </p>
      </ScrollArea>
      <Button className="mt-5 p-0 " variant={"outline"}>
        <Input
          type="number"
          min={1}
          value={quantity}
          max={5}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </Button>
      <Button onClick={handleBuy} className="mt-4">
        Comprar
      </Button>
    </div>
  );
}
