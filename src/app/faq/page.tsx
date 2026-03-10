import { Metadata } from 'next';
import Link from 'next/link';
import { Package, Truck, CreditCard, RefreshCw, Shield } from 'lucide-react';
import { faqs, faqCategories, getFAQsByCategory, getAllFAQs } from '@/data/faqs';
import { SITE_URL, getCanonicalUrl, buildFaqSchema, buildBreadcrumbSchema, JsonLd } from '@/lib/seo';

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
  producto: <Package className="w-5 h-5" />,
  envio: <Truck className="w-5 h-5" />,
  pago: <CreditCard className="w-5 h-5" />,
  suscripcion: <RefreshCw className="w-5 h-5" />,
  legal: <Shield className="w-5 h-5" />,
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
        <div className="text-center mb-12">
          <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
            Preguntas frecuentes
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, maxWidth: '520px', margin: '0 auto', lineHeight: 1.85 }}>
            Encuentra respuestas a las dudas más comunes sobre nuestros productos,
            envíos, pagos y suscripciones.
          </p>
        </div>

        {/* Category navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
        <div className="max-w-3xl mx-auto space-y-12">
          {faqCategories.map((category) => {
            const categoryFaqs = getFAQsByCategory(
              category.id as 'producto' | 'envio' | 'pago' | 'suscripcion' | 'legal'
            );

            return (
              <section key={category.id} id={category.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: 'var(--off)' }}>
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
                        className="cursor-pointer list-none flex justify-between items-center transition-colors"
                        style={{ padding: '20px 24px', fontSize: '15px', fontWeight: 400, color: 'var(--dark)' }}
                      >
                        {faq.question}
                        <span className="group-open:rotate-180 transition-transform ml-4 flex-shrink-0" style={{ color: 'var(--brown)' }}>
                          ↓
                        </span>
                      </summary>
                      <div style={{ padding: '0 24px 20px' }}>
                        {faq.answer.split('\n\n').map((paragraph, index) => (
                          <p
                            key={index}
                            className="last:mb-0 whitespace-pre-line"
                            style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '12px' }}
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
        <div className="mt-16 p-8 md:p-12 text-center max-w-2xl mx-auto" style={{ background: 'var(--off)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px' }}>
            ¿No encuentras lo que buscas?
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.85 }}>
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
          </p>
          <Link href="/contacto" className="btn-pill">
            contactar
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
