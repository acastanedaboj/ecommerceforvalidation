import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

function ConfirmacionContent() {
  return (
    <div className="section">
      <div className="container-custom max-w-2xl">
        <div className="text-center">
          {/* Success icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-100 rounded-full">
              <CheckCircle className="w-10 h-10 text-accent-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
            ¡Gracias por tu pedido!
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Hemos recibido tu pedido correctamente y estamos preparándolo con mucho cariño.
          </p>

          {/* Order info card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-8 text-left">
            <h2 className="text-neutral-900 mb-4">¿Qué pasa ahora?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Email de confirmación</p>
                  <p className="text-sm text-neutral-600">
                    Recibirás un email con los detalles de tu pedido en los próximos minutos.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Preparación y envío</p>
                  <p className="text-sm text-neutral-600">
                    Tu pedido se enviará en 1-2 días laborables. Te enviaremos el número de
                    seguimiento cuando esté en camino.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery estimate */}
          <div className="bg-primary-50 rounded-xl p-6 mb-8">
            <p className="text-primary-800">
              <span className="font-semibold">Entrega estimada:</span> 2-4 días laborables
              para Península
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda" className="btn-primary">
              Seguir comprando
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/cuenta" className="btn-outline">
              Ver mis pedidos
            </Link>
          </div>

          {/* Contact info */}
          <p className="mt-8 text-sm text-neutral-500">
            ¿Tienes alguna pregunta? Escríbenos a{' '}
            <a
              href="mailto:hola@poppy.es"
              className="text-primary-600 hover:underline"
            >
              hola@poppy.es
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense
      fallback={
        <div className="section">
          <div className="container-custom text-center">
            <p>Cargando...</p>
          </div>
        </div>
      }
    >
      <ConfirmacionContent />
    </Suspense>
  );
}
