'use client';

import { useState } from 'react';

export function VacationBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <div className="mb-4 text-4xl">🌿</div>
        <h2
          className="mb-3 text-xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--dark)' }}
        >
          Cerrado por vacaciones
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.6)', fontWeight: 300, lineHeight: 1.7, marginBottom: '28px' }}>
          Gestionaremos vuestros pedidos a partir del <strong style={{ fontWeight: 500 }}>8 de septiembre</strong>.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="transition-colors hover:opacity-90"
          style={{
            background: 'var(--dark)',
            color: 'var(--cream)',
            border: 'none',
            borderRadius: '9999px',
            padding: '10px 28px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
