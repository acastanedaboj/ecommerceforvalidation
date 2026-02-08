/**
 * Subscription Email Templates
 *
 * Templates for subscription lifecycle events.
 */

import { emailLayout, formatCurrency, formatDate } from './base';
import { EMAIL_CONFIG } from '../resend';

// ==========================================
// Subscription Active (New subscription)
// ==========================================

export interface SubscriptionActiveData {
  email: string;
  customerName: string;
  productName: string;
  quantity: number;
  frequency: string; // 'monthly', 'bimonthly'
  pricePerDeliveryCents: number;
  nextDeliveryDate: Date | string;
  subscriptionId: string;
}

export function subscriptionActiveEmail(data: SubscriptionActiveData): { subject: string; html: string } {
  const {
    email,
    customerName,
    productName,
    quantity,
    frequency,
    pricePerDeliveryCents,
    nextDeliveryDate,
    subscriptionId,
  } = data;

  const firstName = customerName?.split(' ')[0] || 'Cliente';
  const frequencyText = frequency === 'monthly' ? 'cada mes' : 'cada 2 meses';

  const content = `
    <h1>Suscripción activada</h1>

    <p>
      Hola ${firstName}, tu suscripción ha sido activada correctamente.
      A partir de ahora, recibirás tu granola favorita ${frequencyText} sin tener que preocuparte de nada.
    </p>

    <div class="card">
      <h2 style="margin-top: 0;">Detalles de tu suscripción</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
        <tr>
          <td><strong>Producto:</strong></td>
          <td style="text-align: right;">${productName} x${quantity}</td>
        </tr>
        <tr>
          <td><strong>Frecuencia:</strong></td>
          <td style="text-align: right;">${frequency === 'monthly' ? 'Mensual' : 'Bimensual'}</td>
        </tr>
        <tr>
          <td><strong>Precio por envío:</strong></td>
          <td style="text-align: right;">${formatCurrency(pricePerDeliveryCents)}</td>
        </tr>
        <tr>
          <td><strong>Próximo envío:</strong></td>
          <td style="text-align: right;">${formatDate(nextDeliveryDate)}</td>
        </tr>
        <tr>
          <td><strong>Envío:</strong></td>
          <td style="text-align: right;"><span style="color: #7D9160;">Siempre gratis</span></td>
        </tr>
      </table>
    </div>

    <div class="card" style="background-color: #F0FDF4;">
      <p style="margin: 0; color: #166534;">
        <strong>Ahorro del 15%</strong><br>
        Con tu suscripción ahorras un 15% en cada envío respecto al precio normal.
      </p>
    </div>

    <p class="text-center">
      <a href="${EMAIL_CONFIG.baseUrl}/cuenta/suscripciones" class="button">
        Gestionar suscripción
      </a>
    </p>

    <hr class="divider">

    <h2>Información importante</h2>

    <p>
      <strong>Flexibilidad total:</strong> Puedes pausar, modificar o cancelar tu suscripción en cualquier momento desde tu cuenta.<br><br>
      <strong>Aviso de cobro:</strong> Te avisaremos por email 3 días antes de cada cobro.<br><br>
      <strong>Cambiar dirección:</strong> Puedes actualizar tu dirección de envío antes de cada renovación.
    </p>

    <p class="text-small">
      ¿Tienes dudas? Escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a>.
    </p>

    <p>
      ¡Gracias por suscribirte!<br>
      <strong>El equipo de Poppy</strong>
    </p>
  `;

  return {
    subject: 'Tu suscripción Poppy está activa',
    html: emailLayout(content, `Tu suscripción a ${productName} está activa. Próximo envío: ${formatDate(nextDeliveryDate)}.`).replace('{{email}}', email),
  };
}

// ==========================================
// Subscription Renewed (Successful payment)
// ==========================================

export interface SubscriptionRenewedData {
  email: string;
  customerName: string;
  productName: string;
  quantity: number;
  amountPaidCents: number;
  invoiceId: string;
  nextDeliveryDate: Date | string;
  nextPaymentDate: Date | string;
}

export function subscriptionRenewedEmail(data: SubscriptionRenewedData): { subject: string; html: string } {
  const {
    email,
    customerName,
    productName,
    quantity,
    amountPaidCents,
    invoiceId,
    nextDeliveryDate,
    nextPaymentDate,
  } = data;

  const firstName = customerName?.split(' ')[0] || 'Cliente';

  const content = `
    <h1>Renovación confirmada</h1>

    <p>
      Hola ${firstName}, tu suscripción se ha renovado correctamente.
      Estamos preparando tu pedido.
    </p>

    <div class="card">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
        <tr>
          <td><strong>Producto:</strong></td>
          <td style="text-align: right;">${productName} x${quantity}</td>
        </tr>
        <tr>
          <td><strong>Importe cobrado:</strong></td>
          <td style="text-align: right;">${formatCurrency(amountPaidCents)}</td>
        </tr>
        <tr>
          <td><strong>N° factura:</strong></td>
          <td style="text-align: right;">${invoiceId}</td>
        </tr>
      </table>
    </div>

    <div class="card" style="background-color: #FEF3C7;">
      <p style="margin: 0; color: #92400E;">
        <strong>Próximos pasos:</strong><br>
        Tu pedido será enviado en las próximas 24-48h. Te avisaremos con el número de seguimiento.
      </p>
    </div>

    <p class="text-center">
      <a href="${EMAIL_CONFIG.baseUrl}/cuenta/pedidos" class="button">
        Ver mis pedidos
      </a>
    </p>

    <hr class="divider">

    <p class="text-small">
      <strong>Próxima renovación:</strong> ${formatDate(nextPaymentDate)}<br>
      Puedes gestionar tu suscripción en cualquier momento desde
      <a href="${EMAIL_CONFIG.baseUrl}/cuenta/suscripciones">tu cuenta</a>.
    </p>

    <p>
      ¡Gracias por seguir confiando en nosotros!<br>
      <strong>El equipo de Poppy</strong>
    </p>
  `;

  return {
    subject: 'Renovación de suscripción confirmada',
    html: emailLayout(content, `Tu suscripción se ha renovado. Importe: ${formatCurrency(amountPaidCents)}.`).replace('{{email}}', email),
  };
}

// ==========================================
// Subscription Payment Failed
// ==========================================

export interface SubscriptionFailedData {
  email: string;
  customerName: string;
  productName: string;
  amountCents: number;
  failureReason?: string;
  retryDate?: Date | string;
  updatePaymentUrl: string;
}

export function subscriptionFailedEmail(data: SubscriptionFailedData): { subject: string; html: string } {
  const {
    email,
    customerName,
    productName,
    amountCents,
    failureReason,
    retryDate,
    updatePaymentUrl,
  } = data;

  const firstName = customerName?.split(' ')[0] || 'Cliente';

  const content = `
    <h1>Problema con el pago de tu suscripción</h1>

    <p>
      Hola ${firstName}, no hemos podido procesar el pago de tu suscripción a <strong>${productName}</strong>.
    </p>

    <div class="card" style="background-color: #FEF2F2;">
      <p style="margin: 0; color: #991B1B;">
        <strong>Importe pendiente:</strong> ${formatCurrency(amountCents)}<br>
        ${failureReason ? `<strong>Motivo:</strong> ${failureReason}` : ''}
      </p>
    </div>

    <p>
      Para evitar que tu suscripción se cancele, por favor actualiza tu método de pago:
    </p>

    <p class="text-center">
      <a href="${updatePaymentUrl}" class="button" style="background-color: #DC2626;">
        Actualizar método de pago
      </a>
    </p>

    ${
      retryDate
        ? `
    <p class="text-small text-center">
      Intentaremos el cobro de nuevo el <strong>${formatDate(retryDate)}</strong>.
    </p>
    `
        : ''
    }

    <hr class="divider">

    <h2>¿Qué puedes hacer?</h2>

    <p>
      <strong>1. Verificar tu tarjeta:</strong> Asegúrate de que tu tarjeta no haya caducado y tenga fondos suficientes.<br><br>
      <strong>2. Actualizar el método de pago:</strong> Añade una nueva tarjeta desde tu cuenta.<br><br>
      <strong>3. Contactarnos:</strong> Si necesitas ayuda, escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a>.
    </p>

    <p class="text-small">
      Si no actualizas tu método de pago, tu suscripción podría cancelarse automáticamente tras varios intentos fallidos.
    </p>

    <p>
      Estamos aquí para ayudarte,<br>
      <strong>El equipo de Poppy</strong>
    </p>
  `;

  return {
    subject: 'Acción requerida: Problema con tu suscripción',
    html: emailLayout(content, `No pudimos procesar el pago de tu suscripción. Por favor, actualiza tu método de pago.`).replace('{{email}}', email),
  };
}

// ==========================================
// Subscription Cancelled
// ==========================================

export interface SubscriptionCancelledData {
  email: string;
  customerName: string;
  productName: string;
  endDate: Date | string;
  reason?: string;
}

export function subscriptionCancelledEmail(data: SubscriptionCancelledData): { subject: string; html: string } {
  const {
    email,
    customerName,
    productName,
    endDate,
    reason,
  } = data;

  const firstName = customerName?.split(' ')[0] || 'Cliente';

  const content = `
    <h1>Suscripción cancelada</h1>

    <p>
      Hola ${firstName}, confirmamos que tu suscripción a <strong>${productName}</strong> ha sido cancelada.
    </p>

    <div class="card">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
        <tr>
          <td><strong>Producto:</strong></td>
          <td style="text-align: right;">${productName}</td>
        </tr>
        <tr>
          <td><strong>Activa hasta:</strong></td>
          <td style="text-align: right;">${formatDate(endDate)}</td>
        </tr>
        ${
          reason
            ? `
        <tr>
          <td><strong>Motivo:</strong></td>
          <td style="text-align: right;">${reason}</td>
        </tr>
        `
            : ''
        }
      </table>
    </div>

    <p>
      Seguirás recibiendo tu granola hasta el <strong>${formatDate(endDate)}</strong>.
      Después de esa fecha, no se realizarán más cobros.
    </p>

    <hr class="divider">

    <p>
      Lamentamos verte marchar. Si cambiaste de opinión o fue un error, puedes reactivar tu suscripción en cualquier momento:
    </p>

    <p class="text-center">
      <a href="${EMAIL_CONFIG.baseUrl}/suscripcion" class="button button-secondary">
        Reactivar suscripción
      </a>
    </p>

    <p class="text-small">
      Si tienes comentarios sobre cómo podemos mejorar, nos encantaría escucharte.
      Escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a>.
    </p>

    <p>
      ¡Esperamos verte pronto!<br>
      <strong>El equipo de Poppy</strong>
    </p>
  `;

  return {
    subject: 'Confirmación de cancelación de suscripción',
    html: emailLayout(content, `Tu suscripción a ${productName} ha sido cancelada. Activa hasta: ${formatDate(endDate)}.`).replace('{{email}}', email),
  };
}
