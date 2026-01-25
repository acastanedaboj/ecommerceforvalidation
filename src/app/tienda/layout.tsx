import type { Metadata } from 'next';
import { SITE_URL, BRAND_NAME, getCanonicalUrl, buildProductListSchema, buildBreadcrumbSchema, JsonLd } from '@/lib/seo';
import { getRetailProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Tienda Online | Comprar Granola Sin Gluten',
  description:
    'Compra granola sin gluten artesanal Poppy online. Sabores: Chocolate, Naranja y Dátiles (vegana). Packs desde 3 unidades con descuento. Envío gratis +4 bolsas.',
  alternates: {
    canonical: getCanonicalUrl('/tienda'),
  },
  openGraph: {
    title: `Tienda Online | ${BRAND_NAME}`,
    description:
      'Compra granola sin gluten artesanal. Sabores exclusivos con descuentos por pack. Envío gratis desde 4 unidades.',
    url: `${SITE_URL}/tienda`,
    type: 'website',
  },
};

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = getRetailProducts();

  return (
    <>
      {/* JSON-LD: Product List Schema */}
      <JsonLd data={buildProductListSchema(products, 'Granola Sin Gluten Poppy')} />

      {/* JSON-LD: Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Tienda', url: '/tienda' },
        ])}
      />

      {children}
    </>
  );
}
