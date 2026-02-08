/**
 * Welcome Email Template
 *
 * Sent when a new user registers.
 */

import { emailLayout } from './base';
import { EMAIL_CONFIG } from '../resend';

export interface WelcomeEmailData {
  name: string;
  email: string;
}

export function welcomeEmail(data: WelcomeEmailData): { subject: string; html: string } {
  const { name, email } = data;
  const firstName = name?.split(' ')[0] || 'amig@';

  const content = `
    <h1>Bienvenid@ a Poppy, ${firstName}</h1>

    <p>
      Nos alegra mucho que te hayas unido a nuestra comunidad de amantes del desayuno saludable.
    </p>

    <p>
      En Poppy elaboramos granola artesanal <strong>100% sin gluten</strong>, con ingredientes
      ecológicos seleccionados: avena certificada, miel de Málaga y frutos secos premium.
    </p>

    <div class="card">
      <h2 style="margin-top: 0;">Lo que encontrarás en Poppy:</h2>
      <ul style="padding-left: 20px; margin: 0;">
        <li><strong>Granola Clásica</strong> - Nuestra receta original con miel ecológica</li>
        <li><strong>Granola Chocolate</strong> - Con cacao puro y avellanas</li>
        <li><strong>Granola Naranja</strong> - Toque cítrico y jengibre</li>
        <li><strong>Granola Dátiles</strong> - Opción vegana endulzada naturalmente</li>
      </ul>
    </div>

    <p class="text-center">
      <a href="${EMAIL_CONFIG.baseUrl}/tienda" class="button">
        Explorar la tienda
      </a>
    </p>

    <hr class="divider">

    <h2>Ventajas de tu cuenta</h2>

    <p>
      <strong>Historial de pedidos:</strong> Accede a todos tus pedidos anteriores<br>
      <strong>Checkout rápido:</strong> Tus datos guardados para compras más ágiles<br>
      <strong>Suscripciones:</strong> Ahorra un 15% con envíos automáticos
    </p>

    <p>
      Si tienes alguna pregunta, no dudes en escribirnos a
      <a href="mailto:hola@poppy.es">hola@poppy.es</a>.
      Estaremos encantados de ayudarte.
    </p>

    <p>
      ¡Gracias por confiar en nosotros!<br>
      <strong>El equipo de Poppy</strong>
    </p>
  `;

  return {
    subject: `Bienvenid@ a Poppy, ${firstName}`,
    html: emailLayout(content, 'Gracias por unirte a Poppy. Descubre nuestra granola artesanal sin gluten.').replace('{{email}}', email),
  };
}
