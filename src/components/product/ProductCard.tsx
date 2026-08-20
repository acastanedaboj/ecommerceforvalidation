'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Check, Truck } from 'lucide-react';
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
  const hasFreeShipping = selectedPack >= 4;

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
        background: '#1C1C1C',
        color: '#FDFCFB',
        borderRadius: '12px',
      },
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <article className="card-premium group">
      {/* Image container */}
      <Link
        href={`/tienda/${product.slug}`}
        className="aspect-product relative block overflow-hidden bg-cream-100"
      >
        <Image
          src={product.images[0] || '/images/placeholder-product.jpg'}
          alt={product.name}
          fill
          className={cn(
            'object-cover transition-all duration-500 ease-out',
            product.images[1]
              ? 'group-hover:scale-[1.03] group-hover:opacity-0'
              : 'group-hover:scale-[1.03]'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} - detalle`}
            fill
            className="object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Badges - Minimal style */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.tags.includes('sin-gluten') && (
            <span className="badge bg-white/95 text-stone-700 shadow-sm backdrop-blur-sm">
              Sin gluten
            </span>
          )}
          {product.tags.includes('ecologico') && (
            <span className="badge bg-olive-500/95 text-stone-700 backdrop-blur-sm">Ecologico</span>
          )}
        </div>

        {/* Low stock warning */}
        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute right-4 top-4">
            <span className="badge bg-earth-500/95 text-[#ffffec] backdrop-blur-sm">
              Ultimas unidades
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px]">
            <span className="bg-white px-5 py-2.5 text-sm font-medium text-stone-800 shadow-soft">
              Agotado
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Weight tag */}
        <p className="mb-2 text-xs uppercase tracking-wider text-stone-400">{product.weight}g</p>

        {/* Title */}
        <h3 className="mb-2 font-display text-xl font-medium text-stone-800 transition-colors group-hover:text-earth-600">
          <Link href={`/tienda/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Short description */}
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-stone-500">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="mb-5 flex items-baseline gap-2.5">
          <span className="font-display text-2xl text-earth-600">{formatPrice(packPrice)}</span>
          <span className="text-sm text-stone-400">/ud</span>
          {hasDiscount && (
            <>
              <span className="text-sm text-stone-300 line-through">{formatPrice(basePrice)}</span>
              <span className="badge bg-olive-100 text-[10px] text-olive-700">
                -{Math.round(discount * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Free shipping indicator */}
        {hasFreeShipping && (
          <div className="mb-4 flex items-center gap-2 text-sm text-earth-600">
            <Truck className="h-4 w-4" />
            <span className="font-medium">Envio gratis</span>
          </div>
        )}

        {/* Pack selector - Pills style */}
        {showQuickAdd && product.stock > 0 && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {[1, 3, 4, 6].map((pack) => {
                const isSelected = selectedPack === pack;
                const packDiscount = getPackDiscount(pack);
                return (
                  <button
                    key={pack}
                    type="button"
                    onClick={() => setSelectedPack(pack)}
                    className={cn(
                      'relative flex-1 border py-2.5 text-xs font-medium transition-all duration-300',
                      isSelected
                        ? 'border-earth-600 bg-earth-50 text-earth-700'
                        : 'border-stone-300 bg-white text-stone-600 hover:border-stone-400'
                    )}
                  >
                    {pack === 1 ? '1 ud' : `Pack ${pack}`}
                    {packDiscount > 0 && (
                      <span className="absolute -right-1 -top-1.5 bg-olive-500 px-1.5 py-0.5 text-[8px] font-bold text-stone-900">
                        -{Math.round(packDiscount * 100)}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Add to cart button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={cn(
                'btn w-full justify-center py-3.5',
                isAdding ? 'bg-olive-500 text-[#ffffec] hover:bg-olive-500' : 'btn-primary'
              )}
            >
              {isAdding ? (
                <>
                  <Check className="mr-2 h-4 w-4" strokeWidth={2.5} />
                  Anadido
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-4 w-4" strokeWidth={1.5} />
                  Anadir al carrito
                </>
              )}
            </button>
          </div>
        )}

        {/* View product link when out of stock */}
        {product.stock === 0 && (
          <Link href={`/tienda/${product.slug}`} className="btn-outline w-full justify-center">
            Ver producto
          </Link>
        )}
      </div>
    </article>
  );
}
