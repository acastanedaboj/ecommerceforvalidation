import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/data/products';

interface ProductsShowcaseProps {
  title: string;
  subtitle?: string;
  description?: string;
  products: Product[];
  ctaText?: string;
  ctaHref?: string;
  highlightProductId?: string;
}

export function ProductsShowcase({
  title,
  subtitle,
  description,
  products,
  ctaText = 'Ver todos los productos',
  ctaHref = '/tienda',
  highlightProductId,
}: ProductsShowcaseProps) {
  return (
    <section style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="container-custom">
        <div className="mb-14 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            {subtitle && (
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(17,17,17,.35)',
                  marginBottom: '16px',
                }}
              >
                {subtitle}
              </p>
            )}
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>{title}</h2>
            {description && (
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(17,17,17,.5)',
                  fontWeight: 300,
                  lineHeight: 1.85,
                  maxWidth: '520px',
                }}
              >
                {description}
              </p>
            )}
          </div>
          <Link href={ctaHref} className="btn-text mt-6 md:mt-0">
            {ctaText}
          </Link>
        </div>

        <div
          className={`grid gap-10 ${
            products.length === 1
              ? 'mx-auto max-w-md'
              : products.length === 2
                ? 'mx-auto max-w-3xl sm:grid-cols-2'
                : products.length === 3
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : 'sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={highlightProductId === product.id ? 'ring-2 ring-poppy-brown' : ''}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
