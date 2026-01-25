'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Check, Truck } from 'lucide-react';
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

  const progressPercentage = Math.min(100, (cartTotal.subtotalCents / SHIPPING.FREE_SHIPPING_MIN_AMOUNT_CENTS) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 transition-all duration-400',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-cream-50 z-50 shadow-soft-xl transition-transform duration-400 ease-bounce-soft flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compra"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200 bg-white">
          <h2 className="font-display text-xl font-medium text-stone-800 flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-earth-500" />
            Tu carrito
            {items.length > 0 && (
              <span className="text-sm font-sans font-normal text-stone-400">
                ({cartTotal.itemCount} {cartTotal.itemCount === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2.5 hover:bg-cream-100 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && !cartTotal.isFreeShipping && (
          <div className="px-6 py-4 bg-earth-50 border-b border-earth-100">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-earth-500" />
              <p className="text-sm text-earth-700">
                Te faltan <strong>{formatPrice(amountForFreeShipping)}</strong> para envio gratis
              </p>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {items.length > 0 && cartTotal.isFreeShipping && (
          <div className="px-6 py-4 bg-olive-50 border-b border-olive-100">
            <p className="text-sm text-olive-700 font-medium flex items-center gap-2">
              <Check className="w-4 h-4" />
              Genial! Tu pedido tiene envio gratis
            </p>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto scrollbar-custom">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-cream-400" />
              </div>
              <p className="font-display text-lg text-stone-700 mb-2">Tu carrito esta vacio</p>
              <p className="text-sm text-stone-400 mb-8">
                Anade algunos productos deliciosos
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
            <ul className="divide-y divide-cream-100">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.packSize}-${item.isSubscription}`}
                  className="px-6 py-5 hover:bg-cream-50/50 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Product image */}
                    <Link
                      href={`/tienda/${item.productSlug}`}
                      onClick={() => setIsOpen(false)}
                      className="relative w-20 h-20 bg-cream-100 rounded-xl overflow-hidden flex-shrink-0 group"
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
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/tienda/${item.productSlug}`}
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-stone-800 hover:text-earth-600 transition-colors line-clamp-1"
                      >
                        {item.productName}
                      </Link>

                      {/* Pack/Subscription info */}
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {item.packSize > 1 && (
                          <span className="badge-secondary text-xs">Pack {item.packSize}</span>
                        )}
                        {item.isSubscription && (
                          <span className="badge bg-olive-100 text-olive-700 text-xs">Suscripcion</span>
                        )}
                      </div>

                      {/* Price and quantity */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center bg-white border border-cream-200 rounded-full">
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
                            className="p-2 hover:bg-cream-50 rounded-l-full transition-colors"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="w-3.5 h-3.5 text-stone-500" />
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
                            className="p-2 hover:bg-cream-50 rounded-r-full transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3.5 h-3.5 text-stone-500" />
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
                      className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all self-start"
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
          <div className="border-t border-cream-200 px-6 py-5 bg-white">
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
                    <span className="text-olive-600 font-medium">Gratis</span>
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
            <div className="flex justify-between items-center mt-5 pt-5 border-t border-cream-200">
              <span className="font-medium text-stone-600">Total</span>
              <span className="text-2xl font-display font-semibold text-stone-800">
                {formatPrice(cartTotal.totalCents)}
              </span>
            </div>

            {/* Savings callout */}
            {cartTotal.discountCents > 0 && (
              <p className="text-sm text-olive-600 mt-2 text-right">
                Has ahorrado {formatPrice(cartTotal.discountCents)}
              </p>
            )}

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full mt-5 justify-center py-4"
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
