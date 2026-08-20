'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Heart, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/cuenta/pedidos', label: 'Mis pedidos', icon: Package },
  { href: '/cuenta/suscripciones', label: 'Suscripciones', icon: Heart },
  { href: '/cuenta/ajustes', label: 'Ajustes', icon: Settings },
];

export default function CuentaLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Show loading state
  if (status === 'loading') {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: 'var(--off)' }}
      >
        <div
          className="h-8 w-8 animate-spin rounded-full"
          style={{ borderBottom: '2px solid var(--brown)' }}
        ></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    redirect('/auth/login?callbackUrl=' + encodeURIComponent(pathname));
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--off)', paddingTop: '140px' }}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-4">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || 'Usuario'}
                width={64}
                height={64}
                className="h-16 w-16"
                unoptimized
              />
            ) : (
              <div
                className="flex h-16 w-16 items-center justify-center"
                style={{ background: 'var(--white)' }}
              >
                <User className="h-8 w-8" style={{ color: 'var(--brown)' }} />
              </div>
            )}
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px' }}>
                Hola, {session.user.name?.split(' ')[0] || 'Usuario'}
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.4)', fontWeight: 300 }}>
                {session.user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar navigation */}
          <nav className="flex-shrink-0 md:w-64">
            <div
              className="p-2"
              style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,.06)' }}
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 transition-colors',
                      isActive ? '' : ''
                    )}
                    style={
                      isActive
                        ? { background: 'var(--off)', color: 'var(--brown)' }
                        : { color: 'rgba(17,17,17,.5)' }
                    }
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                    <span style={{ fontWeight: 400, fontSize: '14px' }}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Main content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
