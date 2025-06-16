import { auth } from "@/lib/auth";
import Stripe from "stripe";
import { db } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response("Usuário não encontrado", { status: 404 });
  }

  // Se já tem customerId, não cria outro
  let customerId = user.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name ?? undefined,
    });

    await db.user.update({
      where: { email: user.email! },
      data: { stripeCustomerId: customer.id },
    });

    customerId = customer.id;
  }

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customerId,
    line_items: [
      {
        price: process.env.PLATFORM_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/sucesso`,
    cancel_url: `${baseUrl}/cancelado`,
  });

  return Response.json({ url: checkoutSession.url });
}
