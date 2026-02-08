'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  packSize: number | null;
  totalPriceInCents: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  totalInCents: number;
  createdAt: string;
  items: OrderItem[];
}

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  CONFIRMED: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800' },
  PROCESSING: { label: 'Procesando', color: 'bg-blue-100 text-blue-800' },
  SHIPPED: { label: 'Enviado', color: 'bg-purple-100 text-purple-800' },
  DELIVERED: { label: 'Entregado', color: 'bg-green-100 text-green-800' },
  CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
};

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders || []);
        } else {
          setError(data.error || 'Error al cargar los pedidos');
        }
      } catch {
        setError('Error de conexión');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-6 h-6 text-earth-600" strokeWidth={1.5} />
          <h2 className="text-xl font-serif text-stone-800">Mis Pedidos</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-earth-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-earth-600" strokeWidth={1.5} />
        <h2 className="text-xl font-serif text-stone-800">Mis Pedidos</h2>
      </div>

      {error ? (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-earth-600 hover:underline"
          >
            Intentar de nuevo
          </button>
        </div>
      ) : orders.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-earth-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium text-stone-800 mb-2">
            Aún no tienes pedidos
          </h3>
          <p className="text-stone-500 mb-6 max-w-sm mx-auto">
            Cuando realices tu primera compra, podrás ver aquí el estado de tus pedidos
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 bg-earth-600 text-[#ffffec] px-6 py-3 hover:bg-earth-700 transition-colors"
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
                  <p className="font-medium text-stone-800">Pedido #{order.orderNumber}</p>
                  <p className="text-sm text-stone-500">{formatDate(order.createdAt)}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusLabels[order.status]?.color || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {statusLabels[order.status]?.label || order.status}
                </span>
              </div>

              {/* Order items preview */}
              <div className="text-sm text-stone-600 mb-3">
                {order.items.slice(0, 2).map((item, idx) => (
                  <span key={item.id}>
                    {idx > 0 && ', '}
                    {item.productName} x{item.quantity}
                  </span>
                ))}
                {order.items.length > 2 && (
                  <span className="text-stone-400"> y {order.items.length - 2} más</span>
                )}
              </div>

              <div className="border-t border-cream-100 pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-stone-600">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)} producto
                    {order.items.reduce((acc, item) => acc + item.quantity, 0) !== 1 ? 's' : ''}
                  </p>
                  <p className="font-medium text-stone-800">
                    {formatPrice(order.totalInCents)}
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
