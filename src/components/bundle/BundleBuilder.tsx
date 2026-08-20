'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Minus, Plus, Truck, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import {
  calculateBundlePrice,
  calculateBundleSavings,
  getBundleTotalUnits,
  generateBundleSummary,
  bundleHasFreeShipping,
  initializeBundleFlavors,
  updateFlavorQuantity,
  isBundleComplete,
  getRemainingUnits,
  getBundlePackOptions,
} from '@/lib/bundle';
import { getRetailProducts } from '@/data/products';
import { useCartStore } from '@/store/cart-store';
import type { BundleFlavorSelection, BundlePackSize } from '@/types/bundle';
import toast from 'react-hot-toast';

interface BundleBuilderProps {
  initialPackSize?: BundlePackSize;
  initialProductId?: string;
  onAddToCart?: () => void;
  onClose?: () => void;
  className?: string;
}

export function BundleBuilder({
  initialPackSize = 4,
  initialProductId,
  onAddToCart,
  onClose,
  className,
}: BundleBuilderProps) {
  const [packSize, setPackSize] = useState<BundlePackSize>(initialPackSize);
  const [flavors, setFlavors] = useState<BundleFlavorSelection[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const addBundle = useCartStore((state) => state.addBundle);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  // Initialize flavors from products
  useEffect(() => {
    const products = getRetailProducts();
    const initialFlavors = initializeBundleFlavors(products, initialProductId);
    setFlavors(initialFlavors);
  }, [initialProductId]);

  // Reset flavors when pack size changes (if over limit)
  // We intentionally don't include flavors in deps to avoid infinite loops
  useEffect(() => {
    setFlavors((prevFlavors) => {
      const currentTotal = getBundleTotalUnits(prevFlavors);
      if (currentTotal > packSize) {
        const ratio = packSize / currentTotal;
        return prevFlavors.map((f) => ({
          ...f,
          quantity: Math.floor(f.quantity * ratio),
        }));
      }
      return prevFlavors;
    });
  }, [packSize]);

  // Computed values
  const totalUnits = useMemo(() => getBundleTotalUnits(flavors), [flavors]);
  const isComplete = useMemo(() => isBundleComplete(flavors, packSize), [flavors, packSize]);
  const remaining = useMemo(() => getRemainingUnits(flavors, packSize), [flavors, packSize]);
  const pricing = useMemo(() => calculateBundlePrice(packSize, 1, false), [packSize]);
  const savings = useMemo(() => calculateBundleSavings(packSize, 1), [packSize]);
  const hasFreeShipping = useMemo(() => bundleHasFreeShipping(packSize), [packSize]);
  const summary = useMemo(() => generateBundleSummary(flavors), [flavors]);
  const packOptions = useMemo(() => getBundlePackOptions(), []);

  const handleIncrement = (productId: string) => {
    if (totalUnits >= packSize) return;
    setFlavors((prev) =>
      updateFlavorQuantity(
        prev,
        productId,
        (prev.find((f) => f.productId === productId)?.quantity || 0) + 1
      )
    );
  };

  const handleDecrement = (productId: string) => {
    const current = flavors.find((f) => f.productId === productId)?.quantity || 0;
    if (current <= 0) return;
    setFlavors((prev) => updateFlavorQuantity(prev, productId, current - 1));
  };

  const handleAddToCart = () => {
    if (!isComplete) return;

    setIsAdding(true);

    addBundle({
      flavors,
      packSize,
      isSubscription: false,
    });

    toast.success('Pack mixto añadido al carrito', {
      style: {
        background: '#1C1C1C',
        color: '#FDFCFB',
        borderRadius: '12px',
      },
    });

    setTimeout(() => {
      setIsAdding(false);
      setCartOpen(true);
      onAddToCart?.();
      onClose?.();
    }, 800);
  };

  return (
    <div className={cn('rounded-2xl bg-white', className)}>
      {/* Header */}
      <div className="border-b border-cream-200 p-6">
        <h2 className="font-display text-2xl font-medium text-stone-800">Crea tu pack mixto</h2>
        <p className="mt-1 text-stone-500">Mezcla tus sabores favoritos y ahorra</p>
      </div>

      <div className="space-y-8 p-6">
        {/* Pack Size Selector */}
        <div>
          <label className="mb-3 block text-sm font-medium text-stone-700">Tamaño del pack</label>
          <div className="flex gap-3" role="radiogroup" aria-label="Tamaño del pack">
            {packOptions.map((option) => {
              const isSelected = packSize === option.size;
              return (
                <button
                  key={option.size}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setPackSize(option.size)}
                  className={cn(
                    'relative flex-1 rounded-xl border-2 px-3 py-4 transition-all duration-300',
                    isSelected
                      ? 'border-earth-500 bg-earth-50 shadow-inner-glow'
                      : 'border-cream-200 bg-white hover:border-cream-300'
                  )}
                >
                  <div className="text-center">
                    <span
                      className={cn(
                        'block text-lg',
                        isSelected ? 'text-earth-700' : 'text-stone-700'
                      )}
                    >
                      Pack {option.size}
                    </span>
                    <span
                      className={cn(
                        'mt-1 block text-sm',
                        isSelected ? 'text-earth-600' : 'text-stone-500'
                      )}
                    >
                      {formatPrice(option.unitPriceCents)}/ud
                    </span>
                  </div>
                  {/* Discount badge */}
                  {option.discountPercentage > 0 && (
                    <span className="absolute -right-2 -top-2 rounded-full bg-olive-500 px-2 py-0.5 text-xs font-bold text-[#fcf8d5]">
                      -{Math.round(option.discountPercentage)}%
                    </span>
                  )}
                  {/* Free shipping badge */}
                  {option.freeShipping && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-earth-500 px-2 py-0.5 text-[10px] font-medium text-[#fcf8d5]">
                      Envío gratis
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Flavor Picker */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium text-stone-700">Elige tus sabores</label>
            <span
              className={cn(
                'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                isComplete ? 'bg-olive-100 text-olive-700' : 'bg-cream-100 text-stone-600'
              )}
            >
              {totalUnits} de {packSize}
            </span>
          </div>

          <div className="space-y-3">
            {flavors.map((flavor) => (
              <div
                key={flavor.productId}
                className={cn(
                  'flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-300',
                  flavor.quantity > 0
                    ? 'border-earth-200 bg-earth-50/50'
                    : 'border-cream-200 bg-white'
                )}
              >
                {/* Product image */}
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden">
                  <Image
                    src={flavor.productImage}
                    alt={flavor.productName}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Product name */}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-stone-800">
                    {flavor.productName.replace(/^Granola de /i, '')}
                  </p>
                  <p className="text-sm text-stone-500">150g</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement(flavor.productId)}
                    disabled={flavor.quantity <= 0}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full transition-all',
                      flavor.quantity > 0
                        ? 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                        : 'cursor-not-allowed bg-cream-100 text-stone-300'
                    )}
                    aria-label={`Reducir ${flavor.productName}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="w-8 text-center font-semibold text-stone-800">
                    {flavor.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleIncrement(flavor.productId)}
                    disabled={totalUnits >= packSize}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full transition-all',
                      totalUnits < packSize
                        ? 'bg-earth-500 text-[#fcf8d5] hover:bg-earth-600'
                        : 'cursor-not-allowed bg-cream-100 text-stone-300'
                    )}
                    aria-label={`Aumentar ${flavor.productName}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining indicator */}
          {!isComplete && remaining > 0 && (
            <p className="mt-3 text-center text-sm text-stone-500">
              Selecciona {remaining} {remaining === 1 ? 'bolsa' : 'bolsas'} más
            </p>
          )}
        </div>

        {/* Pricing Summary */}
        <div className="space-y-4 rounded-xl bg-gradient-earth p-5">
          {/* Summary */}
          {summary && (
            <div className="text-sm text-stone-600">
              <span className="font-medium">Tu selección:</span> {summary}
            </div>
          )}

          {/* Price breakdown */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-display text-3xl text-earth-600">
                {formatPrice(pricing.subtotalCents)}
              </span>
              <span className="ml-2 text-stone-500">
                ({formatPrice(pricing.unitPriceCents)}/ud)
              </span>
            </div>
            {savings > 0 && (
              <div className="flex items-center gap-1.5 text-olive-600">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Ahorras {formatPrice(savings)}</span>
              </div>
            )}
          </div>

          {/* Free shipping */}
          {hasFreeShipping && (
            <div className="flex items-center gap-2 text-earth-600">
              <Truck className="h-5 w-5" />
              <span className="font-medium">Envío gratis incluido</span>
            </div>
          )}
        </div>

        {/* Add to Cart CTA */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isComplete || isAdding}
          className={cn(
            'btn justify-center py-4 text-base',
            isAdding
              ? 'bg-olive-500 text-[#fcf8d5] hover:bg-olive-500'
              : isComplete
                ? 'btn-primary'
                : 'cursor-not-allowed bg-cream-200 text-stone-400'
          )}
        >
          {isAdding ? (
            <>
              <Check className="mr-2 h-5 w-5" strokeWidth={2.5} />
              Añadido al carrito
            </>
          ) : (
            <>
              <ShoppingBag className="mr-2 h-5 w-5" />
              {isComplete ? 'Añadir pack al carrito' : `Selecciona ${remaining} más`}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default BundleBuilder;
