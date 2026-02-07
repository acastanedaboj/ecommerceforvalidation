import type { Metadata } from 'next';
import { Star, Trophy, Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  LandingHero,
  LandingFAQ,
  LandingCTA,
} from '@/components/landing';
import { mejorGranolaContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Mejor Granola Sin Gluten España 2026 | Comparativa Completa',
  description:
    'Comparativa de las mejores granolas sin gluten en España: Poppy, CIVIA Foods, El Granero, Sanalocura. Análisis de ingredientes, precios y certificaciones.',
  keywords: [
    'mejor granola sin gluten españa',
    'granola sin gluten comparativa',
    'granola celiaco españa',
    'ranking granola sin gluten',
    'comprar granola sin gluten',
    'granola sin gluten mercadona alternativa',
    'granola artesanal sin gluten',
  ],
  alternates: {
    canonical: getCanonicalUrl('/mejor-granola-sin-gluten-espana'),
  },
  openGraph: {
    title: 'Mejor Granola Sin Gluten España 2026 | Comparativa',
    description:
      'Analizamos las principales granolas sin gluten del mercado español: ingredientes, precios y certificaciones.',
    url: `${SITE_URL}/mejor-granola-sin-gluten-espana`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/images/hero-granola.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Comparativa Granola Sin Gluten España',
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
    mainEntity: mejorGranolaContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Article Schema for comparative content
function buildArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mejor Granola Sin Gluten España 2026 - Comparativa Completa',
    description:
      'Análisis detallado de las principales granolas sin gluten del mercado español.',
    author: {
      '@type': 'Organization',
      name: 'Poppy',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Poppy',
      url: SITE_URL,
    },
    datePublished: '2026-01-15',
    dateModified: '2026-02-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/mejor-granola-sin-gluten-espana`,
    },
  };
}

export default function MejorGranolaSinGlutenPage() {
  const { hero, intro, criterios, ranking, conclusion, faqs, cta } = mejorGranolaContent;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Mejor Granola Sin Gluten España', url: `${SITE_URL}/mejor-granola-sin-gluten-espana` },
  ]);

  // Helper to render markdown-like content
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.includes(':**')) {
        const match = line.match(/^\*\*(.+?):\*\*(.*)$/);
        if (match) {
          return (
            <p key={i} className="mb-3">
              <strong className="text-neutral-900">{match[1]}:</strong>
              {match[2]}
            </p>
          );
        }
      }
      if (line.trim() === '') return null;
      return (
        <p key={i} className="mb-3 text-neutral-600">
          {line}
        </p>
      );
    });
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={buildFAQSchema()} />
      <JsonLd data={buildArticleSchema()} />

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
      <div className="section bg-neutral-50">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl font-display text-neutral-900 mb-4">{intro.title}</h2>
          <p className="text-lg text-neutral-600">{intro.description}</p>
        </div>
      </div>

      {/* Criterios Section */}
      <div id="criterios" className="section">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {criterios.title}
            </h2>
            <p className="text-lg text-neutral-600">{criterios.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criterios.items.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-neutral-200 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <span
                    className={cn(
                      'text-xs font-medium px-2 py-1 rounded',
                      item.importance === 'crítica'
                        ? 'bg-red-100 text-red-700'
                        : item.importance === 'alta'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-neutral-100 text-neutral-600'
                    )}
                  >
                    {item.importance}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ranking Section */}
      <div id="ranking" className="section bg-neutral-50">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-neutral-900 mb-3">
              {ranking.title}
            </h2>
            <p className="text-lg text-neutral-600">{ranking.subtitle}</p>
          </div>

          <div className="space-y-6">
            {ranking.items.map((item) => (
              <div
                key={item.position}
                className={cn(
                  'bg-white rounded-xl border-2 overflow-hidden',
                  item.isOurs
                    ? 'border-primary-300 ring-2 ring-primary-100'
                    : 'border-neutral-200'
                )}
              >
                {/* Header */}
                <div
                  className={cn(
                    'p-6 flex items-center gap-4',
                    item.isOurs ? 'bg-primary-50' : 'bg-neutral-50'
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold',
                      item.position === 1
                        ? 'bg-amber-400 text-amber-900'
                        : item.position === 2
                        ? 'bg-neutral-300 text-neutral-700'
                        : item.position === 3
                        ? 'bg-amber-600 text-amber-100'
                        : 'bg-neutral-200 text-neutral-600'
                    )}
                  >
                    {item.position === 1 ? (
                      <Trophy className="w-6 h-6" />
                    ) : (
                      item.position
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {item.name}
                      {item.isOurs && (
                        <span className="ml-2 text-sm font-normal text-primary-600">
                          (Nuestra granola)
                        </span>
                      )}
                    </h3>
                    <p className="text-neutral-500">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-neutral-900">{item.price}</p>
                    <p className="text-sm text-neutral-500">{item.frutosSecos} frutos secos</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 grid md:grid-cols-3 gap-6">
                  {/* Specs */}
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-3">
                      Características
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-neutral-400">Endulzante:</span>
                        <span className="text-neutral-700">{item.endulzante}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-neutral-400">Certificación:</span>
                        <span className="text-neutral-700">{item.certificacion}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pros */}
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-3">Pros</h4>
                    <ul className="space-y-2">
                      {item.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contras */}
                  <div>
                    <h4 className="text-sm font-medium text-red-600 mb-3">Contras</h4>
                    <ul className="space-y-2">
                      {item.contras.map((contra, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{contra}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Verdict */}
                <div className="px-6 pb-6">
                  <div className="bg-neutral-50 rounded-lg p-4 flex items-start gap-3">
                    <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-neutral-700">
                      <strong>Veredicto:</strong> {item.verdict}
                    </p>
                  </div>
                </div>

                {/* CTA for our product */}
                {item.isOurs && (
                  <div className="px-6 pb-6">
                    <Link
                      href="/tienda"
                      className="btn-primary w-full justify-center"
                    >
                      Probar Poppy Granola
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="section">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-display text-neutral-900 mb-6 text-center">
            {conclusion.title}
          </h2>
          <div className="prose-custom text-neutral-600">
            {renderContent(conclusion.content)}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-neutral-50">
        <LandingFAQ
          title="Preguntas frecuentes sobre granola sin gluten"
          subtitle="Dudas comunes sobre esta comparativa"
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
