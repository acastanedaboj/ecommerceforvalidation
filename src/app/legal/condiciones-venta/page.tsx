import { Metadata } from 'next';
import { BUSINESS, SHIPPING, PRICING } from '@/lib/constants';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Condiciones de Venta',
  description: 'Condiciones generales de venta de Poppy.',
  alternates: {
    canonical: getCanonicalUrl('/legal/condiciones-venta'),
  },
};

export default function CondicionesVentaPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-display text-neutral-900 mb-8">
          Condiciones Generales de Venta
        </h1>

        <div className="prose-custom">
          <p className="text-neutral-600 mb-6">
            Última actualización: Febrero 2026
          </p>

          <p>
            Las presentes Condiciones Generales de Venta regulan la relación
            contractual entre el vendedor y el consumidor, en cumplimiento del
            Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se
            aprueba el texto refundido de la Ley General para la Defensa de los
            Consumidores y Usuarios (LGDCU) y la Ley 3/2014, de 27 de marzo.
          </p>

          <h2>1. Identificación del vendedor</h2>
          <p>
            De conformidad con el artículo 97 de la LGDCU, se proporciona la
            siguiente información del vendedor:
          </p>
          <p>
            <strong>Titular:</strong> {BUSINESS.name}<br />
            <strong>Forma jurídica:</strong> Empresario Individual / Autónomo<br />
            <strong>NIF:</strong> [Pendiente de inscripción]<br />
            <strong>Domicilio social:</strong> {BUSINESS.address.street},{' '}
            {BUSINESS.address.postalCode} {BUSINESS.address.city},{' '}
            {BUSINESS.address.country}<br />
            <strong>Correo electrónico:</strong> {BUSINESS.email}<br />
            <strong>Sitio web:</strong> https://poppy.es
          </p>

          <h2>2. Objeto y ámbito de aplicación</h2>
          <p>
            Las presentes condiciones generales regulan la venta de productos
            alimenticios (granola artesanal) a través del sitio web https://poppy.es.
          </p>
          <p>
            <strong>Importante:</strong> Al realizar un pedido a través de nuestro
            sitio web, declaras haber leído, comprendido y aceptado expresamente
            estas condiciones generales de venta, conforme al artículo 98 de la LGDCU.
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
            De conformidad con los artículos 102 y siguientes de la LGDCU, dispones
            de un plazo de <strong>14 días naturales</strong> desde la recepción del
            producto para ejercer el derecho de desistimiento sin necesidad de
            justificación.
          </p>

          <h3>8.1 Cómo ejercer el derecho de desistimiento</h3>
          <p>
            Para ejercer este derecho, debes notificárnoslo mediante una declaración
            inequívoca (por ejemplo, carta enviada por correo postal o electrónico)
            a las siguientes señas:
          </p>
          <ul>
            <li><strong>Email:</strong> {BUSINESS.email}</li>
            <li><strong>Dirección postal:</strong> {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}</li>
          </ul>
          <p>
            Puedes utilizar el modelo de formulario de desistimiento que encontrarás
            al final de esta sección, aunque su uso no es obligatorio.
          </p>

          <h3>8.2 Efectos del desistimiento</h3>
          <p>
            En caso de desistimiento, te devolveremos todos los pagos recibidos,
            incluidos los gastos de entrega (excepto los gastos adicionales si
            elegiste un método de entrega diferente al estándar), sin ninguna
            demora indebida y, en cualquier caso, a más tardar 14 días naturales
            desde la fecha en que se nos informe de tu decisión de desistir.
          </p>
          <p>
            Procederemos a efectuar el reembolso utilizando el mismo medio de pago
            que empleaste para la transacción inicial, salvo que expresamente hayas
            dispuesto lo contrario.
          </p>
          <p>
            Deberás devolver los bienes sin demora indebida y, en cualquier caso,
            a más tardar en el plazo de 14 días naturales desde la fecha en que nos
            comuniques tu decisión de desistimiento. Los gastos directos de devolución
            correrán a tu cargo.
          </p>

          <h3>8.3 Excepciones al derecho de desistimiento</h3>
          <p>
            <strong>IMPORTANTE - Productos alimentarios perecederos:</strong>
          </p>
          <p>
            Conforme al artículo 103.d) de la LGDCU, el derecho de desistimiento
            <strong> no será aplicable</strong> a:
          </p>
          <ul>
            <li>
              Productos precintados que no sean aptos para ser devueltos por razones
              de protección de la salud o de higiene y que hayan sido desprecintados
              tras la entrega.
            </li>
            <li>
              Bienes que puedan deteriorarse o caducar con rapidez (productos
              alimentarios perecederos).
            </li>
          </ul>
          <p>
            Por tanto, <strong>no se admitirán devoluciones de productos que hayan
            sido abiertos o cuyo precinto de seguridad haya sido roto</strong>, por
            motivos de higiene y seguridad alimentaria.
          </p>

          <h3>8.4 Modelo de formulario de desistimiento</h3>
          <div className="bg-neutral-50 p-4 rounded-lg text-sm">
            <p className="font-medium mb-2">
              A la atención de {BUSINESS.name}:
            </p>
            <p className="mb-2">
              Por la presente le comunico que desisto de mi contrato de venta del
              siguiente bien:
            </p>
            <ul className="list-none space-y-1 mb-2">
              <li>- Pedido número: _______________</li>
              <li>- Recibido el: _______________</li>
              <li>- Nombre del consumidor: _______________</li>
              <li>- Domicilio del consumidor: _______________</li>
              <li>- Firma del consumidor (solo si se envía en papel): _______________</li>
              <li>- Fecha: _______________</li>
            </ul>
          </div>

          <h2>9. Garantía legal y conformidad</h2>
          <p>
            Conforme a los artículos 114 y siguientes de la LGDCU, todos nuestros
            productos cuentan con una garantía legal de conformidad de 3 años desde
            la entrega del bien (para contratos celebrados desde el 1 de enero de 2022).
          </p>

          <h3>9.1 Falta de conformidad</h3>
          <p>
            Se entenderá que el producto no es conforme con el contrato cuando:
          </p>
          <ul>
            <li>No se ajuste a la descripción proporcionada</li>
            <li>No sirva para los fines para los que normalmente se utilizan</li>
            <li>Presente defectos de calidad</li>
            <li>No corresponda a la cantidad, calidad o categoría indicadas</li>
          </ul>

          <h3>9.2 Cómo reclamar</h3>
          <p>
            Si recibes un producto que no cumple con lo esperado, contacta con
            nosotros lo antes posible y en todo caso dentro de los 2 meses desde
            que detectaste el defecto:
          </p>
          <ul>
            <li><strong>Email:</strong> {BUSINESS.email} con asunto "Reclamación producto"</li>
            <li><strong>Proporciona:</strong> Número de pedido, fotos del producto y descripción del problema</li>
          </ul>
          <p>
            Procederemos a la reparación, sustitución, rebaja del precio o resolución
            del contrato, según corresponda y conforme a tus derechos legales.
          </p>

          <h3>9.3 Productos perecederos</h3>
          <p>
            <strong>Importante:</strong> Al tratarse de productos alimentarios
            perecederos, te recomendamos revisar el producto en el momento de la
            recepción y notificar cualquier incidencia en las primeras 48 horas.
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

          <h2>12. Resolución alternativa de litigios</h2>
          <p>
            De conformidad con el Reglamento (UE) 524/2013, la Comisión Europea
            facilita una plataforma de resolución de litigios en línea disponible
            en:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>
            Además, los consumidores pueden recurrir a entidades de resolución
            alternativa de litigios de consumo, como las Juntas Arbitrales de
            Consumo.
          </p>

          <h2>13. Ley aplicable y jurisdicción</h2>
          <p>
            Estas condiciones generales se rigen por la legislación española vigente,
            en particular:
          </p>
          <ul>
            <li>Real Decreto Legislativo 1/2007 (LGDCU)</li>
            <li>Ley 3/2014, de modificación de la LGDCU</li>
            <li>Ley 34/2002, de Servicios de la Sociedad de la Información (LSSI-CE)</li>
          </ul>
          <p>
            Para la resolución de cualquier controversia derivada del presente
            contrato, las partes se someten, con renuncia expresa a cualquier otro
            fuero que pudiera corresponderles, a los Juzgados y Tribunales del
            domicilio del consumidor, de conformidad con lo establecido en la
            normativa de protección de consumidores y usuarios.
          </p>

          <h2>14. Idioma</h2>
          <p>
            El idioma en que se formalizará el contrato es el español.
          </p>

          <h2>15. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con estas condiciones o con tu
            pedido, puedes contactar con nosotros en:
          </p>
          <ul>
            <li><strong>Email:</strong> {BUSINESS.email}</li>
            <li><strong>Dirección postal:</strong> {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}</li>
          </ul>
          <p>
            Nuestro horario de atención al cliente es de lunes a viernes, de 9:00h
            a 18:00h. Nos comprometemos a responder a tus consultas en un plazo
            máximo de 48 horas laborables.
          </p>
        </div>
      </div>
    </div>
  );
}
