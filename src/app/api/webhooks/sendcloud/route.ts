import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db';
import type { SendcloudWebhookPayload } from '@/lib/sendcloud';
import { SENDCLOUD_STATUS } from '@/lib/sendcloud';

function verifySignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const expected = hmac.digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const webhookSecret = process.env.SENDCLOUD_WEBHOOK_SECRET;

    if (webhookSecret) {
      const signature = request.headers.get('sendcloud-signature');
      if (!signature || !verifySignature(body, signature, webhookSecret)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(body) as SendcloudWebhookPayload;

    if (payload.action !== 'parcel_status_changed') {
      return NextResponse.json({ received: true });
    }

    const { parcel } = payload;
    const statusId = parcel.status.id;

    // Find the order by sendcloudParcelId or order_number
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { sendcloudParcelId: String(parcel.id) },
          { orderNumber: parcel.order_number },
        ],
      },
    });

    if (!order) {
      console.warn(`Sendcloud webhook: no order found for parcel ${parcel.id} / ${parcel.order_number}`);
      return NextResponse.json({ received: true });
    }

    // Determine new order status
    let newStatus: string | null = null;
    const now = new Date();

    if (statusId === SENDCLOUD_STATUS.DELIVERED) {
      newStatus = 'DELIVERED';
    } else if (
      statusId === SENDCLOUD_STATUS.ANNOUNCED ||
      statusId === SENDCLOUD_STATUS.IN_TRANSIT ||
      statusId === SENDCLOUD_STATUS.AT_SORTING
    ) {
      newStatus = 'SHIPPED';
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        ...(newStatus ? { status: newStatus as never } : {}),
        trackingNumber: parcel.tracking_number || order.trackingNumber,
        trackingUrl: parcel.tracking_url || order.trackingUrl,
        carrier: parcel.carrier?.code || order.carrier,
        ...(newStatus === 'SHIPPED' && !order.shippedAt ? { shippedAt: now } : {}),
        ...(newStatus === 'DELIVERED' && !order.deliveredAt ? { deliveredAt: now } : {}),
      },
    });

    console.log(
      `Sendcloud: order ${order.orderNumber} updated — status ${parcel.status.message} (${statusId})`
    );

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Sendcloud webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
