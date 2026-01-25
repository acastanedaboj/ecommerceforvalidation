import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { Toaster } from 'react-hot-toast';
import { SEO } from '@/lib/constants';
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
  SITE_URL,
  BRAND_NAME,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} - Granola Sin Gluten Premium, Ecológica y Artesanal`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    'Granola artesanal sin gluten elaborada con avena certificada (≤20ppm), miel ecológica y frutos secos premium. Opción vegana disponible. Envío gratis desde 4 unidades. Compra online en España.',
  keywords: [
    'granola sin gluten',
    'granola sin gluten españa',
    'granola ecológica',
    'granola orgánica',
    'granola premium',
    'granola vegana',
    'avena sin gluten',
    'avena certificada sin gluten',
    'desayuno sin gluten',
    'snack saludable sin gluten',
    'granola artesanal',
    'granola miel ecológica',
    'granola dátiles',
    'poppy granola',
    'comprar granola online',
  ],
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} - Granola Sin Gluten Premium`,
    description:
      'Granola artesanal sin gluten con avena certificada, miel ecológica y frutos secos premium. Opción vegana disponible. Envío gratis +4 unidades.',
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Poppy - Granola sin gluten premium, ecológica y artesanal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_NAME} - Granola Sin Gluten Premium`,
    description:
      'Granola artesanal sin gluten con avena certificada y miel ecológica. Opción vegana. Envío gratis +4 unidades.',
    images: [`${SITE_URL}/images/og-image.jpg`],
    creator: SEO.twitterHandle,
    site: SEO.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GbX2brF7bgtG_rR_nC4LDj4PMRQIXA3H1E3mvD43D8I',
  },
  category: 'food',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#E05A47" />

        {/* JSON-LD: Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationSchema()),
          }}
        />

        {/* JSON-LD: WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebsiteSchema()),
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <SessionProvider>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-earth-600 text-cream-50 px-4 py-2 rounded-md z-50"
          >
            Saltar al contenido principal
          </a>

          <Header />

          <main id="main-content" className="flex-grow">
            {children}
          </main>

          <Footer />

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Toast notifications */}
          <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1C1C1C',
              color: '#FFFFFF',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: '#7D9160',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#E05A47',
                secondary: '#FFFFFF',
              },
            },
          }}
        />

        {/* Google Analytics - placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Ahrefs Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="h5AGfn3DdpbaDrNA9emzVQ"
          async
        />
        </SessionProvider>
      </body>
    </html>
  );
}
