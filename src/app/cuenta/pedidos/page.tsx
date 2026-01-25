import { Package, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mis Pedidos | Poppy',
  description: 'Consulta el historial de tus pedidos',
};

// TODO: This would fetch orders from the database
// For now, show empty state since we're using JWT without database
const orders: Array<{
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}> = [];

const statusLabels = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Procesando', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800' },
};

export default function PedidosPage() {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-earth-600" strokeWidth={1.5} />
        <h2 className="text-xl font-serif text-stone-800">Mis Pedidos</h2>
      </div>

      {orders.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-earth-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium text-stone-800 mb-2">
            Aun no tienes pedidos
          </h3>
          <p className="text-stone-500 mb-6 max-w-sm mx-auto">
            Cuando realices tu primera compra, podras ver aqui el estado de tus pedidos
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 bg-earth-600 text-white px-6 py-3 rounded-full hover:bg-earth-700 transition-colors"
          >
            <span>Explorar productos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        // Orders list
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-cream-200 rounded-xl p-4 hover:shadow-soft transition-shadow"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div>
                  <p className="font-medium text-stone-800">Pedido #{order.id}</p>
                  <p className="text-sm text-stone-500">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusLabels[order.status].color
                  }`}
                >
                  {statusLabels[order.status].label}
                </span>
              </div>
              <div className="border-t border-cream-100 pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-stone-600">
                    {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                  </p>
                  <p className="font-medium text-stone-800">
                    {order.total.toFixed(2).replace('.', ',')} EUR
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
