/**
 * Base Email Template
 *
 * Provides consistent styling and layout for all transactional emails.
 */

import { EMAIL_CONFIG } from '../resend';

// Brand colors
const colors = {
  primary: '#E05A47', // Terracotta
  secondary: '#7D9160', // Olive
  text: '#1C1C1C',
  textLight: '#6B7280',
  background: '#FFFDF8', // Cream
  white: '#FFFFFF',
  border: '#E5E7EB',
};

/**
 * Base email layout wrapper
 */
export function emailLayout(content: string, previewText?: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Poppy</title>
  ${previewText ? `<!--[if !mso]><!--><meta name="x-apple-disable-message-reformatting"><!--<![endif]--><span style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${previewText}</span>` : ''}
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: ${colors.background};
      color: ${colors.text};
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: ${colors.white};
    }
    .header {
      background-color: ${colors.primary};
      padding: 32px 24px;
      text-align: center;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: ${colors.white};
      text-decoration: none;
    }
    .content {
      padding: 32px 24px;
    }
    .footer {
      background-color: ${colors.background};
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: ${colors.textLight};
    }
    .footer a {
      color: ${colors.textLight};
    }
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 16px;
      color: ${colors.text};
    }
    h2 {
      font-size: 18px;
      font-weight: 600;
      margin: 24px 0 12px;
      color: ${colors.text};
    }
    p {
      margin: 0 0 16px;
      color: ${colors.text};
    }
    .button {
      display: inline-block;
      background-color: ${colors.primary};
      color: ${colors.white} !important;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 16px 0;
    }
    .button-secondary {
      background-color: ${colors.secondary};
    }
    .card {
      background-color: ${colors.background};
      border-radius: 8px;
      padding: 20px;
      margin: 16px 0;
    }
    .divider {
      border: none;
      border-top: 1px solid ${colors.border};
      margin: 24px 0;
    }
    .product-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid ${colors.border};
    }
    .product-info {
      flex: 1;
    }
    .product-price {
      text-align: right;
      font-weight: 600;
    }
    .total-row {
      padding: 16px 0;
      font-weight: 600;
      font-size: 18px;
    }
    .highlight {
      color: ${colors.primary};
      font-weight: 600;
    }
    .text-small {
      font-size: 14px;
      color: ${colors.textLight};
    }
    .text-center {
      text-align: center;
    }
    .mt-4 { margin-top: 16px; }
    .mb-4 { margin-bottom: 16px; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 24px 16px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="${EMAIL_CONFIG.baseUrl}" class="logo">Poppy</a>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>
        <strong>Poppy</strong> - Granola artesanal sin gluten<br>
        Avda. Sor Teresa Prat, 15, 29003 Málaga
      </p>
      <p class="mt-4">
        <a href="${EMAIL_CONFIG.baseUrl}">Web</a> &nbsp;|&nbsp;
        <a href="https://instagram.com/poppy_granola">Instagram</a> &nbsp;|&nbsp;
        <a href="${EMAIL_CONFIG.baseUrl}/legal/privacidad">Privacidad</a>
      </p>
      <p class="mt-4">
        Este email fue enviado a {{email}}.<br>
        &copy; ${new Date().getFullYear()} Poppy. Todos los derechos reservados.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Format currency in EUR
 */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}

/**
 * Format date in Spanish
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export { colors };
