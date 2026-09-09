/**
 * Reservation notification email (internal)
 *
 * Sent to the Poppy team when a customer reserves a product from the catalog.
 * Online purchasing is disabled; reservations are fulfilled by hand in Málaga.
 */

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  productName: string;
  quantity: number;
  note?: string;
}

export function reservationEmail(data: ReservationData): { subject: string; html: string } {
  const { name, email, phone, productName, quantity, note } = data;

  const subject = `Nueva reserva — ${name} · ${quantity}× ${productName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #A66842; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Nueva reserva · Poppy</h1>
      </div>

      <div style="padding: 30px; background-color: #FDF9F3;">
        <h2 style="color: #44403c; border-bottom: 2px solid #A66842; padding-bottom: 10px; font-size: 16px;">
          Datos del cliente
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #78716c; width: 35%;">Nombre:</td>
            <td style="padding: 8px 0; color: #1c1917; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Email:</td>
            <td style="padding: 8px 0; color: #1c1917;">
              <a href="mailto:${email}" style="color: #A66842;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Teléfono:</td>
            <td style="padding: 8px 0; color: #1c1917;">
              <a href="tel:${phone}" style="color: #A66842;">${phone}</a>
            </td>
          </tr>
        </table>

        <h2 style="color: #44403c; border-bottom: 2px solid #A66842; padding-bottom: 10px; margin-top: 28px; font-size: 16px;">
          Reserva
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #78716c; width: 35%;">Producto:</td>
            <td style="padding: 8px 0; color: #1c1917; font-weight: bold;">${productName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Cantidad:</td>
            <td style="padding: 8px 0; color: #1c1917; font-weight: bold;">
              ${quantity} ${quantity === 1 ? 'bolsa' : 'bolsas'}
            </td>
          </tr>
        </table>

        ${
          note
            ? `<div style="background-color: #fff; padding: 15px; border-radius: 8px; margin-top: 18px;">
                 <p style="color: #78716c; margin: 0 0 4px 0; font-size: 13px;">Comentario:</p>
                 <p style="color: #1c1917; margin: 0;">${note}</p>
               </div>`
            : ''
        }

        <div style="background-color: #fff; padding: 15px; border-radius: 8px; border-left: 4px solid #A66842; margin-top: 20px;">
          <p style="color: #44403c; margin: 0; font-weight: bold;">Acción requerida</p>
          <p style="color: #1c1917; margin: 5px 0 0 0;">
            Contactar al cliente para confirmar disponibilidad del próximo lote y concertar
            la entrega en mano en Málaga.
          </p>
        </div>
      </div>

      <div style="background-color: #44403c; padding: 18px; text-align: center;">
        <p style="color: #d6d3d1; margin: 0; font-size: 13px;">
          Reserva enviada desde el catálogo de poppy.es
        </p>
        <p style="color: #a8a29e; margin: 5px 0 0 0; font-size: 12px;">
          ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  `;

  return { subject, html };
}
