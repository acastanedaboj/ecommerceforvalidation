import type { Metadata } from 'next';
import { Wheat, ShieldCheck, Search, FileCheck } from 'lucide-react';
import {
  LandingHero,
  BenefitsGrid,
  ProductsShowcase,
  LandingFAQ,
  LandingCTA,
} from '@/components/landing';
import { getRetailProducts } from '@/data/products';
import { sinGlutenContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Granola Sin Gluten Apta para Celíacos | Poppy',
  description:
    'Granola artesanal sin gluten, apta para celíacos. Elaborada con avena certificada sin gluten y proceso controlado. 4 sabores. Envío gratis desde 4 unidades.',
  keywords: [
    'granola sin gluten',
    'granola celiaca',
    'granola gluten free',
    'comprar granola sin gluten',
    'granola apta celiacos',
    'avena sin gluten',
  ],
  alternates: {
    canonical: getCanonicalUrl('/granola-sin-gluten'),
  },
  openGraph: {
    title: 'Granola Sin Gluten Apta para Celíacos | Poppy',
    description:
      'Granola artesanal elaborada con avena certificada sin gluten. Apta para celíacos. 4 sabores deliciosos.',
    url: `${SITE_URL}/granola-sin-gluten`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/products/hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Granola Sin Gluten Poppy',
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
    mainEntity: sinGlutenContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function GranolaSinGlutenPage() {
  const products = getRetailProducts();
  const { hero, benefits, products: productsContent, faqs, cta } = sinGlutenContent;

  const benefitsWithIcons = [
    { icon: Wheat, ...benefits.items[0] },
    { icon: ShieldCheck, ...benefits.items[1] },
    { icon: Search, ...benefits.items[2] },
    { icon: FileCheck, ...benefits.items[3] },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Granola Sin Gluten', url: `${SITE_URL}/granola-sin-gluten` },
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

      <div id="beneficios">
        <BenefitsGrid
          title={benefits.title}
          subtitle={benefits.subtitle}
          benefits={benefitsWithIcons}
        />
      </div>

      <ProductsShowcase
        title={productsContent.title}
        subtitle={productsContent.subtitle}
        description={productsContent.description}
        products={products}
      />

      <LandingFAQ
        title="Preguntas frecuentes sobre granola sin gluten"
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
