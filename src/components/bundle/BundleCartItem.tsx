'use client';

import Image from 'next/image';
import { Minus, Plus, X, Package } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { generateBundleSummary, calculateBundlePrice } from '@/lib/bundle';
import { useCartStore } from '@/store/cart-store';
import type { BundleCartItem as BundleCartItemType } from '@/types/bundle';

interface BundleCartItemProps {
  item: BundleCartItemType;
  compact?: boolean;
}

export function BundleCartItem({ item, compact = false }: BundleCartItemProps) {
  const updateBundleQuantity = useCartStore((state) => state.updateBundleQuantity);
  const removeBundle = useCartStore((state) => state.removeBundle);

  const pricing = calculateBundlePrice(item.packSize, item.quantity, item.isSubscription);
  const summary = generateBundleSummary(item.flavors);

  // Get first flavor image for display
  const displayImage =
    item.flavors.find((f) => f.quantity > 0)?.productImage || '/images/placeholder-product.jpg';

  const handleIncrement = () => {
    updateBundleQuantity(item.bundleId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateBundleQuantity(item.bundleId, item.quantity - 1);
    } else {
      removeBundle(item.bundleId);
    }
  };

  const handleRemove = () => {
    removeBundle(item.bundleId);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 py-3">
        {/* Image */}
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-cream-100">
          <Package className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-earth-400" />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-stone-800">{item.bundleName}</p>
          <p className="truncate text-xs text-stone-500">{summary}</p>
        </div>

        {/* Quantity & Price */}
        <div className="text-right">
          <p className="text-sm font-medium text-stone-800">{formatPrice(pricing.subtotalCents)}</p>
          <p className="text-xs text-stone-500">x{item.quantity}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex gap-4 border-b border-cream-200 py-5 last:border-b-0">
      {/* Product images collage */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-earth">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="h-8 w-8 text-earth-400" />
        </div>
        {/* Show small flavor images */}
        <div className="absolute bottom-0 left-0 right-0 flex -space-x-1 p-1">
          {item.flavors
            .filter((f) => f.quantity > 0)
            .slice(0, 3)
            .map((flavor, index) => (
              <div
                key={flavor.productId}
                className="h-6 w-6 overflow-hidden rounded-full border-2 border-white"
                style={{ zIndex: 10 - index }}
              >
                <Image
                  src={flavor.productImage}
                  alt={flavor.productName}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-medium leading-tight text-stone-800">{item.bundleName}</h4>
            <p className="mt-0.5 line-clamp-2 text-sm text-stone-500">{summary}</p>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemove}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              'text-stone-400 hover:bg-cream-100 hover:text-stone-600',
              'transition-all duration-200',
              'opacity-0 focus:opacity-100 group-hover:opacity-100'
            )}
            aria-label="Eliminar pack"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Price & Quantity row */}
        <div className="mt-3 flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleDecrement}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                'bg-cream-100 text-stone-600 hover:bg-cream-200',
                'transition-colors duration-200'
              )}
              aria-label="Reducir cantidad"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="w-8 text-center font-medium text-stone-800">{item.quantity}</span>

            <button
              type="button"
              onClick={handleIncrement}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                'bg-earth-500 text-[#ffffec] hover:bg-earth-600',
                'transition-colors duration-200'
              )}
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-display text-lg text-earth-600">
              {formatPrice(pricing.subtotalCents)}
            </p>
            {pricing.discountPercentage > 0 && (
              <p className="text-xs font-medium text-olive-600">
                -{Math.round(pricing.discountPercentage)}% ahorro
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BundleCartItem;
