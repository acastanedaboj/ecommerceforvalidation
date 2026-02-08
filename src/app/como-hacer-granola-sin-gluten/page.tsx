import type { Metadata } from 'next';
import { Clock, Users, ChefHat, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  LandingHero,
  BenefitsGrid,
  ProductsShowcase,
  LandingFAQ,
  LandingCTA,
} from '@/components/landing';
import { getRetailProducts } from '@/data/products';
import { recetaGranolaContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cómo Hacer Granola Sin Gluten Casera: Receta Paso a Paso 2026',
  description:
    'Receta completa de granola sin gluten casera apta para celíacos. Paso a paso con ingredientes, tiempos y consejos de experto. Fácil, económica y deliciosa.',
  keywords: [
    'como hacer granola sin gluten',
    'receta granola sin gluten',
    'granola casera sin gluten',
    'hacer granola apta celiacos',
    'granola sin gluten casera',
    'receta granola celiacos',
  ],
  alternates: {
    canonical: getCanonicalUrl('/como-hacer-granola-sin-gluten'),
  },
  openGraph: {
    title: 'Receta: Cómo Hacer Granola Sin Gluten en Casa',
    description:
      'Aprende a hacer granola sin gluten casera con esta receta detallada. Perfecta para celíacos, económica y fácil de personalizar.',
    url: `${SITE_URL}/como-hacer-granola-sin-gluten`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/images/hero-sin-gluten.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Receta Granola Sin Gluten Casera',
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

// Recipe Schema for SEO
function buildRecipeSchema() {
  const { instructions, ingredients } = recetaGranolaContent;

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Granola Sin Gluten Casera',
    description:
      'Receta fácil de granola sin gluten casera, apta para celíacos. Crujiente, deliciosa y personalizable.',
    image: [
      `${SITE_URL}/images/hero-sin-gluten.jpeg`,
    ],
    author: {
      '@type': 'Organization',
      name: 'Poppy',
      url: SITE_URL,
    },
    datePublished: '2026-01-15',
    prepTime: 'PT15M',
    cookTime: 'PT60M',
    keywords: 'granola sin gluten, receta celiaca, granola casera',
    totalTime: 'PT1H15M',
    recipeYield: '10 porciones',
    recipeCategory: 'Desayuno',
    recipeCuisine: 'Internacional',
    recipeIngredient: [
      '300g de copos de avena certificada sin gluten',
      '80g de almendras',
      '40g de nueces pecanas',
      '80ml de miel',
      '60ml de aceite de oliva',
      '50g de arándanos secos',
    ],
    recipeInstructions: instructions.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: step.number,
      name: step.title,
      text: step.description,
      url: `${SITE_URL}/como-hacer-granola-sin-gluten#paso-${step.number}`,
      image: `${SITE_URL}/images/hero-sin-gluten.jpeg`,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: '50g',
      calories: '220 kcal',
    },
    suitableForDiet: ['https://schema.org/GlutenFreeDiet'],
  };
}

// FAQ Schema for SEO
function buildFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: recetaGranolaContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function ComoHacerGranolaSinGlutenPage() {
  const products = getRetailProducts();
  const {
    hero,
    intro,
    ingredients,
    instructions,
    tips,
    benefits,
    comparison,
    faqs,
    cta,
  } = recetaGranolaContent;

  const benefitsWithIcons = benefits.items.map((item, index) => ({
    icon: [ChefHat, CheckCircle2, AlertCircle, Clock][index % 4],
    ...item,
  }));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Granola Sin Gluten', url: `${SITE_URL}/granola-sin-gluten` },
    {
      name: 'Receta Casera',
      url: `${SITE_URL}/como-hacer-granola-sin-gluten`,
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={buildRecipeSchema()} />
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
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-display text-neutral-900 mb-4 text-center">
            {intro.title}
          </h2>
          <p className="text-lg text-neutral-600 mb-6 text-center">{intro.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {intro.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-200"
              >
                <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span className="text-neutral-900">{feature.replace('✓ ', '')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div id="ingredientes" className="section">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {ingredients.title}
            </h2>
            <p className="text-lg text-neutral-600">{ingredients.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {ingredients.base.title}
              </h3>
              <ul className="space-y-2">
                {ingredients.base.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Frutos Secos */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {ingredients.frutoSecos.title}
              </h3>
              <ul className="space-y-2">
                {ingredients.frutoSecos.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Endulzante */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {ingredients.endulzante.title}
              </h3>
              <ul className="space-y-2">
                {ingredients.endulzante.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extras */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {ingredients.extras.title}
              </h3>
              <ul className="space-y-2">
                {ingredients.extras.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="mt-8 p-6 bg-primary-50 border border-primary-100 rounded-xl">
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-700" />
                <span className="text-neutral-900">
                  <strong>Tiempo:</strong> {instructions.totalTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-700" />
                <span className="text-neutral-900">
                  <strong>Rinde:</strong> {instructions.yield}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="section bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {instructions.title}
            </h2>
            <p className="text-lg text-neutral-600">{instructions.subtitle}</p>
          </div>

          <div className="space-y-6">
            {instructions.steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-xl border border-neutral-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-neutral-900">
                        {step.title}
                      </h3>
                      <span className="text-sm text-primary-600 font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {step.time}
                      </span>
                    </div>
                    <p className="text-neutral-700">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="section">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {tips.title}
            </h2>
            <p className="text-lg text-neutral-600">{tips.subtitle}</p>
          </div>

          <div className="space-y-4">
            {tips.items.map((tip, index) => (
              <div
                key={index}
                className="bg-white border border-neutral-200 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 flex items-start gap-2">
                  <span className="text-primary-600">💡</span>
                  {tip.title}
                </h3>
                <p className="text-neutral-700">{tip.description}</p>
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

      {/* Comparison Table */}
      <div className="section">
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
                <div className="font-semibold text-neutral-600 text-center">Casera</div>
                <div className="font-semibold text-primary-700 text-center">✨ Poppy</div>
              </div>

              {comparison.items.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 p-4 ${
                    index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'
                  } border-b border-neutral-100`}
                >
                  <div className="font-medium text-neutral-900">{item.feature}</div>
                  <div className="text-sm text-center text-neutral-600">{item.casera}</div>
                  <div className="text-sm text-center text-primary-700 font-medium">
                    {item.comprada}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/tienda">
                <Button variant="primary" size="lg">
                  Ver granola artesanal Poppy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Products Showcase */}
      <div className="bg-neutral-50">
        <ProductsShowcase
          title="O prueba nuestras granolas artesanales"
          subtitle="4 sabores únicos, todos sin gluten"
          description="Si prefieres la conveniencia, nuestras granolas están listas para disfrutar. Ingredientes premium, proceso artesanal perfeccionado."
          products={products}
        />
      </div>

      {/* FAQs */}
      <LandingFAQ
        title="Preguntas frecuentes sobre la receta"
        subtitle="Resolvemos tus dudas"
        faqs={faqs}
      />

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
