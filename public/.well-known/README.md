# Apple Pay Domain Verification

Esta carpeta contiene el archivo de verificación de dominio para Apple Pay.

## Instrucciones

1. Ve a [Stripe Dashboard → Settings → Payment Methods](https://dashboard.stripe.com/settings/payment_methods)
2. Busca **Apple Pay** y haz clic en **Configure**
3. En la sección **Domains**, añade tu dominio: `poppy.es`
4. Descarga el archivo de verificación: `apple-developer-merchantid-domain-association`
5. **Coloca el archivo descargado en esta carpeta** (public/.well-known/)
6. Haz commit y push del archivo
7. Despliega a Vercel
8. El archivo estará disponible en: `https://poppy.es/.well-known/apple-developer-merchantid-domain-association`

## Importante

- ⚠️ **NO edites** el contenido del archivo de verificación
- ⚠️ El archivo **NO debe tener extensión** (ni .txt ni .json)
- ✅ El nombre correcto es: `apple-developer-merchantid-domain-association`
- ✅ Debe estar en la carpeta `public/.well-known/`

## Verificación

Una vez subido el archivo, Stripe lo verificará automáticamente. Puedes comprobar que funciona visitando:

```
https://poppy.es/.well-known/apple-developer-merchantid-domain-association
```

Deberías ver el contenido del archivo de verificación.
