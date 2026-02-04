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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            {subtitle && (
              <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">
                {subtitle}
              </p>
            )}
            <h2 className="font-display text-stone-800 mb-4">{title}</h2>
            {description && (
              <p className="text-stone-600 text-lg max-w-2xl">{description}</p>
            )}
          </div>
          <Link
            href={ctaHref}
            className="mt-6 md:mt-0 text-earth-600 hover:text-earth-700 font-medium inline-flex items-center gap-2 group"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className={`grid gap-10 ${
          products.length === 1
            ? 'max-w-md mx-auto'
            : products.length === 2
              ? 'sm:grid-cols-2 max-w-3xl mx-auto'
              : products.length === 3
                ? 'sm:grid-cols-2 lg:grid-cols-3'
                : 'sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={highlightProductId === product.id ? 'ring-2 ring-earth-500 rounded-lg' : ''}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
