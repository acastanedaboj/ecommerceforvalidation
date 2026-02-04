import type { Metadata } from 'next';
import { Sparkles, Award, Leaf, Timer } from 'lucide-react';
import {
  LandingHero,
  BenefitsGrid,
  ProductsShowcase,
  LandingFAQ,
  LandingCTA,
} from '@/components/landing';
import { getRetailProducts } from '@/data/products';
import { artesanalContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Granola Artesanal Premium de Málaga | Poppy',
  description:
    'Granola elaborada artesanalmente en pequeños lotes con ingredientes de Málaga. Miel ecológica local, frutos secos premium. 4 sabores únicos. Envío gratis +4 uds.',
  keywords: [
    'granola artesanal',
    'granola casera premium',
    'granola hecha a mano',
    'granola gourmet',
    'granola malaga',
    'granola ingredientes locales',
  ],
  alternates: {
    canonical: getCanonicalUrl('/granola-artesanal'),
  },
  openGraph: {
    title: 'Granola Artesanal Premium de Málaga | Poppy',
    description:
      'Granola elaborada artesanalmente en pequeños lotes con ingredientes de Málaga.',
    url: `${SITE_URL}/granola-artesanal`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/products/hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Granola Artesanal Poppy',
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
    mainEntity: artesanalContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function GranolaArtesanalPage() {
  const products = getRetailProducts();
  const { hero, benefits, ingredients, products: productsContent, faqs, cta } = artesanalContent;

  const benefitsWithIcons = [
    { icon: Sparkles, ...benefits.items[0] },
    { icon: Award, ...benefits.items[1] },
    { icon: Leaf, ...benefits.items[2] },
    { icon: Timer, ...benefits.items[3] },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Granola Artesanal', url: `${SITE_URL}/granola-artesanal` },
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

      <BenefitsGrid
        title={benefits.title}
        subtitle={benefits.subtitle}
        benefits={benefitsWithIcons}
      />

      {/* Ingredientes Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">
              {ingredients.subtitle}
            </p>
            <h2 className="font-display text-stone-800">{ingredients.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {ingredients.items.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">
                    {index === 0 && '🍯'}
                    {index === 1 && '🥜'}
                    {index === 2 && '🌾'}
                    {index === 3 && '🫒'}
                  </span>
                </div>
                <h3 className="font-display text-lg text-stone-800 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductsShowcase
        title={productsContent.title}
        subtitle={productsContent.subtitle}
        description={productsContent.description}
        products={products}
      />

      {/* Comparativa Section */}
      <section className="py-16 bg-stone-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl text-stone-800 mb-8 text-center">
              Artesanal vs Industrial
            </h2>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-100">
                    <th className="py-4 px-6 text-left text-stone-800 font-medium">Aspecto</th>
                    <th className="py-4 px-6 text-center text-earth-600 font-medium">Poppy (Artesanal)</th>
                    <th className="py-4 px-6 text-center text-stone-500 font-medium">Industrial</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  <tr className="border-b border-stone-100">
                    <td className="py-4 px-6 font-medium">Tamaño del lote</td>
                    <td className="py-4 px-6 text-center text-earth-600">&lt;50kg</td>
                    <td className="py-4 px-6 text-center text-stone-400">Toneladas</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-4 px-6 font-medium">Ingredientes</td>
                    <td className="py-4 px-6 text-center text-earth-600">Locales y premium</td>
                    <td className="py-4 px-6 text-center text-stone-400">Estandarizados</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-4 px-6 font-medium">Proceso</td>
                    <td className="py-4 px-6 text-center text-earth-600">Manual, controlado</td>
                    <td className="py-4 px-6 text-center text-stone-400">Automatizado</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-4 px-6 font-medium">Aditivos</td>
                    <td className="py-4 px-6 text-center text-earth-600">Ninguno</td>
                    <td className="py-4 px-6 text-center text-stone-400">Conservantes, etc.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Frescura</td>
                    <td className="py-4 px-6 text-center text-earth-600">Recién hecha</td>
                    <td className="py-4 px-6 text-center text-stone-400">Meses en almacén</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <LandingFAQ
        title="Preguntas frecuentes sobre granola artesanal"
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
