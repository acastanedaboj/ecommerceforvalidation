import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

function ConfirmacionContent() {
  return (
    <div style={{ paddingTop: '140px', paddingBottom: '96px' }}>
      <div className="container-custom max-w-2xl">
        <div className="text-center">
          {/* Success icon */}
          <div className="mb-6">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent-100">
              <CheckCircle className="h-10 w-10 text-accent-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-4 font-display text-3xl text-neutral-900 md:text-4xl">
            ¡Gracias por tu pedido!
          </h1>
          <p className="mb-8 text-lg text-neutral-600">
            Hemos recibido tu pedido correctamente y estamos preparándolo con mucho cariño.
          </p>

          {/* Order info card */}
          <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
            <h2 className="mb-4 text-neutral-900">¿Qué pasa ahora?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <Mail className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-neutral-900">Email de confirmación</p>
                  <p className="text-sm text-neutral-600">
                    Recibirás un email con los detalles de tu pedido en los próximos minutos.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <Package className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-neutral-900">Preparación y envío</p>
                  <p className="text-sm text-neutral-600">
                    Tu pedido se enviará en 1-2 días laborables. Te enviaremos el número de
                    seguimiento cuando esté en camino.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery estimate */}
          <div className="mb-8 rounded-xl bg-primary-50 p-6">
            <p className="text-primary-800">
              <span>Entrega estimada:</span> 4-6 días laborables para Península
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/tienda" className="btn-primary">
              Seguir comprando
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/cuenta" className="btn-outline">
              Ver mis pedidos
            </Link>
          </div>

          {/* Contact info */}
          <p className="mt-8 text-sm text-neutral-500">
            ¿Tienes alguna pregunta? Escríbenos a{' '}
            <a href="mailto:hola@poppy.es" className="text-primary-600 hover:underline">
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
        <div style={{ paddingTop: '140px', paddingBottom: '96px' }}>
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
