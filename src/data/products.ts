/**
 * Product Data - Granola Artesanal
 *
 * All prices are in cents (900 = 9.00€)
 * Weights are in grams
 */

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  priceInCents: number;
  weight: number;
  ingredients: string;
  allergens: string;
  nutritionalInfo: NutritionalInfo;
  images: string[];
  stock: number;
  isActive: boolean;
  categoryId: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface NutritionalInfo {
  servingSize: string;
  calories: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugars: number;
  fiber: number;
  protein: number;
  salt: number;
}

export const products: Product[] = [
  {
    id: 'prod_granola_classic',
    sku: 'GRAN-250-CLS',
    name: 'Granola Clásica',
    slug: 'granola-clasica-250g',
    description: `Nuestra granola clásica es el resultado de una receta artesanal perfeccionada durante años. Elaborada con avena certificada sin gluten, remojada para facilitar su digestión, y tostada lentamente con miel ecológica de apicultores locales.

Cada bolsa contiene una mezcla premium de frutos secos: nueces pecanas crujientes, almendras españolas, avellanas tostadas y anacardos cremosos. Las pipas de girasol y calabaza aportan ese toque extra de nutrientes y textura.

El secreto está en nuestro proceso: la canela de Ceilán, el jengibre fresco y la ralladura de naranja natural crean un perfil aromático único. El aceite de coco virgen extra garantiza ese dorado perfecto sin comprometer la salud.

**Sin aditivos. Sin conservantes. Solo ingredientes reales.**`,
    shortDescription:
      'Granola artesanal premium con avena sin gluten, miel ecológica y frutos secos selectos. Elaborada con amor y tostada lentamente.',
    priceInCents: 900,
    weight: 250,
    ingredients:
      'Copos de avena certificada sin gluten* (40%), miel ecológica* (12%), nueces pecanas (8%), almendras (8%), avellanas (6%), anacardos (6%), pipas de girasol (5%), pipas de calabaza (5%), aceite de coco virgen extra* (4%), lino molido (3%), canela de Ceilán (1%), jengibre en polvo (1%), ralladura de naranja natural (1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos, nueces pecanas). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: [
      '/images/products/granola-clasica-1.jpg',
      '/images/products/granola-clasica-2.jpg',
      '/images/products/granola-clasica-3.jpg',
    ],
    stock: 200,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'premium'],
    metaTitle: 'Granola Clásica 250g | Sin Gluten, Orgánica | Granola Artesanal',
    metaDescription:
      'Granola artesanal clásica 250g sin gluten real. Avena certificada, miel ecológica y frutos secos premium. Envío gratis +4 bolsas. Compra online.',
  },
  {
    id: 'prod_granola_cacao',
    sku: 'GRAN-250-CAC',
    name: 'Granola Cacao & Avellana',
    slug: 'granola-cacao-avellana-250g',
    description: `Para los amantes del chocolate, nuestra granola de cacao y avellana es un capricho saludable que no decepciona. El cacao puro en polvo, sin azúcares añadidos, se combina con avellanas tostadas del Mediterráneo para crear una experiencia que recuerda a la mejor crema de cacao artesanal.

La base sigue siendo nuestra avena sin gluten remojada y la miel ecológica, pero aquí el protagonista es el cacao crudo de comercio justo. Añadimos chips de cacao nibs para ese crunch extra que tanto gusta.

Perfecta para el desayuno, como topping de yogur o simplemente para picar entre horas cuando necesitas ese momento dulce sin remordimientos.

**El sabor del chocolate, pero con ingredientes reales.**`,
    shortDescription:
      'Granola con cacao puro y avellanas tostadas. La opción perfecta para los amantes del chocolate saludable.',
    priceInCents: 900,
    weight: 250,
    ingredients:
      'Copos de avena certificada sin gluten* (38%), miel ecológica* (10%), avellanas tostadas (15%), cacao en polvo puro* (8%), chips de cacao nibs* (5%), almendras (6%), anacardos (5%), aceite de coco virgen extra* (4%), pipas de girasol (4%), lino molido (3%), vainilla natural (1%), sal marina (0.5%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (avellanas, almendras, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: [
      '/images/products/granola-cacao-1.jpg',
      '/images/products/granola-cacao-2.jpg',
      '/images/products/granola-cacao-3.jpg',
    ],
    stock: 150,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'cacao', 'chocolate'],
    metaTitle: 'Granola Cacao & Avellana 250g | Sin Gluten | Granola Artesanal',
    metaDescription:
      'Granola artesanal de cacao puro y avellanas 250g. Sin gluten, sin azúcares añadidos. El sabor del chocolate saludable. Envío gratis +4 bolsas.',
  },
  {
    id: 'prod_granola_tropical',
    sku: 'GRAN-250-TRP',
    name: 'Granola Tropical',
    slug: 'granola-tropical-250g',
    description: `Un viaje al trópico en cada cucharada. Nuestra granola tropical combina la base artesanal que conoces con coco rallado tostado, mango deshidratado y un toque de lima que despierta los sentidos.

El coco aporta esa textura crujiente y el sabor exótico que transporta. El mango deshidratado natural, sin azúcares añadidos, ofrece explosiones de dulzor afrutado. Las semillas de chía y el lino completan el perfil nutricional.

Ideal para mañanas de verano, bowls de açaí o cuando simplemente quieres algo diferente que rompa la rutina.

**Sabores del trópico, calidad artesanal.**`,
    shortDescription:
      'Granola con coco, mango deshidratado y lima. Un toque tropical para tus mañanas.',
    priceInCents: 900,
    weight: 250,
    ingredients:
      'Copos de avena certificada sin gluten* (36%), miel ecológica* (10%), coco rallado tostado (12%), mango deshidratado natural (10%), anacardos (8%), almendras (6%), pipas de calabaza (5%), aceite de coco virgen extra* (5%), semillas de chía* (3%), lino molido (3%), ralladura de lima natural (1%), jengibre en polvo (1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (anacardos, almendras), coco. Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: [
      '/images/products/granola-tropical-1.jpg',
      '/images/products/granola-tropical-2.jpg',
      '/images/products/granola-tropical-3.jpg',
    ],
    stock: 120,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'tropical', 'coco'],
    metaTitle: 'Granola Tropical 250g | Coco y Mango | Granola Artesanal',
    metaDescription:
      'Granola artesanal tropical con coco, mango y lima 250g. Sin gluten, ingredientes naturales. Sabores exóticos, calidad premium. Envío gratis +4 bolsas.',
  },
  {
    id: 'prod_granola_horeca',
    sku: 'GRAN-1KG',
    name: 'Granola Clásica - Formato Horeca',
    slug: 'granola-clasica-1kg-horeca',
    description: `El mismo producto artesanal que adoran nuestros clientes, ahora en formato de 1kg pensado para profesionales de la hostelería, cafeterías y tiendas especializadas.

Nuestra granola clásica en formato horeca mantiene todas las cualidades que nos diferencian: avena certificada sin gluten, miel ecológica de apicultores locales, y la mezcla premium de frutos secos que define nuestro sabor.

**Formato profesional para negocios que valoran la calidad.**

Solicita información sobre precios mayoristas y condiciones de distribución a través de nuestro formulario B2B.`,
    shortDescription:
      'Formato 1kg para hostelería y tiendas. Misma receta artesanal, tamaño profesional.',
    priceInCents: 2800, // Precio orientativo, consultar B2B
    weight: 1000,
    ingredients:
      'Copos de avena certificada sin gluten* (40%), miel ecológica* (12%), nueces pecanas (8%), almendras (8%), avellanas (6%), anacardos (6%), pipas de girasol (5%), pipas de calabaza (5%), aceite de coco virgen extra* (4%), lino molido (3%), canela de Ceilán (1%), jengibre en polvo (1%), ralladura de naranja natural (1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos, nueces pecanas). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: [
      '/images/products/granola-horeca-1.jpg',
      '/images/products/granola-horeca-2.jpg',
    ],
    stock: 50,
    isActive: true,
    categoryId: 'cat_horeca',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'horeca', 'b2b'],
    metaTitle: 'Granola Clásica 1kg Horeca | Formato Profesional | Granola Artesanal',
    metaDescription:
      'Granola artesanal formato 1kg para hostelería y tiendas. Sin gluten, ecológica. Solicita precios mayoristas para tu negocio.',
  },
];

export const categories = [
  {
    id: 'cat_granola',
    name: 'Granola 250g',
    slug: 'granola-250g',
    description: 'Nuestra línea de granola artesanal en formato 250g, perfecta para consumo individual.',
    image: '/images/categories/granola-250g.jpg',
  },
  {
    id: 'cat_horeca',
    name: 'Formato Horeca',
    slug: 'horeca',
    description: 'Formatos profesionales para hostelería, cafeterías y distribución.',
    image: '/images/categories/horeca.jpg',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getActiveProducts(): Product[] {
  return products.filter((p) => p.isActive);
}

export function getRetailProducts(): Product[] {
  return products.filter((p) => p.isActive && p.categoryId === 'cat_granola');
}
