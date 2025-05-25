import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function extractIdFromPathName(pathName: string) {
  const pathParts = pathName.split("/");
  const id = pathParts[pathParts.length - 1];
  return id;
}

export async function PUT(request: NextRequest) {
  const id = extractIdFromPathName(request.nextUrl.pathname);
  const body = await request.json();
  const { name, description, price } = body;

  const product = await db.product.update({
    where: { id },
    data: { name, description, price: parseFloat(price) },
  });

  return NextResponse.json(product);
}
export async function GET(request: NextRequest) {
  const id = extractIdFromPathName(request.nextUrl.pathname);
  const product = await db.product.findUnique({
    where: { id },
  });

  return NextResponse.json(product);
}

export async function DELETE(request: NextRequest) {
  const id = extractIdFromPathName(request.nextUrl.pathname);
  await db.product.delete({
    where: { id },
  });

  return NextResponse.json({ message: "produto deletado!" });
}
