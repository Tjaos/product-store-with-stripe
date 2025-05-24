import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { name, description, price } = body;

  const product = await prisma.product.update({
    where: { id: params.id },
    data: { name, description, price: parseFloat(price) },
  });

  return NextResponse.json(product);
}
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.product.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "produto deletado!" });
}
