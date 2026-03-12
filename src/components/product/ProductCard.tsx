'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck } from 'lucide-react';
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

    toast.success(`${product.name} añadido al carrito`, {
      style: {
        background: '#111111',
        color: '#ffffff',
        borderRadius: '0px',
      },
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <article className="group" style={{ cursor: 'pointer' }}>
      {/* Image container - 3:4 aspect with accent bar */}
      <Link
        href={`/tienda/${product.slug}`}
        className="block relative overflow-hidden mb-4"
        style={{ aspectRatio: '3/4', background: 'var(--off)' }}
      >
        <Image
          src={product.images[0] || '/images/placeholder-product.jpg'}
          alt={product.name}
          fill
          className={cn(
            'object-cover transition-all duration-500 ease-out',
            product.images[1] ? 'group-hover:opacity-0 group-hover:scale-[1.03]' : 'group-hover:scale-[1.03]'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} - detalle`}
            fill
            className="object-cover transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{ height: '3px', background: 'var(--yellow)' }}
        />

        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10">
          {product.tags.includes('sin-gluten') && (
            <span
              style={{
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--dark)',
                background: 'rgba(255,255,255,.85)',
                padding: '3px 8px',
                backdropFilter: 'blur(4px)',
                display: 'inline-block',
              }}
            >
              Sin gluten
            </span>
          )}
        </div>

        {/* Low stock warning */}
        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-3 right-3">
            <span
              style={{
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                background: 'rgba(17,17,17,.75)',
                padding: '3px 8px',
                backdropFilter: 'blur(4px)',
              }}
            >
              Ultimas unidades
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span
              style={{
                background: 'var(--white)',
                color: 'var(--dark)',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'lowercase',
              }}
            >
              agotado
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div>
        {/* Title */}
        <h3
          className="transition-colors duration-200"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '19px',
            color: 'var(--dark)',
            marginBottom: '5px',
          }}
        >
          <Link
            href={`/tienda/${product.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            className="group-hover:text-poppy-brown"
          >
            {product.name}
          </Link>
        </h3>

        {/* Short description */}
        <p
          className="line-clamp-2"
          style={{
            fontSize: '12px',
            color: 'var(--dark)',
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '14px',
          }}
        >
          {product.shortDescription}
        </p>

        {/* Price and add button */}
        <div className="flex justify-between items-center mb-3">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              color: 'var(--dark)',
            }}
          >
            {formatPrice(packPrice)}
            {hasDiscount && (
              <span style={{ fontSize: '12px', color: 'rgba(17,17,17,.35)', marginLeft: '8px', textDecoration: 'line-through', fontFamily: 'var(--font-sans)' }}>
                {formatPrice(basePrice)}
              </span>
            )}
          </span>

          {showQuickAdd && product.stock > 0 && (
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={cn('btn-card', isAdding && 'opacity-60')}
            >
              {isAdding ? 'Añadido' : 'Añadir'}
            </button>
          )}
        </div>

        {/* Free shipping indicator */}
        {hasFreeShipping && (
          <div className="flex items-center gap-2 mb-3" style={{ fontSize: '11px', color: 'var(--brown)', fontWeight: 300 }}>
            <Truck className="w-3.5 h-3.5" />
            <span>Envio gratis</span>
          </div>
        )}

        {/* Pack selector */}
        {showQuickAdd && product.stock > 0 && (
          <div className="flex gap-2">
            {[1, 3, 4, 6].map((pack) => {
              const isSelected = selectedPack === pack;
              const packDiscount = getPackDiscount(pack);
              return (
                <button
                  key={pack}
                  type="button"
                  onClick={() => setSelectedPack(pack)}
                  className="relative flex-1 py-2 transition-all duration-200"
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'lowercase',
                    border: isSelected ? '1.5px solid var(--dark)' : '1px solid rgba(0,0,0,.12)',
                    borderRadius: '100px',
                    background: isSelected ? 'var(--off)' : 'transparent',
                    color: 'var(--dark)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pack === 1 ? '1 ud' : `pack ${pack}`}
                  {packDiscount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1"
                      style={{
                        padding: '1px 4px',
                        background: 'var(--yellow)',
                        color: 'var(--dark)',
                        fontSize: '8px',
                        fontWeight: 700,
                      }}
                    >
                      -{Math.round(packDiscount * 100)}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* View product link when out of stock */}
        {product.stock === 0 && (
          <Link
            href={`/tienda/${product.slug}`}
            className="btn-pill text-center mt-3"
          >
            Ver producto
          </Link>
        )}
      </div>
    </article>
  );
}
