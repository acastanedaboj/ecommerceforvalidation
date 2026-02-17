/**
 * SEO Utilities Tests
 */

import {
  SITE_URL,
  BRAND_NAME,
  getCanonicalUrl,
  generateSlug,
  buildOrganizationSchema,
  buildWebsiteSchema,
  buildBreadcrumbSchema,
  buildProductSchema,
  buildFaqSchema,
  buildArticleSchema,
  buildProductListSchema,
} from '@/lib/seo';
import { products } from '@/data/products';
import { faqs } from '@/data/faqs';
import { blogPosts } from '@/data/blog';

describe('SEO Constants', () => {
  it('has correct site URL', () => {
    expect(SITE_URL).toBe('https://www.poppy.es');
  });

  it('has correct brand name', () => {
    expect(BRAND_NAME).toBe('Poppy');
  });
});

describe('getCanonicalUrl', () => {
  it('generates correct canonical URL with leading slash', () => {
    expect(getCanonicalUrl('/tienda')).toBe('https://www.poppy.es/tienda');
  });

  it('generates correct canonical URL without leading slash', () => {
    expect(getCanonicalUrl('tienda')).toBe('https://www.poppy.es/tienda');
  });

  it('handles root path', () => {
    expect(getCanonicalUrl('/')).toBe('https://www.poppy.es/');
  });
});

describe('generateSlug', () => {
  it('converts text to lowercase', () => {
    expect(generateSlug('HELLO WORLD')).toBe('hello-world');
  });

  it('removes accents', () => {
    expect(generateSlug('Granola Dátiles')).toBe('granola-datiles');
  });

  it('replaces spaces with hyphens', () => {
    expect(generateSlug('hello world')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(generateSlug('hello@world!')).toBe('hello-world');
  });

  it('removes leading and trailing hyphens', () => {
    expect(generateSlug('--hello--')).toBe('hello');
  });
});

describe('buildOrganizationSchema', () => {
  const schema = buildOrganizationSchema();

  it('has correct @context', () => {
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has correct @type', () => {
    expect(schema['@type']).toBe('Organization');
  });

  it('has correct name', () => {
    expect(schema.name).toBe(BRAND_NAME);
  });

  it('has correct URL', () => {
    expect(schema.url).toBe(SITE_URL);
  });

  it('has logo URL', () => {
    expect(schema.logo).toContain(SITE_URL);
    expect(schema.logo).toContain('logo');
  });

  it('has address with correct structure', () => {
    expect(schema.address['@type']).toBe('PostalAddress');
    expect(schema.address.addressCountry).toBe('ES');
  });

  it('has social media links', () => {
    expect(Array.isArray(schema.sameAs)).toBe(true);
    expect(schema.sameAs.length).toBeGreaterThan(0);
  });
});

describe('buildWebsiteSchema', () => {
  const schema = buildWebsiteSchema();

  it('has correct @type', () => {
    expect(schema['@type']).toBe('WebSite');
  });

  it('has search action', () => {
    expect(schema.potentialAction['@type']).toBe('SearchAction');
    expect(schema.potentialAction.target.urlTemplate).toContain('search_term_string');
  });
});

describe('buildBreadcrumbSchema', () => {
  const items = [
    { name: 'Inicio', url: '/' },
    { name: 'Tienda', url: '/tienda' },
    { name: 'Producto', url: '/tienda/producto' },
  ];
  const schema = buildBreadcrumbSchema(items);

  it('has correct @type', () => {
    expect(schema['@type']).toBe('BreadcrumbList');
  });

  it('has correct number of items', () => {
    expect(schema.itemListElement.length).toBe(3);
  });

  it('has correct positions', () => {
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[2].position).toBe(3);
  });

  it('builds full URLs for relative paths', () => {
    expect(schema.itemListElement[1].item).toContain(SITE_URL);
  });
});

describe('buildProductSchema', () => {
  const product = products[0];
  const schema = buildProductSchema(product, `/tienda/${product.slug}`);

  it('has correct @type', () => {
    expect(schema['@type']).toBe('Product');
  });

  it('has product name', () => {
    expect(schema.name).toBe(product.name);
  });

  it('has SKU', () => {
    expect(schema.sku).toBe(product.sku);
  });

  it('has brand info', () => {
    expect(schema.brand['@type']).toBe('Brand');
    expect(schema.brand.name).toBe(BRAND_NAME);
  });

  it('has offers with price', () => {
    expect(schema.offers['@type']).toBe('Offer');
    expect(schema.offers.priceCurrency).toBe('EUR');
    expect(typeof schema.offers.price).toBe('string');
  });

  it('has availability status', () => {
    expect(schema.offers.availability).toContain('schema.org');
  });

  it('has nutritional information', () => {
    expect(schema.nutrition['@type']).toBe('NutritionInformation');
    expect(schema.nutrition.servingSize).toBeDefined();
  });

  it('has shipping details', () => {
    expect(Array.isArray(schema.offers.shippingDetails)).toBe(true);
    expect(schema.offers.shippingDetails[0]['@type']).toBe('OfferShippingDetails');
  });
});

describe('buildFaqSchema', () => {
  const faqItems = faqs.slice(0, 3);
  const schema = buildFaqSchema(faqItems);

  it('has correct @type', () => {
    expect(schema['@type']).toBe('FAQPage');
  });

  it('has correct number of questions', () => {
    expect(schema.mainEntity.length).toBe(3);
  });

  it('has Question type for each item', () => {
    schema.mainEntity.forEach((item: { '@type': string }) => {
      expect(item['@type']).toBe('Question');
    });
  });

  it('has Answer for each question', () => {
    schema.mainEntity.forEach((item: { acceptedAnswer: { '@type': string } }) => {
      expect(item.acceptedAnswer['@type']).toBe('Answer');
    });
  });

  it('strips markdown from answers', () => {
    const faqWithMarkdown = [
      {
        id: 'test',
        question: 'Test?',
        answer: '**Bold** text\nNew line',
        category: 'producto' as const,
        order: 1,
      },
    ];
    const testSchema = buildFaqSchema(faqWithMarkdown);
    expect(testSchema.mainEntity[0].acceptedAnswer.text).not.toContain('**');
  });
});

describe('buildArticleSchema', () => {
  const post = blogPosts[0];
  const schema = buildArticleSchema(post, `/blog/${post.slug}`);

  it('has correct @type', () => {
    expect(schema['@type']).toBe('Article');
  });

  it('has headline', () => {
    expect(schema.headline).toBe(post.title);
  });

  it('has publication date', () => {
    expect(schema.datePublished).toBe(post.publishedAt);
  });

  it('has author info', () => {
    expect(schema.author['@type']).toBe('Organization');
  });

  it('has publisher info with logo', () => {
    expect(schema.publisher['@type']).toBe('Organization');
    expect(schema.publisher.logo['@type']).toBe('ImageObject');
  });

  it('has article section', () => {
    expect(schema.articleSection).toBe(post.category);
  });

  it('has word count', () => {
    expect(typeof schema.wordCount).toBe('number');
    expect(schema.wordCount).toBeGreaterThan(0);
  });

  it('has time required', () => {
    expect(schema.timeRequired).toContain('PT');
    expect(schema.timeRequired).toContain('M');
  });
});

describe('buildProductListSchema', () => {
  const testProducts = products.slice(0, 3);
  const schema = buildProductListSchema(testProducts, 'Test List');

  it('has correct @type', () => {
    expect(schema['@type']).toBe('ItemList');
  });

  it('has list name', () => {
    expect(schema.name).toBe('Test List');
  });

  it('has correct number of items', () => {
    expect(schema.numberOfItems).toBe(3);
    expect(schema.itemListElement.length).toBe(3);
  });

  it('has correct positions', () => {
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
  });

  it('builds URLs for products', () => {
    expect(schema.itemListElement[0].url).toContain('/tienda/');
  });
});

describe('Data Integrity', () => {
  describe('Products have required SEO fields', () => {
    products.forEach((product) => {
      it(`${product.name} has metaTitle`, () => {
        expect(product.metaTitle).toBeDefined();
        expect(product.metaTitle.length).toBeGreaterThan(0);
      });

      it(`${product.name} has metaDescription`, () => {
        expect(product.metaDescription).toBeDefined();
        expect(product.metaDescription.length).toBeGreaterThan(0);
        expect(product.metaDescription.length).toBeLessThanOrEqual(160);
      });

      it(`${product.name} has slug`, () => {
        expect(product.slug).toBeDefined();
        expect(product.slug).not.toContain(' ');
      });
    });
  });

  describe('Blog posts have required SEO fields', () => {
    blogPosts.forEach((post) => {
      it(`${post.title} has metaTitle`, () => {
        expect(post.metaTitle).toBeDefined();
        expect(post.metaTitle.length).toBeGreaterThan(0);
      });

      it(`${post.title} has metaDescription`, () => {
        expect(post.metaDescription).toBeDefined();
        expect(post.metaDescription.length).toBeGreaterThan(0);
      });

      it(`${post.title} has slug`, () => {
        expect(post.slug).toBeDefined();
        expect(post.slug).not.toContain(' ');
      });

      it(`${post.title} has valid category`, () => {
        expect(['recetas', 'nutricion', 'estilo-de-vida']).toContain(post.category);
      });
    });
  });

  describe('FAQs have required fields', () => {
    faqs.forEach((faq) => {
      it(`FAQ "${faq.question.slice(0, 30)}..." has answer`, () => {
        expect(faq.answer).toBeDefined();
        expect(faq.answer.length).toBeGreaterThan(0);
      });

      it(`FAQ "${faq.question.slice(0, 30)}..." has valid category`, () => {
        expect(['producto', 'envio', 'pago', 'suscripcion', 'legal']).toContain(faq.category);
      });
    });
  });
});
