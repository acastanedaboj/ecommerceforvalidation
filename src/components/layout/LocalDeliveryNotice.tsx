'use client';

import { useState } from 'react';
import Link from 'next/link';

export function LocalDeliveryNotice() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-4 text-4xl">🌿</div>
        <h2 className="mb-3 font-display text-xl text-stone-800">Elaboramos a mano, por lotes</h2>
        <p className="mb-7 text-sm leading-relaxed text-stone-500">
          Preparamos la granola en pequeños lotes artesanales, así que por ahora la tienda online
          está en pausa. La entregamos{' '}
          <strong className="font-medium text-stone-700">en mano en el centro de Málaga</strong>:
          escríbenos y te reservamos la tuya del próximo lote.
        </p>
        <Link
          href="/contacto"
          onClick={() => setDismissed(true)}
          className="inline-block rounded-full bg-stone-800 px-7 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-stone-700"
        >
          Reservar la mía
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="mt-4 block w-full text-xs text-stone-400 transition-colors hover:text-stone-600"
        >
          Seguir viendo la web
        </button>
      </div>
    </div>
  );
}
