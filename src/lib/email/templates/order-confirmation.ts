/**
 * Order Confirmation Email Template
 *
 * Sent when a payment is completed successfully.
 */

import { emailLayout, formatCurrency, formatDate } from './base';
import { EMAIL_CONFIG } from '../resend';

export interface OrderItem {
  name: string;
  quantity: number;
  priceInCents: number;
}

export interface OrderConfirmationData {
  email: string;
  customerName: string;
  orderId: string;
  orderDate: Date | string;
  items: OrderItem[];
  subtotalCents: number;
  shippingCents: number;
  discountCents?: number;
  totalCents: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  estimatedDelivery?: string;
}

export function orderConfirmationEmail(data: OrderConfirmationData): { subject: string; html: string } {
  const {
    email,
    customerName,
    orderId,
    orderDate,
    items,
    subtotalCents,
    shippingCents,
    discountCents = 0,
    totalCents,
    shippingAddress,
    estimatedDelivery = '3-5 días laborables',
  } = data;

  const firstName = customerName?.split(' ')[0] || 'Cliente';

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
          <strong>${item.name}</strong><br>
          <span style="color: #6B7280; font-size: 14px;">Cantidad: ${item.quantity}</span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB; text-align: right; font-weight: 600;">
          ${formatCurrency(item.priceInCents * item.quantity)}
        </td>
      </tr>
    `
    )
    .join('');

  const content = `
    <h1>Pedido confirmado</h1>

    <p>
      Hola ${firstName}, gracias por tu pedido. Hemos recibido tu compra y la estamos preparando con mucho cariño.
    </p>

    <div class="card">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
        <tr>
          <td><strong>Pedido:</strong></td>
          <td style="text-align: right;">#${orderId}</td>
        </tr>
        <tr>
          <td><strong>Fecha:</strong></td>
          <td style="text-align: right;">${formatDate(orderDate)}</td>
        </tr>
        <tr>
          <td><strong>Entrega estimada:</strong></td>
          <td style="text-align: right;">${estimatedDelivery}</td>
        </tr>
      </table>
    </div>

    <h2>Resumen del pedido</h2>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${itemsHtml}
      <tr>
        <td style="padding: 8px 0; color: #6B7280;">Subtotal</td>
        <td style="padding: 8px 0; text-align: right;">${formatCurrency(subtotalCents)}</td>
      </tr>
      ${
        discountCents > 0
          ? `
      <tr>
        <td style="padding: 8px 0; color: #7D9160;">Descuento</td>
        <td style="padding: 8px 0; text-align: right; color: #7D9160;">-${formatCurrency(discountCents)}</td>
      </tr>
      `
          : ''
      }
      <tr>
        <td style="padding: 8px 0; color: #6B7280;">Envío</td>
        <td style="padding: 8px 0; text-align: right;">${shippingCents === 0 ? '<span style="color: #7D9160;">Gratis</span>' : formatCurrency(shippingCents)}</td>
      </tr>
      <tr style="font-size: 18px; font-weight: 600;">
        <td style="padding: 16px 0; border-top: 2px solid #E5E7EB;">Total</td>
        <td style="padding: 16px 0; border-top: 2px solid #E5E7EB; text-align: right;">${formatCurrency(totalCents)}</td>
      </tr>
    </table>

    <h2>Dirección de envío</h2>

    <div class="card">
      <p style="margin: 0;">
        <strong>${shippingAddress.name}</strong><br>
        ${shippingAddress.street}<br>
        ${shippingAddress.postalCode} ${shippingAddress.city}<br>
        ${shippingAddress.country}
      </p>
    </div>

    <p class="text-center">
      <a href="${EMAIL_CONFIG.baseUrl}/cuenta/pedidos" class="button">
        Ver mi pedido
      </a>
    </p>

    <hr class="divider">

    <p class="text-small">
      Te enviaremos otro email cuando tu pedido haya sido enviado con el número de seguimiento.
      Si tienes alguna pregunta, escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a>.
    </p>

    <p>
      ¡Gracias por elegir Poppy!<br>
      <strong>El equipo de Poppy</strong>
    </p>
  `;

  return {
    subject: `Pedido #${orderId} confirmado`,
    html: emailLayout(content, `Tu pedido #${orderId} ha sido confirmado. Entrega estimada: ${estimatedDelivery}.`).replace('{{email}}', email),
  };
}
