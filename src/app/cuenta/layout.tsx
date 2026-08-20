'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
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
      <div className="flex min-h-screen items-center justify-center bg-cream-50">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-earth-600"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    redirect('/auth/login?callbackUrl=' + encodeURIComponent(pathname));
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-4">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'Usuario'}
                className="h-16 w-16 rounded-full"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-earth-100">
                <User className="h-8 w-8 text-earth-600" />
              </div>
            )}
            <div>
              <h1 className="font-serif text-2xl text-stone-800">
                Hola, {session.user.name?.split(' ')[0] || 'Usuario'}
              </h1>
              <p className="text-stone-500">{session.user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar navigation */}
          <nav className="flex-shrink-0 md:w-64">
            <div className="rounded-2xl bg-white p-2 shadow-soft">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors',
                      isActive
                        ? 'bg-earth-100 text-earth-700'
                        : 'text-stone-600 hover:bg-cream-50 hover:text-stone-800'
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                    <span className="font-medium">{item.label}</span>
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
