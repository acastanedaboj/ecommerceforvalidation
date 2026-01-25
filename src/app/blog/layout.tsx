import type { Metadata } from 'next';
import { SITE_URL, getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog de Recetas y Nutricion | Granola Sin Gluten',
  description:
    'Recetas con granola, consejos de nutricion sin gluten y articulos sobre alimentacion saludable. Smoothie bowls, overnight oats, tostadas y mas ideas para tu desayuno.',
  alternates: {
    canonical: getCanonicalUrl('/blog'),
  },
  openGraph: {
    title: 'Blog de Recetas y Nutricion | Poppy',
    description:
      'Ideas deliciosas para disfrutar tu granola, consejos de nutricion y recetas saludables.',
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
