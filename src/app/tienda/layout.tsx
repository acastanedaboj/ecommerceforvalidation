import type { Metadata } from 'next';
import { SITE_URL, BRAND_NAME, getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Comprar Granola Artesanal Sin Gluten Online | Poppy',
  description:
    'Compra granola artesanal sin gluten ecológica online. 4 sabores: Clásica, Chocolate, Naranja y Vegana. Ahorra hasta 10% en packs. Envío gratis +4 uds. Entrega en toda España.',
  keywords: [
    'comprar granola artesanal online',
    'granola sin gluten comprar',
    'granola ecológica a domicilio',
    'granola artesanal envío gratis',
    'mejor granola sin gluten España',
    'granola vegana comprar España',
  ],
  alternates: {
    canonical: getCanonicalUrl('/tienda'),
  },
  openGraph: {
    title: `Comprar Granola Artesanal Sin Gluten Online | ${BRAND_NAME}`,
    description:
      'Compra granola artesanal sin gluten ecológica. 4 sabores exclusivos. Ahorra hasta 10% en packs. Envío gratis +4 unidades.',
    url: `${SITE_URL}/tienda`,
    type: 'website',
  },
};

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
