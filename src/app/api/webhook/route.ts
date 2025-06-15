import { db } from "@/lib/prisma";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  const sig = (await headers()).get("stripe-signature")!;
  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    const email = session.customer_email;

    await db.user.updateMany({
      where: { email },
      data: {
        stripeCustomerId: customerId,
        isSubscribed: true,
      },
    });
  }

  return new Response("OK", { status: 200 });
}
