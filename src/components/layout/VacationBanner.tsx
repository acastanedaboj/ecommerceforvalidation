'use client';

import { useState } from 'react';

export function VacationBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-4 text-4xl">🌿</div>
        <h2 className="mb-3 font-display text-xl font-medium text-neutral-900">
          Estamos de vacaciones viviendo slowly
        </h2>
        <p className="mb-6 text-neutral-600">
          Los pedidos se enviarán a partir del <strong>6 de abril</strong>. Gracias por tu paciencia.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="rounded-full bg-earth-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-earth-700"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
