# Configuración de Apple Pay en Stripe

Este documento explica cómo habilitar Apple Pay en tu tienda Poppy usando Stripe.

## Estado Actual

✅ **Código actualizado**: El código ya está preparado para soportar Apple Pay
✅ **Stripe Checkout**: Configurado para mostrar Apple Pay automáticamente en dispositivos compatibles

## Pasos para Activar Apple Pay

### 1. Verificar el Dominio en Stripe Dashboard

**IMPORTANTE**: Para que Apple Pay funcione en producción, debes verificar tu dominio en Stripe.

#### Pasos:

1. Accede a tu [Dashboard de Stripe](https://dashboard.stripe.com/)
2. Ve a **Settings** (Configuración) → **Payment methods** (Métodos de pago)
3. Busca la sección **Apple Pay** y haz clic en **Configure**
4. En la sección **Domains**, añade tu dominio: `poppy.es`
5. Stripe te pedirá que subas un archivo de verificación a tu servidor
6. Descarga el archivo `apple-developer-merchantid-domain-association`
7. Sube el archivo a tu servidor en la ruta: `https://poppy.es/.well-known/apple-developer-merchantid-domain-association`

### 2. Verificación del Archivo en Vercel

Si usas Vercel (recomendado), sigue estos pasos:

#### Opción A: Usando la carpeta `public/`

1. Crea la estructura de carpetas:
   ```bash
   mkdir -p public/.well-known
   ```

2. Descarga el archivo de verificación de Stripe Dashboard

3. Coloca el archivo en: `public/.well-known/apple-developer-merchantid-domain-association`

4. Vercel automáticamente servirá este archivo en: `https://poppy.es/.well-known/apple-developer-merchantid-domain-association`

#### Opción B: Usando API Route

Ya hemos preparado la estructura, solo necesitas el archivo de Stripe.

### 3. Verificar que Apple Pay está Activo

Una vez verificado el dominio:

1. Abre tu tienda en Safari (en Mac o iPhone)
2. Añade un producto al carrito
3. Ve al checkout
4. Deberías ver el botón de **Apple Pay** junto a las tarjetas de crédito

### 4. Probar Apple Pay

#### En Modo Test:

1. Usa el modo de prueba de Stripe
2. En Safari, verás el botón de Apple Pay incluso sin verificar el dominio
3. Usa una tarjeta de prueba configurada en tu Wallet de iOS

#### En Producción:

1. Asegúrate de haber verificado el dominio
2. El dominio debe usar HTTPS (Vercel lo hace automáticamente)
3. Apple Pay solo funciona en Safari (iOS/macOS) y Chrome (iOS)

## Métodos de Pago Habilitados

Tu Stripe Checkout ahora soporta automáticamente:

- ✅ **Tarjetas de crédito/débito** (Visa, Mastercard, American Express)
- ✅ **Apple Pay** (en dispositivos Apple con Safari)
- ✅ **Google Pay** (en Chrome con Google Pay configurado)
- ✅ **Link** (el sistema de pago rápido de Stripe)
- ✅ **3D Secure** (autenticación automática cuando se requiere)

## Requisitos Técnicos

### Para que Apple Pay funcione, se necesita:

1. ✅ **HTTPS**: Tu dominio debe usar SSL (Vercel lo proporciona automáticamente)
2. ⚠️ **Dominio verificado**: Debes completar el paso 1 de este documento
3. ✅ **Safari/iOS**: El usuario debe estar en Safari o Chrome en iOS
4. ✅ **Wallet configurado**: El usuario debe tener Apple Pay configurado en su dispositivo

## Comprobaciones

### ✅ Código actualizado
- [x] API de Checkout configurada con `payment_method_types: ['card']`
- [x] `payment_method_options` con 3D Secure automático
- [x] Metadata de cupones integrada

### ⚠️ Pendiente en Stripe Dashboard
- [ ] Verificar dominio `poppy.es` en Stripe
- [ ] Subir archivo de verificación de Apple Pay
- [ ] Habilitar Apple Pay en configuración de métodos de pago

## Soporte y Debugging

### Ver métodos de pago disponibles:

En la consola del navegador (Safari/Chrome), puedes verificar:

```javascript
// Verificar si Apple Pay está disponible
if (window.ApplePaySession) {
  console.log('Apple Pay está disponible en este navegador');
  console.log('Versión:', ApplePaySession.supportsVersion(10));
}
```

### Errores comunes:

1. **Apple Pay no aparece**: Verifica que estés en Safari/iOS y que el dominio esté verificado
2. **"Domain not verified"**: Completa el paso 1 de verificación de dominio
3. **No funciona en local**: Apple Pay requiere HTTPS, usa un túnel como ngrok o despliega a producción

## Recursos

- [Documentación de Stripe sobre Apple Pay](https://stripe.com/docs/apple-pay)
- [Guía de verificación de dominio](https://stripe.com/docs/stripe-js/elements/payment-request-button#verifying-your-domain-with-apple-pay)
- [Stripe Dashboard - Payment Methods](https://dashboard.stripe.com/settings/payment_methods)

---

**Última actualización**: 2026-02-06
**Versión**: 1.0.0
