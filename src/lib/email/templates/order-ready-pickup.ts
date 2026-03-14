/**
 * Order Ready for Pickup Email Template
 *
 * Sent to local delivery customers when their order is ready to collect.
 */

import { emailLayout } from './base';

export interface OrderReadyPickupData {
  email: string;
  customerName: string;
  orderId: string;
  pickupNote?: string;
}

export function orderReadyPickupEmail(data: OrderReadyPickupData): { subject: string; html: string } {
  const { email, customerName, orderId, pickupNote } = data;

  const firstName = customerName?.split(' ')[0] || 'Cliente';

  const content = `
    <h1>${firstName}, tu pedido está listo</h1>

    <p>
      Tu pedido <strong>#${orderId}</strong> ya está preparado y listo para que vengas a recogerlo.
      Puedes pasarte cuando quieras en horario de atención.
    </p>

    <div class="card" style="background-color: #fdfcd0; border: 1px solid #e8dc3d;">
      <p style="margin: 0 0 8px; color: #2d2520;"><strong>📍 Recogida en Málaga centro</strong></p>
      <p style="margin: 0; font-size: 14px; color: #5a4a40;">
        Escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a> o por Instagram
        <a href="https://instagram.com/poppy_granola">@poppy_granola</a> para confirmar
        el punto de encuentro exacto y el horario.
      </p>
    </div>

    ${pickupNote ? `
    <div class="card">
      <p style="margin: 0 0 6px;"><strong>Nota del equipo Poppy:</strong></p>
      <p style="margin: 0; font-size: 14px;">${pickupNote}</p>
    </div>
    ` : ''}

    <hr class="divider">

    <div class="card" style="background-color: #F3F7F0; border-left: 3px solid #7D9160;">
      <p style="margin: 0 0 8px; color: #4A6741;"><strong>Packaging sostenible 🌿</strong></p>
      <p style="margin: 0; color: #4A6741; font-size: 14px;">
        Tu pedido llega en un embalaje sostenible y ecológico. Para conservar la granola en
        perfectas condiciones, te recomendamos pasarla a un recipiente de cristal cerrado
        y guardarla en la despensa. Así se mantiene crujiente y fresca durante meses.
      </p>
    </div>

    <p>
      ¡Hasta pronto!<br>
      <strong>El equipo Poppy</strong>
    </p>

    <p class="text-small">
      ¿Alguna pregunta? Escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a>
    </p>
  `;

  return {
    subject: `${firstName}, tu pedido #${orderId} está listo para recoger`,
    html: emailLayout(content, `Tu pedido #${orderId} está listo para recoger en Málaga.`).replace('{{email}}', email),
  };
}
