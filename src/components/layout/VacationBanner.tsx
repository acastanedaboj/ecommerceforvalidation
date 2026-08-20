'use client';

import { useState } from 'react';

export function VacationBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-4 text-4xl">🌿</div>
        <h2 className="mb-3 font-display text-xl text-stone-800">Cerrado por vacaciones</h2>
        <p className="mb-7 text-sm leading-relaxed text-stone-500">
          Gestionaremos vuestros pedidos a partir del{' '}
          <strong className="font-medium">8 de septiembre</strong>.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="rounded-full bg-stone-800 px-7 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-stone-700"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
