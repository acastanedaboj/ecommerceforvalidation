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
    it('should return base price for single unit (700 cents = 7.00€)', () => {
      expect(calculatePackUnitPrice(1)).toBe(700);
    });

    it('should return 679 cents (6.79€) for pack of 3 (3% off)', () => {
      expect(calculatePackUnitPrice(3)).toBe(679); // 700 * 0.97 = 679
    });

    it('should return 665 cents (6.65€) for pack of 4 (5% off)', () => {
      expect(calculatePackUnitPrice(4)).toBe(665); // 700 * 0.95 = 665
    });

    it('should return 630 cents (6.30€) for pack of 6 (10% off)', () => {
      expect(calculatePackUnitPrice(6)).toBe(630); // 700 * 0.90 = 630
    });
  });

  describe('calculateSubscriptionUnitPrice', () => {
    it('should return 595 cents (5.95€) for subscription (15% off)', () => {
      expect(calculateSubscriptionUnitPrice()).toBe(595); // 700 * 0.85 = 595
    });
  });

  describe('calculateLinePrice', () => {
    it('should calculate correct price for single unit', () => {
      const result = calculateLinePrice(1, 1, false);
      expect(result.unitPriceCents).toBe(700);
      expect(result.subtotalCents).toBe(700);
      expect(result.discountCents).toBe(0);
      expect(result.isFreeShipping).toBe(false);
    });

    it('should calculate correct price for pack of 4', () => {
      const result = calculateLinePrice(1, 4, false);
      expect(result.unitPriceCents).toBe(665);
      expect(result.subtotalCents).toBe(2660); // 665 * 4
      expect(result.discountCents).toBe(140); // (700 - 665) * 4 = 140
      expect(result.isFreeShipping).toBe(true);
    });

    it('should calculate correct price for subscription', () => {
      const result = calculateLinePrice(1, 6, true);
      expect(result.unitPriceCents).toBe(595);
      expect(result.subtotalCents).toBe(3570); // 595 * 6
      expect(result.discountCents).toBe(630); // (700 - 595) * 6 = 630
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

      const expectedSubtotal = 595 * 6; // 3570
      expect(result.subtotalCents).toBe(expectedSubtotal);
      expect(result.isFreeShipping).toBe(true);
    });

    it('should calculate VAT correctly (10%)', () => {
      const result = calculateCartTotal([
        { productId: '1', quantity: 1, packSize: 1, isSubscription: false },
      ]);

      // Price is VAT-inclusive, so we extract it
      // Total = 700, Net = 700 / 1.10 ≈ 636, VAT = 700 - 636 = 64
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
      expect(info.unitPriceCents).toBe(595);
      expect(info.totalPriceCents).toBe(3570);
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
    // 4 single items = 4 * 700 = 2800 cents = 28€
    const result = calculateCartTotal([
      { productId: '1', quantity: 4, packSize: 1, isSubscription: false },
    ]);
    expect(result.isFreeShipping).toBe(true);
  });

  it('should not apply free shipping for orders < 35€ with less than 4 items', () => {
    // 3 single items = 3 * 700 = 2100 cents = 21€
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
