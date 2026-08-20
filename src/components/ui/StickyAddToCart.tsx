'use client';

import { useState, useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StickyAddToCartProps {
  productName: string;
  totalPrice: number;
  onAddToCart: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  observeElementId?: string;
  className?: string;
}

export function StickyAddToCart({
  productName,
  totalPrice,
  onAddToCart,
  isLoading = false,
  isDisabled = false,
  observeElementId = 'main-cta',
  className,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targetElement = document.getElementById(observeElementId);
    if (!targetElement) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA when main CTA is not visible
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px',
      }
    );

    observerRef.current.observe(targetElement);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [observeElementId]);

  const formatPrice = (cents: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  return (
    <div
      className={cn('sticky-cta-mobile', !isVisible && 'sticky-cta-hidden', className)}
      role="region"
      aria-label="Resumen de compra"
      aria-hidden={!isVisible}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-stone-800">{productName}</p>
          <p className="font-display text-lg text-earth-600">{formatPrice(totalPrice)}</p>
        </div>
        <button
          type="button"
          onClick={onAddToCart}
          disabled={isDisabled || isLoading}
          className={cn(
            'flex items-center gap-2 rounded-full bg-earth-600 px-6 py-3 font-medium text-cream-50',
            'transition-all duration-300 hover:bg-earth-700 hover:shadow-soft',
            'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
            'focus-visible:ring-2 focus-visible:ring-earth-400 focus-visible:ring-offset-2'
          )}
        >
          {isLoading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-cream-50/30 border-t-cream-50" />
          ) : (
            <ShoppingBag className="h-5 w-5" />
          )}
          <span className="whitespace-nowrap">Anadir</span>
        </button>
      </div>
    </div>
  );
}

export default StickyAddToCart;
