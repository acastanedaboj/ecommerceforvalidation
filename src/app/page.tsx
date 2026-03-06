import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Leaf, Star, Check } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getRetailProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { getPackOptions, getSubscriptionInfo } from '@/lib/pricing';
import { SITE_URL, BRAND_NAME, getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Granola sin gluten artesanal con miel`,
  description:
    'Granola crujiente y especiada, elaborada con intención. Ingredientes reales, sin gluten, sin ruido. Envío gratis desde 4 unidades.',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: `${BRAND_NAME} - Crafted for pleasure`,
    description:
      'Granola crujiente y especiada, elaborada con intención. Ingredientes reales. Sin gluten. Sin ruido.',
    url: SITE_URL,
    type: 'website',
  },
};

export default function HomePage() {
  const products = getRetailProducts();
  const packOptions = getPackOptions();
  const subscriptionInfo = getSubscriptionInfo();

  return (
    <>
      {/* Hero Section - Editorial Style */}
      <section className="relative bg-white overflow-hidden">
        <div className="container-custom pt-10 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <span className="inline-block text-xs tracking-widest uppercase text-stone-500 mb-6 animate-fade-in">
                Crafted for pleasure
              </span>

              <h1 className="font-display text-stone-800 mb-8 animate-fade-in-up">
                Granola crujiente
                <br />
                <span className="text-earth-600">y especiada</span>
              </h1>

              <p className="text-base md:text-lg text-stone-600 mb-10 leading-relaxed animate-fade-in-up animation-delay-100">
                Ingredientes reales, proceso cuidado y nada que sobre.
                Si no es buena para mí, no es buena para ti.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-200">
                <Link href="/tienda" className="btn-primary btn-lg group">
                  Comprar ahora
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/suscripcion" className="btn-outline btn-lg">
                  Suscríbete -15%
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start text-xs tracking-wide uppercase text-stone-500 animate-fade-in-up animation-delay-300">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4" strokeWidth={1.5} />
                  Envío gratis +4 bolsas
                </span>
                <span className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" strokeWidth={1.5} />
                  100% natural
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in animation-delay-200">
              {/* Desktop: vertical 4:5 image */}
              <div className="hidden lg:block relative aspect-[4/5] max-w-lg mx-auto">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/home 4-5.png"
                    alt="Granola Poppy crujiente y especiada con ingredientes reales"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                </div>

                {/* Floating badge - Reviews */}
                <div className="absolute -bottom-4 -left-4 bg-white shadow-lg p-4 animate-pulse-soft">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-olive-500 text-olive-500"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-display text-stone-800">4.9/5</p>
                      <p className="text-xs text-stone-500">+500 reseñas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet: horizontal image */}
              <div className="lg:hidden relative aspect-[3/2] max-w-2xl mx-auto">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/home horizntal.png"
                    alt="Granola Poppy crujiente y especiada con ingredientes reales"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>

                {/* Floating badge - Reviews */}
                <div className="absolute -bottom-4 -left-4 bg-white shadow-lg p-4 animate-pulse-soft">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-olive-500 text-olive-500"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-display text-stone-800">4.9/5</p>
                      <p className="text-xs text-stone-500">+500 reseñas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTO - Granola con carácter */}
      <section className="py-14 md:py-20 bg-cream-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-stone-800 mb-6">
              Granola con <span className="text-earth-600-display-italic">carácter</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              Crujiente de verdad, con frutos secos y especias que despiertan el sabor.
              Elaborada en pequeños lotes con avena sin gluten, miel ecológica
              y frutos secos seleccionados.
            </p>
            <p className="text-stone-500 mt-4">
              Pensada para disfrutar a diario, sin pesadez.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/tienda"
              className="text-earth-600 hover:text-earth-700 font-medium inline-flex items-center gap-2 group"
            >
              Ver todos los sabores
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. DIFERENCIAL - Por qué Poppy es diferente */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-stone-800 mb-8 text-center">
              Por qué <span className="italic">Poppy</span> es <span className="text-earth-600-display-italic">diferente</span>
            </h2>
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
              <p>
                <span className="italic">Poppy</span> se elabora lentamente para conseguir un punto de tostado que la hace
                especialmente crujiente, con especias sin gluten que aportan carácter y profundidad de sabor.
              </p>
              <p>
                Además, los frutos secos se remojan antes de hornearse para mejorar su digestión.
              </p>
              <p className="text-stone-800 font-medium">
                Ingredientes simples. Proceso cuidado. El resultado: una granola que sabe bien y sienta bien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INGREDIENTES - Ingredientes reales */}
      <section className="py-14 md:py-20 bg-cream-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-display text-stone-800 mb-6">
              Ingredientes <span className="text-earth-600-display-italic">reales</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              Copos de avena sin gluten, frutos secos premium, semillas, miel ecológica y especias.
              <br />
              <span className="text-stone-800 font-medium">Nada más.</span>
            </p>
            <p className="text-stone-500 mt-4">
              Sin aditivos. Sin ultraprocesados. Solo ingredientes que reconoces y que
              trabajan juntos para crear sabor y textura.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HISTORIA - Cómo empezó Poppy */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-4 text-center">
              Nuestra historia
            </p>
            <h2 className="font-display text-stone-800 mb-8 text-center">
              Cómo empezó <span className="italic">Poppy</span>
            </h2>
            <div className="space-y-5 text-stone-600 text-lg leading-relaxed">
              <p>
                Un día, el médico me dijo &quot;tienes que eliminar el gluten de manera
                estricta y para siempre&quot; y mi vida cambió por completo.
              </p>
              <p>
                Así que hice lo que haría cualquier persona razonable con algo de
                tiempo y un horno en casa: empecé a hacer mi propia granola. Sin
                azúcares refinados, sin aditivos, con los frutos secos remojados
                para facilitar la digestión.
              </p>
              <p className="text-stone-800 font-medium text-xl font-display">
                <span className="italic">Poppy</span> es la granola que tomo cuando quiero granola. Si no es buena para mí, no es buena para ti.
              </p>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/nosotros"
                className="text-earth-600 hover:text-earth-700 font-medium inline-flex items-center gap-2 group"
              >
                Conocer toda la historia
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONVERSIÓN - Packs y precios */}
      <section className="py-14 md:py-20 bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-display text-stone-800 mb-4">
              Cuanto más compras, más <span className="text-earth-600-display-italic">ahorras</span>
            </h2>
            <p className="text-stone-600 max-w-md mx-auto">
              A partir de 4 bolsas, el envío es gratis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 max-w-5xl mx-auto">
            {packOptions.map((pack) => (
              <div
                key={pack.size}
                className={`relative bg-white p-8 transition-all ${
                  pack.size === 4 ? 'bg-cream-50' : ''
                }`}
              >
                {pack.size === 4 && (
                  <span className="absolute top-4 right-4 text-xs tracking-widest uppercase text-earth-600">
                    Popular
                  </span>
                )}
                <h3 className="font-display text-lg text-stone-800 mb-2">
                  {pack.size === 1 ? '1 bolsa' : `Pack ${pack.size} bolsas`}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-display text-earth-600">
                    {formatPrice(pack.unitPriceCents)}
                  </span>
                  <span className="text-stone-500 text-sm">/ud.</span>
                </div>
                {pack.discountPercentage > 0 && (
                  <p className="inline-block text-xs text-stone-800 bg-olive-100 px-2 py-1 rounded mb-4">
                    -{pack.discountPercentage}% por unidad
                  </p>
                )}
                <ul className="space-y-2 text-sm text-stone-600 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-stone-400" strokeWidth={2} />
                    Total: {formatPrice(pack.totalPriceCents)}
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-3 h-3 text-stone-400" strokeWidth={2} />
                    {pack.freeShipping ? (
                      <span className="text-earth-600">Envío gratis</span>
                    ) : (
                      <span>Envío: 4,95€</span>
                    )}
                  </li>
                </ul>
                <Link
                  href="/tienda"
                  className={`block text-center py-3 text-sm font-medium transition-colors ${
                    pack.size === 4
                      ? 'bg-earth-600 text-[#ffffec] hover:bg-earth-700'
                      : 'border border-stone-300 text-stone-800 hover:border-stone-400'
                  }`}
                >
                  Elegir
                </Link>
              </div>
            ))}
          </div>

          {/* Subscription CTA */}
          <div className="mt-14 bg-earth-600 p-10 md:p-14 text-center">
            <p className="text-xs tracking-widest uppercase text-[#ffffec]/60 mb-4">
              Suscripción mensual
            </p>
            <h3 className="font-display text-3xl md:text-4xl text-[#ffffec] mb-4">
              Suscríbete y ahorra un {subscriptionInfo.discountPercentage}%
            </h3>
            <p className="text-[#ffffec]/70 mb-8 max-w-lg mx-auto">
              Recibe 6 bolsas cada mes a solo {formatPrice(subscriptionInfo.unitPriceCents)}/ud.
              Cancela cuando quieras.
            </p>
            <Link
              href="/suscripcion"
              className="inline-flex items-center gap-2 bg-[#ffffec] text-earth-700 px-8 py-4 font-medium hover:bg-cream-100 transition-colors"
            >
              Empezar suscripción
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CIERRE */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <p className="text-stone-500 text-lg leading-relaxed mb-6">
            Pequeños placeres de despensa, hechos a mano.
            <br />
            Ingredientes reales, seleccionados con criterio.
          </p>
          <p className="font-display text-stone-800 text-2xl mb-2">
            <span className="italic">Poppy</span>
          </p>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">
            Crafted for pleasure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda" className="inline-flex items-center justify-center gap-2 bg-earth-600 text-[#ffffec] px-8 py-4 font-medium hover:bg-earth-700 transition-colors">
              Comprar granola
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/nosotros" className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-800 px-8 py-4 font-medium hover:border-stone-400 transition-colors">
              Nuestra historia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
