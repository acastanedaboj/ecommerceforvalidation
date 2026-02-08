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
      <a href="${EMAIL_CONFIG.baseUrl}" class="logo">Poppy</a>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p style="margin-bottom: 16px;">
        <strong style="font-family: 'DM Serif Display', Georgia, serif; font-size: 16px; color: ${colors.stone[800]};">Poppy</strong><br>
        Granola artesanal sin gluten · Hecha en Málaga
      </p>
      <p style="margin-bottom: 16px;">
        Avda. Sor Teresa Prat, 15, 29003 Málaga
      </p>
      <p style="margin-bottom: 20px;">
        <a href="${EMAIL_CONFIG.baseUrl}">Tienda</a> &nbsp;&nbsp;·&nbsp;&nbsp;
        <a href="https://instagram.com/poppy.granola">Instagram</a> &nbsp;&nbsp;·&nbsp;&nbsp;
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
