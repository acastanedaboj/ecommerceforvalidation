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
  const displayImage = item.flavors.find((f) => f.quantity > 0)?.productImage || '/images/placeholder-product.jpg';

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
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-cream-100">
          <Package className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-earth-400" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-stone-800 text-sm truncate">
            {item.bundleName}
          </p>
          <p className="text-xs text-stone-500 truncate">{summary}</p>
        </div>

        {/* Quantity & Price */}
        <div className="text-right">
          <p className="font-medium text-stone-800 text-sm">
            {formatPrice(pricing.subtotalCents)}
          </p>
          <p className="text-xs text-stone-500">x{item.quantity}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex gap-4 py-5 border-b border-cream-200 last:border-b-0">
      {/* Product images collage */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-earth">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="w-8 h-8 text-earth-400" />
        </div>
        {/* Show small flavor images */}
        <div className="absolute bottom-0 left-0 right-0 flex -space-x-1 p-1">
          {item.flavors
            .filter((f) => f.quantity > 0)
            .slice(0, 3)
            .map((flavor, index) => (
              <div
                key={flavor.productId}
                className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
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
      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-medium text-stone-800 leading-tight">
              {item.bundleName}
            </h4>
            <p className="text-sm text-stone-500 mt-0.5 line-clamp-2">
              {summary}
            </p>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemove}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              'text-stone-400 hover:text-stone-600 hover:bg-cream-100',
              'transition-all duration-200',
              'opacity-0 group-hover:opacity-100 focus:opacity-100'
            )}
            aria-label="Eliminar pack"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Price & Quantity row */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleDecrement}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                'bg-cream-100 text-stone-600 hover:bg-cream-200',
                'transition-colors duration-200'
              )}
              aria-label="Reducir cantidad"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="w-8 text-center font-medium text-stone-800">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrement}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                'bg-earth-500 text-[#ffffec] hover:bg-earth-600',
                'transition-colors duration-200'
              )}
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-display text-lg text-earth-600">
              {formatPrice(pricing.subtotalCents)}
            </p>
            {pricing.discountPercentage > 0 && (
              <p className="text-xs text-olive-600 font-medium">
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
