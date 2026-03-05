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

**Nota importante:** Aunque utilizamos avena certificada, nuestra granola se produce en instalaciones que también manejan productos con gluten. Implementamos estrictos protocolos de limpieza y control, pero si tienes enfermedad celíaca severa, te recomendamos consultar con tu médico antes de consumir.`,
    category: 'producto',
    order: 1,
  },
  {
    id: 'faq_honey',
    question: '¿Por qué usáis miel si es "sin azúcares añadidos"?',
    answer: `Queremos ser totalmente transparentes: **nuestra granola NO es "sin azúcares añadidos"** porque utilizamos miel ecológica como endulzante natural.

La miel es un azúcar natural que aporta dulzor y ayuda a tostar los ingredientes. Elegimos miel ecológica de apicultores locales porque:

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
    answer: `**Sí, nuestra Granola de Dátiles es 100% vegana**, ya que no contiene miel ni ningún ingrediente de origen animal.

La mayoría de nuestras granolas contienen miel ecológica como endulzante natural. Elegimos miel porque:

- Es el endulzante que mejor resultado da en textura y sabor
- Proviene de apicultores locales con prácticas éticas
- Aporta propiedades beneficiosas adicionales

**Para veganos:** Nuestra Granola de Dátiles utiliza dátiles Medjool como endulzante natural, ofreciendo una dulzura intensa sin necesidad de miel. Está claramente etiquetada como "Sin miel (vegana)" en nuestra tienda.`,
    category: 'producto',
    order: 3,
  },
  {
    id: 'faq_allergens',
    question: '¿Qué alérgenos contiene la granola?',
    answer: `Nuestra granola contiene los siguientes **alérgenos declarados**:

**Frutos de cáscara:**
- Almendras
- Avellanas
- Anacardos

**Otros alérgenos (trazas posibles):**
Aunque no son ingredientes directos, nuestra granola se produce en instalaciones que también procesan:
- Gluten (trigo, cebada, centeno)
- Soja
- Sésamo

**Recomendación:** Si tienes alergias alimentarias severas, revisa siempre el etiquetado y consulta con tu alergólogo. Puedes contactarnos para más información sobre nuestros procesos de producción.`,
    category: 'producto',
    order: 4,
  },
  {
    id: 'faq_conservation',
    question: '¿Cómo debo conservar la granola?',
    answer: `Para mantener la frescura y el crujiente de tu granola:

**Antes de abrir:**
- Conservar en lugar fresco y seco
- Evitar la luz solar directa
- Consumir preferentemente antes de la fecha indicada en el envase

**Una vez abierta:**
- Cerrar bien el envase después de cada uso
- Consumir en un plazo de 4-6 semanas
- Si vives en un clima húmedo, puedes transferirla a un recipiente hermético

**Fecha de caducidad:** Nuestras granolas tienen una vida útil de 6 meses desde la fecha de fabricación.`,
    category: 'producto',
    order: 5,
  },

  // ENVÍO
  {
    id: 'faq_shipping_cost',
    question: '¿Cuánto cuesta el envío?',
    answer: `**Envío estándar a Península:** 4,95€

**Envío GRATIS cuando:**
- Compras 4 o más bolsas
- Tu pedido supera los 35€
- Tienes una suscripción activa

**Plazos de entrega:**
- Península: 2-4 días laborables
- Baleares: 4-6 días laborables
- Canarias: 5-8 días laborables (pueden aplicar tasas de importación)

Actualmente solo realizamos envíos a España. Si estás interesado en envíos internacionales, contáctanos.`,
    category: 'envio',
    order: 1,
  },
  {
    id: 'faq_shipping_tracking',
    question: '¿Puedo hacer seguimiento de mi pedido?',
    answer: `¡Por supuesto! Una vez que tu pedido sea enviado:

1. Recibirás un email con el número de seguimiento
2. Podrás rastrear tu paquete desde tu cuenta o directamente en la web de la empresa de transporte
3. Te enviaremos notificaciones cuando el pedido esté en reparto

Si no has recibido la información de seguimiento en 48 horas laborables después de hacer tu pedido, escríbenos a hola@poppy.es`,
    category: 'envio',
    order: 2,
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
    question: '¿Qué métodos de pago aceptáis?',
    answer: `Aceptamos los siguientes métodos de pago:

**Tarjeta de crédito/débito:**
- Visa
- Mastercard
- American Express

**Otros métodos:**
- Pago contra reembolso (gastos adicionales de 2€)

Todos los pagos con tarjeta se procesan de forma segura a través de **Stripe**, cumpliendo con los estándares PCI-DSS de seguridad.

Tus datos de pago nunca se almacenan en nuestros servidores.`,
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

  // SUSCRIPCIÓN
  {
    id: 'faq_subscription_works',
    question: '¿Cómo funciona la suscripción?',
    answer: `Nuestra suscripción es la forma más económica de disfrutar de granola Poppy cada mes:

**Qué incluye:**
- Pack de 6 bolsas cada mes
- **15% de descuento** sobre el precio unitario (7,65€/bolsa vs 9€)
- Envío GRATIS siempre
- Renovación automática mensual

**Cómo funciona:**
1. Te suscribes seleccionando la opción de suscripción
2. Cada mes procesamos tu pedido automáticamente
3. Recibes tu granola sin preocuparte de nada

**Flexibilidad total:**
- Puedes pausar o cancelar cuando quieras
- Sin permanencia ni penalizaciones
- Gestiona todo desde tu cuenta`,
    category: 'suscripcion',
    order: 1,
  },
  {
    id: 'faq_subscription_cancel',
    question: '¿Cómo cancelo mi suscripción?',
    answer: `Cancelar tu suscripción es muy sencillo:

**Desde tu cuenta:**
1. Inicia sesión en tu cuenta
2. Ve a "Mis suscripciones"
3. Haz clic en "Cancelar suscripción"
4. Confirma la cancelación

**Por email:**
También puedes escribirnos a hola@poppy.es solicitando la cancelación.

**Importante:**
- La cancelación se hará efectiva al final del período actual ya pagado
- Recibirás tu último envío correspondiente al período pagado
- No hay penalizaciones ni cargos adicionales
- Puedes reactivar tu suscripción cuando quieras`,
    category: 'suscripcion',
    order: 2,
  },
  {
    id: 'faq_subscription_pause',
    question: '¿Puedo pausar mi suscripción temporalmente?',
    answer: `¡Sí! Entendemos que a veces necesitas un descanso:

**Cómo pausar:**
1. Accede a tu cuenta
2. Ve a "Mis suscripciones"
3. Selecciona "Pausar suscripción"
4. Elige la duración de la pausa (1-3 meses)

**Qué pasa cuando pausas:**
- No se procesarán pagos durante la pausa
- No recibirás envíos hasta que reactives
- Tu descuento de suscriptor se mantiene

**Reactivación:**
Tu suscripción se reactivará automáticamente cuando termine el período de pausa, o puedes reactivarla manualmente antes desde tu cuenta.`,
    category: 'suscripcion',
    order: 3,
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
- **Ingredientes ecológicos:** La miel, aceite de coco y parte de los ingredientes cuentan con certificación ecológica
- **Registro sanitario:** Cumplimos con toda la normativa sanitaria española y europea para producción alimentaria

**Control de calidad:**
- Análisis periódicos de gluten (≤20 ppm)
- Trazabilidad completa de ingredientes
- Producción en instalaciones registradas

Puedes solicitar información adicional sobre nuestras certificaciones escribiéndonos a hola@poppy.es`,
    category: 'legal',
    order: 2,
  },
];

export function getFAQsByCategory(category: FAQ['category']): FAQ[] {
  return faqs
    .filter((faq) => faq.category === category)
    .sort((a, b) => a.order - b.order);
}

export function getAllFAQs(): FAQ[] {
  return faqs.sort((a, b) => a.order - b.order);
}

export const faqCategories = [
  { id: 'producto', name: 'Producto', icon: 'Package' },
  { id: 'envio', name: 'Envíos y Devoluciones', icon: 'Truck' },
  { id: 'pago', name: 'Pagos y Facturas', icon: 'CreditCard' },
  { id: 'suscripcion', name: 'Suscripción', icon: 'RefreshCw' },
  { id: 'legal', name: 'Legal y Privacidad', icon: 'Shield' },
];
