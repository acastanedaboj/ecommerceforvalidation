/**
 * FAQ Data - Poppy
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'producto' | 'envio' | 'pago' | 'suscripcion' | 'legal';
  order: number;
}

export const faqs: FAQ[] = [
  // PRODUCTO
  {
    id: 'faq_gluten_free',
    question: '¿Vuestra granola es realmente sin gluten?',
    answer: `Sí, nuestra granola está elaborada con **avena certificada sin gluten**. Esto significa que la avena proviene de cultivos dedicados y ha sido procesada en instalaciones controladas para evitar contaminación cruzada.

Nuestro producto cumple con el estándar europeo de ≤20 ppm (partes por millón) de gluten, que es el umbral establecido para que un producto pueda etiquetarse como "sin gluten".

Además, elaboramos en un **obrador dedicado** en Málaga donde no entra ni se manipula trigo, cebada, centeno ni ningún cereal con gluten. Esto elimina el riesgo de contaminación cruzada durante la producción.

Todas nuestras granolas son también **sin lactosa**: no utilizamos ningún derivado lácteo en la elaboración.`,
    category: 'producto',
    order: 1,
  },
  {
    id: 'faq_honey',
    question: '¿Por qué usáis miel si es "sin azúcares añadidos"?',
    answer: `Queremos ser totalmente transparentes: **nuestra granola NO es "sin azúcares añadidos"** porque utilizamos miel como endulzante natural.

La miel es un azúcar natural que aporta dulzor y ayuda a tostar los ingredientes. Elegimos miel de apicultores locales porque:

- Tiene un índice glucémico más bajo que el azúcar refinado
- Aporta antioxidantes y nutrientes
- Es un ingrediente mínimamente procesado
- Apoya la apicultura local y sostenible

Si buscas una opción sin ningún tipo de azúcar añadido, nuestra granola no es la adecuada para ti. Somos honestos: preferimos ingredientes reales a edulcorantes artificiales.`,
    category: 'producto',
    order: 2,
  },
  {
    id: 'faq_vegan',
    question: '¿Tenéis opciones veganas?',
    answer: `**Sí, nuestra Granola Vegana es 100% vegana**, ya que no contiene miel ni ningún ingrediente de origen animal.

La mayoría de nuestras granolas contienen miel como endulzante natural. Elegimos miel porque:

- Es el endulzante que mejor resultado da en textura y sabor
- Proviene de apicultores locales con prácticas éticas
- Aporta propiedades beneficiosas adicionales

**Para veganos:** Nuestra Granola Vegana utiliza sirope de agave ecológico como endulzante natural, ofreciendo una dulzura suave sin necesidad de miel. Está claramente etiquetada como "Sin miel (vegana)" en nuestra tienda.`,
    category: 'producto',
    order: 3,
  },
  {
    id: 'faq_lactose_free',
    question: '¿Vuestra granola es sin lactosa?',
    answer: `**Sí, todas nuestras granolas son 100% sin lactosa.** Ninguno de nuestros sabores contiene leche, derivados lácteos ni trazas de lactosa.

Nuestros ingredientes son exclusivamente de origen vegetal (avena, frutos secos, semillas, aceite de coco) y miel o sirope de agave como endulzante. No utilizamos mantequilla, leche en polvo ni ningún otro producto lácteo en nuestra elaboración.

Además, nuestro obrador dedicado en Málaga no procesa ningún producto con lactosa, lo que elimina cualquier riesgo de contaminación cruzada.

**Resumen:** sin gluten, sin lactosa, sin conservantes.`,
    category: 'producto',
    order: 4,
  },
  {
    id: 'faq_allergens',
    question: '¿Qué alérgenos contiene la granola?',
    answer: `Nuestra granola contiene los siguientes **alérgenos declarados**:

**Frutos de cáscara:**
- Almendras
- Avellanas
- Anacardos

**Posibles trazas:**
Aunque no son ingredientes directos, algunos de nuestros proveedores de frutos secos y semillas también procesan:
- Soja
- Sésamo

Nuestro obrador es un espacio dedicado donde no entra gluten (trigo, cebada, centeno).

**Recomendación:** Si tienes alergias alimentarias severas, revisa siempre el etiquetado y consulta con tu alergólogo. Puedes contactarnos para más información sobre nuestros procesos de producción.`,
    category: 'producto',
    order: 4,
  },
  {
    id: 'faq_conservation',
    question: '¿Cómo debo conservar la granola?',
    answer: `Tostamos granola cada semana bajo demanda en lotes pequeños, nunca la almacenamos. Eso significa que recibirás tu granola solo unas horas o días tras su elaboración.

Nuestras granolas se envían en un packaging de papel sostenible y 100% reciclable. Te recomendamos que cuando lleguen a casa las vuelques en un tarro de cristal para conservarla mejor.

**Antes de abrir:**
- Conservar en lugar fresco y seco
- Evitar la luz solar directa
- Consumir preferentemente antes de la fecha indicada en el envase

**Una vez abierta:**
- Vuelca la granola en un tarro de cristal hermético
- Consumir en un plazo de 4-6 semanas
- Si vives en un clima húmedo, asegúrate de cerrar bien el tarro

**Fecha de caducidad:** Nuestras granolas tienen una vida útil de 6 meses desde la fecha de fabricación.`,
    category: 'producto',
    order: 5,
  },

  // ENVÍO
  {
    id: 'faq_shipping_cost',
    question: '¿Hacéis envíos?',
    answer: `Ahora mismo elaboramos **bajo demanda** en pequeños lotes y **entregamos en mano en Málaga**, sin envíos por mensajería.

Reserva tu granola desde la tienda: te confirmamos cuándo estará listo el próximo lote y concertamos la entrega. La entrega en mano no tiene coste.`,
    category: 'envio',
    order: 1,
  },
  {
    id: 'faq_shipping_tracking',
    question: '¿Cuándo estará lista mi reserva?',
    answer: `Elaboramos en lotes pequeños cada semana. Cuando reservas, te escribimos por email para confirmar en qué lote entra tu granola y concretar el **día y la hora de la entrega en mano en Málaga**.

Si tienes cualquier duda, escríbenos a hola@poppy.es`,
    category: 'envio',
    order: 2,
  },
  {
    id: 'faq_local_delivery',
    question: '¿Cómo reservo mi granola?',
    answer: `Es muy sencillo, y es nuestra forma de entrega ahora mismo:

**¿Cómo funciona?**
1. Elige tu granola en la tienda
2. Pulsa "Reservar" y déjanos tu nombre, email y teléfono
3. Te contactamos para confirmar el próximo lote y concertar día y hora
4. Te la entregamos **en mano en Málaga**, recién hecha

Sin coste de entrega y sin compromiso.`,
    category: 'envio',
    order: 3,
  },
  {
    id: 'faq_returns',
    question: '¿Puedo devolver mi pedido?',
    answer: `**Política de devoluciones:**

Al ser un producto alimentario, solo aceptamos devoluciones en los siguientes casos:

- **Producto defectuoso:** Si la granola llega en mal estado, te enviamos una nueva sin coste
- **Error en el pedido:** Si recibes un producto diferente al que pediste
- **Derecho de desistimiento:** Tienes 14 días para cancelar si el producto no ha sido abierto y está en perfectas condiciones

**Cómo proceder:**
1. Contacta con nosotros en un plazo de 14 días desde la recepción
2. Explícanos el motivo de la devolución
3. Te indicaremos los pasos a seguir

Los gastos de envío de devolución corren por cuenta del cliente, excepto en caso de producto defectuoso o error nuestro.`,
    category: 'envio',
    order: 3,
  },

  // PAGO
  {
    id: 'faq_payment_methods',
    question: '¿Cómo se paga?',
    answer: `Como trabajamos con reserva y **entrega en mano en Málaga**, el pago se hace **en el momento de la entrega**.

Cuando concertamos el día y la hora, acordamos también la forma de pago que mejor te venga. Sin pagos online ni datos de tarjeta.`,
    category: 'pago',
    order: 1,
  },
  {
    id: 'faq_invoice',
    question: '¿Puedo solicitar factura?',
    answer: `Sí, todas las compras incluyen factura simplificada que recibirás por email.

**Si necesitas factura completa con datos fiscales:**
1. Indica tus datos de facturación durante el checkout (razón social, NIF/CIF, dirección fiscal)
2. O solicítala enviando un email a hola@poppy.es con tu número de pedido

**IVA:** Todos nuestros precios incluyen el 10% de IVA (tipo reducido aplicable a productos alimenticios en España).

Para compras B2B con volumen, ofrecemos condiciones especiales. Consulta nuestra página de mayoristas.`,
    category: 'pago',
    order: 2,
  },

  // LEGAL
  {
    id: 'faq_data_privacy',
    question: '¿Cómo tratáis mis datos personales?',
    answer: `Nos tomamos muy en serio la protección de tus datos:

**Qué datos recogemos:**
- Datos de contacto (nombre, email, teléfono)
- Dirección de envío
- Historial de pedidos

**Para qué los usamos:**
- Procesar y enviar tus pedidos
- Gestionar tu cuenta y suscripciones
- Enviarte comunicaciones sobre tus pedidos
- Con tu consentimiento, enviarte ofertas y novedades

**Tus derechos:**
- Acceso, rectificación y eliminación de tus datos
- Darte de baja de comunicaciones comerciales en cualquier momento
- Exportar tus datos

Consulta nuestra Política de Privacidad completa para más detalles. Cumplimos con el RGPD y la LOPDGDD.`,
    category: 'legal',
    order: 1,
  },
  {
    id: 'faq_certifications',
    question: '¿Tenéis certificaciones de calidad?',
    answer: `**Certificaciones y garantías:**

- **Avena sin gluten certificada:** Nuestra avena proviene de proveedores con certificación de cultivo y procesado sin gluten
- **Ingredientes de calidad:** La miel de apicultores locales, aceite de coco y frutos secos premium
- **Registro sanitario:** Cumplimos con toda la normativa sanitaria española y europea para producción alimentaria

**Control de calidad:**
- Análisis periódicos de gluten (≤20 ppm)
- Trazabilidad completa de ingredientes
- Obrador dedicado sin gluten, registrado

Puedes solicitar información adicional sobre nuestras certificaciones escribiéndonos a hola@poppy.es`,
    category: 'legal',
    order: 2,
  },
];

export function getFAQsByCategory(category: FAQ['category']): FAQ[] {
  return faqs.filter((faq) => faq.category === category).sort((a, b) => a.order - b.order);
}

export function getAllFAQs(): FAQ[] {
  return faqs.sort((a, b) => a.order - b.order);
}

export const faqCategories = [
  { id: 'producto', name: 'Producto', icon: 'Package' },
  { id: 'envio', name: 'Reserva y entrega', icon: 'Truck' },
  { id: 'pago', name: 'Pagos y facturas', icon: 'CreditCard' },
  { id: 'legal', name: 'Legal y privacidad', icon: 'Shield' },
];
