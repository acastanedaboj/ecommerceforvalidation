'use client';

import { cn } from '@/lib/utils';
import { getPackOptions } from '@/lib/pricing';
import { Truck, Check } from 'lucide-react';

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

  return (
    <div
      className={cn(
        'grid gap-3',
        variant === 'grid' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-4',
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
            aria-label={`${option.label}, ${formatPrice(option.unitPriceCents)} por unidad${hasSavings ? `, ahorra ${option.discountPercentage}%` : ''}${hasFreeShipping ? ', envío gratis' : ''}`}
            onClick={() => onSelect(option.size)}
            className={cn(
              'relative flex flex-col items-center justify-center rounded-xl border-2 bg-white p-4',
              'transition-all duration-200 focus-visible:ring-2 focus-visible:ring-earth-400 focus-visible:ring-offset-2',
              isSelected
                ? 'border-earth-500 bg-earth-50 shadow-md'
                : 'border-cream-200 hover:border-cream-300 hover:bg-cream-50'
            )}
          >
            {/* Selection indicator */}
            {isSelected && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-earth-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
            )}

            {/* Pack name */}
            <span className={cn(
              'font-display text-lg font-semibold',
              isSelected ? 'text-earth-700' : 'text-stone-700'
            )}>
              {option.size === 1 ? '1 bolsa' : `Pack ${option.size}`}
            </span>

            {/* Price */}
            <span className={cn(
              'text-sm font-medium mt-1',
              isSelected ? 'text-earth-600' : 'text-stone-500'
            )}>
              {formatPrice(option.unitPriceCents)}/ud
            </span>

            {/* Badges row */}
            <div className="flex items-center gap-1.5 mt-2 min-h-[20px]">
              {/* Savings badge */}
              {showSavings && hasSavings && (
                <span className="px-2 py-0.5 bg-olive-100 text-olive-700 text-xs font-semibold rounded-full">
                  -{option.discountPercentage}%
                </span>
              )}

              {/* Free shipping indicator */}
              {showShipping && hasFreeShipping && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-earth-100 text-earth-700 text-xs font-medium rounded-full">
                  <Truck className="w-3 h-3" />
                  Gratis
                </span>
              )}
            </div>
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
