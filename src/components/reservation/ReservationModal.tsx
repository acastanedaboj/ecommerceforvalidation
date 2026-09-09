'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Check } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  initialQuantity?: number;
}

export function ReservationModal({
  isOpen,
  onClose,
  productName,
  initialQuantity = 1,
}: ReservationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // mailto fallback (used if the automatic send fails)
  const mailtoHref =
    `mailto:${BUSINESS.email}` +
    `?subject=${encodeURIComponent(`Reserva: ${quantity}× ${productName}`)}` +
    `&body=${encodeURIComponent(
      `Hola, me gustaría reservar:\n\nProducto: ${productName}\nCantidad: ${quantity}\nNombre: ${name}\nTeléfono: ${phone}\n\n${note}`
    )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Completa nombre, email y teléfono.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Introduce un email válido.');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, productName, quantity, note }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Reservar producto"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 text-stone-400 transition-colors hover:text-stone-700"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-earth-100">
              <Check className="h-6 w-6 text-earth-600" />
            </div>
            <h2 className="mb-2 font-display text-xl text-stone-800">¡Reserva recibida!</h2>
            <p className="mb-6 text-sm leading-relaxed text-stone-500">
              Nos pondremos en contacto contigo en{' '}
              <strong className="text-stone-700">{email}</strong> para confirmar el próximo lote y
              concertar la entrega en mano en Málaga.
            </p>
            <button
              onClick={onClose}
              className="rounded-full bg-stone-800 px-7 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-stone-700"
            >
              Entendido
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-1 font-display text-xl text-stone-800">Reservar</h2>
            <p className="mb-5 text-sm text-stone-500">
              {productName} — te lo preparamos en el próximo lote y te lo entregamos en mano en
              Málaga.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-earth-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-earth-500"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-earth-500"
                required
              />
              <div className="flex items-center gap-3">
                <label className="text-sm text-stone-500">Cantidad</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(20, Number(e.target.value) || 1)))
                  }
                  className="w-20 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-earth-500"
                />
                <span className="text-sm text-stone-400">bolsas</span>
              </div>
              <textarea
                placeholder="Comentario (opcional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full resize-none rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-earth-500"
              />

              {error && <p className="text-xs text-red-500">{error}</p>}

              {status === 'error' ? (
                <div className="rounded-lg bg-stone-50 p-3 text-center text-sm text-stone-600">
                  No hemos podido enviar la reserva automáticamente.{' '}
                  <a href={mailtoHref} className="font-medium text-earth-600 underline">
                    Escríbenos directamente
                  </a>{' '}
                  y te la reservamos.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-full bg-stone-800 px-7 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-stone-700 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar reserva'}
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
