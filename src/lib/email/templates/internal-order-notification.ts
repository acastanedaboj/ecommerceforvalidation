/**
 * Internal Order Notification Email
 *
 * Sent to the Poppy team when a new order is placed.
 * Contains full order details for fulfillment.
 */

import { formatCurrency, formatDate } from './base';

export interface InternalOrderNotificationData {
  orderId: string;
  orderNumber: string;
  orderDate: Date | string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: { name: string; quantity: number; priceInCents: number }[];
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  totalCents: number;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
  isLocalDelivery: boolean;
  discountCode?: string;
}

export function internalOrderNotificationEmail(data: InternalOrderNotificationData): { subject: string; html: string } {
  const {
    orderNumber,
    orderDate,
    customerName,
    customerEmail,
    customerPhone,
    items,
    subtotalCents,
    shippingCents,
    discountCents,
    totalCents,
    shippingAddress,
    isLocalDelivery,
    discountCode,
  } = data;

  const subject = `🛒 Nuevo pedido ${orderNumber} — ${formatCurrency(totalCents)} — ${customerName}`;

  const itemsRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #f0ede8; font-size: 14px; color: #2d2520;">${item.name}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #f0ede8; font-size: 14px; color: #2d2520; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #f0ede8; font-size: 14px; color: #2d2520; text-align: right;">${formatCurrency(item.priceInCents)}</td>
      </tr>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f4f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 600px; margin: 32px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background: #5a3f38; padding: 24px 32px;">
      <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1px;">Poppy · Nuevo pedido</p>
      <h1 style="margin: 4px 0 0; font-size: 22px; color: #fff; font-weight: 700;">${orderNumber}</h1>
      <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.7);">${formatDate(orderDate)}</p>
    </div>

    <!-- Total destacado -->
    <div style="background: #faf7f3; padding: 20px 32px; border-bottom: 1px solid #f0ede8; display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 14px; color: #7a6a60;">Total cobrado</span>
      <span style="font-size: 28px; font-weight: 800; color: #5a3f38;">${formatCurrency(totalCents)}</span>
    </div>

    <div style="padding: 28px 32px;">

      <!-- Cliente -->
      <h2 style="margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #9e8c84;">Cliente</h2>
      <div style="background: #faf7f3; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
        <p style="margin: 0 0 6px; font-size: 15px; font-weight: 700; color: #2d2520;">${customerName}</p>
        <p style="margin: 0 0 4px; font-size: 14px; color: #5a3f38;"><a href="mailto:${customerEmail}" style="color: #5a3f38;">${customerEmail}</a></p>
        ${customerPhone ? `<p style="margin: 0; font-size: 14px; color: #7a6a60;">${customerPhone}</p>` : ''}
      </div>

      <!-- Entrega -->
      <h2 style="margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #9e8c84;">Entrega</h2>
      <div style="background: ${isLocalDelivery ? '#fdfcd0' : '#faf7f3'}; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; border: 1px solid ${isLocalDelivery ? '#e8dc3d' : 'transparent'};">
        ${isLocalDelivery
          ? `<p style="margin: 0; font-size: 14px; font-weight: 700; color: #2d2520;">📍 Entrega en mano — Centro de Málaga</p>
             <p style="margin: 4px 0 0; font-size: 13px; color: #7a6a60;">Contactar al cliente para coordinar entrega</p>`
          : `<p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: #2d2520;">${shippingAddress.name}</p>
             <p style="margin: 0 0 2px; font-size: 14px; color: #5a3f38;">${shippingAddress.line1}${shippingAddress.line2 ? `, ${shippingAddress.line2}` : ''}</p>
             <p style="margin: 0; font-size: 14px; color: #7a6a60;">${shippingAddress.postalCode} ${shippingAddress.city} · ${shippingAddress.country}</p>`
        }
      </div>

      <!-- Productos -->
      <h2 style="margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #9e8c84;">Productos</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #faf7f3; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background: #f0ede8;">
            <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #9e8c84; text-transform: uppercase; letter-spacing: 0.5px;">Producto</th>
            <th style="padding: 10px 12px; text-align: center; font-size: 12px; color: #9e8c84; text-transform: uppercase; letter-spacing: 0.5px;">Uds</th>
            <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #9e8c84; text-transform: uppercase; letter-spacing: 0.5px;">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <!-- Resumen económico -->
      <div style="background: #faf7f3; border-radius: 8px; padding: 16px 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 14px; color: #7a6a60;">Subtotal</span>
          <span style="font-size: 14px; color: #2d2520;">${formatCurrency(subtotalCents)}</span>
        </div>
        ${discountCents > 0 ? `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 14px; color: #72a6cc;">Descuento${discountCode ? ` (${discountCode})` : ''}</span>
          <span style="font-size: 14px; color: #72a6cc;">-${formatCurrency(discountCents)}</span>
        </div>` : ''}
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 14px; color: #7a6a60;">${isLocalDelivery ? 'Entrega local' : 'Envío'}</span>
          <span style="font-size: 14px; color: ${shippingCents === 0 ? '#5a9e7a' : '#2d2520'};">${shippingCents === 0 ? 'Gratis' : formatCurrency(shippingCents)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 2px solid #e8e0d8; padding-top: 12px;">
          <span style="font-size: 16px; font-weight: 700; color: #2d2520;">Total</span>
          <span style="font-size: 20px; font-weight: 800; color: #5a3f38;">${formatCurrency(totalCents)}</span>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding: 16px 32px; background: #f7f4f0; border-top: 1px solid #f0ede8; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #b0a09a;">Email interno · Poppy · <a href="https://www.poppy.es" style="color: #5a3f38; text-decoration: none;">poppy.es</a></p>
    </div>

  </div>
</body>
</html>`;

  return { subject, html };
}
