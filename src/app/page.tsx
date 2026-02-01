import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Leaf, Heart, RefreshCw, Star, Check, Wheat, Droplets, Sparkles, TreeDeciduous } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { getRetailProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { getPackOptions, getSubscriptionInfo } from '@/lib/pricing';
import { SITE_URL, BRAND_NAME, getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Granola Sin Gluten Artesanal con Miel Ecológica`,
  description:
    'Granola artesanal sin gluten elaborada con avena certificada, miel ecológica de apicultores locales y frutos secos premium remojados. Envío gratis desde 4 unidades. Compra online en España.',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: `${BRAND_NAME} - Granola Sin Gluten Artesanal`,
    description:
      'Granola artesanal sin gluten con avena certificada, miel ecológica y frutos secos premium remojados. Opción vegana disponible. Envío gratis +4 unidades.',
    url: SITE_URL,
    type: 'website',
  },
};

export default function HomePage() {
  const products = getRetailProducts();
  const packOptions = getPackOptions();
  const subscriptionInfo = getSubscriptionInfo();

  const testimonials = [
    {
      quote: 'Por fin una granola que puedo comer sin problemas. Soy celíaca y siempre tenía miedo de la contaminación cruzada. Esta es la primera que me sienta bien de verdad.',
      author: 'María L.',
      role: 'Cliente verificada',
      rating: 5,
      verified: true,
    },
    {
      quote: 'El sabor es increíble, se nota que está hecha con ingredientes de calidad. Mis hijos la devoran y me encanta saber que están comiendo algo nutritivo.',
      author: 'Carlos G.',
      role: 'Cliente verificado',
      rating: 5,
      verified: true,
    },
    {
      quote: 'La suscripción es genial. No tengo que preocuparme de hacer pedidos y siempre tengo granola en casa. Además, el ahorro se nota a final de mes.',
      author: 'Ana S.',
      role: 'Suscriptora',
      rating: 5,
      verified: true,
    },
  ];

  return (
    <>
      {/* Hero Section - Editorial Style */}
      <section className="relative bg-white overflow-hidden">
        <div className="container-custom pt-10 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <span className="inline-block text-xs tracking-widest uppercase text-stone-500 mb-6 animate-fade-in">
                Sin gluten certificado
              </span>

              <h1 className="font-display text-stone-800 mb-8 animate-fade-in-up">
                Granola artesanal
                <br />
                <span className="text-earth-600">sin gluten real</span>
              </h1>

              <p className="text-base md:text-lg text-stone-600 mb-10 leading-relaxed animate-fade-in-up animation-delay-100">
                Elaborada a mano con avena sin gluten certificada, miel ecológica
                de apicultores locales y los mejores frutos secos y semillas,
                remojados para facilitar la digestión.
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
                  100% Natural
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative aspect-[4/5] max-w-lg mx-auto">
                {/* Main image - sharp corners */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/products/hero.jpg"
                    alt="Poppy granola con frutos secos y miel"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
                      <p className="font-display font-semibold text-stone-800">4.9/5</p>
                      <p className="text-xs text-stone-500">+500 reseñas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Editorial Style */}
      <section className="py-20 md:py-28 bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">
              Calidad artesanal
            </p>
            <h2 className="font-display text-stone-800 mb-6">
              Por qué nuestra granola es <span className="text-earth-600-display-italic">diferente</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200">
            {/* Benefit 1 */}
            <div className="bg-cream-100 p-10 text-center group hover:bg-white transition-colors">
              <Wheat className="w-8 h-8 text-earth-600 mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-display text-lg text-stone-800 mb-3">
                Ingredientes remojados
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Frutos secos y semillas remojados para mejor digestibilidad.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-cream-100 p-10 text-center group hover:bg-white transition-colors">
              <Droplets className="w-8 h-8 text-olive-600 mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-display text-lg text-stone-800 mb-3">
                Miel ecológica local
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                De apicultores de pueblo. Sin azúcares refinados.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-cream-100 p-10 text-center group hover:bg-white transition-colors">
              <TreeDeciduous className="w-8 h-8 text-taupe-600 mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-display text-lg text-stone-800 mb-3">
                Frutos secos premium
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Pecanas, almendras, avellanas y anacardos de primera.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-cream-100 p-10 text-center group hover:bg-white transition-colors">
              <Sparkles className="w-8 h-8 text-earth-600 mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-display text-lg text-stone-800 mb-3">
                Sin aditivos
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Solo ingredientes que reconocerías en tu cocina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <h2 className="font-display text-stone-800 mb-4">
                Nuestros productos
              </h2>
              <p className="text-stone-800 text-lg">
                Elige tu sabor favorito o pruébalos todos
              </p>
            </div>
            <Link
              href="/tienda"
              className="mt-6 md:mt-0 text-earth-600 hover:text-earth-700 font-medium inline-flex items-center gap-2 group"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
        </div>
      </section>

      {/* Pricing/Packs Section - Editorial Style */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">
              Precios
            </p>
            <h2 className="font-display text-stone-800 mb-4">
              Cuanto más compras, <span className="text-earth-600-display-italic">más ahorras</span>
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
                  {pack.size === 1 ? '1 bolsa' : `Pack ${pack.size}`}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-display text-earth-600">
                    {formatPrice(pack.unitPriceCents)}
                  </span>
                  <span className="text-stone-500 text-sm">/ud.</span>
                </div>
                {pack.discountPercentage > 0 && (
                  <p className="inline-block text-xs text-olive-700 bg-olive-100 px-2 py-0.5 mb-4">
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
          <div className="mt-20 bg-earth-600 p-12 md:p-16 text-center">
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

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">
              Testimonios
            </p>
            <h2 className="font-display text-stone-800">
              Lo que dicen nuestros <span className="text-earth-600-display-italic">clientes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-stone-200">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-cream-100 p-8 md:p-10"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-olive-500 text-olive-500" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-stone-800 text-sm">{testimonial.author}</p>
                  <p className="text-xs text-stone-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="font-display text-stone-800 mb-6">
            ¿Lista para probar la <span className="text-earth-600-display-italic">diferencia</span>?
          </h2>
          <p className="text-stone-600 mb-10">
            Únete a cientos de familias que han descubierto el sabor de la granola
            artesanal de verdad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda" className="inline-flex items-center justify-center gap-2 bg-earth-600 text-[#ffffec] px-8 py-4 font-medium hover:bg-earth-700 transition-colors">
              Comprar ahora
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
