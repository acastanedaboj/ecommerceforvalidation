/**
 * Cart Store - Zustand state management for shopping cart
 *
 * Features:
 * - Persistent cart in localStorage
 * - Pack quantity management
 * - Subscription items
 * - Bundle (mixed pack) support
 * - Automatic price calculations
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateCartTotal, type CartPriceCalculation } from '@/lib/pricing';
import { calculateBundlePrice, generateBundleId, generateBundleName } from '@/lib/bundle';
import { PRICING } from '@/lib/constants';
import type {
  BundleCartItem,
  BundleFlavorSelection,
  BundlePackSize,
} from '@/types/bundle';

// Single product cart item (original type)
export interface CartItem {
  type?: 'single'; // Optional for backward compatibility
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  quantity: number;
  packSize: number;
  isSubscription: boolean;
  priceInCents: number; // Base price per unit
}

// Union of all cart item types
export type CartItemUnion = CartItem | BundleCartItem;

// Type guard for bundle items
export function isCartBundleItem(item: CartItemUnion): item is BundleCartItem {
  return item.type === 'bundle';
}

// Type guard for single items
export function isCartSingleItem(item: CartItemUnion): item is CartItem {
  return item.type !== 'bundle';
}

interface CartState {
  items: CartItemUnion[];
  isOpen: boolean;

  // Single item actions
  addItem: (item: Omit<CartItem, 'quantity' | 'type'> & { quantity?: number }) => void;
  removeItem: (productId: string, packSize: number, isSubscription: boolean) => void;
  updateQuantity: (
    productId: string,
    packSize: number,
    isSubscription: boolean,
    quantity: number
  ) => void;

  // Bundle actions
  addBundle: (bundle: {
    flavors: BundleFlavorSelection[];
    packSize: BundlePackSize;
    isSubscription?: boolean;
    priceInCents?: number;
  }) => void;
  removeBundle: (bundleId: string) => void;
  updateBundleQuantity: (bundleId: string, quantity: number) => void;

  // General actions
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;

  // Computed
  getItemCount: () => number;
  getCartTotal: () => CartPriceCalculation;
  getItemKey: (productId: string, packSize: number, isSubscription: boolean) => string;
}

// Generate unique key for cart item (same product can be in cart with different pack sizes)
const generateItemKey = (
  productId: string,
  packSize: number,
  isSubscription: boolean
): string => {
  return `${productId}-${packSize}-${isSubscription}`;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              !isCartBundleItem(item) &&
              item.productId === newItem.productId &&
              item.packSize === newItem.packSize &&
              item.isSubscription === newItem.isSubscription
          );

          if (existingIndex >= 0) {
            // Update quantity of existing item
            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingIndex] as CartItem;
            updatedItems[existingIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + (newItem.quantity || 1),
            };
            return { items: updatedItems };
          }

          // Add new item
          return {
            items: [
              ...state.items,
              {
                ...newItem,
                type: 'single' as const,
                quantity: newItem.quantity || 1,
              },
            ],
          };
        });
      },

      removeItem: (productId, packSize, isSubscription) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              isCartBundleItem(item) ||
              !(
                item.productId === productId &&
                item.packSize === packSize &&
                item.isSubscription === isSubscription
              )
          ),
        }));
      },

      updateQuantity: (productId, packSize, isSubscription, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, packSize, isSubscription);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            !isCartBundleItem(item) &&
            item.productId === productId &&
            item.packSize === packSize &&
            item.isSubscription === isSubscription
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      // Bundle actions
      addBundle: ({ flavors, packSize, isSubscription = false, priceInCents }) => {
        const bundleItem: BundleCartItem = {
          type: 'bundle',
          bundleId: generateBundleId(),
          bundleName: generateBundleName(packSize),
          flavors: flavors.filter((f) => f.quantity > 0),
          packSize,
          quantity: 1,
          isSubscription,
          priceInCents: priceInCents || PRICING.BASE_PRICE_CENTS,
        };

        set((state) => ({
          items: [...state.items, bundleItem],
        }));
      },

      removeBundle: (bundleId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !isCartBundleItem(item) || item.bundleId !== bundleId
          ),
        }));
      },

      updateBundleQuantity: (bundleId, quantity) => {
        if (quantity <= 0) {
          get().removeBundle(bundleId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            isCartBundleItem(item) && item.bundleId === bundleId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      setIsOpen: (isOpen) => set({ isOpen }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          if (isCartBundleItem(item)) {
            return total + item.quantity * item.packSize;
          }
          return total + item.quantity * item.packSize;
        }, 0);
      },

      getCartTotal: () => {
        const { items } = get();
        if (items.length === 0) {
          return {
            unitPriceCents: 0,
            subtotalCents: 0,
            discountCents: 0,
            discountPercentage: 0,
            shippingCents: 0,
            taxCents: 0,
            totalCents: 0,
            isFreeShipping: false,
            savingsPerUnit: 0,
            itemCount: 0,
            items: [],
          };
        }

        // Convert all items (including bundles) to the format expected by calculateCartTotal
        const cartItems = items.map((item) => {
          if (isCartBundleItem(item)) {
            // Bundle: treat as a single product with the pack size
            return {
              productId: item.bundleId,
              quantity: item.quantity,
              packSize: item.packSize,
              isSubscription: item.isSubscription,
              priceInCents: item.priceInCents || PRICING.BASE_PRICE_CENTS,
            };
          }
          // Single item
          return {
            productId: item.productId,
            quantity: item.quantity,
            packSize: item.packSize,
            isSubscription: item.isSubscription,
            priceInCents: item.priceInCents || PRICING.BASE_PRICE_CENTS,
          };
        });

        return calculateCartTotal(cartItems);
      },

      getItemKey: generateItemKey,
    }),
    {
      name: 'poppy-cart',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);

// Selector hooks for common operations
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartIsOpen = () => useCartStore((state) => state.isOpen);

// Hook that safely returns cart count (avoids hydration mismatch)
import { useState, useEffect } from 'react';

export const useCartItemCount = () => {
  const [count, setCount] = useState(0);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    const total = items.reduce((acc, item) => {
      if (isCartBundleItem(item)) {
        return acc + item.quantity * item.packSize;
      }
      return acc + item.quantity * item.packSize;
    }, 0);
    setCount(total);
  }, [items]);

  return count;
};

// Hook to get only single items
export const useSingleItems = () => {
  const items = useCartStore((state) => state.items);
  return items.filter((item): item is CartItem => !isCartBundleItem(item));
};

// Hook to get only bundle items
export const useBundleItems = () => {
  const items = useCartStore((state) => state.items);
  return items.filter((item): item is BundleCartItem => isCartBundleItem(item));
};
