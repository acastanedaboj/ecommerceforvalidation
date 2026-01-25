'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCartStore, useCartItemCount } from '@/store/cart-store';
import { NAVIGATION, BUSINESS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/auth/UserMenu';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemCount = useCartItemCount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar - Subtle & Elegant */}
      <div className="bg-stone-800 text-cream-100 text-center py-2.5 px-4">
        <p className="text-sm tracking-wide">
          <span className="font-medium">Envio gratis</span>
          <span className="mx-2 opacity-40">|</span>
          a partir de 4 bolsas o 35 EUR
          <span className="mx-2 opacity-40">|</span>
          <Link
            href="/suscripcion"
            className="underline underline-offset-2 hover:text-cream-300 transition-colors"
          >
            Suscribete y ahorra 15%
          </Link>
        </p>
      </div>

      {/* Main navigation */}
      <nav
        className={cn(
          'transition-all duration-300',
          isScrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-soft'
            : 'bg-cream-50'
        )}
        aria-label="Navegacion principal"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-18 md:h-22">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center"
            >
              <Image
                src="/images/logo.png"
                alt={BUSINESS.name}
                width={140}
                height={50}
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation - Clean & Minimal */}
            <div className="hidden lg:flex items-center gap-10">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline text-stone-600 hover:text-stone-900 font-medium text-sm tracking-wide transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* User menu (login/account) */}
              <UserMenu />

              {/* Cart button */}
              <button
                type="button"
                onClick={toggleCart}
                className="relative p-3 text-stone-500 hover:text-stone-800 hover:bg-cream-200/50 rounded-full transition-all"
                aria-label={`Carrito de compra (${itemCount} productos)`}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-earth-600 text-cream-50 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-stone-500 hover:text-stone-800 hover:bg-cream-200/50 rounded-full transition-all ml-1"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Elegant slide down */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-400 ease-out border-t border-cream-200',
            isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-transparent'
          )}
        >
          <div className="container-custom py-6">
            <div className="flex flex-col gap-1">
              {NAVIGATION.main.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3.5 text-stone-700 hover:text-stone-900 hover:bg-cream-100 rounded-xl font-medium transition-all',
                    'animate-fade-in-up',
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 pt-6 border-t border-cream-200">
              <Link
                href="/tienda"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Comprar ahora
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
