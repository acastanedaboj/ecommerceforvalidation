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
      name: 'Formato horeca',
      slug: 'horeca',
      description: 'Formatos profesionales para hostelería y distribución',
      image: '/images/categories/horeca.jpg',
    },
  });

  console.log('✅ Categories created');

  // Create products — IDs must match src/data/products.ts exactly
  const products = [
    {
      id: 'prod_granola_clasica',
      sku: 'GRAN-150-CLA',
      name: 'Granola original',
      slug: 'granola-clasica-150g',
      description: 'Nuestra granola original es la receta que dio vida a Poppy.',
      shortDescription: 'Nuestra receta original con miel y frutos secos premium.',
      priceInCents: 700,
      weight: 150,
      ingredients: 'Copos de avena integral sin gluten, semillas de girasol, almendras, anacardos, miel, semillas de calabaza, aceite de coco, avellanas, lino molido, canela, jengibre.',
      allergens: 'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Puede contener trazas de soja y sésamo.',
      nutritionalInfo: { servingSize: 'por 100g', calories: 475, fat: 27, saturatedFat: 6, carbohydrates: 46, sugars: 8, fiber: 9, protein: 17, salt: 0.01 },
      images: ['/images/granola-clasica.png', '/images/hover-clasica.png'],
      stock: 200,
      isActive: true,
      categoryId: granolaCategory.id,
      metaTitle: 'Comprar granola clásica sin gluten | Poppy',
      metaDescription: 'Granola artesanal sin gluten con miel ecológica y frutos secos premium.',
    },
    {
      id: 'prod_granola_naranja',
      sku: 'GRAN-150-NAR',
      name: 'Granola con naranja',
      slug: 'granola-naranja-150g',
      description: 'Nuestra granola con naranja es una explosión de frescura mediterránea.',
      shortDescription: 'Granola con piel de naranja deshidratada y miel.',
      priceInCents: 700,
      weight: 150,
      ingredients: 'Copos de avena integral sin gluten, semillas de girasol, almendras, anacardos, miel, semillas de calabaza, piel de naranja deshidratada, aceite de coco, avellanas, lino molido, canela, jengibre.',
      allergens: 'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Puede contener trazas de soja y sésamo.',
      nutritionalInfo: { servingSize: 'por 100g', calories: 470, fat: 26, saturatedFat: 6, carbohydrates: 48, sugars: 10, fiber: 8, protein: 16, salt: 0.01 },
      images: ['/images/granola-naranja.png', '/images/hover-naranja.png'],
      stock: 200,
      isActive: true,
      categoryId: granolaCategory.id,
      metaTitle: 'Comprar granola de naranja sin gluten | Poppy',
      metaDescription: 'Granola de naranja sin gluten con piel de naranja deshidratada y miel ecológica.',
    },
    {
      id: 'prod_granola_datiles',
      sku: 'GRAN-150-VEG',
      name: 'Granola vegana',
      slug: 'granola-vegana-150g',
      description: 'Nuestra granola vegana con sirope de agave. 100% vegetal.',
      shortDescription: 'Nuestra receta clásica endulzada con sirope de agave. Sin miel, 100% vegana.',
      priceInCents: 700,
      weight: 150,
      ingredients: 'Copos de avena integral sin gluten, semillas de girasol, almendras, anacardos, sirope de agave, semillas de calabaza, aceite de coco, avellanas, lino molido, canela, jengibre.',
      allergens: 'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Puede contener trazas de soja y sésamo.',
      nutritionalInfo: { servingSize: 'por 100g', calories: 475, fat: 27, saturatedFat: 6, carbohydrates: 46, sugars: 8, fiber: 9, protein: 17, salt: 0.01 },
      images: ['/images/vegana.png', '/images/hover-vegana.png'],
      stock: 180,
      isActive: true,
      categoryId: granolaCategory.id,
      metaTitle: 'Comprar granola vegana sin gluten | Poppy',
      metaDescription: 'Granola vegana sin gluten con sirope de agave ecológico. 100% vegetal.',
    },
    {
      id: 'prod_granola_horeca',
      sku: 'GRAN-1KG',
      name: 'Granola original - Formato horeca',
      slug: 'granola-clasica-1kg-horeca',
      description: 'El mismo producto artesanal en formato 1kg para profesionales.',
      shortDescription: 'Formato 1kg para hostelería y tiendas. Misma receta artesanal.',
      priceInCents: 2800,
      weight: 1000,
      ingredients: 'Copos de avena integral sin gluten, semillas de girasol, almendras, anacardos, miel, semillas de calabaza, aceite de coco, avellanas, lino molido, canela, jengibre.',
      allergens: 'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Puede contener trazas de soja y sésamo.',
      nutritionalInfo: { servingSize: 'por 100g', calories: 475, fat: 27, saturatedFat: 6, carbohydrates: 46, sugars: 8, fiber: 9, protein: 17, salt: 0.01 },
      images: ['/images/products/granola-horeca-1.jpg'],
      stock: 50,
      isActive: false,
      categoryId: horecaCategory.id,
      metaTitle: 'Granola Clásica 1kg Horeca | Formato Profesional',
      metaDescription: 'Granola artesanal formato 1kg para hostelería y tiendas.',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  console.log('✅ Products created');

  // Create FAQs
  const faqs = [
    {
      question: '¿Vuestra granola es realmente sin gluten?',
      answer: 'Sí, nuestra granola está elaborada con avena certificada sin gluten en un obrador dedicado donde no entra gluten. Cumplimos con el estándar europeo de ≤20 ppm.',
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
