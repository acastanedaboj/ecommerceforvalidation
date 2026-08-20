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
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-[#ffffec] md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge mb-4 inline-flex items-center gap-2 bg-white/20 text-[#ffffec]">
              <RefreshCw className="h-4 w-4" />
              Suscripción mensual
            </span>
            <h1 className="mb-6 font-display text-4xl md:text-5xl lg:text-6xl">
              Suscríbete y ahorra un {subscriptionInfo.discountPercentage}%
            </h1>
            <p className="mb-8 text-xl text-[#ffffec]/80">
              Recibe 6 bolsas de granola Poppy cada mes a solo{' '}
              <strong className="text-[#ffffec]">
                {formatPrice(subscriptionInfo.unitPriceCents)}/ud
              </strong>
              . Envío gratis, cancela cuando quieras.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/tienda/granola-clasica-150g"
                className="btn btn-lg bg-[#ffffec] text-primary-700 hover:bg-[#ffffec]/90"
              >
                Empezar suscripción
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="section">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl text-neutral-900 md:text-4xl">
              Compara y ahorra
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Con la suscripción, obtienes el mejor precio posible por unidad
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {/* Single purchase */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="mb-2 text-neutral-900">Compra única</h3>
              <p className="mb-4 text-sm text-neutral-500">1 bolsa</p>
              <div className="mb-4 text-3xl font-bold text-neutral-900">
                {formatPrice(PRICING.BASE_PRICE_CENTS)}
                <span className="text-sm font-normal text-neutral-500">/ud</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-neutral-400" />
                  Sin descuento
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-neutral-400" />
                  Gastos de envío
                </li>
              </ul>
            </div>

            {/* Pack 6 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="mb-2 text-neutral-900">Pack 6</h3>
              <p className="mb-4 text-sm text-neutral-500">Compra única</p>
              <div className="mb-4 text-3xl font-bold text-neutral-900">
                {formatPrice(pack6Price)}
                <span className="text-sm font-normal text-neutral-500">/ud</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-600" />
                  10% descuento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-600" />
                  Envío gratis
                </li>
              </ul>
            </div>

            {/* Subscription */}
            <div className="relative rounded-2xl border-2 border-primary-500 bg-primary-50 p-6">
              <span className="badge-primary absolute -top-3 left-1/2 -translate-x-1/2">
                Mejor precio
              </span>
              <h3 className="mb-2 text-neutral-900">Suscripción</h3>
              <p className="mb-4 text-sm text-neutral-500">Pack 6 mensual</p>
              <div className="mb-4 text-3xl font-bold text-primary-600">
                {formatPrice(subscriptionInfo.unitPriceCents)}
                <span className="text-sm font-normal text-neutral-500">/ud</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-600" />
                  15% descuento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-600" />
                  Envío gratis siempre
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-600" />
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
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl text-neutral-900 md:text-4xl">
              Cómo funciona
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                <span className="text-2xl text-primary-600">1</span>
              </div>
              <h3 className="mb-2 text-neutral-900">Elige tu sabor</h3>
              <p className="text-sm text-neutral-600">
                Selecciona la variedad de granola que más te guste
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                <span className="text-2xl text-primary-600">2</span>
              </div>
              <h3 className="mb-2 text-neutral-900">Activa tu suscripción</h3>
              <p className="text-sm text-neutral-600">
                Marca la opción de suscripción al añadir al carrito
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                <span className="text-2xl text-primary-600">3</span>
              </div>
              <h3 className="mb-2 text-neutral-900">Recibe cada mes</h3>
              <p className="text-sm text-neutral-600">
                Tu pack de 6 bolsas llega a casa automáticamente
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                <span className="text-2xl text-primary-600">4</span>
              </div>
              <h3 className="mb-2 text-neutral-900">Gestiona fácilmente</h3>
              <p className="text-sm text-neutral-600">Pausa, modifica o cancela desde tu cuenta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container-custom">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-3xl text-neutral-900 md:text-4xl">
                Ventajas de ser suscriptor
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-100">
                    <Gift className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">15% de descuento permanente</h3>
                    <p className="text-sm text-neutral-600">
                      El mejor precio por unidad, garantizado
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-100">
                    <Truck className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">Envío gratis siempre</h3>
                    <p className="text-sm text-neutral-600">Sin mínimos, sin condiciones</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-100">
                    <RefreshCw className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">Flexibilidad total</h3>
                    <p className="text-sm text-neutral-600">
                      Pausa, modifica o cancela cuando quieras
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-100">
                    <CreditCard className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">Sin sorpresas</h3>
                    <p className="text-sm text-neutral-600">Siempre el mismo precio, sin subidas</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-primary-50 p-8">
              <h3 className="mb-4 text-xl text-neutral-900">Resumen de tu suscripción</h3>
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Pack mensual</span>
                  <span className="font-medium">6 bolsas de 150g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Precio por unidad</span>
                  <span className="font-medium">
                    {formatPrice(subscriptionInfo.unitPriceCents)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Envío</span>
                  <span className="font-medium text-accent-600">Gratis</span>
                </div>
                <div className="flex justify-between border-t border-primary-200 pt-3">
                  <span>Total mensual</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(subscriptionInfo.totalPriceCents)}
                  </span>
                </div>
              </div>
              <Link
                href="/tienda/granola-clasica-150g"
                className="btn-primary w-full justify-center"
              >
                Empezar ahora
              </Link>
              <p className="mt-3 text-center text-xs text-neutral-500">
                Sin permanencia. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-neutral-50">
        <div className="container-custom max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl text-neutral-900 md:text-4xl">
              Preguntas frecuentes sobre la suscripción
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group rounded-xl bg-white p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-neutral-900">
                ¿Puedo cancelar mi suscripción en cualquier momento?
                <span className="text-primary-600 transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                Sí, puedes cancelar tu suscripción en cualquier momento desde tu cuenta. No hay
                permanencia ni penalizaciones. La cancelación se hará efectiva al final del período
                actual ya pagado.
              </p>
            </details>

            <details className="group rounded-xl bg-white p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-neutral-900">
                ¿Puedo pausar la suscripción temporalmente?
                <span className="text-primary-600 transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                ¡Claro! Si te vas de vacaciones o tienes suficiente stock, puedes pausar tu
                suscripción hasta 3 meses desde tu panel de cuenta.
              </p>
            </details>

            <details className="group rounded-xl bg-white p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-neutral-900">
                ¿Puedo cambiar el sabor de mi suscripción?
                <span className="text-primary-600 transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                Sí, puedes modificar el sabor de tu suscripción antes de que se procese el siguiente
                envío. Solo tienes que acceder a tu cuenta y editar la suscripción.
              </p>
            </details>

            <details className="group rounded-xl bg-white p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-neutral-900">
                ¿Cuándo se cobra cada mes?
                <span className="text-primary-600 transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                El cobro se realiza el mismo día de cada mes en que activaste tu suscripción.
                Recibirás un recordatorio por email unos días antes.
              </p>
            </details>
          </div>

          <div className="mt-8 text-center">
            <Link href="/faq" className="font-medium text-primary-600 hover:underline">
              Ver todas las preguntas frecuentes →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-neutral-900 text-[#ffffec]">
        <div className="container-custom text-center">
          <h2 className="mb-4 font-display text-3xl md:text-4xl">
            ¿Listo para ahorrar en tu granola favorita?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[#ffffec]/80">
            Únete a cientos de suscriptores que reciben su granola Poppy cada mes sin
            preocupaciones.
          </p>
          <Link href="/tienda" className="btn-primary btn-lg">
            Ver productos y suscribirse
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
