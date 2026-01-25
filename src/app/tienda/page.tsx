import { Metadata } from 'next';
import { ProductCard } from '@/components/product/ProductCard';
import { getActiveProducts } from '@/data/products';
import { Lightbulb, SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tienda',
  description:
    'Compra granola Poppy sin gluten, ecologica y premium. Elige entre nuestros sabores y packs. Envio gratis a partir de 4 bolsas.',
};

export default function TiendaPage() {
  const products = getActiveProducts();
  const retailProducts = products.filter((p) => p.categoryId === 'cat_granola');
  const horecaProducts = products.filter((p) => p.categoryId === 'cat_horeca');

  return (
    <div className="section bg-cream-50">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center mb-14">
          <h1 className="font-display text-stone-800 mb-5">
            Nuestra tienda
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto">
            Granola Poppy elaborada con ingredientes de calidad.
            Elige tu sabor favorito y el pack que mejor se adapte a ti.
          </p>
        </div>

        {/* Filters and sorting */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b border-cream-200">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-sm text-stone-500">
              <SlidersHorizontal className="w-4 h-4" />
              Filtros:
            </span>
            <button className="pill pill-active">
              Sin gluten
            </button>
            <button className="pill hover:border-olive-300">
              Ecologico
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500">Ordenar:</span>
            <select className="input py-2.5 px-4 w-auto text-sm bg-white rounded-full border-cream-200 focus:border-earth-300 focus:ring-earth-200">
              <option value="popular">Mas populares</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-stone-400 mb-8">
          Mostrando {retailProducts.length} productos
        </p>

        {/* Retail products */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-medium text-stone-800 mb-8">
            Granola 250g
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {retailProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Horeca products */}
        {horecaProducts.length > 0 && (
          <section className="mb-16">
            <div className="bg-cream-100 rounded-2xl p-8 md:p-10 mb-10 border border-cream-200">
              <h2 className="font-display text-2xl font-medium text-stone-800 mb-3">
                Formato profesional (Horeca)
              </h2>
              <p className="text-stone-500">
                Tienes una cafeteria, hotel o tienda? Consulta nuestros formatos de 1kg
                y condiciones especiales para profesionales.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {horecaProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} showQuickAdd={false} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Info banner */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-cream-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-earth-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-earth-500" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-xl font-medium text-stone-800 mb-3">
                No sabes cual elegir?
              </h3>
              <p className="text-stone-500 mb-4">
                Todos nuestros sabores comparten la misma base de calidad: avena sin gluten
                remojada, miel ecologica y frutos secos premium. La diferencia esta en los
                toques especiales de cada variedad.
              </p>
              <p className="text-sm text-earth-600 font-medium">
                Consejo: Empieza con el sabor clasico y luego explora los demas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
