import type { Metadata } from 'next';
import { Leaf, Heart, Users, Globe, CheckCircle2 } from 'lucide-react';
import {
  LandingHero,
  BenefitsGrid,
  ProductsShowcase,
  LandingFAQ,
  LandingCTA,
} from '@/components/landing';
import { getRetailProducts } from '@/data/products';
import { ecologicaContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Granola Ecológica Sin Gluten | Ingredientes BIO | Poppy',
  description:
    'Granola ecológica artesanal con miel eco de Málaga, avena ecológica sin gluten y aceite de coco virgen. 25-30% frutos secos. Envío gratis desde 4 uds.',
  keywords: [
    'granola ecológica',
    'granola bio',
    'granola ecológica sin gluten',
    'comprar granola ecológica',
    'granola orgánica',
    'granola ingredientes ecológicos',
    'miel ecológica granola',
    'granola natural ecológica',
  ],
  alternates: {
    canonical: getCanonicalUrl('/granola-ecologica'),
  },
  openGraph: {
    title: 'Granola Ecológica con Ingredientes BIO | Poppy',
    description:
      'Miel ecológica de Málaga, avena eco sin gluten, aceite de coco virgen. Granola artesanal con 25-30% de frutos secos.',
    url: `${SITE_URL}/granola-ecologica`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/hero-granola.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Granola Ecológica Poppy',
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

// FAQ Schema for SEO
function buildFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ecologicaContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function GranolaEcologicaPage() {
  const products = getRetailProducts();
  const {
    hero,
    intro,
    ingredientes,
    whyEco,
    comparison,
    benefits,
    products: productsContent,
    faqs,
    cta,
  } = ecologicaContent;

  const benefitsWithIcons = [
    { icon: Leaf, ...benefits.items[0] },
    { icon: CheckCircle2, ...benefits.items[1] },
    { icon: Heart, ...benefits.items[2] },
    { icon: Globe, ...benefits.items[3] },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Granola Ecológica', url: `${SITE_URL}/granola-ecologica` },
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

      {/* Intro Section */}
      <div className="section bg-neutral-50">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl font-display text-neutral-900 mb-4">{intro.title}</h2>
          <p className="text-lg text-neutral-600">{intro.description}</p>
        </div>
      </div>

      {/* Ingredientes Section */}
      <div id="ingredientes" className="section">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {ingredientes.title}
            </h2>
            <p className="text-lg text-neutral-600">{ingredientes.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ingredientes.items.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-neutral-200 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {item.title}
                      </h3>
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {item.percentage}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Eco Section */}
      <div className="section bg-neutral-50">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {whyEco.title}
            </h2>
            <p className="text-lg text-neutral-600">{whyEco.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyEco.reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-neutral-200 p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-neutral-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="section">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {comparison.title}
            </h2>
            <p className="text-lg text-neutral-600">{comparison.subtitle}</p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200">
              <div className="p-4 font-semibold text-neutral-900">Aspecto</div>
              <div className="p-4 font-semibold text-green-700 text-center">Poppy Eco</div>
              <div className="p-4 font-semibold text-neutral-500 text-center">Industrial</div>
            </div>
            {comparison.items.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 ${index !== comparison.items.length - 1 ? 'border-b border-neutral-100' : ''}`}
              >
                <div className="p-4 font-medium text-neutral-900">{item.aspect}</div>
                <div className="p-4 text-green-700 text-center text-sm">{item.eco}</div>
                <div className="p-4 text-neutral-500 text-center text-sm">{item.industrial}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-neutral-50">
        <BenefitsGrid
          title={benefits.title}
          subtitle={benefits.subtitle}
          benefits={benefitsWithIcons}
        />
      </div>

      {/* Products Showcase */}
      <ProductsShowcase
        title={productsContent.title}
        subtitle={productsContent.subtitle}
        description={productsContent.description}
        products={products}
      />

      {/* FAQs */}
      <div className="bg-neutral-50">
        <LandingFAQ
          title="Preguntas frecuentes sobre granola ecológica"
          subtitle="Resolvemos tus dudas"
          faqs={faqs}
        />
      </div>

      {/* CTA Final */}
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
