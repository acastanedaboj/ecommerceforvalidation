/**
 * Bundle Types - Custom pack builder types
 *
 * A bundle is a mixed pack where customers can select different
 * flavors to fill a pack of 3, 4, or 6 units.
 */

/**
 * Single flavor selection within a bundle
 */
export interface BundleFlavorSelection {
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  quantity: number; // Number of this flavor in the bundle
}

/**
 * Complete bundle configuration
 */
export interface BundleConfig {
  packSize: 3 | 4 | 6;
  flavors: BundleFlavorSelection[];
  isSubscription: boolean;
}

/**
 * Bundle item as stored in cart
 */
export interface BundleCartItem {
  type: 'bundle';
  bundleId: string;
  bundleName: string;
  flavors: BundleFlavorSelection[];
  packSize: 3 | 4 | 6;
  quantity: number;
  isSubscription: boolean;
  priceInCents: number; // Base price per unit (900)
}

/**
 * Single product item in cart (for discriminated union)
 */
export interface SingleCartItem {
  type?: 'single'; // Optional for backward compatibility
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  quantity: number;
  packSize: number;
  isSubscription: boolean;
  priceInCents: number;
}

/**
 * Union type for all cart items
 */
export type CartItemUnion = SingleCartItem | BundleCartItem;

/**
 * Type guard to check if cart item is a bundle
 */
export function isBundleItem(item: CartItemUnion): item is BundleCartItem {
  return item.type === 'bundle';
}

/**
 * Type guard to check if cart item is a single product
 */
export function isSingleItem(item: CartItemUnion): item is SingleCartItem {
  return item.type !== 'bundle';
}

/**
 * Valid pack sizes for bundles (excludes single)
 */
export const BUNDLE_PACK_SIZES = [3, 4, 6] as const;
export type BundlePackSize = (typeof BUNDLE_PACK_SIZES)[number];
