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
      {/* Hero Section - Elegant & Minimal */}
      <section className="relative bg-gradient-warm overflow-hidden">
        <div className="container-custom py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <span className="inline-block badge-accent mb-6 animate-fade-in">
                Sin gluten certificado
              </span>

              <h1 className="font-display text-stone-800 mb-8 animate-fade-in-up">
                Granola artesanal
                <br />
                <span className="text-earth-600">sin gluten real</span>
              </h1>

              <p className="text-lg md:text-xl text-stone-500 mb-10 leading-relaxed animate-fade-in-up animation-delay-100">
                Elaborada a mano con avena certificada, miel ecologica
                de apicultores locales y los mejores frutos secos.
                Remojada para facilitar la digestion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-200">
                <Link href="/tienda" className="btn-primary btn-lg group">
                  Comprar ahora
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/suscripcion" className="btn-outline btn-lg">
                  Suscribete -15%
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-8 mt-14 justify-center lg:justify-start text-sm text-stone-500 animate-fade-in-up animation-delay-300">
                <span className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-earth-500" strokeWidth={1.5} />
                  Envio gratis +4 bolsas
                </span>
                <span className="flex items-center gap-2.5">
                  <Leaf className="w-5 h-5 text-olive-500" strokeWidth={1.5} />
                  100% Natural
                </span>
                <span className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-earth-400" strokeWidth={1.5} />
                  Hecho con amor
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Main image */}
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-soft-lg">
                  <Image
                    src="/products/hero.jpg"
                    alt="Granola artesanal con frutos secos y miel"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Floating badge - Reviews */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft-lg p-5 animate-float">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-display font-medium text-stone-800">4.9/5</p>
                      <p className="text-xs text-stone-400">+500 resenas</p>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-olive-100 rounded-full blur-2xl opacity-60" />
                <div className="absolute -bottom-4 right-12 w-16 h-16 bg-earth-100 rounded-full blur-xl opacity-60" />
              </div>
            </div>
          </div>
        </div>

        {/* Subtle wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-cream-50" style={{
          clipPath: 'ellipse(70% 100% at 50% 100%)'
        }} />
      </section>

      {/* Benefits Section */}
      <section className="section bg-cream-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-stone-800 mb-5">
              Por que nuestra granola es diferente
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              No es solo granola. Es el resultado de anos perfeccionando
              una receta artesanal con ingredientes de verdad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-7 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-cream-100 rounded-2xl flex items-center justify-center mb-5">
                <span className="text-3xl">{String.fromCodePoint(0x1F33E)}</span>
              </div>
              <h3 className="font-display text-lg font-medium text-stone-800 mb-3">
                Avena remojada
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Remojamos la avena para reducir el acido fitico y mejorar
                la digestibilidad. Tu intestino te lo agradecera.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-7 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-earth-50 rounded-2xl flex items-center justify-center mb-5">
                <span className="text-3xl">{String.fromCodePoint(0x1F36F)}</span>
              </div>
              <h3 className="font-display text-lg font-medium text-stone-800 mb-3">
                Miel ecologica local
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Endulzada unicamente con miel de apicultores de pueblo.
                Sin azucares refinados, sin edulcorantes artificiales.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-7 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-olive-50 rounded-2xl flex items-center justify-center mb-5">
                <span className="text-3xl">{String.fromCodePoint(0x1F95C)}</span>
              </div>
              <h3 className="font-display text-lg font-medium text-stone-800 mb-3">
                Frutos secos premium
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Pecanas, almendras, avellanas y anacardos de primera calidad.
                Nada de rellenos baratos ni saborizantes.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl p-7 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-cream-200 rounded-2xl flex items-center justify-center mb-5">
                <span className="text-3xl">{String.fromCodePoint(0x2728)}</span>
              </div>
              <h3 className="font-display text-lg font-medium text-stone-800 mb-3">
                Sin aditivos
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Sin conservantes, sin colorantes, sin potenciadores del sabor.
                Solo ingredientes que reconocerias en tu cocina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-stone-800 mb-3">
                Nuestros productos
              </h2>
              <p className="text-stone-500">
                Elige tu sabor favorito o pruebalos todos
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/Packs Section */}
      <section className="section bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="font-display text-stone-800 mb-5">
              Cuanto mas compras, mas ahorras
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Elige el pack que mejor se adapte a tu consumo.
              A partir de 4 bolsas, el envio es gratis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {packOptions.map((pack) => (
              <div
                key={pack.size}
                className={`bg-white rounded-2xl p-6 transition-all duration-300 ${
                  pack.size === 4
                    ? 'ring-2 ring-earth-500 shadow-soft-lg scale-[1.02]'
                    : 'shadow-soft hover:shadow-soft-lg hover:-translate-y-1'
                }`}
              >
                {pack.size === 4 && (
                  <span className="badge-primary mb-4 block w-fit">Mas popular</span>
                )}
                <h3 className="font-display text-xl font-medium text-stone-800 mb-2">
                  {pack.label}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-display font-medium text-earth-600">
                    {formatPrice(pack.unitPriceCents)}
                  </span>
                  <span className="text-stone-400 text-sm">/ud.</span>
                </div>
                {pack.discountPercentage > 0 && (
                  <p className="text-sm text-olive-600 font-medium mb-3">
                    Ahorras {pack.discountPercentage}% por unidad
                  </p>
                )}
                <ul className="space-y-2.5 text-sm text-stone-500 mb-5">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-olive-500" strokeWidth={2} />
                    Total: {formatPrice(pack.totalPriceCents)}
                  </li>
                  {pack.freeShipping && (
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-olive-500" strokeWidth={2} />
                      Envio gratis
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
          <div className="mt-14 bg-stone-800 rounded-3xl p-10 md:p-14 text-center overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-earth-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-olive-600/20 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-5">
                <RefreshCw className="w-5 h-5 text-cream-300" strokeWidth={1.5} />
                <span className="badge bg-cream-100/10 text-cream-200">Suscripcion mensual</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-cream-50 mb-4">
                Suscribete y ahorra un {subscriptionInfo.discountPercentage}%
              </h3>
              <p className="text-cream-300 mb-8 max-w-xl mx-auto">
                Recibe 6 bolsas cada mes a solo {formatPrice(subscriptionInfo.unitPriceCents)}/ud.
                Cancela cuando quieras, sin compromisos.
              </p>
              <Link
                href="/suscripcion"
                className="btn bg-cream-50 text-stone-800 hover:bg-cream-100 btn-lg group"
              >
                Empezar suscripcion
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="font-display text-stone-800 mb-5">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-stone-500">
              Mas de 500 familias ya disfrutan de nuestra granola cada dia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-cream-50 rounded-2xl p-7 hover:shadow-soft transition-all duration-300">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">
                &ldquo;Por fin una granola que puedo comer sin problemas. Soy celiaca y siempre
                tenia miedo de la contaminacion cruzada. Esta es la primera que me sienta bien de verdad.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-earth-100 flex items-center justify-center font-display font-medium text-earth-700">
                  ML
                </div>
                <div>
                  <p className="font-medium text-stone-800">Maria L.</p>
                  <p className="text-sm text-stone-400">Cliente verificada</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-cream-50 rounded-2xl p-7 hover:shadow-soft transition-all duration-300">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">
                &ldquo;El sabor es increible, se nota que esta hecha con ingredientes de calidad.
                Mis hijos la devoran y me encanta saber que estan comiendo algo nutritivo.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-olive-100 flex items-center justify-center font-display font-medium text-olive-700">
                  CG
                </div>
                <div>
                  <p className="font-medium text-stone-800">Carlos G.</p>
                  <p className="text-sm text-stone-400">Cliente verificado</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-cream-50 rounded-2xl p-7 hover:shadow-soft transition-all duration-300">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">
                &ldquo;La suscripcion es genial. No tengo que preocuparme de hacer pedidos y siempre
                tengo granola en casa. Ademas, el ahorro se nota a final de mes.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-cream-200 flex items-center justify-center font-display font-medium text-cream-800">
                  AS
                </div>
                <div>
                  <p className="font-medium text-stone-800">Ana S.</p>
                  <p className="text-sm text-stone-400">Suscriptora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-earth">
        <div className="container-custom text-center">
          <h2 className="font-display text-stone-800 mb-5">
            Listo para probar la diferencia?
          </h2>
          <p className="text-stone-500 mb-10 max-w-xl mx-auto text-lg">
            Unete a cientos de familias que han descubierto el sabor de la granola
            artesanal de verdad. Envio gratis a partir de 4 bolsas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda" className="btn-primary btn-lg group">
              Comprar ahora
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/nosotros" className="btn-ghost btn-lg">
              Conocer nuestra historia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
