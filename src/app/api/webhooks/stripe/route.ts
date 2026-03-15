import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  sendOrderConfirmationEmail,
  sendInternalOrderNotification,
  sendSubscriptionActiveEmail,
  sendSubscriptionRenewedEmail,
  sendSubscriptionFailedEmail,
  sendSubscriptionCancelledEmail,
} from '@/lib/email';
import prisma from '@/lib/db';
import { generateOrderNumber } from '@/lib/utils';
import { createSendcloudParcel } from '@/lib/sendcloud';

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

        // Send order confirmation email and save to database for one-time purchases
        if (session.mode === 'payment' && session.customer_email) {
          try {
            // Get line items from session (expand product to access metadata with DB productId)
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
              expand: ['data.price.product'],
            });

            const items = lineItems.data.map((item) => ({
              name: item.description || 'Granola Poppy',
              quantity: item.quantity || 1,
              priceInCents: item.amount_total || 0,
            }));

            // Generate order number
            const orderNumber = generateOrderNumber();

            // Find user by email if exists
            let userId: string | null = null;
            const user = await prisma.user.findUnique({
              where: { email: session.customer_email },
            });
            if (user) {
              userId = user.id;
            }

            // Save order to database
            await prisma.order.create({
              data: {
                orderNumber,
                userId,
                status: 'CONFIRMED',
                paymentStatus: 'PAID',
                paymentMethod: 'card',
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent as string | null,
                customerEmail: session.customer_email,
                customerName: session.customer_details?.name || null,
                customerPhone: session.customer_details?.phone || null,
                shippingName: session.shipping_details?.name || session.customer_details?.name || null,
                shippingLine1: session.shipping_details?.address?.line1 || null,
                shippingLine2: session.shipping_details?.address?.line2 || null,
                shippingCity: session.shipping_details?.address?.city || null,
                shippingState: session.shipping_details?.address?.state || null,
                shippingPostal: session.shipping_details?.address?.postal_code || null,
                shippingCountry: session.shipping_details?.address?.country || 'ES',
                subtotalInCents: session.amount_subtotal || 0,
                shippingInCents: session.shipping_cost?.amount_total || 0,
                discountInCents: session.total_details?.amount_discount || 0,
                totalInCents: session.amount_total || 0,
                discountCode: session.metadata?.couponCode || null,
                paidAt: new Date(),
                items: {
                  create: lineItems.data
                    .filter((item) => {
                      const product = item.price?.product as Stripe.Product | null;
                      return product?.metadata?.productId;
                    })
                    .map((item) => {
                      const product = item.price?.product as Stripe.Product;
                      return {
                        productId: product.metadata.productId,
                        productName: item.description || 'Granola Poppy',
                        productSku: item.price?.id || 'unknown',
                        quantity: item.quantity || 1,
                        unitPriceInCents: item.price?.unit_amount || 0,
                        totalPriceInCents: item.amount_total || 0,
                      };
                    }),
                },
              },
              include: {
                items: true,
              },
            });

            console.log('Order saved to database:', orderNumber, 'for user:', userId || 'guest');

            // Create Sendcloud parcel (non-blocking)
            if (session.shipping_details?.address?.line1) {
              const totalUnits = lineItems.data.reduce((sum, item) => sum + (item.quantity || 1), 0);
              const weightGrams = Math.min(totalUnits * 150, 1000); // 150g per bag, max 1kg box
              const parcelItems = lineItems.data
                .filter((item) => item.description && item.quantity)
                .map((item) => {
                  const qty = item.quantity || 1;
                  const unitWeightKg = (150 / 1000).toFixed(3); // 150g per bag
                  const unitValueEur = ((item.amount_total || 0) / qty / 100).toFixed(2);
                  return {
                    description: item.description || 'Granola Poppy',
                    quantity: qty,
                    weight: unitWeightKg,
                    value: unitValueEur,
                    origin_country: 'ES',
                  };
                });
              createSendcloudParcel({
                orderNumber,
                customerName: session.customer_details?.name || 'Cliente',
                customerEmail: session.customer_email,
                customerPhone: session.customer_details?.phone || null,
                addressLine1: session.shipping_details.address.line1,
                city: session.shipping_details.address.city || '',
                postalCode: session.shipping_details.address.postal_code || '',
                country: session.shipping_details.address.country || 'ES',
                weightGrams,
                items: parcelItems,
              })
                .then(async (parcel) => {
                  if (!parcel) return;
                  await prisma.order.update({
                    where: { orderNumber },
                    data: {
                      sendcloudParcelId: String(parcel.id),
                      carrier: parcel.carrier?.code || null,
                      trackingNumber: parcel.tracking_number || null,
                      trackingUrl: parcel.tracking_url || null,
                    },
                  });
                  console.log('Sendcloud parcel created:', parcel.id);
                })
                .catch((err) => console.error('Sendcloud parcel creation failed (non-blocking):', err));
            }

            // Send internal notification to Poppy team (isolated — never blocks customer email)
            sendInternalOrderNotification({
              orderId: orderNumber,
              orderNumber,
              orderDate: new Date(),
              customerName: session.customer_details?.name || 'Cliente',
              customerEmail: session.customer_email,
              customerPhone: session.customer_details?.phone || undefined,
              items,
              subtotalCents: session.amount_subtotal || 0,
              shippingCents: session.shipping_cost?.amount_total || 0,
              discountCents: session.total_details?.amount_discount || 0,
              totalCents: session.amount_total || 0,
              shippingAddress: {
                name: session.shipping_details?.name || session.customer_details?.name || '',
                line1: session.shipping_details?.address?.line1 || 'Entrega local',
                line2: session.shipping_details?.address?.line2 || undefined,
                city: session.shipping_details?.address?.city || 'Málaga',
                postalCode: session.shipping_details?.address?.postal_code || '',
                country: session.shipping_details?.address?.country || 'ES',
              },
              isLocalDelivery: !session.shipping_details?.address?.line1,
              discountCode: session.metadata?.couponCode || undefined,
            }).then(() => console.log('Internal order notification sent'))
              .catch((err) => console.error('Internal notification failed (non-blocking):', err));

            // Send order confirmation email
            await sendOrderConfirmationEmail({
              email: session.customer_email,
              customerName: session.customer_details?.name || 'Cliente',
              orderId: orderNumber,
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
          } catch (orderError) {
            console.error('Failed to save order or send email:', orderError);
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
