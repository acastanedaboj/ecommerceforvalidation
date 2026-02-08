/**
 * Welcome Email Template
 *
 * Sent when a new user registers.
 * Tone: Cercano, cuidado del bienestar, healthy, premium
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
    <h1>Hola ${firstName}, bienvenid@ a la familia Poppy</h1>

    <p>
      Qué ilusión tenerte aquí. En Poppy creemos que <strong>cuidarte empieza por el desayuno</strong>,
      y estamos encantados de acompañarte en ese ritual diario.
    </p>

    <p>
      Elaboramos cada lote de granola de forma artesanal, <strong>en Málaga</strong>, con ingredientes ecológicos
      que seleccionamos personalmente: avena sin gluten certificada, miel de apicultores locales
      y frutos secos de primera calidad. Sin prisas, sin aditivos, solo lo bueno.
    </p>

    <div class="card" style="background-color: #FFFEF8;">
      <h2 style="margin-top: 0; color: #6D4D45;">Nuestras granolas, hechas para ti:</h2>
      <ul style="padding-left: 20px; margin: 0; line-height: 1.8;">
        <li><strong>Clásica</strong> – La receta original con miel ecológica y un toque crujiente perfecto</li>
        <li><strong>Chocolate</strong> – Cacao puro y pepitas de chocolate negro para los amantes del cacao</li>
        <li><strong>Naranja</strong> – Cítricos mediterráneos y jengibre que despiertan tus sentidos</li>
        <li><strong>Vegana</strong> – 100% vegana, endulzada con sirope de agave ecológico</li>
      </ul>
    </div>

    <p style="text-align: center; font-style: italic; color: #737373;">
      Cada bolsa es una pequeña forma de quererte un poco más.
    </p>

    <p class="text-center">
      <a href="${EMAIL_CONFIG.baseUrl}/tienda" class="button">
        Descubrir la tienda
      </a>
    </p>

    <hr class="divider">

    <h2>Tu cuenta, tus ventajas</h2>

    <p>
      <strong>Pedidos guardados:</strong> Tu historial siempre a mano<br>
      <strong>Compra rápida:</strong> Checkout en segundos<br>
      <strong>Suscripción:</strong> Ahorra un 15% y recibe tu granola sin pensar en ello
    </p>

    <div class="card" style="background-color: #E1EDF5;">
      <p style="margin: 0; color: #3B6280;">
        <strong>Un consejo:</strong> La granola Poppy está deliciosa con yogur natural,
        leche de avena o directamente del bote (no juzgamos).
      </p>
    </div>

    <p>
      ¿Tienes alguna duda? Escríbenos a
      <a href="mailto:hola@poppy.es">hola@poppy.es</a>.
      Somos personas reales y nos encanta charlar.
    </p>

    <p>
      Con cariño,<br>
      <strong>El equipo Poppy</strong>
    </p>

    <p class="text-small" style="color: #A3A3A3;">
      P.D. Síguenos en Instagram <a href="https://instagram.com/poppy.granola">@poppy.granola</a>
      para recetas, inspiración y algún que otro descuento sorpresa.
    </p>
  `;

  return {
    subject: `${firstName}, bienvenid@ a Poppy`,
    html: emailLayout(content, 'Gracias por unirte a Poppy. Descubre nuestra granola artesanal sin gluten, hecha con amor en Málaga.').replace('{{email}}', email),
  };
}
