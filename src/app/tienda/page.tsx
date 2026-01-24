import { Metadata } from 'next';
import { ProductCard } from '@/components/product/ProductCard';
import { getActiveProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Tienda',
  description:
    'Compra granola Nalu sin gluten, ecológica y premium. Elige entre nuestros sabores y packs. Envío gratis a partir de 4 bolsas.',
};

export default function TiendaPage() {
  const products = getActiveProducts();
  const retailProducts = products.filter((p) => p.categoryId === 'cat_granola');
  const horecaProducts = products.filter((p) => p.categoryId === 'cat_horeca');

  return (
    <div className="section">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
            Nuestra tienda
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Granola Nalu elaborada con ingredientes de calidad.
            Elige tu sabor favorito y el pack que mejor se adapte a ti.
          </p>
        </div>

        {/* Filters and sorting - simplified for now */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-neutral-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-neutral-500">Filtros:</span>
            <button className="badge-primary">Sin gluten</button>
            <button className="badge bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
              Ecológico
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500">Ordenar:</span>
            <select className="input py-2 w-auto text-sm">
              <option value="popular">Más populares</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Retail products */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
            Granola 250g
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Horeca products */}
        {horecaProducts.length > 0 && (
          <section>
            <div className="bg-secondary-50 rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                Formato profesional (Horeca)
              </h2>
              <p className="text-neutral-600">
                ¿Tienes una cafetería, hotel o tienda? Consulta nuestros formatos de 1kg
                y condiciones especiales para profesionales.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {horecaProducts.map((product) => (
                <ProductCard key={product.id} product={product} showQuickAdd={false} />
              ))}
            </div>
          </section>
        )}

        {/* Info banner */}
        <div className="mt-16 bg-primary-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            ¿No sabes cuál elegir?
          </h3>
          <p className="text-neutral-600 mb-4">
            Todos nuestros sabores comparten la misma base de calidad: avena sin gluten
            remojada, miel ecológica y frutos secos premium. La diferencia está en los
            toques especiales de cada variedad.
          </p>
          <p className="text-sm text-primary-700 font-medium">
            💡 Consejo: Empieza con el sabor clásico y luego explora los demás.
          </p>
        </div>
      </div>
    </div>
  );
}
