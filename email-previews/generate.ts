import { welcomeEmail } from '../src/lib/email/templates/welcome';
import { orderConfirmationEmail } from '../src/lib/email/templates/order-confirmation';
import { orderShippedEmail } from '../src/lib/email/templates/order-shipped';
import {
  subscriptionActiveEmail,
  subscriptionRenewedEmail,
  subscriptionFailedEmail,
  subscriptionCancelledEmail,
} from '../src/lib/email/templates/subscription';
import * as fs from 'fs';

// 1. Welcome Email
const welcome = welcomeEmail({
  name: 'María García',
  email: 'maria@ejemplo.com',
});
fs.writeFileSync('email-previews/1-welcome.html', welcome.html);
console.log('✓ Welcome:', welcome.subject);

// 2. Order Confirmation
const orderConfirm = orderConfirmationEmail({
  email: 'maria@ejemplo.com',
  customerName: 'María García',
  orderId: 'POP12345',
  orderDate: new Date(),
  items: [
    { name: 'Granola Clásica 350g', quantity: 2, priceInCents: 900 },
    { name: 'Granola Chocolate 350g', quantity: 1, priceInCents: 900 },
  ],
  subtotalCents: 2700,
  shippingCents: 0,
  discountCents: 270,
  totalCents: 2430,
  shippingAddress: {
    name: 'María García',
    street: 'Calle Gran Vía 42, 3º A',
    city: 'Madrid',
    postalCode: '28013',
    country: 'España',
  },
});
fs.writeFileSync('email-previews/2-order-confirmation.html', orderConfirm.html);
console.log('✓ Order Confirmation:', orderConfirm.subject);

// 3. Order Shipped
const orderShipped = orderShippedEmail({
  email: 'maria@ejemplo.com',
  customerName: 'María García',
  orderId: 'POP12345',
  trackingNumber: 'CE123456789ES',
  trackingUrl: 'https://www.correos.es/ss/Satellite/site/aplicacion-localizador/detalle_envio-sidioma=es_ES?numero=CE123456789ES',
  carrier: 'Correos Express',
  estimatedDelivery: 'Miércoles 12 de febrero',
});
fs.writeFileSync('email-previews/3-order-shipped.html', orderShipped.html);
console.log('✓ Order Shipped:', orderShipped.subject);

// 4. Subscription Active
const subActive = subscriptionActiveEmail({
  email: 'maria@ejemplo.com',
  customerName: 'María García',
  productName: 'Granola Clásica 350g',
  quantity: 2,
  frequency: 'monthly',
  pricePerDeliveryCents: 1530,
  nextDeliveryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  subscriptionId: 'sub_123456',
});
fs.writeFileSync('email-previews/4-subscription-active.html', subActive.html);
console.log('✓ Subscription Active:', subActive.subject);

// 5. Subscription Renewed
const subRenewed = subscriptionRenewedEmail({
  email: 'maria@ejemplo.com',
  customerName: 'María García',
  productName: 'Granola Clásica 350g',
  quantity: 2,
  amountPaidCents: 1530,
  invoiceId: 'INV-2026-0042',
  nextDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
});
fs.writeFileSync('email-previews/5-subscription-renewed.html', subRenewed.html);
console.log('✓ Subscription Renewed:', subRenewed.subject);

// 6. Subscription Failed
const subFailed = subscriptionFailedEmail({
  email: 'maria@ejemplo.com',
  customerName: 'María García',
  productName: 'Granola Clásica 350g',
  amountCents: 1530,
  failureReason: 'Tarjeta rechazada por el banco',
  retryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  updatePaymentUrl: 'https://www.poppy.es/cuenta/suscripciones',
});
fs.writeFileSync('email-previews/6-subscription-failed.html', subFailed.html);
console.log('✓ Subscription Failed:', subFailed.subject);

// 7. Subscription Cancelled
const subCancelled = subscriptionCancelledEmail({
  email: 'maria@ejemplo.com',
  customerName: 'María García',
  productName: 'Granola Clásica 350g',
  endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  reason: 'Solicitado por el cliente',
});
fs.writeFileSync('email-previews/7-subscription-cancelled.html', subCancelled.html);
console.log('✓ Subscription Cancelled:', subCancelled.subject);

console.log('\n📧 7 emails generados en email-previews/');
