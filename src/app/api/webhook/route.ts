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
    console.error("Erro ao verificar Webhook:", err);
    return new Response(
      `Erro ao verificar Webhook: ${(err as Error).message}`,
      {
        status: 400,
      }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerId = session.customer as string;

    if (!customerId) {
      return new Response("Não há ID de cliente", { status: 400 });
    }

    try {
      const updated = await db.user.update({
        where: { stripeCustomerId: customerId },
        data: { isSubscribed: true },
      });

      console.log(`Usuário com o ID ${updated.id} foi marcado como inscrito.`);
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
      return new Response("Erro ao processar sessão de checkout", {
        status: 500,
      });
    }
  }

  return new Response("Webhook recebido com sucesso!", { status: 200 });
}
