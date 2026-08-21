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
  title: 'Granola artesanal premium de Málaga | Poppy',
  description:
    'Granola elaborada artesanalmente en pequeños lotes con ingredientes de Málaga. Miel local, frutos secos premium. 3 sabores únicos. Envío gratis +4 uds.',
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
    title: 'Granola artesanal premium de Málaga | Poppy',
    description: 'Granola elaborada artesanalmente en pequeños lotes con ingredientes de Málaga.',
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
      <section className="bg-white py-20 md:py-28">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs uppercase tracking-widest text-stone-500">
              {ingredients.subtitle}
            </p>
            <h2 className="font-display text-stone-800">{ingredients.title}</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ingredients.items.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-earth-100">
                  <span className="text-2xl">
                    {index === 0 && '🍯'}
                    {index === 1 && '🥜'}
                    {index === 2 && '🌾'}
                    {index === 3 && '🫒'}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg text-stone-800">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.description}</p>
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
      <section className="bg-stone-50 py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-display text-2xl text-stone-800">
              Artesanal vs Industrial
            </h2>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-100">
                    <th className="px-6 py-4 text-left font-medium text-stone-800">Aspecto</th>
                    <th className="px-6 py-4 text-center font-medium text-earth-600">
                      Poppy (Artesanal)
                    </th>
                    <th className="px-6 py-4 text-center font-medium text-stone-500">Industrial</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  <tr className="border-b border-stone-100">
                    <td className="px-6 py-4 font-medium">Tamaño del lote</td>
                    <td className="px-6 py-4 text-center text-earth-600">&lt;50kg</td>
                    <td className="px-6 py-4 text-center text-stone-400">Toneladas</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="px-6 py-4 font-medium">Ingredientes</td>
                    <td className="px-6 py-4 text-center text-earth-600">Locales y premium</td>
                    <td className="px-6 py-4 text-center text-stone-400">Estandarizados</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="px-6 py-4 font-medium">Proceso</td>
                    <td className="px-6 py-4 text-center text-earth-600">Manual, controlado</td>
                    <td className="px-6 py-4 text-center text-stone-400">Automatizado</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="px-6 py-4 font-medium">Aditivos</td>
                    <td className="px-6 py-4 text-center text-earth-600">Ninguno</td>
                    <td className="px-6 py-4 text-center text-stone-400">Conservantes, etc.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Frescura</td>
                    <td className="px-6 py-4 text-center text-earth-600">Recién hecha</td>
                    <td className="px-6 py-4 text-center text-stone-400">Meses en almacén</td>
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
