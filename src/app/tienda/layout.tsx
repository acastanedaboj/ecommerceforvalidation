import type { Metadata } from 'next';
import { SITE_URL, BRAND_NAME, getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Comprar granola artesanal sin gluten online | Poppy',
  description:
    'Compra granola artesanal sin gluten y sin lactosa ecológica online. 3 sabores: Clásica, Naranja y Vegana. Ahorra hasta 10% en packs. Envío gratis +4 uds. Entrega en toda España.',
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
    title: `Comprar granola artesanal sin gluten online | ${BRAND_NAME}`,
    description:
      'Compra granola artesanal sin gluten ecológica. 3 sabores exclusivos. Ahorra hasta 10% en packs. Envío gratis +4 unidades.',
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
