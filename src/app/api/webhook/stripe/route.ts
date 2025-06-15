import Stripe from "stripe";
import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response(`Webhook error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerId = session.customer as string;

    if (!customerId) {
      return new Response("Missing customer ID", { status: 400 });
    }

    await db.user.updateMany({
      where: { stripeCustomerId: customerId },
      data: { isSubscribed: true },
    });
    console.log(`Usuário com o ID ${customerId} foi marcado como inscrito.`);
  }

  return new Response("Webhook recebido com sucesso!", { status: 200 });
}
