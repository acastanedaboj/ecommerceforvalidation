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
    'Granola artesanal sin gluten elaborada con avena remojada, miel ecológica de apicultores locales y frutos secos premium. Envío gratis desde 4 unidades. Compra online en España.',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: `${BRAND_NAME} - Granola Sin Gluten Artesanal`,
    description:
      'Granola artesanal sin gluten con avena remojada, miel ecológica y frutos secos premium. Opción vegana disponible. Envío gratis +4 unidades.',
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
      {/* Hero Section - Modern & Clean */}
      <section className="relative bg-white overflow-hidden">
        <div className="container-custom py-24 md:py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <span className="inline-block px-4 py-2 bg-cream-200 text-cream-800 rounded-full text-sm font-medium mb-8 animate-fade-in">
                Sin gluten certificado
              </span>

              <h1 className="font-display text-stone-800 mb-10 animate-fade-in-up">
                Granola artesanal
                <br />
                <span className="text-earth-600">sin gluten real</span>
              </h1>

              <p className="text-lg md:text-xl text-stone-800 mb-12 leading-relaxed animate-fade-in-up animation-delay-100">
                Elaborada a mano con avena sin gluten certificada, miel ecológica
                de apicultores locales y los mejores frutos secos.
                Remojada para facilitar la digestión.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-200">
                <Link href="/tienda" className="btn-primary btn-lg group hover:scale-[1.02] transition-transform">
                  Comprar ahora
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/suscripcion" className="btn-outline btn-lg hover:scale-[1.02] transition-transform">
                  Suscríbete -15%
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-10 mt-16 justify-center lg:justify-start text-sm text-stone-800 animate-fade-in-up animation-delay-300">
                <span className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-earth-600" strokeWidth={1.5} />
                  Envío gratis +4 bolsas
                </span>
                <span className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-cream-600" strokeWidth={1.5} />
                  100% Natural
                </span>
                <span className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-taupe-500" strokeWidth={1.5} />
                  Hecho con amor
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative aspect-[4/5] max-w-lg mx-auto">
                {/* Main image */}
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-soft-xl">
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
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-card-hover p-5 animate-pulse-soft border border-stone-100">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-olive-500 text-olive-500"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-stone-800 text-lg">4.9/5</p>
                      <p className="text-xs text-stone-500">+500 reseñas</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cream-400/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-olive-300/30 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Subtle wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-cream-100" style={{
          clipPath: 'ellipse(70% 100% at 50% 100%)'
        }} />
      </section>

      {/* Benefits Section - Modern & Clean */}
      <section className="section bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="font-display text-stone-800 mb-6">
              Por qué nuestra granola es diferente
            </h2>
            <p className="text-lg text-stone-800 max-w-2xl mx-auto">
              No es solo granola. Es el resultado de años perfeccionando
              una receta artesanal con ingredientes de verdad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-cream-200 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-cream-300 transition-colors">
                <Wheat className="w-8 h-8 text-earth-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-medium text-stone-800 mb-4">
                Avena remojada
              </h3>
              <p className="text-stone-800 text-sm leading-relaxed">
                Remojamos la avena para reducir el ácido fítico y mejorar
                la digestibilidad. Tu intestino te lo agradecerá.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-olive-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-olive-200 transition-colors">
                <Droplets className="w-8 h-8 text-olive-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-medium text-stone-800 mb-4">
                Miel ecológica local
              </h3>
              <p className="text-stone-800 text-sm leading-relaxed">
                Endulzada únicamente con miel de apicultores de pueblo.
                Sin azúcares refinados, sin edulcorantes artificiales.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-taupe-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-taupe-200 transition-colors">
                <TreeDeciduous className="w-8 h-8 text-taupe-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-medium text-stone-800 mb-4">
                Frutos secos premium
              </h3>
              <p className="text-stone-800 text-sm leading-relaxed">
                Pecanas, almendras, avellanas y anacardos de primera calidad.
                Nada de rellenos baratos ni saborizantes.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-earth-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-earth-200 transition-colors">
                <Sparkles className="w-8 h-8 text-earth-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-medium text-stone-800 mb-4">
                Sin aditivos
              </h3>
              <p className="text-stone-800 text-sm leading-relaxed">
                Sin conservantes, sin colorantes, sin potenciadores del sabor.
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

      {/* Pricing/Packs Section - Modern Pricing Table */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-stone-800 mb-6">
              Cuanto más compras, más ahorras
            </h2>
            <p className="text-lg text-stone-800 max-w-2xl mx-auto">
              Elige el pack que mejor se adapte a tu consumo.
              A partir de 4 bolsas, el envío es gratis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {packOptions.map((pack, index) => (
              <div
                key={pack.size}
                className={`relative bg-white rounded-2xl p-7 transition-all duration-400 animate-fade-in-up ${
                  pack.size === 4
                    ? 'ring-2 ring-earth-600 shadow-card-hover scale-[1.02] z-10'
                    : 'shadow-soft hover:shadow-soft-lg hover:-translate-y-1 border border-stone-100'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {pack.size === 4 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-earth-600 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                    Más popular
                  </span>
                )}
                <h3 className="font-display text-xl font-medium text-stone-800 mb-3 mt-2">
                  {pack.size === 1 ? '1 bolsa' : `Pack ${pack.size}`}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-display font-semibold text-earth-600">
                    {formatPrice(pack.unitPriceCents)}
                  </span>
                  <span className="text-stone-500">/ud.</span>
                </div>
                {pack.discountPercentage > 0 && (
                  <p className="text-sm text-olive-600 font-medium mb-4">
                    Ahorras {pack.discountPercentage}% por unidad
                  </p>
                )}
                <ul className="space-y-3 text-sm text-stone-800 mb-6">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cream-600 flex-shrink-0" strokeWidth={2.5} />
                    Total: {formatPrice(pack.totalPriceCents)}
                  </li>
                  <li className="flex items-center gap-3">
                    {pack.freeShipping ? (
                      <>
                        <Truck className="w-4 h-4 text-earth-600 flex-shrink-0" strokeWidth={2} />
                        <span className="text-earth-600 font-medium">Envío gratis</span>
                      </>
                    ) : (
                      <>
                        <Truck className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={2} />
                        <span>Envío: 4,95 EUR</span>
                      </>
                    )}
                  </li>
                </ul>
                <Link
                  href="/tienda"
                  className={`btn w-full justify-center text-sm ${
                    pack.size === 4 ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  Elegir pack
                </Link>
              </div>
            ))}
          </div>

          {/* Subscription CTA */}
          <div className="mt-16 bg-earth-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-earth-700/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cream-500/20 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-6">
                <RefreshCw className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-medium">
                  Suscripción mensual
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-medium text-white mb-5">
                Suscríbete y ahorra un {subscriptionInfo.discountPercentage}%
              </h3>
              <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg">
                Recibe 6 bolsas cada mes a solo {formatPrice(subscriptionInfo.unitPriceCents)}/ud.
                Cancela cuando quieras, sin compromisos.
              </p>
              <Link
                href="/suscripcion"
                className="btn bg-white text-earth-700 hover:bg-cream-100 hover:scale-[1.02] btn-lg group transition-all"
              >
                Empezar suscripción
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-stone-800 mb-5">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-stone-800 text-lg">
              Más de 500 familias ya disfrutan de nuestra granola cada día
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-stone-800 mb-6">
            ¿Listo para probar la diferencia?
          </h2>
          <p className="text-stone-800 mb-12 max-w-xl mx-auto text-lg">
            Únete a cientos de familias que han descubierto el sabor de la granola
            artesanal de verdad. Envío gratis a partir de 4 bolsas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda" className="btn-primary btn-lg group hover:scale-[1.02] transition-transform">
              Comprar ahora
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/nosotros" className="btn-ghost btn-lg hover:scale-[1.02] transition-transform">
              Conocer nuestra historia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
