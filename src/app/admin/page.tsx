'use client';

import { useEffect, useState } from 'react';
import { Loader2, Truck, CheckCircle, XCircle, ChevronDown, ChevronUp, MapPin, RefreshCw } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  totalPriceInCents: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  customerName: string | null;
  customerEmail: string;
  customerPhone: string | null;
  shippingName: string | null;
  shippingLine1: string | null;
  shippingLine2: string | null;
  shippingCity: string | null;
  shippingPostal: string | null;
  shippingCountry: string | null;
  totalInCents: number;
  discountCode: string | null;
  createdAt: string;
  items: OrderItem[];
}

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  PENDING:    { label: 'Pendiente',   bg: '#fef9c3', color: '#854d0e' },
  CONFIRMED:  { label: 'Confirmado',  bg: '#dbeafe', color: '#1e40af' },
  PROCESSING: { label: 'Preparando', bg: '#e0e7ff', color: '#3730a3' },
  SHIPPED:    { label: 'Enviado',     bg: '#d1fae5', color: '#065f46' },
  DELIVERED:  { label: 'Entregado',  bg: '#bbf7d0', color: '#14532d' },
  CANCELLED:  { label: 'Cancelado',  bg: '#fee2e2', color: '#991b1b' },
};

const CARRIERS = ['Correos', 'MRW', 'SEUR', 'GLS', 'Nacex', 'Otro'];

function ShipForm({ order, onShipped }: { order: Order; onShipped: () => void }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('Correos');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingNumber.trim()) { setError('Introduce el número de seguimiento'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/orders/${order.orderNumber}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber, carrier, estimatedDelivery }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Error'); }
      onShipped();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al marcar como enviado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4" style={{ background: 'var(--off)', border: '1px solid rgba(0,0,0,.06)' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--brown)' }}>
        Marcar como enviado — {order.customerName} ({order.customerEmail})
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(17,17,17,.4)', display: 'block', marginBottom: '4px' }}>
            Transportista
          </label>
          <select
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            className="w-full px-3 py-2 text-sm"
            style={{ border: '1px solid rgba(0,0,0,.15)', background: 'white' }}
          >
            {CARRIERS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(17,17,17,.4)', display: 'block', marginBottom: '4px' }}>
            Nº seguimiento *
          </label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="ES123456789ES"
            className="w-full px-3 py-2 text-sm"
            style={{ border: '1px solid rgba(0,0,0,.15)' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(17,17,17,.4)', display: 'block', marginBottom: '4px' }}>
            Entrega estimada
          </label>
          <input
            type="text"
            value={estimatedDelivery}
            onChange={(e) => setEstimatedDelivery(e.target.value)}
            placeholder="Lunes 23 de marzo"
            className="w-full px-3 py-2 text-sm"
            style={{ border: '1px solid rgba(0,0,0,.15)' }}
          />
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white"
          style={{ background: 'var(--brown)', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
          Enviar pedido y notificar al cliente
        </button>
      </div>
    </form>
  );
}

function PickupForm({ order, onNotified }: { order: Order; onNotified: () => void }) {
  const [pickupNote, setPickupNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/orders/${order.orderNumber}/ready-for-pickup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pickupNote }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Error'); }
      onNotified();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al notificar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4" style={{ background: '#fdfcd0', border: '1px solid #e8dc3d' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#5a4a40' }}>
        Notificar recogida — {order.customerName} ({order.customerEmail})
      </p>
      <div>
        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(17,17,17,.4)', display: 'block', marginBottom: '4px' }}>
          Nota adicional (opcional)
        </label>
        <input
          type="text"
          value={pickupNote}
          onChange={(e) => setPickupNote(e.target.value)}
          placeholder="Ej: Puedes pasar hoy entre las 17h y las 20h"
          className="w-full px-3 py-2 text-sm"
          style={{ border: '1px solid rgba(0,0,0,.15)', background: 'white' }}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-3">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
          style={{ background: '#5a4a40', color: 'white', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
          Avisar al cliente que puede venir a recoger
        </button>
      </div>
    </form>
  );
}

function ReconcileForm({ onReconciled }: { onReconciled: (orderNumber: string) => void }) {
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId.trim()) { setError('Introduce el ID de sesión de Stripe'); return; }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/reconcile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId.trim() }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Error');
      setSuccess(`Pedido importado: #${d.orderNumber}`);
      setSessionId('');
      onReconciled(d.orderNumber);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al importar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', marginBottom: '16px' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
        style={{ fontSize: '13px', fontWeight: 500 }}
      >
        <span className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" style={{ color: 'rgba(17,17,17,.4)' }} />
          Importar pedido desde Stripe
        </span>
        {open ? <ChevronUp className="w-4 h-4" style={{ color: 'rgba(17,17,17,.4)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(17,17,17,.4)' }} />}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="px-4 pb-4">
          <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.4)', marginBottom: '12px' }}>
            Usa esto para importar pedidos pagados en Stripe que no se guardaron en la base de datos.
            El ID lo encuentras en el Dashboard de Stripe → Pagos → detalle del pago → Metadata → &quot;Checkout session&quot;.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="cs_live_..."
              className="flex-1 px-3 py-2 text-sm"
              style={{ border: '1px solid rgba(0,0,0,.15)' }}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white"
              style={{ background: 'var(--brown)', opacity: loading ? 0.7 : 1, whiteSpace: 'nowrap' }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Importar
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </form>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [shipped, setShipped] = useState<Set<string>>(new Set());
  const [pickupNotified, setPickupNotified] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function handleShipped(orderNumber: string) {
    setShipped((prev) => { const next = new Set(prev); next.add(orderNumber); return next; });
    setExpanded(null);
    setOrders((prev) =>
      prev.map((o) => o.orderNumber === orderNumber ? { ...o, status: 'SHIPPED' } : o)
    );
  }

  function handlePickupNotified(orderNumber: string) {
    setPickupNotified((prev) => { const next = new Set(prev); next.add(orderNumber); return next; });
    setExpanded(null);
    setOrders((prev) =>
      prev.map((o) => o.orderNumber === orderNumber ? { ...o, status: 'PROCESSING' } : o)
    );
  }

  function handleReconciled(_orderNumber: string) {
    // Reload orders to show the newly imported one
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setOrders(data); });
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--brown)' }} />
      </div>
    );
  }

  return (
    <div>
      <ReconcileForm onReconciled={handleReconciled} />

      {orders.length === 0 ? (
        <p style={{ color: 'rgba(17,17,17,.4)', fontSize: '14px' }}>No hay pedidos aún.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const st = STATUS_LABELS[order.status] || { label: order.status, bg: '#f3f4f6', color: '#374151' };
            const isExpanded = expanded === order.orderNumber;
            const justShipped = shipped.has(order.orderNumber);
            const justPickupNotified = pickupNotified.has(order.orderNumber);
            const isLocalDelivery = !order.shippingLine1;
            const canShip = ['CONFIRMED', 'PROCESSING'].includes(order.status) && !justShipped && !isLocalDelivery;
            const canNotifyPickup = order.status === 'CONFIRMED' && !justPickupNotified && isLocalDelivery;

            return (
              <div key={order.id} style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)' }}>
                {/* Row */}
                <div className="flex flex-wrap items-center gap-3 p-4">
                  {/* Order info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span style={{ fontWeight: 600, fontSize: '14px' }}>#{order.orderNumber}</span>
                      <span
                        className="px-2 py-0.5 text-xs font-medium rounded-full"
                        style={{ background: st.bg, color: st.color }}
                      >
                        {st.label}
                      </span>
                      {justShipped && (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" /> Email enviado
                        </span>
                      )}
                      {justPickupNotified && (
                        <span className="flex items-center gap-1 text-xs text-yellow-700">
                          <MapPin className="w-3 h-3" /> Notificado
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)' }}>
                      {formatDate(order.createdAt)} · {order.customerName || order.customerEmail}
                      {order.discountCode && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">{order.discountCode}</span>}
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.4)', marginTop: '2px' }}>
                      {order.items.map((i) => `${i.productName} x${i.quantity}`).join(', ')}
                    </p>
                  </div>

                  {/* Total + address */}
                  <div className="text-right">
                    <p style={{ fontWeight: 700, fontSize: '16px' }}>{formatPrice(order.totalInCents)}</p>
                    {order.shippingLine1 ? (
                      <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.4)' }}>
                        {order.shippingLine1}, {order.shippingPostal} {order.shippingCity}
                      </p>
                    ) : (
                      <p style={{ fontSize: '12px', color: '#d97706' }}>📍 Entrega en mano</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {canShip && (
                      <button
                        onClick={() => setExpanded(isExpanded ? null : order.orderNumber)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium"
                        style={{ background: 'var(--brown)', color: 'white' }}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Enviar
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                    {canNotifyPickup && (
                      <button
                        onClick={() => setExpanded(isExpanded ? null : order.orderNumber)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium"
                        style={{ background: '#5a4a40', color: 'white' }}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Listo para recoger
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                    {order.status === 'SHIPPED' && !justShipped && (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" /> Enviado
                      </span>
                    )}
                    {order.status === 'PROCESSING' && isLocalDelivery && !justPickupNotified && (
                      <span className="flex items-center gap-1 text-sm text-yellow-700">
                        <MapPin className="w-4 h-4" /> Avisado
                      </span>
                    )}
                    {order.status === 'CANCELLED' && (
                      <span className="flex items-center gap-1 text-sm text-red-500">
                        <XCircle className="w-4 h-4" /> Cancelado
                      </span>
                    )}
                  </div>
                </div>

                {/* Ship form */}
                {isExpanded && canShip && (
                  <ShipForm order={order} onShipped={() => handleShipped(order.orderNumber)} />
                )}

                {/* Pickup form */}
                {isExpanded && canNotifyPickup && (
                  <PickupForm order={order} onNotified={() => handlePickupNotified(order.orderNumber)} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
