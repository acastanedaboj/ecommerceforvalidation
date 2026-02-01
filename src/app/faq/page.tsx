import { Metadata } from 'next';
import Link from 'next/link';
import { Package, Truck, CreditCard, RefreshCw, Shield } from 'lucide-react';
import { faqs, faqCategories, getFAQsByCategory, getAllFAQs } from '@/data/faqs';
import { SITE_URL, getCanonicalUrl, buildFaqSchema, buildBreadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes (FAQ) | Granola Sin Gluten',
  description:
    'Resuelve tus dudas sobre granola Poppy: ingredientes sin gluten, opciones veganas, envíos a España, métodos de pago, suscripciones y política de devoluciones.',
  alternates: {
    canonical: getCanonicalUrl('/faq'),
  },
  openGraph: {
    title: 'Preguntas Frecuentes | Poppy',
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

      <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-neutral-900 mb-4">
            Preguntas frecuentes
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              {categoryIcons[category.id]}
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
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    {categoryIcons[category.id]}
                  </div>
                  <h2 className="text-2xl font-display text-neutral-900">
                    {category.name}
                  </h2>
                </div>

                <div className="space-y-4">
                  {categoryFaqs.map((faq) => (
                    <details
                      key={faq.id}
                      className="bg-white rounded-xl border border-neutral-200 group"
                    >
                      <summary className="p-6 font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center hover:text-primary-600 transition-colors">
                        {faq.question}
                        <span className="text-primary-600 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">
                          ↓
                        </span>
                      </summary>
                      <div className="px-6 pb-6 -mt-2">
                        <div className="prose-custom prose-sm">
                          {faq.answer.split('\n\n').map((paragraph, index) => (
                            <p
                              key={index}
                              className="text-neutral-600 mb-3 last:mb-0 whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: paragraph
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\n- /g, '<br/>• '),
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-primary-50 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl text-neutral-900 mb-2">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-neutral-600 mb-4">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
          </p>
          <Link href="/contacto" className="btn-primary">
            Contactar
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
