import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Heart, Sun, ArrowRight } from 'lucide-react';
import { SITE_URL, getCanonicalUrl, buildBreadcrumbSchema, buildLocalBusinessSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Nuestra historia | Granola artesanal sin gluten',
  description:
    'Conoce la historia de Poppy. Elaboramos granola artesanal sin gluten con ingredientes naturales, remojo de frutos secos y miel local. La granola que Pilar tomaría.',
  alternates: {
    canonical: getCanonicalUrl('/nosotros'),
  },
  openGraph: {
    title: 'Nuestra historia | Poppy',
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
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Nosotros', url: '/nosotros' },
        ])}
      />
      <JsonLd data={buildLocalBusinessSchema()} />

      {/* Hero Section with Image */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ height: '70vh', minHeight: '400px' }}>
        <Image
          src="/images/freepik__haz-que-tenga-el-pelo-recogido-en-una-coleta-baja-__23407.png"
          alt="Pilar preparando granola artesanal en su cocina"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,.45))' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--white)',
              fontSize: 'clamp(36px, 6vw, 64px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            Si no existe,{' '}
            <em>la creamos</em>
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '96px 0' }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-center mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            De la cocina de casa al <em>mundo</em>
          </h2>
          <div className="space-y-5" style={{ fontSize: '14px', color: 'rgba(17,17,17,.6)', fontWeight: 300, lineHeight: 1.85 }}>
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
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--dark)', fontWeight: 400, lineHeight: 1.4 }}>
              Poppy es la granola que tomo cuando quiero granola. Con ingredientes de
              calidad, un proceso pensado para cuidar la digestión y sin nada que
              sobre. Si no es buena para mí, no es buena para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Divider Image */}
      <section className="w-full">
        <div className="relative w-full" style={{ height: 'clamp(300px, 40vw, 500px)' }}>
          <Image
            src="/images/nosotros-divider.png"
            alt="Preparando granola artesanal en la cocina"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '96px 0', background: 'var(--white)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Nuestros <em>valores</em>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, maxWidth: '480px', margin: '0 auto' }}>
              Cada decisión que tomamos está guiada por tres principios fundamentales
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-8 text-center transition-shadow hover:shadow-soft"
                  style={{ background: 'var(--off)' }}
                >
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--white)' }}>
                    <Icon className="w-8 h-8" style={{ color: 'var(--brown)' }} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '12px' }}>
                    {value.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.7 }}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ padding: '96px 0', background: 'var(--off)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Nuestro proceso
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, maxWidth: '480px', margin: '0 auto' }}>
              Cada paso está pensado para que tu cuerpo aproveche al máximo cada ingrediente
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Selección', description: 'Elegimos ingredientes naturales y de calidad: copos de avena integral sin gluten, frutos secos, semillas y miel' },
              { step: '02', title: 'Remojo', description: 'Los frutos secos y semillas se remojan durante horas para reducir fitatos y facilitar la digestión y absorción de nutrientes' },
              { step: '03', title: 'Mezcla', description: 'Combinamos los ingredientes a mano siguiendo nuestra receta, con aceite de coco y especias naturales' },
              { step: '04', title: 'Tostado lento', description: 'Horneamos a baja temperatura para conseguir el crujiente perfecto preservando todos los nutrientes' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="p-6 h-full" style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'rgba(105,79,72,.15)' }}>{item.step}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '8px', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2" style={{ color: 'rgba(105,79,72,.2)' }}>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '96px 0' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
            ¿Quieres probar la <em>diferencia</em>?
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, marginBottom: '32px', lineHeight: 1.85 }}>
            Descubre por qué miles de personas han elegido Poppy
            para empezar el día con energía y sabor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda" className="btn-pill" style={{ padding: '14px 32px' }}>
              Ver productos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/contacto" className="btn-pill" style={{ padding: '14px 32px', borderColor: 'rgba(0,0,0,.15)' }}>
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
