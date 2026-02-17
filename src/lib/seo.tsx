/**
 * SEO Utilities - Poppy
 *
 * JSON-LD Schema builders and SEO helpers for improved search engine visibility.
 */

import { BUSINESS, SEO } from './constants';
import type { Product } from '@/data/products';
import type { BlogPost } from '@/data/blog';
import type { FAQ } from '@/data/faqs';

// ==========================================
// Site Configuration
// ==========================================

export const SITE_URL = 'https://www.poppy.es';
export const BRAND_NAME = 'Poppy';

// ==========================================
// Type Definitions
// ==========================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SchemaOrganization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
}

// ==========================================
// Organization Schema
// ==========================================

export function buildOrganizationSchema(): SchemaOrganization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      'Poppy elabora granola artesanal sin gluten con avena certificada, miel ecológica y frutos secos premium. Envíos a toda España.',
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: 'ES',
    },
    sameAs: [
      BUSINESS.socialMedia.instagram,
      BUSINESS.socialMedia.facebook,
    ],
  };
}

// ==========================================
// WebSite Schema (with SearchAction)
// ==========================================

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND_NAME,
    url: SITE_URL,
    description: SEO.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/tienda?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ==========================================
// Breadcrumb Schema
// ==========================================

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ==========================================
// Product Schema
// ==========================================

export function buildProductSchema(product: Product, url: string) {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const imageUrl = product.images[0]?.startsWith('http')
    ? product.images[0]
    : `${SITE_URL}${product.images[0]}`;

  // Build dietary suitability array
  const suitableForDiet: string[] = ['https://schema.org/GlutenFreeDiet'];
  if (product.isVegan) {
    suitableForDiet.push('https://schema.org/VeganDiet');
  }

  // Build additional properties for rich attributes
  const additionalProperty = [
    {
      '@type': 'PropertyValue',
      name: 'Sin Gluten',
      value: 'Sí - Avena certificada ≤20ppm',
    },
    {
      '@type': 'PropertyValue',
      name: 'Ecológico',
      value: 'Sí - Ingredientes de agricultura ecológica',
    },
    {
      '@type': 'PropertyValue',
      name: 'Elaboración',
      value: 'Artesanal - Tostado lento en pequeños lotes',
    },
    {
      '@type': 'PropertyValue',
      name: 'Vegano',
      value: product.isVegan ? 'Sí' : 'No - Contiene miel',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: imageUrl,
    url: fullUrl,
    sku: product.sku,
    gtin13: undefined, // Add EAN/GTIN when available
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    manufacturer: {
      '@type': 'Organization',
      name: BRAND_NAME,
    },
    category: 'Alimentación > Cereales y Granola > Granola Sin Gluten',
    weight: {
      '@type': 'QuantitativeValue',
      value: product.weight,
      unitCode: 'GRM',
      unitText: 'g',
    },
    additionalProperty,
    suitableForDiet,
    countryOfOrigin: {
      '@type': 'Country',
      name: 'España',
    },
    offers: {
      '@type': 'Offer',
      url: fullUrl,
      priceCurrency: 'EUR',
      price: (product.priceInCents / 100).toFixed(2),
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().split('T')[0],
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: BRAND_NAME,
      },
      shippingDetails: [
        {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '4.95',
            currency: 'EUR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'ES',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 4,
              unitCode: 'DAY',
            },
          },
        },
        {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'EUR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'ES',
          },
          freeShippingThreshold: {
            '@type': 'DeliveryChargeSpecification',
            freeShippingThreshold: {
              '@type': 'MonetaryAmount',
              value: '35.00',
              currency: 'EUR',
            },
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 4,
              unitCode: 'DAY',
            },
          },
        },
      ],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'ES',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: product.nutritionalInfo.servingSize,
      calories: `${product.nutritionalInfo.calories} kcal`,
      fatContent: `${product.nutritionalInfo.fat}g`,
      saturatedFatContent: `${product.nutritionalInfo.saturatedFat}g`,
      carbohydrateContent: `${product.nutritionalInfo.carbohydrates}g`,
      sugarContent: `${product.nutritionalInfo.sugars}g`,
      fiberContent: `${product.nutritionalInfo.fiber}g`,
      proteinContent: `${product.nutritionalInfo.protein}g`,
      sodiumContent: `${product.nutritionalInfo.salt}g`,
    },
    // aggregateRating: omitted until real reviews are collected.
    // Hardcoded ratings violate Google's spam policy and risk manual action.
  };
}

// ==========================================
// FAQ Schema
// ==========================================

export function buildFaqSchema(faqItems: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/\*\*/g, '').replace(/\n/g, ' ').trim(),
      },
    })),
  };
}

// ==========================================
// Article Schema (for Blog posts)
// ==========================================

export function buildArticleSchema(post: BlogPost, url: string) {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const imageUrl = post.coverImage?.startsWith('http')
    ? post.coverImage
    : `${SITE_URL}${post.coverImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    url: fullUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };
}

// ==========================================
// Local Business Schema (enhanced for local SEO - Málaga)
// ==========================================

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Store'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: `${BRAND_NAME} - Granola Artesanal Sin Gluten`,
    alternateName: BRAND_NAME,
    description:
      'Compra granola artesanal sin gluten online. Obrador en Málaga. Elaboramos con avena certificada, miel ecológica y frutos secos premium. Envío gratis +4 uds a toda España.',
    image: [
      `${SITE_URL}/images/hero-granola.jpeg`,
      `${SITE_URL}/logo.svg`,
    ],
    url: SITE_URL,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: 'Andalucía',
      postalCode: BUSINESS.address.postalCode,
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.7213,
      longitude: -4.4214,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'España',
      },
      {
        '@type': 'City',
        name: 'Málaga',
      },
    ],
    priceRange: '€€',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Granola Artesanal Sin Gluten',
      url: `${SITE_URL}/tienda`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Granola Clásica Sin Gluten 150g',
            url: `${SITE_URL}/tienda/granola-clasica-150g`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Granola de Chocolate Sin Gluten 150g',
            url: `${SITE_URL}/tienda/granola-chocolate-150g`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Granola de Naranja Sin Gluten 150g',
            url: `${SITE_URL}/tienda/granola-naranja-150g`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Granola Vegana Sin Gluten 150g',
            url: `${SITE_URL}/tienda/granola-vegana-150g`,
          },
        },
      ],
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    paymentAccepted: ['Tarjeta de crédito', 'Tarjeta de débito', 'Transferencia bancaria'],
    currenciesAccepted: 'EUR',
    keywords:
      'comprar granola artesanal, granola sin gluten Málaga, granola ecológica cerca de mí, comprar granola online España, granola artesanal a domicilio, mejor granola sin gluten',
    sameAs: [BUSINESS.socialMedia.instagram, BUSINESS.socialMedia.facebook],
    // aggregateRating: omitted until real reviews are collected.
    // Hardcoded ratings violate Google's spam policy and risk manual action.
  };
}

// ==========================================
// ItemList Schema (for product listings)
// ==========================================

export function buildProductListSchema(products: Product[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/tienda/${product.slug}`,
      name: product.name,
    })),
  };
}

// ==========================================
// Helper: Render JSON-LD as script tag
// ==========================================

export function JsonLd({ data }: { data: object | object[] }) {
  const jsonLdData = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLdData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

// ==========================================
// Helper: Generate canonical URL
// ==========================================

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

// ==========================================
// Helper: Generate SEO-friendly slug
// ==========================================

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
