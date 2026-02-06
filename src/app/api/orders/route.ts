import { NextRequest, NextResponse } from 'next/server';
import { generateOrderNumber } from '@/lib/utils';
import { calculateCartTotal, type CartPriceCalculation } from '@/lib/pricing';
import { PRICING } from '@/lib/constants';

interface OrderItem {
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

// In-memory storage for demo (replace with database in production)
const orders: Map<string, object> = new Map();

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

    // Create order object
    const order = {
      orderNumber,
      status: 'PENDING',
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'PENDING' : 'PENDING',
      paymentMethod,
      customer: {
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
      },
      shippingAddress: {
        line1: customer.address,
        line2: customer.addressLine2,
        city: customer.city,
        province: customer.province,
        postalCode: customer.postalCode,
        country: 'ES',
      },
      items: items.map((item) => {
        const itemPrice = cartTotal.items.find(
          (i) =>
            i.productId === item.productId &&
            i.packSize === item.packSize &&
            i.isSubscription === item.isSubscription
        );
        return {
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          packSize: item.packSize,
          isSubscription: item.isSubscription,
          unitPriceInCents: itemPrice?.unitPriceCents || item.priceInCents,
          totalPriceInCents: itemPrice?.lineTotalCents || 0,
        };
      }),
      totals: {
        subtotalInCents: cartTotal.subtotalCents,
        discountInCents: cartTotal.discountCents,
        shippingInCents: cartTotal.shippingCents,
        taxInCents: cartTotal.taxCents,
        // Add cash on delivery fee if applicable
        cashOnDeliveryFee: paymentMethod === 'cash_on_delivery' ? 200 : 0,
        totalInCents:
          cartTotal.totalCents + (paymentMethod === 'cash_on_delivery' ? 200 : 0),
      },
      ...(couponCode && {
        coupon: {
          code: couponCode,
          discountInCents: couponDiscountCents || 0,
        },
      }),
      createdAt: new Date().toISOString(),
    };

    // Store order (in production, save to database)
    orders.set(orderNumber, order);

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Notify admin

    console.log('Order created:', orderNumber);

    return NextResponse.json({
      success: true,
      orderNumber,
      order,
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
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get('orderNumber');

  if (orderNumber) {
    const order = orders.get(orderNumber);
    if (order) {
      return NextResponse.json({ order });
    }
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
  }

  // Return all orders (in production, this should be protected and paginated)
  return NextResponse.json({
    orders: Array.from(orders.values()),
  });
}
