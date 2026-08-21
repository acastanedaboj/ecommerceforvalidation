import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Flame, Droplets, Dumbbell, Leaf, ShieldCheck, XCircle } from 'lucide-react';
import { getRetailProducts } from '@/data/products';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tabla nutricional granola sin gluten: compara 3 sabores | Poppy',
  description:
    'Compara la información nutricional de las 3 granolas Poppy: calorías, proteína, fibra, azúcares y más. Descubre cuál se adapta mejor a tu dieta. Datos por 100g y por ración.',
  keywords: [
    'tabla nutricional granola sin gluten',
    'información nutricional granola',
    'calorías granola sin gluten',
    'granola proteica sin gluten',
    'granola baja en azúcar',
    'comparar granolas sin gluten',
    'granola más fibra',
    'macros granola artesanal',
  ],
  alternates: {
    canonical: getCanonicalUrl('/tabla-nutricional'),
  },
  openGraph: {
    title: 'Tabla nutricional granola sin gluten: compara 3 sabores | Poppy',
    description:
      'Compara calorías, proteína, fibra y azúcares de las 3 granolas Poppy. Encuentra la que mejor se adapta a tus objetivos.',
    url: `${SITE_URL}/tabla-nutricional`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/products/hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tabla nutricional comparativa granolas Poppy',
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

// Short display names for the table
const shortNames: Record<string, string> = {
  prod_granola_clasica: 'Clásica',
  prod_granola_naranja: 'Naranja',
  prod_granola_datiles: 'Vegana',
};

// Key ingredient percentages extracted from ingredient strings
const ingredientBreakdown: Record<
  string,
  {
    avena: number;
    semillas: number;
    frutosSecos: number;
    endulzante: string;
    endulzantePct: number;
    diferenciador: string;
  }
> = {
  prod_granola_clasica: {
    avena: 34,
    semillas: 25,
    frutosSecos: 26,
    endulzante: 'Miel',
    endulzantePct: 8,
    diferenciador: 'Canela y jengibre',
  },
  prod_granola_naranja: {
    avena: 34,
    semillas: 25,
    frutosSecos: 26,
    endulzante: 'Miel',
    endulzantePct: 8,
    diferenciador: 'Piel de naranja deshidratada',
  },
  prod_granola_datiles: {
    avena: 34,
    semillas: 25,
    frutosSecos: 26,
    endulzante: 'Sirope de agave',
    endulzantePct: 8,
    diferenciador: '100% vegana',
  },
};

type NutrientKey =
  | 'calories'
  | 'fat'
  | 'saturatedFat'
  | 'carbohydrates'
  | 'sugars'
  | 'fiber'
  | 'protein'
  | 'salt';

const nutrientConfig: { key: NutrientKey; label: string; unit: string; best: 'min' | 'max' }[] = [
  { key: 'calories', label: 'Calorías', unit: 'kcal', best: 'min' },
  { key: 'protein', label: 'Proteína', unit: 'g', best: 'max' },
  { key: 'fiber', label: 'Fibra', unit: 'g', best: 'max' },
  { key: 'carbohydrates', label: 'Hidratos de carbono', unit: 'g', best: 'min' },
  { key: 'sugars', label: 'Azúcares', unit: 'g', best: 'min' },
  { key: 'fat', label: 'Grasas totales', unit: 'g', best: 'min' },
  { key: 'saturatedFat', label: 'Grasas saturadas', unit: 'g', best: 'min' },
  { key: 'salt', label: 'Sal', unit: 'g', best: 'min' },
];

export default function TablaNutricionalPage() {
  const products = getRetailProducts();

  // Find best value for each nutrient
  const bestValues: Record<NutrientKey, number> = {} as Record<NutrientKey, number>;
  for (const config of nutrientConfig) {
    const values = products.map((p) => p.nutritionalInfo[config.key]);
    bestValues[config.key] = config.best === 'max' ? Math.max(...values) : Math.min(...values);
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Tabla Nutricional', url: '/tabla-nutricional' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div style={{ paddingTop: '140px', paddingBottom: '96px', background: 'var(--off)' }}>
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm">
              <li>
                <Link href="/" className="text-stone-400 transition-colors hover:text-earth-600">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-stone-300" />
              </li>
              <li className="font-medium text-stone-700">Tabla Nutricional</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-14 text-center">
            <h1 className="mb-5 font-display text-stone-800">
              Tabla Nutricional: Compara Nuestras 3 Granolas
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-stone-500">
              Todas nuestras granolas son sin gluten, ecológicas y artesanales. Aquí puedes comparar
              sus valores nutricionales para elegir la que mejor se adapta a tus objetivos.
            </p>
          </div>

          {/* Comparison Table */}
          <section className="mb-16">
            <div className="overflow-hidden rounded-2xl border border-cream-100 bg-white shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cream-200">
                      <th className="px-6 py-4 text-left font-medium text-stone-500">
                        Nutriente (por 100g)
                      </th>
                      {products.map((product) => (
                        <th key={product.id} className="px-4 py-4 text-center">
                          <Link
                            href={`/tienda/${product.slug}`}
                            className="font-display text-base text-stone-800 transition-colors hover:text-earth-600"
                          >
                            {shortNames[product.id] || product.name}
                          </Link>
                          {product.isVegan && (
                            <span className="mt-1 block text-xs text-olive-600">Vegana</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {nutrientConfig.map((config, rowIndex) => (
                      <tr
                        key={config.key}
                        className={rowIndex % 2 === 0 ? 'bg-cream-50/50' : 'bg-white'}
                      >
                        <td className="px-6 py-3.5 font-medium text-stone-600">{config.label}</td>
                        {products.map((product) => {
                          const value = product.nutritionalInfo[config.key];
                          const isBest = value === bestValues[config.key];
                          return (
                            <td
                              key={product.id}
                              className={`px-4 py-3.5 text-center ${
                                isBest ? 'font-semibold text-earth-700' : 'text-stone-600'
                              }`}
                            >
                              {value}
                              {config.unit}
                              {isBest && (
                                <span
                                  className="ml-1.5 inline-block h-2 w-2 rounded-full bg-earth-400"
                                  aria-label="mejor valor"
                                />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-cream-200 bg-cream-50/50 px-6 py-3">
                <p className="flex items-center gap-2 text-xs text-stone-400">
                  <span className="inline-block h-2 w-2 rounded-full bg-earth-400" />
                  Mejor valor en esa categoría
                </p>
              </div>
            </div>
          </section>

          {/* Best For Recommendations */}
          <section className="mb-16">
            <h2 className="mb-3 text-center font-display text-2xl text-stone-800">
              ¿Cuál es la mejor para ti?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-center text-stone-500">
              Según tus objetivos nutricionales, te recomendamos:
            </p>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-xl border border-cream-100 bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-earth-50">
                  <Dumbbell className="h-5 w-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-display text-lg text-stone-800">Más proteína</h3>
                <p className="mb-3 text-sm text-stone-500">
                  17g/100g — Ideal para deportistas y para mantener masa muscular.
                </p>
                <p className="text-sm font-medium text-earth-600">Clásica o Vegana</p>
              </div>

              <div className="rounded-xl border border-cream-100 bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-earth-50">
                  <Droplets className="h-5 w-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-display text-lg text-stone-800">Menos azúcar</h3>
                <p className="mb-3 text-sm text-stone-500">
                  8g/100g — Para dietas bajas en azúcar o control glucémico.
                </p>
                <p className="text-sm font-medium text-earth-600">Clásica o Vegana</p>
              </div>

              <div className="rounded-xl border border-cream-100 bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-earth-50">
                  <Leaf className="h-5 w-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-display text-lg text-stone-800">100% vegana</h3>
                <p className="mb-3 text-sm text-stone-500">
                  Sin miel, endulzada con sirope de agave ecológico.
                </p>
                <p className="text-sm font-medium text-earth-600">Vegana</p>
              </div>
            </div>
          </section>

          {/* Per-serving info */}
          <section className="mb-16">
            <div className="rounded-2xl border border-cream-100 bg-white p-8 shadow-soft">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-earth-50">
                  <Flame className="h-5 w-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="mb-1 font-display text-xl text-stone-800">¿Y por ración?</h2>
                  <p className="text-stone-500">
                    Una ración típica de granola son <strong>40-50g</strong> (unas 3-4 cucharadas
                    soperas). Estos son los valores aproximados por ración de 45g:
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cream-200">
                      <th className="px-4 py-3 text-left font-medium text-stone-500">
                        Por ración (45g)
                      </th>
                      {products.map((product) => (
                        <th
                          key={product.id}
                          className="px-4 py-3 text-center font-medium text-stone-700"
                        >
                          {shortNames[product.id] || product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'calories' as NutrientKey, label: 'Calorías', unit: 'kcal' },
                      { key: 'protein' as NutrientKey, label: 'Proteína', unit: 'g' },
                      { key: 'fiber' as NutrientKey, label: 'Fibra', unit: 'g' },
                      { key: 'sugars' as NutrientKey, label: 'Azúcares', unit: 'g' },
                    ].map((config, rowIndex) => (
                      <tr
                        key={config.key}
                        className={rowIndex % 2 === 0 ? 'bg-cream-50/50' : 'bg-white'}
                      >
                        <td className="px-4 py-3 font-medium text-stone-600">{config.label}</td>
                        {products.map((product) => {
                          const valuePer100 = product.nutritionalInfo[config.key];
                          const valuePerServing = Math.round(valuePer100 * 0.45);
                          return (
                            <td key={product.id} className="px-4 py-3 text-center text-stone-600">
                              {config.key === 'calories'
                                ? `~${valuePerServing}${config.unit}`
                                : `${(valuePer100 * 0.45).toFixed(1)}${config.unit}`}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Ingredient Breakdown */}
          <section className="mb-16">
            <h2 className="mb-3 text-center font-display text-2xl text-stone-800">
              Desglose de ingredientes
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-center text-stone-500">
              Todas comparten una base de avena integral sin gluten, semillas y frutos secos
              premium. Lo que las diferencia es el toque final.
            </p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => {
                const breakdown = ingredientBreakdown[product.id];
                if (!breakdown) return null;
                return (
                  <div
                    key={product.id}
                    className="rounded-xl border border-cream-100 bg-white p-6 shadow-soft"
                  >
                    <h3 className="mb-4 font-display text-lg text-stone-800">
                      {shortNames[product.id]}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Avena integral sin gluten</span>
                        <span className="font-medium text-stone-700">{breakdown.avena}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-cream-100">
                        <div
                          className="h-2 rounded-full bg-earth-300"
                          style={{ width: `${breakdown.avena}%` }}
                        />
                      </div>

                      <div className="flex justify-between">
                        <span className="text-stone-500">Semillas</span>
                        <span className="font-medium text-stone-700">{breakdown.semillas}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-cream-100">
                        <div
                          className="h-2 rounded-full bg-olive-300"
                          style={{ width: `${breakdown.semillas}%` }}
                        />
                      </div>

                      <div className="flex justify-between">
                        <span className="text-stone-500">Frutos secos</span>
                        <span className="font-medium text-stone-700">{breakdown.frutosSecos}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-cream-100">
                        <div
                          className="h-2 rounded-full bg-earth-200"
                          style={{ width: `${breakdown.frutosSecos}%` }}
                        />
                      </div>

                      <div className="flex justify-between">
                        <span className="text-stone-500">{breakdown.endulzante}</span>
                        <span className="font-medium text-stone-700">
                          {breakdown.endulzantePct}%
                        </span>
                      </div>

                      <div className="mt-2 border-t border-cream-100 pt-2">
                        <p className="font-medium text-earth-600">{breakdown.diferenciador}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What you WON'T find */}
          <section className="mb-16">
            <div className="rounded-2xl bg-stone-800 p-8 md:p-10">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <ShieldCheck className="h-5 w-5 text-[#fcf8d5]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="mb-2 font-display text-xl text-[#fcf8d5]">
                    Lo que NO encontrarás en ninguna granola Poppy
                  </h2>
                  <p className="text-[#fcf8d5]/70">
                    Creemos que lo que no lleva un producto es tan importante como lo que lleva.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[
                  'Azúcares refinados',
                  'Aceite de palma',
                  'Conservantes',
                  'Colorantes artificiales',
                  'Aromas artificiales',
                  'Gluten (< 20 ppm certificado)',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[#fcf8d5]/90">
                    <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" strokeWidth={1.5} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="rounded-2xl border border-earth-100 bg-gradient-earth p-8 md:p-10">
              <h2 className="mb-3 font-display text-2xl text-stone-800">
                ¿Ya sabes cuál es tu favorita?
              </h2>
              <p className="mx-auto mb-6 max-w-lg text-stone-600">
                Prueba nuestras granolas y comprueba la diferencia de una granola artesanal,
                ecológica y sin gluten certificada.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/tienda" className="btn-primary">
                  Ver granolas
                </Link>
                <Link
                  href="/blog/avena-sin-gluten-guia-completa-celiacos"
                  className="font-medium text-earth-600 transition-colors hover:text-earth-700"
                >
                  Leer guía sobre avena sin gluten →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
