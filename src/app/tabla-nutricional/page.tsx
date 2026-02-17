import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Flame, Wheat, Droplets, Dumbbell, Leaf, ShieldCheck, XCircle } from 'lucide-react';
import { getRetailProducts } from '@/data/products';
import { SITE_URL, getCanonicalUrl, JsonLd, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tabla Nutricional Granola Sin Gluten: Compara 4 Sabores | Poppy',
  description:
    'Compara la información nutricional de las 4 granolas Poppy: calorías, proteína, fibra, azúcares y más. Descubre cuál se adapta mejor a tu dieta. Datos por 100g y por ración.',
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
    title: 'Tabla Nutricional Granola Sin Gluten: Compara 4 Sabores | Poppy',
    description:
      'Compara calorías, proteína, fibra y azúcares de las 4 granolas Poppy. Encuentra la que mejor se adapta a tus objetivos.',
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
  prod_granola_chocolate: 'Chocolate',
  prod_granola_naranja: 'Naranja',
  prod_granola_datiles: 'Vegana',
};

// Key ingredient percentages extracted from ingredient strings
const ingredientBreakdown: Record<string, { avena: number; semillas: number; frutosSecos: number; endulzante: string; endulzantePct: number; diferenciador: string }> = {
  prod_granola_clasica: { avena: 50, semillas: 25, frutosSecos: 13, endulzante: 'Miel ecológica', endulzantePct: 7, diferenciador: 'Especias (canela, jengibre)' },
  prod_granola_chocolate: { avena: 48, semillas: 24, frutosSecos: 12, endulzante: 'Miel ecológica', endulzantePct: 7, diferenciador: 'Cacao puro + chocolate negro 70%' },
  prod_granola_naranja: { avena: 48, semillas: 24, frutosSecos: 12, endulzante: 'Miel ecológica', endulzantePct: 7, diferenciador: 'Naranja confitada + ralladura natural' },
  prod_granola_datiles: { avena: 50, semillas: 25, frutosSecos: 13, endulzante: 'Sirope de agave', endulzantePct: 7, diferenciador: '100% vegana' },
};

type NutrientKey = 'calories' | 'fat' | 'saturatedFat' | 'carbohydrates' | 'sugars' | 'fiber' | 'protein' | 'salt';

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

      <div className="section bg-cream-50">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm">
              <li>
                <Link href="/" className="text-stone-400 hover:text-earth-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-stone-300" />
              </li>
              <li className="text-stone-700 font-medium">Tabla Nutricional</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="font-display text-stone-800 mb-5">
              Tabla Nutricional: Compara Nuestras 4 Granolas
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Todas nuestras granolas son sin gluten, ecológicas y artesanales. Aquí puedes comparar
              sus valores nutricionales para elegir la que mejor se adapta a tus objetivos.
            </p>
          </div>

          {/* Comparison Table */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-soft border border-cream-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cream-200">
                      <th className="text-left px-6 py-4 text-stone-500 font-medium">
                        Nutriente (por 100g)
                      </th>
                      {products.map((product) => (
                        <th key={product.id} className="px-4 py-4 text-center">
                          <Link
                            href={`/tienda/${product.slug}`}
                            className="text-stone-800 font-display text-base hover:text-earth-600 transition-colors"
                          >
                            {shortNames[product.id] || product.name}
                          </Link>
                          {product.isVegan && (
                            <span className="block text-xs text-olive-600 mt-1">Vegana</span>
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
                        <td className="px-6 py-3.5 text-stone-600 font-medium">
                          {config.label}
                        </td>
                        {products.map((product) => {
                          const value = product.nutritionalInfo[config.key];
                          const isBest = value === bestValues[config.key];
                          return (
                            <td
                              key={product.id}
                              className={`px-4 py-3.5 text-center ${
                                isBest
                                  ? 'text-earth-700 font-semibold'
                                  : 'text-stone-600'
                              }`}
                            >
                              {value}{config.unit}
                              {isBest && (
                                <span className="ml-1.5 inline-block w-2 h-2 bg-earth-400 rounded-full" aria-label="mejor valor" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-cream-200 bg-cream-50/50">
                <p className="text-xs text-stone-400 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-earth-400 rounded-full" />
                  Mejor valor en esa categoría
                </p>
              </div>
            </div>
          </section>

          {/* Best For Recommendations */}
          <section className="mb-16">
            <h2 className="font-display text-2xl text-stone-800 mb-3 text-center">
              ¿Cuál es la mejor para ti?
            </h2>
            <p className="text-stone-500 text-center mb-8 max-w-xl mx-auto">
              Según tus objetivos nutricionales, te recomendamos:
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-xl p-6 shadow-soft border border-cream-100">
                <div className="w-10 h-10 bg-earth-50 rounded-lg flex items-center justify-center mb-4">
                  <Dumbbell className="w-5 h-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-stone-800 mb-2">Más proteína</h3>
                <p className="text-stone-500 text-sm mb-3">
                  17g/100g — Ideal para deportistas y para mantener masa muscular.
                </p>
                <p className="text-earth-600 font-medium text-sm">
                  Clásica, Chocolate o Vegana
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-cream-100">
                <div className="w-10 h-10 bg-earth-50 rounded-lg flex items-center justify-center mb-4">
                  <Wheat className="w-5 h-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-stone-800 mb-2">Más fibra</h3>
                <p className="text-stone-500 text-sm mb-3">
                  10g/100g — Para mejorar la digestión y la saciedad.
                </p>
                <p className="text-earth-600 font-medium text-sm">
                  Chocolate
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-cream-100">
                <div className="w-10 h-10 bg-earth-50 rounded-lg flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-stone-800 mb-2">Menos azúcar</h3>
                <p className="text-stone-500 text-sm mb-3">
                  8g/100g — Para dietas bajas en azúcar o control glucémico.
                </p>
                <p className="text-earth-600 font-medium text-sm">
                  Clásica, Chocolate o Vegana
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-cream-100">
                <div className="w-10 h-10 bg-earth-50 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-stone-800 mb-2">100% vegana</h3>
                <p className="text-stone-500 text-sm mb-3">
                  Sin miel, endulzada con sirope de agave ecológico.
                </p>
                <p className="text-earth-600 font-medium text-sm">
                  Vegana
                </p>
              </div>
            </div>
          </section>

          {/* Per-serving info */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-cream-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-earth-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Flame className="w-5 h-5 text-earth-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-display text-xl text-stone-800 mb-1">
                    ¿Y por ración?
                  </h2>
                  <p className="text-stone-500">
                    Una ración típica de granola son <strong>40-50g</strong> (unas 3-4 cucharadas soperas).
                    Estos son los valores aproximados por ración de 45g:
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cream-200">
                      <th className="text-left px-4 py-3 text-stone-500 font-medium">
                        Por ración (45g)
                      </th>
                      {products.map((product) => (
                        <th key={product.id} className="px-4 py-3 text-center text-stone-700 font-medium">
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
                        <td className="px-4 py-3 text-stone-600 font-medium">{config.label}</td>
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
            <h2 className="font-display text-2xl text-stone-800 mb-3 text-center">
              Desglose de ingredientes
            </h2>
            <p className="text-stone-500 text-center mb-8 max-w-xl mx-auto">
              Todas comparten una base de avena sin gluten, semillas y frutos secos premium.
              Lo que las diferencia es el toque final.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => {
                const breakdown = ingredientBreakdown[product.id];
                if (!breakdown) return null;
                return (
                  <div key={product.id} className="bg-white rounded-xl p-6 shadow-soft border border-cream-100">
                    <h3 className="font-display text-lg text-stone-800 mb-4">
                      {shortNames[product.id]}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Avena sin gluten</span>
                        <span className="text-stone-700 font-medium">{breakdown.avena}%</span>
                      </div>
                      <div className="w-full bg-cream-100 rounded-full h-2">
                        <div className="bg-earth-300 h-2 rounded-full" style={{ width: `${breakdown.avena}%` }} />
                      </div>

                      <div className="flex justify-between">
                        <span className="text-stone-500">Semillas</span>
                        <span className="text-stone-700 font-medium">{breakdown.semillas}%</span>
                      </div>
                      <div className="w-full bg-cream-100 rounded-full h-2">
                        <div className="bg-olive-300 h-2 rounded-full" style={{ width: `${breakdown.semillas}%` }} />
                      </div>

                      <div className="flex justify-between">
                        <span className="text-stone-500">Frutos secos</span>
                        <span className="text-stone-700 font-medium">{breakdown.frutosSecos}%</span>
                      </div>
                      <div className="w-full bg-cream-100 rounded-full h-2">
                        <div className="bg-earth-200 h-2 rounded-full" style={{ width: `${breakdown.frutosSecos}%` }} />
                      </div>

                      <div className="flex justify-between">
                        <span className="text-stone-500">{breakdown.endulzante}</span>
                        <span className="text-stone-700 font-medium">{breakdown.endulzantePct}%</span>
                      </div>

                      <div className="pt-2 mt-2 border-t border-cream-100">
                        <p className="text-earth-600 font-medium">{breakdown.diferenciador}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What you WON'T find */}
          <section className="mb-16">
            <div className="bg-stone-800 rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#ffffec]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-display text-xl text-[#ffffec] mb-2">
                    Lo que NO encontrarás en ninguna granola Poppy
                  </h2>
                  <p className="text-[#ffffec]/70">
                    Creemos que lo que no lleva un producto es tan importante como lo que lleva.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Azúcares refinados',
                  'Aceite de palma',
                  'Conservantes',
                  'Colorantes artificiales',
                  'Aromas artificiales',
                  'Gluten (< 20 ppm certificado)',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[#ffffec]/90">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-earth rounded-2xl p-8 md:p-10 border border-earth-100">
              <h2 className="font-display text-2xl text-stone-800 mb-3">
                ¿Ya sabes cuál es tu favorita?
              </h2>
              <p className="text-stone-600 mb-6 max-w-lg mx-auto">
                Prueba nuestras granolas y comprueba la diferencia de una granola artesanal,
                ecológica y sin gluten certificada.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/tienda" className="btn-primary">
                  Ver granolas
                </Link>
                <Link
                  href="/blog/avena-sin-gluten-guia-completa-celiacos"
                  className="text-earth-600 font-medium hover:text-earth-700 transition-colors"
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
