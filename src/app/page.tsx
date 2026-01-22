import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Leaf, Heart, RefreshCw, Star, Check } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getRetailProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { getPackOptions, getSubscriptionInfo } from '@/lib/pricing';

export default function HomePage() {
  const products = getRetailProducts();
  const packOptions = getPackOptions();
  const subscriptionInfo = getSubscriptionInfo();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient overflow-hidden">
        <div className="container-custom py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block badge-accent mb-4">
                Sin gluten certificado
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
                Granola artesanal 250g —{' '}
                <span className="text-primary-600">sin gluten real</span> y orgánica
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Elaborada a mano con avena certificada, miel ecológica de apicultores locales
                y los mejores frutos secos. Remojada para facilitar la digestión.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/tienda" className="btn-primary btn-lg">
                  Comprar ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/suscripcion" className="btn-outline btn-lg">
                  Suscríbete y ahorra 15%
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start text-sm text-neutral-600">
                <span className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary-600" />
                  Envío gratis +4 bolsas
                </span>
                <span className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-accent-600" />
                  100% Natural
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Hecho con amor
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <Image
                  src="/images/hero-granola.jpg"
                  alt="Granola artesanal con frutos secos y miel"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-lg">⭐</div>
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-lg">⭐</div>
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-lg">⭐</div>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">4.9/5</p>
                      <p className="text-xs text-neutral-500">+500 reseñas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L60 45.8C120 41.7 240 33.3 360 33.3C480 33.3 600 41.7 720 50C840 58.3 960 66.7 1080 62.5C1200 58.3 1320 41.7 1380 33.3L1440 25V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="#fafaf9"/>
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              ¿Por qué nuestra granola es diferente?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              No es solo granola. Es el resultado de años perfeccionando una receta artesanal
              con ingredientes de verdad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌾</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Avena remojada</h3>
              <p className="text-sm text-neutral-600">
                Remojamos la avena para reducir el ácido fítico y mejorar la digestibilidad.
                Tu intestino te lo agradecerá.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🍯</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Miel ecológica local</h3>
              <p className="text-sm text-neutral-600">
                Endulzada únicamente con miel de apicultores de pueblo. Sin azúcares refinados,
                sin edulcorantes artificiales.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🥜</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Frutos secos premium</h3>
              <p className="text-sm text-neutral-600">
                Pecanas, almendras, avellanas y anacardos de primera calidad.
                Nada de rellenos baratos ni saborizantes.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Sin aditivos</h3>
              <p className="text-sm text-neutral-600">
                Sin conservantes, sin colorantes, sin potenciadores del sabor.
                Solo ingredientes que reconocerías en tu cocina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-2">
                Nuestros productos
              </h2>
              <p className="text-neutral-600">
                Elige tu sabor favorito o pruébalos todos
              </p>
            </div>
            <Link
              href="/tienda"
              className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/Packs Section */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Cuanto más compras, más ahorras
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Elige el pack que mejor se adapte a tu consumo. A partir de 4 bolsas, ¡el envío es gratis!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {packOptions.map((pack) => (
              <div
                key={pack.size}
                className={`bg-white rounded-2xl p-6 border-2 transition-all ${
                  pack.size === 4
                    ? 'border-primary-500 shadow-lg scale-105'
                    : 'border-transparent shadow-sm hover:border-primary-200'
                }`}
              >
                {pack.size === 4 && (
                  <span className="badge-primary mb-3 block w-fit">Más popular</span>
                )}
                <h3 className="text-xl font-bold text-neutral-900 mb-1">{pack.label}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(pack.unitPriceCents)}
                  </span>
                  <span className="text-neutral-500">/ud.</span>
                </div>
                {pack.discountPercentage > 0 && (
                  <p className="text-sm text-accent-600 font-medium mb-2">
                    Ahorras {pack.discountPercentage}% por unidad
                  </p>
                )}
                <ul className="space-y-2 text-sm text-neutral-600 mb-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-600" />
                    Total: {formatPrice(pack.totalPriceCents)}
                  </li>
                  {pack.freeShipping && (
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-600" />
                      Envío gratis
                    </li>
                  )}
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
          <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <RefreshCw className="w-6 h-6" />
              <span className="badge bg-white/20 text-white">Suscripción mensual</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Suscríbete y ahorra un {subscriptionInfo.discountPercentage}%
            </h3>
            <p className="text-primary-100 mb-6 max-w-xl mx-auto">
              Recibe 6 bolsas cada mes a solo {formatPrice(subscriptionInfo.unitPriceCents)}/ud.
              Cancela cuando quieras, sin compromisos.
            </p>
            <Link href="/suscripcion" className="btn bg-white text-primary-700 hover:bg-primary-50">
              Empezar suscripción
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-neutral-600">
              Más de 500 familias ya disfrutan de nuestra granola cada día
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-neutral-700 mb-4">
                "Por fin una granola que puedo comer sin problemas. Soy celíaca y siempre
                tenía miedo de la contaminación cruzada. Esta es la primera que me sienta bien de verdad."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-semibold text-primary-700">
                  ML
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">María L.</p>
                  <p className="text-sm text-neutral-500">Cliente verificada</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-neutral-700 mb-4">
                "El sabor es increíble, se nota que está hecha con ingredientes de calidad.
                Mis hijos la devoran y me encanta saber que están comiendo algo nutritivo."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-semibold text-primary-700">
                  CG
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Carlos G.</p>
                  <p className="text-sm text-neutral-500">Cliente verificado</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-neutral-700 mb-4">
                "La suscripción es genial. No tengo que preocuparme de hacer pedidos y siempre
                tengo granola en casa. Además, el ahorro se nota a final de mes."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-semibold text-primary-700">
                  AS
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Ana S.</p>
                  <p className="text-sm text-neutral-500">Suscriptora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Listo para probar la diferencia?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
            Únete a cientos de familias que han descubierto el sabor de la granola
            artesanal de verdad. Envío gratis a partir de 4 bolsas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda" className="btn-primary btn-lg">
              Comprar ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/nosotros" className="btn bg-white/10 hover:bg-white/20 text-white btn-lg">
              Conocer nuestra historia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
