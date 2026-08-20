'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { User, LogOut, Package, Heart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="p-3">
        <div className="h-5 w-5 animate-pulse rounded-full bg-cream-200" />
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <Link
        href="/auth/login"
        className="rounded-full p-3 text-stone-500 transition-all hover:bg-cream-200/50 hover:text-stone-800"
        aria-label="Iniciar sesion"
      >
        <User className="h-5 w-5" strokeWidth={1.5} />
      </Link>
    );
  }

  // Logged in - show user menu
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-1.5 transition-all hover:bg-cream-200/50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'Usuario'}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-earth-100">
            <span className="text-sm font-medium text-earth-700">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
            </span>
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      <div
        className={cn(
          'absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft-lg transition-all duration-200',
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        )}
      >
        {/* User info */}
        <div className="border-b border-cream-200 bg-cream-50 p-4">
          <p className="truncate font-medium text-stone-800">{session.user.name || 'Usuario'}</p>
          <p className="truncate text-sm text-stone-500">{session.user.email}</p>
        </div>

        {/* Menu items */}
        <div className="p-2">
          <Link
            href="/cuenta/pedidos"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-stone-600 transition-colors hover:bg-cream-50 hover:text-stone-900"
          >
            <Package className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-sm">Mis pedidos</span>
          </Link>

          <Link
            href="/cuenta/suscripciones"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-stone-600 transition-colors hover:bg-cream-50 hover:text-stone-900"
          >
            <Heart className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-sm">Mis suscripciones</span>
          </Link>

          <Link
            href="/cuenta/ajustes"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-stone-600 transition-colors hover:bg-cream-50 hover:text-stone-900"
          >
            <Settings className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-sm">Ajustes</span>
          </Link>
        </div>

        {/* Logout */}
        <div className="border-t border-cream-200 p-2">
          <button
            onClick={() => {
              setIsOpen(false);
              signOut({ callbackUrl: '/' });
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-stone-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-sm">Cerrar sesion</span>
          </button>
        </div>
      </div>
    </div>
  );
}
