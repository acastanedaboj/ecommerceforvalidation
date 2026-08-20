'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { BundleBuilderModal } from '@/components/bundle';
import { getActiveProducts, getRetailProducts } from '@/data/products';
import { Lightbulb, SlidersHorizontal, Package, ChevronRight } from 'lucide-react';
import { JsonLd, buildProductListSchema, buildBreadcrumbSchema } from '@/lib/seo';

export default function TiendaPage() {
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);

  const products = getActiveProducts();
  const retailProducts = products.filter((p) => p.categoryId === 'cat_granola');
  const horecaProducts = products.filter((p) => p.categoryId === 'cat_horeca');
  const allRetailProducts = getRetailProducts();

  return (
    <>
      {/* JSON-LD: Only on listing page, not on product detail pages */}
      <JsonLd data={buildProductListSchema(allRetailProducts, 'Granola Sin Gluten Poppy')} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Tienda', url: '/tienda' },
        ])}
      />

      <div className="section bg-cream-50">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm">
              <li>
                <Link href="/" className="text-stone-400 transition-colors hover:text-earth-600">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-stone-300" />
              </li>
              <li className="font-medium text-stone-700">Tienda</li>
            </ol>
          </nav>

          {/* Page header */}
          <div className="mb-14 text-center">
            <h1 className="mb-5 font-display text-stone-800">Nuestra tienda</h1>
            <p className="mx-auto max-w-2xl text-lg text-stone-500">
              Granola Poppy elaborada con ingredientes de calidad. Elige tu sabor favorito y el pack
              que mejor se adapte a ti.
            </p>
          </div>

          {/* Bundle Builder CTA */}
          <div className="mb-10 rounded-2xl border border-earth-100 bg-gradient-earth p-6 md:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-soft">
                <Package className="h-7 w-7 text-earth-500" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 font-display text-xl font-medium text-stone-800">
                  Crea tu pack mixto
                </h3>
                <p className="text-stone-600">Mezcla tus sabores favoritos y ahorra hasta un 10%</p>
              </div>
              <button
                onClick={() => setIsBundleModalOpen(true)}
                className="btn-primary whitespace-nowrap"
              >
                Crear pack
              </button>
            </div>
          </div>

          {/* Filters and sorting */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-cream-200 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-stone-500">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros:
              </span>
              <button className="pill pill-active">Sin gluten</button>
              <button className="pill hover:border-olive-300">Ecológico</button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-500">Ordenar:</span>
              <select className="input w-auto rounded-full border-cream-200 bg-white px-4 py-2.5 text-sm focus:border-earth-300 focus:ring-earth-200">
                <option value="popular">Más populares</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="mb-8 text-sm text-stone-400">Mostrando {retailProducts.length} productos</p>

          {/* Retail products */}
          <section className="mb-20">
            <h2 className="mb-8 font-display text-2xl font-medium text-stone-800">Granola 150g</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
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

          {/* Horeca CTA - Link to B2B page */}
          {horecaProducts.length > 0 && (
            <section className="mb-16">
              <div className="rounded-2xl bg-stone-800 p-8 text-[#ffffec] md:p-10">
                <h2 className="mb-3 font-display text-2xl font-medium text-[#ffffec]">
                  Formato profesional (Horeca)
                </h2>
                <p className="mb-6 text-[#ffffec]">
                  ¿Tienes una cafetería, hotel o tienda? Ofrecemos formatos de 1kg y condiciones
                  especiales para profesionales.
                </p>
                <a
                  href="/mayorista"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ffffec] px-6 py-3 font-medium text-stone-800 transition-colors hover:bg-[#ffffec]/90"
                >
                  Ver condiciones mayorista
                </a>
              </div>
            </section>
          )}

          {/* Info banner */}
          <div className="rounded-2xl border border-cream-100 bg-white p-8 shadow-soft md:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-earth-50">
                <Lightbulb className="h-6 w-6 text-earth-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="mb-3 font-display text-xl font-medium text-stone-800">
                  ¿No sabes cuál elegir?
                </h3>
                <p className="mb-4 text-stone-500">
                  Todos nuestros sabores comparten la misma base de calidad: avena sin gluten y
                  frutos secos premium. La mayoría están endulzados con miel ecológica, y tenemos
                  una opción vegana endulzada con sirope de ágave.
                </p>
                <p className="text-sm font-medium text-earth-600">
                  Consejo: Empieza con el sabor clásico y luego explora los demás.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Builder Modal */}
        <BundleBuilderModal
          isOpen={isBundleModalOpen}
          onClose={() => setIsBundleModalOpen(false)}
        />
      </div>
    </>
  );
}
