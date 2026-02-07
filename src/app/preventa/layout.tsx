import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Preventa Especial - Granola Artesanal | Poppy',
  description:
    'Sé de los primeros en probar nuestra granola artesanal. Preventa especial con entrega en mano. Solo 7€ por bolsa de 150g.',
  alternates: {
    canonical: getCanonicalUrl('/preventa'),
  },
  robots: 'noindex, nofollow', // Validation campaign - not for public indexing
};

export default function PreventaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
