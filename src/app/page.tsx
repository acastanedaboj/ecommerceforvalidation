import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Truck,
  Leaf,
  Heart,
  RefreshCw,
  Star,
  Check,
  Wheat,
  Droplets,
  Sparkles,
  TreeDeciduous,
} from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
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

  return (
    <>
      {/* Hero Section - Editorial Style */}
      <section className="relative overflow-hidden bg-white">
        <div className="container-custom pb-16 pt-10 md:pb-24 md:pt-14 lg:pb-28 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Hero Content */}
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <span className="mb-6 inline-block animate-fade-in text-xs uppercase tracking-widest text-stone-500">
                Sin gluten certificado
              </span>

              <h1 className="mb-8 animate-fade-in-up font-display text-stone-800">
                Granola artesanal
                <br />
                <span className="text-earth-600">sin gluten real</span>
              </h1>

              <p className="animation-delay-100 mb-10 animate-fade-in-up text-base leading-relaxed text-stone-600 md:text-lg">
                Elaborada a mano con avena sin gluten certificada, miel ecológica de apicultores
                locales y los mejores frutos secos y semillas, remojados para facilitar la
                digestión.
              </p>

              <div className="animation-delay-200 flex animate-fade-in-up flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/tienda" className="btn-primary btn-lg group">
                  Comprar ahora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/suscripcion" className="btn-outline btn-lg">
                  Suscríbete -15%
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="animation-delay-300 mt-12 flex animate-fade-in-up flex-wrap justify-center gap-8 text-xs uppercase tracking-wide text-stone-500 lg:justify-start">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4" strokeWidth={1.5} />
                  Envío gratis +4 bolsas
                </span>
                <span className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" strokeWidth={1.5} />
                  100% Natural
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="animation-delay-200 relative animate-fade-in">
              {/* Desktop: vertical 4:5 image */}
              <div className="relative mx-auto hidden aspect-[4/5] max-w-lg lg:block">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/images/home 4-5.png"
                    alt="Elaboración artesanal de granola Poppy con ingredientes naturales"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                </div>

                {/* Floating badge - Reviews */}
                <div className="absolute -bottom-4 -left-4 animate-pulse-soft bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-olive-500 text-olive-500" />
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
              <div className="relative mx-auto aspect-[3/2] max-w-2xl lg:hidden">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/images/home horizntal.png"
                    alt="Elaboración artesanal de granola Poppy con ingredientes naturales"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>

                {/* Floating badge - Reviews */}
                <div className="absolute -bottom-4 -left-4 animate-pulse-soft bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-olive-500 text-olive-500" />
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

      {/* Benefits Section - Editorial Style */}
      <section className="bg-cream-100 py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs uppercase tracking-widest text-stone-500">
              Calidad artesanal
            </p>
            <h2 className="mb-6 font-display text-stone-800">
              Por qué nuestra granola es{' '}
              <span className="text-earth-600-display-italic">diferente</span>
            </h2>
          </div>

          <div className="grid gap-px bg-stone-200 md:grid-cols-2 lg:grid-cols-4">
            {/* Benefit 1 */}
            <div className="group bg-cream-100 p-10 text-center transition-colors hover:bg-white">
              <Wheat className="mx-auto mb-6 h-8 w-8 text-earth-600" strokeWidth={1} />
              <h3 className="mb-3 font-display text-lg text-stone-800">Ingredientes remojados</h3>
              <p className="text-sm leading-relaxed text-stone-600">
                Frutos secos y semillas remojados para mejor digestibilidad.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group bg-cream-100 p-10 text-center transition-colors hover:bg-white">
              <Droplets className="mx-auto mb-6 h-8 w-8 text-olive-600" strokeWidth={1} />
              <h3 className="mb-3 font-display text-lg text-stone-800">Miel ecológica local</h3>
              <p className="text-sm leading-relaxed text-stone-600">
                De apicultores de pueblo. Sin azúcares refinados.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group bg-cream-100 p-10 text-center transition-colors hover:bg-white">
              <TreeDeciduous className="mx-auto mb-6 h-8 w-8 text-taupe-600" strokeWidth={1} />
              <h3 className="mb-3 font-display text-lg text-stone-800">Frutos secos premium</h3>
              <p className="text-sm leading-relaxed text-stone-600">
                Almendras, avellanas y anacardos de primera.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="group bg-cream-100 p-10 text-center transition-colors hover:bg-white">
              <Sparkles className="mx-auto mb-6 h-8 w-8 text-earth-600" strokeWidth={1} />
              <h3 className="mb-3 font-display text-lg text-stone-800">Sin aditivos</h3>
              <p className="text-sm leading-relaxed text-stone-600">
                Solo ingredientes que reconocerías en tu cocina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-10 flex flex-col justify-between md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 font-display text-stone-800">Nuestros productos</h2>
              <p className="text-lg text-stone-800">Elige tu sabor favorito o pruébalos todos</p>
            </div>
            <Link
              href="/tienda"
              className="group mt-6 inline-flex items-center gap-2 font-medium text-earth-600 hover:text-earth-700 md:mt-0"
            >
              Ver todos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="bg-white py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs uppercase tracking-widest text-stone-500">Precios</p>
            <h2 className="mb-4 font-display text-stone-800">
              Cuanto más compras, más <span className="text-earth-600-display-italic">ahorras</span>
            </h2>
            <p className="mx-auto max-w-md text-stone-600">
              A partir de 4 bolsas, el envío es gratis.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
            {packOptions.map((pack) => (
              <div
                key={pack.size}
                className={`relative bg-white p-8 transition-all ${
                  pack.size === 4 ? 'bg-cream-50' : ''
                }`}
              >
                {pack.size === 4 && (
                  <span className="absolute right-4 top-4 text-xs uppercase tracking-widest text-earth-600">
                    Popular
                  </span>
                )}
                <h3 className="mb-2 font-display text-lg text-stone-800">
                  {pack.size === 1 ? '1 bolsa' : `Pack ${pack.size} bolsas`}
                </h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="font-display text-3xl text-earth-600">
                    {formatPrice(pack.unitPriceCents)}
                  </span>
                  <span className="text-sm text-stone-500">/ud.</span>
                </div>
                {pack.discountPercentage > 0 && (
                  <p className="mb-4 inline-block rounded bg-olive-100 px-2 py-1 text-xs text-stone-800">
                    -{pack.discountPercentage}% por unidad
                  </p>
                )}
                <ul className="mb-6 space-y-2 text-sm text-stone-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-stone-400" strokeWidth={2} />
                    Total: {formatPrice(pack.totalPriceCents)}
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="h-3 w-3 text-stone-400" strokeWidth={2} />
                    {pack.freeShipping ? (
                      <span className="text-earth-600">Envío gratis</span>
                    ) : (
                      <span>Envío: 4,95€</span>
                    )}
                  </li>
                </ul>
                <Link
                  href="/tienda"
                  className={`block py-3 text-center text-sm font-medium transition-colors ${
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
          <div className="mt-14 bg-earth-600 p-10 text-center md:p-14">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#ffffec]/60">
              Suscripción mensual
            </p>
            <h3 className="mb-4 font-display text-3xl text-[#ffffec] md:text-4xl">
              Suscríbete y ahorra un {subscriptionInfo.discountPercentage}%
            </h3>
            <p className="mx-auto mb-8 max-w-lg text-[#ffffec]/70">
              Recibe 6 bolsas cada mes a solo {formatPrice(subscriptionInfo.unitPriceCents)}/ud.
              Cancela cuando quieras.
            </p>
            <Link
              href="/suscripcion"
              className="inline-flex items-center gap-2 bg-[#ffffec] px-8 py-4 font-medium text-earth-700 transition-colors hover:bg-cream-100"
            >
              Empezar suscripción
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-custom mx-auto max-w-2xl text-center">
          <h2 className="mb-6 font-display text-stone-800">
            ¿Lista para probar la <span className="text-earth-600-display-italic">diferencia</span>?
          </h2>
          <p className="mb-10 text-stone-600">
            Únete a cientos de familias que han descubierto el sabor de la granola artesanal de
            verdad.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 bg-earth-600 px-8 py-4 font-medium text-[#ffffec] transition-colors hover:bg-earth-700"
            >
              Comprar ahora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/nosotros"
              className="inline-flex items-center justify-center gap-2 border border-stone-300 px-8 py-4 font-medium text-stone-800 transition-colors hover:border-stone-400"
            >
              Nuestra historia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
