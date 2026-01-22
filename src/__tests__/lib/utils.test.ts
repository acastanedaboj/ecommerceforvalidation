import {
  cn,
  formatPrice,
  formatUnitPrice,
  eurosToCents,
  centsToEuros,
  calculateSavingsPercentage,
  generateOrderNumber,
  slugify,
  truncate,
  formatDate,
  isValidEmail,
  isValidSpanishPostalCode,
  isValidSpanishPhone,
} from '@/lib/utils';

describe('Utils', () => {
  describe('cn (classNames)', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    });

    it('should merge tailwind classes correctly', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8');
    });
  });

  describe('formatPrice', () => {
    it('should format cents to euros', () => {
      expect(formatPrice(900)).toBe('9,00 €');
    });

    it('should format zero correctly', () => {
      expect(formatPrice(0)).toBe('0,00 €');
    });

    it('should format large amounts', () => {
      expect(formatPrice(123456)).toBe('1.234,56 €');
    });
  });

  describe('formatUnitPrice', () => {
    it('should format with unit suffix', () => {
      expect(formatUnitPrice(900)).toBe('9,00 €/ud.');
    });
  });

  describe('eurosToCents / centsToEuros', () => {
    it('should convert euros to cents', () => {
      expect(eurosToCents(9.00)).toBe(900);
      expect(eurosToCents(0.50)).toBe(50);
    });

    it('should convert cents to euros', () => {
      expect(centsToEuros(900)).toBe(9);
      expect(centsToEuros(50)).toBe(0.5);
    });
  });

  describe('calculateSavingsPercentage', () => {
    it('should calculate correct percentage', () => {
      expect(calculateSavingsPercentage(100, 90)).toBe(10);
      expect(calculateSavingsPercentage(900, 765)).toBe(15);
    });

    it('should return 0 when original is 0', () => {
      expect(calculateSavingsPercentage(0, 0)).toBe(0);
    });
  });

  describe('generateOrderNumber', () => {
    it('should generate unique order numbers', () => {
      const order1 = generateOrderNumber();
      const order2 = generateOrderNumber();
      expect(order1).not.toBe(order2);
    });

    it('should start with GA-', () => {
      const orderNumber = generateOrderNumber();
      expect(orderNumber).toMatch(/^GA-/);
    });
  });

  describe('slugify', () => {
    it('should convert to lowercase', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle accents', () => {
      expect(slugify('Granola Clásica')).toBe('granola-clasica');
    });

    it('should handle special characters', () => {
      expect(slugify('Cacao & Avellana!')).toBe('cacao-avellana');
    });
  });

  describe('truncate', () => {
    it('should truncate long text', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate short text', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });
  });

  describe('formatDate', () => {
    it('should format date in Spanish', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('enero');
      expect(formatted).toContain('2024');
    });

    it('should handle string dates', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('15');
    });
  });

  describe('Validation functions', () => {
    describe('isValidEmail', () => {
      it('should validate correct emails', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      });

      it('should reject invalid emails', () => {
        expect(isValidEmail('invalid')).toBe(false);
        expect(isValidEmail('no@domain')).toBe(false);
        expect(isValidEmail('@domain.com')).toBe(false);
      });
    });

    describe('isValidSpanishPostalCode', () => {
      it('should validate correct postal codes', () => {
        expect(isValidSpanishPostalCode('28001')).toBe(true);
        expect(isValidSpanishPostalCode('08001')).toBe(true);
        expect(isValidSpanishPostalCode('52001')).toBe(true);
      });

      it('should reject invalid postal codes', () => {
        expect(isValidSpanishPostalCode('00001')).toBe(false);
        expect(isValidSpanishPostalCode('53001')).toBe(false);
        expect(isValidSpanishPostalCode('1234')).toBe(false);
        expect(isValidSpanishPostalCode('123456')).toBe(false);
      });
    });

    describe('isValidSpanishPhone', () => {
      it('should validate correct phone numbers', () => {
        expect(isValidSpanishPhone('612345678')).toBe(true);
        expect(isValidSpanishPhone('912345678')).toBe(true);
        expect(isValidSpanishPhone('+34612345678')).toBe(true);
        expect(isValidSpanishPhone('600 123 456')).toBe(true);
      });

      it('should reject invalid phone numbers', () => {
        expect(isValidSpanishPhone('12345678')).toBe(false);
        expect(isValidSpanishPhone('512345678')).toBe(false);
      });
    });
  });
});
