// ==========================================
// Business Constants - Nalu
// ==========================================

export const BUSINESS = {
  name: 'Nalu',
  tagline: 'Sin gluten real, orgánica, artesanal',
  email: 'hola@nalu.es',
  phone: '+34 600 000 000',
  address: {
    street: 'Calle Ejemplo, 123',
    city: 'Madrid',
    postalCode: '28001',
    country: 'España',
  },
  socialMedia: {
    instagram: 'https://instagram.com/nalu_granola',
    facebook: 'https://facebook.com/nalugranola',
  },
} as const;

// ==========================================
// Pricing Configuration
// ==========================================

export const PRICING = {
  // Base price in cents (9.00€)
  BASE_PRICE_CENTS: 900,

  // Pack discounts (percentage off per unit)
  PACK_DISCOUNTS: {
    1: 0,      // No discount for single
    3: 0.03,   // 3% off = 8.70€/unit
    4: 0.05,   // 5% off = 8.55€/unit
    6: 0.10,   // 10% off = 8.10€/unit
  } as Record<number, number>,

  // Subscription additional discount (on top of pack 6)
  SUBSCRIPTION_DISCOUNT: 0.15, // 15% off = 7.65€/unit

  // VAT rate (Spain - reduced rate for food)
  VAT_RATE: 0.10, // 10%
} as const;

// ==========================================
// Shipping Configuration
// ==========================================

export const SHIPPING = {
  // Standard shipping cost in cents (4.95€)
  STANDARD_COST_CENTS: 495,

  // Free shipping thresholds
  FREE_SHIPPING_MIN_ITEMS: 4,
  FREE_SHIPPING_MIN_AMOUNT_CENTS: 3500, // 35€

  // Delivery estimates
  ESTIMATED_DAYS: {
    peninsula: '2-4 días laborables',
    islands: '5-7 días laborables',
  },
} as const;

// ==========================================
// Product Configuration
// ==========================================

export const PRODUCT = {
  // Standard weight
  WEIGHT_GRAMS: 250,
  WEIGHT_HORECA_GRAMS: 1000,

  // Available pack sizes
  PACK_SIZES: [1, 3, 4, 6] as const,

  // Subscription pack size
  SUBSCRIPTION_PACK_SIZE: 6,

  // Stock alert threshold
  LOW_STOCK_THRESHOLD: 10,
} as const;

// ==========================================
// Currency Configuration
// ==========================================

export const CURRENCY = {
  code: 'EUR',
  symbol: '€',
  locale: 'es-ES',
} as const;

// ==========================================
// SEO Defaults
// ==========================================

export const SEO = {
  titleTemplate: '%s | Nalu',
  defaultTitle: 'Nalu - Granola Sin Gluten, Orgánica, Premium',
  defaultDescription:
    'Granola artesanal 250g sin gluten real, elaborada con avena certificada, miel ecológica y frutos secos premium. Envío gratis a partir de 4 bolsas.',
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://nalu.es',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@nalu_granola',
} as const;

// ==========================================
// Navigation
// ==========================================

export const NAVIGATION = {
  main: [
    { name: 'Inicio', href: '/' },
    { name: 'Tienda', href: '/tienda' },
    { name: 'Suscripción', href: '/suscripcion' },
    { name: 'Recetas', href: '/blog' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'B2B / Horeca', href: '/mayorista' },
  ],
  footer: {
    tienda: [
      { name: 'Todos los productos', href: '/tienda' },
      { name: 'Packs', href: '/tienda?pack=true' },
      { name: 'Suscripción', href: '/suscripcion' },
    ],
    empresa: [
      { name: 'Sobre nosotros', href: '/nosotros' },
      { name: 'Blog & Recetas', href: '/blog' },
      { name: 'Mayorista / B2B', href: '/mayorista' },
      { name: 'Contacto', href: '/contacto' },
    ],
    ayuda: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Envíos', href: '/faq#envios' },
      { name: 'Devoluciones', href: '/faq#devoluciones' },
      { name: 'Mi cuenta', href: '/cuenta' },
    ],
    legal: [
      { name: 'Aviso legal', href: '/legal/aviso-legal' },
      { name: 'Política de privacidad', href: '/legal/privacidad' },
      { name: 'Política de cookies', href: '/legal/cookies' },
      { name: 'Condiciones de venta', href: '/legal/condiciones-venta' },
    ],
  },
} as const;
