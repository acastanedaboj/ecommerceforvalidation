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

      <div className="section">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-display text-4xl text-neutral-900 md:text-5xl">
              Preguntas frecuentes
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
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
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                {categoryIcons[category.id]}
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                      {categoryIcons[category.id]}
                    </div>
                    <h2 className="font-display text-2xl text-neutral-900">{category.name}</h2>
                  </div>

                  <div className="space-y-4">
                    {categoryFaqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group rounded-xl border border-neutral-200 bg-white"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-neutral-900 transition-colors hover:text-primary-600">
                          {faq.question}
                          <span className="ml-4 flex-shrink-0 text-primary-600 transition-transform group-open:rotate-180">
                            ↓
                          </span>
                        </summary>
                        <div className="-mt-2 px-6 pb-6">
                          <div className="prose-custom prose-sm">
                            {faq.answer.split('\n\n').map((paragraph, index) => (
                              <p
                                key={index}
                                className="mb-3 whitespace-pre-line text-neutral-600 last:mb-0"
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
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-primary-50 p-8 text-center">
            <h3 className="mb-2 text-xl text-neutral-900">¿No encuentras lo que buscas?</h3>
            <p className="mb-4 text-neutral-600">
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
