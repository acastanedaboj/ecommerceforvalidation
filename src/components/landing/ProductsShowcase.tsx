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
    <section className="section bg-white">
      <div className="container-custom">
        <div className="mb-14 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            {subtitle && (
              <p className="mb-4 text-xs uppercase tracking-widest text-stone-500">{subtitle}</p>
            )}
            <h2 className="mb-4 font-display text-stone-800">{title}</h2>
            {description && <p className="max-w-2xl text-lg text-stone-600">{description}</p>}
          </div>
          <Link
            href={ctaHref}
            className="group mt-6 inline-flex items-center gap-2 font-medium text-earth-600 hover:text-earth-700 md:mt-0"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          {products.map((product, index) => (
            <div
              key={product.id}
              className={
                highlightProductId === product.id ? 'rounded-lg ring-2 ring-earth-500' : ''
              }
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
