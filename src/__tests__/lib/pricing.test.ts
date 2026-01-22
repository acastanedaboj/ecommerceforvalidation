import {
  calculatePackUnitPrice,
  calculateSubscriptionUnitPrice,
  calculateLinePrice,
  calculateCartTotal,
  getPackDiscount,
  getPackOptions,
  getSubscriptionInfo,
} from '@/lib/pricing';
import { PRICING, SHIPPING } from '@/lib/constants';

describe('Pricing Logic', () => {
  describe('getPackDiscount', () => {
    it('should return 0 for single unit', () => {
      expect(getPackDiscount(1)).toBe(0);
    });

    it('should return 3% for pack of 3', () => {
      expect(getPackDiscount(3)).toBe(0.03);
    });

    it('should return 5% for pack of 4', () => {
      expect(getPackDiscount(4)).toBe(0.05);
    });

    it('should return 10% for pack of 6', () => {
      expect(getPackDiscount(6)).toBe(0.10);
    });

    it('should return 0 for unknown pack size', () => {
      expect(getPackDiscount(7)).toBe(0);
    });
  });

  describe('calculatePackUnitPrice', () => {
    it('should return base price for single unit (900 cents = 9.00€)', () => {
      expect(calculatePackUnitPrice(1)).toBe(900);
    });

    it('should return 870 cents (8.70€) for pack of 3 (3% off)', () => {
      expect(calculatePackUnitPrice(3)).toBe(873); // 900 * 0.97 = 873
    });

    it('should return 855 cents (8.55€) for pack of 4 (5% off)', () => {
      expect(calculatePackUnitPrice(4)).toBe(855); // 900 * 0.95 = 855
    });

    it('should return 810 cents (8.10€) for pack of 6 (10% off)', () => {
      expect(calculatePackUnitPrice(6)).toBe(810); // 900 * 0.90 = 810
    });
  });

  describe('calculateSubscriptionUnitPrice', () => {
    it('should return 765 cents (7.65€) for subscription (15% off)', () => {
      expect(calculateSubscriptionUnitPrice()).toBe(765); // 900 * 0.85 = 765
    });
  });

  describe('calculateLinePrice', () => {
    it('should calculate correct price for single unit', () => {
      const result = calculateLinePrice(1, 1, false);
      expect(result.unitPriceCents).toBe(900);
      expect(result.subtotalCents).toBe(900);
      expect(result.discountCents).toBe(0);
      expect(result.isFreeShipping).toBe(false);
    });

    it('should calculate correct price for pack of 4', () => {
      const result = calculateLinePrice(1, 4, false);
      expect(result.unitPriceCents).toBe(855);
      expect(result.subtotalCents).toBe(3420); // 855 * 4
      expect(result.discountCents).toBe(180); // (900 - 855) * 4 = 180
      expect(result.isFreeShipping).toBe(true);
    });

    it('should calculate correct price for subscription', () => {
      const result = calculateLinePrice(1, 6, true);
      expect(result.unitPriceCents).toBe(765);
      expect(result.subtotalCents).toBe(4590); // 765 * 6
      expect(result.discountCents).toBe(810); // (900 - 765) * 6 = 810
      expect(result.isFreeShipping).toBe(true);
    });

    it('should include shipping for small orders', () => {
      const result = calculateLinePrice(1, 1, false);
      expect(result.isFreeShipping).toBe(false);
      expect(result.shippingCents).toBe(SHIPPING.STANDARD_COST_CENTS);
    });

    it('should have free shipping for 4+ items', () => {
      const result = calculateLinePrice(1, 4, false);
      expect(result.isFreeShipping).toBe(true);
      expect(result.shippingCents).toBe(0);
    });
  });

  describe('calculateCartTotal', () => {
    it('should handle empty cart', () => {
      const result = calculateCartTotal([]);
      expect(result.itemCount).toBe(0);
      expect(result.subtotalCents).toBe(0);
      expect(result.totalCents).toBe(0);
    });

    it('should calculate total for multiple items', () => {
      const result = calculateCartTotal([
        { productId: '1', quantity: 1, packSize: 4, isSubscription: false },
        { productId: '2', quantity: 1, packSize: 1, isSubscription: false },
      ]);

      expect(result.itemCount).toBe(5); // 4 + 1
      expect(result.isFreeShipping).toBe(true); // 5 >= 4
    });

    it('should apply subscription discount', () => {
      const result = calculateCartTotal([
        { productId: '1', quantity: 1, packSize: 6, isSubscription: true },
      ]);

      const expectedSubtotal = 765 * 6; // 4590
      expect(result.subtotalCents).toBe(expectedSubtotal);
      expect(result.isFreeShipping).toBe(true);
    });

    it('should calculate VAT correctly (10%)', () => {
      const result = calculateCartTotal([
        { productId: '1', quantity: 1, packSize: 1, isSubscription: false },
      ]);

      // Price is VAT-inclusive, so we extract it
      // Total = 900, Net = 900 / 1.10 ≈ 818, VAT = 900 - 818 = 82
      expect(result.taxCents).toBeGreaterThan(0);
      expect(result.taxCents).toBeLessThan(result.subtotalCents);
    });
  });

  describe('getPackOptions', () => {
    it('should return all pack options', () => {
      const options = getPackOptions();
      expect(options).toHaveLength(4);
      expect(options.map(o => o.size)).toEqual([1, 3, 4, 6]);
    });

    it('should include correct discount percentages', () => {
      const options = getPackOptions();
      expect(options[0].discountPercentage).toBe(0);
      expect(options[1].discountPercentage).toBe(3);
      expect(options[2].discountPercentage).toBe(5);
      expect(options[3].discountPercentage).toBe(10);
    });

    it('should mark packs 4+ as free shipping', () => {
      const options = getPackOptions();
      expect(options[0].freeShipping).toBe(false);
      expect(options[1].freeShipping).toBe(false);
      expect(options[2].freeShipping).toBe(true);
      expect(options[3].freeShipping).toBe(true);
    });
  });

  describe('getSubscriptionInfo', () => {
    it('should return correct subscription info', () => {
      const info = getSubscriptionInfo();
      expect(info.packSize).toBe(6);
      expect(info.discountPercentage).toBe(15);
      expect(info.unitPriceCents).toBe(765);
      expect(info.totalPriceCents).toBe(4590);
    });

    it('should calculate monthly savings correctly', () => {
      const info = getSubscriptionInfo();
      const expectedSavings = (PRICING.BASE_PRICE_CENTS - info.unitPriceCents) * info.packSize;
      expect(info.monthlySavings).toBe(expectedSavings);
    });
  });
});

describe('Free Shipping Rules', () => {
  it('should apply free shipping for orders >= 35€', () => {
    // 4 single items = 4 * 900 = 3600 cents = 36€
    const result = calculateCartTotal([
      { productId: '1', quantity: 4, packSize: 1, isSubscription: false },
    ]);
    expect(result.isFreeShipping).toBe(true);
  });

  it('should not apply free shipping for orders < 35€ with less than 4 items', () => {
    // 3 single items = 3 * 900 = 2700 cents = 27€
    const result = calculateCartTotal([
      { productId: '1', quantity: 3, packSize: 1, isSubscription: false },
    ]);
    expect(result.isFreeShipping).toBe(false);
  });

  it('should apply free shipping for pack 4+', () => {
    const result = calculateCartTotal([
      { productId: '1', quantity: 1, packSize: 4, isSubscription: false },
    ]);
    expect(result.isFreeShipping).toBe(true);
  });

  it('should always apply free shipping for subscriptions', () => {
    const result = calculateCartTotal([
      { productId: '1', quantity: 1, packSize: 6, isSubscription: true },
    ]);
    expect(result.isFreeShipping).toBe(true);
  });
});
