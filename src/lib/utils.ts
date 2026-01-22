import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CURRENCY } from './constants';

/**
 * Combines class names with Tailwind CSS merge support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price in cents to a localized currency string
 * @param cents - Price in cents (e.g., 900 for 9.00€)
 * @param options - Intl.NumberFormat options
 */
export function formatPrice(
  cents: number,
  options: Intl.NumberFormatOptions = {}
): string {
  const euros = cents / 100;
  const formatted = new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(euros);
  // Normalize non-breaking spaces to regular spaces for consistency
  return formatted.replace(/\u00A0/g, ' ');
}

/**
 * Formats a price showing the unit price for packs
 * @param cents - Price in cents per unit
 * @param quantity - Number of units
 */
export function formatUnitPrice(cents: number): string {
  return `${formatPrice(cents)}/ud.`;
}

/**
 * Converts euros to cents
 */
export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}

/**
 * Converts cents to euros
 */
export function centsToEuros(cents: number): number {
  return cents / 100;
}

/**
 * Calculates the percentage saved
 */
export function calculateSavingsPercentage(
  originalCents: number,
  discountedCents: number
): number {
  if (originalCents === 0) return 0;
  return Math.round(((originalCents - discountedCents) / originalCents) * 100);
}

/**
 * Generates a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GA-${timestamp}-${random}`;
}

/**
 * Generates a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-'); // Replace multiple - with single -
}

/**
 * Truncates text to a specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

/**
 * Formats a date to Spanish locale
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-ES', options).format(d);
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Checks if we're running on the server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates Spanish postal code
 */
export function isValidSpanishPostalCode(code: string): boolean {
  const postalRegex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
  return postalRegex.test(code);
}

/**
 * Validates Spanish phone number
 */
export function isValidSpanishPhone(phone: string): boolean {
  const phoneRegex = /^(?:\+34)?[6-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}
