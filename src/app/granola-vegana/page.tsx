import type { Metadata } from 'next';
import Link from 'next/link';
import { Leaf, Droplets, Heart, TreeDeciduous } from 'lucide-react';
import {
  LandingHero,
  BenefitsGrid,
  ProductsShowcase,
  LandingFAQ,
  LandingCTA,
} from '@/components/landing';
import { getRetailProducts } from '@/data/products';
import { veganaContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Granola Vegana 100% Sin Miel | Poppy',
  description:
    'Granola vegana endulzada con dátiles Medjool y sirope de agave. Sin miel ni productos animales. Artesanal, ecológica y sin gluten. Envío gratis +4 uds.',
  keywords: [
    'granola vegana',
    'granola sin miel',
    'granola plant-based',
    'granola 100% vegetal',
    'granola datiles',
    'granola sirope agave',
  ],
  alternates: {
    canonical: getCanonicalUrl('/granola-vegana'),
  },
  openGraph: {
    title: 'Granola Vegana 100% Sin Miel | Poppy',
    description:
      'Granola vegana endulzada con dátiles Medjool y sirope de agave. Sin miel ni productos animales.',
    url: `${SITE_URL}/granola-vegana`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/products/granola-datiles.jpg`,
        width: 1200,
        height: 630,
        alt: 'Granola Vegana Poppy',
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
    mainEntity: veganaContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function GranolaVeganaPage() {
  const allProducts = getRetailProducts();
  const veganProduct = allProducts.filter((p) => p.id === 'prod_granola_datiles');
  const { hero, benefits, products: productsContent, comparison, faqs, cta } = veganaContent;

  const benefitsWithIcons = [
    { icon: Leaf, ...benefits.items[0] },
    { icon: Droplets, ...benefits.items[1] },
    { icon: Heart, ...benefits.items[2] },
    { icon: TreeDeciduous, ...benefits.items[3] },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Granola Vegana', url: `${SITE_URL}/granola-vegana` },
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

      <BenefitsGrid
        title={benefits.title}
        subtitle={benefits.subtitle}
        benefits={benefitsWithIcons}
      />

      <ProductsShowcase
        title={productsContent.title}
        subtitle={productsContent.subtitle}
        description={productsContent.description}
        products={veganProduct}
        highlightProductId="prod_granola_datiles"
        ctaText="Ver todas las granolas"
        ctaHref="/tienda"
      />

      {/* Transparencia Section */}
      <section className="py-16 bg-stone-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl text-stone-800 mb-4">
              {comparison.title}
            </h2>
            <p className="text-stone-600 mb-8">{comparison.description}</p>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="py-3 text-stone-800 font-medium">Producto</th>
                    <th className="py-3 text-stone-800 font-medium text-center">Vegano</th>
                    <th className="py-3 text-stone-800 font-medium text-center">Endulzante</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  <tr className="border-b border-stone-100 bg-olive-50">
                    <td className="py-3 font-medium text-stone-800">Granola de Dátiles</td>
                    <td className="py-3 text-center text-olive-600 font-semibold">Sí ✓</td>
                    <td className="py-3 text-center">Dátiles + Sirope de agave</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3">Granola Clásica</td>
                    <td className="py-3 text-center text-stone-400">No</td>
                    <td className="py-3 text-center">Miel ecológica</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3">Granola de Chocolate</td>
                    <td className="py-3 text-center text-stone-400">No</td>
                    <td className="py-3 text-center">Miel ecológica</td>
                  </tr>
                  <tr>
                    <td className="py-3">Granola de Naranja</td>
                    <td className="py-3 text-center text-stone-400">No</td>
                    <td className="py-3 text-center">Miel ecológica</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-stone-500 mt-4">
              Todas nuestras granolas son sin gluten y aptas para celíacos.{' '}
              <Link href="/granola-sin-gluten" className="text-earth-600 hover:underline">
                Más información
              </Link>
            </p>
          </div>
        </div>
      </section>

      <LandingFAQ
        title="Preguntas frecuentes sobre granola vegana"
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
