'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { useCartStore, useCartItemCount } from '@/store/cart-store';
import { NAVIGATION, BUSINESS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemCount = useCartItemCount();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      {/* Announcement bar */}
      <div className="bg-primary-600 text-white text-center py-2 px-4 text-sm">
        <p>
          <span className="font-medium">Envío gratis</span> a partir de 4 bolsas o 35€ |{' '}
          <Link href="/suscripcion" className="underline hover:no-underline">
            Suscríbete y ahorra 15%
          </Link>
        </p>
      </div>

      <nav className="container-custom" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl md:text-2xl font-display font-bold text-primary-700 hover:text-primary-600 transition-colors"
          >
            <span className="text-2xl md:text-3xl">🌾</span>
            <span className="hidden sm:inline">{BUSINESS.name}</span>
            <span className="sm:hidden">Granola</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAVIGATION.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search button */}
            <button
              type="button"
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Buscar productos"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account link */}
            <Link
              href="/cuenta"
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Mi cuenta"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart button */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label={`Carrito de compra (${itemCount} productos)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-neutral-200">
            {NAVIGATION.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
