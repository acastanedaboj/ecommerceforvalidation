import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Toaster } from 'react-hot-toast';
import { SEO } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.defaultDescription,
  keywords: [
    'granola artesanal',
    'granola sin gluten',
    'granola ecológica',
    'granola premium',
    'desayuno saludable',
    'avena sin gluten',
    'snack saludable',
    'granola españa',
  ],
  authors: [{ name: 'Granola Artesanal' }],
  creator: 'Granola Artesanal',
  publisher: 'Granola Artesanal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SEO.siteUrl,
    siteName: 'Granola Artesanal',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: 'Granola Artesanal - Sin gluten, orgánica, premium',
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
  verification: {
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#d4863d" />
      </head>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900 min-h-screen flex flex-col">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50"
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
              background: '#292524',
              color: '#fafaf9',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#22c522',
                secondary: '#fafaf9',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fafaf9',
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
      </body>
    </html>
  );
}
