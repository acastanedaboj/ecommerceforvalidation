import type { Metadata } from 'next';
import { SITE_URL, getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog de Recetas y Nutrición | Granola Sin Gluten',
  description:
    'Recetas con granola, consejos de nutrición sin gluten y artículos sobre alimentación saludable. Smoothie bowls, overnight oats, tostadas y más ideas para tu desayuno.',
  alternates: {
    canonical: getCanonicalUrl('/blog'),
  },
  openGraph: {
    title: 'Blog de Recetas y Nutrición | Poppy',
    description:
      'Ideas deliciosas para disfrutar tu granola, consejos de nutrición y recetas saludables.',
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
