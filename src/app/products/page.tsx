import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/prisma";

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
          {product.map((product) => (
            <div
              key={product.id}
              className="w-full flex flex-col bg-slate-100 p-5 rounded shadow"
            >
              <h3 className="text-lg text-center font-semibold">
                {product.name}
              </h3>
              <p className="text-xl text-center font-bold text-green-800">
                Preço: R${product.price.toFixed(2)}
              </p>

              <ScrollArea className="rounded-lg text-start mt-4 p-2 border border-solid border-gray-800 h-48">
                <p className="text-left font-sans font-thin">
                  <span className="font-bold">Descrição: </span>
                  {product.description}
                </p>
              </ScrollArea>
              <Button className="mt-5 p-0 " variant={"outline"}>
                <Input type="number" min={1} defaultValue={1} max={5} />
              </Button>
              <Button className="mt-4">Comprar</Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
