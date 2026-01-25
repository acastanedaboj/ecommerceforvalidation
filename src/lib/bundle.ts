/**
 * Bundle Pricing Logic
 *
 * Handles pricing calculations for custom mixed packs.
 * Bundles use the same discount structure as single-product packs.
 */

import { PRICING, SHIPPING } from './constants';
import { calculateLinePrice, getPackDiscount } from './pricing';
import type { PriceCalculation } from './pricing';
import type {
  BundleConfig,
  BundleFlavorSelection,
  BundlePackSize,
} from '@/types/bundle';

/**
 * Calculates pricing for a bundle (mixed pack)
 * Uses the same discount logic as single-product packs
 */
export function calculateBundlePrice(
  packSize: BundlePackSize,
  quantity: number = 1,
  isSubscription: boolean = false
): PriceCalculation {
  return calculateLinePrice(quantity, packSize, isSubscription);
}

/**
 * Validates that bundle flavors total equals pack size
 */
export function validateBundleConfig(config: BundleConfig): boolean {
  const totalUnits = config.flavors.reduce(
    (sum, flavor) => sum + flavor.quantity,
    0
  );
  return totalUnits === config.packSize;
}

/**
 * Gets the total number of units selected in a bundle
 */
export function getBundleTotalUnits(flavors: BundleFlavorSelection[]): number {
  return flavors.reduce((sum, flavor) => sum + flavor.quantity, 0);
}

/**
 * Generates a human-readable summary of bundle flavors
 * e.g., "2x Chocolate, 1x Naranja, 1x Datiles"
 */
export function generateBundleSummary(flavors: BundleFlavorSelection[]): string {
  return flavors
    .filter((f) => f.quantity > 0)
    .map((f) => {
      // Remove "Granola de " prefix for shorter display
      const shortName = f.productName
        .replace(/^Granola de /i, '')
        .replace(/^Granola /i, '');
      return `${f.quantity}x ${shortName}`;
    })
    .join(', ');
}

/**
 * Calculates savings compared to buying single units
 */
export function calculateBundleSavings(
  packSize: BundlePackSize,
  quantity: number = 1
): number {
  const baseTotal = PRICING.BASE_PRICE_CENTS * packSize * quantity;
  const bundlePrice = calculateBundlePrice(packSize, quantity, false);
  return baseTotal - bundlePrice.subtotalCents;
}

/**
 * Checks if a bundle qualifies for free shipping
 */
export function bundleHasFreeShipping(
  packSize: BundlePackSize,
  isSubscription: boolean = false
): boolean {
  return (
    packSize >= SHIPPING.FREE_SHIPPING_MIN_ITEMS ||
    isSubscription
  );
}

/**
 * Generates a unique bundle ID
 */
export function generateBundleId(): string {
  return `bundle_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generates bundle display name
 * e.g., "Pack Mixto 4"
 */
export function generateBundleName(packSize: BundlePackSize): string {
  return `Pack Mixto ${packSize}`;
}

/**
 * Gets bundle pricing options for display
 */
export function getBundlePackOptions(): Array<{
  size: BundlePackSize;
  unitPriceCents: number;
  totalPriceCents: number;
  discountPercentage: number;
  savingsCents: number;
  freeShipping: boolean;
  label: string;
}> {
  const sizes: BundlePackSize[] = [3, 4, 6];

  return sizes.map((size) => {
    const pricing = calculateBundlePrice(size, 1, false);
    const savings = calculateBundleSavings(size, 1);

    return {
      size,
      unitPriceCents: pricing.unitPriceCents,
      totalPriceCents: pricing.subtotalCents,
      discountPercentage: pricing.discountPercentage,
      savingsCents: savings,
      freeShipping: bundleHasFreeShipping(size),
      label: `Pack ${size}`,
    };
  });
}

/**
 * Creates an empty bundle configuration
 */
export function createEmptyBundleConfig(
  packSize: BundlePackSize = 4
): BundleConfig {
  return {
    packSize,
    flavors: [],
    isSubscription: false,
  };
}

/**
 * Initializes bundle flavors from product list
 */
export function initializeBundleFlavors(
  products: Array<{
    id: string;
    name: string;
    slug: string;
    images: string[];
  }>,
  initialProductId?: string
): BundleFlavorSelection[] {
  return products.map((product) => ({
    productId: product.id,
    productName: product.name,
    productSlug: product.slug,
    productImage: product.images[0] || '/images/placeholder-product.jpg',
    quantity: product.id === initialProductId ? 1 : 0,
  }));
}

/**
 * Updates a flavor quantity in the bundle
 */
export function updateFlavorQuantity(
  flavors: BundleFlavorSelection[],
  productId: string,
  newQuantity: number
): BundleFlavorSelection[] {
  return flavors.map((flavor) =>
    flavor.productId === productId
      ? { ...flavor, quantity: Math.max(0, newQuantity) }
      : flavor
  );
}

/**
 * Checks if bundle is complete (total units === pack size)
 */
export function isBundleComplete(
  flavors: BundleFlavorSelection[],
  packSize: BundlePackSize
): boolean {
  return getBundleTotalUnits(flavors) === packSize;
}

/**
 * Gets remaining units to fill the bundle
 */
export function getRemainingUnits(
  flavors: BundleFlavorSelection[],
  packSize: BundlePackSize
): number {
  const current = getBundleTotalUnits(flavors);
  return Math.max(0, packSize - current);
}
