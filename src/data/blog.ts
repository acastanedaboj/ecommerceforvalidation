/**
 * Blog/Recipes Data - Granola Artesanal
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: 'recetas' | 'nutricion' | 'estilo-de-vida';
  author: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post_smoothie_bowl',
    slug: 'smoothie-bowl-granola-frutos-rojos',
    title: 'Smoothie Bowl con Granola y Frutos Rojos',
    excerpt:
      'El desayuno perfecto para empezar el día con energía: un smoothie bowl cremoso coronado con nuestra granola crujiente y frutos rojos frescos.',
    content: `
# Smoothie Bowl con Granola y Frutos Rojos

El desayuno es la comida más importante del día, y este smoothie bowl es la prueba de que puede ser delicioso, nutritivo y visualmente espectacular.

## Ingredientes (1 persona)

**Para el smoothie base:**
- 1 plátano congelado maduro
- 100g de frutos rojos congelados (fresas, arándanos, frambuesas)
- 100ml de bebida de almendras (o tu leche vegetal preferida)
- 1 cucharada de mantequilla de almendras (opcional)

**Para el topping:**
- 40g de Granola Artesanal Clásica
- Frutos rojos frescos al gusto
- 1 cucharada de semillas de chía
- Virutas de coco
- Un chorrito de miel (opcional)

## Preparación

### Paso 1: Preparar la base
Añade el plátano congelado, los frutos rojos y la bebida de almendras a una batidora de vaso. Tritura hasta obtener una textura cremosa y espesa. El truco está en no añadir demasiado líquido para que quede con consistencia de helado.

### Paso 2: Servir
Vierte la mezcla en un bowl ancho. La presentación es parte de la experiencia, así que elige un recipiente bonito.

### Paso 3: Decorar con arte
Aquí viene lo divertido: añade la granola en una sección, los frutos rojos frescos en otra, espolvorea las semillas de chía y las virutas de coco. Puedes crear líneas, círculos o simplemente esparcir todo de forma artística.

## Consejos del chef

- **Plátano congelado es clave:** Congela plátanos maduros cortados en rodajas. Son la base perfecta para conseguir esa textura cremosa sin añadir helado.
- **No mezcles la granola:** Añádela justo antes de comer para que mantenga su crujiente.
- **Variaciones:** Puedes usar mango congelado en lugar de frutos rojos para una versión tropical que combina genial con nuestra Granola Tropical.

## Información nutricional aproximada

| Nutriente | Por ración |
|-----------|------------|
| Calorías | 380 kcal |
| Proteínas | 10g |
| Carbohidratos | 55g |
| Grasas | 14g |
| Fibra | 9g |

¡Comparte tu creación en Instagram con el hashtag #GranolaArtesanal!
    `,
    coverImage: '/images/blog/smoothie-bowl.jpg',
    category: 'recetas',
    author: 'Equipo Granola Artesanal',
    publishedAt: '2024-01-15',
    readingTime: 5,
    tags: ['recetas', 'desayuno', 'smoothie-bowl', 'frutos-rojos', 'saludable'],
    metaTitle: 'Receta: Smoothie Bowl con Granola y Frutos Rojos | Granola Artesanal',
    metaDescription:
      'Aprende a preparar el smoothie bowl perfecto con granola artesanal y frutos rojos. Receta fácil, nutritiva y deliciosa para tus desayunos.',
  },
  {
    id: 'post_beneficios_avena',
    slug: 'beneficios-avena-sin-gluten-remojada',
    title: '¿Por qué remojamos la avena? Los beneficios de la avena sin gluten',
    excerpt:
      'Descubre por qué el proceso de remojo de la avena marca la diferencia en digestibilidad y absorción de nutrientes. La ciencia detrás de nuestra granola.',
    content: `
# ¿Por qué remojamos la avena? Los beneficios de la avena sin gluten

En Granola Artesanal, uno de nuestros secretos mejor guardados es el **remojo previo de la avena**. No es solo tradición: hay ciencia detrás de este proceso ancestral que mejora significativamente la calidad de nuestra granola.

## El problema del ácido fítico

Los cereales integrales como la avena contienen **ácido fítico**, un compuesto que actúa como antinutriente. El ácido fítico se une a minerales importantes como el hierro, zinc, calcio y magnesio, reduciendo su absorción en el intestino.

Esto no significa que la avena sea mala, sino que hay formas de prepararla que maximizan sus beneficios.

## La solución: el remojo

Cuando remojamos la avena en agua ligeramente ácida (nosotros usamos un toque de limón) durante varias horas:

1. **Se activan las enzimas** naturales del grano que descomponen el ácido fítico
2. **Mejora la digestibilidad** de los almidones
3. **Se liberan los nutrientes** para una mejor absorción
4. **Se suaviza la fibra** sin perder sus beneficios

## ¿Por qué avena sin gluten?

La avena es naturalmente libre de gluten, pero la mayoría de la avena comercial está contaminada porque se procesa en las mismas instalaciones que el trigo, la cebada y el centeno.

Nuestra avena proviene de **cultivos dedicados** y se procesa en instalaciones exclusivas, garantizando niveles de gluten por debajo de 20 ppm (el umbral legal para etiquetarse como "sin gluten").

## Beneficios de la avena para la salud

### Beta-glucanos
La avena es rica en beta-glucanos, un tipo de fibra soluble que:
- Ayuda a regular el colesterol
- Estabiliza los niveles de azúcar en sangre
- Alimenta las bacterias beneficiosas del intestino

### Proteína vegetal
Con aproximadamente 13g de proteína por 100g, la avena es uno de los cereales más proteicos.

### Minerales y vitaminas
Rica en manganeso, fósforo, magnesio, hierro y vitaminas del grupo B.

## Nuestro proceso

1. **Selección:** Avena certificada sin gluten de origen controlado
2. **Remojo:** 8-12 horas en agua con un toque de ácido
3. **Escurrido y secado:** Eliminamos el exceso de agua
4. **Tostado lento:** A baja temperatura para preservar nutrientes
5. **Mezclado:** Con miel ecológica, aceite de coco y frutos secos

Este proceso lleva más tiempo que simplemente mezclar ingredientes, pero el resultado es una granola más digestiva, nutritiva y con mejor sabor.

## Conclusión

No toda la granola es igual. La próxima vez que desayunes tu bol de Granola Artesanal, recuerda que cada bocado es el resultado de un proceso pensado para tu bienestar.

**¿Tienes sensibilidad digestiva a los cereales?** Muchas personas que tienen problemas con la avena convencional toleran perfectamente nuestra granola gracias al proceso de remojo. ¡Pruébala y cuéntanos tu experiencia!
    `,
    coverImage: '/images/blog/avena-sin-gluten.jpg',
    category: 'nutricion',
    author: 'Equipo Granola Artesanal',
    publishedAt: '2024-01-08',
    readingTime: 7,
    tags: ['nutricion', 'avena', 'sin-gluten', 'digestion', 'salud'],
    metaTitle: 'Beneficios de la Avena Sin Gluten Remojada | Granola Artesanal',
    metaDescription:
      'Descubre por qué el remojo de la avena mejora su digestibilidad y absorción de nutrientes. Aprende sobre los beneficios de la avena sin gluten certificada.',
  },
  {
    id: 'post_desayuno_energetico',
    slug: '5-formas-desayunar-granola-energia',
    title: '5 formas de desayunar granola para empezar con energía',
    excerpt:
      'Más allá del bol con leche: descubre ideas creativas y deliciosas para incorporar la granola en tu desayuno diario.',
    content: `
# 5 formas de desayunar granola para empezar con energía

Si piensas que la granola solo se come con leche en un bol, prepárate para descubrir un mundo de posibilidades. Aquí te dejamos cinco formas de disfrutar tu Granola Artesanal que transformarán tus mañanas.

## 1. El clásico reinventado: Yogur griego con granola

Sí, es un clásico, pero hay trucos para elevarlo:

- Usa **yogur griego natural** (sin azúcar añadido)
- Añade la granola justo antes de comer
- Corona con fruta fresca de temporada
- Un chorrito de miel si necesitas más dulzor

**Pro tip:** El yogur griego tiene el doble de proteína que el yogur normal, perfecto para mantenerte saciado hasta la comida.

## 2. Tostada de aguacate con granola crujiente

¿Aguacate y granola? ¡Confía en nosotros!

**Ingredientes:**
- 1 rebanada de pan de masa madre
- 1/2 aguacate maduro
- 2 cucharadas de Granola Artesanal
- Sal en escamas
- Un toque de aceite de oliva virgen extra

**Preparación:**
Tuesta el pan, machaca el aguacate encima, espolvorea la granola, añade sal y aceite. El contraste entre lo cremoso del aguacate y lo crujiente de la granola es adictivo.

## 3. Overnight oats con granola

La noche trabaja por ti:

**Ingredientes:**
- 40g de copos de avena
- 150ml de bebida de almendras
- 1 cucharada de semillas de chía
- Por la mañana: 30g de Granola Artesanal + fruta

**Preparación:**
Mezcla la avena, leche y chía en un tarro. Refrigera toda la noche. Por la mañana, añade la granola y fruta. ¡Listo para llevar!

## 4. Parfait de frutas en capas

Visualmente impresionante, perfecto para invitados:

En un vaso alto o tarro de cristal, alterna capas de:
1. Yogur
2. Granola
3. Fruta picada (fresas, plátano, mango...)
4. Repite

**Pro tip:** Prepara varios la noche anterior y guárdalos en la nevera (sin granola). Añade la granola justo antes de servir.

## 5. Batido de proteínas con crunch

Para los que entrenan por la mañana:

**Ingredientes:**
- 1 plátano
- 200ml de leche
- 1 cucharada de mantequilla de cacahuete
- 30g de proteína en polvo (opcional)
- 30g de Granola Artesanal por encima

**Preparación:**
Bate todo excepto la granola. Sirve en un bol ancho y corona con la granola para añadir textura.

---

## Bonus: La regla de oro

Sea cual sea la forma que elijas, recuerda: **añade la granola al final** para mantener ese crujiente que tanto nos gusta.

¿Cuál es tu forma favorita de comer granola? ¡Compártela con nosotros en redes sociales!

#GranolaArtesanal #DesayunoSaludable
    `,
    coverImage: '/images/blog/formas-desayunar-granola.jpg',
    category: 'estilo-de-vida',
    author: 'Equipo Granola Artesanal',
    publishedAt: '2024-01-01',
    readingTime: 4,
    tags: ['recetas', 'desayuno', 'ideas', 'saludable', 'energia'],
    metaTitle: '5 Formas de Desayunar Granola con Energía | Granola Artesanal',
    metaDescription:
      'Descubre 5 ideas creativas para desayunar granola más allá del bol con leche. Recetas fáciles y deliciosas para empezar el día con energía.',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export const blogCategories = [
  { id: 'recetas', name: 'Recetas', description: 'Ideas deliciosas con granola' },
  { id: 'nutricion', name: 'Nutrición', description: 'Aprende sobre alimentación saludable' },
  { id: 'estilo-de-vida', name: 'Estilo de vida', description: 'Tips para vivir mejor' },
];
