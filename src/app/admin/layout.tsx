'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const ADMIN_EMAILS = ['alvaro.castanneda@gmail.com', 'hola@poppy.es', 'pilar.orico@gmail.com'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || !ADMIN_EMAILS.includes(session.user?.email || '')) {
      router.replace('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--off)' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--brown)' }} />
      </div>
    );
  }

  if (!session || !ADMIN_EMAILS.includes(session.user?.email || '')) return null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--off)', paddingTop: '120px' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(17,17,17,.4)', fontWeight: 500 }}>
              Panel interno
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px' }}>Pedidos</h1>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.4)' }}>{session.user.email}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
