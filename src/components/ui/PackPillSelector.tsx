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
                : 'border-stone-200 hover:border-stone-300 hover:bg-sky-50'
            )}
          >
            {/* Selection indicator */}
            {isSelected && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-earth-500">
                <Check className="h-3 w-3 text-[#ffffec]" strokeWidth={3} />
              </span>
            )}

            {/* Pack name */}
            <span
              className={cn(
                'font-display text-lg',
                isSelected ? 'text-earth-700' : 'text-stone-700'
              )}
            >
              {option.size === 1 ? '1 bolsa' : `Pack ${option.size} bolsas`}
            </span>

            {/* Price */}
            <span
              className={cn(
                'mt-1 text-sm font-medium',
                isSelected ? 'text-earth-600' : 'text-stone-500'
              )}
            >
              {formatPrice(option.unitPriceCents)}/ud
            </span>

            {/* Badges row */}
            <div className="mt-2 flex min-h-[20px] items-center gap-1.5">
              {/* Savings badge */}
              {showSavings && hasSavings && (
                <span className="rounded-full bg-olive-100 px-2 py-0.5 text-xs font-semibold text-olive-700">
                  -{option.discountPercentage}%
                </span>
              )}

              {/* Free shipping indicator */}
              {showShipping && hasFreeShipping && (
                <span className="flex items-center gap-1 rounded-full bg-earth-100 px-2 py-0.5 text-xs font-medium text-earth-700">
                  <Truck className="h-3 w-3" />
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
