import type { Metadata } from 'next';
import { SITE_URL, BRAND_NAME, getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Granola artesanal sin gluten en Málaga | Reserva | Poppy',
  description:
    'Granola artesanal sin gluten y sin lactosa ecológica. 3 sabores: Clásica, Naranja y Vegana. Elaborada bajo demanda en Málaga. Reserva la tuya con entrega en mano.',
  keywords: [
    'granola artesanal Málaga',
    'granola sin gluten Málaga',
    'granola ecológica Málaga',
    'granola artesanal entrega en mano',
    'mejor granola sin gluten España',
    'granola vegana Málaga',
  ],
  alternates: {
    canonical: getCanonicalUrl('/tienda'),
  },
  openGraph: {
    title: `Comprar granola artesanal sin gluten online | ${BRAND_NAME}`,
    description:
      'Granola artesanal sin gluten ecológica. 3 sabores exclusivos. Elaborada bajo demanda en Málaga con entrega en mano.',
    url: `${SITE_URL}/tienda`,
    type: 'website',
  },
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
