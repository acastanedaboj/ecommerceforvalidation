/**
 * Landing Pages Content - Poppy Granola
 *
 * Contenido estructurado para las landing pages SEO
 */

// ==========================================
// /granola-sin-gluten
// ==========================================

export const sinGlutenContent = {
  hero: {
    title: 'Granola Sin Gluten',
    highlight: 'Apta para Celíacos',
    subtitle:
      'Elaborada con avena certificada sin gluten y un proceso de producción controlado. Disfruta de un desayuno seguro y delicioso.',
    ctaText: 'Ver productos',
    ctaHref: '/tienda',
    secondaryCta: {
      text: 'Más información',
      href: '#beneficios',
    },
    badges: ['Apta celíacos', 'Envío gratis +4 uds'],
    image: '/images/hero-sin-gluten.jpeg',
  },
  benefits: {
    title: 'Por qué nuestra granola es apta para celíacos',
    subtitle: 'Compromiso con tu seguridad',
    items: [
      {
        title: 'Avena sin gluten',
        description:
          'Utilizamos avena certificada sin gluten, cultivada y procesada para evitar contaminación cruzada.',
      },
      {
        title: 'Proceso controlado',
        description:
          'Elaboramos nuestra granola en instalaciones donde controlamos todos los ingredientes y procesos.',
      },
      {
        title: 'Ingredientes seleccionados',
        description:
          'Cada ingrediente es cuidadosamente seleccionado para garantizar que sea apto para dietas sin gluten.',
      },
      {
        title: 'Información clara',
        description:
          'Etiquetado transparente con toda la información de alérgenos para que compres con confianza.',
      },
    ],
  },
  products: {
    title: 'Nuestras granolas sin gluten',
    subtitle: 'Todos los sabores',
    description: 'Los 4 sabores de Poppy son aptos para celíacos. Elige tu favorito o pruébalos todos.',
  },
  faqs: [
    {
      question: '¿Puedo consumir esta granola si soy celíaco?',
      answer:
        'Sí. Nuestra granola está elaborada con avena certificada sin gluten y seguimos un proceso de producción controlado. Todos nuestros productos son aptos para personas con celiaquía.',
    },
    {
      question: '¿Qué tipo de avena utilizan?',
      answer:
        'Utilizamos avena certificada sin gluten. Esta avena se cultiva en campos dedicados y se procesa en instalaciones que evitan la contaminación cruzada con cereales que contienen gluten.',
    },
    {
      question: '¿Cómo es el proceso de elaboración?',
      answer:
        'Elaboramos nuestra granola en pequeños lotes, controlando cada paso del proceso. Seleccionamos cuidadosamente todos los ingredientes para asegurar que sean aptos para dietas sin gluten.',
    },
    {
      question: '¿Contiene trazas de otros alérgenos?',
      answer:
        'Nuestra granola contiene frutos secos (almendras, avellanas, nueces pecanas, anacardos según la variedad). Consulta la información de cada producto para conocer los alérgenos específicos.',
    },
    {
      question: '¿Tienen alguna certificación oficial?',
      answer:
        'Elaboramos nuestra granola cumpliendo los criterios para productos aptos para celíacos, utilizando avena certificada sin gluten y un proceso de producción controlado.',
    },
  ],
  cta: {
    title: '¿Lista para probar una granola sin gluten de verdad?',
    description:
      'Únete a cientos de celíacos que han descubierto que pueden disfrutar de un desayuno delicioso y seguro.',
    ctaText: 'Comprar ahora',
    ctaHref: '/tienda',
    secondaryCta: {
      text: 'Más sobre celíacos',
      href: '/granola-para-celiacos',
    },
  },
};

// ==========================================
// /granola-vegana
// ==========================================

export const veganaContent = {
  hero: {
    title: 'Granola 100% Vegana',
    highlight: 'Sin Miel ni Productos Animales',
    subtitle:
      'Endulzada naturalmente con dátiles Medjool y sirope de agave ecológico. Todo el sabor, 0% productos de origen animal.',
    ctaText: 'Comprar ahora',
    ctaHref: '/tienda/granola-datiles-250g',
    badges: ['100% Vegana', 'Sin gluten', 'Ecológica'],
    image: '/products/granola-datiles.jpg',
  },
  benefits: {
    title: 'Alternativas naturales a la miel',
    subtitle: 'Dulzura vegetal',
    items: [
      {
        title: 'Dátiles Medjool',
        description:
          'Dulzura natural con alto contenido en fibra, potasio y antioxidantes. El "caramelo de la naturaleza".',
      },
      {
        title: 'Sirope de agave',
        description:
          'Bajo índice glucémico y sabor suave. Una alternativa ecológica y sostenible a la miel.',
      },
      {
        title: 'Sin compromisos',
        description:
          'Mismo sabor delicioso y textura crujiente que nuestras otras granolas, pero 100% plant-based.',
      },
      {
        title: 'Ética y sostenibilidad',
        description:
          'Respeto por los animales y el medio ambiente sin renunciar a un desayuno nutritivo y sabroso.',
      },
    ],
  },
  products: {
    title: 'Nuestra granola vegana',
    subtitle: 'Granola de Dátiles',
    description:
      'La Granola de Dátiles es nuestra única variedad 100% vegana. Endulzada con dátiles Medjool y sirope de agave, sin miel ni ningún producto de origen animal.',
    highlightProductId: 'prod_granola_datiles',
  },
  comparison: {
    title: 'Transparencia total',
    description:
      'Queremos que sepas exactamente qué contiene cada producto. Nuestras otras granolas (Clásica, Chocolate y Naranja) contienen miel ecológica de apicultores locales.',
  },
  faqs: [
    {
      question: '¿Las otras granolas de Poppy son veganas?',
      answer:
        'No. Nuestras granolas Clásica, Chocolate y Naranja contienen miel ecológica de apicultores locales. Solo la Granola de Dátiles es 100% vegana.',
    },
    {
      question: '¿Por qué usáis miel en las otras variedades?',
      answer:
        'La miel ecológica de apicultores locales de Málaga aporta un sabor único y beneficios nutricionales. Sin embargo, entendemos que muchas personas prefieren opciones veganas, por eso creamos la Granola de Dátiles.',
    },
    {
      question: '¿Qué beneficios tienen los dátiles y el sirope de agave?',
      answer:
        'Los dátiles Medjool son ricos en fibra, potasio y antioxidantes. El sirope de agave tiene un índice glucémico más bajo que el azúcar. Juntos, proporcionan dulzura natural sin productos animales.',
    },
    {
      question: '¿La granola vegana también es sin gluten?',
      answer:
        'Sí. Todas nuestras granolas, incluida la vegana, están elaboradas con avena certificada sin gluten y son aptas para celíacos.',
    },
    {
      question: '¿Es apta para dietas plant-based estrictas?',
      answer:
        'Sí. La Granola de Dátiles no contiene ningún ingrediente de origen animal. Es apta para veganos, vegetarianos y cualquier persona que siga una dieta plant-based.',
    },
  ],
  cta: {
    title: '¿Buscas una granola 100% vegana?',
    description:
      'Prueba nuestra Granola de Dátiles: todo el sabor artesanal de Poppy, sin ningún producto de origen animal.',
    ctaText: 'Comprar Granola de Dátiles',
    ctaHref: '/tienda/granola-datiles-250g',
    secondaryCta: {
      text: 'Ver todas las granolas',
      href: '/tienda',
    },
  },
};

// ==========================================
// /granola-artesanal
// ==========================================

export const artesanalContent = {
  hero: {
    title: 'Granola Artesanal',
    highlight: 'Premium de Málaga',
    subtitle:
      'Elaborada a mano en pequeños lotes con ingredientes locales de Málaga. Tostada lentamente para conseguir el crujiente perfecto.',
    ctaText: 'Descubrir sabores',
    ctaHref: '/tienda',
    secondaryCta: {
      text: 'Nuestra historia',
      href: '/nosotros',
    },
    badges: ['Hecha a mano', 'Ingredientes locales', 'Pequeños lotes'],
    image: '/images/hero-artesanal.jpeg',
  },
  benefits: {
    title: 'Qué significa "artesanal" para nosotros',
    subtitle: 'Calidad sin compromisos',
    items: [
      {
        title: 'Pequeños lotes',
        description:
          'Cada lote es de menos de 50kg, permitiéndonos controlar cada detalle y garantizar la máxima frescura.',
      },
      {
        title: 'Ingredientes premium',
        description:
          'Miel ecológica de apicultores de Málaga, frutos secos de primera calidad y avena certificada sin gluten.',
      },
      {
        title: 'Sin aditivos',
        description:
          'Solo ingredientes que reconocerías en tu cocina. Sin conservantes, colorantes ni saborizantes artificiales.',
      },
      {
        title: 'Tostado lento',
        description:
          'Horneamos a baja temperatura durante más tiempo para conseguir ese crujiente perfecto que dura hasta el último bocado.',
      },
    ],
  },
  ingredients: {
    title: 'Ingredientes de Málaga',
    subtitle: 'Origen local',
    items: [
      {
        title: 'Miel ecológica',
        description: 'De apicultores locales de la provincia de Málaga. Cruda y sin procesar.',
      },
      {
        title: 'Frutos secos premium',
        description: 'Almendras, avellanas, nueces pecanas y anacardos seleccionados a mano.',
      },
      {
        title: 'Avena sin gluten',
        description: 'Certificada, remojada para mejor digestibilidad.',
      },
      {
        title: 'Aceite de oliva virgen extra',
        description: 'De productores andaluces, para un tostado perfecto.',
      },
    ],
  },
  products: {
    title: '4 sabores únicos',
    subtitle: 'Nuestras granolas',
    description:
      'Cada sabor tiene su propia personalidad, pero todos comparten lo mismo: ingredientes premium y elaboración artesanal.',
  },
  faqs: [
    {
      question: '¿Qué diferencia hay entre granola artesanal e industrial?',
      answer:
        'La granola industrial se produce en grandes cantidades con ingredientes estandarizados y procesos automatizados. Nuestra granola artesanal se elabora en pequeños lotes, con ingredientes locales premium y atención manual a cada detalle.',
    },
    {
      question: '¿Por qué es más cara que la granola del supermercado?',
      answer:
        'Utilizamos ingredientes de primera calidad (miel ecológica, frutos secos premium, avena certificada) y un proceso de elaboración manual que requiere más tiempo y atención. El resultado es un producto con un sabor y textura incomparables.',
    },
    {
      question: '¿Cuánto dura fresca la granola?',
      answer:
        'Gracias a nuestro proceso de tostado lento y al envasado hermético, la granola mantiene su frescura y crujiente durante 6 meses. Una vez abierta, recomendamos consumirla en 4-6 semanas.',
    },
    {
      question: '¿Hacéis envíos a toda España?',
      answer:
        'Sí, enviamos a toda la península. Envío gratis a partir de 4 bolsas o 35€. Los pedidos se preparan y envían en 24-48h laborables.',
    },
    {
      question: '¿Puedo visitar vuestro obrador?',
      answer:
        'Nuestro obrador está en Málaga. Aunque no tenemos un horario de visitas establecido, puedes contactarnos en hola@poppy.es si quieres conocernos.',
    },
  ],
  cta: {
    title: 'Prueba la diferencia de lo artesanal',
    description:
      'Una vez pruebes granola de verdad, no querrás volver a la del supermercado.',
    ctaText: 'Comprar ahora',
    ctaHref: '/tienda',
    secondaryCta: {
      text: 'Conocer nuestra historia',
      href: '/nosotros',
    },
  },
};

// ==========================================
// /granola-para-celiacos
// ==========================================

export const celiacosContent = {
  hero: {
    title: 'Granola Apta',
    highlight: 'para Celíacos',
    subtitle:
      'Sabemos lo difícil que es encontrar productos seguros. Nuestra granola está elaborada pensando en ti: avena certificada sin gluten y proceso controlado.',
    ctaText: 'Ver opciones seguras',
    ctaHref: '/tienda',
    badges: ['Apta celíacos', 'Avena sin gluten', '4 sabores'],
    image: '/images/hero-celiacos.jpeg',
  },
  intro: {
    title: 'Entendemos la celiaquía',
    description:
      'Sabemos que para las personas con celiaquía, encontrar productos de desayuno seguros y sabrosos puede ser un desafío. Por eso hemos creado una granola que puedes disfrutar con total tranquilidad.',
  },
  commitment: {
    title: 'Nuestro compromiso con tu seguridad',
    subtitle: 'Productos de confianza',
    items: [
      {
        title: 'Avena certificada sin gluten',
        description:
          'Utilizamos exclusivamente avena cultivada y procesada para evitar contaminación con cereales que contienen gluten.',
      },
      {
        title: 'Proceso controlado',
        description:
          'Elaboramos en instalaciones donde controlamos todos los ingredientes. No utilizamos trigo, cebada ni centeno.',
      },
      {
        title: 'Ingredientes seguros',
        description:
          'Cada ingrediente es verificado para asegurar que sea apto para dietas sin gluten antes de entrar en nuestra producción.',
      },
      {
        title: 'Etiquetado transparente',
        description:
          'Información clara de todos los alérgenos en cada producto. Sin sorpresas, sin letra pequeña.',
      },
    ],
  },
  products: {
    title: 'Todos nuestros sabores son aptos para celíacos',
    subtitle: '4 opciones para ti',
    description:
      'No tienes que elegir "la única opción sin gluten". Los 4 sabores de Poppy son seguros para personas con celiaquía.',
  },
  faqs: [
    {
      question: '¿Por qué es apta para celíacos?',
      answer:
        'Utilizamos avena certificada sin gluten y elaboramos en un entorno controlado. No utilizamos trigo, cebada ni centeno en ninguno de nuestros productos.',
    },
    {
      question: '¿Qué tipo de avena utilizan exactamente?',
      answer:
        'Usamos avena certificada sin gluten. Esta avena se cultiva en campos dedicados, lejos de otros cereales, y se procesa en instalaciones especializadas para evitar cualquier contaminación cruzada.',
    },
    {
      question: '¿Cómo controlan la contaminación cruzada?',
      answer:
        'Elaboramos nuestra granola en instalaciones donde controlamos todos los ingredientes. Verificamos cada materia prima antes de usarla y seguimos protocolos estrictos de limpieza.',
    },
    {
      question: '¿Puedo consumirla si soy muy sensible al gluten?',
      answer:
        'Nuestra granola está elaborada con avena certificada sin gluten y un proceso controlado. Sin embargo, si eres extremadamente sensible, te recomendamos consultar con tu médico antes de probar cualquier producto nuevo.',
    },
    {
      question: '¿Qué otros alérgenos contiene?',
      answer:
        'Todas nuestras granolas contienen frutos secos (almendras, avellanas, nueces pecanas, anacardos según la variedad). Consulta la información específica de cada producto.',
    },
    {
      question: '¿Tienen versión sin frutos secos?',
      answer:
        'Actualmente todas nuestras granolas contienen frutos secos, que son parte fundamental de nuestra receta. Estamos valorando opciones para el futuro.',
    },
  ],
  resources: {
    title: 'Recursos útiles',
    items: [
      {
        title: 'FACE',
        description: 'Federación de Asociaciones de Celíacos de España',
        url: 'https://celiacos.org',
      },
      {
        title: 'Vivir sin gluten',
        description: 'Consejos y recetas en nuestro blog',
        url: '/blog',
      },
    ],
  },
  cta: {
    title: 'Disfruta del desayuno otra vez',
    description:
      'Únete a cientos de celíacos que han descubierto que pueden tener un desayuno delicioso y seguro.',
    ctaText: 'Comprar granola apta celíacos',
    ctaHref: '/tienda',
    secondaryCta: {
      text: 'Más sobre sin gluten',
      href: '/granola-sin-gluten',
    },
  },
};
