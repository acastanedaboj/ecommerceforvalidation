/**
 * Base Email Template
 *
 * Provides consistent styling and layout for all transactional emails.
 * Colors and fonts match the Poppy website exactly.
 */

import { EMAIL_CONFIG } from '../resend';

// Brand colors from tailwind.config.ts
const colors = {
  // Primary - Earth/Brown (CTA buttons)
  earth: {
    50: '#FAF8F7',
    100: '#F3EDEB',
    600: '#6D4D45',
    700: '#5A3F38',
  },
  // Secondary - Sky Blue (accents)
  sky: {
    100: '#E1EDF5',
    500: '#72A6CC',
    600: '#5B93BC',
  },
  // Accent - Olive/Yellow (highlights)
  olive: {
    200: '#FDFCD0',
    400: '#FCF983',
    600: '#E8DC3D',
  },
  // Backgrounds - Cream
  cream: {
    100: '#FFFEF8',
    200: '#FFFFEC',
  },
  // Text - Stone
  stone: {
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    800: '#303030',
  },
  // Taupe (secondary text)
  taupe: {
    500: '#A0857E',
  },
  // Utility
  white: '#FFFFFF',
  border: '#E5E5E5',
  error: '#DC2626',
  success: '#166534',
};

/**
 * Base email layout wrapper
 * Uses DM Sans (body) and DM Serif Display (headings) like the website
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
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <!--<![endif]-->
  ${previewText ? `<meta name="x-apple-disable-message-reformatting"><span style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${previewText}</span>` : ''}
  <style>
    /* Reset */
    body, table, td, p, a, li {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }

    /* Base styles */
    body {
      margin: 0;
      padding: 0;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: ${colors.cream[200]};
      color: ${colors.stone[800]};
      line-height: 1.6;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: ${colors.white};
    }

    /* Header - Earth brown like the CTA buttons */
    .header {
      background-color: ${colors.earth[600]};
      padding: 28px 24px;
      text-align: center;
    }

    .logo {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 32px;
      font-weight: normal;
      color: ${colors.cream[200]} !important;
      text-decoration: none;
      letter-spacing: 0.02em;
    }

    .content {
      padding: 40px 32px;
    }

    /* Footer */
    .footer {
      background-color: ${colors.cream[100]};
      padding: 32px 24px;
      text-align: center;
      font-size: 13px;
      color: ${colors.stone[500]};
      border-top: 1px solid ${colors.border};
    }

    .footer a {
      color: ${colors.earth[600]};
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    /* Typography - Editorial style */
    h1 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 28px;
      font-weight: normal;
      margin: 0 0 20px;
      color: ${colors.stone[800]};
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    h2 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 20px;
      font-weight: normal;
      margin: 28px 0 12px;
      color: ${colors.stone[800]};
      line-height: 1.3;
    }

    p {
      margin: 0 0 16px;
      color: ${colors.stone[800]};
      font-size: 15px;
      line-height: 1.7;
    }

    a {
      color: ${colors.earth[600]};
    }

    strong {
      font-weight: 600;
      color: ${colors.stone[800]};
    }

    /* Button - Editorial style (no rounded corners) */
    .button {
      display: inline-block;
      background-color: ${colors.earth[600]};
      color: ${colors.cream[200]} !important;
      padding: 14px 32px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.02em;
      margin: 20px 0;
      text-transform: uppercase;
    }

    .button:hover {
      background-color: ${colors.earth[700]};
    }

    .button-secondary {
      background-color: ${colors.sky[500]};
      color: ${colors.white} !important;
    }

    .button-secondary:hover {
      background-color: ${colors.sky[600]};
    }

    /* Cards - Editorial style */
    .card {
      background-color: ${colors.cream[100]};
      border: 1px solid ${colors.border};
      padding: 24px;
      margin: 20px 0;
    }

    /* Divider */
    .divider {
      border: none;
      border-top: 1px solid ${colors.border};
      margin: 32px 0;
    }

    /* Highlight text */
    .highlight {
      color: ${colors.earth[600]};
      font-weight: 600;
    }

    .highlight-success {
      color: ${colors.success};
    }

    /* Small text */
    .text-small {
      font-size: 13px;
      color: ${colors.stone[500]};
      line-height: 1.6;
    }

    .text-center {
      text-align: center;
    }

    /* Spacing utilities */
    .mt-4 { margin-top: 16px; }
    .mb-4 { margin-bottom: 16px; }
    .mt-6 { margin-top: 24px; }
    .mb-6 { margin-bottom: 24px; }

    /* Table styling */
    table {
      border-collapse: collapse;
    }

    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .content {
        padding: 28px 20px !important;
      }
      .header {
        padding: 24px 20px !important;
      }
      h1 {
        font-size: 24px !important;
      }
      .button {
        display: block !important;
        text-align: center !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="${EMAIL_CONFIG.baseUrl}">
        <img src="data:image/png;base64,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" alt="Poppy" width="200" style="display:block;margin:0 auto;width:200px;height:auto;" />
      </a>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p style="margin-bottom: 16px;">
        <strong style="font-family: 'DM Serif Display', Georgia, serif; font-size: 16px; color: ${colors.stone[800]};">Poppy</strong><br>
        Granola artesanal sin gluten · Hecha en Málaga
      </p>
      <p style="margin-bottom: 20px;">
        <a href="${EMAIL_CONFIG.baseUrl}">Tienda</a> &nbsp;&nbsp;·&nbsp;&nbsp;
        <a href="https://instagram.com/poppy_granola">Instagram</a> &nbsp;&nbsp;·&nbsp;&nbsp;
        <a href="${EMAIL_CONFIG.baseUrl}/legal/privacidad">Privacidad</a>
      </p>
      <p style="font-size: 12px; color: ${colors.stone[400]};">
        Este email fue enviado a {{email}}<br>
        © ${new Date().getFullYear()} Poppy. Todos los derechos reservados.
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
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export { colors };
