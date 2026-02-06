/**
 * Coupon Data - Poppy
 *
 * Discount coupons and promotional codes
 */

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // Percentage (0-100) or fixed amount in cents
  minPurchaseAmountCents?: number; // Minimum purchase required
  maxDiscountCents?: number; // Maximum discount cap (for percentage discounts)
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  usageLimit?: number; // Max total uses
  usageCount: number; // Current usage count
  applicableProducts?: string[]; // Product IDs, empty = all products
}

export const coupons: Coupon[] = [
  {
    code: 'Poppy90trial',
    description: 'Descuento del 90% para prueba',
    discountType: 'percentage',
    discountValue: 90,
    validFrom: new Date('2026-01-01'),
    validUntil: new Date('2026-12-31'),
    isActive: true,
    usageCount: 0,
    // No usage limit for trial
  },
];

export function getCouponByCode(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toLowerCase() === code.toLowerCase() && c.isActive);
}

export function isCouponValid(coupon: Coupon, subtotalCents: number): { valid: boolean; reason?: string } {
  const now = new Date();

  if (!coupon.isActive) {
    return { valid: false, reason: 'Cupón no activo' };
  }

  if (now < coupon.validFrom) {
    return { valid: false, reason: 'Cupón aún no válido' };
  }

  if (now > coupon.validUntil) {
    return { valid: false, reason: 'Cupón expirado' };
  }

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { valid: false, reason: 'Cupón agotado' };
  }

  if (coupon.minPurchaseAmountCents && subtotalCents < coupon.minPurchaseAmountCents) {
    return { valid: false, reason: `Compra mínima requerida: ${(coupon.minPurchaseAmountCents / 100).toFixed(2)}€` };
  }

  return { valid: true };
}

export function calculateCouponDiscount(
  coupon: Coupon,
  subtotalCents: number
): number {
  if (coupon.discountType === 'percentage') {
    let discount = Math.round((subtotalCents * coupon.discountValue) / 100);

    // Apply max discount cap if set
    if (coupon.maxDiscountCents) {
      discount = Math.min(discount, coupon.maxDiscountCents);
    }

    return discount;
  } else {
    // Fixed discount
    return Math.min(coupon.discountValue, subtotalCents);
  }
}
