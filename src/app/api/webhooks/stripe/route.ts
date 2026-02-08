import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  sendOrderConfirmationEmail,
  sendSubscriptionActiveEmail,
  sendSubscriptionRenewedEmail,
  sendSubscriptionFailedEmail,
  sendSubscriptionCancelledEmail,
} from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.poppy.es';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', session.id);

        // Send order confirmation email for one-time purchases
        if (session.mode === 'payment' && session.customer_email) {
          try {
            // Get line items from session
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

            const items = lineItems.data.map((item) => ({
              name: item.description || 'Granola Poppy',
              quantity: item.quantity || 1,
              priceInCents: item.amount_total || 0,
            }));

            await sendOrderConfirmationEmail({
              email: session.customer_email,
              customerName: session.customer_details?.name || 'Cliente',
              orderId: session.id.slice(-8).toUpperCase(),
              orderDate: new Date(),
              items,
              subtotalCents: session.amount_subtotal || 0,
              shippingCents: session.shipping_cost?.amount_total || 0,
              discountCents: session.total_details?.amount_discount || 0,
              totalCents: session.amount_total || 0,
              shippingAddress: {
                name: session.shipping_details?.name || session.customer_details?.name || '',
                street: session.shipping_details?.address?.line1 || '',
                city: session.shipping_details?.address?.city || '',
                postalCode: session.shipping_details?.address?.postal_code || '',
                country: 'España',
              },
            });
            console.log('Order confirmation email sent');
          } catch (emailError) {
            console.error('Failed to send order confirmation email:', emailError);
          }
        }

        if (session.mode === 'subscription') {
          // Handle subscription creation
          console.log('Subscription created via checkout:', session.subscription);
        }

        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice paid:', invoice.id);

        // Send subscription renewed email for recurring payments
        if (invoice.subscription && invoice.customer_email && invoice.billing_reason === 'subscription_cycle') {
          try {
            const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
            const product = subscription.items.data[0];

            await sendSubscriptionRenewedEmail({
              email: invoice.customer_email,
              customerName: invoice.customer_name || 'Cliente',
              productName: product.price.nickname || 'Suscripción Granola',
              quantity: product.quantity || 1,
              amountPaidCents: invoice.amount_paid,
              invoiceId: invoice.number || invoice.id,
              nextDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 days
              nextPaymentDate: new Date(subscription.current_period_end * 1000),
            });
            console.log('Subscription renewed email sent');
          } catch (emailError) {
            console.error('Failed to send subscription renewed email:', emailError);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed:', invoice.id);

        // Send payment failed email
        if (invoice.subscription && invoice.customer_email) {
          try {
            await sendSubscriptionFailedEmail({
              email: invoice.customer_email,
              customerName: invoice.customer_name || 'Cliente',
              productName: 'Suscripción Granola',
              amountCents: invoice.amount_due,
              failureReason: invoice.last_finalization_error?.message,
              retryDate: invoice.next_payment_attempt
                ? new Date(invoice.next_payment_attempt * 1000)
                : undefined,
              updatePaymentUrl: `${baseUrl}/cuenta/suscripciones`,
            });
            console.log('Payment failed email sent');
          } catch (emailError) {
            console.error('Failed to send payment failed email:', emailError);
          }
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription created:', subscription.id);

        // Send subscription active email
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          if (customer.deleted) break;

          const product = subscription.items.data[0];
          const interval = product.price.recurring?.interval;

          await sendSubscriptionActiveEmail({
            email: customer.email || '',
            customerName: customer.name || 'Cliente',
            productName: product.price.nickname || 'Granola Poppy',
            quantity: product.quantity || 1,
            frequency: interval === 'month' ? 'monthly' : 'bimonthly',
            pricePerDeliveryCents: product.price.unit_amount || 0,
            nextDeliveryDate: new Date(subscription.current_period_end * 1000),
            subscriptionId: subscription.id,
          });
          console.log('Subscription active email sent');
        } catch (emailError) {
          console.error('Failed to send subscription active email:', emailError);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id, 'Status:', subscription.status);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', subscription.id);

        // Send cancellation email
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          if (customer.deleted) break;

          const product = subscription.items.data[0];

          await sendSubscriptionCancelledEmail({
            email: customer.email || '',
            customerName: customer.name || 'Cliente',
            productName: product.price.nickname || 'Granola Poppy',
            endDate: new Date(subscription.current_period_end * 1000),
            reason: subscription.cancellation_details?.reason || undefined,
          });
          console.log('Subscription cancelled email sent');
        } catch (emailError) {
          console.error('Failed to send subscription cancelled email:', emailError);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
