import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Heart, Sun, ArrowRight } from 'lucide-react';
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
      'Seleccionamos cuidadosamente ingredientes de calidad que funcionan bien juntos.',
  },
  {
    icon: Heart,
    title: 'Hecho con amor',
    description:
      'Cada lote se elabora a mano en pequeñas cantidades para garantizar la máxima calidad y frescura.',
  },
  {
    icon: Sun,
    title: 'Elaboración consciente',
    description:
      'Utilizamos técnicas como el remojo de frutos secos y semillas para que digieras todos sus nutrientes.',
  },
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
      {/* Hero Section with Image */}
      <section className="relative h-[50vh] sm:h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/freepik__haz-que-tenga-el-pelo-recogido-en-una-coleta-baja-__23407.png"
          alt="Pilar preparando granola artesanal en su cocina"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white drop-shadow-lg">
            Si no existe,{' '}
            <span className="text-cream-100">la creamos</span>
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-8 text-center">
            De la cocina de casa al <span className="text-earth-600-display-italic">mundo</span>
          </h2>
          <div className="space-y-5 text-stone-600 text-lg leading-relaxed">
            <p>
              Un día, el médico me dijo &quot;tienes que eliminar el gluten de manera
              estricta y para siempre&quot; y mi vida cambió por completo. Dicen que
              ante las limitaciones sacamos todo nuestro potencial, y así fue
              como nació la granola Poppy. Tras un diagnóstico crónico y varias
              patologías digestivas superadas, empecé a crear recetas de manera
              consciente, con ingredientes que tuvieran sentido para mí y que
              respetaran mi organismo.
            </p>
            <p>
              Así que hice lo que haría cualquier persona razonable con algo de
              tiempo y un horno en casa: empecé a hacer mi propia granola. Sin
              azúcares refinados, sin aditivos, con los frutos secos remojados
              para facilitar la digestión. Una granola pensada desde el cariño y
              el sentido común.
            </p>
            <p>
              La compartí con familia y amigos. Y pasó lo que pasa cuando algo
              está realmente bueno: todos querían más.
            </p>
            <p className="text-stone-800 font-medium text-xl font-serif">
              Poppy es la granola que tomo cuando quiero granola. Con ingredientes de
              calidad, un proceso pensado para cuidar la digestión y sin nada que
              sobre. Si no es buena para mí, no es buena para ti.
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


      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-earth-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-4">
            ¿Quieres probar la <span className="text-earth-600-display-italic">diferencia</span>?
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
