import Link from 'next/link';
import { Home, ShoppingBag, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        {/* 404 illustration */}
        <div className="mb-8">
          <span className="font-display text-9xl text-primary-200">404</span>
        </div>

        <h1 className="mb-4 font-display text-3xl text-neutral-900 md:text-4xl">
          ¡Ups! Página no encontrada
        </h1>

        <p className="mx-auto mb-8 max-w-md text-neutral-600">
          Parece que esta página se ha perdido entre los copos de avena. No te preocupes, te
          ayudamos a encontrar lo que buscas.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary inline-flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>

          <Link href="/tienda" className="btn-outline inline-flex items-center justify-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Ver productos
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="mb-4 text-sm text-neutral-500">
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
