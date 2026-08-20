import { Heart, Sparkles, ArrowRight, Calendar, Package } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mis Suscripciones | Poppy',
  description: 'Gestiona tus suscripciones de granola Poppy',
};

// TODO: This would fetch subscriptions from Stripe/database
// For now, show empty state since we're using JWT without database
const subscriptions: Array<{
  id: string;
  product: string;
  frequency: string;
  nextDelivery: string;
  status: 'active' | 'paused' | 'cancelled';
  price: number;
}> = [];

const statusLabels = {
  active: { label: 'Activa', color: 'bg-green-100 text-green-800' },
  paused: { label: 'Pausada', color: 'bg-yellow-100 text-yellow-800' },
  cancelled: { label: 'Cancelada', color: 'bg-red-100 text-red-800' },
};

export default function SuscripcionesPage() {
  return (
    <div className="space-y-6">
      {/* Main card */}
      <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <Heart className="h-6 w-6 text-earth-600" strokeWidth={1.5} />
          <h2 className="font-serif text-xl text-stone-800">Mis Suscripciones</h2>
        </div>

        {subscriptions.length === 0 ? (
          // Empty state
          <div className="py-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cream-100">
              <Sparkles className="h-10 w-10 text-earth-400" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 text-lg font-medium text-stone-800">
              No tienes suscripciones activas
            </h3>
            <p className="mx-auto mb-6 max-w-sm text-stone-500">
              Suscribete y recibe tu granola favorita cada mes con un 15% de descuento
            </p>
            <Link
              href="/suscripcion"
              className="inline-flex items-center gap-2 rounded-full bg-earth-600 px-6 py-3 text-[#ffffec] transition-colors hover:bg-earth-700"
            >
              <span>Ver opciones de suscripcion</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          // Subscriptions list
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="rounded-xl border border-cream-200 p-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-stone-800">{sub.product}</p>
                    <p className="text-sm text-stone-500">{sub.frequency}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      statusLabels[sub.status].color
                    }`}
                  >
                    {statusLabels[sub.status].label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 border-t border-cream-100 pt-4 text-sm text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Proxima entrega: {sub.nextDelivery}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>{sub.price.toFixed(2).replace('.', ',')} EUR/mes</span>
                  </div>
                </div>
                {sub.status === 'active' && (
                  <div className="mt-4 flex gap-3">
                    <button className="text-sm text-stone-600 underline hover:text-stone-800">
                      Pausar
                    </button>
                    <button className="text-sm text-red-600 underline hover:text-red-800">
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Benefits card */}
      <div className="rounded-2xl bg-gradient-to-br from-earth-50 to-cream-100 p-6 sm:p-8">
        <h3 className="mb-4 font-serif text-lg text-stone-800">Ventajas de suscribirte</h3>
        <ul className="space-y-3 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-earth-200">
              <span className="text-sm text-earth-700">1</span>
            </span>
            <span>
              <strong className="text-stone-800">15% de descuento</strong> en cada envio
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-earth-200">
              <span className="text-sm text-earth-700">2</span>
            </span>
            <span>
              <strong className="text-stone-800">Envio gratuito</strong> siempre incluido
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-earth-200">
              <span className="text-sm text-earth-700">3</span>
            </span>
            <span>
              <strong className="text-stone-800">Flexibilidad total</strong> - pausa o cancela
              cuando quieras
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
