/**
 * Subscription Email Templates
 *
 * Templates for subscription lifecycle events.
 * Tone: Cercano, cuidado del bienestar, healthy, premium
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
  } = data;

  const firstName = customerName?.split(' ')[0] || 'Cliente';
  const frequencyText = frequency === 'monthly' ? 'cada mes' : 'cada 2 meses';

  const content = `
    <h1>${firstName}, tu bienestar ya está automatizado</h1>

    <p>
      ¡Enhorabuena! Has dado el paso más inteligente: asegurarte de que nunca te falte
      tu granola favorita. A partir de ahora, ${frequencyText} recibirás tu dosis de
      crujiente sin mover un dedo.
    </p>

    <div class="card" style="background-color: #FFFEF8;">
      <h2 style="margin-top: 0; color: #6D4D45;">Tu suscripción</h2>
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
          <td style="text-align: right;"><strong style="color: #6D4D45;">${formatDate(nextDeliveryDate)}</strong></td>
        </tr>
        <tr>
          <td><strong>Envío:</strong></td>
          <td style="text-align: right;"><span style="color: #6D4D45;">Siempre gratis</span></td>
        </tr>
      </table>
    </div>

    <div class="card" style="background-color: #E1EDF5;">
      <p style="margin: 0; color: #3B6280;">
        <strong>Ahorras un 15% en cada envío</strong><br>
        Porque cuidarte a largo plazo tiene premio. Tu constancia merece ese descuento.
      </p>
    </div>

    <p class="text-center">
      <a href="${EMAIL_CONFIG.baseUrl}/cuenta/suscripciones" class="button">
        Gestionar mi suscripción
      </a>
    </p>

    <hr class="divider">

    <h2>Tienes el control total</h2>

    <p>
      <strong>Flexibilidad absoluta:</strong> Pausa, modifica o cancela cuando quieras desde tu cuenta.<br><br>
      <strong>Sin sorpresas:</strong> Te avisamos 3 días antes de cada cobro por si necesitas hacer cambios.<br><br>
      <strong>Cambio de dirección:</strong> Actualiza tu dirección de envío antes de cada renovación si lo necesitas.
    </p>

    <p class="text-small">
      ¿Dudas sobre tu suscripción? Escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a>.
      Estamos aquí para ayudarte.
    </p>

    <p>
      Gracias por confiar en nosotros,<br>
      <strong>El equipo Poppy</strong>
    </p>
  `;

  return {
    subject: `${firstName}, tu suscripción Poppy está activa`,
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
    <h1>${firstName}, tu granola del mes está en marcha</h1>

    <p>
      Todo listo. Tu suscripción se ha renovado correctamente y ya estamos preparando
      tu próximo envío con el mismo cariño de siempre.
    </p>

    <div class="card" style="background-color: #FFFEF8;">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
        <tr>
          <td><strong>Producto:</strong></td>
          <td style="text-align: right;">${productName} x${quantity}</td>
        </tr>
        <tr>
          <td><strong>Importe:</strong></td>
          <td style="text-align: right;">${formatCurrency(amountPaidCents)}</td>
        </tr>
        <tr>
          <td><strong>N° factura:</strong></td>
          <td style="text-align: right;">${invoiceId}</td>
        </tr>
      </table>
    </div>

    <div class="card" style="background-color: #E1EDF5;">
      <p style="margin: 0; color: #3B6280;">
        <strong>Tu pedido sale en 24-48h</strong><br>
        Te enviaremos el número de seguimiento en cuanto salga de nuestro obrador.
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
      Recuerda que puedes gestionar tu suscripción en cualquier momento desde
      <a href="${EMAIL_CONFIG.baseUrl}/cuenta/suscripciones">tu cuenta</a>.
    </p>

    <p>
      Gracias por seguir cuidándote con nosotros,<br>
      <strong>El equipo Poppy</strong>
    </p>
  `;

  return {
    subject: `${firstName}, tu suscripción Poppy se ha renovado`,
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
    <h1>${firstName}, necesitamos tu ayuda</h1>

    <p>
      Hemos intentado procesar el pago de tu suscripción a <strong>${productName}</strong>,
      pero algo no ha funcionado. No te preocupes, tiene fácil solución.
    </p>

    <div class="card" style="background-color: #FEF2F2;">
      <p style="margin: 0; color: #DC2626;">
        <strong>Importe pendiente:</strong> ${formatCurrency(amountCents)}<br>
        ${failureReason ? `<strong>Motivo:</strong> ${failureReason}` : 'Puede ser un problema temporal con tu tarjeta.'}
      </p>
    </div>

    <p>
      Para que tu granola siga llegando puntual, solo tienes que actualizar tu método de pago:
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
      Volveremos a intentar el cobro el <strong>${formatDate(retryDate)}</strong>.
    </p>
    `
        : ''
    }

    <hr class="divider">

    <h2>¿Qué puede haber pasado?</h2>

    <p>
      <strong>Tarjeta caducada:</strong> Comprueba que tu tarjeta sigue vigente.<br><br>
      <strong>Fondos insuficientes:</strong> Asegúrate de tener saldo disponible.<br><br>
      <strong>Límite de compras:</strong> Algunos bancos bloquean pagos recurrentes. Contacta con tu banco si es el caso.
    </p>

    <p class="text-small">
      Si no actualizas el método de pago, tu suscripción podría cancelarse automáticamente.
      ¡No queremos que te quedes sin tu granola!
    </p>

    <p>
      ¿Necesitas ayuda? Escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a>
      y lo resolvemos juntos.
    </p>

    <p>
      Estamos aquí para ti,<br>
      <strong>El equipo Poppy</strong>
    </p>
  `;

  return {
    subject: `${firstName}, hay un problema con tu suscripción Poppy`,
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
    <h1>${firstName}, vamos a echarte de menos</h1>

    <p>
      Tu suscripción a <strong>${productName}</strong> ha sido cancelada.
      Aunque nos da pena, respetamos tu decisión.
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

    <div class="card" style="background-color: #FFFEF8;">
      <p style="margin: 0; color: #6D4D45;">
        <strong>La puerta siempre está abierta</strong><br>
        Si cambias de opinión o fue un error, puedes reactivar tu suscripción
        cuando quieras. Tu bienestar nos importa.
      </p>
    </div>

    <p class="text-center">
      <a href="${EMAIL_CONFIG.baseUrl}/suscripcion" class="button button-secondary">
        Volver a suscribirme
      </a>
    </p>

    <p class="text-small">
      Si hay algo que podamos mejorar, nos encantaría saberlo.
      Escríbenos a <a href="mailto:hola@poppy.es">hola@poppy.es</a>,
      tu opinión nos ayuda a ser mejores.
    </p>

    <p>
      Gracias por haber sido parte de Poppy,<br>
      <strong>El equipo Poppy</strong>
    </p>

    <p class="text-small" style="color: #A3A3A3;">
      P.D. También puedes comprar packs puntuales en nuestra
      <a href="${EMAIL_CONFIG.baseUrl}/tienda">tienda</a> cuando quieras.
      Siempre serás bienvenid@.
    </p>
  `;

  return {
    subject: `${firstName}, tu suscripción Poppy ha sido cancelada`,
    html: emailLayout(content, `Tu suscripción a ${productName} ha sido cancelada. Activa hasta: ${formatDate(endDate)}.`).replace('{{email}}', email),
  };
}
