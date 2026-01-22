/**
 * Cart Store - Zustand state management for shopping cart
 *
 * Features:
 * - Persistent cart in localStorage
 * - Pack quantity management
 * - Subscription items
 * - Automatic price calculations
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateCartTotal, type CartPriceCalculation } from '@/lib/pricing';
import { PRICING } from '@/lib/constants';

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  quantity: number;
  packSize: number;
  isSubscription: boolean;
  priceInCents: number; // Base price per unit
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, packSize: number, isSubscription: boolean) => void;
  updateQuantity: (
    productId: string,
    packSize: number,
    isSubscription: boolean,
    quantity: number
  ) => void;
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
              item.productId === newItem.productId &&
              item.packSize === newItem.packSize &&
              item.isSubscription === newItem.isSubscription
          );

          if (existingIndex >= 0) {
            // Update quantity of existing item
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + (newItem.quantity || 1),
            };
            return { items: updatedItems };
          }

          // Add new item
          return {
            items: [
              ...state.items,
              {
                ...newItem,
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
            item.productId === productId &&
            item.packSize === packSize &&
            item.isSubscription === isSubscription
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
        return items.reduce((total, item) => total + item.quantity * item.packSize, 0);
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

        return calculateCartTotal(
          items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            packSize: item.packSize,
            isSubscription: item.isSubscription,
            priceInCents: item.priceInCents || PRICING.BASE_PRICE_CENTS,
          }))
        );
      },

      getItemKey: generateItemKey,
    }),
    {
      name: 'granola-cart',
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
    const total = items.reduce((acc, item) => acc + item.quantity * item.packSize, 0);
    setCount(total);
  }, [items]);

  return count;
};
