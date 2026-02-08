/**
 * Order Shipped Email Template
 *
 * Sent when an order has been shipped.
 * Tone: Cercano, cuidado del bienestar, healthy, premium
 */

import { emailLayout } from './base';

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
    <h1>${firstName}, tu granola ya viaja hacia ti</h1>

    <p>
      ¡Buenas noticias! Tu pedido <strong>#${orderId}</strong> acaba de salir de nuestro obrador
      en Málaga y está de camino a tu casa. Pronto podrás disfrutar de ese primer bocado crujiente.
    </p>

    <div class="card" style="background-color: #FFFEF8;">
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
          <td><strong>Llegada prevista:</strong></td>
          <td style="text-align: right;"><strong style="color: #6D4D45;">${estimatedDelivery}</strong></td>
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

    <h2>Prepárate para recibirla</h2>

    <div class="card" style="background-color: #E1EDF5;">
      <p style="margin: 0; color: #3B6280;">
        <strong>Horario de entrega:</strong> De lunes a viernes en horario laboral.<br><br>
        <strong>Si no estás:</strong> El transportista dejará un aviso e intentará entregarlo
        al día siguiente. También puedes contactar con ${carrier} para reprogramar.
      </p>
    </div>

    <p>
      Cuando llegue tu granola, recuerda guardarla en un lugar fresco y seco.
      Así mantendrá todo su crujiente durante meses.
    </p>

    <p class="text-small">
      ¿Algún problema con el envío? Escríbenos a
      <a href="mailto:hola@poppy.es">hola@poppy.es</a> con tu número de pedido
      y lo solucionamos juntos.
    </p>

    <p>
      ¡Que lo disfrutes!<br>
      <strong>El equipo Poppy</strong>
    </p>

    <p class="text-small" style="color: #A3A3A3;">
      P.D. Nos encantaría ver cómo disfrutas tu granola.
      Etiquétanos en Instagram <a href="https://instagram.com/poppy.granola">@poppy.granola</a>
    </p>
  `;

  return {
    subject: `${firstName}, tu pedido #${orderId} está en camino`,
    html: emailLayout(content, `Tu pedido #${orderId} ha sido enviado. ${trackingNumber ? `Seguimiento: ${trackingNumber}` : 'Pronto llegará a tu casa.'}`).replace('{{email}}', email),
  };
}
