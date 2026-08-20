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
      {/* Announcement bar - Modern & Clean */}
      <div className="px-4 py-2.5 text-center" style={{ backgroundColor: '#333333' }}>
        <p className="text-sm font-medium tracking-wide" style={{ color: '#FFFFEC' }}>
          <span className="font-semibold">Envio gratis</span>
          <span className="mx-2">|</span>a partir de 4 bolsas o 35 EUR
          <span className="mx-2">|</span>
          <Link
            href="/suscripcion"
            className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: '#FFFFEC' }}
          >
            Suscribete y ahorra 15%
          </Link>
        </p>
      </div>

      {/* Main navigation */}
      <nav
        className={cn(
          'transition-all duration-300',
          isScrolled ? 'bg-white/95 shadow-soft backdrop-blur-md' : 'bg-white'
        )}
        aria-label="Navegacion principal"
      >
        <div className="container-custom">
          <div className="flex h-18 items-center justify-between md:h-22">
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <Image
                src="/images/logo.svg"
                alt={BUSINESS.name}
                width={100}
                height={35}
                className="h-auto max-w-[100px] transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation - Clean & Minimal */}
            <div className="hidden items-center gap-10 lg:flex">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline text-sm font-medium tracking-wide text-stone-800 transition-colors hover:text-earth-600"
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
                className="relative rounded-full p-3 text-stone-800 transition-all hover:bg-cream-200/50 hover:text-earth-600"
                aria-label={`Carrito de compra (${itemCount} productos)`}
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-earth-600 text-[10px] font-bold text-[#ffffec]">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-1 rounded-full p-3 text-stone-800 transition-all hover:bg-cream-200/50 hover:text-earth-600 lg:hidden"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Clean slide down */}
        <div
          id="mobile-menu"
          className={cn(
            'overflow-hidden border-t border-stone-200 transition-all duration-400 ease-out lg:hidden',
            isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 border-transparent opacity-0'
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
                    'rounded-xl px-4 py-3.5 font-medium text-stone-800 transition-all hover:bg-cream-100 hover:text-earth-600',
                    'animate-fade-in-up'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 border-t border-stone-200 pt-6">
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
