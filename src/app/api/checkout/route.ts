import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { product, quantity } = body;
  if (!product || !quantity) {
    return NextResponse.json(
      {
        error: "Dados incompletos",
      },
      { status: 400 }
    );
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            description: product.description || "",
          },
          unit_amount: product.price,
        },
        quantity: quantity,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/sucesso",
    cancel_url: "http://localhost:3000/cancelado",
  });
  return NextResponse.json({ url: session.url }, { status: 200 });
}
