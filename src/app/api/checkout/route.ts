import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { calculateCartTotal } from '@/lib/pricing';
import { PRICING } from '@/lib/constants';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

interface CheckoutItem {
  productId: string;
  productName: string;
  quantity: number;
  packSize: number;
  isSubscription: boolean;
  priceInCents: number;
}

interface CustomerInfo {
  email: string;
  name: string;
  phone: string;
  address: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, paymentMethod, couponCode, couponDiscountCents } = body as {
      items: CheckoutItem[];
      customer: CustomerInfo;
      paymentMethod: 'card' | 'cash_on_delivery';
      couponCode?: string;
      couponDiscountCents?: number;
    };

    // Validate items
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'El carrito está vacío' },
        { status: 400 }
      );
    }

    // Calculate totals with coupon if provided
    const cartTotal = calculateCartTotal(
      items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        packSize: item.packSize,
        isSubscription: item.isSubscription,
        priceInCents: item.priceInCents || PRICING.BASE_PRICE_CENTS,
      })),
      couponDiscountCents,
      couponCode
    );

    // Check for subscription items
    const hasSubscription = items.some((item) => item.isSubscription);

    // Calculate coupon discount ratio to apply proportionally to items
    const subtotalBeforeCoupon = calculateCartTotal(
      items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        packSize: item.packSize,
        isSubscription: item.isSubscription,
        priceInCents: item.priceInCents || PRICING.BASE_PRICE_CENTS,
      }))
    ).subtotalCents;

    const couponDiscountRatio = couponDiscountCents && subtotalBeforeCoupon > 0
      ? couponDiscountCents / subtotalBeforeCoupon
      : 0;

    // Build line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const itemTotal = cartTotal.items.find(
        (i) =>
          i.productId === item.productId &&
          i.packSize === item.packSize &&
          i.isSubscription === item.isSubscription
      );

      const baseUnitPrice = itemTotal?.unitPriceCents || item.priceInCents;
      // Apply coupon discount proportionally to each item
      const finalUnitPrice = Math.round(baseUnitPrice * (1 - couponDiscountRatio));

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.productName,
            description: `${item.packSize > 1 ? `Pack ${item.packSize}` : '1 unidad'}${item.isSubscription ? ' - Suscripción mensual' : ''}${couponCode ? ` (Cupón: ${couponCode})` : ''}`,
            metadata: {
              productId: item.productId,
              packSize: item.packSize.toString(),
              isSubscription: item.isSubscription.toString(),
            },
          },
          unit_amount: finalUnitPrice,
          ...(item.isSubscription && {
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          }),
        },
        quantity: item.quantity * item.packSize,
      };
    });

    // Add shipping if not free
    if (!cartTotal.isFreeShipping) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Gastos de envío',
            description: 'Envío estándar a Península',
          },
          unit_amount: cartTotal.shippingCents,
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      // Enable card payments (includes Apple Pay, Google Pay automatically)
      payment_method_types: ['card'],
      mode: hasSubscription ? 'subscription' : 'payment',
      line_items: lineItems,
      customer_email: customer.email,
      // Enable automatic payment methods (Apple Pay, Google Pay, Link)
      payment_method_options: {
        card: {
          // Request 3D Secure when required
          request_three_d_secure: 'automatic',
        },
      },
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['ES'],
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout`,
      metadata: {
        customerName: customer.name,
        customerPhone: customer.phone,
        shippingAddress: customer.address,
        shippingCity: customer.city,
        shippingProvince: customer.province,
        shippingPostalCode: customer.postalCode,
        ...(couponCode && {
          couponCode,
          couponDiscountCents: couponDiscountCents?.toString() || '0',
        }),
      },
      locale: 'es',
      // Allow promotion codes
      allow_promotion_codes: true,
      // Collect phone number
      phone_number_collection: {
        enabled: true,
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Error al procesar el checkout' },
      { status: 500 }
    );
  }
}
