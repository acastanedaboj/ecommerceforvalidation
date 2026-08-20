'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Check, Truck } from 'lucide-react';
import { useCartStore, isCartBundleItem } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { SHIPPING } from '@/lib/constants';
import { BundleCartItem } from '@/components/bundle';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const cartTotal = getCartTotal();

  // Calculate how much more for free shipping
  const amountForFreeShipping = cartTotal.isFreeShipping
    ? 0
    : Math.max(0, SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS - cartTotal.subtotalCents);

  const progressPercentage = Math.min(
    100,
    (cartTotal.subtotalCents / SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS) * 100
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm transition-all duration-400',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-soft-xl transition-transform duration-400 ease-bounce-soft',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compra"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 bg-white px-6 py-5">
          <h2 className="flex items-center gap-3 font-display text-xl font-medium text-stone-800">
            <ShoppingBag className="h-5 w-5 text-earth-500" />
            Tu carrito
            {items.length > 0 && (
              <span className="font-sans text-sm font-normal text-stone-400">
                ({cartTotal.itemCount} {cartTotal.itemCount === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2.5 transition-colors hover:bg-cream-100"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5 text-stone-500" />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && !cartTotal.isFreeShipping && (
          <div className="border-b border-earth-100 bg-earth-50 px-6 py-4">
            <div className="mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4 text-earth-500" />
              <p className="text-sm text-earth-700">
                Te faltan <strong>{formatPrice(amountForFreeShipping)}</strong> para envio gratis
              </p>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        )}

        {items.length > 0 && cartTotal.isFreeShipping && (
          <div className="border-b border-olive-100 bg-olive-50 px-6 py-4">
            <p className="flex items-center gap-2 text-sm font-medium text-olive-700">
              <Check className="h-4 w-4" />
              Genial! Tu pedido tiene envio gratis
            </p>
          </div>
        )}

        {/* Cart items */}
        <div className="scrollbar-custom flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cream-100">
                <ShoppingBag className="h-10 w-10 text-cream-400" />
              </div>
              <p className="mb-2 font-display text-lg text-stone-700">Tu carrito esta vacio</p>
              <p className="mb-8 text-sm text-stone-400">Anade algunos productos deliciosos</p>
              <Link href="/tienda" onClick={() => setIsOpen(false)} className="btn-primary">
                Ver productos
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-cream-100">
              {items.map((item) => {
                // Check if this is a bundle item
                if (isCartBundleItem(item)) {
                  return (
                    <li key={item.bundleId} className="px-6">
                      <BundleCartItem item={item} />
                    </li>
                  );
                }

                // Regular single product item
                return (
                  <li
                    key={`${item.productId}-${item.packSize}-${item.isSubscription}`}
                    className="px-6 py-5 transition-colors hover:bg-cream-50/50"
                  >
                    <div className="flex gap-4">
                      {/* Product image */}
                      <Link
                        href={`/tienda/${item.productSlug}`}
                        onClick={() => setIsOpen(false)}
                        className="group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream-100"
                      >
                        <Image
                          src={item.productImage || '/images/placeholder-product.jpg'}
                          alt={item.productName}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="80px"
                        />
                      </Link>

                      {/* Product details */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/tienda/${item.productSlug}`}
                          onClick={() => setIsOpen(false)}
                          className="line-clamp-1 font-medium text-stone-800 transition-colors hover:text-earth-600"
                        >
                          {item.productName}
                        </Link>

                        {/* Pack/Subscription info */}
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {item.packSize > 1 && (
                            <span className="badge-secondary text-xs">Pack {item.packSize}</span>
                          )}
                          {item.isSubscription && (
                            <span className="badge bg-olive-100 text-xs text-olive-700">
                              Suscripcion
                            </span>
                          )}
                        </div>

                        {/* Price and quantity */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-cream-200 bg-white">
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
                              className="rounded-l-full p-2 transition-colors hover:bg-cream-50"
                              aria-label="Reducir cantidad"
                            >
                              <Minus className="h-3.5 w-3.5 text-stone-500" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-stone-800">
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
                              className="rounded-r-full p-2 transition-colors hover:bg-cream-50"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3.5 w-3.5 text-stone-500" />
                            </button>
                          </div>

                          <p className="font-semibold text-stone-800">
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

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.packSize, item.isSubscription)
                        }
                        className="self-start rounded-full p-2 text-stone-300 transition-all hover:bg-red-50 hover:text-red-500"
                        aria-label={`Eliminar ${item.productName} del carrito`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div className="border-t border-cream-200 bg-white px-6 py-5">
            {/* Subtotals */}
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-stone-700">{formatPrice(cartTotal.subtotalCents)}</span>
              </div>

              {cartTotal.discountCents > 0 && (
                <div className="flex justify-between text-olive-600">
                  <span>Descuento</span>
                  <span>-{formatPrice(cartTotal.discountCents)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-stone-500">Envio</span>
                <span>
                  {cartTotal.isFreeShipping ? (
                    <span className="font-medium text-olive-600">Gratis</span>
                  ) : (
                    <span className="text-stone-700">{formatPrice(cartTotal.shippingCents)}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-xs text-stone-400">
                <span>IVA incluido (10%)</span>
                <span>{formatPrice(cartTotal.taxCents)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="mt-5 flex items-center justify-between border-t border-cream-200 pt-5">
              <span className="font-medium text-stone-600">Total</span>
              <span className="font-display text-2xl text-stone-800">
                {formatPrice(cartTotal.totalCents)}
              </span>
            </div>

            {/* Savings callout */}
            {cartTotal.discountCents > 0 && (
              <p className="mt-2 text-right text-sm text-olive-600">
                Has ahorrado {formatPrice(cartTotal.discountCents)}
              </p>
            )}

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-5 w-full justify-center py-4"
            >
              Finalizar compra
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            {/* Continue shopping */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn-ghost mt-2 w-full justify-center text-sm"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
