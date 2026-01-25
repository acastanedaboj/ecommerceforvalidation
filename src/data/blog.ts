/**
 * Blog/Recipes Data - Poppy
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
- 40g de Poppy Clásica
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

¡Comparte tu creación en Instagram con el hashtag #Poppy!
    `,
    coverImage: '/images/blog/smoothie-bowl-granola.png',
    category: 'recetas',
    author: 'Equipo Poppy',
    publishedAt: '2024-01-15',
    readingTime: 5,
    tags: ['recetas', 'desayuno', 'smoothie-bowl', 'frutos-rojos', 'saludable'],
    metaTitle: 'Receta: Smoothie Bowl con Granola y Frutos Rojos | Poppy',
    metaDescription:
      'Aprende a preparar el smoothie bowl perfecto con granola Poppy y frutos rojos. Receta fácil, nutritiva y deliciosa para tus desayunos.',
  },
  {
    id: 'post_remojo_frutos_secos',
    slug: 'por-que-remojamos-frutos-secos-semillas',
    title: 'Por qué remojamos los frutos secos y semillas en Poppy',
    excerpt:
      'Descubre el proceso tradicional de remojo de frutos secos y semillas que utilizamos en nuestra granola. Una técnica ancestral que puede mejorar la digestibilidad.',
    content: `
# Por qué remojamos los frutos secos y semillas

En Poppy aplicamos una técnica tradicional que muchos han olvidado: el **remojo previo de los frutos secos y las semillas**. Este proceso ancestral, utilizado durante generaciones en diversas culturas, forma parte de nuestra manera de elaborar granola.

## ¿Qué remojamos exactamente?

Antes de incorporarlos a nuestra granola, remojamos:

- **Almendras**
- **Anacardos**
- **Pipas de calabaza**
- **Pipas de girasol**
- **Semillas de lino**

Cada uno de estos ingredientes pasa por un proceso de remojo en agua durante varias horas antes del tostado.

## La tradición del remojo

El remojo de frutos secos y semillas es una práctica que se ha utilizado durante siglos en muchas culturas alrededor del mundo. Nuestras abuelas lo hacían de forma natural, sin necesidad de explicaciones científicas.

### ¿Qué ocurre durante el remojo?

Los frutos secos y semillas contienen **fitatos** (ácido fítico), compuestos naturales que forman parte de la estructura de estos alimentos. El remojo en agua puede:

- **Reducir parcialmente los fitatos** presentes en estos alimentos
- **Ablandar la textura** de los frutos secos
- **Suavizar el sabor**, haciéndolo más delicado

## Nuestra experiencia

Llevamos años elaborando granola con este método y hemos observado que:

1. **El sabor es más suave y redondo** - Los frutos secos remojados y luego tostados tienen un perfil de sabor más delicado
2. **La textura mejora** - Conseguimos un tostado más uniforme
3. **Algunos clientes nos comentan** que la encuentran más fácil de digerir que otras granolas

## Lo que podemos decir (y lo que no)

Queremos ser transparentes sobre este proceso:

**Lo que sí podemos afirmar:**
- Es una técnica tradicional utilizada durante generaciones
- Puede ayudar a algunas personas con digestiones sensibles
- Mejora el sabor y la textura de los frutos secos
- Forma parte de nuestro proceso artesanal

**Lo que NO afirmamos:**
- No hacemos declaraciones de salud
- No decimos que "elimine" los antinutrientes (solo los reduce parcialmente)
- Cada persona es diferente y los efectos pueden variar

## Nuestro proceso completo

1. **Selección:** Frutos secos y semillas de calidad premium
2. **Remojo:** Varias horas en agua filtrada
3. **Escurrido y secado:** Eliminamos el exceso de agua
4. **Tostado artesanal:** A baja temperatura para un tostado uniforme
5. **Mezclado:** Con avena sin gluten, miel ecológica y aceite de coco

## ¿Por qué nos tomamos esta molestia?

Sería mucho más fácil (y rápido) mezclar todos los ingredientes directamente. Pero en Poppy creemos en hacer las cosas bien, no en hacerlas rápido.

Este proceso lleva más tiempo, pero creemos que el resultado merece la pena: una granola elaborada con mimo y siguiendo técnicas tradicionales que respetan los ingredientes.

## Pruébala y cuéntanos

Al final, lo importante es cómo te sienta a ti. Algunas personas notan diferencia con granolas elaboradas con este proceso, otras simplemente disfrutan del sabor.

**¿Has probado nuestra granola?** Nos encantaría saber tu experiencia.
    `,
    coverImage: '/images/blog/granola-bowl-yogurt.png',
    category: 'nutricion',
    author: 'Equipo Poppy',
    publishedAt: '2024-01-08',
    readingTime: 5,
    tags: ['nutricion', 'frutos-secos', 'proceso-artesanal', 'digestion', 'tradicion'],
    metaTitle: 'Por qué Remojamos los Frutos Secos y Semillas | Poppy',
    metaDescription:
      'Descubre el proceso tradicional de remojo de frutos secos y semillas que utilizamos en Poppy. Una técnica ancestral para una granola artesanal.',
  },
  {
    id: 'post_desayuno_energetico',
    slug: '5-formas-desayunar-granola-energia',
    title: '5 formas de desayunar granola para empezar con energía',
    excerpt:
      'Más allá del bol con leche: descubre ideas creativas y deliciosas para incorporar la granola en tu desayuno diario.',
    content: `
# 5 formas de desayunar granola para empezar con energía

Si piensas que la granola solo se come con leche en un bol, prepárate para descubrir un mundo de posibilidades. Aquí te dejamos cinco formas de disfrutar tu Poppy que transformarán tus mañanas.

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
- 2 cucharadas de Poppy
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
- Por la mañana: 30g de Poppy + fruta

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
- 30g de Poppy por encima

**Preparación:**
Bate todo excepto la granola. Sirve en un bol ancho y corona con la granola para añadir textura.

---

## Bonus: La regla de oro

Sea cual sea la forma que elijas, recuerda: **añade la granola al final** para mantener ese crujiente que tanto nos gusta.

¿Cuál es tu forma favorita de comer granola? ¡Compártela con nosotros en redes sociales!

#Poppy #DesayunoSaludable
    `,
    coverImage: '/images/blog/5-formas-desayunar-granola.png',
    category: 'estilo-de-vida',
    author: 'Equipo Poppy',
    publishedAt: '2024-01-01',
    readingTime: 4,
    tags: ['recetas', 'desayuno', 'ideas', 'saludable', 'energia'],
    metaTitle: '5 Formas de Desayunar Granola con Energía | Poppy',
    metaDescription:
      'Descubre 5 ideas creativas para desayunar granola más allá del bol con leche. Recetas fáciles y deliciosas para empezar el día con energía.',
  },
  {
    id: 'post_celiacos_guia',
    slug: 'guia-completa-granola-sin-gluten-celiacos',
    title: 'Guía Completa de Granola Sin Gluten para Celíacos',
    excerpt:
      'Todo lo que necesitas saber sobre la granola apta para celíacos: certificaciones, ingredientes seguros, cómo identificar contaminación cruzada y marcas de confianza.',
    content: `
# Guía Completa de Granola Sin Gluten para Celíacos

Si eres celíaco o tienes sensibilidad al gluten, encontrar una granola verdaderamente segura puede ser todo un desafío. En esta guía te explicamos qué buscar y qué evitar.

## ¿Qué significa "sin gluten" realmente?

En la Unión Europea, un producto puede etiquetarse como "sin gluten" si contiene menos de 20 partes por millón (ppm) de gluten. Este umbral está establecido por el Reglamento (CE) 41/2009 y es seguro para la mayoría de personas con enfermedad celíaca.

### La avena: el ingrediente polémico

La avena es naturalmente libre de gluten, pero presenta un problema: la contaminación cruzada durante el cultivo y procesado. La mayoría de la avena comercial se cultiva cerca del trigo y se procesa en las mismas instalaciones.

**Qué buscar:**
- Avena de cultivos dedicados
- Procesado en instalaciones exclusivas sin gluten
- Certificación de terceros (como FACE en España)
- Análisis de gluten en cada lote

## Ingredientes seguros y de riesgo

### Ingredientes generalmente seguros:
- Copos de avena certificados sin gluten
- Frutos secos naturales (sin procesar)
- Semillas (chía, lino, girasol, calabaza)
- Aceite de coco
- Miel pura
- Frutas deshidratadas sin maltodextrina

### Ingredientes a evitar:
- Extracto de malta (contiene gluten)
- Saborizantes no especificados
- Almidones modificados (si no especifica origen)
- Productos procesados en instalaciones con gluten sin control

## Cómo elegir una granola segura

1. **Lee el etiquetado completo**, no solo el frontal
2. **Busca la declaración de alérgenos**
3. **Verifica el origen de la avena**
4. **Comprueba si hay certificaciones oficiales**
5. **Investiga los procesos de fabricación de la marca**

## Nuestra garantía

En Poppy utilizamos avena de cultivos dedicados, procesada en instalaciones con estrictos protocolos de limpieza. Cada lote se analiza para garantizar niveles por debajo de 20 ppm.

**Nota importante:** Si tienes enfermedad celíaca severa, consulta siempre con tu médico antes de introducir cualquier producto nuevo.
    `,
    coverImage: '/images/blog/granola-sin-gluten-celiacos.png',
    category: 'nutricion',
    author: 'Equipo Poppy',
    publishedAt: '2024-01-22',
    readingTime: 8,
    tags: ['sin-gluten', 'celiacos', 'nutricion', 'salud', 'guia'],
    metaTitle: 'Granola Sin Gluten para Celíacos: Guía Completa | Poppy',
    metaDescription:
      'Guía completa sobre granola sin gluten para celíacos. Aprende a identificar productos seguros, certificaciones y evitar contaminación cruzada.',
  },
  {
    id: 'post_overnight_oats',
    slug: 'overnight-oats-granola-receta-perfecta',
    title: 'Overnight Oats con Granola: La Receta Perfecta para tus Mañanas',
    excerpt:
      'Aprende a preparar overnight oats cremosos y añade la granola en el momento justo para mantener ese crunch perfecto. Receta paso a paso con variaciones.',
    content: `
# Overnight Oats con Granola: La Receta Perfecta

Los overnight oats son la solución perfecta para quienes quieren un desayuno nutritivo sin dedicar tiempo por la mañana. Y si les añades granola en el momento justo, consigues la combinación perfecta de cremosidad y crujiente.

## ¿Qué son los Overnight Oats?

Son copos de avena que se dejan remojando toda la noche en un líquido (leche, yogur o bebida vegetal). Durante esas horas, la avena absorbe el líquido y se ablanda, creando una textura cremosa sin necesidad de cocción.

## Receta Base (1 ración)

**Ingredientes:**
- 40g de copos de avena (usa avena sin gluten si eres celíaco)
- 100ml de tu leche preferida
- 50g de yogur natural
- 1 cucharada de semillas de chía
- 1 cucharadita de miel o sirope de arce
- Una pizca de canela

**El toque final:**
- 30g de Granola Poppy
- Fruta fresca al gusto

## Preparación

### La noche anterior:
1. En un tarro de cristal, mezcla la avena, leche, yogur, chía, miel y canela
2. Remueve bien para que no queden grumos
3. Tapa y refrigera al menos 6 horas (o toda la noche)

### Por la mañana:
1. Saca el tarro de la nevera
2. Si ha quedado muy espeso, añade un chorrito de leche
3. Corona con fruta fresca picada
4. **Añade la granola JUSTO antes de comer**

## El secreto del crunch perfecto

La granola debe añadirse en el último momento. Si la mezclas con los overnight oats la noche anterior, absorberá humedad y perderá su textura crujiente.

**Pro tip:** Lleva la granola en un recipiente aparte si desayunas fuera de casa.

## Variaciones deliciosas

### Tropical
- Añade mango y piña congelados
- Usa leche de coco
- Corona con coco rallado y nuestra granola

### Chocolate
- Añade 1 cucharada de cacao puro
- Usa plátano congelado en rodajas
- Perfecto con Granola de Chocolate Poppy

### Frutas del bosque
- Mezcla frutos rojos congelados con la avena
- Añade un toque de vainilla
- Decora con frutos rojos frescos

## Información nutricional

Esta receta aporta aproximadamente:
- **350-400 kcal** (dependiendo de la leche y toppings)
- **12g de proteína**
- **8g de fibra**
- Grasas saludables de los frutos secos

¡Prepara varios tarros el domingo y tendrás desayuno para toda la semana!
    `,
    coverImage: '/images/blog/overnight-oats-granola.png',
    category: 'recetas',
    author: 'Equipo Poppy',
    publishedAt: '2024-01-18',
    readingTime: 5,
    tags: ['recetas', 'overnight-oats', 'desayuno', 'meal-prep', 'saludable'],
    metaTitle: 'Overnight Oats con Granola: Receta Perfecta Paso a Paso | Poppy',
    metaDescription:
      'Receta de overnight oats con granola. Aprende a preparar un desayuno nutritivo la noche anterior y añadir el crunch perfecto por la mañana.',
  },
  {
    id: 'post_miel_beneficios',
    slug: 'beneficios-miel-ecologica-granola',
    title: 'Miel Ecológica en la Granola: Por qué Marca la Diferencia',
    excerpt:
      'Descubre los beneficios de la miel ecológica frente al azúcar refinado y por qué elegimos este endulzante natural para nuestra granola artesanal.',
    content: `
# Miel Ecológica: Por qué Marca la Diferencia

En un mercado lleno de granolas endulzadas con azúcar refinado, jarabes de maíz o edulcorantes artificiales, nosotros elegimos la miel ecológica. Y hay razones científicas detrás de esta decisión.

## Miel vs Azúcar Refinado

Aunque ambos aportan dulzor, hay diferencias importantes:

### Composición
- **Azúcar refinado:** 100% sacarosa, sin nutrientes adicionales
- **Miel:** Fructosa y glucosa naturales + enzimas, antioxidantes, vitaminas y minerales

### Índice glucémico
- Azúcar blanco: IG 65
- Miel: IG 45-64 (varía según el tipo)

La miel tiene un impacto ligeramente menor en los niveles de azúcar en sangre, aunque sigue siendo un azúcar y debe consumirse con moderación.

## ¿Qué hace "ecológica" a una miel?

Para que una miel se certifique como ecológica debe cumplir:

1. **Ubicación de las colmenas** en zonas libres de pesticidas
2. **Alimentación natural** de las abejas (no jarabe de azúcar)
3. **Tratamientos veterinarios** solo con productos autorizados
4. **Extracción en frío** para preservar enzimas
5. **Sin aditivos** ni calentamiento excesivo

## Beneficios de la miel en la granola

### 1. Sabor único
La miel aporta notas florales y caramelizadas que el azúcar simplemente no puede replicar. Cada tipo de miel (milflores, azahar, eucalipto) da un perfil de sabor diferente.

### 2. Textura perfecta
La miel ayuda a crear esos clusters (grupos) de granola que tanto nos gustan. Actúa como aglutinante natural durante el horneado.

### 3. Conservación natural
Las propiedades antimicrobianas de la miel ayudan a mantener la granola fresca más tiempo de forma natural.

### 4. Nutrientes adicionales
Aunque en pequeñas cantidades, la miel aporta:
- Antioxidantes (flavonoides)
- Enzimas digestivas
- Vitaminas del grupo B
- Minerales (hierro, calcio, potasio)

## Nuestra miel

Trabajamos con apicultores locales de la región de Castilla-La Mancha que practican apicultura sostenible. Sus colmenas están ubicadas en zonas rurales alejadas de agricultura intensiva.

**Importante:** Aunque la miel es más natural que el azúcar refinado, sigue siendo un azúcar. Nuestra granola usa la cantidad justa para conseguir el sabor deseado sin excesos.

## ¿Y las opciones veganas?

Entendemos que la miel no es apta para veganos. Por eso, nuestra Granola de Dátiles utiliza dátiles Medjool como endulzante 100% vegetal, ofreciendo una alternativa igual de deliciosa.
    `,
    coverImage: '/images/blog/miel-ecologica.png',
    category: 'nutricion',
    author: 'Equipo Poppy',
    publishedAt: '2024-01-12',
    readingTime: 6,
    tags: ['miel', 'ecologico', 'nutricion', 'ingredientes', 'salud'],
    metaTitle: 'Beneficios de la Miel Ecológica en la Granola | Poppy',
    metaDescription:
      'Descubre por qué elegimos miel ecológica para endulzar nuestra granola. Beneficios frente al azúcar, propiedades y diferencias con miel convencional.',
  },
  {
    id: 'post_snack_saludable',
    slug: 'granola-snack-saludable-entre-horas',
    title: 'Granola como Snack Saludable: Ideas para Picar entre Horas',
    excerpt:
      'La granola no es solo para el desayuno. Descubre formas creativas de disfrutarla como snack saludable a media mañana o merienda.',
    content: `
# Granola como Snack: Ideas para Picar Sano

¿Quién dice que la granola es solo para el desayuno? Este alimento versátil puede convertirse en tu aliado perfecto para esos momentos del día en que necesitas un aporte de energía.

## ¿Por qué granola como snack?

### Ventajas frente a snacks procesados:
- **Fibra que sacia:** Te mantiene lleno más tiempo
- **Energía sostenida:** Carbohidratos complejos + proteína de frutos secos
- **Sin aditivos:** Ingredientes que reconoces
- **Portátil:** Fácil de llevar a cualquier parte

### Momento ideal
- Media mañana (10-11h)
- Merienda (17-18h)
- Pre-entreno (1h antes)
- Post-entreno (con proteína añadida)

## Ideas para snackear con granola

### 1. Granola a puñados
La forma más simple. Lleva una bolsita de 30-40g en el bolso o mochila. Es tu salvavidas para esos momentos de hambre inesperada.

**Tip:** Usa un tarro pequeño reutilizable para llevarla sin que se aplaste.

### 2. Vasito de yogur con granola
Prepara capas alternas de yogur griego y granola en un vasito con tapa. Mantenlo refrigerado hasta la hora de merendar.

### 3. Manzana con granola
Corta una manzana en gajos, unta con mantequilla de almendras y espolvorea granola por encima. Crujiente por partida doble.

### 4. Barrita casera express
Mezcla granola con un poco de mantequilla de cacahuete, forma bolitas y refrigera. Snack energético listo.

### 5. Batido con crunch
Prepara tu batido favorito y sirve en un vaso ancho. Añade una capa de granola por encima para comer con cuchara.

## Porciones recomendadas

Como snack, una porción de **30-40g** es suficiente para:
- Calmar el hambre
- Aportar energía
- No arruinar el apetito para la siguiente comida

**Equivalencia visual:** Un puñado generoso o 3-4 cucharadas soperas.

## Granola para deportistas

Si practicas deporte, la granola puede ser un snack perfecto:

**Pre-entreno (1h antes):**
- 40g de granola
- Medio plátano
- Hidratación

**Post-entreno:**
- Batido de proteínas
- 30g de granola como topping
- Aporta carbohidratos para recuperación

## Lo que debes evitar

- No sustituyas comidas principales por granola
- Controla las porciones (es fácil pasarse)
- Evita comer directamente de la bolsa
- No la combines con otros snacks azucarados

La clave está en el equilibrio: la granola es un snack excelente, pero como todo, en su justa medida.
    `,
    coverImage: '/images/blog/granola-snack.png',
    category: 'estilo-de-vida',
    author: 'Equipo Poppy',
    publishedAt: '2024-01-05',
    readingTime: 4,
    tags: ['snack', 'saludable', 'entre-horas', 'energia', 'deporte'],
    metaTitle: 'Granola como Snack Saludable: Ideas para Entre Horas | Poppy',
    metaDescription:
      'Ideas para usar la granola como snack saludable. Porciones recomendadas, momentos ideales y combinaciones deliciosas para picar entre horas.',
  },
  {
    id: 'post_frutos_secos',
    slug: 'frutos-secos-granola-beneficios-tipos',
    title: 'Frutos Secos en la Granola: Tipos, Beneficios y Cómo Elegir',
    excerpt:
      'Conoce los frutos secos que usamos en nuestra granola, sus propiedades nutricionales y por qué elegimos cada uno de ellos.',
    content: `
# Frutos Secos en la Granola: Guía Completa

Los frutos secos son el alma de una buena granola. Aportan textura, sabor, proteínas y grasas saludables. Pero no todos son iguales. Te contamos por qué elegimos cada uno.

## Nuestros frutos secos estrella

### Almendras
**Por qué las usamos:** Son las más versátiles y una excelente fuente de vitamina E.

**Beneficios:**
- Ricas en vitamina E (antioxidante)
- Alto contenido en magnesio
- Proteína vegetal de calidad
- Grasas monoinsaturadas

**En nuestra granola:** Usamos almendras españolas, cortadas en láminas para mejor distribución.

### Nueces Pecanas
**Por qué las usamos:** Aportan un sabor acaramelado único y textura mantecosa.

**Beneficios:**
- Alto contenido en antioxidantes
- Ricas en zinc
- Omega-3 vegetal
- Fibra

**En nuestra granola:** Las partimos en trozos grandes para que se noten en cada bocado.

### Avellanas
**Por qué las usamos:** Combinan perfectamente con el chocolate y la vainilla.

**Beneficios:**
- Excelente fuente de folato
- Vitamina E
- Manganeso
- Grasas saludables para el corazón

**En nuestra granola:** Ligeramente tostadas para potenciar su sabor.

### Anacardos
**Por qué los usamos:** Textura cremosa que contrasta con el crujiente de la avena.

**Beneficios:**
- Ricos en hierro
- Magnesio
- Zinc
- Proteína completa

**En nuestra granola:** Los añadimos enteros o en mitades según el producto.

## Cómo elegimos nuestros frutos secos

1. **Origen:** Priorizamos productores españoles y europeos
2. **Frescura:** Compramos en pequeñas cantidades para garantizar frescura
3. **Calidad:** Solo calibres premium, sin defectos
4. **Tostado:** Controlamos el tostado para cada tipo de fruto seco
5. **Sin aditivos:** Nunca usamos frutos secos salados o saborizados

## Beneficios nutricionales combinados

Cuando mezclas diferentes frutos secos, obtienes:

| Nutriente | Beneficio |
|-----------|-----------|
| Proteína vegetal | Saciedad y músculo |
| Omega-3 y 6 | Salud cardiovascular |
| Fibra | Digestión |
| Vitamina E | Antioxidante |
| Magnesio | Sistema nervioso |
| Zinc | Inmunidad |

## Alérgenos: información importante

Los frutos secos son uno de los 14 alérgenos de declaración obligatoria. Nuestra granola contiene:

- Almendras
- Avellanas
- Nueces pecanas
- Anacardos

Si tienes alergia a algún fruto seco, consulta siempre el etiquetado específico de cada producto.

## ¿Cuántos frutos secos tiene nuestra granola?

Aproximadamente el **25-30%** de nuestra granola son frutos secos y semillas. Es un porcentaje alto comparado con muchas granolas comerciales que apenas llegan al 10%.

Esta proporción garantiza que en cada cucharada encuentres sabor, textura y nutrientes de los frutos secos, no solo avena con azúcar.
    `,
    coverImage: '/images/blog/frutos-secos-granola.png',
    category: 'nutricion',
    author: 'Equipo Poppy',
    publishedAt: '2023-12-28',
    readingTime: 6,
    tags: ['frutos-secos', 'nutricion', 'ingredientes', 'salud', 'proteina'],
    metaTitle: 'Frutos Secos en la Granola: Beneficios y Tipos | Poppy',
    metaDescription:
      'Guía completa sobre los frutos secos en la granola: almendras, nueces pecanas, avellanas y anacardos. Beneficios nutricionales y cómo los elegimos.',
  },
  {
    id: 'post_bowl_proteico',
    slug: 'bowl-proteico-granola-post-entreno',
    title: 'Bowl Proteico con Granola: Receta Post-Entreno',
    excerpt:
      'Recupera después del ejercicio con este bowl proteico completo. Combina proteína, carbohidratos de la granola y grasas saludables.',
    content: `
# Bowl Proteico con Granola: Receta Post-Entreno

Después de entrenar, tu cuerpo necesita nutrientes para recuperarse. Este bowl combina proteína para los músculos, carbohidratos para reponer energía y grasas saludables de los frutos secos.

## ¿Por qué un bowl post-entreno?

Tras el ejercicio, tienes una "ventana anabólica" de 30-60 minutos donde tu cuerpo absorbe nutrientes de forma más eficiente. Un bowl bien diseñado aprovecha este momento.

**Lo que necesitas:**
- Proteína: 20-30g para síntesis muscular
- Carbohidratos: 40-60g para reponer glucógeno
- Líquidos: rehidratación

## Receta: Bowl Proteico Completo

### Ingredientes (1 ración grande)

**Base:**
- 150g de queso quark o skyr
- 1 scoop de proteína en polvo (vainilla o neutro) - opcional
- 100ml de leche

**Toppings:**
- 50g de Granola Poppy
- 1 plátano maduro en rodajas
- 1 cucharada de mantequilla de almendras
- Arándanos frescos
- 1 cucharada de semillas de cáñamo

### Preparación

1. **Mezcla la base:** Bate el quark con la proteína en polvo y un poco de leche hasta conseguir una textura cremosa
2. **Vierte en un bowl ancho:** La presentación importa
3. **Añade el plátano** en rodajas por un lado
4. **Coloca la granola** en el lado opuesto
5. **Añade la mantequilla de almendras** en el centro
6. **Decora** con arándanos y semillas

## Información Nutricional

| Macronutriente | Cantidad |
|----------------|----------|
| Calorías | 550-600 kcal |
| Proteína | 35-40g |
| Carbohidratos | 55-65g |
| Grasas | 18-22g |
| Fibra | 8g |

## Variaciones según objetivo

### Para ganar masa muscular
- Añade más quark/proteína
- Usa plátano entero
- Añade una cucharada extra de mantequilla de frutos secos

### Para definición
- Reduce la porción de granola a 30g
- Usa quark desnatado
- Cambia plátano por frutos rojos (menos azúcar)

### Versión vegana
- Sustituye quark por yogur de soja o coco
- Usa proteína vegetal (guisante + arroz)
- Granola de Dátiles (sin miel)

## Cuándo tomarlo

**Momento ideal:** 30-45 minutos post-entreno

**Tip:** Si entrenas muy temprano, prepara los toppings la noche anterior en tuppers separados. Solo tendrás que montar el bowl cuando llegues a casa.

## Errores comunes

1. **Saltarse los carbohidratos** - Son necesarios para recuperar
2. **Demasiada proteína** - El cuerpo no puede absorber cantidades ilimitadas
3. **Poca hidratación** - Acompaña siempre con agua
4. **Esperar demasiado** - Aprovecha la ventana post-entreno

Este bowl es una comida completa. Si entrenas por la mañana, puede ser tu desayuno post-gym perfecto.
    `,
    coverImage: '/images/blog/bowl-proteico.png',
    category: 'recetas',
    author: 'Equipo Poppy',
    publishedAt: '2023-12-20',
    readingTime: 5,
    tags: ['recetas', 'proteina', 'post-entreno', 'fitness', 'desayuno'],
    metaTitle: 'Bowl Proteico con Granola Post-Entreno | Receta | Poppy',
    metaDescription:
      'Receta de bowl proteico con granola para después del entrenamiento. Combina proteína, carbohidratos y grasas saludables para una recuperación óptima.',
  },
  {
    id: 'post_vegano_desayuno',
    slug: 'desayuno-vegano-completo-granola',
    title: 'Desayuno Vegano Completo con Granola: Nutrientes que Necesitas',
    excerpt:
      'Cómo diseñar un desayuno vegano equilibrado usando granola. Asegura proteína, hierro, B12 y todos los nutrientes esenciales.',
    content: `
# Desayuno Vegano Completo con Granola

Diseñar un desayuno vegano nutritivo y saciante es más fácil de lo que parece. La granola puede ser la base perfecta si sabes cómo complementarla.

## Los retos del desayuno vegano

Cuando eliminas los productos de origen animal, debes prestar atención a ciertos nutrientes:

- **Proteína:** Necesitas combinar fuentes vegetales
- **Hierro:** Menos biodisponible que el animal
- **B12:** Requiere suplementación o alimentos fortificados
- **Calcio:** Si evitas lácteos, busca alternativas

## Nuestra Granola de Dátiles: 100% Vegana

Desarrollamos una versión sin miel específicamente para veganos. Los dátiles Medjool aportan:

- Dulzor natural intenso
- Fibra
- Potasio
- Magnesio
- Sin productos animales

## El desayuno vegano perfecto

### Ingredientes para un desayuno completo:

**Base:**
- 50g de Granola de Dátiles Poppy
- 150ml de bebida de soja fortificada (proteína + calcio + B12)
- 100g de yogur de soja o coco

**Proteína extra:**
- 2 cucharadas de semillas de cáñamo (proteína completa)
- 1 cucharada de mantequilla de almendras

**Vitamina C (mejora absorción de hierro):**
- Fresas frescas o kiwi

**Omega-3:**
- 1 cucharada de semillas de lino molidas

### Montaje
1. Vierte el yogur vegetal en un bowl
2. Añade la bebida de soja
3. Corona con la granola
4. Espolvorea semillas de cáñamo y lino
5. Añade la fruta fresca
6. Termina con mantequilla de almendras

## Perfil nutricional

Este desayuno aporta:

| Nutriente | Cantidad | % VRN |
|-----------|----------|-------|
| Proteína | 22g | 44% |
| Hierro | 6mg | 43% |
| Calcio | 350mg | 44% |
| Omega-3 | 2.5g | - |
| Fibra | 10g | 40% |
| B12 | (de la bebida fortificada) | 100% |

## Variaciones por estación

### Verano
- Añade mango y papaya
- Usa leche de coco fría
- Congela el plátano para textura helada

### Invierno
- Calienta ligeramente la bebida vegetal
- Añade canela y jengibre
- Usa pera y manzana cocidas

## Mitos sobre la proteína vegana

**Mito:** "No puedes obtener suficiente proteína sin carne"
**Realidad:** Combinando legumbres, frutos secos, semillas y cereales, cubres todas las necesidades.

**Mito:** "Las proteínas vegetales son incompletas"
**Realidad:** Algunas sí, pero al combinar diferentes fuentes a lo largo del día, obtienes todos los aminoácidos esenciales. Las semillas de cáñamo y la quinoa son proteínas completas.

## Nota sobre la B12

La vitamina B12 no se encuentra de forma fiable en alimentos vegetales. Asegúrate de:
- Usar bebidas vegetales fortificadas
- Tomar un suplemento de B12
- Consumir alimentos fortificados regularmente

Un desayuno vegano bien planificado puede ser tan (o más) nutritivo que uno convencional. La clave está en la variedad y la planificación.
    `,
    coverImage: '/images/blog/desayuno-vegano.png',
    category: 'nutricion',
    author: 'Equipo Poppy',
    publishedAt: '2023-12-15',
    readingTime: 7,
    tags: ['vegano', 'nutricion', 'desayuno', 'proteina', 'saludable'],
    metaTitle: 'Desayuno Vegano Completo con Granola | Guía Nutricional | Poppy',
    metaDescription:
      'Cómo crear un desayuno vegano nutritivo con granola. Guía de nutrientes esenciales, recetas y consejos para una alimentación vegana equilibrada.',
  },
  {
    id: 'post_conservacion',
    slug: 'como-conservar-granola-frescura-crunch',
    title: 'Cómo Conservar la Granola: Mantén la Frescura y el Crunch',
    excerpt:
      'Aprende los trucos para mantener tu granola crujiente durante más tiempo. Almacenamiento, errores comunes y señales de que ha perdido frescura.',
    content: `
# Cómo Conservar la Granola Perfectamente

No hay nada peor que abrir tu bolsa de granola favorita y encontrarla blanda o rancia. Con estos consejos, mantendrás ese crunch perfecto hasta el último bocado.

## Los enemigos de la granola

### 1. Humedad
El enemigo número uno. La granola absorbe la humedad del ambiente, lo que la vuelve blanda y puede favorecer el crecimiento de moho.

### 2. Aire
La exposición al oxígeno oxida las grasas de los frutos secos, produciendo sabor rancio.

### 3. Luz
La luz directa degrada ciertos nutrientes y puede afectar al sabor.

### 4. Calor
Las temperaturas altas aceleran todos los procesos de deterioro.

## Cómo almacenar correctamente

### Antes de abrir
- Guarda en un lugar fresco y seco
- Evita la luz solar directa
- No cerca de fuentes de calor (horno, radiadores)
- Temperatura ideal: 15-20°C

### Una vez abierta

**Opción 1: En el envase original**
- Expulsa el aire antes de cerrar
- Usa una pinza o clip para sellar
- Consumir en 4-6 semanas

**Opción 2: Recipiente hermético**
- Transfiere a un tarro de cristal con cierre
- O un contenedor de plástico sin BPA
- Asegúrate de que cierra completamente

**Opción 3: Bolsas con cierre zip**
- Buena alternativa si viajas
- Expulsa todo el aire posible
- Doble cierre es mejor

## ¿Se puede congelar?

Sí, la granola se puede congelar:

**Ventajas:**
- Extiende la vida útil hasta 6 meses
- Mantiene el crunch si se hace bien

**Cómo hacerlo:**
1. Divide en porciones individuales
2. Usa bolsas de congelación
3. Elimina todo el aire
4. Etiqueta con la fecha

**Para consumir:**
- Saca la porción que necesites
- Deja a temperatura ambiente 10-15 minutos
- ¡Lista para usar!

## Señales de que tu granola ha pasado a mejor vida

### Textura
- Está blanda o gomosa
- Ha perdido el crunch
- Los clusters se deshacen fácilmente

### Olor
- Huele rancio o "a viejo"
- Olor extraño o desagradable

### Sabor
- Sabor rancio o amargo
- Ha perdido intensidad

### Visual
- Cambio de color
- Presencia de moho (descartar inmediatamente)

## Errores comunes

1. **Meter la cuchara mojada** - Introduce humedad
2. **Dejar la bolsa abierta** - Absorbe humedad del ambiente
3. **Guardar cerca del fregadero** - Zona de alta humedad
4. **Mezclar con ingredientes húmedos y guardar** - Se ablandará

## Truco de rescate

Si tu granola se ha ablandado ligeramente pero no huele rancia:

1. Precalienta el horno a 150°C
2. Extiende la granola en una bandeja
3. Hornea 8-10 minutos vigilando
4. Deja enfriar completamente
5. Guarda en recipiente hermético

**Importante:** Esto solo funciona si la granola no está rancia. Si huele mal, es mejor desecharla.

## Vida útil de nuestra granola

- **Sin abrir:** 6 meses desde fabricación
- **Una vez abierta:** 4-6 semanas (bien almacenada)
- **Congelada:** Hasta 6 meses adicionales

Consulta siempre la fecha de consumo preferente en el envase.
    `,
    coverImage: '/images/blog/conservar-granola.png',
    category: 'estilo-de-vida',
    author: 'Equipo Poppy',
    publishedAt: '2023-12-08',
    readingTime: 5,
    tags: ['conservacion', 'almacenamiento', 'frescura', 'tips', 'cocina'],
    metaTitle: 'Cómo Conservar la Granola: Trucos para Mantener el Crunch | Poppy',
    metaDescription:
      'Guía completa para conservar la granola fresca y crujiente. Almacenamiento correcto, errores comunes y cómo saber si ha perdido frescura.',
  },
  {
    id: 'post_comparativa',
    slug: 'granola-casera-vs-industrial-diferencias',
    title: 'Granola Casera vs Industrial: ¿Cuál es Mejor?',
    excerpt:
      'Analizamos las diferencias reales entre la granola artesanal y la industrial. Ingredientes, proceso, sabor y nutrientes comparados.',
    content: `
# Granola Casera vs Industrial: La Comparativa Definitiva

¿Merece la pena pagar más por una granola artesanal? ¿Es realmente diferente de la que encuentras en el supermercado? Vamos a comparar con datos reales.

## La etiqueta no miente (pero puede confundir)

### Granola industrial típica
Lee la etiqueta de una granola de supermercado y probablemente encuentres:

- Copos de avena (35-40%)
- Azúcar o jarabe de glucosa
- Aceite de girasol o palma
- Frutos secos (5-10%)
- Miel (si la hay, en pequeña cantidad)
- Aromas naturales
- Conservantes

### Granola artesanal Poppy
Nuestra etiqueta:

- Copos de avena sin gluten (38-40%)
- Miel ecológica (10-12%)
- Frutos secos variados (25-30%)
- Aceite de coco virgen extra
- Especias naturales
- Nada más

## Comparativa detallada

| Aspecto | Industrial | Artesanal |
|---------|------------|-----------|
| Azúcares | 20-25g/100g | 12-14g/100g |
| Frutos secos | 5-10% | 25-30% |
| Tipo de grasa | Girasol/palma | Coco virgen |
| Endulzante | Azúcar/jarabe | Miel ecológica |
| Procesado | Extrusión masiva | Horneado en lotes |
| Clusters | Artificiales | Naturales |
| Conservantes | A menudo sí | No |

## El proceso marca la diferencia

### Producción industrial
1. **Mezcla automatizada** de ingredientes
2. **Extrusión** a alta temperatura
3. **Adición de aglutinantes** para crear clusters artificiales
4. **Secado rápido** industrial
5. **Envasado masivo** en atmósfera modificada

### Producción artesanal
1. **Selección manual** de ingredientes
2. **Mezcla en pequeños lotes**
3. **Horneado lento** a baja temperatura
4. **Clusters naturales** por la miel y el horneado
5. **Enfriado lento** para textura perfecta
6. **Envasado en pequeñas cantidades**

## ¿Por qué la diferencia de precio?

Una granola industrial de supermercado cuesta 3-4€/250g.
Una granola artesanal como Poppy cuesta 9€/250g.

¿Dónde está la diferencia?

**Ingredientes:**
- Frutos secos premium vs económicos
- Miel ecológica vs azúcar
- Aceite de coco vs girasol

**Proceso:**
- Horneado lento vs producción masiva
- Lotes pequeños vs toneladas
- Control artesanal vs automatizado

**Cantidades:**
- 25-30% de frutos secos vs 5-10%
- Menos azúcar, más ingredientes de calidad

## El test del sabor

Prueba este experimento:

1. Compra una granola industrial
2. Compra una granola artesanal
3. Pruébalas a ciegas

La diferencia es evidente:
- **Textura:** La artesanal tiene más crunch duradero
- **Sabor:** Notas más complejas y menos dulzor artificial
- **Saciedad:** La artesanal sacia más por su contenido en frutos secos

## ¿Cuándo elegir cada una?

**Industrial puede servir para:**
- Presupuesto muy ajustado
- Uso ocasional
- Cocinar (donde el sabor se diluye)

**Artesanal es mejor para:**
- Consumo diario
- Quienes buscan calidad nutricional
- Personas con restricciones alimentarias
- Quienes aprecian el sabor real

## Nuestra filosofía

No competimos con la granola industrial. Somos otra categoría. Hacemos granola como la harías en casa si tuvieras tiempo, ingredientes premium y el conocimiento de años de perfeccionar la receta.

¿Es más cara? Sí. ¿Merece la pena? Creemos que sí, y nuestros clientes también.
    `,
    coverImage: '/images/blog/granola-casera-vs-industrial.png',
    category: 'estilo-de-vida',
    author: 'Equipo Poppy',
    publishedAt: '2023-12-01',
    readingTime: 6,
    tags: ['comparativa', 'artesanal', 'industrial', 'ingredientes', 'calidad'],
    metaTitle: 'Granola Casera vs Industrial: Diferencias Reales | Poppy',
    metaDescription:
      'Comparativa completa entre granola artesanal e industrial. Analizamos ingredientes, proceso, precio y sabor para que tomes la mejor decisión.',
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
