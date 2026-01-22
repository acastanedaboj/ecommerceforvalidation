'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { calculatePackUnitPrice, getPackDiscount } from '@/lib/pricing';
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

    toast.success(`${product.name} anadido al carrito`, {
      style: {
        background: '#33312D',
        color: '#FDF9F3',
        borderRadius: '12px',
      },
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-400">
      {/* Image container */}
      <Link
        href={`/tienda/${product.slug}`}
        className="block relative aspect-product overflow-hidden bg-cream-100"
      >
        <Image
          src={product.images[0] || '/images/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover img-zoom"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges - Minimal style */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.tags.includes('sin-gluten') && (
            <span className="badge bg-white/90 text-stone-700 backdrop-blur-sm shadow-sm">
              Sin gluten
            </span>
          )}
          {product.tags.includes('ecologico') && (
            <span className="badge bg-olive-500/90 text-white backdrop-blur-sm">
              Ecologico
            </span>
          )}
        </div>

        {/* Low stock warning */}
        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-4 right-4">
            <span className="badge bg-earth-500/90 text-white backdrop-blur-sm">
              Ultimas unidades
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-stone-800 px-5 py-2.5 rounded-full font-medium text-sm">
              Agotado
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Weight tag */}
        <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">
          {product.weight}g
        </p>

        {/* Title */}
        <h3 className="font-display text-lg font-medium text-stone-800 mb-2 group-hover:text-earth-600 transition-colors">
          <Link href={`/tienda/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Short description */}
        <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="text-xl font-display font-medium text-stone-800">
            {formatPrice(packPrice)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(basePrice)}
              </span>
              <span className="badge-accent text-[10px]">
                -{Math.round(discount * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Pack selector */}
        {showQuickAdd && product.stock > 0 && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {[1, 3, 4, 6].map((pack) => (
                <button
                  key={pack}
                  type="button"
                  onClick={() => setSelectedPack(pack)}
                  className={cn(
                    'flex-1 py-2 text-xs font-medium rounded-lg border-2 transition-all duration-200',
                    selectedPack === pack
                      ? 'border-earth-500 bg-earth-50 text-earth-700'
                      : 'border-cream-200 hover:border-cream-300 text-stone-500 bg-cream-50/50'
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
                'btn w-full justify-center',
                isAdding
                  ? 'bg-olive-500 text-white hover:bg-olive-500'
                  : 'btn-primary'
              )}
            >
              {isAdding ? (
                <>
                  <Check className="w-4 h-4 mr-2" strokeWidth={2} />
                  Anadido
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Anadir al carrito
                </>
              )}
            </button>
          </div>
        )}

        {/* View product link when out of stock */}
        {product.stock === 0 && (
          <Link
            href={`/tienda/${product.slug}`}
            className="btn-outline w-full justify-center"
          >
            Ver producto
          </Link>
        )}
      </div>
    </article>
  );
}
