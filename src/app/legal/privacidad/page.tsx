import { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y protección de datos de Poppy.',
  alternates: {
    canonical: getCanonicalUrl('/legal/privacidad'),
  },
};

export default function PrivacidadPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-display text-neutral-900 mb-8">
          Política de Privacidad
        </h1>

        <div className="prose-custom">
          <p className="text-neutral-600 mb-6">
            Última actualización: Febrero 2026
          </p>

          <p>
            En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo,
            de 27 de abril de 2016, relativo a la protección de las personas físicas en lo
            que respecta al tratamiento de datos personales y a la libre circulación de estos
            datos (RGPD), y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
            Personales y garantía de los derechos digitales (LOPDGDD), se informa:
          </p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>Identidad:</strong> {BUSINESS.name}<br />
            <strong>Forma jurídica:</strong> Empresario Individual / Autónomo<br />
            <strong>NIF:</strong> [Pendiente de inscripción]<br />
            <strong>Domicilio:</strong> {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}<br />
            <strong>Correo electrónico:</strong> {BUSINESS.email}
          </p>
          <p>
            <strong>Delegado de Protección de Datos (DPD):</strong> No aplicable.
            Como pequeña empresa, no estamos obligados a designar un DPD conforme
            al artículo 37 del RGPD.
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
          <p>Podemos compartir tus datos con terceros encargados del tratamiento:</p>
          <ul>
            <li>
              <strong>Proveedores de pago:</strong> Stripe, Inc. (USA) para procesar
              transacciones de forma segura. Stripe cuenta con certificaciones PCI-DSS
              y cláusulas contractuales tipo aprobadas por la Comisión Europea.
            </li>
            <li>
              <strong>Empresas de transporte:</strong> Correos / Correos Express (España)
              para la entrega de pedidos. Se comparten únicamente los datos necesarios
              para el envío (nombre, dirección, teléfono).
            </li>
            <li>
              <strong>Proveedor de hosting:</strong> Vercel Inc. (USA) para alojar el
              sitio web. Vercel cumple con el RGPD y tiene implementadas las salvaguardas
              adecuadas mediante cláusulas contractuales tipo.
            </li>
            <li>
              <strong>Proveedores de análisis:</strong> Google Analytics para análisis
              de tráfico web (datos anonimizados).
            </li>
            <li>
              <strong>Administraciones públicas:</strong> Agencia Tributaria y otros
              organismos públicos cuando sea legalmente requerido.
            </li>
          </ul>

          <h2>6. Transferencias internacionales</h2>
          <p>
            Algunos de nuestros proveedores de servicios (Stripe, Vercel) están ubicados
            fuera del Espacio Económico Europeo (EEE), concretamente en Estados Unidos.
          </p>
          <p>
            De conformidad con el artículo 46 del RGPD, estas transferencias se realizan
            con las siguientes garantías adecuadas:
          </p>
          <ul>
            <li>
              <strong>Cláusulas Contractuales Tipo (CCT):</strong> Aprobadas por la
              Comisión Europea según la Decisión 2021/914.
            </li>
            <li>
              <strong>Certificaciones de seguridad:</strong> Nuestros proveedores
              cuentan con certificaciones ISO 27001, SOC 2 Type II y cumplen con
              estándares internacionales de protección de datos.
            </li>
          </ul>
          <p>
            Puede solicitar una copia de las salvaguardas aplicadas contactando
            con {BUSINESS.email}.
          </p>

          <h2>7. Conservación de datos</h2>
          <p>Conservaremos tus datos durante los siguientes plazos:</p>
          <ul>
            <li><strong>Datos de pedidos:</strong> durante la relación comercial y 5 años adicionales</li>
            <li><strong>Datos fiscales:</strong> 4 años según normativa tributaria</li>
            <li><strong>Comunicaciones comerciales:</strong> hasta que retires el consentimiento</li>
          </ul>

          <h2>8. Tus derechos</h2>
          <p>
            De conformidad con los artículos 15 a 22 del RGPD, puedes ejercer
            los siguientes derechos:
          </p>
          <ul>
            <li>
              <strong>Derecho de acceso (Art. 15 RGPD):</strong> Conocer qué datos
              personales tenemos sobre ti y cómo los tratamos.
            </li>
            <li>
              <strong>Derecho de rectificación (Art. 16 RGPD):</strong> Corregir
              datos inexactos o incompletos.
            </li>
            <li>
              <strong>Derecho de supresión (Art. 17 RGPD):</strong> Solicitar la
              eliminación de tus datos cuando ya no sean necesarios o el tratamiento
              sea ilícito ("derecho al olvido").
            </li>
            <li>
              <strong>Derecho a la limitación del tratamiento (Art. 18 RGPD):</strong>{' '}
              Solicitar que limitemos el tratamiento de tus datos en determinadas
              circunstancias.
            </li>
            <li>
              <strong>Derecho a la portabilidad (Art. 20 RGPD):</strong> Recibir
              tus datos en formato estructurado, de uso común y lectura mecánica,
              y transmitirlos a otro responsable.
            </li>
            <li>
              <strong>Derecho de oposición (Art. 21 RGPD):</strong> Oponerte al
              tratamiento de tus datos en determinadas circunstancias.
            </li>
            <li>
              <strong>Derecho a no ser objeto de decisiones individuales automatizadas
              (Art. 22 RGPD):</strong> Incluidas las elaboraciones de perfiles.
            </li>
            <li>
              <strong>Derecho a retirar el consentimiento:</strong> En cualquier
              momento, sin que ello afecte a la licitud del tratamiento basado en
              el consentimiento previo a su retirada.
            </li>
          </ul>

          <h3>8.1 Cómo ejercer tus derechos</h3>
          <p>
            Para ejercer cualquiera de estos derechos, puedes contactar con nosotros
            mediante:
          </p>
          <ul>
            <li>
              <strong>Correo electrónico:</strong> {BUSINESS.email} con el asunto
              "Ejercicio de Derechos RGPD"
            </li>
            <li>
              <strong>Correo postal:</strong> {BUSINESS.address.street},{' '}
              {BUSINESS.address.postalCode} {BUSINESS.address.city}
            </li>
          </ul>
          <p>
            Deberás incluir una copia de tu DNI o documento equivalente que acredite
            tu identidad. Responderemos a tu solicitud en el plazo máximo de 1 mes
            desde la recepción, pudiendo extenderse 2 meses más si fuera necesario,
            informándote de dicha extensión.
          </p>

          <h2>9. Medidas de seguridad</h2>
          <p>
            De conformidad con el artículo 32 del RGPD, hemos implementado medidas
            técnicas y organizativas apropiadas para garantizar un nivel de seguridad
            adecuado al riesgo, incluyendo:
          </p>
          <ul>
            <li>
              <strong>Cifrado de datos:</strong> Todas las comunicaciones están
              cifradas mediante protocolo HTTPS/TLS.
            </li>
            <li>
              <strong>Gestión de accesos:</strong> Control de acceso basado en roles
              y autenticación de dos factores cuando es posible.
            </li>
            <li>
              <strong>Seudonimización y minimización:</strong> Limitamos la recopilación
              de datos al mínimo necesario.
            </li>
            <li>
              <strong>Copias de seguridad:</strong> Realizamos copias de seguridad
              periódicas de los datos.
            </li>
            <li>
              <strong>Procedimientos de respuesta a incidentes:</strong> Contamos con
              protocolos para detectar, investigar y notificar brechas de seguridad
              conforme al artículo 33 del RGPD.
            </li>
          </ul>
          <p>
            En caso de violación de la seguridad de los datos que pueda entrañar un
            riesgo para tus derechos y libertades, te lo notificaremos sin dilación
            indebida, conforme al artículo 34 del RGPD.
          </p>

          <h2>10. Cookies y tecnologías similares</h2>
          <p>
            Utilizamos cookies propias y de terceros para mejorar nuestros servicios
            y tu experiencia de navegación. Para más información sobre qué cookies
            utilizamos, su finalidad y cómo gestionarlas, consulta nuestra{' '}
            <a href="/legal/cookies">Política de Cookies</a>.
          </p>

          <h2>11. Cambios en esta política</h2>
          <p>
            Nos reservamos el derecho de modificar esta política de privacidad para
            adaptarla a cambios legislativos o jurisprudenciales, así como a prácticas
            del sector.
          </p>
          <p>
            Te notificaremos cualquier cambio significativo a través de un aviso
            destacado en nuestro sitio web o por correo electrónico. La fecha de
            "última actualización" en la parte superior de este documento indica
            cuándo se modificó por última vez.
          </p>

          <h2>12. Derecho a presentar una reclamación</h2>
          <p>
            Si consideras que el tratamiento de tus datos personales no se ajusta
            a la normativa vigente, tienes derecho a presentar una reclamación ante
            la autoridad de control:
          </p>
          <p>
            <strong>Agencia Española de Protección de Datos (AEPD)</strong><br />
            C/ Jorge Juan, 6<br />
            28001 Madrid<br />
            Teléfono: 901 100 099 / 912 663 517<br />
            Web: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>
          </p>
          <p>
            No obstante, te agradeceríamos que antes de presentar una reclamación
            ante la AEPD, nos contactes directamente para intentar resolver cualquier
            problema o duda que puedas tener.
          </p>

          <h2>13. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con esta política de privacidad o
            el tratamiento de tus datos personales, puedes contactar con nosotros:
          </p>
          <ul>
            <li><strong>Email:</strong> {BUSINESS.email}</li>
            <li>
              <strong>Correo postal:</strong> {BUSINESS.address.street},{' '}
              {BUSINESS.address.postalCode} {BUSINESS.address.city}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
