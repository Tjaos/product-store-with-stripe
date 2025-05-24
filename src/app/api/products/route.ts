import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, description } = body;

  const product = await db.product.create({
    data: { name, description, price: parseFloat(price) },
  });

  return NextResponse.json(product);
}
export async function GET() {
  const products = await db.product.findMany();
  return NextResponse.json(products);
}
