/**
 * Product Data - Poppy
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
    id: 'prod_granola_chocolate',
    sku: 'GRAN-250-CHO',
    name: 'Granola de Chocolate',
    slug: 'granola-chocolate-250g',
    description: `Para los amantes del chocolate, nuestra granola de chocolate es un capricho saludable que no decepciona. El cacao puro en polvo, sin azucares añadidos, se combina con pepitas de chocolate negro 70% para crear una experiencia irresistible.

La base sigue siendo nuestra avena sin gluten remojada y la miel ecologica, pero aqui el protagonista es el cacao crudo de comercio justo. Añadimos nibs de cacao para ese crunch extra que tanto gusta.

Perfecta para el desayuno, como topping de yogur o simplemente para picar entre horas cuando necesitas ese momento dulce sin remordimientos.

**El sabor del chocolate, pero con ingredientes reales.**`,
    shortDescription:
      'Granola con cacao puro y pepitas de chocolate negro 70%. Endulzada con miel ecologica. La opcion perfecta para los amantes del chocolate saludable.',
    priceInCents: 900,
    weight: 250,
    ingredients:
      'Copos de avena sin gluten* (38%), miel ecologica* (10%), pepitas de chocolate negro 70% (12%), cacao en polvo puro* (8%), nibs de cacao* (5%), almendras (8%), avellanas (6%), aceite de coco virgen extra* (4%), pipas de girasol (4%), lino molido (3%), vainilla natural (1%), sal marina (0.5%). *De agricultura ecologica.',
    allergens:
      'Contiene: frutos de cascara (avellanas, almendras), cacao. Producido en instalaciones que procesan gluten, soja y sesamo. Control de contaminacion cruzada segun estandar ≤20 ppm de gluten.',
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
    metaTitle: 'Granola de Chocolate 250g | Sin Gluten | Poppy',
    metaDescription:
      'Granola Poppy de chocolate con cacao puro 250g. Sin gluten, endulzada con miel ecologica. Envio gratis +4 bolsas.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_naranja',
    sku: 'GRAN-250-NAR',
    name: 'Granola de Naranja',
    slug: 'granola-naranja-250g',
    description: `Nuestra granola de naranja es una explosion de frescura mediterranea en cada bocado. Elaborada con ralladura de naranja natural y trocitos de naranja confitada, ofrece un perfil aromatico unico que despierta los sentidos.

La base de avena certificada sin gluten se combina con miel ecologica de azahar, que complementa perfectamente los citricos. Las almendras marcona y las nueces aportan el equilibrio perfecto de textura y sabor.

El toque de canela de Ceilan y jengibre fresco realzan los aromas naturales de la naranja, creando una experiencia sensorial completa.

**Frescura mediterranea en tu desayuno.**`,
    shortDescription:
      'Granola con naranja natural y miel de azahar ecologica. Un toque citrico y refrescante para empezar el dia.',
    priceInCents: 900,
    weight: 250,
    ingredients:
      'Copos de avena sin gluten* (40%), miel de azahar ecologica* (12%), almendras marcona (10%), nueces (8%), naranja confitada (8%), ralladura de naranja natural (3%), pipas de girasol (5%), pipas de calabaza (5%), aceite de coco virgen extra* (4%), lino molido (3%), canela de Ceilan (1%), jengibre en polvo (1%). *De agricultura ecologica.',
    allergens:
      'Contiene: frutos de cascara (almendras, nueces). Producido en instalaciones que procesan gluten, soja y sesamo. Control de contaminacion cruzada segun estandar ≤20 ppm de gluten.',
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
    metaTitle: 'Granola de Naranja 250g | Sin Gluten | Poppy',
    metaDescription:
      'Granola Poppy de naranja 250g sin gluten. Ralladura de naranja natural y miel de azahar ecologica. Frescura mediterranea. Envio gratis +4 bolsas.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_datiles',
    sku: 'GRAN-250-DAT',
    name: 'Granola de Datiles',
    slug: 'granola-datiles-250g',
    description: `Nuestra granola de datiles es un homenaje a los sabores del Mediterraneo. Los datiles Medjool, conocidos como el "fruto de los reyes", aportan una dulzura natural y caramelizada que hace innecesario cualquier azucar añadido.

Combinamos los datiles con nuestra base de avena sin gluten y los enriquecemos con almendras, nueces pecanas y semillas de sesamo tostado. El resultado es una granola con un dulzor natural intenso pero equilibrado.

El toque de cardamomo y canela transporta a los zocos del Mediterraneo, mientras que el aceite de coco virgen extra garantiza ese tostado perfecto.

**Dulzura natural, sin azucares añadidos.**`,
    shortDescription:
      'Granola con datiles Medjool y frutos secos. Sin miel, apta para veganos. Dulzura 100% natural sin azucares añadidos.',
    priceInCents: 900,
    weight: 250,
    ingredients:
      'Copos de avena sin gluten* (38%), datiles Medjool (18%), almendras (10%), nueces pecanas (8%), anacardos (6%), semillas de sesamo tostado (5%), pipas de calabaza (5%), aceite de coco virgen extra* (4%), lino molido (3%), cardamomo molido (1%), canela de Ceilan (1%), sal marina (0.5%). *De agricultura ecologica.',
    allergens:
      'Contiene: frutos de cascara (almendras, nueces pecanas, anacardos), sesamo. Producido en instalaciones que procesan gluten y soja. Control de contaminacion cruzada segun estandar ≤20 ppm de gluten.',
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
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'datiles', 'sin-azucar', 'vegano', 'sin-miel'],
    metaTitle: 'Granola de Datiles 250g | Vegana Sin Miel | Poppy',
    metaDescription:
      'Granola Poppy de datiles Medjool 250g. Sin gluten, vegana, sin miel. Dulzura 100% natural. Envio gratis +4 bolsas.',
    hasHoney: false,
    isVegan: true,
  },
  {
    id: 'prod_granola_horeca',
    sku: 'GRAN-1KG',
    name: 'Granola Clasica - Formato Horeca',
    slug: 'granola-clasica-1kg-horeca',
    description: `El mismo producto artesanal que adoran nuestros clientes, ahora en formato de 1kg pensado para profesionales de la hosteleria, cafeterias y tiendas especializadas.

Nuestra granola clasica en formato horeca mantiene todas las cualidades que nos diferencian: avena certificada sin gluten, miel ecologica de apicultores locales, y la mezcla premium de frutos secos que define nuestro sabor.

**Formato profesional para negocios que valoran la calidad.**

Solicita informacion sobre precios mayoristas y condiciones de distribucion a traves de nuestro formulario B2B.`,
    shortDescription:
      'Formato 1kg para hosteleria y tiendas. Endulzada con miel ecologica. Misma receta artesanal, tamaño profesional.',
    priceInCents: 2800,
    weight: 1000,
    ingredients:
      'Copos de avena sin gluten* (40%), miel ecologica* (12%), nueces pecanas (8%), almendras (8%), avellanas (6%), anacardos (6%), pipas de girasol (5%), pipas de calabaza (5%), aceite de coco virgen extra* (4%), lino molido (3%), canela de Ceilan (1%), jengibre en polvo (1%), ralladura de naranja natural (1%). *De agricultura ecologica.',
    allergens:
      'Contiene: frutos de cascara (almendras, avellanas, anacardos, nueces pecanas). Producido en instalaciones que procesan gluten, soja y sesamo. Control de contaminacion cruzada segun estandar ≤20 ppm de gluten.',
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
    metaTitle: 'Granola Clasica 1kg Horeca | Formato Profesional | Poppy',
    metaDescription:
      'Granola Poppy formato 1kg para hosteleria y tiendas. Sin gluten, endulzada con miel ecologica. Solicita precios mayoristas.',
    hasHoney: true,
    isVegan: false,
  },
];

export const categories = [
  {
    id: 'cat_granola',
    name: 'Granola 250g',
    slug: 'granola-250g',
    description: 'Nuestra linea de granola Poppy en formato 250g, perfecta para consumo individual.',
    image: '/images/categories/granola-250g.jpg',
  },
  {
    id: 'cat_horeca',
    name: 'Formato Horeca',
    slug: 'horeca',
    description: 'Formatos profesionales para hosteleria, cafeterias y distribucion.',
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
