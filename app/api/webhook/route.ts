import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import stripe from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
      return NextResponse.json({ error: 'No Signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

    if (!webhookSecret) {
      console.log('Stripe webhook secret is not set');
      return NextResponse.json({ error: 'Stripe webhook secret is not set' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error) {
      console.log('Webhook signature verification failed', error);
      return NextResponse.json({ error: `Webhook Error: ${error}` }, { status: 400 });
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      //==============================
      //  Get the real customer email
      //==============================
      let userEmail = session.customer_email;

      if (!userEmail && session.customer) {
        const customer = await stripe.customers.retrieve(session.customer as string);
        if (!customer.deleted && customer.email) {
          userEmail = customer.email;
        }
      }

      if (!userEmail) {
        console.error('❌ No email found for this session!');
        return NextResponse.json({ error: 'No email found' }, { status: 400 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Unexpected error in webhook:', err);
    // Extra protection during build or any invalid request
    return NextResponse.json({ error: 'Unexpected error', details: String(err) }, { status: 400 });
  }
}
