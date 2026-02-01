import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const granolaCategory = await prisma.category.upsert({
    where: { slug: 'granola-250g' },
    update: {},
    create: {
      name: 'Granola 250g',
      slug: 'granola-250g',
      description: 'Nuestra línea de granola Poppy en formato 250g',
      image: '/images/categories/granola-250g.jpg',
    },
  });

  const horecaCategory = await prisma.category.upsert({
    where: { slug: 'horeca' },
    update: {},
    create: {
      name: 'Formato Horeca',
      slug: 'horeca',
      description: 'Formatos profesionales para hostelería y distribución',
      image: '/images/categories/horeca.jpg',
    },
  });

  console.log('✅ Categories created');

  // Create products
  const products = [
    {
      sku: 'GRAN-250-CLS',
      name: 'Granola Clásica',
      slug: 'granola-clasica-250g',
      description: `Nuestra granola clásica es el resultado de una receta artesanal perfeccionada durante años. Elaborada con avena certificada sin gluten, frutos secos y semillas remojados para facilitar la digestión, y tostada lentamente con miel ecológica de apicultores locales.`,
      shortDescription: 'Granola artesanal premium con avena sin gluten, miel ecológica y frutos secos selectos.',
      priceInCents: 900,
      weight: 250,
      ingredients: 'Copos de avena certificada sin gluten* (40%), miel ecológica* (12%), nueces pecanas (8%), almendras (8%), avellanas (6%), anacardos (6%), pipas de girasol (5%), pipas de calabaza (5%), aceite de coco virgen extra* (4%), lino molido (3%), canela de Ceilán (1%), jengibre en polvo (1%), ralladura de naranja natural (1%). *De agricultura ecológica.',
      allergens: 'Contiene: frutos de cáscara (almendras, avellanas, anacardos, nueces pecanas). Producido en instalaciones que procesan gluten, soja y sésamo.',
      nutritionalInfo: {
        servingSize: 'por 100g',
        calories: 445,
        fat: 22,
        saturatedFat: 5.2,
        carbohydrates: 48,
        sugars: 14,
        fiber: 7.5,
        protein: 11,
        salt: 0.02,
      },
      images: ['/images/products/granola-clasica-1.jpg', '/images/products/granola-clasica-2.jpg'],
      stock: 200,
      isActive: true,
      categoryId: granolaCategory.id,
      metaTitle: 'Granola Clásica 250g | Sin Gluten, Orgánica',
      metaDescription: 'Granola artesanal clásica 250g sin gluten real. Avena certificada, miel ecológica y frutos secos premium.',
    },
    {
      sku: 'GRAN-250-CAC',
      name: 'Granola Cacao & Avellana',
      slug: 'granola-cacao-avellana-250g',
      description: `Para los amantes del chocolate, nuestra granola de cacao y avellana es un capricho saludable que no decepciona.`,
      shortDescription: 'Granola con cacao puro y avellanas tostadas. La opción perfecta para los amantes del chocolate saludable.',
      priceInCents: 900,
      weight: 250,
      ingredients: 'Copos de avena certificada sin gluten* (38%), miel ecológica* (10%), avellanas tostadas (15%), cacao en polvo puro* (8%), chips de cacao nibs* (5%), almendras (6%), anacardos (5%), aceite de coco virgen extra* (4%), pipas de girasol (4%), lino molido (3%), vainilla natural (1%), sal marina (0.5%). *De agricultura ecológica.',
      allergens: 'Contiene: frutos de cáscara (avellanas, almendras, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo.',
      nutritionalInfo: {
        servingSize: 'por 100g',
        calories: 460,
        fat: 24,
        saturatedFat: 6.1,
        carbohydrates: 45,
        sugars: 12,
        fiber: 8.2,
        protein: 12,
        salt: 0.1,
      },
      images: ['/images/products/granola-cacao-1.jpg', '/images/products/granola-cacao-2.jpg'],
      stock: 150,
      isActive: true,
      categoryId: granolaCategory.id,
      metaTitle: 'Granola Cacao & Avellana 250g | Sin Gluten',
      metaDescription: 'Granola artesanal de cacao puro y avellanas 250g. Sin gluten, sin azúcares añadidos.',
    },
    {
      sku: 'GRAN-250-TRP',
      name: 'Granola Tropical',
      slug: 'granola-tropical-250g',
      description: `Un viaje al trópico en cada cucharada. Nuestra granola tropical combina la base artesanal que conoces con coco rallado tostado, mango deshidratado y un toque de lima.`,
      shortDescription: 'Granola con coco, mango deshidratado y lima. Un toque tropical para tus mañanas.',
      priceInCents: 900,
      weight: 250,
      ingredients: 'Copos de avena certificada sin gluten* (36%), miel ecológica* (10%), coco rallado tostado (12%), mango deshidratado natural (10%), anacardos (8%), almendras (6%), pipas de calabaza (5%), aceite de coco virgen extra* (5%), semillas de chía* (3%), lino molido (3%), ralladura de lima natural (1%), jengibre en polvo (1%). *De agricultura ecológica.',
      allergens: 'Contiene: frutos de cáscara (anacardos, almendras), coco. Producido en instalaciones que procesan gluten, soja y sésamo.',
      nutritionalInfo: {
        servingSize: 'por 100g',
        calories: 455,
        fat: 23,
        saturatedFat: 9.5,
        carbohydrates: 50,
        sugars: 16,
        fiber: 7.0,
        protein: 10,
        salt: 0.02,
      },
      images: ['/images/products/granola-tropical-1.jpg', '/images/products/granola-tropical-2.jpg'],
      stock: 120,
      isActive: true,
      categoryId: granolaCategory.id,
      metaTitle: 'Granola Tropical 250g | Coco y Mango',
      metaDescription: 'Granola artesanal tropical con coco, mango y lima 250g. Sin gluten, ingredientes naturales.',
    },
    {
      sku: 'GRAN-1KG',
      name: 'Granola Clásica - Formato Horeca',
      slug: 'granola-clasica-1kg-horeca',
      description: `El mismo producto artesanal que adoran nuestros clientes, ahora en formato de 1kg pensado para profesionales.`,
      shortDescription: 'Formato 1kg para hostelería y tiendas. Misma receta artesanal, tamaño profesional.',
      priceInCents: 2800,
      weight: 1000,
      ingredients: 'Copos de avena certificada sin gluten* (40%), miel ecológica* (12%), nueces pecanas (8%), almendras (8%), avellanas (6%), anacardos (6%), pipas de girasol (5%), pipas de calabaza (5%), aceite de coco virgen extra* (4%), lino molido (3%), canela de Ceilán (1%), jengibre en polvo (1%), ralladura de naranja natural (1%). *De agricultura ecológica.',
      allergens: 'Contiene: frutos de cáscara (almendras, avellanas, anacardos, nueces pecanas). Producido en instalaciones que procesan gluten, soja y sésamo.',
      nutritionalInfo: {
        servingSize: 'por 100g',
        calories: 445,
        fat: 22,
        saturatedFat: 5.2,
        carbohydrates: 48,
        sugars: 14,
        fiber: 7.5,
        protein: 11,
        salt: 0.02,
      },
      images: ['/images/products/granola-horeca-1.jpg'],
      stock: 50,
      isActive: true,
      categoryId: horecaCategory.id,
      metaTitle: 'Granola Clásica 1kg Horeca | Formato Profesional',
      metaDescription: 'Granola artesanal formato 1kg para hostelería y tiendas. Sin gluten, ecológica.',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: product,
    });
  }

  console.log('✅ Products created');

  // Create FAQs
  const faqs = [
    {
      question: '¿Vuestra granola es realmente sin gluten?',
      answer: 'Sí, nuestra granola está elaborada con avena certificada sin gluten. Cumplimos con el estándar europeo de ≤20 ppm de gluten.',
      category: 'producto',
      order: 1,
    },
    {
      question: '¿Cuánto cuesta el envío?',
      answer: 'Envío estándar a Península: 4,95€. Envío GRATIS cuando compras 4 o más bolsas o tu pedido supera los 35€.',
      category: 'envio',
      order: 1,
    },
    {
      question: '¿Qué métodos de pago aceptáis?',
      answer: 'Aceptamos tarjeta de crédito/débito (Visa, Mastercard, American Express) y pago contra reembolso (+2€).',
      category: 'pago',
      order: 1,
    },
    {
      question: '¿Cómo funciona la suscripción?',
      answer: 'Recibes 6 bolsas cada mes con un 15% de descuento y envío gratis. Puedes pausar o cancelar cuando quieras desde tu cuenta.',
      category: 'suscripcion',
      order: 1,
    },
    {
      question: '¿Puedo cancelar mi suscripción?',
      answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde tu cuenta. No hay permanencia ni penalizaciones.',
      category: 'suscripcion',
      order: 2,
    },
    {
      question: '¿Cómo tratáis mis datos personales?',
      answer: 'Tratamos tus datos según el RGPD. Consulta nuestra Política de Privacidad para más información.',
      category: 'legal',
      order: 1,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    });
  }

  console.log('✅ FAQs created');

  // Create blog posts
  const blogPosts = [
    {
      slug: 'smoothie-bowl-granola-frutos-rojos',
      title: 'Smoothie Bowl con Granola y Frutos Rojos',
      excerpt: 'El desayuno perfecto para empezar el día con energía.',
      content: '# Smoothie Bowl con Granola y Frutos Rojos\n\nEl desayuno es la comida más importante del día...',
      coverImage: '/images/blog/smoothie-bowl.jpg',
      isPublished: true,
      publishedAt: new Date('2024-01-15'),
      metaTitle: 'Receta: Smoothie Bowl con Granola',
      metaDescription: 'Aprende a preparar el smoothie bowl perfecto con granola Poppy.',
    },
    {
      slug: 'beneficios-avena-sin-gluten',
      title: 'Beneficios de la Avena Sin Gluten',
      excerpt: 'Descubre por qué la avena sin gluten certificada marca la diferencia.',
      content: '# Beneficios de la Avena Sin Gluten\n\nLa avena es uno de los cereales más completos...',
      coverImage: '/images/blog/avena-sin-gluten.jpg',
      isPublished: true,
      publishedAt: new Date('2024-01-08'),
      metaTitle: 'Beneficios de la Avena Sin Gluten Certificada',
      metaDescription: 'Descubre los beneficios de la avena sin gluten certificada en nuestra granola.',
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log('✅ Blog posts created');

  console.log('🌱 Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
