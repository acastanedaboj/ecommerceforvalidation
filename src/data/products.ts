/**
 * Product Data - Poppy
 *
 * All prices are in cents (700 = 7.00€)
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
  // Dietary info
  hasHoney: boolean; // true = con miel, false = sin miel (apto vegano)
  isVegan: boolean;
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
    id: 'prod_granola_clasica',
    sku: 'GRAN-150-CLA',
    name: 'Granola original',
    slug: 'granola-clasica-150g',
    description: `Nuestra granola original es la receta que dio vida a Poppy. Un equilibrio perfecto entre la avena integral sin gluten, la miel ecológica de apicultores locales y una mezcla premium de semillas y frutos secos que define nuestro sabor característico.

Los frutos secos y las semillas de girasol y calabaza se remojan cuidadosamente antes de hornear para mejorar su digestión. La miel ecológica carameliza suavemente durante el tostado lento y, junto con el aceite de coco, da ese toque crujiente y un aroma suave y delicioso, creando clusters perfectos.

El lino molido aporta omega-3 y el toque sutil de canela y jengibre completa la experiencia. Cada bolsa de 150g está elaborada con la proporción exacta para el crunch perfecto.

Tostamos granola cada semana bajo demanda en lotes pequeños, nunca la almacenamos. Eso significa que recibirás tu granola solo unas horas o días tras su elaboración.

**El sabor que nos hizo famosos. Sencillo, auténtico, irresistible.**`,
    shortDescription:
      'Nuestra receta original con miel y frutos secos premium. El sabor clásico que nos define.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena integral sin gluten, semillas de girasol, almendras, anacardos, miel, semillas de calabaza, aceite de coco, avellanas, lino molido, canela, jengibre.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Puede contener trazas de soja y sésamo.',
    nutritionalInfo: {
      servingSize: 'por 100g',
      calories: 475,
      fat: 27,
      saturatedFat: 6,
      carbohydrates: 46,
      sugars: 8,
      fiber: 9,
      protein: 17,
      salt: 0.01,
    },
    images: ['/images/granola-clasica.png', '/images/hover-clasica.png'],
    stock: 200,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecológico', 'artesanal', 'clásico', 'original', 'con-miel'],
    metaTitle: 'Comprar granola clásica sin gluten | Miel ecológica | Poppy',
    metaDescription:
      'Compra granola artesanal sin gluten con miel ecológica y frutos secos premium. Desde 7€/ud. Envío gratis a partir de 4 uds. Entrega en 2-4 días en España.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_naranja',
    sku: 'GRAN-150-NAR',
    name: 'Granola con naranja',
    slug: 'granola-naranja-150g',
    description: `Nuestra granola con naranja es una explosión de frescura mediterránea en cada bocado. Elaborada con piel de naranja deshidratada sobre nuestra base clásica, ofrece un perfil aromático único que despierta los sentidos.

La base de avena integral sin gluten se combina con miel, que complementa perfectamente los cítricos. El aceite de coco, junto con la miel, da ese toque crujiente y un aroma suave y delicioso. Las almendras y anacardos aportan el equilibrio perfecto de textura y sabor.

El toque de canela y jengibre realzan los aromas naturales de la naranja, creando una experiencia sensorial completa.

Tostamos granola cada semana bajo demanda en lotes pequeños, nunca la almacenamos. Eso significa que recibirás tu granola solo unas horas o días tras su elaboración.

**Frescura mediterránea en tu desayuno.**`,
    shortDescription:
      'Granola con piel de naranja deshidratada y miel. Un toque cítrico y refrescante para empezar el día.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena integral sin gluten, semillas de girasol, almendras, anacardos, miel, semillas de calabaza, piel de naranja deshidratada, aceite de coco, avellanas, lino molido, canela, jengibre.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Puede contener trazas de soja y sésamo.',
    nutritionalInfo: {
      servingSize: 'por 100g',
      calories: 470,
      fat: 26,
      saturatedFat: 6,
      carbohydrates: 48,
      sugars: 10,
      fiber: 8,
      protein: 16,
      salt: 0.01,
    },
    images: ['/images/granola-naranja.png', '/images/hover-naranja.png'],
    stock: 200,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'citricos', 'naranja', 'con-miel'],
    metaTitle: 'Comprar granola de naranja sin gluten | Ecológica | Poppy',
    metaDescription:
      'Compra granola de naranja sin gluten con piel de naranja deshidratada y miel. Sabor mediterráneo. Envío gratis +4 uds. Entrega en toda España.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_datiles',
    sku: 'GRAN-150-VEG',
    name: 'Granola vegana',
    slug: 'granola-vegana-150g',
    description: `Nuestra granola vegana tiene la misma receta deliciosa que la clásica, pero endulzada con sirope de agave en lugar de miel. Perfecta para quienes siguen una alimentación 100% vegetal.

Las semillas de girasol y calabaza son las protagonistas, junto con almendras, anacardos y avellanas seleccionadas. El sirope de agave ecológico carameliza suavemente durante el tostado lento, creando clusters perfectos.

El lino molido aporta omega-3 y el toque sutil de canela y jengibre completa la experiencia. Mismos ingredientes premium, misma calidad artesanal, 100% vegana.

Tostamos granola cada semana bajo demanda en lotes pequeños, nunca la almacenamos. Eso significa que recibirás tu granola solo unas horas o días tras su elaboración.

**Todo el sabor Poppy, apto para veganos.**`,
    shortDescription:
      'Nuestra receta clásica endulzada con sirope de agave. Sin miel, 100% vegana. Mismo sabor, misma calidad.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena integral sin gluten, semillas de girasol, almendras, anacardos, sirope de agave, semillas de calabaza, aceite de coco, avellanas, lino molido, canela, jengibre.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Puede contener trazas de soja y sésamo.',
    nutritionalInfo: {
      servingSize: 'por 100g',
      calories: 475,
      fat: 27,
      saturatedFat: 6,
      carbohydrates: 46,
      sugars: 8,
      fiber: 9,
      protein: 17,
      salt: 0.01,
    },
    images: ['/images/vegana.png', '/images/hover-vegana.png'],
    stock: 180,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecológico', 'artesanal', 'vegano', 'sin-miel', 'sirope-agave'],
    metaTitle: 'Comprar granola vegana sin gluten | 100% vegetal | Poppy',
    metaDescription:
      'Compra granola vegana sin gluten endulzada con sirope de agave ecológico. 100% vegetal, misma calidad artesanal. Envío gratis +4 uds. Entrega en 2-4 días.',
    hasHoney: false,
    isVegan: true,
  },
  {
    id: 'prod_granola_horeca',
    sku: 'GRAN-1KG',
    name: 'Granola original - Formato horeca',
    slug: 'granola-clasica-1kg-horeca',
    description: `El mismo producto artesanal que adoran nuestros clientes, ahora en formato de 1kg pensado para profesionales de la hostelería, cafeterías y tiendas especializadas.

Nuestra granola original en formato horeca mantiene todas las cualidades que nos diferencian: avena integral sin gluten, miel de apicultores locales, aceite de coco que junto con la miel da ese toque crujiente y un aroma suave y delicioso, y la mezcla premium de frutos secos que define nuestro sabor.

Tostamos granola cada semana bajo demanda en lotes pequeños, nunca la almacenamos. Eso significa que recibirás tu granola solo unas horas o días tras su elaboración.

**Formato profesional para negocios que valoran la calidad.**

Solicita información sobre precios mayoristas y condiciones de distribución a través de nuestro formulario B2B.`,
    shortDescription:
      'Formato 1kg para hostelería y tiendas. Endulzada con miel. Misma receta artesanal, tamaño profesional.',
    priceInCents: 2800,
    weight: 1000,
    ingredients:
      'Copos de avena integral sin gluten, semillas de girasol, almendras, anacardos, miel, semillas de calabaza, aceite de coco, avellanas, lino molido, canela, jengibre.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Puede contener trazas de soja y sésamo.',
    nutritionalInfo: {
      servingSize: 'por 100g',
      calories: 475,
      fat: 27,
      saturatedFat: 6,
      carbohydrates: 46,
      sugars: 8,
      fiber: 9,
      protein: 17,
      salt: 0.01,
    },
    images: ['/products/granola-horeca.jpg'],
    stock: 50,
    isActive: true,
    categoryId: 'cat_horeca',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'horeca', 'b2b', 'con-miel'],
    metaTitle: 'Granola artesanal 1kg hostelería | Sin gluten | Poppy',
    metaDescription:
      'Granola artesanal sin gluten 1kg para hostelería, cafeterías y tiendas. Miel ecológica y frutos secos premium. Solicita precios mayoristas.',
    hasHoney: true,
    isVegan: false,
  },
];

export const categories = [
  {
    id: 'cat_granola',
    name: 'Granola 150g',
    slug: 'granola-150g',
    description: 'Nuestra línea de granola Poppy en formato 150g, perfecta para consumo individual.',
    image: '/images/categories/granola-150g.jpg',
  },
  {
    id: 'cat_horeca',
    name: 'Formato horeca',
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
