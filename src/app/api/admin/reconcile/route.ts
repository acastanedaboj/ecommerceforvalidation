import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import Stripe from 'stripe';
import { generateOrderNumber } from '@/lib/utils';

const ADMIN_EMAILS = ['alvaro.castanneda@gmail.com', 'hola@poppy.es', 'pilar.orico@gmail.com'];

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !ADMIN_EMAILS.includes(session.user?.email || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { sessionId } = await request.json();
  if (!sessionId?.trim()) {
    return NextResponse.json({ error: 'Falta el ID de sesión de Stripe' }, { status: 400 });
  }

  // Check if order already exists in DB
  const existing = await prisma.order.findFirst({
    where: { stripeSessionId: sessionId },
  });
  if (existing) {
    return NextResponse.json(
      { error: `Este pedido ya existe en la base de datos: #${existing.orderNumber}` },
      { status: 409 }
    );
  }

  // Fetch session from Stripe
  let stripeSession: Stripe.Checkout.Session;
  try {
    stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'shipping_details'],
    });
  } catch {
    return NextResponse.json({ error: 'Sesión de Stripe no encontrada' }, { status: 404 });
  }

  if (stripeSession.payment_status !== 'paid') {
    return NextResponse.json({ error: 'El pago no está completado en Stripe' }, { status: 400 });
  }

  if (!stripeSession.customer_email) {
    return NextResponse.json({ error: 'El pedido de Stripe no tiene email de cliente' }, { status: 400 });
  }

  // Get line items
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    expand: ['data.price.product'],
  });

  const orderNumber = generateOrderNumber();

  // Find user if exists
  const user = await prisma.user.findUnique({ where: { email: stripeSession.customer_email } });

  // Find a product to use as fallback for productId
  const fallbackProduct = await prisma.product.findFirst({ where: { isActive: true } });

  await prisma.order.create({
    data: {
      orderNumber,
      userId: user?.id || null,
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      paymentMethod: 'card',
      stripeSessionId: stripeSession.id,
      stripePaymentIntentId: stripeSession.payment_intent as string | null,
      customerEmail: stripeSession.customer_email,
      customerName: stripeSession.customer_details?.name || null,
      customerPhone: stripeSession.customer_details?.phone || null,
      shippingName: stripeSession.shipping_details?.name || stripeSession.customer_details?.name || null,
      shippingLine1: stripeSession.shipping_details?.address?.line1 || null,
      shippingLine2: stripeSession.shipping_details?.address?.line2 || null,
      shippingCity: stripeSession.shipping_details?.address?.city || null,
      shippingState: stripeSession.shipping_details?.address?.state || null,
      shippingPostal: stripeSession.shipping_details?.address?.postal_code || null,
      shippingCountry: stripeSession.shipping_details?.address?.country || 'ES',
      subtotalInCents: stripeSession.amount_subtotal || 0,
      shippingInCents: stripeSession.shipping_cost?.amount_total || 0,
      discountInCents: stripeSession.total_details?.amount_discount || 0,
      totalInCents: stripeSession.amount_total || 0,
      discountCode: stripeSession.metadata?.couponCode || null,
      paidAt: new Date(),
      items: {
        create: lineItems.data
          .filter((item) => {
            const product = item.price?.product as Stripe.Product | null;
            return product?.metadata?.productId || fallbackProduct;
          })
          .map((item) => {
            const product = item.price?.product as Stripe.Product | null;
            const productId = product?.metadata?.productId || fallbackProduct!.id;
            return {
              productId,
              productName: item.description || 'Granola Poppy',
              productSku: item.price?.id || 'unknown',
              quantity: item.quantity || 1,
              unitPriceInCents: item.price?.unit_amount || 0,
              totalPriceInCents: item.amount_total || 0,
            };
          }),
      },
    },
  });

  return NextResponse.json({ success: true, orderNumber });
}
