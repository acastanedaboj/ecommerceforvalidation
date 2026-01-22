/**
 * Pricing Logic for Granola Artesanal
 *
 * Business Rules:
 * - Base price: 9.00€ per 250g bag
 * - Pack 3: 3% discount per unit (8.70€/unit)
 * - Pack 4: 5% discount per unit (8.55€/unit) + free shipping
 * - Pack 6: 10% discount per unit (8.10€/unit) + free shipping
 * - Subscription Pack 6: 15% discount per unit (7.65€/unit) + free shipping
 * - Free shipping: >= 4 bags OR >= 35€
 * - VAT: 10% (included in displayed prices)
 */

import { PRICING, SHIPPING, PRODUCT } from './constants';

export interface PriceCalculation {
  unitPriceCents: number;
  subtotalCents: number;
  discountCents: number;
  discountPercentage: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  isFreeShipping: boolean;
  savingsPerUnit: number;
}

export interface CartPriceCalculation extends PriceCalculation {
  itemCount: number;
  items: CartItemPrice[];
}

export interface CartItemPrice {
  productId: string;
  quantity: number;
  packSize: number;
  isSubscription: boolean;
  unitPriceCents: number;
  lineTotalCents: number;
  discountPercentage: number;
}

/**
 * Gets the discount percentage for a given pack size
 */
export function getPackDiscount(packSize: number): number {
  return PRICING.PACK_DISCOUNTS[packSize] || 0;
}

/**
 * Calculates the unit price for a pack size (without subscription)
 */
export function calculatePackUnitPrice(packSize: number): number {
  const discount = getPackDiscount(packSize);
  return Math.round(PRICING.BASE_PRICE_CENTS * (1 - discount));
}

/**
 * Calculates the unit price for a subscription (always pack 6 + 15% off)
 */
export function calculateSubscriptionUnitPrice(): number {
  return Math.round(PRICING.BASE_PRICE_CENTS * (1 - PRICING.SUBSCRIPTION_DISCOUNT));
}

/**
 * Calculates the total price for a specific configuration
 */
export function calculateLinePrice(
  quantity: number,
  packSize: number = 1,
  isSubscription: boolean = false
): PriceCalculation {
  // Calculate unit price based on pack/subscription
  const unitPriceCents = isSubscription
    ? calculateSubscriptionUnitPrice()
    : calculatePackUnitPrice(packSize);

  // Total units
  const totalUnits = quantity * packSize;

  // Subtotal before any adjustments
  const subtotalCents = unitPriceCents * totalUnits;

  // Original price without discount (for comparison)
  const originalSubtotal = PRICING.BASE_PRICE_CENTS * totalUnits;

  // Discount amount
  const discountCents = originalSubtotal - subtotalCents;

  // Discount percentage
  const discountPercentage = isSubscription
    ? PRICING.SUBSCRIPTION_DISCOUNT * 100
    : getPackDiscount(packSize) * 100;

  // Check free shipping eligibility
  const isFreeShipping =
    totalUnits >= SHIPPING.FREE_SHIPPING_MIN_ITEMS ||
    subtotalCents >= SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS ||
    packSize >= 4 ||
    isSubscription;

  // Shipping cost
  const shippingCents = isFreeShipping ? 0 : SHIPPING.STANDARD_COST_CENTS;

  // Calculate VAT (prices are VAT-inclusive, so we extract it for display)
  // Total = Net + VAT, where VAT = Net * 0.10
  // So Total = Net * 1.10, Net = Total / 1.10
  const netAmount = Math.round(subtotalCents / (1 + PRICING.VAT_RATE));
  const taxCents = subtotalCents - netAmount;

  // Total including shipping
  const totalCents = subtotalCents + shippingCents;

  // Savings per unit
  const savingsPerUnit = PRICING.BASE_PRICE_CENTS - unitPriceCents;

  return {
    unitPriceCents,
    subtotalCents,
    discountCents,
    discountPercentage,
    shippingCents,
    taxCents,
    totalCents,
    isFreeShipping,
    savingsPerUnit,
  };
}

/**
 * Calculates cart totals with multiple items
 */
export function calculateCartTotal(
  items: Array<{
    productId: string;
    quantity: number;
    packSize: number;
    isSubscription: boolean;
    priceInCents?: number; // Optional override for product price
  }>
): CartPriceCalculation {
  let totalUnits = 0;
  let subtotalCents = 0;
  let originalTotalCents = 0;

  const itemPrices: CartItemPrice[] = items.map((item) => {
    const basePrice = item.priceInCents || PRICING.BASE_PRICE_CENTS;

    // Calculate unit price with discount
    const discountPercentage = item.isSubscription
      ? PRICING.SUBSCRIPTION_DISCOUNT
      : getPackDiscount(item.packSize);

    const unitPriceCents = Math.round(basePrice * (1 - discountPercentage));
    const units = item.quantity * item.packSize;
    const lineTotalCents = unitPriceCents * units;

    totalUnits += units;
    subtotalCents += lineTotalCents;
    originalTotalCents += basePrice * units;

    return {
      productId: item.productId,
      quantity: item.quantity,
      packSize: item.packSize,
      isSubscription: item.isSubscription,
      unitPriceCents,
      lineTotalCents,
      discountPercentage: discountPercentage * 100,
    };
  });

  // Discount total
  const discountCents = originalTotalCents - subtotalCents;

  // Average discount percentage
  const discountPercentage =
    originalTotalCents > 0
      ? Math.round((discountCents / originalTotalCents) * 100)
      : 0;

  // Check free shipping eligibility
  const hasSubscription = items.some((item) => item.isSubscription);
  const hasLargePack = items.some((item) => item.packSize >= 4);
  const isFreeShipping =
    totalUnits >= SHIPPING.FREE_SHIPPING_MIN_ITEMS ||
    subtotalCents >= SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS ||
    hasLargePack ||
    hasSubscription;

  // Shipping cost
  const shippingCents = isFreeShipping ? 0 : SHIPPING.STANDARD_COST_CENTS;

  // Calculate VAT (extracted from VAT-inclusive prices)
  const netAmount = Math.round(subtotalCents / (1 + PRICING.VAT_RATE));
  const taxCents = subtotalCents - netAmount;

  // Total
  const totalCents = subtotalCents + shippingCents;

  // Average unit price
  const unitPriceCents = totalUnits > 0 ? Math.round(subtotalCents / totalUnits) : 0;

  // Average savings per unit
  const savingsPerUnit =
    totalUnits > 0 ? Math.round(discountCents / totalUnits) : 0;

  return {
    unitPriceCents,
    subtotalCents,
    discountCents,
    discountPercentage,
    shippingCents,
    taxCents,
    totalCents,
    isFreeShipping,
    savingsPerUnit,
    itemCount: totalUnits,
    items: itemPrices,
  };
}

/**
 * Gets all available pack options with prices
 */
export function getPackOptions(): Array<{
  size: number;
  unitPriceCents: number;
  totalPriceCents: number;
  discountPercentage: number;
  savingsPerUnit: number;
  freeShipping: boolean;
  label: string;
}> {
  return PRODUCT.PACK_SIZES.map((size) => {
    const unitPriceCents = calculatePackUnitPrice(size);
    return {
      size,
      unitPriceCents,
      totalPriceCents: unitPriceCents * size,
      discountPercentage: getPackDiscount(size) * 100,
      savingsPerUnit: PRICING.BASE_PRICE_CENTS - unitPriceCents,
      freeShipping: size >= SHIPPING.FREE_SHIPPING_MIN_ITEMS,
      label:
        size === 1
          ? '1 bolsa'
          : `Pack ${size} ${size >= 4 ? '(envío gratis)' : ''}`,
    };
  });
}

/**
 * Gets subscription pricing info
 */
export function getSubscriptionInfo(): {
  unitPriceCents: number;
  packSize: number;
  totalPriceCents: number;
  discountPercentage: number;
  savingsPerUnit: number;
  monthlySavings: number;
} {
  const unitPriceCents = calculateSubscriptionUnitPrice();
  const packSize = PRODUCT.SUBSCRIPTION_PACK_SIZE;

  return {
    unitPriceCents,
    packSize,
    totalPriceCents: unitPriceCents * packSize,
    discountPercentage: PRICING.SUBSCRIPTION_DISCOUNT * 100,
    savingsPerUnit: PRICING.BASE_PRICE_CENTS - unitPriceCents,
    monthlySavings:
      (PRICING.BASE_PRICE_CENTS - unitPriceCents) * packSize,
  };
}
