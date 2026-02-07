import { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal e información corporativa de Poppy.',
  alternates: {
    canonical: getCanonicalUrl('/legal/aviso-legal'),
  },
};

export default function AvisoLegalPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-display text-neutral-900 mb-8">
          Aviso Legal
        </h1>

        <div className="prose-custom">
          <p className="text-neutral-600 mb-6">
            Última actualización: Febrero 2026
          </p>

          <h2>1. Datos identificativos</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE),
            se proporciona la siguiente información:
          </p>
          <ul>
            <li><strong>Titular:</strong> {BUSINESS.name}</li>
            <li><strong>Forma jurídica:</strong> Empresario Individual / Autónomo</li>
            <li><strong>NIF:</strong> [Pendiente de inscripción]</li>
            <li><strong>Domicilio:</strong> {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}, {BUSINESS.address.country}</li>
            <li><strong>Correo electrónico:</strong> {BUSINESS.email}</li>
            <li><strong>Sitio web:</strong> https://poppy.es</li>
          </ul>
          <p className="text-sm text-neutral-600 mt-2">
            <em>Nota: Este negocio está inscrito como empresario individual.
            El NIF se facilitará una vez completado el proceso de alta censal en Hacienda.</em>
          </p>

          <h2>2. Objeto</h2>
          <p>
            Este sitio web tiene como finalidad la venta de productos alimenticios,
            específicamente granola Poppy, así como proporcionar información
            sobre los mismos.
          </p>

          <h2>3. Condiciones de uso</h2>
          <p>
            El acceso y uso de este sitio web atribuye la condición de usuario
            e implica la aceptación de las presentes condiciones.
          </p>
          <p>El usuario se compromete a:</p>
          <ul>
            <li>Hacer un uso adecuado de los contenidos y servicios</li>
            <li>No realizar actividades ilícitas o contrarias a la buena fe</li>
            <li>No difundir contenidos de carácter racista, xenófobo, pornográfico o ilegal</li>
            <li>No dañar los sistemas informáticos del prestador de servicios</li>
          </ul>

          <h2>4. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del sitio web, incluyendo textos, fotografías,
            gráficos, imágenes, iconos, tecnología, software, así como su diseño
            gráfico y códigos fuente, son propiedad de {BUSINESS.name} o de
            terceros que han autorizado su uso.
          </p>
          <p>
            La reproducción, distribución, comunicación pública y/o transformación
            de estos contenidos sin autorización expresa está prohibida.
          </p>

          <h2>5. Exclusión de garantías y responsabilidad</h2>
          <p>
            {BUSINESS.name} no se hace responsable de:
          </p>
          <ul>
            <li>
              La falta de disponibilidad, mantenimiento y funcionamiento efectivo
              del sitio web y sus servicios
            </li>
            <li>
              Los daños causados por el uso indebido del sitio web
            </li>
            <li>
              La presencia de virus o elementos lesivos en los contenidos
            </li>
            <li>
              El uso que el usuario pueda hacer de los contenidos del sitio
            </li>
          </ul>

          <h2>6. Enlaces a terceros</h2>
          <p>
            Este sitio web puede contener enlaces a sitios de terceros. Dichos
            enlaces tienen finalidad informativa y no suponen ningún tipo de
            relación entre {BUSINESS.name} y los titulares de esos sitios.
          </p>
          <p>
            {BUSINESS.name} no se responsabiliza de los contenidos, políticas
            de privacidad o prácticas de sitios de terceros.
          </p>

          <h2>7. Comunicaciones comerciales</h2>
          <p>
            De acuerdo con la LSSI-CE y el artículo 21 de la Ley 34/2002, {BUSINESS.name} no enviará comunicaciones
            comerciales por correo electrónico sin el consentimiento previo y expreso
            del destinatario.
          </p>
          <p>
            Los usuarios pueden darse de baja de estas comunicaciones en cualquier momento
            a través del enlace incluido en cada email o contactando a {BUSINESS.email}.
          </p>

          <h2>8. Protección de datos</h2>
          <p>
            El tratamiento de datos personales se rige por lo dispuesto en el
            Reglamento (UE) 2016/679 del Parlamento Europeo (RGPD) y la
            Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales
            y garantía de los derechos digitales (LOPDGDD).
          </p>
          <p>
            Para más información, consulte nuestra{' '}
            <a href="/legal/privacidad">Política de Privacidad</a>.
          </p>

          <h2>9. Resolución de litigios en línea</h2>
          <p>
            De conformidad con el Reglamento (UE) 524/2013, la Comisión Europea
            facilita una plataforma de resolución de litigios en línea para
            los consumidores, accesible en:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>

          <h2>10. Legislación aplicable y jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española vigente.
          </p>
          <p>
            Para cualquier controversia que pudiera derivarse del acceso o uso
            del sitio web, las partes, con renuncia expresa a cualquier otro fuero
            que pudiera corresponderles, se someten a los Juzgados y Tribunales
            del domicilio del consumidor, de conformidad con la normativa de protección
            de consumidores y usuarios.
          </p>

          <h2>11. Modificaciones</h2>
          <p>
            {BUSINESS.name} se reserva el derecho de modificar, en cualquier
            momento y sin previo aviso, la presentación y configuración del
            sitio web, así como las presentes condiciones.
          </p>
          <p>
            Se recomienda a los usuarios revisar periódicamente este aviso legal
            para estar informados de cualquier cambio.
          </p>

          <h2>12. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con este aviso legal, puede
            contactar con nosotros a través de:
          </p>
          <ul>
            <li><strong>Email:</strong> {BUSINESS.email}</li>
            <li><strong>Dirección postal:</strong> {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
