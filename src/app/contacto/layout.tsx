import type { Metadata } from 'next';
import { SITE_URL, getCanonicalUrl, buildBreadcrumbSchema, buildLocalBusinessSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contacto | Atención al Cliente Granola Poppy',
  description:
    'Contacta con Poppy. Resolvemos tus dudas sobre pedidos, productos, suscripciones o ventas mayoristas. Respuesta en 24-48 horas. Email: hola@poppy.es',
  alternates: {
    canonical: getCanonicalUrl('/contacto'),
  },
  openGraph: {
    title: 'Contacto | Poppy',
    description:
      'Estamos aquí para ayudarte. Contacta con nosotros para cualquier consulta sobre pedidos o productos.',
    url: `${SITE_URL}/contacto`,
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD: Local Business Schema */}
      <JsonLd data={buildLocalBusinessSchema()} />

      {/* JSON-LD: Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Contacto', url: '/contacto' },
        ])}
      />

      {children}
    </>
  );
}
