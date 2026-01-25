# SEO Checklist - Poppy E-commerce

Este documento resume la implementación SEO del sitio y sirve como checklist para verificar que todo está correctamente configurado.

## Configuración Global

### Layout (`src/app/layout.tsx`)

- [x] `metadataBase` configurado con URL canónica
- [x] `title.default` con marca y keywords principales
- [x] `title.template` para páginas hijas
- [x] `description` optimizada (150-160 caracteres)
- [x] `keywords` relevantes (sin keyword stuffing)
- [x] `authors`, `creator`, `publisher` configurados
- [x] `formatDetection` desactivado para evitar links automáticos
- [x] `alternates.canonical` configurado
- [x] Open Graph completo (`type`, `locale`, `url`, `siteName`, `title`, `description`, `images`)
- [x] Twitter Card configurado (`card`, `title`, `description`, `images`, `creator`, `site`)
- [x] `robots` con directivas para GoogleBot
- [x] `category` definida

### JSON-LD Schemas (Global)

- [x] **Organization Schema** en layout
- [x] **WebSite Schema** con SearchAction en layout

## Metadata por Página

| Página | generateMetadata | Canonical | Open Graph | JSON-LD |
|--------|------------------|-----------|------------|---------|
| Home (`/`) | ✅ | ✅ | ✅ | - |
| Tienda (`/tienda`) | ✅ (layout) | ✅ | ✅ | ProductList, Breadcrumb |
| PDP (`/tienda/[slug]`) | ✅ (layout) | ✅ | ✅ | Product, Breadcrumb |
| Blog (`/blog`) | ✅ | ✅ | ✅ | Breadcrumb |
| Blog Post (`/blog/[slug]`) | ✅ | ✅ | ✅ | Article, Breadcrumb |
| FAQ (`/faq`) | ✅ | ✅ | ✅ | FAQPage, Breadcrumb |
| Suscripción (`/suscripcion`) | ✅ | ✅ | ✅ | Breadcrumb |
| Nosotros (`/nosotros`) | ✅ | ✅ | ✅ | Breadcrumb |
| Contacto (`/contacto`) | ✅ (layout) | ✅ | ✅ | LocalBusiness, Breadcrumb |

## JSON-LD Schemas Implementados

### Organization Schema
```json
{
  "@type": "Organization",
  "name": "Poppy",
  "url": "https://www.poppy.es",
  "logo": "...",
  "email": "...",
  "telephone": "...",
  "address": {...},
  "sameAs": [Instagram, Facebook]
}
```

### WebSite Schema (con SearchAction)
```json
{
  "@type": "WebSite",
  "potentialAction": {
    "@type": "SearchAction",
    "target": ".../tienda?q={search_term_string}"
  }
}
```

### Product Schema (en PDP)
- name, description, image, url, sku
- brand, manufacturer
- offers (price, availability, shipping)
- nutrition (información nutricional)
- aggregateRating (placeholder)

### FAQPage Schema (en /faq)
- Todas las preguntas frecuentes
- Question + Answer format

### Article Schema (en posts de blog)
- headline, description, image
- datePublished, dateModified
- author, publisher
- wordCount, timeRequired

### BreadcrumbList Schema
- En todas las páginas internas
- Navegación jerárquica

### ProductList Schema (en /tienda)
- Lista de productos con posiciones

### LocalBusiness Schema (en /contacto)
- Información de negocio local

## Sitemap y Robots

### Sitemap (`/sitemap.xml`)
- [x] Generado dinámicamente
- [x] Incluye todas las páginas estáticas
- [x] Incluye todos los productos (solo retail)
- [x] Incluye todos los posts del blog
- [x] `lastModified` configurado
- [x] `changeFrequency` y `priority` por tipo de página

### Robots.txt (`/robots.txt`)
- [x] Allow: / (permite todo por defecto)
- [x] Disallow rutas privadas (/api/, /checkout/, /cuenta/, /auth/, /_next/, /admin/)
- [x] Sitemap URL incluido

## Contenido SEO

### Blog Posts
- [x] 12 artículos con contenido de calidad
- [x] Keywords relevantes en títulos
- [x] Meta descriptions optimizadas
- [x] Categorías: recetas, nutricion, estilo-de-vida
- [x] Tags para búsqueda interna

### Productos
- [x] metaTitle con keywords
- [x] metaDescription < 160 caracteres
- [x] Descripciones largas con keywords naturales
- [x] Información nutricional completa
- [x] Alérgenos declarados

### FAQs
- [x] Preguntas reales de clientes
- [x] Respuestas completas con keywords
- [x] Categorización por tema

## Elementos Visuales

### Breadcrumbs Visibles
- [x] En `/tienda` (Inicio > Tienda)
- [x] En PDP (Inicio > Tienda > Producto)
- [x] En blog posts (link "Volver al blog")

### Accesibilidad
- [x] `aria-label` en breadcrumbs
- [x] Semántica HTML correcta
- [x] Skip to content link

## Verificación Técnica

### Comandos para verificar

```bash
# Compilar y verificar errores
npm run build

# Ejecutar tests SEO
npm run test -- --testPathPattern=seo

# Ver sitemap generado
curl http://localhost:3000/sitemap.xml

# Ver robots.txt
curl http://localhost:3000/robots.txt
```

### Herramientas Externas

1. **Google Search Console**
   - Enviar sitemap
   - Verificar indexación
   - Revisar errores de cobertura

2. **Google Rich Results Test**
   - Probar schemas JSON-LD
   - URL: https://search.google.com/test/rich-results

3. **Schema Markup Validator**
   - URL: https://validator.schema.org/

4. **PageSpeed Insights**
   - Verificar Core Web Vitals
   - URL: https://pagespeed.web.dev/

5. **Ahrefs/Semrush**
   - Auditoría SEO técnica
   - Análisis de backlinks

## Checklist Pre-Launch

- [ ] Verificar que SITE_URL apunta al dominio de producción
- [ ] Configurar Google Search Console
- [ ] Enviar sitemap a Google
- [ ] Verificar que robots.txt es accesible
- [ ] Probar schemas con Rich Results Test
- [ ] Verificar canonical URLs en producción
- [ ] Comprobar Open Graph con Facebook Debugger
- [ ] Verificar Twitter Cards con Card Validator
- [ ] Añadir códigos de verificación (google, yandex) en layout.tsx

## Mantenimiento Continuo

### Semanal
- Revisar Search Console para errores
- Monitorear posiciones de keywords principales

### Mensual
- Publicar nuevos posts de blog
- Actualizar FAQs con nuevas preguntas
- Revisar y actualizar meta descriptions

### Trimestral
- Auditoría SEO completa
- Revisar y actualizar keywords
- Análisis de competencia

---

*Última actualización: Enero 2024*
*Implementado por: Claude Code*
