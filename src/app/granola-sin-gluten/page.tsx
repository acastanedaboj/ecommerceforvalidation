import type { Metadata } from 'next';
import {
  Wheat,
  ShieldCheck,
  Search,
  FileCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
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
  title: 'Granola Sin Gluten Apta para Celíacos | Poppy Málaga',
  description:
    'Granola artesanal sin gluten, 100% apta para celíacos. Elaborada con avena certificada sin gluten (<20ppm) y proceso controlado. 4 sabores. Envío gratis desde 4 uds. Hecha en Málaga.',
  keywords: [
    'granola sin gluten',
    'granola celiaca',
    'granola gluten free',
    'comprar granola sin gluten',
    'granola apta celiacos',
    'avena sin gluten',
    'granola certificada sin gluten',
    'desayuno sin gluten',
  ],
  alternates: {
    canonical: getCanonicalUrl('/granola-sin-gluten'),
  },
  openGraph: {
    title: 'Granola Sin Gluten Apta para Celíacos | Poppy',
    description:
      'Granola artesanal elaborada con avena certificada sin gluten. Apta para celíacos. 4 sabores deliciosos. Proceso controlado en Málaga.',
    url: `${SITE_URL}/granola-sin-gluten`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/hero-sin-gluten.jpeg`,
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
  const {
    hero,
    intro,
    whatIsGlutenFree,
    whoShouldEat,
    certification,
    benefits,
    products: productsContent,
    faqs,
    cta,
  } = sinGlutenContent;

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

      {/* Intro Section */}
      <div id="que-es" className="section bg-neutral-50">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl font-display text-neutral-900 mb-4">{intro.title}</h2>
          <p className="text-lg text-neutral-600">{intro.description}</p>
        </div>
      </div>

      {/* What is Gluten-Free Section */}
      <div className="section">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {whatIsGlutenFree.title}
            </h2>
            <p className="text-lg text-neutral-600">{whatIsGlutenFree.subtitle}</p>
          </div>

          <div className="space-y-6">
            {whatIsGlutenFree.content.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-neutral-200 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-700">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-primary-50 border border-primary-100 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-primary-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-neutral-900 font-medium mb-2">
                  ⚠️ Importante para celíacos
                </p>
                <p className="text-neutral-700">
                  Si eres celíaco, NUNCA compres avena normal o "sin gluten añadido". Debe
                  decir explícitamente "certificada sin gluten" o llevar el símbolo de
                  espiga barrada. La avena regular tiene contaminación cruzada y NO es
                  segura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who Should Eat Section */}
      <div className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {whoShouldEat.title}
            </h2>
            <p className="text-lg text-neutral-600">{whoShouldEat.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whoShouldEat.groups.map((group, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-neutral-200 p-6 text-center"
              >
                <div className="text-4xl mb-4">{group.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  {group.title}
                </h3>
                <p className="text-neutral-600 text-sm">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certification Process Section */}
      <div className="section">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {certification.title}
            </h2>
            <p className="text-lg text-neutral-600">{certification.subtitle}</p>
          </div>

          <div className="space-y-6">
            {certification.steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-xl border border-neutral-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-700">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-neutral-900 font-medium mb-2">
                  ✅ Compromiso de transparencia
                </p>
                <p className="text-neutral-700">
                  Si alguna vez tenemos dudas sobre un ingrediente o proveedor, NO lo
                  usamos. Preferimos retrasar un lote antes que comprometer la seguridad de
                  nuestros clientes celíacos. Tu salud es nuestra prioridad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="beneficios" className="bg-neutral-50">
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
          title="Preguntas frecuentes sobre granola sin gluten"
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
