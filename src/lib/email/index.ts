/**
 * Email Service
 *
 * Centralized email sending functionality for all transactional emails.
 */

import { sendEmail, EMAIL_CONFIG } from './resend';
import { welcomeEmail, WelcomeEmailData } from './templates/welcome';
import { orderConfirmationEmail, OrderConfirmationData } from './templates/order-confirmation';
import { orderShippedEmail, OrderShippedData } from './templates/order-shipped';
import {
  subscriptionActiveEmail,
  subscriptionRenewedEmail,
  subscriptionFailedEmail,
  subscriptionCancelledEmail,
  SubscriptionActiveData,
  SubscriptionRenewedData,
  SubscriptionFailedData,
  SubscriptionCancelledData,
} from './templates/subscription';

// ==========================================
// Email Sending Functions
// ==========================================

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(data: WelcomeEmailData) {
  const { subject, html } = welcomeEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    tags: [{ name: 'type', value: 'welcome' }],
  });
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  const { subject, html } = orderConfirmationEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    tags: [
      { name: 'type', value: 'order_confirmation' },
      { name: 'order_id', value: data.orderId },
    ],
  });
}

/**
 * Send order shipped email
 */
export async function sendOrderShippedEmail(data: OrderShippedData) {
  const { subject, html } = orderShippedEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    tags: [
      { name: 'type', value: 'order_shipped' },
      { name: 'order_id', value: data.orderId },
    ],
  });
}

/**
 * Send subscription active email (new subscription)
 */
export async function sendSubscriptionActiveEmail(data: SubscriptionActiveData) {
  const { subject, html } = subscriptionActiveEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    tags: [
      { name: 'type', value: 'subscription_active' },
      { name: 'subscription_id', value: data.subscriptionId },
    ],
  });
}

/**
 * Send subscription renewed email (successful payment)
 */
export async function sendSubscriptionRenewedEmail(data: SubscriptionRenewedData) {
  const { subject, html } = subscriptionRenewedEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    tags: [
      { name: 'type', value: 'subscription_renewed' },
      { name: 'invoice_id', value: data.invoiceId },
    ],
  });
}

/**
 * Send subscription payment failed email
 */
export async function sendSubscriptionFailedEmail(data: SubscriptionFailedData) {
  const { subject, html } = subscriptionFailedEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    tags: [{ name: 'type', value: 'subscription_failed' }],
  });
}

/**
 * Send subscription cancelled email
 */
export async function sendSubscriptionCancelledEmail(data: SubscriptionCancelledData) {
  const { subject, html } = subscriptionCancelledEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    tags: [{ name: 'type', value: 'subscription_cancelled' }],
  });
}

// ==========================================
// Re-export types and config
// ==========================================

export { EMAIL_CONFIG };
export type {
  WelcomeEmailData,
  OrderConfirmationData,
  OrderShippedData,
  SubscriptionActiveData,
  SubscriptionRenewedData,
  SubscriptionFailedData,
  SubscriptionCancelledData,
};
