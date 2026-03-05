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
    description: `Nuestra granola clásica es la receta original que dio vida a Poppy. Un equilibrio perfecto entre la avena integral sin gluten, la miel de apicultores locales y una mezcla premium de semillas y frutos secos que define nuestro sabor característico.

Las semillas de girasol y calabaza son las protagonistas, junto con almendras, anacardos y avellanas seleccionadas. La miel de apicultores locales carameliza suavemente durante el tostado lento, creando clusters perfectos.

El lino molido aporta omega-3 y el toque sutil de canela y jengibre completa la experiencia. Cada bolsa de 150g está elaborada con la proporción exacta para el crunch perfecto.

**El sabor que nos hizo famosos. Sencillo, auténtico, irresistible.**`,
    shortDescription:
      'Nuestra receta original con miel de apicultores locales y frutos secos premium. El sabor clásico que nos define.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena integral sin gluten* (50%), semillas de girasol (17%), semillas de calabaza (8%), miel de apicultores locales (7%), almendras (6%), anacardos (5%), aceite de coco virgen extra* (4%), avellanas (2%), lino molido (1%), especias (canela, jengibre) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: ['/products/granola-clasica.jpg'],
    stock: 200,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecológico', 'artesanal', 'clásico', 'original', 'con-miel'],
    metaTitle: 'Comprar Granola Clásica Sin Gluten | Miel de Apicultores Locales | Poppy',
    metaDescription:
      'Granola artesanal sin gluten con miel de apicultores locales y frutos secos premium. Desde 7€/ud. Envío gratis +4 uds. Entrega en 2-4 días.',
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
      calories: 485,
      fat: 28,
      saturatedFat: 7,
      carbohydrates: 45,
      sugars: 8,
      fiber: 10,
      protein: 17,
      salt: 0.01,
    },
    images: ['/products/granola-chocolate.jpg'],
    stock: 0,
    isActive: false,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'cacao', 'chocolate', 'con-miel'],
    metaTitle: 'Comprar Granola Chocolate Sin Gluten | Cacao Puro 70% | Poppy',
    metaDescription:
      'Compra granola de chocolate sin gluten con cacao puro y pepitas de chocolate negro 70%. Miel ecológica. Envío gratis +4 uds. Entrega en 2-4 días.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_naranja',
    sku: 'GRAN-150-NAR',
    name: 'Granola con Toque de Naranja',
    slug: 'granola-naranja-150g',
    description: `Nuestra granola con toque de naranja es la receta original con un giro cítrico irresistible. A la base de avena integral sin gluten, semillas, frutos secos y miel de apicultores locales, le añadimos piel de naranja natural que aporta frescura mediterránea en cada bocado.

El aroma cítrico de la piel de naranja se funde con la canela y el jengibre durante el tostado lento, creando una combinación aromática única. Mismos ingredientes premium de nuestra receta original, con ese toque especial que despierta los sentidos.

**Nuestra receta original, con un toque de naranja.**`,
    shortDescription:
      'Nuestra receta original con un toque de piel de naranja natural. Frescura mediterránea en tu desayuno.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena integral sin gluten* (49%), semillas de girasol (16%), semillas de calabaza (8%), miel de apicultores locales (7%), almendras (5%), anacardos (5%), aceite de coco virgen extra* (4%), piel de naranja natural (3%), avellanas (2%), lino molido (1%), especias (canela, jengibre) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: ['/products/granola-naranja.jpg'],
    stock: 200,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecologico', 'artesanal', 'citricos', 'naranja', 'con-miel'],
    metaTitle: 'Comprar Granola con Toque de Naranja Sin Gluten | Poppy',
    metaDescription:
      'Compra granola artesanal sin gluten con piel de naranja natural y miel de apicultores locales. Sabor mediterráneo. Envío gratis +4 uds. Entrega en toda España.',
    hasHoney: true,
    isVegan: false,
  },
  {
    id: 'prod_granola_datiles',
    sku: 'GRAN-150-VEG',
    name: 'Granola Vegana (Bajo Demanda)',
    slug: 'granola-vegana-150g',
    description: `Nuestra granola vegana es la misma receta original que nos define, pero endulzada con sirope de ágave en lugar de miel. Perfecta para quienes siguen una alimentación 100% vegetal.

Las semillas de girasol y calabaza son las protagonistas, junto con almendras, anacardos y avellanas seleccionadas. El sirope de ágave carameliza suavemente durante el tostado lento, creando clusters perfectos.

El lino molido aporta omega-3 y el toque sutil de canela y jengibre completa la experiencia. Mismos ingredientes premium, misma calidad artesanal, 100% vegana.

**Producto bajo demanda:** Este producto se elabora por encargo. Contáctanos para hacer tu pedido.

**Todo el sabor Poppy, apto para veganos.**`,
    shortDescription:
      'Nuestra receta original endulzada con sirope de ágave. Sin miel, 100% vegana. Producto bajo demanda.',
    priceInCents: 700,
    weight: 150,
    ingredients:
      'Copos de avena integral sin gluten* (50%), semillas de girasol (17%), semillas de calabaza (8%), sirope de ágave (7%), almendras (6%), anacardos (5%), aceite de coco virgen extra* (4%), avellanas (2%), lino molido (1%), especias (canela, jengibre) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    images: ['/products/granola-vegana.jpg'],
    stock: 180,
    isActive: true,
    categoryId: 'cat_granola',
    tags: ['sin-gluten', 'ecológico', 'artesanal', 'vegano', 'sin-miel', 'sirope-agave', 'bajo-demanda'],
    metaTitle: 'Comprar Granola Vegana Sin Gluten | Bajo Demanda | Poppy',
    metaDescription:
      'Granola vegana sin gluten endulzada con sirope de ágave. 100% vegetal, misma calidad artesanal. Producto bajo demanda.',
    hasHoney: false,
    isVegan: true,
  },
  {
    id: 'prod_granola_horeca',
    sku: 'GRAN-1KG',
    name: 'Granola Clásica - Formato Horeca',
    slug: 'granola-clasica-1kg-horeca',
    description: `El mismo producto artesanal que adoran nuestros clientes, ahora en formato de 1kg pensado para profesionales de la hostelería, cafeterías y tiendas especializadas.

Nuestra granola clásica en formato horeca mantiene todas las cualidades que nos diferencian: avena integral sin gluten, miel de apicultores locales, y la mezcla premium de frutos secos que define nuestro sabor.

**Formato profesional para negocios que valoran la calidad.**

Solicita información sobre precios mayoristas y condiciones de distribución a través de nuestro formulario B2B.`,
    shortDescription:
      'Formato 1kg para hostelería y tiendas. Endulzada con miel de apicultores locales. Misma receta artesanal, tamaño profesional.',
    priceInCents: 2800,
    weight: 1000,
    ingredients:
      'Copos de avena integral sin gluten* (50%), semillas de girasol (17%), semillas de calabaza (8%), miel de apicultores locales (7%), almendras (6%), anacardos (5%), aceite de coco virgen extra* (4%), avellanas (2%), lino molido (1%), especias (canela, jengibre) (<1%). *De agricultura ecológica.',
    allergens:
      'Contiene: frutos de cáscara (almendras, avellanas, anacardos). Producido en instalaciones que procesan gluten, soja y sésamo. Control de contaminación cruzada según estándar ≤20 ppm de gluten.',
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
    metaTitle: 'Granola Artesanal 1kg Hostelería | Sin Gluten | Poppy',
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
