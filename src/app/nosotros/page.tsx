import { Metadata } from 'next';
import Link from 'next/link';
import { Leaf, Heart, Sun, Users, Award, Truck, ArrowRight } from 'lucide-react';
import { SITE_URL, getCanonicalUrl, buildBreadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Nuestra Historia | Granola Artesanal Sin Gluten',
  description:
    'Conoce la historia de Poppy. Elaboramos granola artesanal sin gluten con ingredientes naturales, remojo de frutos secos y miel local. La granola que Pilar tomaría.',
  alternates: {
    canonical: getCanonicalUrl('/nosotros'),
  },
  openGraph: {
    title: 'Nuestra Historia | Poppy',
    description:
      'Granola artesanal sin gluten nacida de una necesidad real. Ingredientes naturales, proceso de remojo, tostado lento.',
    url: `${SITE_URL}/nosotros`,
  },
};

const values = [
  {
    icon: Leaf,
    title: 'Ingredientes naturales',
    description:
      'Seleccionamos cuidadosamente cada ingrediente de productores locales de confianza.',
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
  { number: '100%', label: 'Sin gluten certificado' },
  { number: '100%', label: 'Ingredientes naturales' },
  { number: '0', label: 'Azúcares refinados' },
  { number: '0', label: 'Aditivos artificiales' },
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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-olive-100 text-olive-700 text-sm font-medium mb-6">
            Nuestra historia
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-800 mb-6">
            Nacida de una{' '}
            <span className="text-earth-600">necesidad</span>,{' '}
            hecha con <span className="text-olive-600">cuidado</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto">
            Poppy nació porque Pilar no encontraba una granola que cumpliera con lo que
            su cuerpo necesitaba. Así que decidió hacerla ella misma.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-8 text-center">
            Todo empezó con un <span className="text-earth-600-display-italic">diagnóstico</span>
          </h2>
          <div className="space-y-5 text-stone-600 text-lg leading-relaxed">
            <p>
              Cuando a Pilar le diagnosticaron Sensibilidad al Gluten No Celíaca,
              su relación con la alimentación cambió por completo. Empezó una dieta
              estricta sin gluten y, poco a poco, fue adentrándose en el mundo de la
              nutrición consciente, buscando entender qué le sentaba bien y por qué.
            </p>
            <p>
              Tras distintos problemas digestivos, descubrió que no bastaba con
              eliminar el gluten: la calidad de los ingredientes, el proceso de
              elaboración y lo que <em>no</em> lleva un alimento importan tanto como
              lo que sí lleva.
            </p>
            <p>
              Así empezó a hacer granola en casa. Para ella. Para controlar cada
              ingrediente, cada paso del proceso, y evitar todo lo que pudiera dañar
              su salud. Una granola sin azúcares refinados, sin aditivos, con frutos
              secos remojados para facilitar la digestión.
            </p>
            <p>
              La compartió con familia y amigos. Y lo que era un ritual personal se
              convirtió en algo que todos querían repetir.
            </p>
            <p className="text-stone-800 font-medium text-xl font-serif">
              Poppy es la granola que Pilar tomaría &mdash;y toma&mdash; cada día:
              con ingredientes de calidad, un proceso pensado para optimizar la
              digestión y sin nada que sobre.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-4">
              Nuestros <span className="text-earth-600-display-italic">valores</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Cada decisión que tomamos está guiada por tres principios fundamentales
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-cream-50 rounded-2xl p-8 text-center hover:shadow-soft transition-shadow"
                >
                  <div className="w-16 h-16 bg-earth-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-earth-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif text-stone-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-stone-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-earth-600 to-earth-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl sm:text-5xl font-serif text-[#ffffec] mb-2">
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
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-4">
              Nuestro proceso
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Cada paso está pensado para que tu cuerpo aproveche al máximo cada ingrediente
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Selección',
                description: 'Elegimos ingredientes naturales y de calidad: copos de avena sin gluten, frutos secos, semillas y miel ecológica',
              },
              {
                step: '02',
                title: 'Remojo',
                description: 'Los frutos secos y semillas se remojan durante horas para reducir fitatos y facilitar la digestión y absorción de nutrientes',
              },
              {
                step: '03',
                title: 'Mezcla',
                description: 'Combinamos los ingredientes a mano siguiendo nuestra receta, con aceite de coco virgen extra y especias naturales',
              },
              {
                step: '04',
                title: 'Tostado lento',
                description: 'Horneamos a baja temperatura para conseguir el crujiente perfecto preservando todos los nutrientes',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-soft h-full">
                  <span className="text-5xl font-serif text-earth-200">{item.step}</span>
                  <h3 className="text-lg font-serif text-stone-800 mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-earth-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Commitments Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-4">
                Nuestros <span className="text-earth-600-display-italic">compromisos</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Leaf,
                  title: 'Sin gluten',
                  description: 'Apta para celíacos, elaborada en instalaciones libres de gluten',
                },
                {
                  icon: Heart,
                  title: 'Sin azúcares refinados',
                  description: 'Endulzada naturalmente con miel o dátiles',
                },
                {
                  icon: Award,
                  title: 'Calidad artesanal',
                  description: 'Tostamos cada semana bajo demanda en lotes pequeños',
                },
                {
                  icon: Truck,
                  title: 'Envío sostenible',
                  description: 'Packaging 100% reciclable y envíos con huella de carbono compensada',
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
                    <div className="w-10 h-10 bg-olive-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-olive-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-800 mb-1">{item.title}</h3>
                      <p className="text-stone-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-earth-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-4">
            ¿Listo para probar la <span className="text-earth-600-display-italic">diferencia</span>?
          </h2>
          <p className="text-stone-600 mb-8">
            Descubre por qué miles de personas han elegido Poppy
            para empezar el día con energía y sabor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 bg-earth-600 text-[#ffffec] px-8 py-4 rounded-full hover:bg-earth-700 transition-colors font-medium"
            >
              <span>Ver productos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-white text-earth-700 px-8 py-4 rounded-full hover:bg-cream-100 transition-colors font-medium border border-earth-200"
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
