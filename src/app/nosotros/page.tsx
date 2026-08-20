import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Heart, Sun, Users, Award, Truck, ArrowRight } from 'lucide-react';
import { SITE_URL, getCanonicalUrl, buildBreadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Nuestra Historia | Granola Artesanal Sin Gluten',
  description:
    'Conoce la historia de Poppy. Desde 2019 elaboramos granola artesanal sin gluten con ingredientes ecológicos y miel local. 100% natural, hecha con amor.',
  alternates: {
    canonical: getCanonicalUrl('/nosotros'),
  },
  openGraph: {
    title: 'Nuestra Historia | Poppy',
    description:
      'Granola artesanal sin gluten elaborada con pasión. Ingredientes ecológicos, tostado lento, hecha a mano.',
    url: `${SITE_URL}/nosotros`,
  },
};

const values = [
  {
    icon: Leaf,
    title: 'Ingredientes ecológicos',
    description:
      'Seleccionamos cuidadosamente cada ingrediente de productores locales certificados en agricultura ecológica.',
  },
  {
    icon: Heart,
    title: 'Hecho con amor',
    description:
      'Cada lote se elabora a mano en pequeñas cantidades para garantizar la máxima calidad y frescura.',
  },
  {
    icon: Sun,
    title: 'Tostado artesanal',
    description:
      'Utilizamos técnicas tradicionales de tostado lento a baja temperatura para preservar todos los nutrientes.',
  },
];

const stats = [
  { number: '2019', label: 'Año de fundación' },
  { number: '15K+', label: 'Clientes felices' },
  { number: '100%', label: 'Ingredientes naturales' },
  { number: '0', label: 'Azúcares refinados' },
];

export default function NosotrosPage() {
  return (
    <>
      {/* JSON-LD: Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Nosotros', url: '/nosotros' },
        ])}
      />

      <div className="min-h-screen bg-cream-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-earth-100 to-cream-50 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <span className="mb-6 inline-block rounded-full bg-olive-100 px-4 py-1.5 text-sm font-medium text-olive-700">
              Nuestra historia
            </span>
            <h1 className="mb-6 font-serif text-4xl text-stone-800 sm:text-5xl lg:text-6xl">
              Granola hecha con <span className="text-earth-600">pasion</span> y{' '}
              <span className="text-olive-600">naturaleza</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-stone-600 sm:text-xl">
              Nacimos de un sueño simple: crear la granola perfecta. Sin ingredientes artificiales,
              sin prisas, sin compromisos. Solo lo mejor de la naturaleza en cada bocado.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <h2 className="mb-6 font-serif text-3xl text-stone-800 sm:text-4xl">
                  Todo empezó en una pequeña{' '}
                  <span className="text-earth-600-display-italic">cocina</span>
                </h2>
                <div className="space-y-4 text-stone-600">
                  <p>
                    En 2019, cansados de las opciones procesadas del supermercado, decidimos crear
                    nuestra propia granola. Lo que empezó como un experimento casero pronto se
                    convirtió en una obsesión por la perfección.
                  </p>
                  <p>
                    Probamos cientos de combinaciones hasta encontrar el equilibrio perfecto:
                    crujiente pero no dura, dulce pero sin azúcares refinados, nutritiva pero
                    irresistiblemente deliciosa.
                  </p>
                  <p>
                    Hoy, seguimos elaborando cada lote con el mismo cuidado y atención que el primer
                    día. Porque creemos que lo artesanal no es solo un método de producción, es una
                    filosofía de vida.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-earth-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-8 text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-earth-200">
                        <Leaf className="h-12 w-12 text-earth-600" strokeWidth={1} />
                      </div>
                      <p className="font-serif text-xl text-earth-700">Desde 2019</p>
                      <p className="mt-1 text-sm text-earth-600">Elaborando con amor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-stone-800 sm:text-4xl">
                Nuestros <span className="text-earth-600-display-italic">valores</span>
              </h2>
              <p className="mx-auto max-w-2xl text-stone-600">
                Cada decisión que tomamos está guiada por tres principios fundamentales
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-cream-50 p-8 text-center transition-shadow hover:shadow-soft"
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-earth-100">
                      <Icon className="h-8 w-8 text-earth-600" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-3 font-serif text-xl text-stone-800">{value.title}</h3>
                    <p className="text-stone-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-br from-earth-600 to-earth-700 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="mb-2 font-serif text-4xl text-[#ffffec] sm:text-5xl">
                    {stat.number}
                  </p>
                  <p className="text-earth-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-stone-800 sm:text-4xl">
                Nuestro proceso
              </h2>
              <p className="mx-auto max-w-2xl text-stone-600">
                De la selección de ingredientes a tu mesa, cada paso importa
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: '01',
                  title: 'Selección',
                  description:
                    'Elegimos ingredientes ecológicos de productores locales de confianza',
                },
                {
                  step: '02',
                  title: 'Mezcla',
                  description: 'Combinamos los ingredientes siguiendo nuestra receta tradicional',
                },
                {
                  step: '03',
                  title: 'Tostado',
                  description: 'Horneamos a baja temperatura para conseguir el crujiente perfecto',
                },
                {
                  step: '04',
                  title: 'Envío',
                  description: 'Empaquetamos con cariño y enviamos directamente a tu puerta',
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="h-full rounded-2xl bg-white p-6 shadow-soft">
                    <span className="font-serif text-5xl text-earth-200">{item.step}</span>
                    <h3 className="mb-2 mt-2 font-serif text-lg text-stone-800">{item.title}</h3>
                    <p className="text-sm text-stone-600">{item.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 transform text-earth-300 lg:block">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitments Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-3xl bg-white p-8 shadow-soft-lg sm:p-12">
              <div className="mb-10 text-center">
                <h2 className="mb-4 font-serif text-3xl text-stone-800 sm:text-4xl">
                  Nuestros <span className="text-earth-600-display-italic">compromisos</span>
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Leaf,
                    title: 'Sin gluten',
                    description: 'Apta para celíacos, elaborada en instalaciones libres de gluten',
                  },
                  {
                    icon: Heart,
                    title: 'Sin azúcares refinados',
                    description: 'Endulzada naturalmente con sirope de arce ecológico',
                  },
                  {
                    icon: Award,
                    title: 'Certificación ecológica',
                    description: 'Todos nuestros ingredientes tienen certificación eco',
                  },
                  {
                    icon: Truck,
                    title: 'Envío sostenible',
                    description:
                      'Packaging 100% reciclable y envíos con huella de carbono compensada',
                  },
                  {
                    icon: Users,
                    title: 'Comercio justo',
                    description: 'Trabajamos directamente con productores locales',
                  },
                  {
                    icon: Sun,
                    title: 'Energía renovable',
                    description: 'Nuestro obrador funciona con energía 100% solar',
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-olive-100">
                        <Icon className="h-5 w-5 text-olive-600" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="mb-1 font-medium text-stone-800">{item.title}</h3>
                        <p className="text-sm text-stone-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-earth-50 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-4 font-serif text-3xl text-stone-800 sm:text-4xl">
              ¿Listo para probar la{' '}
              <span className="text-earth-600-display-italic">diferencia</span>?
            </h2>
            <p className="mb-8 text-stone-600">
              Descubre por qué miles de personas han elegido Poppy para empezar el día con energía y
              sabor.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-earth-600 px-8 py-4 font-medium text-[#ffffec] transition-colors hover:bg-earth-700"
              >
                <span>Ver productos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-earth-200 bg-white px-8 py-4 font-medium text-earth-700 transition-colors hover:bg-cream-100"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
