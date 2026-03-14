import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/product/ProductCard';
import { getRetailProducts } from '@/data/products';
import { SITE_URL, BRAND_NAME, getCanonicalUrl } from '@/lib/seo';
import { HomeClient } from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: `Granola sin gluten artesanal | ${BRAND_NAME} — Hecha en Málaga`,
  description:
    'Granola artesanal hecha en Málaga con avena sin gluten, miel ecológica y frutos secos. Tostada despacio en lotes pequeños. Envío gratis a partir de 4 bolsas.',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: `Granola sin gluten artesanal | ${BRAND_NAME} — Hecha en Málaga`,
    description:
      'Granola artesanal hecha en Málaga con avena sin gluten, miel ecológica y frutos secos. Tostada despacio en lotes pequeños.',
    url: SITE_URL,
    type: 'website',
  },
};

export default function HomePage() {
  const products = getRetailProducts();

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ height: '100vh', background: '#1c1410' }}
      >
        {/* Hero background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-tower.png"
            alt="Granola Poppy crujiente y especiada"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ opacity: 0.5 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,.1) 0%, transparent 35%, transparent 55%, rgba(0,0,0,.65) 100%)',
            }}
          />
        </div>

        {/* Hero caption - bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 hero-caption"
          style={{ padding: '0 56px 52px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(44px, 6.5vw, 96px)',
                lineHeight: 0.92,
                color: 'var(--cream)',
                letterSpacing: '-0.02em',
              }}
            >
              Granola artesanal
              <br />
              <em>sin gluten</em>
            </h1>
            <p
              style={{
                marginTop: '14px',
                fontSize: '11px',
                color: 'rgba(255,255,255,.4)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.01em',
              }}
            >
              Crafted for pleasure
            </p>
          </div>
          <div className="hero-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px', paddingBottom: '6px' }}>
            <p
              style={{
                fontSize: '11px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,.45)',
                maxWidth: '220px',
                textAlign: 'right',
                fontWeight: 300,
              }}
            >
              Hecha con miel ecológica en Málaga.
            </p>
            <Link href="/tienda" className="btn-pill-white">
              Descubrir
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute z-10 flex flex-col items-center gap-2"
          style={{
            bottom: '52px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '32px',
              background: 'linear-gradient(var(--white), transparent)',
              animation: 'scroll-pulse 2.2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: '8px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--white)',
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          <span>Pequeños lotes</span><span className="marquee-dot">&middot;</span>
          <span>Tostado lento</span><span className="marquee-dot">&middot;</span>
          <span>Frutos secos seleccionados</span><span className="marquee-dot">&middot;</span>
          <span>Miel ecológica</span><span className="marquee-dot">&middot;</span>
          <span>Sin gluten</span><span className="marquee-dot">&middot;</span>
          <span>Sin lactosa</span><span className="marquee-dot">&middot;</span>
          <span>Obrador propio en Málaga</span><span className="marquee-dot">&middot;</span>
          <span>Crafted for pleasure</span><span className="marquee-dot">&middot;</span>
          <span>Pequeños lotes</span><span className="marquee-dot">&middot;</span>
          <span>Tostado lento</span><span className="marquee-dot">&middot;</span>
          <span>Frutos secos seleccionados</span><span className="marquee-dot">&middot;</span>
          <span>Miel ecológica</span><span className="marquee-dot">&middot;</span>
          <span>Sin gluten</span><span className="marquee-dot">&middot;</span>
          <span>Sin lactosa</span><span className="marquee-dot">&middot;</span>
          <span>Obrador propio en Málaga</span><span className="marquee-dot">&middot;</span>
          <span>Crafted for pleasure</span><span className="marquee-dot">&middot;</span>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="fi" style={{ padding: '112px 0', textAlign: 'center' }}>
        <div className="container-custom">
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(30px, 4vw, 52px)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: 'var(--dark)',
              maxWidth: '720px',
              margin: '0 auto 20px',
            }}
          >
            La granola que hago para mí
            <br />
            <em>Ahora, para ti</em>
          </p>
          <p style={{ fontSize: '12px', color: 'var(--dark)', opacity: 0.5, fontWeight: 300 }}>
            Ingredientes que reconoces &nbsp;&middot;&nbsp; Proceso que respeto
          </p>
        </div>
      </section>

      {/* ── SPLIT: El proceso ── */}
      <div className="split fi">
        <div className="split-img">
          <div className="split-img-inner">
            <Image
              src="/images/nosotros-divider.png"
              alt="Obrador, Málaga"
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
          <span className="section-label">El proceso</span>
          <h2 className="split-title">
            Remojados y <em>tostados despacio</em>
          </h2>
          <p className="split-text">
            Los frutos secos se remojan antes del horneado, un paso que mejora la digestión y
            concentra el sabor. Temperatura baja, tiempo largo. Así se consigue esa textura
            especialmente crujiente que define a Poppy.
          </p>
          <Link href="/nosotros" className="btn-pill">
            El proceso
          </Link>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section className="fi" style={{ padding: '96px 0', background: 'var(--off)' }}>
        <div className="container-custom">
          <div className="flex justify-between items-baseline mb-12">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(28px, 3vw, 42px)',
                letterSpacing: '-0.01em',
              }}
            >
              Tres granolas
            </h2>
            <Link href="/tienda" className="btn-text">
              Ver todas
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.slice(0, 3).map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT: Ingredientes ── */}
      <div className="split fi">
        <div className="split-body bg-off">
          <span className="section-label">Ingredientes</span>
          <h2 className="split-title">
            Solo lo que <em>reconoces</em>
          </h2>
          <p className="split-text">
            Avena integral sin gluten, miel, frutos secos seleccionados, aceite de coco, especias.
            Cada ingrediente tiene un nombre que puedes pronunciar y un origen que conozco. Sin
            aditivos. Sin conservantes. Sin nada que no pondrías tú en un bol.
          </p>
          <Link href="/nosotros" className="btn-pill">
            Nuestra filosofía
          </Link>
        </div>
        <div className="split-img">
          <div className="split-img-inner">
            <Image
              src="/images/ingredientes-fork.png"
              alt="Ingredientes naturales de Poppy"
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
              color: 'var(--white)',
              opacity: 0.5,
            }}
          >
            Miel ecológica &middot; aceite de coco &middot; especias
          </span>
        </div>
      </div>

      {/* ── QUOTE ── */}
      <section className="quote-section fi">
        <p className="quote-text">
          &laquo;Si no es buena para mí, no es <mark>buena para ti</mark>&raquo;
        </p>
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,.6)',
            fontWeight: 400,
          }}
        >
          by Poppy
        </p>
      </section>

      {/* ── SPLIT: La historia ── */}
      <div className="split fi">
        <div className="split-img">
          <div className="split-img-inner">
            <Image
              src="/images/freepik__haz-que-tenga-el-pelo-recogido-en-una-coleta-baja-__23407.png"
              alt="Pilar preparando granola"
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
            Málaga, España
          </span>
        </div>
        <div className="split-body">
          <span className="section-label">La historia</span>
          <h2 className="split-title">
            De la cocina de casa <em>al mundo</em>
          </h2>
          <p className="split-text">
            Un día el médico me dijo que tenía que eliminar el gluten para siempre. Entonces,
            empecé a hacer mi propia granola: sin azúcares refinados, sin aditivos, con los frutos
            secos remojados para cuidar la digestión. La compartí con familia y amigos. Pasó lo que
            pasa cuando algo está realmente bueno: todos querían más.
          </p>
          <Link href="/nosotros" className="btn-text">
            Leer la historia completa
          </Link>
        </div>
      </div>

      {/* ── SUBSCRIPTION SPLIT ── */}
      <div className="split fi">
        <div className="split-body" style={{ background: 'var(--off)' }}>
          <span className="section-label">Suscripción</span>
          <h2 className="split-title">
            Para quienes no quieren <em>quedarse sin</em>
          </h2>
          <div className="sub-stats">
            <div>
              <div className="stat-val">&minus;15%</div>
              <div className="stat-lbl">cada pedido</div>
            </div>
            <div>
              <div className="stat-val">6</div>
              <div className="stat-lbl">bolsas al mes</div>
            </div>
            <div>
              <div className="stat-val">0</div>
              <div className="stat-lbl">sin compromiso</div>
            </div>
          </div>
          <p className="split-text">
            Entrega en tu puerta, cancela cuando quieras. El 15% que ahorras es mi modo de decir
            gracias.
          </p>
          <Link href="/suscripcion" className="btn-pill">
            Empezar la suscripción
          </Link>
        </div>
        <div
          className="split-img"
          style={{
            background: 'linear-gradient(150deg, #5a3e38 0%, #3e2820 100%)',
            minHeight: '500px',
          }}
        >
          <div className="split-img-inner">
            <Image
              src="/images/bottomimage.png"
              alt="Granola Poppy suscripción"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Client-side IntersectionObserver */}
      <HomeClient />
    </>
  );
}
