'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { SHIPPING } from '@/lib/constants';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const cartTotal = getCartTotal();

  // Calculate how much more for free shipping
  const amountForFreeShipping = cartTotal.isFreeShipping
    ? 0
    : Math.max(0, SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS - cartTotal.subtotalCents);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compra"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Tu carrito
            {items.length > 0 && (
              <span className="text-sm font-normal text-neutral-500">
                ({cartTotal.itemCount} {cartTotal.itemCount === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && !cartTotal.isFreeShipping && (
          <div className="px-6 py-3 bg-primary-50 border-b border-primary-100">
            <p className="text-sm text-primary-800">
              ¡Te faltan <strong>{formatPrice(amountForFreeShipping)}</strong> para envío gratis!
            </p>
            <div className="mt-2 h-2 bg-primary-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all duration-300"
                style={{
                  width: `${Math.min(100, (cartTotal.subtotalCents / SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {items.length > 0 && cartTotal.isFreeShipping && (
          <div className="px-6 py-3 bg-accent-50 border-b border-accent-100">
            <p className="text-sm text-accent-800 font-medium">
              ✓ ¡Genial! Tu pedido tiene envío gratis
            </p>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
              <p className="text-neutral-600 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-neutral-400 mb-6">
                Añade algunos productos deliciosos
              </p>
              <Link
                href="/tienda"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.packSize}-${item.isSubscription}`}
                  className="px-6 py-4"
                >
                  <div className="flex gap-4">
                    {/* Product image */}
                    <div className="relative w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.productImage || '/images/placeholder-product.jpg'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/tienda/${item.productSlug}`}
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-neutral-900 hover:text-primary-600 transition-colors line-clamp-1"
                      >
                        {item.productName}
                      </Link>

                      {/* Pack/Subscription info */}
                      <div className="mt-1 flex flex-wrap gap-2">
                        {item.packSize > 1 && (
                          <span className="badge-secondary">Pack {item.packSize}</span>
                        )}
                        {item.isSubscription && (
                          <span className="badge-accent">Suscripción</span>
                        )}
                      </div>

                      {/* Price and quantity */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.packSize,
                                item.isSubscription,
                                item.quantity - 1
                              )
                            }
                            className="p-1 hover:bg-neutral-100 rounded transition-colors"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.packSize,
                                item.isSubscription,
                                item.quantity + 1
                              )
                            }
                            className="p-1 hover:bg-neutral-100 rounded transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-neutral-900">
                            {formatPrice(
                              cartTotal.items.find(
                                (i) =>
                                  i.productId === item.productId &&
                                  i.packSize === item.packSize &&
                                  i.isSubscription === item.isSubscription
                              )?.lineTotalCents || 0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.productId, item.packSize, item.isSubscription)
                      }
                      className="p-1 text-neutral-400 hover:text-red-600 transition-colors self-start"
                      aria-label={`Eliminar ${item.productName} del carrito`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-6 py-4 bg-neutral-50">
            {/* Subtotals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>{formatPrice(cartTotal.subtotalCents)}</span>
              </div>

              {cartTotal.discountCents > 0 && (
                <div className="flex justify-between text-accent-600">
                  <span>Descuento</span>
                  <span>-{formatPrice(cartTotal.discountCents)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-neutral-600">Envío</span>
                <span>
                  {cartTotal.isFreeShipping ? (
                    <span className="text-accent-600">Gratis</span>
                  ) : (
                    formatPrice(cartTotal.shippingCents)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-xs text-neutral-500">
                <span>IVA incluido (10%)</span>
                <span>{formatPrice(cartTotal.taxCents)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-200">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">{formatPrice(cartTotal.totalCents)}</span>
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full mt-4 justify-center"
            >
              Finalizar compra
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            {/* Continue shopping */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn-ghost w-full mt-2 justify-center text-sm"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
