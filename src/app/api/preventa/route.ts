import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { formatPrice } from '@/lib/utils';

const NOTIFY_EMAIL = 'alvaro.castanneda@gmail.com';

interface PreventaFormData {
  email: string;
  nombre: string;
  apellidos: string;
  producto: string;
  cantidad: number;
}

const productNames: Record<string, string> = {
  'prod_granola_clasica': 'Granola Clásica',
  'prod_granola_naranja': 'Granola de Naranja',
};

export async function POST(request: Request) {
  try {
    const data: PreventaFormData = await request.json();

    // Initialize Resend at runtime (not at build time)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Validate required fields
    if (!data.email || !data.nombre || !data.apellidos || !data.producto || !data.cantidad) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validate cantidad range
    if (data.cantidad < 1 || data.cantidad > 10) {
      return NextResponse.json(
        { error: 'La cantidad debe estar entre 1 y 10' },
        { status: 400 }
      );
    }

    // Validate product exists
    if (!productNames[data.producto]) {
      return NextResponse.json(
        { error: 'Producto no válido' },
        { status: 400 }
      );
    }

    // Calculate price
    const UNIT_PRICE_CENTS = 900; // 9.00€
    const totalCents = data.cantidad * UNIT_PRICE_CENTS;
    const totalPrice = formatPrice(totalCents);
    const unitPrice = formatPrice(UNIT_PRICE_CENTS);

    // Build email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #A66842; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Nueva Preventa - Poppy</h1>
        </div>

        <div style="padding: 30px; background-color: #FDF9F3;">
          <h2 style="color: #44403c; border-bottom: 2px solid #A66842; padding-bottom: 10px;">
            Datos del cliente
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #78716c; width: 40%;">Nombre completo:</td>
              <td style="padding: 10px 0; color: #1c1917; font-weight: bold;">
                ${data.nombre} ${data.apellidos}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Email:</td>
              <td style="padding: 10px 0; color: #1c1917;">
                <a href="mailto:${data.email}" style="color: #A66842;">${data.email}</a>
              </td>
            </tr>
          </table>

          <h2 style="color: #44403c; border-bottom: 2px solid #A66842; padding-bottom: 10px; margin-top: 30px;">
            Detalle del pedido
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #78716c; width: 40%;">Producto:</td>
              <td style="padding: 10px 0; color: #1c1917; font-weight: bold;">
                ${productNames[data.producto]}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Cantidad:</td>
              <td style="padding: 10px 0; color: #1c1917; font-weight: bold;">
                ${data.cantidad} ${data.cantidad === 1 ? 'unidad' : 'unidades'}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Precio unitario:</td>
              <td style="padding: 10px 0; color: #1c1917;">${unitPrice}</td>
            </tr>
            <tr style="border-top: 2px solid #A66842;">
              <td style="padding: 10px 0; color: #78716c; font-weight: bold;">TOTAL:</td>
              <td style="padding: 10px 0; color: #A66842; font-weight: bold; font-size: 18px;">
                ${totalPrice}
              </td>
            </tr>
          </table>

          <div style="background-color: #fff; padding: 15px; border-radius: 8px; border-left: 4px solid #A66842; margin-top: 20px;">
            <p style="color: #44403c; margin: 0; font-weight: bold;">
              ⚠️ Acción requerida:
            </p>
            <p style="color: #1c1917; margin: 5px 0 0 0;">
              Contactar al cliente para coordinar la entrega en mano y confirmar el pedido.
            </p>
          </div>
        </div>

        <div style="background-color: #44403c; padding: 20px; text-align: center;">
          <p style="color: #d6d3d1; margin: 0; font-size: 14px;">
            Este email fue enviado desde el formulario de preventa de Poppy
          </p>
          <p style="color: #a8a29e; margin: 5px 0 0 0; font-size: 12px;">
            ${new Date().toLocaleString('es-ES', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}
          </p>
        </div>
      </div>
    `;

    // Send email
    const { error } = await resend.emails.send({
      from: 'Poppy <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      replyTo: data.email,
      subject: `Nueva preventa - ${data.nombre} ${data.apellidos}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Pedido registrado correctamente',
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
