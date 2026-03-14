'use client';

import { useEffect, useState } from 'react';
import {
  Loader2, Truck, CheckCircle, XCircle, ChevronDown, ChevronUp,
  MapPin, RefreshCw, Phone, Mail, ExternalLink, Package, Copy, Check,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  totalPriceInCents: number;
  unitPriceInCents: number;
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
  subtotalInCents: number;
  shippingInCents: number;
  discountInCents: number;
  discountCode: string | null;
  carrier: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  estimatedDelivery: string | null;
  createdAt: string;
  shippedAt: string | null;
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

const TRACKING_URLS: Record<string, (n: string) => string> = {
  Correos: (n) => `https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=${n}`,
  MRW: (n) => `https://www.mrw.es/seguimiento_envios/buscar_informacion_envio.aspx?nif=&referencia=${n}`,
  SEUR: (n) => `https://www.seur.com/seur/es/particular/herramientas/seguimiento-de-envios.do?refExpedicion=${n}`,
  GLS: (n) => `https://gls-group.eu/ES/es/seguimiento-envio?match=${n}`,
  Nacex: (n) => `https://www.nacex.es/seguimiento.do?agencia_origen=&num_albaran=${n}`,
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      style={{ background: 'none', border: 'none', padding: '2px', color: 'rgba(17,17,17,.3)', cursor: 'pointer' }}
      title="Copiar"
    >
      {copied ? <Check className="w-3 h-3" style={{ color: '#16a34a' }} /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

function ShipForm({ order, onShipped }: {
  order: Order;
  onShipped: (data: { carrier: string; trackingNumber: string; trackingUrl?: string; estimatedDelivery?: string }) => void;
}) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('Correos');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingNumber.trim()) { setError('Introduce el número de seguimiento'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`/api/admin/orders/${order.orderNumber}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber, carrier, estimatedDelivery }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Error'); }
      const fn = TRACKING_URLS[carrier];
      onShipped({ carrier, trackingNumber, trackingUrl: fn ? fn(trackingNumber) : undefined, estimatedDelivery: estimatedDelivery || undefined });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4" style={{ background: 'var(--off)', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(17,17,17,.4)', display: 'block', marginBottom: '4px' }}>Transportista</label>
          <select value={carrier} onChange={(e) => setCarrier(e.target.value)} className="w-full px-3 py-2 text-sm" style={{ border: '1px solid rgba(0,0,0,.15)', background: 'white' }}>
            {CARRIERS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(17,17,17,.4)', display: 'block', marginBottom: '4px' }}>Nº seguimiento *</label>
          <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="ES123456789ES" className="w-full px-3 py-2 text-sm" style={{ border: '1px solid rgba(0,0,0,.15)' }} />
        </div>
        <div>
          <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(17,17,17,.4)', display: 'block', marginBottom: '4px' }}>Entrega estimada</label>
          <input type="text" value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)} placeholder="Lunes 23 de marzo" className="w-full px-3 py-2 text-sm" style={{ border: '1px solid rgba(0,0,0,.15)' }} />
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-3">
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white" style={{ background: 'var(--brown)', opacity: loading ? 0.7 : 1 }}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
          Marcar como enviado y notificar al cliente
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
    setLoading(true); setError('');
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
    <form onSubmit={handleSubmit} className="p-4" style={{ background: '#fdfcd0', borderTop: '1px solid #e8dc3d' }}>
      <div>
        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(17,17,17,.4)', display: 'block', marginBottom: '4px' }}>Nota adicional (opcional)</label>
        <input type="text" value={pickupNote} onChange={(e) => setPickupNote(e.target.value)} placeholder="Ej: Puedes pasar hoy entre las 17h y las 20h" className="w-full px-3 py-2 text-sm" style={{ border: '1px solid rgba(0,0,0,.15)', background: 'white' }} />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-3">
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium" style={{ background: '#5a4a40', color: 'white', opacity: loading ? 0.7 : 1 }}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
          Avisar al cliente que puede venir a recoger
        </button>
      </div>
    </form>
  );
}

function ReconcileForm({ onReconciled }: { onReconciled: () => void }) {
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId.trim()) { setError('Introduce el ID'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await fetch('/api/admin/reconcile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: sessionId.trim() }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Error');
      setSuccess(`Importado: #${d.orderNumber}`);
      setSessionId('');
      onReconciled();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al importar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: 'white', border: '1px solid rgba(0,0,0,.07)', marginBottom: '12px' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left" style={{ fontSize: '13px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
        <span className="flex items-center gap-2"><RefreshCw className="w-3.5 h-3.5" style={{ color: 'rgba(17,17,17,.4)' }} />Importar pedido desde Stripe</span>
        {open ? <ChevronUp className="w-3.5 h-3.5" style={{ color: 'rgba(17,17,17,.4)' }} /> : <ChevronDown className="w-3.5 h-3.5" style={{ color: 'rgba(17,17,17,.4)' }} />}
      </button>
      {open && (
        <form onSubmit={handleSubmit} className="px-4 pb-4">
          <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.4)', marginBottom: '12px' }}>
            Pedidos pagados en Stripe sin guardar en BD. ID en Stripe → Pagos → detalle → &quot;Checkout session&quot;.
          </p>
          <div className="flex gap-2">
            <input type="text" value={sessionId} onChange={(e) => setSessionId(e.target.value)} placeholder="cs_live_..." className="flex-1 px-3 py-2 text-sm" style={{ border: '1px solid rgba(0,0,0,.15)' }} />
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white" style={{ background: 'var(--brown)', opacity: loading ? 0.7 : 1, whiteSpace: 'nowrap' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Importar
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </form>
      )}
    </div>
  );
}

function OrderDetail({ order }: { order: Order }) {
  const isLocalDelivery = !order.shippingLine1;

  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,.06)', fontSize: '13px' }}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Cliente */}
        <div className="p-4" style={{ borderRight: '1px solid rgba(0,0,0,.05)' }}>
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(17,17,17,.3)', marginBottom: '10px', fontWeight: 600 }}>Cliente</p>
          <p style={{ fontWeight: 700, color: 'var(--dark)', marginBottom: '6px' }}>{order.customerName || '—'}</p>
          <div className="space-y-2">
            <p className="flex items-center gap-1.5" style={{ color: 'rgba(17,17,17,.6)' }}>
              <Mail className="w-3 h-3 flex-shrink-0" />
              <a href={`mailto:${order.customerEmail}`} style={{ color: 'inherit', textDecoration: 'none' }}>{order.customerEmail}</a>
              <CopyButton text={order.customerEmail} />
            </p>
            {order.customerPhone && (
              <p className="flex items-center gap-1.5" style={{ color: 'rgba(17,17,17,.6)' }}>
                <Phone className="w-3 h-3 flex-shrink-0" />
                <a href={`tel:${order.customerPhone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{order.customerPhone}</a>
                <CopyButton text={order.customerPhone} />
              </p>
            )}
          </div>
        </div>

        {/* Entrega */}
        <div className="p-4" style={{ borderRight: '1px solid rgba(0,0,0,.05)' }}>
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(17,17,17,.3)', marginBottom: '10px', fontWeight: 600 }}>Dirección de entrega</p>
          {isLocalDelivery ? (
            <p className="flex items-center gap-1.5" style={{ color: '#d97706', fontWeight: 600 }}>
              <MapPin className="w-3.5 h-3.5" /> Entrega en mano — Málaga centro
            </p>
          ) : (
            <div style={{ color: 'rgba(17,17,17,.65)', lineHeight: '1.7' }}>
              <p style={{ fontWeight: 700, color: 'var(--dark)' }}>{order.shippingName || order.customerName}</p>
              <p>{order.shippingLine1}</p>
              {order.shippingLine2 && <p>{order.shippingLine2}</p>}
              <p>{order.shippingPostal} {order.shippingCity}</p>
              <p style={{ color: 'rgba(17,17,17,.4)' }}>{order.shippingCountry}</p>
            </div>
          )}
        </div>

        {/* Productos */}
        <div className="p-4">
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(17,17,17,.3)', marginBottom: '10px', fontWeight: 600 }}>Productos</p>
          <div className="space-y-1.5 mb-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-2">
                <span style={{ color: 'rgba(17,17,17,.7)', flex: 1 }}>
                  <span style={{ fontWeight: 700 }}>×{item.quantity}</span> {item.productName}
                </span>
                <span style={{ color: 'rgba(17,17,17,.4)', whiteSpace: 'nowrap' }}>{formatPrice(item.totalPriceInCents)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,.06)', paddingTop: '8px', lineHeight: '1.8' }}>
            {order.discountInCents > 0 && (
              <div className="flex justify-between" style={{ color: 'rgba(17,17,17,.4)' }}>
                <span>Descuento{order.discountCode ? ` (${order.discountCode})` : ''}</span>
                <span>−{formatPrice(order.discountInCents)}</span>
              </div>
            )}
            <div className="flex justify-between" style={{ color: 'rgba(17,17,17,.4)' }}>
              <span>Envío</span>
              <span>{order.shippingInCents === 0 ? 'Gratis' : formatPrice(order.shippingInCents)}</span>
            </div>
            <div className="flex justify-between" style={{ fontWeight: 700, color: 'var(--dark)' }}>
              <span>Total</span>
              <span>{formatPrice(order.totalInCents)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking row */}
      {order.status === 'SHIPPED' && order.trackingNumber && (
        <div className="flex flex-wrap gap-6 px-4 py-3" style={{ background: '#f0fdf4', borderTop: '1px solid rgba(0,0,0,.06)', fontSize: '13px' }}>
          <div>
            <span style={{ color: 'rgba(17,17,17,.4)' }}>Transportista </span>
            <span style={{ fontWeight: 700 }}>{order.carrier}</span>
          </div>
          <div className="flex items-center gap-1">
            <span style={{ color: 'rgba(17,17,17,.4)' }}>Seguimiento </span>
            <span style={{ fontWeight: 700 }}>{order.trackingNumber}</span>
            <CopyButton text={order.trackingNumber} />
            {order.trackingUrl && (
              <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 ml-1" style={{ color: '#16a34a', fontSize: '12px', textDecoration: 'none' }}>
                <ExternalLink className="w-3 h-3" /> Rastrear
              </a>
            )}
          </div>
          {order.estimatedDelivery && (
            <div>
              <span style={{ color: 'rgba(17,17,17,.4)' }}>Entrega estimada </span>
              <span style={{ fontWeight: 700 }}>{order.estimatedDelivery}</span>
            </div>
          )}
          {order.shippedAt && (
            <div>
              <span style={{ color: 'rgba(17,17,17,.4)' }}>Enviado el </span>
              <span style={{ fontWeight: 700 }}>{new Date(order.shippedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showShipForm, setShowShipForm] = useState<string | null>(null);
  const [showPickupForm, setShowPickupForm] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function toggleExpanded(orderNumber: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(orderNumber)) { next.delete(orderNumber); } else { next.add(orderNumber); }
      return next;
    });
  }

  function handleShipped(orderNumber: string, tracking: { carrier: string; trackingNumber: string; trackingUrl?: string; estimatedDelivery?: string }) {
    setShowShipForm(null);
    setOrders((prev) => prev.map((o) => o.orderNumber === orderNumber
      ? { ...o, status: 'SHIPPED', shippedAt: new Date().toISOString(), carrier: tracking.carrier, trackingNumber: tracking.trackingNumber, trackingUrl: tracking.trackingUrl || null, estimatedDelivery: tracking.estimatedDelivery || null }
      : o
    ));
    setExpanded((prev) => { const next = new Set(prev); next.add(orderNumber); return next; });
  }

  function handlePickupNotified(orderNumber: string) {
    setShowPickupForm(null);
    setOrders((prev) => prev.map((o) => o.orderNumber === orderNumber ? { ...o, status: 'PROCESSING' } : o));
  }

  function handleReconciled() {
    fetch('/api/admin/orders').then((r) => r.json()).then((data) => { if (Array.isArray(data)) setOrders(data); });
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--brown)' }} /></div>;
  }

  return (
    <div>
      <ReconcileForm onReconciled={handleReconciled} />

      {orders.length === 0 ? (
        <p style={{ color: 'rgba(17,17,17,.4)', fontSize: '14px' }}>No hay pedidos aún.</p>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => {
            const st = STATUS_LABELS[order.status] || { label: order.status, bg: '#f3f4f6', color: '#374151' };
            const isLocalDelivery = !order.shippingLine1;
            const isExpanded = expanded.has(order.orderNumber);
            const canShip = ['CONFIRMED', 'PROCESSING'].includes(order.status) && !isLocalDelivery;
            const canNotifyPickup = order.status === 'CONFIRMED' && isLocalDelivery;

            return (
              <div key={order.id} style={{ background: 'white', border: '1px solid rgba(0,0,0,.07)' }}>
                {/* Summary row */}
                <div className="flex flex-wrap items-center gap-3 p-4">
                  {/* Toggle + info */}
                  <button
                    onClick={() => toggleExpanded(order.orderNumber)}
                    className="flex items-center gap-2 flex-1 min-w-0 text-left"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(17,17,17,.3)' }} />
                      : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(17,17,17,.3)' }} />
                    }
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span style={{ fontWeight: 700, fontSize: '14px' }}>#{order.orderNumber}</span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                        {order.discountCode && <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">{order.discountCode}</span>}
                        {order.status === 'SHIPPED' && order.trackingNumber && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: '#16a34a' }}>
                            <Truck className="w-3 h-3" /> {order.carrier} · {order.trackingNumber}
                            {order.trackingUrl && <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'inherit' }}><ExternalLink className="w-3 h-3" /></a>}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.45)' }}>
                        {formatDate(order.createdAt)} · {order.customerName || order.customerEmail}
                        {order.customerPhone && <span> · {order.customerPhone}</span>}
                      </p>
                      <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.35)', marginTop: '1px' }}>
                        {order.items.map((i) => `${i.productName} ×${i.quantity}`).join(', ')}
                      </p>
                    </div>
                  </button>

                  {/* Total + address + actions */}
                  <div className="flex items-center gap-4 ml-auto flex-shrink-0">
                    <div className="text-right">
                      <p style={{ fontWeight: 700, fontSize: '15px' }}>{formatPrice(order.totalInCents)}</p>
                      {isLocalDelivery
                        ? <p style={{ fontSize: '11px', color: '#d97706' }}>📍 Entrega en mano</p>
                        : <p style={{ fontSize: '11px', color: 'rgba(17,17,17,.35)' }}>{order.shippingPostal} {order.shippingCity}</p>
                      }
                    </div>

                    <div className="flex items-center gap-2">
                      {canShip && (
                        <button
                          onClick={() => { setShowShipForm(showShipForm === order.orderNumber ? null : order.orderNumber); setShowPickupForm(null); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium"
                          style={{ background: showShipForm === order.orderNumber ? '#3a2a26' : 'var(--brown)', color: 'white' }}
                        >
                          <Truck className="w-3.5 h-3.5" />
                          Enviar
                          {showShipForm === order.orderNumber ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      {canNotifyPickup && (
                        <button
                          onClick={() => { setShowPickupForm(showPickupForm === order.orderNumber ? null : order.orderNumber); setShowShipForm(null); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium"
                          style={{ background: showPickupForm === order.orderNumber ? '#3a2a26' : '#5a4a40', color: 'white' }}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          Listo para recoger
                          {showPickupForm === order.orderNumber ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      {order.status === 'SHIPPED' && !order.trackingNumber && (
                        <span className="flex items-center gap-1 text-sm" style={{ color: '#16a34a' }}>
                          <CheckCircle className="w-4 h-4" /> Enviado
                        </span>
                      )}
                      {order.status === 'PROCESSING' && isLocalDelivery && (
                        <span className="flex items-center gap-1 text-sm" style={{ color: '#92400e' }}>
                          <MapPin className="w-4 h-4" /> Avisado
                        </span>
                      )}
                      {order.status === 'DELIVERED' && (
                        <span className="flex items-center gap-1 text-sm" style={{ color: '#14532d' }}>
                          <Package className="w-4 h-4" /> Entregado
                        </span>
                      )}
                      {order.status === 'CANCELLED' && (
                        <span className="flex items-center gap-1 text-sm text-red-500">
                          <XCircle className="w-4 h-4" /> Cancelado
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && <OrderDetail order={order} />}

                {/* Ship form */}
                {showShipForm === order.orderNumber && canShip && (
                  <ShipForm order={order} onShipped={(data) => handleShipped(order.orderNumber, data)} />
                )}

                {/* Pickup form */}
                {showPickupForm === order.orderNumber && canNotifyPickup && (
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
