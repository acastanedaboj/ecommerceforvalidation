'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  // Pages with dark hero backgrounds where white text is appropriate
  const hasDarkHero = pathname === '/' || pathname === '/suscripcion';
  // Use dark text when scrolled OR when page has light background
  const useDarkText = isScrolled || !hasDarkHero;

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
        style={{ backgroundColor: '#f6ee87' }}
      >
        <p className="text-[11px] tracking-[0.12em] uppercase" style={{ color: 'rgba(17,17,17,.65)', fontWeight: 300 }}>
          <span className="font-bold">Envio gratis</span>
          <span className="mx-2 opacity-30">|</span>
          a partir de 4 bolsas o 35 EUR
          <span className="mx-2 opacity-30">|</span>
          <Link
            href="/suscripcion"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity font-bold"
            style={{ color: 'rgba(17,17,17,.65)' }}
          >
            Suscribete y ahorra 15%
          </Link>
        </p>
      </div>

      {/* Main navigation */}
      <nav
        className={cn(
          'flex items-center justify-between transition-all duration-350',
          isScrolled ? 'py-3 px-6 md:px-8 lg:px-14' : 'py-5 px-6 md:px-8 lg:px-14'
        )}
        style={
          useDarkText
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
        {/* Logo */}
        <Link href="/" className="group">
          <Image
            src="/images/logo.svg"
            alt="Poppy"
            width={100}
            height={35}
            className={cn(
              'h-7 w-auto transition-all duration-300',
              useDarkText ? '' : 'brightness-0 invert sepia saturate-[10] hue-rotate-[15deg]'
            )}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8" style={{ listStyle: 'none' }}>
          {NAVIGATION.main.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="link-underline"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: useDarkText ? '#111111' : '#fcf8d5',
                  textDecoration: 'none',
                  transition: 'color 0.25s',
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* User menu (login/account) */}
          <div
            style={{ color: useDarkText ? '#111111' : '#fcf8d5' }}
          >
            <UserMenu />
          </div>

          {/* Cart button */}
          <button
            type="button"
            onClick={toggleCart}
            className="relative p-3 transition-opacity hover:opacity-55"
            style={{
              color: useDarkText ? '#111111' : '#fcf8d5',
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

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 transition-opacity hover:opacity-55"
            style={{
              color: useDarkText ? '#111111' : '#fcf8d5',
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
                  fontFamily: 'var(--font-display)',
                  color: '#111111',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.name}
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
              Comprar ahora
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
