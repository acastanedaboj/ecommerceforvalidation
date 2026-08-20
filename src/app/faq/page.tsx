import { Metadata } from 'next';
import Link from 'next/link';
import { Package, Truck, CreditCard, RefreshCw, Shield } from 'lucide-react';
import { faqs, faqCategories, getFAQsByCategory, getAllFAQs } from '@/data/faqs';
import {
  SITE_URL,
  getCanonicalUrl,
  buildFaqSchema,
  buildBreadcrumbSchema,
  JsonLd,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes (FAQ) | Granola sin gluten',
  description:
    'Resuelve tus dudas sobre granola Poppy: ingredientes sin gluten, opciones veganas, envíos a España, métodos de pago, suscripciones y política de devoluciones.',
  alternates: {
    canonical: getCanonicalUrl('/faq'),
  },
  openGraph: {
    title: 'Preguntas frecuentes | Poppy',
    description:
      'Todo lo que necesitas saber sobre nuestra granola sin gluten: ingredientes, envíos, pagos y suscripciones.',
    url: `${SITE_URL}/faq`,
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  producto: <Package className="h-5 w-5" />,
  envio: <Truck className="h-5 w-5" />,
  pago: <CreditCard className="h-5 w-5" />,
  suscripcion: <RefreshCw className="h-5 w-5" />,
  legal: <Shield className="h-5 w-5" />,
};

export default function FAQPage() {
  const allFaqs = getAllFAQs();

  return (
    <>
      {/* JSON-LD: FAQ Schema */}
      <JsonLd data={buildFaqSchema(allFaqs)} />

      {/* JSON-LD: Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Preguntas Frecuentes', url: '/faq' },
        ])}
      />

      <div style={{ paddingTop: '140px', paddingBottom: '96px' }}>
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Preguntas frecuentes
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(17,17,17,.5)',
                fontWeight: 300,
                maxWidth: '520px',
                margin: '0 auto',
                lineHeight: 1.85,
              }}
            >
              Encuentra respuestas a las dudas más comunes sobre nuestros productos, envíos, pagos y
              suscripciones.
            </p>
          </div>

          {/* Category navigation */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex items-center gap-2 transition-colors"
                style={{
                  padding: '8px 18px',
                  background: 'var(--white)',
                  border: '1px solid rgba(0,0,0,.1)',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: 'rgba(17,17,17,.6)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: 'var(--brown)' }}>{categoryIcons[category.id]}</span>
                {category.name}
              </a>
            ))}
          </div>

          {/* FAQ sections */}
          <div className="mx-auto max-w-3xl space-y-12">
            {faqCategories.map((category) => {
              const categoryFaqs = getFAQsByCategory(
                category.id as 'producto' | 'envio' | 'pago' | 'suscripcion' | 'legal'
              );

              return (
                <section key={category.id} id={category.id}>
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center"
                      style={{ background: 'var(--off)' }}
                    >
                      <span style={{ color: 'var(--brown)' }}>{categoryIcons[category.id]}</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px' }}>
                      {category.name}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {categoryFaqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group"
                        style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}
                      >
                        <summary
                          className="flex cursor-pointer list-none items-center justify-between transition-colors"
                          style={{
                            padding: '20px 24px',
                            fontSize: '15px',
                            fontWeight: 400,
                            color: 'var(--dark)',
                          }}
                        >
                          {faq.question}
                          <span
                            className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180"
                            style={{ color: 'var(--brown)' }}
                          >
                            ↓
                          </span>
                        </summary>
                        <div style={{ padding: '0 24px 20px' }}>
                          {faq.answer.split('\n\n').map((paragraph, index) => (
                            <p
                              key={index}
                              className="whitespace-pre-line last:mb-0"
                              style={{
                                fontSize: '14px',
                                color: 'rgba(17,17,17,.5)',
                                fontWeight: 300,
                                lineHeight: 1.85,
                                marginBottom: '12px',
                              }}
                              dangerouslySetInnerHTML={{
                                __html: paragraph
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\n- /g, '<br/>• '),
                              }}
                            />
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div
            className="mx-auto mt-16 max-w-2xl p-8 text-center md:p-12"
            style={{ background: 'var(--off)' }}
          >
            <h3
              style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px' }}
            >
              ¿No encuentras lo que buscas?
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(17,17,17,.5)',
                fontWeight: 300,
                marginBottom: '24px',
                lineHeight: 1.85,
              }}
            >
              Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
            </p>
            <Link href="/contacto" className="btn-pill">
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
