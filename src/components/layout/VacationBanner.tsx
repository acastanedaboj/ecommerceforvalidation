'use client';

import { useState } from 'react';

export function VacationBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-4 text-4xl">🌿</div>
        <h2 className="font-display text-xl text-stone-800 mb-3">
          Cerrado por vacaciones
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-7">
          Gestionaremos vuestros pedidos a partir del{' '}
          <strong className="font-medium">8 de septiembre</strong>.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="bg-stone-800 text-cream-50 rounded-full px-7 py-2.5 text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
