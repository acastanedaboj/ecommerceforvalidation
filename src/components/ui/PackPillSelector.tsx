'use client';

import { cn } from '@/lib/utils';
import { getPackOptions } from '@/lib/pricing';
import { Truck } from 'lucide-react';

interface PackPillSelectorProps {
  selectedPack: number;
  onSelect: (pack: number) => void;
  showSavings?: boolean;
  showShipping?: boolean;
  variant?: 'horizontal' | 'grid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PackPillSelector({
  selectedPack,
  onSelect,
  showSavings = true,
  showShipping = true,
  variant = 'horizontal',
  size = 'md',
  className,
}: PackPillSelectorProps) {
  const packOptions = getPackOptions();

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  return (
    <div
      className={cn(
        'flex gap-3',
        variant === 'grid' ? 'flex-wrap' : 'flex-row overflow-x-auto scrollbar-hide',
        className
      )}
      role="radiogroup"
      aria-label="Seleccionar tamaño de pack"
    >
      {packOptions.map((option) => {
        const isSelected = selectedPack === option.size;
        const hasSavings = option.discountPercentage > 0;
        const hasFreeShipping = option.freeShipping;

        return (
          <button
            key={option.size}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${option.label}, ${formatPrice(option.unitPriceCents)} por unidad${hasSavings ? `, ahorra ${option.discountPercentage}%` : ''}${hasFreeShipping ? ', envio gratis' : ''}`}
            onClick={() => onSelect(option.size)}
            className={cn(
              'relative inline-flex flex-col items-center justify-center rounded-full border-2 bg-white',
              'transition-all duration-300 focus-visible:ring-2 focus-visible:ring-earth-400 focus-visible:ring-offset-2',
              'hover:border-cream-300 hover:bg-cream-50',
              sizeClasses[size],
              isSelected
                ? 'border-earth-500 bg-earth-50 text-earth-700 shadow-inner-glow'
                : 'border-cream-200 text-stone-600',
              variant === 'grid' ? 'min-w-[100px]' : 'flex-shrink-0'
            )}
          >
            {/* Savings badge */}
            {showSavings && hasSavings && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-olive-500 text-white text-[10px] font-bold rounded-full shadow-sm z-10">
                -{option.discountPercentage}%
              </span>
            )}

            {/* Main content */}
            <span className="font-medium whitespace-nowrap">
              {option.size === 1 ? '1 ud' : `Pack ${option.size}`}
            </span>
            <span className={cn(
              'text-xs mt-0.5',
              isSelected ? 'text-earth-600' : 'text-stone-400'
            )}>
              {formatPrice(option.unitPriceCents)}/ud
            </span>

            {/* Free shipping indicator */}
            {showShipping && hasFreeShipping && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 bg-earth-500 text-white text-[9px] font-bold rounded-full shadow-sm whitespace-nowrap z-10">
                <Truck className="w-2.5 h-2.5" />
                Gratis
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}

export default PackPillSelector;
