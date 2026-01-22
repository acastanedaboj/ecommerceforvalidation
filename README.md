# Granola Artesanal - E-commerce

E-commerce platform for artisanal granola products. Built with Next.js 14, Tailwind CSS, and Stripe.

## Features

- **Full E-commerce Flow**: Product catalog, cart, checkout, and order management
- **Pack Discounts**: Automatic pricing for packs of 3, 4, and 6 units
- **Subscription System**: Monthly subscriptions with 15% discount
- **Stripe Integration**: Secure payments and subscription management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, JSON-LD schema
- **Accessibility**: WCAG AA compliant
- **Internationalization**: Spanish (es-ES) by default

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe (Checkout + Subscriptions)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Testing**: Jest + React Testing Library + Playwright
- **CI/CD**: GitHub Actions + Vercel

## Getting Started

### Prerequisites

- Node.js 18.17+
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/granola-artesanal.git
cd granola-artesanal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/granola_db"
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run db:studio` | Open Prisma Studio |

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/             # API routes
│   │   ├── tienda/          # Shop pages
│   │   ├── checkout/        # Checkout flow
│   │   ├── legal/           # Legal pages
│   │   └── ...
│   ├── components/          # React components
│   │   ├── layout/          # Header, Footer
│   │   ├── product/         # ProductCard, etc.
│   │   ├── cart/            # Cart components
│   │   └── ui/              # Reusable UI components
│   ├── data/                # Static data (products, FAQs)
│   ├── lib/                 # Utilities and helpers
│   │   ├── constants.ts     # Business constants
│   │   ├── pricing.ts       # Pricing logic
│   │   └── utils.ts         # Helper functions
│   ├── store/               # Zustand stores
│   └── __tests__/           # Unit tests
├── e2e/                     # Playwright E2E tests
├── prisma/                  # Database schema
├── public/                  # Static assets
└── ...
```

## Pricing Rules

| Option | Discount | Unit Price | Shipping |
|--------|----------|------------|----------|
| 1 unit | - | 9,00€ | 4,95€ |
| Pack 3 | 3% | 8,73€ | 4,95€ |
| Pack 4 | 5% | 8,55€ | Free |
| Pack 6 | 10% | 8,10€ | Free |
| Subscription | 15% | 7,65€ | Free |

**Free shipping**: Orders with 4+ items OR total >= 35€

## Testing Stripe Payments

Use these test cards in Stripe test mode:

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Declined |
| 4000 0025 0000 3155 | Requires authentication |

Use any future expiry date and any 3-digit CVC.

### Local Webhook Testing

1. Install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
```

2. Login to Stripe:
```bash
stripe login
```

3. Forward webhooks to local:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. Copy the webhook secret to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Deployment to Vercel

### Environment Variables

Configure these in Vercel dashboard:

```env
DATABASE_URL=your_production_database_url
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## SEO Checklist

- [x] Dynamic meta tags per page
- [x] Open Graph tags
- [x] Twitter Cards
- [x] JSON-LD schema for products
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Alt text for images
- [x] Semantic HTML

## Accessibility Checklist

- [x] Semantic HTML structure
- [x] ARIA labels for interactive elements
- [x] Keyboard navigation support
- [x] Skip to content link
- [x] Color contrast (WCAG AA)
- [x] Focus indicators
- [x] Form labels and error messages
- [x] Screen reader friendly

## License

Private - All rights reserved

## Support

For questions or issues, contact: hola@granolaartesanal.com
