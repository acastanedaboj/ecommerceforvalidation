import { Heart, Sparkles, ArrowRight, Calendar, Package } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mis Suscripciones | Nalu',
  description: 'Gestiona tus suscripciones de granola Nalu',
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
      <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-earth-600" strokeWidth={1.5} />
          <h2 className="text-xl font-serif text-stone-800">Mis Suscripciones</h2>
        </div>

        {subscriptions.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-earth-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-stone-800 mb-2">
              No tienes suscripciones activas
            </h3>
            <p className="text-stone-500 mb-6 max-w-sm mx-auto">
              Suscribete y recibe tu granola favorita cada mes con un 15% de descuento
            </p>
            <Link
              href="/suscripcion"
              className="inline-flex items-center gap-2 bg-earth-600 text-white px-6 py-3 rounded-full hover:bg-earth-700 transition-colors"
            >
              <span>Ver opciones de suscripcion</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          // Subscriptions list
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="border border-cream-200 rounded-xl p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-medium text-stone-800">{sub.product}</p>
                    <p className="text-sm text-stone-500">{sub.frequency}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusLabels[sub.status].color
                    }`}
                  >
                    {statusLabels[sub.status].label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-stone-600 border-t border-cream-100 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Proxima entrega: {sub.nextDelivery}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>{sub.price.toFixed(2).replace('.', ',')} EUR/mes</span>
                  </div>
                </div>
                {sub.status === 'active' && (
                  <div className="flex gap-3 mt-4">
                    <button className="text-sm text-stone-600 hover:text-stone-800 underline">
                      Pausar
                    </button>
                    <button className="text-sm text-red-600 hover:text-red-800 underline">
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
      <div className="bg-gradient-to-br from-earth-50 to-cream-100 rounded-2xl p-6 sm:p-8">
        <h3 className="font-serif text-lg text-stone-800 mb-4">
          Ventajas de suscribirte
        </h3>
        <ul className="space-y-3 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-earth-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-earth-700 text-sm">1</span>
            </span>
            <span><strong className="text-stone-800">15% de descuento</strong> en cada envio</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-earth-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-earth-700 text-sm">2</span>
            </span>
            <span><strong className="text-stone-800">Envio gratuito</strong> siempre incluido</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-earth-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-earth-700 text-sm">3</span>
            </span>
            <span><strong className="text-stone-800">Flexibilidad total</strong> - pausa o cancela cuando quieras</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
