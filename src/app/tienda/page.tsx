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
      {/* JSON-LD */}
      <JsonLd data={buildProductListSchema(allRetailProducts, 'Granola sin gluten Poppy')} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Tienda', url: '/tienda' },
        ])}
      />

    <div style={{ paddingTop: '140px', paddingBottom: '96px', background: 'var(--off)' }}>
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1" style={{ fontSize: '12px', listStyle: 'none' }}>
            <li>
              <Link href="/" style={{ color: 'rgba(17,17,17,.35)', textDecoration: 'none' }} className="hover:text-dark transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" style={{ color: 'rgba(17,17,17,.2)' }} />
            </li>
            <li style={{ color: 'var(--dark)', fontWeight: 700 }}>Tienda</li>
          </ol>
        </nav>

        {/* Page header */}
        <div className="text-center mb-14">
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '16px' }}>
            Nuestra tienda
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, maxWidth: '520px', margin: '0 auto', lineHeight: 1.85 }}>
            Granola Poppy elaborada con ingredientes de calidad.
            Elige tu sabor favorito y el pack que mejor se adapte a ti.
          </p>
        </div>

        {/* Bundle Builder CTA */}
        <div className="mb-10 p-6 md:p-8" style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0" style={{ background: 'var(--off)' }}>
              <Package className="w-7 h-7" style={{ color: 'var(--brown)' }} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '4px' }}>
                Crea tu pack mixto
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300 }}>
                Mezcla tus sabores favoritos y ahorra hasta un 10%
              </p>
            </div>
            <button
              onClick={() => setIsBundleModalOpen(true)}
              className="btn-pill"
            >
              crear pack
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8" style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2" style={{ fontSize: '12px', color: 'rgba(17,17,17,.4)', fontWeight: 300 }}>
              <SlidersHorizontal className="w-4 h-4" />
              Filtros:
            </span>
            <button className="pill pill-active">
              Sin gluten
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '12px', color: 'rgba(17,17,17,.4)', fontWeight: 300 }}>Ordenar:</span>
            <select className="input py-2.5 px-4 w-auto" style={{ fontSize: '12px', borderRadius: '100px', borderColor: 'rgba(0,0,0,.1)' }}>
              <option value="popular">Más populares</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-8" style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Mostrando {retailProducts.length} productos
        </p>

        {/* Retail products */}
        <section className="mb-20">
          <h2 className="mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: '24px' }}>
            Granola 150g
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {retailProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Horeca CTA */}
        {horecaProducts.length > 0 && (
          <section className="mb-16">
            <div className="p-8 md:p-10" style={{ background: 'var(--dark)', color: 'var(--white)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--white)', marginBottom: '12px' }}>
                Formato profesional (Horeca)
              </h2>
              <p style={{ color: 'rgba(255,255,255,.65)', fontWeight: 300, fontSize: '14px', marginBottom: '24px', lineHeight: 1.85 }}>
                ¿Tienes una cafetería, hotel o tienda? Ofrecemos formatos de 1kg
                y condiciones especiales para profesionales.
              </p>
              <a href="/mayorista" className="btn-pill-white">
                ver condiciones mayorista
              </a>
            </div>
          </section>
        )}

        {/* Info banner */}
        <div className="p-8 md:p-10" style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: 'var(--off)' }}>
              <Lightbulb className="w-6 h-6" style={{ color: 'var(--brown)' }} strokeWidth={1.5} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '12px' }}>
                ¿No sabes cuál elegir?
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '16px' }}>
                Todos nuestros sabores comparten la misma base de calidad: avena integral sin gluten
                y frutos secos premium. La mayoría están endulzados con miel,
                y tenemos una opción vegana endulzada con sirope de agave ecológico.
              </p>
              <p style={{ fontSize: '12px', color: 'var(--brown)', fontWeight: 700 }}>
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
