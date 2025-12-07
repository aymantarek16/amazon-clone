import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import stripe from '@/lib/stripe';
import { adminDB } from '@/firebase-admin';

// prevents Next.js from pre-rendering this API route during build
export const runtime = 'nodejs'; 
export const dynamic = 'force-dynamic';

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
        console.error("❌ No email found for this session!");
        return NextResponse.json({ error: "No email found" }, { status: 400 });
      }

      //==============================
      // Generate Firestore-safe user ID
      //==============================
      const safeUserId = userEmail.replace(/[.#$/[\]]/g, "_");

      // Retrieve invoice details if available
      const invoice = session.invoice
        ? await stripe.invoices.retrieve(session.invoice as string)
        : null;

      const invoice_data = {
        id: invoice?.id,
        invoice_url: invoice?.hosted_invoice_url,
        invoice_pdf: invoice?.invoice_pdf,
      };

      try {
        // Get line items along with product details
        const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product'],
        });

        // Map session products
        const sessionProducts =
          lineItemsWithProduct?.data?.map((item) => ({
            id: item.id,
            name: item.description,
            product_details: item.price?.product,
            quantity: item.quantity,
            price: (item.price?.unit_amount as number) / 100,
          })) || [];

        // Calculate total amount
        const totalAmount =
          lineItemsWithProduct?.data?.reduce(
            (total, item) => total + (item.amount_total as number) / 100,
            0
          ) || 0;

        // Create order item for Firebase
        const orderItem = {
          amount: totalAmount,
          items: sessionProducts || [],
          invoice: invoice_data,
        };

        //==============================
        // Save order to Firestore correctly
        //==============================
        if (sessionProducts?.length) {
          const userOrdersRef = adminDB
            .collection('users')
            .doc(safeUserId)
            .collection('orders')
            .doc(session.id);

          const userDoc = await userOrdersRef.get();
          if (!userDoc.exists) {
            await userOrdersRef.set({ email: userEmail });
          }

          await userOrdersRef.set({ value: orderItem }, { merge: true });
        }

        console.log('Order created successfully:', orderItem);
      } catch (error) {
        console.error('Error creating order in Firebase:', error);
        return NextResponse.json(
          {
            error: `Error creating order: ${error}`,
            received: true,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Unexpected error in webhook:', err);
    // Extra protection during build or any invalid request
    return NextResponse.json({ error: 'Unexpected error', details: String(err) }, { status: 400 });
  }
}
