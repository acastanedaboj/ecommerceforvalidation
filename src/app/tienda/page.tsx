'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { BundleBuilderModal } from '@/components/bundle';
import { getActiveProducts } from '@/data/products';
import { Lightbulb, SlidersHorizontal, Package, ChevronRight } from 'lucide-react';

export default function TiendaPage() {
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);

  const products = getActiveProducts();
  const retailProducts = products.filter((p) => p.categoryId === 'cat_granola');
  const horecaProducts = products.filter((p) => p.categoryId === 'cat_horeca');

  return (
    <div className="section bg-cream-50">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm">
            <li>
              <Link href="/" className="text-stone-400 hover:text-earth-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-stone-300" />
            </li>
            <li className="text-stone-700 font-medium">Tienda</li>
          </ol>
        </nav>

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

        {/* Bundle Builder CTA */}
        <div className="bg-gradient-earth rounded-2xl p-6 md:p-8 mb-10 border border-earth-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-14 h-14 bg-white/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
              <Package className="w-7 h-7 text-earth-500" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-medium text-stone-800 mb-1">
                Crea tu pack mixto
              </h3>
              <p className="text-stone-600">
                Mezcla tus sabores favoritos y ahorra hasta un 10%
              </p>
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
              Ecológico
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500">Ordenar:</span>
            <select className="input py-2.5 px-4 w-auto text-sm bg-white rounded-full border-cream-200 focus:border-earth-300 focus:ring-earth-200">
              <option value="popular">Más populares</option>
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

        {/* Horeca CTA - Link to B2B page */}
        {horecaProducts.length > 0 && (
          <section className="mb-16">
            <div className="bg-stone-800 rounded-2xl p-8 md:p-10 text-[#ffffec]">
              <h2 className="font-display text-2xl font-medium mb-3 text-[#ffffec]">
                Formato profesional (Horeca)
              </h2>
              <p className="text-[#ffffec] mb-6">
                ¿Tienes una cafetería, hotel o tienda? Ofrecemos formatos de 1kg
                y condiciones especiales para profesionales.
              </p>
              <a
                href="/mayorista"
                className="inline-flex items-center gap-2 bg-[#ffffec] text-stone-800 px-6 py-3 rounded-full font-medium hover:bg-[#ffffec]/90 transition-colors"
              >
                Ver condiciones mayorista
              </a>
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
                ¿No sabes cuál elegir?
              </h3>
              <p className="text-stone-500 mb-4">
                Todos nuestros sabores comparten la misma base de calidad: avena sin gluten
                y frutos secos premium. La mayoría están endulzados con miel ecológica,
                y tenemos una opción vegana (Dátiles) sin miel.
              </p>
              <p className="text-sm text-earth-600 font-medium">
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
  );
}
