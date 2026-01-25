/**
 * Bundle Pricing Tests
 *
 * Tests for the bundle builder pricing calculations and validation.
 */

import {
  calculateBundlePrice,
  validateBundleConfig,
  generateBundleSummary,
  calculateBundleSavings,
  bundleHasFreeShipping,
  getBundleTotalUnits,
  isBundleComplete,
  getRemainingUnits,
  generateBundleId,
  generateBundleName,
  getBundlePackOptions,
  updateFlavorQuantity,
  initializeBundleFlavors,
} from '@/lib/bundle';
import type { BundleConfig, BundleFlavorSelection } from '@/types/bundle';

describe('Bundle Pricing', () => {
  describe('calculateBundlePrice', () => {
    it('should apply 3% discount for pack 3', () => {
      const result = calculateBundlePrice(3, 1, false);
      expect(result.unitPriceCents).toBe(873); // 900 * 0.97 = 873
      expect(result.subtotalCents).toBe(2619); // 873 * 3
      expect(result.discountPercentage).toBe(3);
    });

    it('should apply 5% discount for pack 4', () => {
      const result = calculateBundlePrice(4, 1, false);
      expect(result.unitPriceCents).toBe(855); // 900 * 0.95 = 855
      expect(result.subtotalCents).toBe(3420); // 855 * 4
      expect(result.discountPercentage).toBe(5);
    });

    it('should apply 10% discount for pack 6', () => {
      const result = calculateBundlePrice(6, 1, false);
      expect(result.unitPriceCents).toBe(810); // 900 * 0.90 = 810
      expect(result.subtotalCents).toBe(4860); // 810 * 6
      expect(result.discountPercentage).toBe(10);
    });

    it('should apply 15% discount for subscription bundles', () => {
      const result = calculateBundlePrice(6, 1, true);
      expect(result.unitPriceCents).toBe(765); // 900 * 0.85 = 765
      expect(result.subtotalCents).toBe(4590); // 765 * 6
      expect(result.discountPercentage).toBe(15);
    });

    it('should multiply by quantity correctly', () => {
      const result = calculateBundlePrice(4, 2, false);
      expect(result.subtotalCents).toBe(6840); // 855 * 4 * 2
    });
  });

  describe('bundleHasFreeShipping', () => {
    it('should return false for pack 3', () => {
      expect(bundleHasFreeShipping(3)).toBe(false);
    });

    it('should return true for pack 4 (meets minimum items)', () => {
      expect(bundleHasFreeShipping(4)).toBe(true);
    });

    it('should return true for pack 6', () => {
      expect(bundleHasFreeShipping(6)).toBe(true);
    });

    it('should return true for subscription regardless of pack size', () => {
      expect(bundleHasFreeShipping(3, true)).toBe(true);
    });
  });

  describe('calculateBundleSavings', () => {
    it('should calculate savings for pack 3 (3% off)', () => {
      const savings = calculateBundleSavings(3, 1);
      // Original: 900 * 3 = 2700
      // Discounted: 873 * 3 = 2619
      // Savings: 2700 - 2619 = 81
      expect(savings).toBe(81);
    });

    it('should calculate savings for pack 4 (5% off)', () => {
      const savings = calculateBundleSavings(4, 1);
      // Original: 900 * 4 = 3600
      // Discounted: 855 * 4 = 3420
      // Savings: 3600 - 3420 = 180
      expect(savings).toBe(180);
    });

    it('should calculate savings for pack 6 (10% off)', () => {
      const savings = calculateBundleSavings(6, 1);
      // Original: 900 * 6 = 5400
      // Discounted: 810 * 6 = 4860
      // Savings: 5400 - 4860 = 540
      expect(savings).toBe(540);
    });

    it('should multiply savings by quantity', () => {
      const savings = calculateBundleSavings(4, 2);
      // 180 * 2 = 360
      expect(savings).toBe(360);
    });
  });
});

describe('Bundle Validation', () => {
  describe('validateBundleConfig', () => {
    it('should return true when flavors sum to pack size', () => {
      const config: BundleConfig = {
        packSize: 4,
        flavors: [
          { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 2 },
          { productId: '2', productName: 'Naranja', productSlug: 'naranja', productImage: '', quantity: 2 },
        ],
        isSubscription: false,
      };
      expect(validateBundleConfig(config)).toBe(true);
    });

    it('should return false when flavors do not sum to pack size (under)', () => {
      const config: BundleConfig = {
        packSize: 4,
        flavors: [
          { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 2 },
          { productId: '2', productName: 'Naranja', productSlug: 'naranja', productImage: '', quantity: 1 },
        ],
        isSubscription: false,
      };
      expect(validateBundleConfig(config)).toBe(false);
    });

    it('should return false when flavors exceed pack size', () => {
      const config: BundleConfig = {
        packSize: 4,
        flavors: [
          { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 3 },
          { productId: '2', productName: 'Naranja', productSlug: 'naranja', productImage: '', quantity: 3 },
        ],
        isSubscription: false,
      };
      expect(validateBundleConfig(config)).toBe(false);
    });

    it('should handle empty flavors array', () => {
      const config: BundleConfig = {
        packSize: 4,
        flavors: [],
        isSubscription: false,
      };
      expect(validateBundleConfig(config)).toBe(false);
    });
  });

  describe('getBundleTotalUnits', () => {
    it('should sum all flavor quantities', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 2 },
        { productId: '2', productName: 'Naranja', productSlug: 'naranja', productImage: '', quantity: 1 },
        { productId: '3', productName: 'Datiles', productSlug: 'datiles', productImage: '', quantity: 3 },
      ];
      expect(getBundleTotalUnits(flavors)).toBe(6);
    });

    it('should return 0 for empty array', () => {
      expect(getBundleTotalUnits([])).toBe(0);
    });
  });

  describe('isBundleComplete', () => {
    it('should return true when total equals pack size', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 2 },
        { productId: '2', productName: 'Naranja', productSlug: 'naranja', productImage: '', quantity: 2 },
      ];
      expect(isBundleComplete(flavors, 4)).toBe(true);
    });

    it('should return false when total is less than pack size', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 1 },
        { productId: '2', productName: 'Naranja', productSlug: 'naranja', productImage: '', quantity: 1 },
      ];
      expect(isBundleComplete(flavors, 4)).toBe(false);
    });
  });

  describe('getRemainingUnits', () => {
    it('should return remaining units needed', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 1 },
      ];
      expect(getRemainingUnits(flavors, 4)).toBe(3);
    });

    it('should return 0 when bundle is complete', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 4 },
      ];
      expect(getRemainingUnits(flavors, 4)).toBe(0);
    });

    it('should return 0 when over pack size (edge case)', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 5 },
      ];
      expect(getRemainingUnits(flavors, 4)).toBe(0);
    });
  });
});

describe('Bundle Summary', () => {
  describe('generateBundleSummary', () => {
    it('should generate comma-separated summary', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Granola de Chocolate', productSlug: 'chocolate', productImage: '', quantity: 2 },
        { productId: '2', productName: 'Granola de Naranja', productSlug: 'naranja', productImage: '', quantity: 1 },
      ];
      expect(generateBundleSummary(flavors)).toBe('2x Chocolate, 1x Naranja');
    });

    it('should filter out zero-quantity items', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Granola de Chocolate', productSlug: 'chocolate', productImage: '', quantity: 2 },
        { productId: '2', productName: 'Granola de Naranja', productSlug: 'naranja', productImage: '', quantity: 0 },
        { productId: '3', productName: 'Granola de Datiles', productSlug: 'datiles', productImage: '', quantity: 1 },
      ];
      expect(generateBundleSummary(flavors)).toBe('2x Chocolate, 1x Datiles');
    });

    it('should return empty string for empty/zero flavors', () => {
      expect(generateBundleSummary([])).toBe('');
    });

    it('should handle products without "Granola de" prefix', () => {
      const flavors: BundleFlavorSelection[] = [
        { productId: '1', productName: 'Chocolate Premium', productSlug: 'chocolate', productImage: '', quantity: 3 },
      ];
      expect(generateBundleSummary(flavors)).toBe('3x Chocolate Premium');
    });
  });

  describe('generateBundleName', () => {
    it('should generate name with pack size', () => {
      expect(generateBundleName(3)).toBe('Pack Mixto 3');
      expect(generateBundleName(4)).toBe('Pack Mixto 4');
      expect(generateBundleName(6)).toBe('Pack Mixto 6');
    });
  });

  describe('generateBundleId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateBundleId();
      const id2 = generateBundleId();
      expect(id1).not.toBe(id2);
    });

    it('should start with "bundle_"', () => {
      const id = generateBundleId();
      expect(id.startsWith('bundle_')).toBe(true);
    });
  });
});

describe('Bundle Pack Options', () => {
  describe('getBundlePackOptions', () => {
    it('should return options for pack sizes 3, 4, 6', () => {
      const options = getBundlePackOptions();
      expect(options).toHaveLength(3);
      expect(options.map((o) => o.size)).toEqual([3, 4, 6]);
    });

    it('should have correct unit prices', () => {
      const options = getBundlePackOptions();
      expect(options[0].unitPriceCents).toBe(873); // Pack 3
      expect(options[1].unitPriceCents).toBe(855); // Pack 4
      expect(options[2].unitPriceCents).toBe(810); // Pack 6
    });

    it('should indicate free shipping for pack 4 and 6', () => {
      const options = getBundlePackOptions();
      expect(options[0].freeShipping).toBe(false); // Pack 3
      expect(options[1].freeShipping).toBe(true); // Pack 4
      expect(options[2].freeShipping).toBe(true); // Pack 6
    });
  });
});

describe('Bundle Flavor Management', () => {
  describe('updateFlavorQuantity', () => {
    const initialFlavors: BundleFlavorSelection[] = [
      { productId: '1', productName: 'Chocolate', productSlug: 'chocolate', productImage: '', quantity: 1 },
      { productId: '2', productName: 'Naranja', productSlug: 'naranja', productImage: '', quantity: 2 },
    ];

    it('should update quantity for specified product', () => {
      const updated = updateFlavorQuantity(initialFlavors, '1', 3);
      expect(updated[0].quantity).toBe(3);
      expect(updated[1].quantity).toBe(2); // Unchanged
    });

    it('should not allow negative quantities', () => {
      const updated = updateFlavorQuantity(initialFlavors, '1', -1);
      expect(updated[0].quantity).toBe(0);
    });

    it('should not modify original array', () => {
      updateFlavorQuantity(initialFlavors, '1', 5);
      expect(initialFlavors[0].quantity).toBe(1);
    });
  });

  describe('initializeBundleFlavors', () => {
    const products = [
      { id: 'prod_1', name: 'Granola de Chocolate', slug: 'chocolate', images: ['/img1.jpg'] },
      { id: 'prod_2', name: 'Granola de Naranja', slug: 'naranja', images: ['/img2.jpg'] },
    ];

    it('should create flavors from products with zero quantity', () => {
      const flavors = initializeBundleFlavors(products);
      expect(flavors).toHaveLength(2);
      expect(flavors[0].quantity).toBe(0);
      expect(flavors[1].quantity).toBe(0);
    });

    it('should pre-select initial product with quantity 1', () => {
      const flavors = initializeBundleFlavors(products, 'prod_1');
      expect(flavors[0].quantity).toBe(1);
      expect(flavors[1].quantity).toBe(0);
    });

    it('should include product images', () => {
      const flavors = initializeBundleFlavors(products);
      expect(flavors[0].productImage).toBe('/img1.jpg');
    });
  });
});
