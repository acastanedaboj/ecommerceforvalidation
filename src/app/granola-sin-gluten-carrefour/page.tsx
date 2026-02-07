import type { Metadata } from 'next';
import { Check, X, ShoppingCart, Sparkles, Heart, Shield } from 'lucide-react';
import {
  LandingHero,
  BenefitsGrid,
  ProductsShowcase,
  LandingFAQ,
  LandingCTA,
} from '@/components/landing';
import { getRetailProducts } from '@/data/products';
import { carrefourContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Granola Sin Gluten Carrefour vs Poppy: Comparativa 2026',
  description:
    '¿Granola sin gluten de Carrefour o artesanal Poppy? Comparamos ingredientes, precio, calidad y sabor. Descubre cuál es mejor para ti.',
  keywords: [
    'granola sin gluten carrefour',
    'granola carrefour sin gluten',
    'carrefour bio granola',
    'comprar granola sin gluten',
    'granola artesanal vs carrefour',
    'mejor granola sin gluten',
  ],
  alternates: {
    canonical: getCanonicalUrl('/granola-sin-gluten-carrefour'),
  },
  openGraph: {
    title: 'Granola Sin Gluten: Carrefour vs Poppy Artesanal',
    description:
      'Comparativa completa entre granola de Carrefour y granola artesanal Poppy. Ingredientes, precio, calidad.',
    url: `${SITE_URL}/granola-sin-gluten-carrefour`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/images/hero-sin-gluten.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Comparativa Granola Sin Gluten Carrefour vs Poppy',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

function buildFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: carrefourContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function GranolaSinGlutenCarrefourPage() {
  const products = getRetailProducts();
  const { hero, intro, comparison, benefits, carrefourSection, faqs, cta } =
    carrefourContent;

  const benefitsWithIcons = [
    { icon: Sparkles, ...benefits.items[0] },
    { icon: Heart, ...benefits.items[1] },
    { icon: ShoppingCart, ...benefits.items[2] },
    { icon: Shield, ...benefits.items[3] },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Granola Sin Gluten', url: `${SITE_URL}/granola-sin-gluten` },
    {
      name: 'Comparativa Carrefour',
      url: `${SITE_URL}/granola-sin-gluten-carrefour`,
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={buildFAQSchema()} />

      <LandingHero
        title={hero.title}
        highlight={hero.highlight}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        ctaHref={hero.ctaHref}
        secondaryCta={hero.secondaryCta}
        badges={hero.badges}
        image={hero.image}
      />

      <div className="section bg-neutral-50">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl font-display text-neutral-900 mb-4">
            {intro.title}
          </h2>
          <p className="text-lg text-neutral-600">{intro.description}</p>
        </div>
      </div>

      <div id="comparativa" className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {comparison.title}
            </h2>
            <p className="text-lg text-neutral-600">{comparison.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-3 gap-4 p-4 bg-primary-50 border-b border-primary-100">
                <div className="font-semibold text-neutral-900">Característica</div>
                <div className="font-semibold text-primary-700 text-center">✨ Poppy</div>
                <div className="font-semibold text-neutral-600 text-center">Carrefour</div>
              </div>

              {comparison.items.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 p-4 ${
                    index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'
                  } border-b border-neutral-100`}
                >
                  <div className="font-medium text-neutral-900">{item.feature}</div>
                  <div className="text-sm text-center text-primary-700 font-medium">
                    {item.poppy}
                  </div>
                  <div className="text-sm text-center text-neutral-600">
                    {item.carrefour}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/tienda">
                <Button variant="primary" size="lg">Comprar Poppy ahora</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50">
        <BenefitsGrid
          title={benefits.title}
          subtitle={benefits.subtitle}
          benefits={benefitsWithIcons}
        />
      </div>

      <div className="section">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-display text-neutral-900 mb-4 text-center">
            {carrefourSection.title}
          </h2>
          <p className="text-lg text-neutral-600 mb-8 text-center">
            {carrefourSection.description}
          </p>

          <div className="space-y-4">
            {carrefourSection.options.map((option, index) => (
              <div key={index} className="bg-white border border-neutral-200 rounded-lg p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="font-semibold text-neutral-900 mb-2">{option.name}</h3>
                    <p className="text-sm text-neutral-600 mb-2">{option.note}</p>
                    <p className="text-sm font-medium text-primary-600">{option.price}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {option.glutenFree === 'Sí' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <Check className="w-4 h-4" />
                        Sin gluten
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        <X className="w-4 h-4" />
                        Verificar
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-primary-50 border border-primary-100 rounded-lg">
            <p className="text-neutral-900">
              <strong>💡 Consejo:</strong> Si compras en Carrefour, busca el símbolo de
              espiga barrada y verifica siempre la lista de ingredientes. Con Poppy, sabes
              que todos los sabores son siempre aptos para celíacos.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50">
        <ProductsShowcase
          title="Nuestras granolas sin gluten"
          subtitle="4 sabores, todos artesanales"
          description="Todos los sabores de Poppy son elaborados con avena certificada sin gluten y proceso controlado."
          products={products}
        />
      </div>

      <LandingFAQ
        title="Preguntas frecuentes: Poppy vs Carrefour"
        subtitle="Resolvemos tus dudas"
        faqs={faqs}
      />

      <LandingCTA
        title={cta.title}
        description={cta.description}
        ctaText={cta.ctaText}
        ctaHref={cta.ctaHref}
        secondaryCta={cta.secondaryCta}
      />
    </>
  );
}
