/**
 * Robots.txt Generator
 *
 * Controls search engine crawling behavior.
 */

import { MetadataRoute } from 'next';

const SITE_URL = 'https://www.poppy.es';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/checkout/',
          '/cuenta/',
          '/auth/',
          '/_next/',
          '/admin/',
          // Disallow query parameters that could create duplicate content
          '/*?*sort=',
          '/*?*filter=',
          '/*?*page=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/checkout/',
          '/cuenta/',
          '/auth/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
