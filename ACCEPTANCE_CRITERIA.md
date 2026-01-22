# Acceptance Criteria - Granola Artesanal E-commerce

This document outlines the acceptance criteria for the e-commerce platform.

## 1. Product Display

### 1.1 Homepage
- [ ] Hero section displays with main product USP
- [ ] Featured products are shown with correct pricing
- [ ] Pack options are displayed with discount percentages
- [ ] Subscription CTA is visible
- [ ] Testimonials section is present
- [ ] Trust indicators (free shipping, organic, etc.) are shown

### 1.2 Shop Page
- [ ] All active products are displayed
- [ ] Product cards show name, price, and quick add button
- [ ] Pack selector is functional on product cards
- [ ] Badges (sin gluten, ecológico) are displayed
- [ ] Out of stock products show appropriate indicator

### 1.3 Product Detail Page
- [ ] Product images are displayed with gallery
- [ ] Price updates based on pack selection
- [ ] Subscription option shows 15% discount
- [ ] Quantity selector works correctly
- [ ] Total price updates in real-time
- [ ] Free shipping indicator shows when applicable
- [ ] Ingredients and nutritional info are displayed
- [ ] Allergen warning is visible
- [ ] Related products are shown

## 2. Pricing & Discounts

### 2.1 Pack Discounts
- [ ] Single unit: 9,00€ (no discount)
- [ ] Pack 3: 8,73€/unit (3% discount)
- [ ] Pack 4: 8,55€/unit (5% discount)
- [ ] Pack 6: 8,10€/unit (10% discount)

### 2.2 Subscription Pricing
- [ ] Subscription: 7,65€/unit (15% discount)
- [ ] Subscription only available for pack of 6

### 2.3 Shipping Rules
- [ ] Standard shipping: 4,95€
- [ ] Free shipping for 4+ items
- [ ] Free shipping for orders >= 35€
- [ ] Free shipping for pack 4, pack 6, or subscription

### 2.4 VAT Calculation
- [ ] All prices include 10% VAT
- [ ] VAT breakdown shown in checkout

## 3. Shopping Cart

### 3.1 Cart Functionality
- [ ] Items can be added from product page
- [ ] Items can be added from product cards
- [ ] Quantity can be increased/decreased
- [ ] Items can be removed
- [ ] Cart persists across page navigation (localStorage)
- [ ] Cart drawer opens/closes properly

### 3.2 Cart Display
- [ ] Product name and image shown
- [ ] Pack size indicated
- [ ] Subscription items marked
- [ ] Unit price shown
- [ ] Line total shown
- [ ] Subtotal calculated correctly
- [ ] Discount amount shown when applicable
- [ ] Shipping cost shown (or "Free")
- [ ] Total calculated correctly

### 3.3 Free Shipping Progress
- [ ] Progress bar shows when below threshold
- [ ] Amount remaining for free shipping displayed
- [ ] Confirmation shown when free shipping achieved

## 4. Checkout

### 4.1 Customer Information
- [ ] Email field with validation
- [ ] Name field required
- [ ] Phone field required
- [ ] Address fields required
- [ ] Province dropdown with Spanish provinces
- [ ] Postal code validation (Spanish format)

### 4.2 Payment Methods
- [ ] Card payment via Stripe
- [ ] Cash on delivery option (+2,00€)
- [ ] Payment method selection works

### 4.3 Legal Requirements
- [ ] Terms and conditions checkbox
- [ ] Privacy policy checkbox
- [ ] Both must be checked to proceed

### 4.4 Order Summary
- [ ] All items listed
- [ ] Prices match cart
- [ ] Shipping cost shown
- [ ] Cash on delivery fee shown when applicable
- [ ] Total is correct

### 4.5 Payment Processing
- [ ] Stripe checkout session created successfully
- [ ] User redirected to Stripe
- [ ] Success page shown after payment
- [ ] Order number generated
- [ ] Error handling for failed payments

## 5. Subscriptions

### 5.1 Subscription Creation
- [ ] Subscription option available on product page
- [ ] 15% discount applied
- [ ] Stripe subscription created
- [ ] Monthly billing cycle

### 5.2 Subscription Management
- [ ] View active subscriptions in account
- [ ] Cancel subscription option
- [ ] Pause subscription option (optional)
- [ ] Next billing date shown

## 6. User Account

### 6.1 Order History
- [ ] List of past orders
- [ ] Order details viewable
- [ ] Order status shown

### 6.2 Subscription Management
- [ ] Active subscriptions listed
- [ ] Cancel/pause options available

## 7. Content Pages

### 7.1 Subscription Info Page
- [ ] Benefits explained
- [ ] Pricing comparison shown
- [ ] How it works section
- [ ] FAQ about subscriptions

### 7.2 FAQ Page
- [ ] Categories: Product, Shipping, Payment, Subscription, Legal
- [ ] All FAQs expandable/collapsible
- [ ] Answers formatted correctly

### 7.3 Blog/Recipes
- [ ] Blog post listing
- [ ] Individual post pages
- [ ] Category filtering
- [ ] Related posts shown

### 7.4 B2B/Wholesale Page
- [ ] Product information for professionals
- [ ] Contact form for inquiries
- [ ] Business type selection

### 7.5 Legal Pages
- [ ] Privacy Policy
- [ ] Terms and Conditions
- [ ] Cookie Policy
- [ ] Legal Notice

### 7.6 Contact Page
- [ ] Contact form functional
- [ ] Business contact info displayed
- [ ] Social media links

### 7.7 404 Page
- [ ] Custom 404 design
- [ ] Helpful navigation links

## 8. Navigation & UX

### 8.1 Header
- [ ] Logo links to home
- [ ] Main navigation works
- [ ] Mobile menu functional
- [ ] Cart button shows item count
- [ ] Cart drawer opens on click

### 8.2 Footer
- [ ] All navigation links work
- [ ] Social media links present
- [ ] Contact info displayed
- [ ] Payment method icons

### 8.3 Responsive Design
- [ ] Mobile layout works (320px+)
- [ ] Tablet layout works (768px+)
- [ ] Desktop layout works (1024px+)

## 9. SEO

### 9.1 Meta Tags
- [ ] Unique title per page
- [ ] Meta description per page
- [ ] Open Graph tags
- [ ] Twitter Card tags

### 9.2 Technical SEO
- [ ] Semantic HTML structure
- [ ] Alt text on images
- [ ] Sitemap generated
- [ ] Robots.txt present

## 10. Accessibility (WCAG AA)

### 10.1 Navigation
- [ ] Skip to content link
- [ ] Keyboard navigation works
- [ ] Focus indicators visible

### 10.2 Forms
- [ ] Labels associated with inputs
- [ ] Error messages accessible
- [ ] Required fields indicated

### 10.3 Content
- [ ] Color contrast meets AA standards
- [ ] Text scalable to 200%
- [ ] Images have alt text

## 11. Performance

### 11.1 Loading
- [ ] Images lazy loaded
- [ ] Next/Image optimization used
- [ ] No layout shift (CLS)

### 11.2 Lighthouse Targets
- [ ] Performance: 80+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

## 12. Testing

### 12.1 Unit Tests
- [ ] Pricing logic tests pass
- [ ] Utility functions tests pass
- [ ] Coverage above 70%

### 12.2 E2E Tests
- [ ] Full purchase flow works
- [ ] Cart functionality works
- [ ] Navigation works
- [ ] Accessibility tests pass

## Test Cards for Stripe

| Test Scenario | Card Number |
|---------------|-------------|
| Successful payment | 4242 4242 4242 4242 |
| Card declined | 4000 0000 0000 0002 |
| Requires authentication | 4000 0025 0000 3155 |

**Expiry**: Any future date
**CVC**: Any 3 digits

---

## Sign-off

| Criterion | Status | Date | Notes |
|-----------|--------|------|-------|
| Product Display | ⬜ | | |
| Pricing & Discounts | ⬜ | | |
| Shopping Cart | ⬜ | | |
| Checkout | ⬜ | | |
| Subscriptions | ⬜ | | |
| User Account | ⬜ | | |
| Content Pages | ⬜ | | |
| Navigation & UX | ⬜ | | |
| SEO | ⬜ | | |
| Accessibility | ⬜ | | |
| Performance | ⬜ | | |
| Testing | ⬜ | | |
