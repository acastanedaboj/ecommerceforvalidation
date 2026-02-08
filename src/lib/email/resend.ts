/**
 * Resend Email Client
 *
 * Handles transactional email sending via Resend API.
 */

import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const EMAIL_CONFIG = {
  from: 'Poppy <hola@poppy.es>',
  replyTo: 'hola@poppy.es',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://www.poppy.es',
} as const;

// Email types for tracking
export type EmailType =
  | 'welcome'
  | 'order_confirmation'
  | 'order_shipped'
  | 'subscription_active'
  | 'subscription_renewed'
  | 'subscription_failed'
  | 'subscription_cancelled';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  tags?: { name: string; value: string }[];
}

/**
 * Send an email via Resend
 */
export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, html, text, tags } = options;

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to,
      subject,
      html,
      text,
      replyTo: EMAIL_CONFIG.replyTo,
      tags,
    });

    if (error) {
      console.error('Failed to send email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log(`Email sent successfully: ${data?.id}`);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export { resend };
