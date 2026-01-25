import { test, expect } from '@playwright/test';

test.describe('E-commerce Happy Path', () => {
  test('should complete a full purchase flow', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Poppy/);

    // 2. Navigate to shop
    await page.click('text=Tienda');
    await expect(page).toHaveURL('/tienda');

    // 3. Click on a product
    await page.click('text=Granola Clásica');
    await expect(page).toHaveURL(/\/tienda\/granola-clasica/);

    // 4. Select pack of 4 for free shipping
    await page.click('text=Pack 4');

    // 5. Add to cart
    await page.click('text=Añadir al carrito');

    // 6. Verify cart drawer opens with item
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('text=Granola Clásica')).toBeVisible();
    await expect(page.locator('text=Pack 4')).toBeVisible();
    await expect(page.locator('text=Envío gratis')).toBeVisible();

    // 7. Go to checkout
    await page.click('text=Finalizar compra');
    await expect(page).toHaveURL('/checkout');

    // 8. Fill checkout form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="phone"]', '612345678');
    await page.fill('input[name="address"]', 'Calle Test 123');
    await page.fill('input[name="city"]', 'Madrid');
    await page.selectOption('select[name="province"]', 'Madrid');
    await page.fill('input[name="postalCode"]', '28001');

    // 9. Accept terms
    await page.check('input[id="privacy"]');

    // Note: In a real test, we would mock Stripe or use Stripe test mode
    // For now, we verify the form is properly filled
    await expect(page.locator('button:has-text("Pagar ahora")')).toBeEnabled();
  });

  test('should show correct pricing for different packs', async ({ page }) => {
    await page.goto('/tienda/granola-clasica-250g');

    // Single unit - 9.00€
    await page.click('button:has-text("1 ud")');
    await expect(page.locator('text=9,00 €')).toBeVisible();

    // Pack 3 - 3% discount = 8.73€/ud
    await page.click('button:has-text("Pack 3")');
    await expect(page.locator('text=-3%')).toBeVisible();

    // Pack 4 - 5% discount = 8.55€/ud + free shipping
    await page.click('button:has-text("Pack 4")');
    await expect(page.locator('text=-5%')).toBeVisible();
    await expect(page.locator('text=Envío gratis')).toBeVisible();

    // Pack 6 - 10% discount = 8.10€/ud
    await page.click('button:has-text("Pack 6")');
    await expect(page.locator('text=-10%')).toBeVisible();
  });

  test('should handle subscription selection', async ({ page }) => {
    await page.goto('/tienda/granola-clasica-250g');

    // Select subscription
    await page.click('text=Suscripción mensual');

    // Verify subscription badge and discount
    await expect(page.locator('text=-15%')).toBeVisible();
    await expect(page.locator('text=7,65 €')).toBeVisible();
    await expect(page.locator('text=Envío gratis')).toBeVisible();
  });
});

test.describe('Cart functionality', () => {
  test('should update quantities in cart', async ({ page }) => {
    await page.goto('/tienda/granola-clasica-250g');

    // Add to cart
    await page.click('text=Añadir al carrito');

    // Wait for cart drawer
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Increase quantity
    await page.click('button[aria-label="Aumentar cantidad"]');

    // Check quantity updated
    await expect(page.locator('text=2').first()).toBeVisible();
  });

  test('should remove items from cart', async ({ page }) => {
    await page.goto('/tienda/granola-clasica-250g');

    // Add to cart
    await page.click('text=Añadir al carrito');

    // Wait for cart drawer
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Remove item
    await page.click('button[aria-label*="Eliminar"]');

    // Check cart is empty
    await expect(page.locator('text=Tu carrito está vacío')).toBeVisible();
  });

  test('should persist cart across page navigation', async ({ page }) => {
    await page.goto('/tienda/granola-clasica-250g');

    // Add to cart
    await page.click('text=Añadir al carrito');

    // Close cart
    await page.click('button[aria-label="Cerrar carrito"]');

    // Navigate to another page
    await page.goto('/blog');

    // Navigate back to shop
    await page.goto('/tienda');

    // Open cart
    await page.click('button[aria-label*="Carrito"]');

    // Verify item is still in cart
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('text=Granola Clásica')).toBeVisible();
  });
});

test.describe('Navigation and SEO', () => {
  test('should have correct meta tags on homepage', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Poppy/);

    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('granola');
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Test main navigation links
    await page.click('text=Tienda');
    await expect(page).toHaveURL('/tienda');

    await page.click('text=Suscripción');
    await expect(page).toHaveURL('/suscripcion');

    await page.click('text=Recetas');
    await expect(page).toHaveURL('/blog');
  });

  test('should show 404 for non-existent pages', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Página no encontrada')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link
    await page.keyboard.press('Tab');
    await expect(page.locator('a:has-text("Saltar al contenido")')).toBeFocused();

    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to activate links with Enter
    await page.keyboard.press('Enter');
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Check navigation has aria-label
    await expect(page.locator('nav[aria-label="Navegación principal"]')).toBeVisible();

    // Check cart button has aria-label
    await expect(page.locator('button[aria-label*="Carrito"]')).toBeVisible();

    // Check footer has role
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
  });
});
