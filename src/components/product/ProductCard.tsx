'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import type { Product } from '@/data/products';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const basePrice = product.priceInCents;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0] || '/images/placeholder-product.jpg',
      packSize: 1,
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
    <article className="group">
      {/* Image — 4:5 aspect, no decorative bars */}
      <Link
        href={`/tienda/${product.slug}`}
        className="block relative overflow-hidden mb-5"
        style={{ aspectRatio: '4/5', background: 'var(--off)' }}
      >
        <Image
          src={product.images[0] || '/images/placeholder-product.jpg'}
          alt={product.name}
          fill
          className={cn(
            'object-cover transition-all duration-700 ease-out',
            product.images[1] ? 'group-hover:opacity-0 group-hover:scale-[1.02]' : 'group-hover:scale-[1.02]'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} - detalle`}
            fill
            className="object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Subtle badge on image */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {product.tags.includes('sin-gluten') && (
            <span
              style={{
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--dark)',
                background: 'rgba(255,255,255,.88)',
                padding: '4px 10px',
                backdropFilter: 'blur(8px)',
              }}
            >
              Sin gluten · Sin lactosa
            </span>
          )}
        </div>

        {/* Low stock */}
        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-4 right-4">
            <span
              style={{
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                background: 'rgba(17,17,17,.7)',
                padding: '4px 10px',
                backdropFilter: 'blur(8px)',
              }}
            >
              Últimas unidades
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

        {/* Quick add — appears on hover */}
        {showQuickAdd && product.stock > 0 && (
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={cn(
              'absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0',
              isAdding && 'opacity-60'
            )}
            style={{
              background: 'var(--dark)',
              color: 'var(--cream)',
              padding: '8px 16px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              border: 'none',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            {isAdding ? 'Añadido ✓' : 'Añadir'}
          </button>
        )}
      </Link>

      {/* Content — minimal: name, one-liner, price */}
      <div style={{ padding: '0 2px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            color: 'var(--dark)',
            marginBottom: '6px',
            letterSpacing: '-0.01em',
          }}
        >
          <Link
            href={`/tienda/${product.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            className="group-hover:text-poppy-brown transition-colors duration-300"
          >
            {product.name}
          </Link>
        </h3>

        <p
          className="line-clamp-1"
          style={{
            fontSize: '13px',
            color: 'var(--dark)',
            opacity: 0.45,
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '12px',
          }}
        >
          {product.shortDescription}
        </p>

        <div className="flex items-baseline gap-2">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              color: 'var(--dark)',
            }}
          >
            {formatPrice(basePrice)}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--dark)', opacity: 0.35, fontWeight: 300 }}>
            · desde {formatPrice(basePrice)}
          </span>
        </div>

        {/* View product link when out of stock */}
        {product.stock === 0 && (
          <Link
            href={`/tienda/${product.slug}`}
            className="btn-pill text-center mt-4 w-full"
          >
            Ver producto
          </Link>
        )}
      </div>
    </article>
  );
}
