import { Metadata } from 'next';
import { BUSINESS, SHIPPING, PRICING } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Condiciones de Venta',
  description: 'Condiciones generales de venta de Poppy.',
};

export default function CondicionesVentaPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">
          Condiciones Generales de Venta
        </h1>

        <div className="prose-custom">
          <p className="text-neutral-600 mb-6">
            Última actualización: Enero 2024
          </p>

          <h2>1. Identificación del vendedor</h2>
          <p>
            <strong>Denominación:</strong> {BUSINESS.name}<br />
            <strong>Domicilio:</strong> {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}<br />
            <strong>Email:</strong> {BUSINESS.email}<br />
            <strong>Teléfono:</strong> {BUSINESS.phone}
          </p>

          <h2>2. Ámbito de aplicación</h2>
          <p>
            Estas condiciones generales de venta regulan la relación comercial
            entre {BUSINESS.name} y los clientes que realicen compras a través
            de nuestro sitio web.
          </p>
          <p>
            Al realizar un pedido, el cliente acepta expresamente estas condiciones.
          </p>

          <h2>3. Productos</h2>
          <p>
            Todos nuestros productos son granola Poppy elaborada con ingredientes
            de alta calidad. Las características de cada producto se detallan en su
            ficha correspondiente.
          </p>
          <p>
            Las imágenes de los productos son orientativas. Pueden existir ligeras
            variaciones debido al carácter artesanal de la elaboración.
          </p>

          <h2>4. Precios e impuestos</h2>
          <p>
            Todos los precios mostrados en la web <strong>incluyen el IVA</strong> aplicable
            (actualmente el {PRICING.VAT_RATE * 100}% para productos alimenticios).
          </p>
          <p>
            Los precios pueden ser modificados en cualquier momento, si bien se
            aplicará el precio vigente en el momento de la confirmación del pedido.
          </p>

          <h3>4.1 Packs y descuentos</h3>
          <ul>
            <li>Pack 3: 3% de descuento por unidad</li>
            <li>Pack 4: 5% de descuento por unidad + envío gratis</li>
            <li>Pack 6: 10% de descuento por unidad + envío gratis</li>
            <li>Suscripción: 15% de descuento + envío gratis</li>
          </ul>

          <h2>5. Proceso de compra</h2>
          <p>El proceso de compra consta de los siguientes pasos:</p>
          <ol>
            <li>Selección de productos y añadir al carrito</li>
            <li>Revisión del carrito y aplicación de descuentos</li>
            <li>Introducción de datos de envío y facturación</li>
            <li>Selección del método de pago</li>
            <li>Confirmación y pago del pedido</li>
          </ol>
          <p>
            Una vez confirmado el pedido, recibirás un email de confirmación con
            los detalles del mismo.
          </p>

          <h2>6. Métodos de pago</h2>
          <p>Aceptamos los siguientes métodos de pago:</p>
          <ul>
            <li><strong>Tarjeta de crédito/débito:</strong> Visa, Mastercard, American Express</li>
            <li><strong>Pago contra reembolso:</strong> Con un coste adicional de 2,00€</li>
          </ul>
          <p>
            Los pagos con tarjeta se procesan de forma segura a través de Stripe,
            cumpliendo con los estándares PCI-DSS.
          </p>

          <h2>7. Envío y entrega</h2>
          <h3>7.1 Gastos de envío</h3>
          <ul>
            <li>Envío estándar Península: {(SHIPPING.STANDARD_COST_CENTS / 100).toFixed(2)}€</li>
            <li>Envío gratis: pedidos de 4 o más bolsas, o superiores a 35€</li>
            <li>Suscripciones: envío siempre gratis</li>
          </ul>

          <h3>7.2 Plazos de entrega</h3>
          <ul>
            <li>Península: {SHIPPING.ESTIMATED_DAYS.peninsula}</li>
            <li>Baleares/Canarias: {SHIPPING.ESTIMATED_DAYS.islands}</li>
          </ul>
          <p>
            Los plazos son orientativos y pueden variar según la disponibilidad
            del transportista.
          </p>

          <h2>8. Derecho de desistimiento</h2>
          <p>
            De acuerdo con la normativa vigente, dispones de un plazo de
            <strong> 14 días naturales</strong> desde la recepción del producto
            para ejercer el derecho de desistimiento.
          </p>
          <p>
            <strong>Limitaciones:</strong> Al tratarse de productos alimentarios,
            no se admitirán devoluciones de productos que hayan sido abiertos o
            cuyo precinto de seguridad haya sido roto, por motivos de higiene y
            seguridad alimentaria.
          </p>

          <h2>9. Garantía y reclamaciones</h2>
          <p>
            Si recibes un producto defectuoso o diferente al solicitado, contacta
            con nosotros en un plazo de 48 horas desde la recepción para gestionar
            el cambio o reembolso.
          </p>
          <p>
            Necesitaremos fotos del producto y el embalaje para tramitar la reclamación.
          </p>

          <h2>10. Suscripciones</h2>
          <p>
            Las suscripciones se renuevan automáticamente cada mes. Puedes cancelar
            o pausar tu suscripción en cualquier momento desde tu cuenta de usuario.
          </p>
          <p>
            La cancelación se hará efectiva al final del período de facturación actual.
          </p>

          <h2>11. Propiedad intelectual</h2>
          <p>
            Todos los contenidos del sitio web (textos, imágenes, logotipos, etc.)
            son propiedad de {BUSINESS.name} y están protegidos por las leyes de
            propiedad intelectual.
          </p>

          <h2>12. Ley aplicable y jurisdicción</h2>
          <p>
            Estas condiciones se rigen por la legislación española. Para cualquier
            controversia, las partes se someten a los juzgados y tribunales de
            {BUSINESS.address.city}, salvo que la normativa de protección de
            consumidores establezca otro fuero.
          </p>

          <h2>13. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con estas condiciones o con tu
            pedido, puedes contactar con nosotros en:
          </p>
          <ul>
            <li>Email: {BUSINESS.email}</li>
            <li>Teléfono: {BUSINESS.phone}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
