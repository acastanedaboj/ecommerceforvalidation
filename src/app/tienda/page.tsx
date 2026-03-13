'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/product/ProductCard';
import { BundleBuilderModal } from '@/components/bundle';
import { getActiveProducts, getRetailProducts } from '@/data/products';
import { ChevronRight } from 'lucide-react';
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

      {/* ── HEADER — clean, minimal, centered ── */}
      <section style={{ paddingTop: '140px', paddingBottom: '0', background: 'var(--off)' }}>
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1" style={{ fontSize: '11px', listStyle: 'none' }}>
              <li>
                <Link href="/" style={{ color: 'rgba(17,17,17,.35)', textDecoration: 'none' }} className="hover:text-dark transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3" style={{ color: 'rgba(17,17,17,.15)' }} />
              </li>
              <li style={{ color: 'var(--dark)', fontWeight: 400 }}>Tienda</li>
            </ol>
          </nav>

          <div className="text-center" style={{ paddingBottom: '64px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(36px, 5vw, 56px)',
                lineHeight: 1.1,
                color: 'var(--dark)',
                letterSpacing: '-0.02em',
                marginBottom: '14px',
              }}
            >
              Nuestra <em>granola</em>
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--dark)',
                opacity: 0.4,
                fontWeight: 300,
                maxWidth: '400px',
                margin: '0 auto',
                lineHeight: 1.8,
              }}
            >
              Tres sabores. Ingredientes reales. Sin gluten, sin lactosa.
              Elaborada cada semana en nuestro obrador de Málaga.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS — 3 columns on desktop ── */}
      <section style={{ padding: '0 0 96px', background: 'var(--off)' }}>
        <div className="container-custom">
          {/* Section label row */}
          <div className="flex justify-between items-baseline mb-12">
            <span className="section-label">Granola artesanal · 150g</span>
            <button
              onClick={() => setIsBundleModalOpen(true)}
              className="btn-text hidden sm:inline-flex"
              style={{ fontSize: '13px' }}
            >
              Crear pack mixto
            </button>
          </div>

          {/* 3-col grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {retailProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Mobile bundle link */}
          <div className="mt-10 text-center sm:hidden">
            <button
              onClick={() => setIsBundleModalOpen(true)}
              className="btn-pill"
            >
              Crear pack mixto
            </button>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL INTERLUDE ── */}
      <div className="split">
        <div className="split-img">
          <div className="split-img-inner">
            <Image
              src="/images/nosotros-divider.png"
              alt="Obrador Poppy, Málaga"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <span
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              fontSize: '9px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--dark)',
              opacity: 0.35,
            }}
          >
            Obrador, Málaga
          </span>
        </div>
        <div className="split-body">
          <span className="section-label">Nuestro proceso</span>
          <h2 className="split-title">
            Pequeños lotes, <em>cada semana</em>
          </h2>
          <p className="split-text">
            Tostamos bajo demanda. Nunca almacenamos. Cada bolsa que recibes tiene horas
            o días desde que salió del horno. Sin gluten, sin lactosa, sin conservantes,
            sin prisas.
          </p>
          <Link href="/nosotros" className="btn-pill">
            Conocer más
          </Link>
        </div>
      </div>

      {/* ── SUBSCRIPTION — editorial ── */}
      <section style={{ padding: '96px 0', background: 'var(--white)', textAlign: 'center' }}>
        <div className="container-custom" style={{ maxWidth: '640px' }}>
          <span className="section-label">Suscripción mensual</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(26px, 3vw, 38px)',
              marginBottom: '20px',
            }}
          >
            Recíbela cada mes <em>con un 15% menos</em>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--dark)', opacity: 0.5, fontWeight: 300, lineHeight: 1.85, marginBottom: '36px' }}>
            6 bolsas al mes. Envío gratis siempre. Sin permanencia, cancela cuando quieras.
            El 15% que ahorras es nuestra forma de decir gracias.
          </p>
          <Link href="/suscripcion" className="btn-pill">
            Empezar la suscripción
          </Link>
        </div>
      </section>

      {/* ── HORECA ── */}
      {horecaProducts.length > 0 && (
        <section style={{ background: 'var(--dark)' }}>
          <div className="container-custom" style={{ padding: '80px 56px' }}>
            <div style={{ maxWidth: '480px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.3)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '16px', fontWeight: 300 }}>
                Formato profesional
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 2.5vw, 34px)',
                  color: 'var(--cream)',
                  marginBottom: '16px',
                }}
              >
                Horeca &amp; Mayorista
              </h2>
              <p style={{ color: 'rgba(255,255,255,.5)', fontWeight: 300, fontSize: '14px', marginBottom: '32px', lineHeight: 1.85 }}>
                ¿Tienes una cafetería, hotel o tienda? Formatos de 1kg
                y condiciones especiales para profesionales.
              </p>
              <a href="/mayorista" className="btn-pill-white">
                Ver condiciones
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── HELP — editorial ── */}
      <section style={{ padding: '80px 0', background: 'var(--off)', textAlign: 'center' }}>
        <div className="container-custom" style={{ maxWidth: '520px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              marginBottom: '12px',
            }}
          >
            ¿No sabes cuál elegir?
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--dark)', opacity: 0.5, fontWeight: 300, lineHeight: 1.85, marginBottom: '8px' }}>
            Todos nuestros sabores comparten la misma base: avena integral sin gluten,
            frutos secos premium. Sin lactosa, sin conservantes. La mayoría con miel
            ecológica; también tenemos una opción vegana con sirope de agave.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--brown)', fontWeight: 400 }}>
            Empieza con la original y explora desde ahí.
          </p>
        </div>
      </section>

      {/* Bundle Builder Modal */}
      <BundleBuilderModal
        isOpen={isBundleModalOpen}
        onClose={() => setIsBundleModalOpen(false)}
      />
    </>
  );
}
