import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRetailProducts } from '@/data/products';
import {
  SITE_URL,
  BRAND_NAME,
  getCanonicalUrl,
  buildProductSchema,
  buildBreadcrumbSchema,
  JsonLd,
} from '@/lib/seo';

interface Props {
  params: { slug: string };
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return { title: 'Producto no encontrado' };
  }

  const productUrl = `/tienda/${product.slug}`;

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: {
      canonical: getCanonicalUrl(productUrl),
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `${SITE_URL}${productUrl}`,
      type: 'website',
      images: [
        {
          url: product.images[0]?.startsWith('http')
            ? product.images[0]
            : `${SITE_URL}${product.images[0]}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const products = getRetailProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductLayout({ params, children }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const productUrl = `/tienda/${product.slug}`;

  return (
    <>
      {/* JSON-LD: Product Schema */}
      <JsonLd data={buildProductSchema(product, productUrl)} />

      {/* JSON-LD: Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Tienda', url: '/tienda' },
          { name: product.name, url: productUrl },
        ])}
      />

      {children}
    </>
  );
}
