import { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y protección de datos de Poppy.',
};

export default function PrivacidadPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">
          Política de Privacidad
        </h1>

        <div className="prose-custom">
          <p className="text-neutral-600 mb-6">
            Última actualización: Enero 2024
          </p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>Identidad:</strong> {BUSINESS.name}<br />
            <strong>Domicilio:</strong> {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}<br />
            <strong>Email:</strong> {BUSINESS.email}<br />
            <strong>Teléfono:</strong> {BUSINESS.phone}
          </p>

          <h2>2. Datos personales que recopilamos</h2>
          <p>Recopilamos los siguientes tipos de datos personales:</p>
          <ul>
            <li><strong>Datos de identificación:</strong> nombre, apellidos, DNI/NIF</li>
            <li><strong>Datos de contacto:</strong> dirección postal, email, teléfono</li>
            <li><strong>Datos de transacción:</strong> historial de compras, métodos de pago</li>
            <li><strong>Datos de navegación:</strong> cookies, IP, datos de uso del sitio web</li>
          </ul>

          <h2>3. Finalidad del tratamiento</h2>
          <p>Tratamos tus datos personales para las siguientes finalidades:</p>
          <ul>
            <li>Gestionar y procesar tus pedidos</li>
            <li>Gestionar tu cuenta de usuario</li>
            <li>Gestionar suscripciones y pagos recurrentes</li>
            <li>Enviarte comunicaciones relacionadas con tu pedido</li>
            <li>Con tu consentimiento, enviarte comunicaciones comerciales</li>
            <li>Atender tus consultas y reclamaciones</li>
            <li>Cumplir con nuestras obligaciones legales</li>
          </ul>

          <h2>4. Legitimación del tratamiento</h2>
          <p>La base legal para el tratamiento de tus datos es:</p>
          <ul>
            <li><strong>Ejecución de un contrato:</strong> para procesar tus pedidos</li>
            <li><strong>Consentimiento:</strong> para comunicaciones comerciales</li>
            <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios</li>
            <li><strong>Obligación legal:</strong> para cumplir con la normativa fiscal</li>
          </ul>

          <h2>5. Destinatarios de los datos</h2>
          <p>Podemos compartir tus datos con:</p>
          <ul>
            <li><strong>Proveedores de pago:</strong> Stripe, para procesar transacciones</li>
            <li><strong>Empresas de transporte:</strong> para entregar tus pedidos</li>
            <li><strong>Proveedores de servicios:</strong> hosting, email marketing</li>
            <li><strong>Administraciones públicas:</strong> cuando sea legalmente requerido</li>
          </ul>

          <h2>6. Transferencias internacionales</h2>
          <p>
            Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio
            Económico Europeo. En estos casos, garantizamos que existen las
            salvaguardas adecuadas según el RGPD.
          </p>

          <h2>7. Conservación de datos</h2>
          <p>Conservaremos tus datos durante los siguientes plazos:</p>
          <ul>
            <li><strong>Datos de pedidos:</strong> durante la relación comercial y 5 años adicionales</li>
            <li><strong>Datos fiscales:</strong> 4 años según normativa tributaria</li>
            <li><strong>Comunicaciones comerciales:</strong> hasta que retires el consentimiento</li>
          </ul>

          <h2>8. Tus derechos</h2>
          <p>Tienes derecho a:</p>
          <ul>
            <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de tus datos</li>
            <li><strong>Limitación:</strong> restringir el tratamiento de tus datos</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos</li>
          </ul>
          <p>
            Para ejercer estos derechos, contacta con nosotros en {BUSINESS.email}
          </p>

          <h2>9. Seguridad</h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tus datos
            contra acceso no autorizado, pérdida o alteración, incluyendo cifrado
            de datos y conexiones seguras (HTTPS).
          </p>

          <h2>10. Cookies</h2>
          <p>
            Utilizamos cookies propias y de terceros. Para más información,
            consulta nuestra <a href="/legal/cookies">Política de Cookies</a>.
          </p>

          <h2>11. Cambios en esta política</h2>
          <p>
            Nos reservamos el derecho de modificar esta política. Te notificaremos
            cualquier cambio significativo a través de nuestro sitio web o por email.
          </p>

          <h2>12. Contacto y reclamaciones</h2>
          <p>
            Si tienes preguntas sobre esta política o quieres ejercer tus derechos,
            contacta con nosotros en {BUSINESS.email}.
          </p>
          <p>
            También tienes derecho a presentar una reclamación ante la Agencia
            Española de Protección de Datos (www.aepd.es).
          </p>
        </div>
      </div>
    </div>
  );
}
