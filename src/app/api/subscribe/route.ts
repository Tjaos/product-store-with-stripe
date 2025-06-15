// app/api/subscribe/route.ts
import { auth } from "@/lib/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const stripeCustomer = await stripe.customers.create({
    email: session.user.email,
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: stripeCustomer.id,
    line_items: [
      {
        price: process.env.PLATFORM_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/sucesso",
    cancel_url: "http://localhost:3000/cancelado",
  });

  return Response.json({ url: checkoutSession.url });
}
