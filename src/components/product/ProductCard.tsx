'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Plus, Check } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { calculatePackUnitPrice, getPackDiscount } from '@/lib/pricing';
import { PRICING } from '@/lib/constants';
import type { Product } from '@/data/products';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedPack, setSelectedPack] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const basePrice = product.priceInCents;
  const packPrice = calculatePackUnitPrice(selectedPack);
  const discount = getPackDiscount(selectedPack);
  const hasDiscount = discount > 0;

  const handleQuickAdd = () => {
    setIsAdding(true);

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0] || '/images/placeholder-product.jpg',
      packSize: selectedPack,
      isSubscription: false,
      priceInCents: basePrice,
    });

    toast.success(`${product.name} añadido al carrito`);

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <article className="card group">
      {/* Image container */}
      <Link href={`/tienda/${product.slug}`} className="block relative aspect-product overflow-hidden">
        <Image
          src={product.images[0] || '/images/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tags.includes('sin-gluten') && (
            <span className="badge bg-white/90 text-neutral-800 shadow-sm">
              Sin gluten
            </span>
          )}
          {product.tags.includes('ecologico') && (
            <span className="badge bg-accent-500 text-white">
              Ecológico
            </span>
          )}
        </div>

        {/* Low stock warning */}
        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-amber-500 text-white">
              ¡Últimas unidades!
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium">
              Agotado
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
          {product.weight}g
        </p>

        {/* Title */}
        <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
          <Link href={`/tienda/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Short description */}
        <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-neutral-900">
            {formatPrice(packPrice)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-neutral-400 line-through">
                {formatPrice(basePrice)}
              </span>
              <span className="badge-accent">
                -{Math.round(discount * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Pack selector */}
        {showQuickAdd && product.stock > 0 && (
          <div className="space-y-3">
            <div className="flex gap-2">
              {[1, 3, 4, 6].map((pack) => (
                <button
                  key={pack}
                  type="button"
                  onClick={() => setSelectedPack(pack)}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors',
                    selectedPack === pack
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                  )}
                >
                  {pack === 1 ? '1 ud' : `Pack ${pack}`}
                </button>
              ))}
            </div>

            {/* Add to cart button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={cn(
                'btn w-full justify-center text-sm',
                isAdding
                  ? 'bg-accent-500 text-white'
                  : 'btn-primary'
              )}
            >
              {isAdding ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Añadido
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Añadir al carrito
                </>
              )}
            </button>
          </div>
        )}

        {/* View product link when out of stock */}
        {product.stock === 0 && (
          <Link
            href={`/tienda/${product.slug}`}
            className="btn-outline w-full justify-center text-sm"
          >
            Ver producto
          </Link>
        )}
      </div>
    </article>
  );
}
