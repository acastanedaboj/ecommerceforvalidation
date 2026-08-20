import type { Metadata } from 'next';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BookOpen,
  Stethoscope,
  Apple,
  ShieldCheck,
  Home,
  Wheat,
  HelpCircle,
} from 'lucide-react';
import { LandingHero, LandingFAQ, LandingCTA } from '@/components/landing';
import { guiaCeliaquiaContent } from '@/data/landing-content';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Guía completa de celiaquía y dieta sin gluten 2026 | Poppy',
  description:
    'Guía definitiva sobre celiaquía: qué es, síntomas, diagnóstico, tratamiento y cómo seguir una dieta sin gluten. Información basada en evidencia científica y fuentes oficiales (FACE, normativa UE). Actualizada 2026.',
  keywords: [
    'celiaquía',
    'enfermedad celiaca',
    'dieta sin gluten',
    'síntomas celiaquía',
    'diagnóstico celiaquía',
    'alimentos sin gluten',
    'contaminación cruzada gluten',
    'avena sin gluten',
    'celíaco',
    'gluten free',
    'intolerancia gluten',
    'FACE celiaquía',
  ],
  alternates: {
    canonical: getCanonicalUrl('/guia-celiaquia-dieta-sin-gluten'),
  },
  openGraph: {
    title: 'Guía completa de celiaquía y dieta sin gluten',
    description:
      'Todo lo que necesitas saber sobre la enfermedad celíaca: síntomas, diagnóstico, tratamiento y vida sin gluten. Fuentes oficiales y actualizada.',
    url: `${SITE_URL}/guia-celiaquia-dieta-sin-gluten`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/images/hero-sin-gluten.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Guía de Celiaquía y Dieta Sin Gluten',
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

// Article Schema para SEO
function buildArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Guía Completa de Celiaquía y Dieta Sin Gluten',
    description:
      'Guía definitiva sobre celiaquía: qué es, síntomas, diagnóstico, tratamiento y cómo seguir una dieta sin gluten correctamente.',
    image: `${SITE_URL}/images/hero-sin-gluten.jpeg`,
    datePublished: '2026-01-15',
    dateModified: new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: 'Poppy',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Poppy',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/guia-celiaquia-dieta-sin-gluten`,
    },
  };
}

// MedicalCondition Schema
function buildMedicalSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: 'Enfermedad celíaca',
    alternateName: ['Celiaquía', 'Celiac disease', 'Coeliac disease'],
    description:
      'Enfermedad autoinmune del intestino delgado causada por la ingestión de gluten en personas genéticamente predispuestas.',
    associatedAnatomy: {
      '@type': 'AnatomicalStructure',
      name: 'Intestino delgado',
    },
    cause: {
      '@type': 'MedicalCause',
      name: 'Consumo de gluten en personas con predisposición genética HLA-DQ2/DQ8',
    },
    possibleTreatment: {
      '@type': 'MedicalTherapy',
      name: 'Dieta sin gluten estricta de por vida',
    },
    riskFactor: [
      {
        '@type': 'MedicalRiskFactor',
        name: 'Predisposición genética (genes HLA-DQ2, HLA-DQ8)',
      },
      {
        '@type': 'MedicalRiskFactor',
        name: 'Antecedentes familiares de celiaquía',
      },
    ],
    epidemiology:
      'Afecta aproximadamente al 1% de la población mundial. En España se estima que hay 500.000 celíacos, de los cuales el 75% no están diagnosticados.',
  };
}

// FAQ Schema
function buildFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guiaCeliaquiaContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function GuiaCeliaquiaPage() {
  const {
    hero,
    intro,
    queEsCeliaquia,
    sintomas,
    diagnostico,
    tratamiento,
    alimentosPermitidos,
    etiquetado,
    contaminacionCruzada,
    avena,
    vivirSinGluten,
    faqs,
    cta,
  } = guiaCeliaquiaContent;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Guía de Celiaquía', url: `${SITE_URL}/guia-celiaquia-dieta-sin-gluten` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={buildArticleSchema()} />
      <JsonLd data={buildMedicalSchema()} />
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

      {/* Índice de contenidos */}
      <nav className="section-sm border-b border-neutral-200 bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">Contenido de esta guía</h2>
          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
            {[
              { href: '#que-es', label: 'Qué es la celiaquía', icon: BookOpen },
              { href: '#sintomas', label: 'Síntomas', icon: Stethoscope },
              { href: '#diagnostico', label: 'Diagnóstico', icon: AlertCircle },
              { href: '#tratamiento', label: 'Tratamiento', icon: ShieldCheck },
              { href: '#alimentos', label: 'Alimentos permitidos', icon: Apple },
              { href: '#etiquetado', label: 'Leer etiquetas', icon: CheckCircle2 },
              { href: '#contaminacion', label: 'Contaminación cruzada', icon: AlertTriangle },
              { href: '#avena', label: 'Avena y celiaquía', icon: Wheat },
              { href: '#vida-diaria', label: 'Vida sin gluten', icon: Home },
              { href: '#faqs', label: 'Preguntas frecuentes', icon: HelpCircle },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-lg p-2 text-neutral-700 transition-all hover:bg-white hover:text-primary-700 hover:shadow-sm"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Introducción con estadísticas */}
      <div className="section">
        <div className="container-custom max-w-4xl">
          <h2 className="mb-4 font-display text-3xl text-neutral-900">{intro.title}</h2>
          <p className="mb-8 text-lg text-neutral-600">{intro.description}</p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {intro.stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl border border-primary-100 bg-primary-50 p-4 text-center"
              >
                <div className="mb-1 text-3xl font-bold text-primary-700">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm italic text-neutral-500">
            Fuentes: Federación de Asociaciones de Celíacos de España (FACE), World Gastroenterology
            Organisation (WGO), Sociedad Española de Enfermedad Celíaca (SEEC).
          </p>
        </div>
      </div>

      {/* Qué es la celiaquía */}
      <div id="que-es" className="section bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">{queEsCeliaquia.title}</h2>
              <p className="text-neutral-600">{queEsCeliaquia.subtitle}</p>
            </div>
          </div>

          <div className="space-y-6">
            {queEsCeliaquia.content.map((item, index) => (
              <div key={index} className="rounded-xl border border-neutral-200 bg-white p-6">
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">{item.title}</h3>
                <p className="mb-3 text-neutral-700">{item.text}</p>
                <p className="text-xs text-neutral-500">Fuente: {item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Síntomas */}
      <div id="sintomas" className="section">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Stethoscope className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">{sintomas.title}</h2>
              <p className="text-neutral-600">{sintomas.subtitle}</p>
            </div>
          </div>

          <p className="mb-8 text-lg text-neutral-600">{sintomas.intro}</p>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Síntomas digestivos */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-neutral-900">
                {sintomas.digestivos.title}
              </h3>
              <ul className="space-y-2">
                {sintomas.digestivos.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 text-primary-600">•</span>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Síntomas extradigestivos */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-neutral-900">
                {sintomas.extradigestivos.title}
              </h3>
              <ul className="space-y-2">
                {sintomas.extradigestivos.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 text-amber-600">•</span>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Síntomas en niños */}
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-neutral-900">{sintomas.ninos.title}</h3>
            <ul className="grid gap-2 md:grid-cols-2">
              {sintomas.ninos.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Importante */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600" />
              <p className="text-neutral-800">{sintomas.importante}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnóstico */}
      <div id="diagnostico" className="section bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">{diagnostico.title}</h2>
              <p className="text-neutral-600">{diagnostico.subtitle}</p>
            </div>
          </div>

          <p className="mb-8 text-lg text-neutral-600">{diagnostico.intro}</p>

          <div className="mb-8 space-y-6">
            {diagnostico.pasos.map((paso) => (
              <div key={paso.numero} className="rounded-xl border border-neutral-200 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700">
                    {paso.numero}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-neutral-900">{paso.titulo}</h3>
                    <p className="mb-2 text-neutral-700">{paso.descripcion}</p>
                    <p className="text-sm font-medium text-primary-600">{paso.nota}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Advertencia */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-600" />
              <p className="text-neutral-800">{diagnostico.advertencia}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tratamiento */}
      <div id="tratamiento" className="section">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">{tratamiento.title}</h2>
              <p className="text-neutral-600">{tratamiento.subtitle}</p>
            </div>
          </div>

          <p className="mb-8 text-lg text-neutral-600">{tratamiento.intro}</p>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {tratamiento.principios.map((principio, index) => (
              <div key={index} className="rounded-xl border border-neutral-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{principio.titulo}</h3>
                <p className="text-neutral-700">{principio.descripcion}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Beneficios */}
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-green-800">
                <CheckCircle2 className="h-5 w-5" />
                {tratamiento.beneficios.titulo}
              </h3>
              <ul className="space-y-2">
                {tratamiento.beneficios.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 text-green-600">✓</span>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Consecuencias */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-red-800">
                <XCircle className="h-5 w-5" />
                {tratamiento.consecuencias.titulo}
              </h3>
              <ul className="space-y-2">
                {tratamiento.consecuencias.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">✗</span>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Alimentos permitidos y prohibidos */}
      <div id="alimentos" className="section bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Apple className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">
                {alimentosPermitidos.title}
              </h2>
              <p className="text-neutral-600">{alimentosPermitidos.subtitle}</p>
            </div>
          </div>

          {/* Permitidos */}
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-green-800">
              {alimentosPermitidos.permitidos.titulo}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {alimentosPermitidos.permitidos.categorias.map((categoria, index) => (
                <div key={index} className="rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-semibold text-neutral-900">{categoria.nombre}</h4>
                  <ul className="space-y-1 text-sm">
                    {categoria.items.map((item, i) => (
                      <li key={i} className="text-neutral-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibidos */}
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-red-800">
              {alimentosPermitidos.prohibidos.titulo}
            </h3>
            <ul className="grid gap-2 md:grid-cols-2">
              {alimentosPermitidos.prohibidos.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Peligrosos */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-amber-800">
              {alimentosPermitidos.peligrosos.titulo}
            </h3>
            <ul className="grid gap-2 md:grid-cols-2">
              {alimentosPermitidos.peligrosos.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Etiquetado */}
      <div id="etiquetado" className="section">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">{etiquetado.title}</h2>
              <p className="text-neutral-600">{etiquetado.subtitle}</p>
            </div>
          </div>

          <p className="mb-8 text-lg text-neutral-600">{etiquetado.intro}</p>

          <div className="mb-8 space-y-4">
            {etiquetado.categorias.map((cat, index) => (
              <div
                key={index}
                className={`rounded-xl border p-6 ${
                  cat.color === 'green'
                    ? 'border-green-200 bg-green-50'
                    : cat.color === 'yellow'
                      ? 'border-amber-200 bg-amber-50'
                      : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="md:w-1/4">
                    <span
                      className={`text-lg font-bold ${
                        cat.color === 'green'
                          ? 'text-green-800'
                          : cat.color === 'yellow'
                            ? 'text-amber-800'
                            : 'text-red-800'
                      }`}
                    >
                      {cat.etiqueta}
                    </span>
                    <p className="text-sm text-neutral-600">{cat.limite}</p>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-neutral-700">{cat.significado}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Símbolos */}
          <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-neutral-900">
              {etiquetado.simbolos.titulo}
            </h3>
            <div className="space-y-4">
              {etiquetado.simbolos.items.map((simbolo, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                  <div>
                    <h4 className="font-medium text-neutral-900">{simbolo.nombre}</h4>
                    <p className="text-sm text-neutral-600">{simbolo.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Obligación legal */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-neutral-800">{etiquetado.alergenos}</p>
          </div>
        </div>
      </div>

      {/* Contaminación cruzada */}
      <div id="contaminacion" className="section bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">
                {contaminacionCruzada.title}
              </h2>
              <p className="text-neutral-600">{contaminacionCruzada.subtitle}</p>
            </div>
          </div>

          <p className="mb-8 text-lg text-neutral-600">{contaminacionCruzada.intro}</p>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* En casa */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-neutral-900">
                <Home className="h-5 w-5 text-primary-600" />
                {contaminacionCruzada.enCasa.titulo}
              </h3>
              <ul className="space-y-2">
                {contaminacionCruzada.enCasa.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fuera de casa */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-neutral-900">
                {contaminacionCruzada.fueraDeCasa.titulo}
              </h3>
              <ul className="space-y-2">
                {contaminacionCruzada.fueraDeCasa.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cantidad segura */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-neutral-800">{contaminacionCruzada.cantidadSegura}</p>
          </div>
        </div>
      </div>

      {/* Avena */}
      <div id="avena" className="section">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Wheat className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">{avena.title}</h2>
              <p className="text-neutral-600">{avena.subtitle}</p>
            </div>
          </div>

          <p className="mb-8 text-lg text-neutral-600">{avena.intro}</p>

          <div className="mb-8 space-y-4">
            {avena.puntos.map((punto, index) => (
              <div key={index} className="rounded-xl border border-neutral-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{punto.titulo}</h3>
                <p className="text-neutral-700">{punto.descripcion}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600" />
              <p className="text-neutral-800">{avena.advertencia}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vivir sin gluten */}
      <div id="vida-diaria" className="section bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Home className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="font-display text-3xl text-neutral-900">{vivirSinGluten.title}</h2>
              <p className="text-neutral-600">{vivirSinGluten.subtitle}</p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {vivirSinGluten.consejos.map((consejo, index) => (
              <div key={index} className="rounded-xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-neutral-900">{consejo.titulo}</h3>
                <p className="text-sm text-neutral-600">{consejo.descripcion}</p>
              </div>
            ))}
          </div>

          {/* Apps */}
          <div className="rounded-xl border border-primary-100 bg-primary-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900">
              {vivirSinGluten.apps.titulo}
            </h3>
            <ul className="space-y-2">
              {vivirSinGluten.apps.items.map((app, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-600" />
                  <span className="text-neutral-700">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div id="faqs">
        <LandingFAQ title="Preguntas frecuentes sobre celiaquía" subtitle="" faqs={faqs} />
      </div>

      {/* CTA */}
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
