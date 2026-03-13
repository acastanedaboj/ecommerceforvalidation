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

      {/* ── HERO EDITORIAL ── */}
      <section
        className="relative overflow-hidden"
        style={{ height: '70vh', minHeight: '480px', maxHeight: '720px', background: '#1c1410' }}
      >
        <Image
          src="/images/hero-tower.png"
          alt="Granola Poppy — Tienda"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ opacity: 0.4 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,.05) 0%, transparent 40%, rgba(0,0,0,.6) 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{ padding: '0 56px 56px' }}
        >
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1" style={{ fontSize: '11px', listStyle: 'none' }}>
              <li>
                <Link href="/" style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'none' }} className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,.2)' }} />
              </li>
              <li style={{ color: 'rgba(255,255,255,.7)', fontWeight: 400 }}>Tienda</li>
            </ol>
          </nav>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 0.95,
              color: 'var(--cream)',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Nuestra <em>granola</em>
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,.45)',
              fontWeight: 300,
              maxWidth: '380px',
              lineHeight: 1.8,
            }}
          >
            Tres sabores. Ingredientes reales. Sin gluten, sin lactosa, sin ruido.
            Elaborada cada semana en nuestro obrador de Málaga.
          </p>
        </div>
      </section>

      {/* ── EDITORIAL LINE ── */}
      <div style={{ padding: '56px 0', textAlign: 'center', background: 'var(--white)' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(20px, 2.5vw, 30px)',
            color: 'var(--dark)',
            opacity: 0.7,
            letterSpacing: '-0.01em',
          }}
        >
          Crafted for pleasure
        </p>
      </div>

      {/* ── PRODUCTS — 2 column grid ── */}
      <section style={{ padding: '0 0 96px', background: 'var(--off)' }}>
        <div className="container-custom" style={{ paddingTop: '80px' }}>
          {/* Section label */}
          <div className="flex justify-between items-baseline mb-14">
            <div>
              <span className="section-label">Granola artesanal · 150g</span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  letterSpacing: '-0.01em',
                }}
              >
                Elige tu sabor
              </h2>
            </div>
            <button
              onClick={() => setIsBundleModalOpen(true)}
              className="btn-text hidden sm:inline-flex"
              style={{ fontSize: '13px' }}
            >
              Crear pack mixto
            </button>
          </div>

          {/* 2-col grid */}
          <div className="grid sm:grid-cols-2 gap-8 lg:gap-14">
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

      {/* ── SUBSCRIPTION — editorial, not a CTA box ── */}
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
