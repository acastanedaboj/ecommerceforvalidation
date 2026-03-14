'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
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
        <div className="relative w-12 h-12 overflow-hidden flex-shrink-0 bg-cream-100">
          <Image src={displayImage} alt={item.bundleName} fill className="object-cover" sizes="48px" />
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
    <div className="flex gap-4 py-5">
      {/* Product image — first flavor */}
      <div
        className="relative w-20 h-20 overflow-hidden flex-shrink-0"
        style={{ background: 'var(--off)' }}
      >
        <Image
          src={displayImage}
          alt={item.bundleName}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name + remove */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--dark)' }}>
              {item.bundleName}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(17,17,17,.45)', marginTop: '2px' }}>
              {summary}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="transition-all hover:opacity-50"
            style={{ color: 'rgba(17,17,17,.2)', background: 'none', border: 'none', padding: '4px' }}
            aria-label="Eliminar pack"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quantity + price */}
        <div className="mt-3 flex items-center justify-between">
          <div
            className="flex items-center"
            style={{ border: '1px solid rgba(0,0,0,.1)', borderRadius: '100px' }}
          >
            <button
              type="button"
              onClick={handleDecrement}
              className="p-2 transition-colors hover:bg-off"
              style={{ borderRadius: '100px 0 0 100px', background: 'none', border: 'none' }}
              aria-label="Reducir cantidad"
            >
              <Minus className="w-3.5 h-3.5" style={{ color: 'rgba(17,17,17,.4)' }} />
            </button>
            <span style={{ width: '32px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: 'var(--dark)' }}>
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className="p-2 transition-colors hover:bg-off"
              style={{ borderRadius: '0 100px 100px 0', background: 'none', border: 'none' }}
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3.5 h-3.5" style={{ color: 'rgba(17,17,17,.4)' }} />
            </button>
          </div>

          <div className="text-right">
            <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--dark)' }}>
              {formatPrice(pricing.subtotalCents)}
            </p>
            {pricing.discountPercentage > 0 && (
              <p style={{ fontSize: '11px', color: 'var(--blue)', fontWeight: 300 }}>
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
