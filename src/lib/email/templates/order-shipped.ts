/**
 * Order Shipped Email Template
 *
 * Sent when an order has been shipped.
 */

import { emailLayout, formatDate } from './base';

export interface OrderShippedData {
  email: string;
  customerName: string;
  orderId: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

export function orderShippedEmail(data: OrderShippedData): { subject: string; html: string } {
  const {
    email,
    customerName,
    orderId,
    trackingNumber,
    trackingUrl,
    carrier = 'Correos Express',
    estimatedDelivery,
  } = data;

  const firstName = customerName?.split(' ')[0] || 'Cliente';

  const content = `
    <h1>Tu pedido está en camino</h1>

    <p>
      Hola ${firstName}, buenas noticias: tu pedido <strong>#${orderId}</strong> ha sido enviado y pronto llegará a tu puerta.
    </p>

    <div class="card">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
        <tr>
          <td><strong>Pedido:</strong></td>
          <td style="text-align: right;">#${orderId}</td>
        </tr>
        <tr>
          <td><strong>Transportista:</strong></td>
          <td style="text-align: right;">${carrier}</td>
        </tr>
        ${
          trackingNumber
            ? `
        <tr>
          <td><strong>N° seguimiento:</strong></td>
          <td style="text-align: right;">${trackingNumber}</td>
        </tr>
        `
            : ''
        }
        ${
          estimatedDelivery
            ? `
        <tr>
          <td><strong>Entrega estimada:</strong></td>
          <td style="text-align: right;">${estimatedDelivery}</td>
        </tr>
        `
            : ''
        }
      </table>
    </div>

    ${
      trackingUrl
        ? `
    <p class="text-center">
      <a href="${trackingUrl}" class="button">
        Seguir mi envío
      </a>
    </p>
    `
        : ''
    }

    <hr class="divider">

    <h2>¿Qué puedes esperar?</h2>

    <p>
      <strong>Horario de entrega:</strong> De lunes a viernes, en horario laboral.<br>
      <strong>Si no estás en casa:</strong> El transportista dejará un aviso e intentará la entrega al día siguiente.
    </p>

    <p class="text-small">
      Si tienes alguna pregunta sobre tu envío, escríbenos a
      <a href="mailto:hola@poppy.es">hola@poppy.es</a> indicando tu número de pedido.
    </p>

    <p>
      ¡Esperamos que disfrutes tu granola!<br>
      <strong>El equipo de Poppy</strong>
    </p>
  `;

  return {
    subject: `Tu pedido #${orderId} está en camino`,
    html: emailLayout(content, `Tu pedido #${orderId} ha sido enviado. ${trackingNumber ? `Seguimiento: ${trackingNumber}` : ''}`).replace('{{email}}', email),
  };
}
