import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { sendOrderReadyForPickupEmail } from '@/lib/email';

const ADMIN_EMAILS = ['alvaro.castanneda@gmail.com', 'hola@poppy.es', 'pilar.orico@gmail.com'];

export async function POST(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !ADMIN_EMAILS.includes(session.user?.email || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { pickupNote } = await request.json().catch(() => ({}));

  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
  });

  if (!order) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
  }

  await prisma.order.update({
    where: { orderNumber: params.orderNumber },
    data: { status: 'PROCESSING' },
  });

  await sendOrderReadyForPickupEmail({
    email: order.customerEmail,
    customerName: order.customerName || 'Cliente',
    orderId: order.orderNumber,
    pickupNote: pickupNote || undefined,
  });

  return NextResponse.json({ success: true });
}
