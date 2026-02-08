import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { generateOrderNumber } from '@/lib/utils';
import { calculateCartTotal, type CartPriceCalculation } from '@/lib/pricing';
import { PRICING } from '@/lib/constants';

interface OrderItem {
  productId: string;
  productName: string;
  productDescription?: string;
  quantity: number;
  packSize: number;
  isSubscription: boolean;
  priceInCents: number;
  isBundle?: boolean;
  flavors?: Array<{ productId: string; flavorName: string }>;
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
    const { items, customer, paymentMethod, totals, couponCode, couponDiscountCents } = body as {
      items: OrderItem[];
      customer: CustomerInfo;
      paymentMethod: 'card' | 'cash_on_delivery';
      totals?: CartPriceCalculation;
      couponCode?: string;
      couponDiscountCents?: number;
    };

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'El carrito está vacío' },
        { status: 400 }
      );
    }

    if (!customer.email || !customer.name || !customer.address) {
      return NextResponse.json(
        { error: 'Faltan datos del cliente' },
        { status: 400 }
      );
    }

    // Get session to link order to user if logged in
    const session = await getServerSession(authOptions);

    // Find user by email if logged in
    let userId: string | null = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      userId = user?.id || null;
    }

    // Calculate totals if not provided
    const cartTotal =
      totals ||
      calculateCartTotal(
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

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Add cash on delivery fee if applicable
    const cashOnDeliveryFee = paymentMethod === 'cash_on_delivery' ? 200 : 0;
    const finalTotal = cartTotal.totalCents + cashOnDeliveryFee;

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod,
        customerEmail: customer.email,
        customerName: customer.name,
        customerPhone: customer.phone,
        shippingName: customer.name,
        shippingLine1: customer.address,
        shippingLine2: customer.addressLine2,
        shippingCity: customer.city,
        shippingState: customer.province,
        shippingPostal: customer.postalCode,
        shippingCountry: 'ES',
        subtotalInCents: cartTotal.subtotalCents,
        discountInCents: cartTotal.discountCents + (couponDiscountCents || 0),
        shippingInCents: cartTotal.shippingCents,
        taxInCents: cartTotal.taxCents,
        totalInCents: finalTotal,
        discountCode: couponCode,
        items: {
          create: items.map((item) => {
            const itemPrice = cartTotal.items.find(
              (i) =>
                i.productId === item.productId &&
                i.packSize === item.packSize &&
                i.isSubscription === item.isSubscription
            );
            return {
              productId: item.productId,
              productName: item.isBundle
                ? `${item.productName}: ${item.productDescription || ''}`
                : item.productName,
              productSku: item.productId,
              quantity: item.quantity,
              packSize: item.packSize,
              unitPriceInCents: itemPrice?.unitPriceCents || item.priceInCents,
              totalPriceInCents: itemPrice?.lineTotalCents || 0,
            };
          }),
        },
      },
      include: {
        items: true,
      },
    });

    console.log('Order created:', orderNumber, 'for user:', userId || 'guest', 'email:', customer.email);

    return NextResponse.json({
      success: true,
      orderNumber,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        totalInCents: order.totalInCents,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Error al crear el pedido' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    // Get specific order by order number
    if (orderNumber) {
      const order = await prisma.order.findUnique({
        where: { orderNumber },
        include: {
          items: true,
        },
      });

      if (order) {
        return NextResponse.json({ order });
      }
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }

    // Get orders for authenticated user
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión para ver tus pedidos' },
        { status: 401 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    // Get orders by userId or by email (for orders made before user was created)
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          ...(user ? [{ userId: user.id }] : []),
          { customerEmail: session.user.email },
        ],
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Error al obtener los pedidos' },
      { status: 500 }
    );
  }
}
