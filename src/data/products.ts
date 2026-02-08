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
    name: 'Granola Clásica',
    slug: 'granola-clasica-150g',
    description: `Nuestra granola clásica es la receta original que dio vida a Poppy. Un equilibrio perfecto entre la avena sin gluten, la miel ecológica y una mezcla premium de semillas y frutos secos que define nuestro sabor característico.

Las pipas de girasol y calabaza son las protagonistas, junto con almendras, anacardos y avellanas seleccionadas. La miel ecológica carameliza suavemente durante el tostado lento, creando clusters perfectos.

El lino molido aporta omega-3 y el toque sutil de canela y jengibre completa la experiencia. Cada bolsa de 150g está elaborada con la proporción exacta para el crunch perfecto.

**El sabor que nos hizo famosos. Sencillo, auténtico, irresistible.**`,
    shortDescription:
      'Nuestra receta original con miel ecológica y frutos secos premium. El sabor clásico que nos define.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena sin gluten* (50%), pipas de girasol (17%), pipas de calabaza (8%), miel ecológica* (7%), almendras (6%), anacardos (5%), aceite de coco virgen extra* (4%), avellanas (2%), lino molido (1%), especias (canela, jengibre) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
    nutritionalInfo: {
      servingSize: 'por 100g',
      calories: 445,
      fat: 22,
      saturatedFat: 5.2,
      carbohydrates: 48,
      sugars: 14,
      fiber: 7.5,
      protein: 11,
      salt: 0.08,
    },
    images: ['/products/granola-clasica.jpg'],
    stock: 200,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecológico', 'artesanal', 'clásico', 'original', 'con-miel'],
    metaTitle: 'Granola Clásica 150g | Sin Gluten | Poppy',
    metaDescription:
      'Granola Poppy clásica 150g. Sin gluten, con miel ecológica y frutos secos premium. Nuestra receta original. Envío gratis +4 bolsas.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_chocolate',
    sku: 'GRAN-150-CHO',
    name: 'Granola de Chocolate',
    slug: 'granola-chocolate-150g',
    description: `Para los amantes del chocolate, nuestra granola de chocolate es un capricho saludable que no decepciona. El cacao puro en polvo, sin azúcares añadidos, se combina con pepitas de chocolate negro 70% para crear una experiencia irresistible.

La base sigue siendo nuestra avena sin gluten certificada y la miel ecológica, pero aquí el protagonista es el cacao crudo de comercio justo. Añadimos nibs de cacao para ese crunch extra que tanto gusta.

Perfecta para el desayuno, como topping de yogur o simplemente para picar entre horas cuando necesitas ese momento dulce sin remordimientos.

**El sabor del chocolate, pero con ingredientes reales.**`,
    shortDescription:
      'Granola con cacao puro y pepitas de chocolate negro 70%. Endulzada con miel ecológica. La opción perfecta para los amantes del chocolate saludable.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena sin gluten* (48%), pipas de girasol (16%), pipas de calabaza (8%), miel ecológica* (7%), almendras (5%), anacardos (5%), aceite de coco virgen extra* (4%), cacao en polvo puro* (3%), pepitas de chocolate negro 70% (2%), avellanas (2%), lino molido (1%), especias (canela, vainilla) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos), cacao. Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: ['/products/granola-chocolate.jpg'],
    stock: 150,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'cacao', 'chocolate', 'con-miel'],
    metaTitle: 'Granola de Chocolate 150g | Sin Gluten | Poppy',
    metaDescription:
      'Granola Poppy de chocolate con cacao puro 150g. Sin gluten, endulzada con miel ecológica. Envío gratis +4 bolsas.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_naranja',
    sku: 'GRAN-150-NAR',
    name: 'Granola de Naranja',
    slug: 'granola-naranja-150g',
    description: `Nuestra granola de naranja es una explosión de frescura mediterránea en cada bocado. Elaborada con ralladura de naranja natural y trocitos de naranja confitada, ofrece un perfil aromático único que despierta los sentidos.

La base de avena certificada sin gluten se combina con miel ecológica de azahar, que complementa perfectamente los cítricos. Las almendras marcona y las nueces aportan el equilibrio perfecto de textura y sabor.

El toque de canela de Ceilán y jengibre fresco realzan los aromas naturales de la naranja, creando una experiencia sensorial completa.

**Frescura mediterránea en tu desayuno.**`,
    shortDescription:
      'Granola con naranja natural y miel de azahar ecológica. Un toque cítrico y refrescante para empezar el día.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena sin gluten* (48%), pipas de girasol (16%), pipas de calabaza (8%), miel ecológica* (7%), almendras (5%), anacardos (5%), aceite de coco virgen extra* (4%), naranja confitada (3%), ralladura de naranja natural (2%), avellanas (2%), lino molido (1%), especias (canela, jengibre) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: ['/products/granola-naranja.jpg'],
    stock: 200,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'citricos', 'naranja', 'con-miel'],
    metaTitle: 'Granola de Naranja 150g | Sin Gluten | Poppy',
    metaDescription:
      'Granola Poppy de naranja 150g sin gluten. Ralladura de naranja natural y miel de azahar ecológica. Frescura mediterránea. Envío gratis +4 bolsas.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_datiles',
    sku: 'GRAN-150-VEG',
    name: 'Granola Vegana',
    slug: 'granola-vegana-150g',
    description: `Nuestra granola vegana tiene la misma receta deliciosa que la clásica, pero endulzada con sirope de agave en lugar de miel. Perfecta para quienes siguen una alimentación 100% vegetal.

Las pipas de girasol y calabaza son las protagonistas, junto con almendras, anacardos y avellanas seleccionadas. El sirope de agave ecológico carameliza suavemente durante el tostado lento, creando clusters perfectos.

El lino molido aporta omega-3 y el toque sutil de canela y jengibre completa la experiencia. Mismos ingredientes premium, misma calidad artesanal, 100% vegana.

**Todo el sabor Poppy, apto para veganos.**`,
    shortDescription:
      'Nuestra receta clásica endulzada con sirope de agave. Sin miel, 100% vegana. Mismo sabor, misma calidad.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena sin gluten* (50%), pipas de girasol (17%), pipas de calabaza (8%), sirope de agave* (7%), almendras (6%), anacardos (5%), aceite de coco virgen extra* (4%), avellanas (2%), lino molido (1%), especias (canela, jengibre) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
    nutritionalInfo: {
      servingSize: 'por 100g',
      calories: 440,
      fat: 20,
      saturatedFat: 5.0,
      carbohydrates: 52,
      sugars: 18,
      fiber: 7.0,
      protein: 10,
      salt: 0.08,
    },
    images: ['/products/granola-datiles.jpg'],
    stock: 180,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecológico', 'artesanal', 'vegano', 'sin-miel', 'sirope-agave'],
    metaTitle: 'Granola Vegana 150g | Sin Miel, Con Sirope de Agave | Poppy',
    metaDescription:
      'Granola Poppy vegana 150g. Sin gluten, sin miel, endulzada con sirope de agave ecológico. Envío gratis +4 bolsas.',
    hasHoney: false,
    isVegan: true,
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
      'Formato 1kg para hostelería y tiendas. Endulzada con miel ecológica. Misma receta artesanal, tamaño profesional.',
    priceInCents: 2800,
    weight: 1000,
    ingredients:
      'Copos de avena sin gluten* (50%), pipas de girasol (17%), pipas de calabaza (8%), miel ecológica* (7%), almendras (6%), anacardos (5%), aceite de coco virgen extra* (4%), avellanas (2%), lino molido (1%), especias (canela, jengibre) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: ['/products/granola-chocolate.jpg'],
    stock: 50,
    isActive: true,
    categoryId: 'cat_horeca',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'horeca', 'b2b', 'con-miel'],
    metaTitle: 'Granola Clásica 1kg Horeca | Formato Profesional | Poppy',
    metaDescription:
      'Granola Poppy formato 1kg para hostelería y tiendas. Sin gluten, endulzada con miel ecológica. Solicita precios mayoristas.',
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
