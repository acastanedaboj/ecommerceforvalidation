# Backup y restauración del proyecto

Guía para recuperar este proyecto completo desde cero, incluso sin acceso a la
cuenta de Claude con la que se desarrolló.

**Fecha del backup:** 9 de noviembre de 2026
**Estado:** `main` y `production` al día, árbol de trabajo limpio.

---

## Dónde vive el backup

El proyecto está respaldado en tres sitios independientes entre sí. Ninguno
depende de la cuenta de Claude.

| Copia | Qué contiene | Dónde |
| --- | --- | --- |
| **GitHub** (principal) | Todo: código, imágenes, 336 commits, 24 ramas, PRs e issues | `github.com/acastanedaboj/ecommerceforvalidation` |
| **Tag de respaldo** | Instantánea inmutable del estado de esta fecha | Tag `backup-2026-11-09` en ese mismo repo |
| **Bundle de Git** | Fichero único con todo el historial y todas las ramas | Descarga local (ver abajo) |

La copia que importa es **GitHub**: pertenece a tu cuenta de GitHub, no a la de
Claude. Si pierdes el acceso a Claude, el proyecto sigue intacto ahí.

---

## Restaurar desde GitHub (lo normal)

```bash
git clone https://github.com/acastanedaboj/ecommerceforvalidation
```

Para recuperar exactamente el estado de este backup:

```bash
git checkout backup-2026-11-09
```

---

## Restaurar desde el bundle (sin GitHub)

El fichero `granola-historial-git.bundle` es un repositorio Git completo en un
solo archivo. No necesita red ni servidor:

```bash
git clone granola-historial-git.bundle ecommerceforvalidation
```

Queda un repositorio normal, con todo el historial y todas las ramas. Para
volver a publicarlo en un GitHub nuevo:

```bash
git remote set-url origin https://github.com/TU-USUARIO/TU-REPO
```

```bash
git push -u origin --all
```

---

## Lo que el backup NO incluye

Estas cosas no están en Git y hay que guardarlas aparte. **Sin ellas el código
se restaura pero la tienda no funciona.**

### 1. Claves y secretos (`.env.local`)

El fichero está en `.gitignore`, así que nunca se subió al repositorio. Guarda
sus valores en un gestor de contraseñas. Las variables que el código necesita:

| Variable | Dónde se consigue |
| --- | --- |
| `DATABASE_URL` | Panel de tu proveedor de PostgreSQL |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks |
| `RESEND_API_KEY` | Resend → API Keys (emails transaccionales) |
| `SENDCLOUD_PUBLIC_KEY` | Sendcloud → Settings → Integrations |
| `SENDCLOUD_SECRET_KEY` | Sendcloud → Settings → Integrations |
| `SENDCLOUD_WEBHOOK_SECRET` | Sendcloud → Webhooks |
| `GOOGLE_CLIENT_ID` | Google Cloud Console → Credenciales OAuth |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console → Credenciales OAuth |
| `NEXT_PUBLIC_GA_ID` | Google Analytics |
| `NEXT_PUBLIC_APP_URL` | Tu dominio |

`.env.example` tiene la plantilla completa con los valores por defecto.
Ojo: `RESEND_API_KEY` y `EMAIL_TEST_OVERRIDE` se usan en el código pero aún no
figuran en `.env.example`.

### 2. Datos de producción

La base de datos (pedidos, clientes, suscripciones) vive en tu proveedor de
PostgreSQL, no en Git. Configura ahí copias de seguridad automáticas.

### 3. Servicios externos

Las cuentas de Stripe, Resend, Sendcloud, Vercel y el dominio son tuyas y
sobreviven por su cuenta. Comprueba que no estén asociadas a un email al que
puedas perder acceso.

---

## Volver a levantar el proyecto

```bash
npm install
```

```bash
cp .env.example .env.local
```

Rellena `.env.local` con tus claves y luego:

```bash
npm run db:generate
```

```bash
npm run db:push
```

```bash
npm run db:seed
```

```bash
npm run dev
```

---

## Mantener el backup al día

El backup se mantiene solo mientras hagas push a GitHub. Después de cada tanda
de cambios:

```bash
git push origin main
```

Para marcar un nuevo punto de restauración:

```bash
git tag -a backup-AAAA-MM-DD -m "Backup del proyecto" && git push origin backup-AAAA-MM-DD
```

Y para regenerar el bundle descargable:

```bash
git bundle create granola-historial-git.bundle --all
```
