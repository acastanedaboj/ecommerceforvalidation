import { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de Poppy.',
  alternates: {
    canonical: getCanonicalUrl('/legal/cookies'),
  },
};

export default function CookiesPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-display text-neutral-900 mb-8">
          Política de Cookies
        </h1>

        <div className="prose-custom">
          <p className="text-neutral-600 mb-6">
            Última actualización: Febrero 2026
          </p>

          <p>
            En cumplimiento del artículo 22.2 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y de Comercio Electrónico
            (LSSI-CE) y del Reglamento (UE) 2016/679 (RGPD), se informa sobre el
            uso de cookies en este sitio web.
          </p>

          <h2>1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo (ordenador, tablet, smartphone) cuando visitas un sitio web.
            Permiten al sitio web recordar información sobre tu visita, como tu
            idioma preferido, el contenido de tu carrito de compra y otras preferencias,
            lo que facilita tu próxima visita y hace que el sitio resulte más útil.
          </p>
          <p>
            Las cookies desempeñan un papel muy importante y contribuyen a mejorar
            tu experiencia de navegación.
          </p>

          <h2>2. Tipos de cookies que utilizamos</h2>

          <h3>2.1 Cookies técnicas (necesarias)</h3>
          <p>
            Son esenciales para el funcionamiento del sitio web. Sin ellas,
            funcionalidades como el carrito de compra no funcionarían correctamente.
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2 bg-neutral-100">Cookie</th>
                <th className="text-left p-2 bg-neutral-100">Finalidad</th>
                <th className="text-left p-2 bg-neutral-100">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b">poppy-cart</td>
                <td className="p-2 border-b">Guardar el carrito de compra</td>
                <td className="p-2 border-b">30 días</td>
              </tr>
              <tr>
                <td className="p-2 border-b">session</td>
                <td className="p-2 border-b">Identificar la sesión del usuario</td>
                <td className="p-2 border-b">Sesión</td>
              </tr>
            </tbody>
          </table>

          <h3>2.2 Cookies de análisis</h3>
          <p>
            Nos ayudan a entender cómo los visitantes interactúan con el sitio web,
            recopilando información de forma anónima.
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2 bg-neutral-100">Cookie</th>
                <th className="text-left p-2 bg-neutral-100">Proveedor</th>
                <th className="text-left p-2 bg-neutral-100">Finalidad</th>
                <th className="text-left p-2 bg-neutral-100">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b">_ga</td>
                <td className="p-2 border-b">Google Analytics</td>
                <td className="p-2 border-b">Distinguir usuarios</td>
                <td className="p-2 border-b">2 años</td>
              </tr>
              <tr>
                <td className="p-2 border-b">_ga_*</td>
                <td className="p-2 border-b">Google Analytics</td>
                <td className="p-2 border-b">Mantener estado de sesión</td>
                <td className="p-2 border-b">2 años</td>
              </tr>
            </tbody>
          </table>

          <h3>2.3 Cookies de marketing</h3>
          <p>
            Se utilizan para mostrar anuncios relevantes y medir la efectividad
            de las campañas publicitarias.
          </p>

          <h2>3. Gestión de cookies</h2>
          <p>
            Puedes gestionar tus preferencias de cookies de las siguientes formas:
          </p>

          <h3>3.1 A través de nuestro banner de cookies</h3>
          <p>
            Cuando visitas nuestro sitio por primera vez, te mostramos un banner
            donde puedes aceptar o rechazar las cookies no esenciales.
          </p>

          <h3>3.2 A través de tu navegador</h3>
          <p>
            Puedes configurar tu navegador para bloquear o eliminar cookies.
            Ten en cuenta que esto puede afectar al funcionamiento del sitio.
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener">Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Edge</a></li>
          </ul>

          <h2>4. Cookies de terceros</h2>
          <p>
            Algunos servicios de terceros pueden instalar cookies en tu dispositivo
            cuando utilizas nuestro sitio web:
          </p>

          <h3>4.1 Stripe (Procesamiento de pagos)</h3>
          <p>
            <strong>Proveedor:</strong> Stripe, Inc. (USA)<br />
            <strong>Finalidad:</strong> Procesar pagos de forma segura y prevenir fraudes<br />
            <strong>Tipo:</strong> Cookie técnica necesaria<br />
            <strong>Más información:</strong>{' '}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
              Política de privacidad de Stripe
            </a>
          </p>

          <h3>4.2 Google Analytics (Análisis web)</h3>
          <p>
            <strong>Proveedor:</strong> Google LLC (USA)<br />
            <strong>Finalidad:</strong> Análisis de tráfico web (datos anonimizados)<br />
            <strong>Tipo:</strong> Cookie de análisis<br />
            <strong>Más información:</strong>{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Política de privacidad de Google
            </a>
          </p>
          <p>
            Puedes desactivar Google Analytics instalando el complemento de
            inhabilitación disponible en:{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              https://tools.google.com/dlpage/gaoptout
            </a>
          </p>

          <h2>5. Base legal</h2>
          <p>
            La base legal para el uso de cookies técnicas es el interés legítimo
            (artículo 6.1.f del RGPD), ya que son estrictamente necesarias para
            el funcionamiento del sitio web.
          </p>
          <p>
            Para las cookies de análisis y marketing, la base legal es tu
            consentimiento expreso (artículo 6.1.a del RGPD), que puedes otorgar
            o revocar en cualquier momento mediante nuestro banner de cookies.
          </p>

          <h2>6. Revocación del consentimiento</h2>
          <p>
            Puedes retirar tu consentimiento para el uso de cookies en cualquier
            momento. Para ello, puedes:
          </p>
          <ul>
            <li>Usar nuestro panel de configuración de cookies</li>
            <li>Configurar tu navegador para bloquear o eliminar cookies</li>
            <li>Utilizar herramientas de opt-out de terceros (como Google Analytics Opt-out)</li>
          </ul>
          <p>
            Ten en cuenta que bloquear las cookies técnicas puede afectar al
            funcionamiento del sitio web.
          </p>

          <h2>7. Actualizaciones de esta política</h2>
          <p>
            Podemos actualizar esta política de cookies periódicamente para
            reflejar cambios en nuestro uso de cookies o por otras razones
            operativas, legales o reglamentarias.
          </p>
          <p>
            Te recomendamos revisar esta página regularmente para estar informado
            de cualquier cambio. La fecha de "última actualización" en la parte
            superior indica cuándo se modificó por última vez.
          </p>

          <h2>8. Más información</h2>
          <p>
            Para obtener más información sobre cómo tratamos tus datos personales,
            consulta nuestra <a href="/legal/privacidad">Política de Privacidad</a>.
          </p>

          <h2>9. Contacto</h2>
          <p>
            Si tienes preguntas sobre nuestra política de cookies o el tratamiento
            de tus datos, puedes contactarnos en:
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
