// ==========================================
// Business Constants - Poppy
// ==========================================

export const BUSINESS = {
  name: 'Poppy',
  tagline: 'Sin gluten real, orgánica, artesanal',
  email: 'hola@poppy.es',
  address: {
    street: 'Avda. Sor Teresa Prat, 15',
    city: 'Málaga',
    postalCode: '29003',
    country: 'España',
  },
  socialMedia: {
    instagram: 'https://instagram.com/poppy_granola',
    facebook: 'https://facebook.com/poppygranola',
  },
} as const;

// ==========================================
// Pricing Configuration
// ==========================================

export const PRICING = {
  // Base price in cents (7.00€)
  BASE_PRICE_CENTS: 700,

  // Pack discounts (percentage off per unit)
  PACK_DISCOUNTS: {
    1: 0,      // No discount for single
    3: 0.03,   // 3% off = 6.79€/unit
    4: 0.05,   // 5% off = 6.65€/unit
    6: 0.10,   // 10% off = 6.30€/unit
  } as Record<number, number>,

  // Subscription additional discount (on top of pack 6)
  SUBSCRIPTION_DISCOUNT: 0.15, // 15% off = 5.95€/unit

  // VAT rate (Spain - reduced rate for food)
  VAT_RATE: 0.10, // 10%
} as const;

// ==========================================
// Shipping Configuration
// ==========================================

export const SHIPPING = {
  // Standard shipping cost in cents (2.00€)
  STANDARD_COST_CENTS: 200,

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
  WEIGHT_GRAMS: 150,
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
  titleTemplate: '%s | Poppy',
  defaultTitle: 'Poppy - Granola Sin Gluten, Orgánica, Premium',
  defaultDescription:
    'Granola artesanal 150g sin gluten real, elaborada con avena certificada, miel ecológica y frutos secos premium. Envío gratis a partir de 4 bolsas.',
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://poppy.es',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@poppy_granola',
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
    // { name: 'B2B / Horeca', href: '/mayorista' }, // Hidden until ready
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
      // { name: 'Mayorista / B2B', href: '/mayorista' }, // Hidden until ready
      { name: 'Contacto', href: '/contacto' },
    ],
    recursos: [
      { name: 'Granola sin gluten', href: '/granola-sin-gluten' },
      { name: 'Granola para celíacos', href: '/granola-para-celiacos' },
      { name: 'Granola ecológica', href: '/granola-ecologica' },
      { name: 'Granola vegana', href: '/granola-vegana' },
      { name: 'Mejor granola España', href: '/mejor-granola-sin-gluten-espana' },
      { name: 'vs. Mercadona', href: '/granola-sin-gluten-mercadona' },
      { name: 'vs. Carrefour', href: '/granola-sin-gluten-carrefour' },
      { name: 'Guía celíaquía', href: '/guia-celiaquia-dieta-sin-gluten' },
      { name: 'Cómo hacer granola', href: '/como-hacer-granola-sin-gluten' },
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
