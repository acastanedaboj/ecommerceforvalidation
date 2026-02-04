import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Wheat, CheckCircle, FileText, ExternalLink } from 'lucide-react';
import {
  LandingHero,
  BenefitsGrid,
  ProductsShowcase,
  LandingFAQ,
  LandingCTA,
} from '@/components/landing';
import { getRetailProducts } from '@/data/products';
import { celiacosContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Granola Apta para Celíacos | Poppy',
  description:
    'Granola artesanal apta para celíacos. Elaborada con avena certificada sin gluten y proceso controlado. 4 sabores deliciosos. Envío gratis desde 4 unidades.',
  keywords: [
    'granola celiacos',
    'granola apta celiacos',
    'granola para celiacos',
    'celiaco granola',
    'desayuno celiaco',
    'avena sin gluten celiacos',
  ],
  alternates: {
    canonical: getCanonicalUrl('/granola-para-celiacos'),
  },
  openGraph: {
    title: 'Granola Apta para Celíacos | Poppy',
    description:
      'Granola artesanal elaborada pensando en celíacos. Avena certificada sin gluten y proceso controlado. 4 sabores.',
    url: `${SITE_URL}/granola-para-celiacos`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/products/hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Granola Apta para Celíacos Poppy',
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
    mainEntity: celiacosContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function GranolaParaCeliacosPage() {
  const products = getRetailProducts();
  const { hero, intro, commitment, products: productsContent, faqs, resources, cta } = celiacosContent;

  const commitmentWithIcons = [
    { icon: Wheat, ...commitment.items[0] },
    { icon: ShieldCheck, ...commitment.items[1] },
    { icon: CheckCircle, ...commitment.items[2] },
    { icon: FileText, ...commitment.items[3] },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Granola para Celíacos', url: `${SITE_URL}/granola-para-celiacos` },
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
        badges={hero.badges}
        image={hero.image}
      />

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl text-stone-800 mb-4">
              {intro.title}
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              {intro.description}
            </p>
          </div>
        </div>
      </section>

      <div id="compromiso">
        <BenefitsGrid
          title={commitment.title}
          subtitle={commitment.subtitle}
          benefits={commitmentWithIcons}
        />
      </div>

      <ProductsShowcase
        title={productsContent.title}
        subtitle={productsContent.subtitle}
        description={productsContent.description}
        products={products}
      />

      {/* Resources Section */}
      <section className="py-16 bg-stone-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl text-stone-800 mb-8 text-center">
              {resources.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.items.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.url}
                  target={resource.url.startsWith('http') ? '_blank' : undefined}
                  rel={resource.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg text-stone-800 mb-2 group-hover:text-earth-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-stone-600 text-sm">{resource.description}</p>
                    </div>
                    {resource.url.startsWith('http') && (
                      <ExternalLink className="w-5 h-5 text-stone-400 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LandingFAQ
        title="Preguntas frecuentes sobre granola para celíacos"
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
