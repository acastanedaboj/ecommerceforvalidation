import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Mayorista | Granola para Profesionales',
  description:
    'Granola Poppy en formato profesional para cafeterías, hoteles y tiendas. Condiciones especiales para mayoristas. Solicita información.',
  alternates: {
    canonical: getCanonicalUrl('/mayorista'),
  },
};

export default function MayoristaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
