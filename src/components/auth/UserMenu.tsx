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
        <div className="w-5 h-5 rounded-full bg-cream-200 animate-pulse" />
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <Link
        href="/auth/login"
        className="p-3 text-stone-500 hover:text-stone-800 hover:bg-cream-200/50 rounded-full transition-all"
        aria-label="Iniciar sesion"
      >
        <User className="w-5 h-5" strokeWidth={1.5} />
      </Link>
    );
  }

  // Logged in - show user menu
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 hover:bg-cream-200/50 rounded-full transition-all"
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
          <div className="w-8 h-8 bg-earth-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-earth-700">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
            </span>
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      <div
        className={cn(
          'absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-soft-lg border border-cream-200 overflow-hidden transition-all duration-200 z-50',
          isOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-2 invisible'
        )}
      >
        {/* User info */}
        <div className="p-4 bg-cream-50 border-b border-cream-200">
          <p className="font-medium text-stone-800 truncate">
            {session.user.name || 'Usuario'}
          </p>
          <p className="text-sm text-stone-500 truncate">
            {session.user.email}
          </p>
        </div>

        {/* Menu items */}
        <div className="p-2">
          <Link
            href="/cuenta/pedidos"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-stone-600 hover:text-stone-900 hover:bg-cream-50 rounded-xl transition-colors"
          >
            <Package className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Mis pedidos</span>
          </Link>

          <Link
            href="/cuenta/suscripciones"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-stone-600 hover:text-stone-900 hover:bg-cream-50 rounded-xl transition-colors"
          >
            <Heart className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Mis suscripciones</span>
          </Link>

          <Link
            href="/cuenta/ajustes"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-stone-600 hover:text-stone-900 hover:bg-cream-50 rounded-xl transition-colors"
          >
            <Settings className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Ajustes</span>
          </Link>
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-cream-200">
          <button
            onClick={() => {
              setIsOpen(false);
              signOut({ callbackUrl: '/' });
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Cerrar sesion</span>
          </button>
        </div>
      </div>
    </div>
  );
}
