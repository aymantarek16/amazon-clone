/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const GET = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session_id = req.nextUrl.searchParams.get("session_id")!;
  
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const lineItems = session.line_items?.data || [];

  // extract items
  const items = lineItems.map((item) => ({
    name: item.description,
    quantity: item.quantity,
    price: item.amount_total ? item.amount_total / 100 : 0,
  }));

  // extract images
  const images = lineItems.map((item) => {
    const product = item.price?.product as any;
    return product?.images?.[0] || "";
  });

  return NextResponse.json({
    id: session.id,
    amount_total: session.amount_total,
    amount_shipping: session.total_details?.amount_shipping || 0,
    currency: session.currency,
    items,
    images,
    customer_email: session.customer_details?.email,
  });
};
