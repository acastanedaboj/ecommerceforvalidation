import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { Toaster } from 'react-hot-toast';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.defaultDescription,
  keywords: [
    'nalu',
    'nalu granola',
    'granola sin gluten',
    'granola ecologica',
    'granola premium',
    'desayuno saludable',
    'avena sin gluten',
    'snack saludable',
    'granola espana',
  ],
  authors: [{ name: 'Nalu' }],
  creator: 'Nalu',
  publisher: 'Nalu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SEO.siteUrl,
    siteName: 'Nalu',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: 'Nalu - Granola sin gluten, organica, premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.ogImage],
    creator: SEO.twitterHandle,
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
        <meta name="theme-color" content="#A66842" />
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
              background: '#33312D',
              color: '#FDF9F3',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: '#8BA664',
                secondary: '#FDF9F3',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#FDF9F3',
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
        </SessionProvider>
      </body>
    </html>
  );
}
