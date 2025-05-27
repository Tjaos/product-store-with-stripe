import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;
  const body = await request.json();
  const { priceId } = body;

  if (!priceId) {
    return NextResponse.json(
      {
        error: "Faltando o ID do preço",
      },
      { status: 400 }
    );
  }
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/sucesso`,
    cancel_url: `${baseUrl}/cancelado`,
  });
  return NextResponse.json({ url: session.url }, { status: 200 });
}
