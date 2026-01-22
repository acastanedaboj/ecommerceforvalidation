# CLAUDE.md - AI Assistant Guide for Granola Artesanal E-Commerce

This document provides comprehensive guidance for AI assistants working on this e-commerce codebase.

## Project Overview

**Repository:** ecommerceforvalidation (Granola Artesanal E-Commerce)
**Purpose:** Full-featured e-commerce platform for artisanal granola products
**Status:** Production-ready MVP
**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, PostgreSQL, Prisma, Stripe

## Project Structure

```
ecommerceforvalidation/
├── CLAUDE.md                    # AI assistant guidance (this file)
├── README.md                    # Project documentation
├── ACCEPTANCE_CRITERIA.md       # Testing acceptance criteria
├── package.json                 # Dependencies and scripts
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── .env.example                 # Environment variables template
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Database seeding script
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── api/                 # API routes
│   │   │   ├── checkout/        # Stripe checkout
│   │   │   ├── orders/          # Order management
│   │   │   └── webhooks/        # Stripe webhooks
│   │   ├── tienda/              # Shop pages
│   │   │   └── [slug]/          # Product detail
│   │   ├── checkout/            # Checkout flow
│   │   ├── suscripcion/         # Subscription page
│   │   ├── blog/                # Blog/recipes
│   │   ├── faq/                 # FAQ page
│   │   ├── contacto/            # Contact page
│   │   ├── mayorista/           # B2B/Wholesale
│   │   ├── legal/               # Legal pages
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Global styles
│   │   └── not-found.tsx        # 404 page
│   ├── components/              # React components
│   │   ├── layout/              # Header, Footer
│   │   ├── product/             # ProductCard
│   │   ├── cart/                # CartDrawer
│   │   └── ui/                  # Button, Input, Select
│   ├── data/                    # Static data
│   │   ├── products.ts          # Product catalog
│   │   ├── faqs.ts              # FAQ content
│   │   └── blog.ts              # Blog posts
│   ├── lib/                     # Utilities
│   │   ├── constants.ts         # Business constants
│   │   ├── pricing.ts           # Pricing logic
│   │   └── utils.ts             # Helper functions
│   ├── store/                   # Zustand stores
│   │   └── cart-store.ts        # Cart state
│   └── __tests__/               # Unit tests
├── e2e/                         # Playwright E2E tests
└── .github/workflows/           # CI/CD configuration
```

## Business Rules

### Pricing Structure

| Option | Discount | Unit Price | Shipping |
|--------|----------|------------|----------|
| 1 unit | 0% | 9,00€ | 4,95€ |
| Pack 3 | 3% | 8,73€ | 4,95€ |
| Pack 4 | 5% | 8,55€ | FREE |
| Pack 6 | 10% | 8,10€ | FREE |
| Subscription | 15% | 7,65€ | FREE |

**Free Shipping Rules:**
- Orders with 4+ items
- Orders >= 35€
- Any subscription

**VAT:** 10% (included in all prices)

### Key Files for Business Logic

- `src/lib/constants.ts` - Business constants (prices, thresholds)
- `src/lib/pricing.ts` - Discount and shipping calculations
- `src/store/cart-store.ts` - Cart state management

## Development Workflow

### Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database
npm run db:seed

# Start development server
npm run dev
```

### Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run db:studio` | Open Prisma Studio |

### Environment Variables

Key variables in `.env.local`:

```env
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Code Conventions

### TypeScript

- Strict mode enabled
- Use type imports: `import type { ... }`
- Define interfaces in data files or co-located
- Use Zod for runtime validation

### React Components

- Functional components only
- Use server components by default (Next.js 14)
- Add `'use client'` directive only when needed
- Props interfaces defined inline or exported

### Styling

- Tailwind CSS utility classes
- Custom classes defined in `globals.css`
- Use `cn()` utility for conditional classes
- Brand colors in `tailwind.config.ts`

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Pages: Next.js App Router conventions

## API Routes

### `/api/checkout` (POST)
Creates Stripe checkout session for cart items.

### `/api/orders` (POST/GET)
Creates and retrieves orders.

### `/api/webhooks/stripe` (POST)
Handles Stripe webhook events:
- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.created/updated/deleted`

## Testing

### Unit Tests

Located in `src/__tests__/`. Run with:
```bash
npm run test
```

Key test files:
- `lib/pricing.test.ts` - Discount calculations
- `lib/utils.test.ts` - Utility functions

### E2E Tests

Located in `e2e/`. Run with:
```bash
npm run test:e2e
```

Key test files:
- `checkout.spec.ts` - Purchase flow
- `accessibility.spec.ts` - WCAG compliance

## AI Assistant Instructions

### When Making Changes

1. **Read first:** Always read existing files before modifying
2. **Follow patterns:** Match existing code style and conventions
3. **Update tests:** Add/update tests for business logic changes
4. **Preserve pricing logic:** Any changes to pricing must match business rules

### Critical Files (Handle with Care)

- `src/lib/pricing.ts` - Core business logic
- `src/lib/constants.ts` - Business configuration
- `src/store/cart-store.ts` - Cart state
- `prisma/schema.prisma` - Database schema

### What to Avoid

- Don't change pricing constants without explicit request
- Don't modify Stripe integration without testing
- Don't add new dependencies without justification
- Don't remove accessibility features

### Adding New Features

1. Create component in appropriate directory
2. Add route in `src/app/` following App Router conventions
3. Update navigation in `src/lib/constants.ts` if needed
4. Add tests for new functionality
5. Update documentation if significant

## Stripe Testing

Use test cards:
- **Success:** 4242 4242 4242 4242
- **Declined:** 4000 0000 0000 0002
- **Auth required:** 4000 0025 0000 3155

For webhooks locally:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Environment Variables for Production

```env
DATABASE_URL=your_production_db
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Troubleshooting

### Common Issues

1. **Prisma errors:** Run `npm run db:generate` after schema changes
2. **Stripe errors:** Verify API keys and webhook secret
3. **Build errors:** Check TypeScript errors with `npx tsc --noEmit`
4. **Cart not persisting:** Check localStorage in browser dev tools

### Useful Debug Commands

```bash
# Check Prisma connection
npx prisma db pull

# View database
npm run db:studio

# Check Stripe webhooks
stripe logs tail
```

---

*Last updated: January 2026*
*Project: Granola Artesanal E-Commerce*
