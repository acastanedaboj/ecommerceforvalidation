import { Metadata } from 'next';
import Link from 'next/link';
import { Check, RefreshCw, Truck, CreditCard, X, ArrowRight, Gift } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getSubscriptionInfo, calculatePackUnitPrice } from '@/lib/pricing';
import { PRICING } from '@/lib/constants';
import { SITE_URL, getCanonicalUrl, buildBreadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Suscripción mensual de granola sin gluten | 15% descuento',
  description:
    'Suscríbete y ahorra un 15% en granola Poppy sin gluten y sin lactosa. Recibe 6 bolsas cada mes con envío gratis. Sin permanencia, cancela cuando quieras.',
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
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Suscripción', url: '/suscripcion' },
        ])}
      />

      {/* Hero Section */}
      <section
        style={{
          background: 'var(--dark)',
          color: 'var(--white)',
          paddingTop: '160px',
          paddingBottom: '80px',
        }}
      >
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span
              className="badge mb-4"
              style={{ background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.7)' }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Suscripción mensual
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--white)',
                marginBottom: '24px',
              }}
            >
              Suscríbete y ahorra un {subscriptionInfo.discountPercentage}%
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,.6)',
                fontWeight: 300,
                lineHeight: 1.8,
                marginBottom: '32px',
              }}
            >
              Recibe 6 bolsas de granola Poppy cada mes a solo{' '}
              <strong style={{ color: 'var(--white)', fontWeight: 700 }}>
                {formatPrice(subscriptionInfo.unitPriceCents)}/ud
              </strong>
              . Sin gluten, sin lactosa. Envío gratis, cancela cuando quieras.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/tienda/granola-clasica-150g"
                className="btn-pill-white"
                style={{ padding: '14px 32px' }}
              >
                Empezar suscripción
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section style={{ padding: '96px 0' }}>
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Compara y ahorra
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(17,17,17,.5)',
                fontWeight: 300,
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              Con la suscripción, obtienes el mejor precio posible por unidad
            </p>
          </div>

          <div
            className="mx-auto grid max-w-4xl gap-px md:grid-cols-3"
            style={{ background: 'rgba(0,0,0,.06)' }}
          >
            {/* Single purchase */}
            <div className="p-8" style={{ background: 'var(--white)' }}>
              <h3
                style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '8px' }}
              >
                Compra única
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(17,17,17,.4)',
                  fontWeight: 300,
                  marginBottom: '16px',
                }}
              >
                1 bolsa
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  marginBottom: '16px',
                }}
              >
                {formatPrice(PRICING.BASE_PRICE_CENTS)}
                <span
                  style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                    color: 'rgba(17,17,17,.4)',
                  }}
                >
                  /ud
                </span>
              </div>
              <ul
                style={{ listStyle: 'none', fontSize: '13px', color: 'rgba(17,17,17,.5)' }}
                className="space-y-2"
              >
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4" style={{ color: 'rgba(17,17,17,.2)' }} />
                  Sin descuento
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4" style={{ color: 'rgba(17,17,17,.2)' }} />
                  Gastos de envío
                </li>
              </ul>
            </div>

            {/* Pack 6 */}
            <div className="p-8" style={{ background: 'var(--white)' }}>
              <h3
                style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '8px' }}
              >
                Pack 6
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(17,17,17,.4)',
                  fontWeight: 300,
                  marginBottom: '16px',
                }}
              >
                Compra única
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  marginBottom: '16px',
                }}
              >
                {formatPrice(pack6Price)}
                <span
                  style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                    color: 'rgba(17,17,17,.4)',
                  }}
                >
                  /ud
                </span>
              </div>
              <ul
                style={{ listStyle: 'none', fontSize: '13px', color: 'rgba(17,17,17,.5)' }}
                className="space-y-2"
              >
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" style={{ color: 'var(--brown)' }} />
                  10% descuento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" style={{ color: 'var(--brown)' }} />
                  Envío gratis
                </li>
              </ul>
            </div>

            {/* Subscription */}
            <div
              className="relative p-8"
              style={{ background: 'var(--off)', borderTop: '3px solid var(--yellow)' }}
            >
              <span
                className="badge absolute -top-3 left-1/2 -translate-x-1/2"
                style={{ background: 'var(--yellow)', color: 'var(--dark)', fontWeight: 700 }}
              >
                Mejor precio
              </span>
              <h3
                style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '8px' }}
              >
                Suscripción
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(17,17,17,.4)',
                  fontWeight: 300,
                  marginBottom: '16px',
                }}
              >
                Pack 6 mensual
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  color: 'var(--brown)',
                  marginBottom: '16px',
                }}
              >
                {formatPrice(subscriptionInfo.unitPriceCents)}
                <span
                  style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                    color: 'rgba(17,17,17,.4)',
                  }}
                >
                  /ud
                </span>
              </div>
              <ul
                style={{ listStyle: 'none', fontSize: '13px', color: 'rgba(17,17,17,.5)' }}
                className="space-y-2"
              >
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" style={{ color: 'var(--brown)' }} />
                  15% descuento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" style={{ color: 'var(--brown)' }} />
                  Envío gratis siempre
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" style={{ color: 'var(--brown)' }} />
                  Cancela cuando quieras
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>
              Con la suscripción ahorras{' '}
              <strong style={{ color: 'var(--brown)', fontWeight: 700 }}>
                {formatPrice(subscriptionInfo.monthlySavings)}
              </strong>{' '}
              cada mes respecto a la compra individual
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '96px 0', background: 'var(--off)' }}>
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Cómo funciona
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                num: '1',
                title: 'Elige tu sabor',
                desc: 'Selecciona la variedad de granola que más te guste',
              },
              {
                num: '2',
                title: 'Activa tu suscripción',
                desc: 'Marca la opción de suscripción al añadir al carrito',
              },
              {
                num: '3',
                title: 'Recibe cada mes',
                desc: 'Tu pack de 6 bolsas llega a casa automáticamente',
              },
              {
                num: '4',
                title: 'Gestiona fácilmente',
                desc: 'Pausa, modifica o cancela desde tu cuenta',
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center"
                  style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px',
                      color: 'var(--brown)',
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    marginBottom: '8px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'rgba(17,17,17,.5)',
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '96px 0' }}>
        <div className="container-custom">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
                Ventajas de ser suscriptor
              </h2>
              <ul style={{ listStyle: 'none' }} className="space-y-5">
                {[
                  {
                    icon: Gift,
                    title: '15% de descuento permanente',
                    desc: 'El mejor precio por unidad, garantizado',
                  },
                  {
                    icon: Truck,
                    title: 'Envío gratis siempre',
                    desc: 'Sin mínimos, sin condiciones. Entrega gratuita en Málaga centro',
                  },
                  {
                    icon: RefreshCw,
                    title: 'Flexibilidad total',
                    desc: 'Pausa, modifica o cancela cuando quieras',
                  },
                  {
                    icon: CreditCard,
                    title: 'Sin sorpresas',
                    desc: 'Siempre el mismo precio, sin subidas',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex gap-4">
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center"
                        style={{ background: 'rgba(243,238,148,.2)' }}
                      >
                        <Icon className="h-5 w-5" style={{ color: 'var(--brown)' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                          {item.title}
                        </h3>
                        <p
                          style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300 }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-8" style={{ background: 'var(--off)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  marginBottom: '16px',
                }}
              >
                Resumen de tu suscripción
              </h3>
              <div className="mb-6 space-y-3" style={{ fontSize: '14px' }}>
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>Pack mensual</span>
                  <span style={{ fontWeight: 700 }}>6 bolsas de 150g</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>
                    Precio por unidad
                  </span>
                  <span style={{ fontWeight: 700 }}>
                    {formatPrice(subscriptionInfo.unitPriceCents)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>Envío</span>
                  <span style={{ fontWeight: 700, color: 'var(--brown)' }}>Gratis</span>
                </div>
                <div
                  className="flex justify-between pt-3"
                  style={{ borderTop: '1px solid rgba(0,0,0,.07)' }}
                >
                  <span>Total mensual</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px',
                      color: 'var(--brown)',
                    }}
                  >
                    {formatPrice(subscriptionInfo.totalPriceCents)}
                  </span>
                </div>
              </div>
              <Link href="/tienda/granola-clasica-150g" className="btn-primary justify-center">
                empezar ahora
              </Link>
              <p
                className="mt-3 text-center"
                style={{ fontSize: '11px', color: 'rgba(17,17,17,.4)', fontWeight: 300 }}
              >
                Sin permanencia. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '96px 0', background: 'var(--off)' }}>
        <div className="container-custom max-w-3xl">
          <div className="mb-12 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Preguntas frecuentes sobre la suscripción
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: '¿Puedo cancelar mi suscripción en cualquier momento?',
                a: 'Sí, puedes cancelar tu suscripción en cualquier momento desde tu cuenta. No hay permanencia ni penalizaciones. La cancelación se hará efectiva al final del período actual ya pagado.',
              },
              {
                q: '¿Puedo pausar la suscripción temporalmente?',
                a: '¡Claro! Si te vas de vacaciones o tienes suficiente stock, puedes pausar tu suscripción hasta 3 meses desde tu panel de cuenta.',
              },
              {
                q: '¿Puedo cambiar el sabor de mi suscripción?',
                a: 'Sí, puedes modificar el sabor de tu suscripción antes de que se procese el siguiente envío. Solo tienes que acceder a tu cuenta y editar la suscripción.',
              },
              {
                q: '¿Cuándo se cobra cada mes?',
                a: 'El cobro se realiza el mismo día de cada mes en que activaste tu suscripción. Recibirás un recordatorio por email unos días antes.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group"
                style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between p-6"
                  style={{ color: 'var(--dark)', fontWeight: 700, fontSize: '14px' }}
                >
                  {faq.q}
                  <span
                    className="transition-transform group-open:rotate-180"
                    style={{ color: 'var(--brown)' }}
                  >
                    ↓
                  </span>
                </summary>
                <p
                  className="-mt-2 px-6 pb-6"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(17,17,17,.5)',
                    fontWeight: 300,
                    lineHeight: 1.85,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/faq" className="btn-text">
              Ver todas las preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '96px 0', background: 'var(--yellow)' }}>
        <div className="container-custom text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
            ¿Quieres ahorrar en tu granola favorita?
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(17,17,17,.6)',
              fontWeight: 300,
              maxWidth: '480px',
              margin: '0 auto 32px',
              lineHeight: 1.85,
            }}
          >
            Únete a cientos de suscriptores que reciben su granola Poppy cada mes sin
            preocupaciones.
          </p>
          <Link href="/tienda" className="btn-pill" style={{ padding: '14px 32px' }}>
            Ver productos y suscribirse
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
