import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Heart, Sun, Users, Award, Truck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nosotros | Nalu',
  description:
    'Conoce nuestra historia. Elaboramos granola con ingredientes ecologicos y mucho amor. Sin gluten, sin azucares refinados, 100% natural.',
};

const values = [
  {
    icon: Leaf,
    title: 'Ingredientes ecologicos',
    description:
      'Seleccionamos cuidadosamente cada ingrediente de productores locales certificados en agricultura ecologica.',
  },
  {
    icon: Heart,
    title: 'Hecho con amor',
    description:
      'Cada lote se elabora a mano en pequeñas cantidades para garantizar la maxima calidad y frescura.',
  },
  {
    icon: Sun,
    title: 'Tostado artesanal',
    description:
      'Utilizamos tecnicas tradicionales de tostado lento a baja temperatura para preservar todos los nutrientes.',
  },
];

const stats = [
  { number: '2019', label: 'Año de fundacion' },
  { number: '15K+', label: 'Clientes felices' },
  { number: '100%', label: 'Ingredientes naturales' },
  { number: '0', label: 'Azucares refinados' },
];

const team = [
  {
    name: 'Maria Garcia',
    role: 'Fundadora & Chef',
    description: 'Apasionada por la alimentacion saludable desde hace mas de 15 años.',
  },
  {
    name: 'Carlos Ruiz',
    role: 'Produccion',
    description: 'Experto en tecnicas de tostado artesanal y control de calidad.',
  },
  {
    name: 'Ana Martinez',
    role: 'Atencion al cliente',
    description: 'Siempre dispuesta a ayudarte con cualquier consulta.',
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-earth-100 to-cream-50 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-olive-100 text-olive-700 rounded-full text-sm font-medium mb-6">
            Nuestra historia
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-800 mb-6">
            Granola hecha con{' '}
            <span className="text-earth-600">pasion</span> y{' '}
            <span className="text-olive-600">naturaleza</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto">
            Nacimos de un sueño simple: crear la granola perfecta. Sin ingredientes
            artificiales, sin prisas, sin compromisos. Solo lo mejor de la naturaleza
            en cada bocado.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-6">
                Todo empezo en una pequeña cocina
              </h2>
              <div className="space-y-4 text-stone-600">
                <p>
                  En 2019, cansados de las opciones procesadas del supermercado,
                  decidimos crear nuestra propia granola. Lo que empezo como un
                  experimento casero pronto se convirtio en una obsesion por la
                  perfeccion.
                </p>
                <p>
                  Probamos cientos de combinaciones hasta encontrar el equilibrio
                  perfecto: crujiente pero no dura, dulce pero sin azucares refinados,
                  nutritiva pero irresistiblemente deliciosa.
                </p>
                <p>
                  Hoy, seguimos elaborando cada lote con el mismo cuidado y atencion
                  que el primer dia. Porque creemos que lo artesanal no es solo un
                  metodo de produccion, es una filosofia de vida.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-earth-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-earth-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Leaf className="w-12 h-12 text-earth-600" strokeWidth={1} />
                    </div>
                    <p className="text-earth-700 font-serif text-xl">
                      Desde 2019
                    </p>
                    <p className="text-earth-600 text-sm mt-1">
                      Elaborando con amor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-4">
              Nuestros valores
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Cada decision que tomamos esta guiada por tres principios fundamentales
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
                <p className="text-4xl sm:text-5xl font-serif text-white mb-2">
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
              De la seleccion de ingredientes a tu mesa, cada paso importa
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Seleccion',
                description: 'Elegimos ingredientes ecologicos de productores locales de confianza',
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
                title: 'Envio',
                description: 'Empaquetamos con cariño y enviamos directamente a tu puerta',
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

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-cream-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 mb-4">
              El equipo
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Personas apasionadas que hacen posible que disfrutes de la mejor granola
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-soft"
              >
                <div className="w-20 h-20 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-earth-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-serif text-stone-800">{member.name}</h3>
                <p className="text-earth-600 text-sm mb-3">{member.role}</p>
                <p className="text-stone-600 text-sm">{member.description}</p>
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
                Nuestros compromisos
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Leaf,
                  title: 'Sin gluten',
                  description: 'Apta para celiacos, elaborada en instalaciones libres de gluten',
                },
                {
                  icon: Heart,
                  title: 'Sin azucares refinados',
                  description: 'Endulzada naturalmente con sirope de arce ecologico',
                },
                {
                  icon: Award,
                  title: 'Certificacion ecologica',
                  description: 'Todos nuestros ingredientes tienen certificacion eco',
                },
                {
                  icon: Truck,
                  title: 'Envio sostenible',
                  description: 'Packaging 100% reciclable y envios con huella de carbono compensada',
                },
                {
                  icon: Users,
                  title: 'Comercio justo',
                  description: 'Trabajamos directamente con productores locales',
                },
                {
                  icon: Sun,
                  title: 'Energia renovable',
                  description: 'Nuestro obrador funciona con energia 100% solar',
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
            ¿Listo para probar la diferencia?
          </h2>
          <p className="text-stone-600 mb-8">
            Descubre por que miles de personas han elegido Nalu
            para empezar el dia con energia y sabor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 bg-earth-600 text-white px-8 py-4 rounded-full hover:bg-earth-700 transition-colors font-medium"
            >
              <span>Ver productos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-white text-earth-700 px-8 py-4 rounded-full hover:bg-cream-100 transition-colors font-medium border border-earth-200"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
