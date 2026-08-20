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
  title: 'Granola apta para celíacos | Poppy',
  description:
    'Granola artesanal apta para celíacos. Elaborada con avena certificada sin gluten y proceso controlado. 3 sabores deliciosos. Envío gratis desde 4 unidades.',
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
    title: 'Granola apta para celíacos | Poppy',
    description:
      'Granola artesanal elaborada pensando en celíacos. Avena certificada sin gluten y proceso controlado. 3 sabores.',
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
  const {
    hero,
    intro,
    commitment,
    products: productsContent,
    faqs,
    resources,
    cta,
  } = celiacosContent;

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
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-display text-2xl text-stone-800 md:text-3xl">{intro.title}</h2>
            <p className="text-lg leading-relaxed text-stone-600">{intro.description}</p>
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
      <section className="bg-stone-50 py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-display text-2xl text-stone-800">
              {resources.title}
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {resources.items.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.url}
                  target={resource.url.startsWith('http') ? '_blank' : undefined}
                  rel={resource.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="mb-2 font-display text-lg text-stone-800 transition-colors group-hover:text-earth-600">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-stone-600">{resource.description}</p>
                    </div>
                    {resource.url.startsWith('http') && (
                      <ExternalLink className="ml-4 h-5 w-5 flex-shrink-0 text-stone-400" />
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
