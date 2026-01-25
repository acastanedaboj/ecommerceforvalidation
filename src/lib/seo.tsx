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
  telephone: string;
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
    telephone: BUSINESS.phone,
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

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: imageUrl,
    url: fullUrl,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    manufacturer: {
      '@type': 'Organization',
      name: BRAND_NAME,
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
      seller: {
        '@type': 'Organization',
        name: BRAND_NAME,
      },
      shippingDetails: {
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
    },
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: product.nutritionalInfo.servingSize,
      calories: `${product.nutritionalInfo.calories} kcal`,
      fatContent: `${product.nutritionalInfo.fat}g`,
      carbohydrateContent: `${product.nutritionalInfo.carbohydrates}g`,
      sugarContent: `${product.nutritionalInfo.sugars}g`,
      fiberContent: `${product.nutritionalInfo.fiber}g`,
      proteinContent: `${product.nutritionalInfo.protein}g`,
      sodiumContent: `${product.nutritionalInfo.salt}g`,
    },
    // Dietary attributes
    ...(product.isVegan && {
      suitableForDiet: 'https://schema.org/VeganDiet',
    }),
    // Aggregate rating placeholder (can be dynamic later)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
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
// Local Business Schema (optional, for local SEO)
// ==========================================

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND_NAME,
    image: `${SITE_URL}/logo.svg`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: 'ES',
    },
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
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
