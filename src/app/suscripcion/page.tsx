import { Metadata } from 'next';
import Link from 'next/link';
import { Check, RefreshCw, Truck, CreditCard, X, ArrowRight, Gift } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getSubscriptionInfo, calculatePackUnitPrice } from '@/lib/pricing';
import { PRICING } from '@/lib/constants';
import { SITE_URL, getCanonicalUrl, buildBreadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Suscripción Mensual de Granola Sin Gluten | 15% Descuento',
  description:
    'Suscríbete y ahorra un 15% en granola Poppy sin gluten. Recibe 6 bolsas cada mes con envío gratis. Sin permanencia, cancela cuando quieras.',
  alternates: {
    canonical: getCanonicalUrl('/suscripcion'),
  },
  openGraph: {
    title: 'Suscripción Mensual | 15% Descuento | Poppy',
    description:
      'Ahorra un 15% con la suscripción mensual de granola sin gluten. Envío gratis, sin compromiso.',
    url: `${SITE_URL}/suscripcion`,
  },
};

export default function SuscripcionPage() {
  const subscriptionInfo = getSubscriptionInfo();
  const pack6Price = calculatePackUnitPrice(6);

  return (
    <>
      {/* JSON-LD: Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Suscripción', url: '/suscripcion' },
        ])}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-[#ffffec] py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 badge bg-white/20 text-[#ffffec] mb-4">
              <RefreshCw className="w-4 h-4" />
              Suscripción mensual
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
              Suscríbete y ahorra un {subscriptionInfo.discountPercentage}%
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Recibe 6 bolsas de granola Poppy cada mes a solo{' '}
              <strong className="text-[#ffffec]">
                {formatPrice(subscriptionInfo.unitPriceCents)}/ud
              </strong>
              . Envío gratis, cancela cuando quieras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tienda/granola-clasica-250g"
                className="btn bg-white text-primary-700 hover:bg-primary-50 btn-lg"
              >
                Empezar suscripción
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
              Compara y ahorra
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Con la suscripción, obtienes el mejor precio posible por unidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Single purchase */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h3 className="text-neutral-900 mb-2">Compra única</h3>
              <p className="text-sm text-neutral-500 mb-4">1 bolsa</p>
              <div className="text-3xl font-bold text-neutral-900 mb-4">
                {formatPrice(PRICING.BASE_PRICE_CENTS)}
                <span className="text-sm font-normal text-neutral-500">/ud</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-neutral-400" />
                  Sin descuento
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-neutral-400" />
                  Gastos de envío
                </li>
              </ul>
            </div>

            {/* Pack 6 */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h3 className="text-neutral-900 mb-2">Pack 6</h3>
              <p className="text-sm text-neutral-500 mb-4">Compra única</p>
              <div className="text-3xl font-bold text-neutral-900 mb-4">
                {formatPrice(pack6Price)}
                <span className="text-sm font-normal text-neutral-500">/ud</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-600" />
                  10% descuento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-600" />
                  Envío gratis
                </li>
              </ul>
            </div>

            {/* Subscription */}
            <div className="bg-primary-50 rounded-2xl p-6 border-2 border-primary-500 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-primary">
                Mejor precio
              </span>
              <h3 className="text-neutral-900 mb-2">Suscripción</h3>
              <p className="text-sm text-neutral-500 mb-4">Pack 6 mensual</p>
              <div className="text-3xl font-bold text-primary-600 mb-4">
                {formatPrice(subscriptionInfo.unitPriceCents)}
                <span className="text-sm font-normal text-neutral-500">/ud</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-600" />
                  15% descuento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-600" />
                  Envío gratis siempre
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-600" />
                  Cancela cuando quieras
                </li>
              </ul>
            </div>
          </div>

          {/* Savings calculation */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Con la suscripción ahorras{' '}
              <strong className="text-accent-600">
                {formatPrice(subscriptionInfo.monthlySavings)}
              </strong>{' '}
              cada mes respecto a la compra individual
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
              Cómo funciona
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-600">1</span>
              </div>
              <h3 className="text-neutral-900 mb-2">Elige tu sabor</h3>
              <p className="text-sm text-neutral-600">
                Selecciona la variedad de granola que más te guste
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-600">2</span>
              </div>
              <h3 className="text-neutral-900 mb-2">Activa tu suscripción</h3>
              <p className="text-sm text-neutral-600">
                Marca la opción de suscripción al añadir al carrito
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-600">3</span>
              </div>
              <h3 className="text-neutral-900 mb-2">Recibe cada mes</h3>
              <p className="text-sm text-neutral-600">
                Tu pack de 6 bolsas llega a casa automáticamente
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-600">4</span>
              </div>
              <h3 className="text-neutral-900 mb-2">Gestiona fácilmente</h3>
              <p className="text-sm text-neutral-600">
                Pausa, modifica o cancela desde tu cuenta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-6">
                Ventajas de ser suscriptor
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">15% de descuento permanente</h3>
                    <p className="text-neutral-600 text-sm">
                      El mejor precio por unidad, garantizado
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">Envío gratis siempre</h3>
                    <p className="text-neutral-600 text-sm">
                      Sin mínimos, sin condiciones
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">Flexibilidad total</h3>
                    <p className="text-neutral-600 text-sm">
                      Pausa, modifica o cancela cuando quieras
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">Sin sorpresas</h3>
                    <p className="text-neutral-600 text-sm">
                      Siempre el mismo precio, sin subidas
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary-50 rounded-3xl p-8">
              <h3 className="text-xl text-neutral-900 mb-4">
                Resumen de tu suscripción
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Pack mensual</span>
                  <span className="font-medium">6 bolsas de 250g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Precio por unidad</span>
                  <span className="font-medium">{formatPrice(subscriptionInfo.unitPriceCents)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Envío</span>
                  <span className="font-medium text-accent-600">Gratis</span>
                </div>
                <div className="border-t border-primary-200 pt-3 flex justify-between">
                  <span>Total mensual</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(subscriptionInfo.totalPriceCents)}
                  </span>
                </div>
              </div>
              <Link
                href="/tienda/granola-clasica-250g"
                className="btn-primary w-full justify-center"
              >
                Empezar ahora
              </Link>
              <p className="text-xs text-neutral-500 mt-3 text-center">
                Sin permanencia. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-neutral-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
              Preguntas frecuentes sobre la suscripción
            </h2>
          </div>

          <div className="space-y-4">
            <details className="bg-white rounded-xl p-6 group">
              <summary className="text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                ¿Puedo cancelar mi suscripción en cualquier momento?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                Sí, puedes cancelar tu suscripción en cualquier momento desde tu cuenta.
                No hay permanencia ni penalizaciones. La cancelación se hará efectiva al
                final del período actual ya pagado.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 group">
              <summary className="text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                ¿Puedo pausar la suscripción temporalmente?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                ¡Claro! Si te vas de vacaciones o tienes suficiente stock, puedes pausar
                tu suscripción hasta 3 meses desde tu panel de cuenta.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 group">
              <summary className="text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                ¿Puedo cambiar el sabor de mi suscripción?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                Sí, puedes modificar el sabor de tu suscripción antes de que se procese
                el siguiente envío. Solo tienes que acceder a tu cuenta y editar la
                suscripción.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 group">
              <summary className="text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                ¿Cuándo se cobra cada mes?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                El cobro se realiza el mismo día de cada mes en que activaste tu
                suscripción. Recibirás un recordatorio por email unos días antes.
              </p>
            </details>
          </div>

          <div className="mt-8 text-center">
            <Link href="/faq" className="text-primary-600 hover:underline font-medium">
              Ver todas las preguntas frecuentes →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-neutral-900 text-[#ffffec]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            ¿Listo para ahorrar en tu granola favorita?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
            Únete a cientos de suscriptores que reciben su granola Poppy cada mes
            sin preocupaciones.
          </p>
          <Link href="/tienda" className="btn-primary btn-lg">
            Ver productos y suscribirse
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
