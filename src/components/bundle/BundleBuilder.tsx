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
  const isComplete = useMemo(
    () => isBundleComplete(flavors, packSize),
    [flavors, packSize]
  );
  const remaining = useMemo(
    () => getRemainingUnits(flavors, packSize),
    [flavors, packSize]
  );
  const pricing = useMemo(
    () => calculateBundlePrice(packSize, 1, false),
    [packSize]
  );
  const savings = useMemo(
    () => calculateBundleSavings(packSize, 1),
    [packSize]
  );
  const hasFreeShipping = useMemo(
    () => bundleHasFreeShipping(packSize),
    [packSize]
  );
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
    <div className={cn('bg-white rounded-2xl', className)}>
      {/* Header */}
      <div className="p-6 border-b border-cream-200">
        <h2 className="font-display text-2xl font-medium text-stone-800">
          Crea tu pack mixto
        </h2>
        <p className="text-stone-500 mt-1">
          Mezcla tus sabores favoritos y ahorra
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Pack Size Selector */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-3">
            Tamaño del pack
          </label>
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
                    'relative flex-1 py-4 px-3 rounded-xl border-2 transition-all duration-300',
                    isSelected
                      ? 'border-earth-500 bg-earth-50 shadow-inner-glow'
                      : 'border-cream-200 hover:border-cream-300 bg-white'
                  )}
                >
                  <div className="text-center">
                    <span
                      className={cn(
                        'block text-lg font-semibold',
                        isSelected ? 'text-earth-700' : 'text-stone-700'
                      )}
                    >
                      Pack {option.size}
                    </span>
                    <span
                      className={cn(
                        'block text-sm mt-1',
                        isSelected ? 'text-earth-600' : 'text-stone-500'
                      )}
                    >
                      {formatPrice(option.unitPriceCents)}/ud
                    </span>
                  </div>
                  {/* Discount badge */}
                  {option.discountPercentage > 0 && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-olive-500 text-[#ffffec] text-xs font-bold rounded-full">
                      -{Math.round(option.discountPercentage)}%
                    </span>
                  )}
                  {/* Free shipping badge */}
                  {option.freeShipping && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-earth-500 text-[#ffffec] text-[10px] font-medium rounded-full whitespace-nowrap">
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
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-stone-700">
              Elige tus sabores
            </label>
            <span
              className={cn(
                'text-sm font-medium px-3 py-1 rounded-full transition-colors',
                isComplete
                  ? 'bg-olive-100 text-olive-700'
                  : 'bg-cream-100 text-stone-600'
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
                  'flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300',
                  flavor.quantity > 0
                    ? 'border-earth-200 bg-earth-50/50'
                    : 'border-cream-200 bg-white'
                )}
              >
                {/* Product image */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={flavor.productImage}
                    alt={flavor.productName}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Product name */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-800 truncate">
                    {flavor.productName.replace(/^Granola de /i, '')}
                  </p>
                  <p className="text-sm text-stone-500">250g</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement(flavor.productId)}
                    disabled={flavor.quantity <= 0}
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                      flavor.quantity > 0
                        ? 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                        : 'bg-cream-100 text-stone-300 cursor-not-allowed'
                    )}
                    aria-label={`Reducir ${flavor.productName}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="w-8 text-center font-semibold text-stone-800">
                    {flavor.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleIncrement(flavor.productId)}
                    disabled={totalUnits >= packSize}
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                      totalUnits < packSize
                        ? 'bg-earth-500 text-[#ffffec] hover:bg-earth-600'
                        : 'bg-cream-100 text-stone-300 cursor-not-allowed'
                    )}
                    aria-label={`Aumentar ${flavor.productName}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining indicator */}
          {!isComplete && remaining > 0 && (
            <p className="mt-3 text-sm text-stone-500 text-center">
              Selecciona {remaining} {remaining === 1 ? 'bolsa' : 'bolsas'} más
            </p>
          )}
        </div>

        {/* Pricing Summary */}
        <div className="bg-gradient-earth rounded-xl p-5 space-y-4">
          {/* Summary */}
          {summary && (
            <div className="text-sm text-stone-600">
              <span className="font-medium">Tu selección:</span> {summary}
            </div>
          )}

          {/* Price breakdown */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-display font-semibold text-earth-600">
                {formatPrice(pricing.subtotalCents)}
              </span>
              <span className="text-stone-500 ml-2">
                ({formatPrice(pricing.unitPriceCents)}/ud)
              </span>
            </div>
            {savings > 0 && (
              <div className="flex items-center gap-1.5 text-olive-600">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">
                  Ahorras {formatPrice(savings)}
                </span>
              </div>
            )}
          </div>

          {/* Free shipping */}
          {hasFreeShipping && (
            <div className="flex items-center gap-2 text-earth-600">
              <Truck className="w-5 h-5" />
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
            'btn w-full justify-center py-4 text-base',
            isAdding
              ? 'bg-olive-500 text-[#ffffec] hover:bg-olive-500'
              : isComplete
              ? 'btn-primary'
              : 'bg-cream-200 text-stone-400 cursor-not-allowed'
          )}
        >
          {isAdding ? (
            <>
              <Check className="w-5 h-5 mr-2" strokeWidth={2.5} />
              Añadido al carrito
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 mr-2" />
              {isComplete
                ? 'Añadir pack al carrito'
                : `Selecciona ${remaining} más`}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default BundleBuilder;
