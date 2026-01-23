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

export default function CuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-earth-600"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    redirect('/auth/login?callbackUrl=' + encodeURIComponent(pathname));
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'Usuario'}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-earth-600" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-serif text-stone-800">
                Hola, {session.user.name?.split(' ')[0] || 'Usuario'}
              </h1>
              <p className="text-stone-500">{session.user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar navigation */}
          <nav className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-soft p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                      isActive
                        ? 'bg-earth-100 text-earth-700'
                        : 'text-stone-600 hover:bg-cream-50 hover:text-stone-800'
                    )}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
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
