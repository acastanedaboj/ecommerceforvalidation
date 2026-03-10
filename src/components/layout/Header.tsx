'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCartStore, useCartItemCount } from '@/store/cart-store';
import { NAVIGATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/auth/UserMenu';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemCount = useCartItemCount();

  // Handle scroll effect - threshold at 80px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40" style={{ position: 'fixed' }}>
      {/* Announcement bar */}
      <div
        className={cn(
          'text-center py-2 px-4 transition-all duration-300',
          isScrolled ? 'max-h-0 overflow-hidden py-0 opacity-0' : 'max-h-12 opacity-100'
        )}
        style={{ backgroundColor: '#111111' }}
      >
        <p className="text-[11px] tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,.65)', fontWeight: 300 }}>
          <span className="font-bold">Envio gratis</span>
          <span className="mx-2 opacity-30">|</span>
          a partir de 4 bolsas o 35 EUR
          <span className="mx-2 opacity-30">|</span>
          <Link
            href="/suscripcion"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity font-bold"
            style={{ color: 'rgba(255,255,255,.65)' }}
          >
            Suscribete y ahorra 15%
          </Link>
        </p>
      </div>

      {/* Main navigation */}
      <nav
        className={cn(
          'flex items-center justify-between transition-all duration-350',
          isScrolled ? 'py-4 px-12' : 'py-7 px-12'
        )}
        style={
          isScrolled
            ? {
                background: 'rgba(255,255,255,.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(0,0,0,.08)',
              }
            : {
                background: 'transparent',
              }
        }
        aria-label="Navegacion principal"
      >
        {/* Logo - serif uppercase */}
        <Link
          href="/"
          className="group"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color 0.3s',
            color: isScrolled ? '#111111' : '#ffffff',
          }}
        >
          Poppy
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8" style={{ listStyle: 'none' }}>
          {NAVIGATION.main.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="link-underline"
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  textTransform: 'lowercase',
                  color: isScrolled ? '#111111' : 'rgba(255,255,255,.85)',
                  textDecoration: 'none',
                  transition: 'color 0.25s',
                }}
              >
                {item.name.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* User menu (login/account) */}
          <div
            style={{ color: isScrolled ? '#111111' : 'rgba(255,255,255,.85)' }}
          >
            <UserMenu />
          </div>

          {/* Cart button */}
          <button
            type="button"
            onClick={toggleCart}
            className="relative p-3 transition-opacity hover:opacity-55"
            style={{
              color: isScrolled ? '#111111' : 'rgba(255,255,255,.85)',
              background: 'none',
              border: 'none',
            }}
            aria-label={`Carrito de compra (${itemCount} productos)`}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span
                className="absolute top-1 right-1 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: 'var(--yellow)', color: 'var(--dark)' }}
              >
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* CTA comprar - text only */}
          <Link
            href="/tienda"
            className="hidden md:inline-block transition-opacity hover:opacity-55"
            style={{
              fontSize: '15px',
              fontWeight: 700,
              textTransform: 'lowercase',
              color: isScrolled ? '#111111' : 'rgba(255,255,255,.85)',
              background: 'none',
              border: 'none',
              textDecoration: 'none',
            }}
          >
            comprar
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 transition-opacity hover:opacity-55"
            style={{
              color: isScrolled ? '#111111' : 'rgba(255,255,255,.85)',
              background: 'none',
              border: 'none',
            }}
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
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-400 ease-out',
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        )}
        style={{
          background: 'rgba(255,255,255,.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: isMobileMenuOpen ? '1px solid rgba(0,0,0,.08)' : 'none',
        }}
      >
        <div className="px-6 py-6">
          <div className="flex flex-col gap-1">
            {NAVIGATION.main.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 animate-fade-in-up"
                style={{
                  color: '#111111',
                  fontWeight: 700,
                  fontSize: '15px',
                  textTransform: 'lowercase',
                  textDecoration: 'none',
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.name.toLowerCase()}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,.08)' }}>
            <Link
              href="/tienda"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-pill w-full text-center"
            >
              comprar ahora
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
