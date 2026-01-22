import Link from 'next/link';
import { Home, ShoppingBag, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 illustration */}
        <div className="mb-8">
          <span className="text-9xl font-display font-bold text-primary-200">404</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
          ¡Ups! Página no encontrada
        </h1>

        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          Parece que esta página se ha perdido entre los copos de avena.
          No te preocupes, te ayudamos a encontrar lo que buscas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>

          <Link
            href="/tienda"
            className="btn-outline inline-flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Ver productos
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">
            ¿Buscas algo específico? Prueba estos enlaces:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/faq" className="text-primary-600 hover:underline">
              Preguntas frecuentes
            </Link>
            <Link href="/contacto" className="text-primary-600 hover:underline">
              Contacto
            </Link>
            <Link href="/blog" className="text-primary-600 hover:underline">
              Blog & Recetas
            </Link>
            <Link href="/suscripcion" className="text-primary-600 hover:underline">
              Suscripción
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
