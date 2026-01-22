import { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal e información corporativa de Granola Artesanal.',
};

export default function AvisoLegalPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">
          Aviso Legal
        </h1>

        <div className="prose-custom">
          <p className="text-neutral-600 mb-6">
            Última actualización: Enero 2024
          </p>

          <h2>1. Datos identificativos</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y Comercio Electrónico,
            se informa:
          </p>
          <ul>
            <li><strong>Denominación social:</strong> {BUSINESS.name}</li>
            <li><strong>Domicilio social:</strong> {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}</li>
            <li><strong>Email:</strong> {BUSINESS.email}</li>
            <li><strong>Teléfono:</strong> {BUSINESS.phone}</li>
          </ul>

          <h2>2. Objeto</h2>
          <p>
            Este sitio web tiene como finalidad la venta de productos alimenticios,
            específicamente granola artesanal, así como proporcionar información
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
            De acuerdo con la LSSI-CE, {BUSINESS.name} no enviará comunicaciones
            comerciales por correo electrónico que no hayan sido solicitadas
            expresamente por el usuario.
          </p>

          <h2>8. Protección de datos</h2>
          <p>
            El tratamiento de datos personales se rige por nuestra{' '}
            <a href="/legal/privacidad">Política de Privacidad</a>.
          </p>

          <h2>9. Legislación aplicable y jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española.
            Para cualquier controversia que pudiera derivarse del acceso o uso
            del sitio web, las partes se someten a los Juzgados y Tribunales
            de {BUSINESS.address.city}.
          </p>

          <h2>10. Modificaciones</h2>
          <p>
            {BUSINESS.name} se reserva el derecho de modificar, en cualquier
            momento y sin previo aviso, la presentación y configuración del
            sitio web, así como las presentes condiciones.
          </p>
        </div>
      </div>
    </div>
  );
}
