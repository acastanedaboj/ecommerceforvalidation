import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const NOTIFY_EMAIL = 'alvaro.castanneda@gmail.com';

interface MayoristaFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  businessType: string;
  location?: string;
  estimatedVolume?: string;
  message?: string;
}

const businessTypeLabels: Record<string, string> = {
  cafeteria: 'Cafetería / Coffee Shop',
  tienda: 'Tienda de alimentación',
  hotel: 'Hotel / Hostelería',
  gimnasio: 'Gimnasio / Centro wellness',
  distribuidor: 'Distribuidor',
  otro: 'Otro',
};

export async function POST(request: Request) {
  try {
    const data: MayoristaFormData = await request.json();

    // Initialize Resend at runtime (not at build time)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Validate required fields
    if (!data.companyName || !data.contactName || !data.email || !data.businessType) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Build email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #A66842; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Nueva Solicitud Mayorista</h1>
        </div>

        <div style="padding: 30px; background-color: #FDF9F3;">
          <h2 style="color: #44403c; border-bottom: 2px solid #A66842; padding-bottom: 10px;">
            Datos de la empresa
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #78716c; width: 40%;">Empresa:</td>
              <td style="padding: 10px 0; color: #1c1917; font-weight: bold;">${data.companyName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Contacto:</td>
              <td style="padding: 10px 0; color: #1c1917; font-weight: bold;">${data.contactName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Email:</td>
              <td style="padding: 10px 0; color: #1c1917;">
                <a href="mailto:${data.email}" style="color: #A66842;">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Teléfono:</td>
              <td style="padding: 10px 0; color: #1c1917;">
                <a href="tel:${data.phone}" style="color: #A66842;">${data.phone}</a>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Tipo de negocio:</td>
              <td style="padding: 10px 0; color: #1c1917; font-weight: bold;">
                ${businessTypeLabels[data.businessType] || data.businessType}
              </td>
            </tr>
            ${data.location ? `
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Ubicación:</td>
              <td style="padding: 10px 0; color: #1c1917;">${data.location}</td>
            </tr>
            ` : ''}
            ${data.estimatedVolume ? `
            <tr>
              <td style="padding: 10px 0; color: #78716c;">Volumen estimado:</td>
              <td style="padding: 10px 0; color: #1c1917; font-weight: bold;">${data.estimatedVolume} kg/mes</td>
            </tr>
            ` : ''}
          </table>

          ${data.message ? `
          <h3 style="color: #44403c; margin-top: 30px; border-bottom: 2px solid #A66842; padding-bottom: 10px;">
            Mensaje
          </h3>
          <p style="color: #1c1917; background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #A66842;">
            ${data.message.replace(/\n/g, '<br>')}
          </p>
          ` : ''}
        </div>

        <div style="background-color: #44403c; padding: 20px; text-align: center;">
          <p style="color: #d6d3d1; margin: 0; font-size: 14px;">
            Este email fue enviado desde el formulario de mayoristas de Granola Artesanal
          </p>
        </div>
      </div>
    `;

    // Send email
    const { error } = await resend.emails.send({
      from: 'Granola Artesanal <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      replyTo: data.email,
      subject: `Nueva solicitud mayorista: ${data.companyName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
