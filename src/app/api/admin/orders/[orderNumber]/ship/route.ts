import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { sendOrderShippedEmail } from '@/lib/email';

const ADMIN_EMAILS = ['alvaro.castanneda@gmail.com', 'hola@poppy.es', 'pilar.orico@gmail.com'];

const TRACKING_URLS: Record<string, (n: string) => string> = {
  Correos: (n) => `https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=${n}`,
  MRW: (n) => `https://www.mrw.es/seguimiento_envios/buscar_informacion_envio.aspx?nif=&referencia=${n}`,
  SEUR: (n) => `https://www.seur.com/seur/es/particular/herramientas/seguimiento-de-envios.do?refExpedicion=${n}`,
  GLS: (n) => `https://gls-group.eu/ES/es/seguimiento-envio?match=${n}`,
  Nacex: (n) => `https://www.nacex.es/seguimiento.do?agencia_origen=&num_albaran=${n}`,
};

export async function POST(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !ADMIN_EMAILS.includes(session.user?.email || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { trackingNumber, carrier, estimatedDelivery } = await request.json();
  if (!trackingNumber || !carrier) {
    return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
  });

  if (!order) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
  }

  const trackingUrlFn = TRACKING_URLS[carrier];
  const trackingUrl = trackingUrlFn ? trackingUrlFn(trackingNumber) : undefined;

  // Update order status + save tracking info
  await prisma.order.update({
    where: { orderNumber: params.orderNumber },
    data: {
      status: 'SHIPPED',
      shippedAt: new Date(),
      carrier,
      trackingNumber,
      trackingUrl: trackingUrl || null,
      estimatedDelivery: estimatedDelivery || null,
    },
  });

  await sendOrderShippedEmail({
    email: order.customerEmail,
    customerName: order.customerName || 'Cliente',
    orderId: order.orderNumber,
    trackingNumber,
    trackingUrl,
    carrier,
    estimatedDelivery,
  });

  return NextResponse.json({ success: true });
}
