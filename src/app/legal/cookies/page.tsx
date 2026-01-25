import { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de Poppy.',
};

export default function CookiesPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">
          Política de Cookies
        </h1>

        <div className="prose-custom">
          <p className="text-neutral-600 mb-6">
            Última actualización: Enero 2024
          </p>

          <h2>1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo cuando visitas un sitio web. Se utilizan para recordar
            tus preferencias, analizar el uso del sitio y personalizar tu experiencia.
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
            Algunos servicios de terceros pueden instalar cookies en tu dispositivo:
          </p>
          <ul>
            <li><strong>Stripe:</strong> Para procesar pagos de forma segura</li>
            <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
          </ul>
          <p>
            Puedes consultar las políticas de privacidad de estos terceros para
            más información sobre cómo utilizan las cookies.
          </p>

          <h2>5. Actualizaciones de esta política</h2>
          <p>
            Podemos actualizar esta política de cookies periódicamente. Te
            recomendamos revisar esta página regularmente para estar informado
            de cualquier cambio.
          </p>

          <h2>6. Contacto</h2>
          <p>
            Si tienes preguntas sobre nuestra política de cookies, puedes
            contactarnos en:
          </p>
          <ul>
            <li>Email: {BUSINESS.email}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
