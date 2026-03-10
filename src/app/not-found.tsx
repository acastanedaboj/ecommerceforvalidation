import Link from 'next/link';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" style={{ paddingTop: '140px' }}>
      <div className="text-center">
        {/* 404 illustration */}
        <div className="mb-8">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '120px', color: 'rgba(105,79,72,.15)' }}>404</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '16px' }}>
          ¡Ups! Página no encontrada
        </h1>

        <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px', lineHeight: 1.85 }}>
          Parece que esta página se ha perdido entre los copos de avena.
          No te preocupes, te ayudamos a encontrar lo que buscas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-pill inline-flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            volver al inicio
          </Link>

          <Link
            href="/tienda"
            className="btn-pill inline-flex items-center justify-center"
            style={{ borderColor: 'rgba(0,0,0,.15)' }}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            ver productos
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(0,0,0,.07)' }}>
          <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.35)', marginBottom: '16px' }}>
            ¿Buscas algo específico? Prueba estos enlaces:
          </p>
          <div className="flex flex-wrap justify-center gap-4" style={{ fontSize: '13px' }}>
            <Link href="/faq" style={{ color: 'var(--brown)', textDecoration: 'none' }}>
              Preguntas frecuentes
            </Link>
            <Link href="/contacto" style={{ color: 'var(--brown)', textDecoration: 'none' }}>
              Contacto
            </Link>
            <Link href="/blog" style={{ color: 'var(--brown)', textDecoration: 'none' }}>
              Blog & recetas
            </Link>
            <Link href="/suscripcion" style={{ color: 'var(--brown)', textDecoration: 'none' }}>
              Suscripción
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
